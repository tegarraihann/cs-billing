<?php

namespace App\Console\Commands;

use App\Models\AccountPayable;
use App\Models\AccountReceivable;
use App\Models\SalesOrder;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ResyncFinanceLinksFromSalesOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'so:resync-finance-links
                            {--so= : SO number (EWILOG...) atau SO ID}
                            {--from= : Start date approved_at (YYYY-MM-DD)}
                            {--to= : End date approved_at (YYYY-MM-DD)}
                            {--include-released : Ikutkan SO status released (belum approved)}
                            {--include-invoiced : Ikutkan SO yang sudah punya invoice}
                            {--dry-run : Simulasi tanpa menyimpan perubahan}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resync AP + AR pre-invoice dari data Sales Order (khusus repair data existing)';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $dryRun = (bool) $this->option('dry-run');
        $includeReleased = (bool) $this->option('include-released');
        $includeInvoiced = (bool) $this->option('include-invoiced');
        $fromDate = $this->parseDateOption('from');
        $toDate = $this->parseDateOption('to');

        if ($fromDate === false || $toDate === false) {
            return self::FAILURE;
        }

        if ($fromDate && $toDate && $fromDate->gt($toDate)) {
            $this->error('Nilai --from tidak boleh lebih besar dari --to.');
            return self::FAILURE;
        }

        $query = SalesOrder::query()->orderBy('id');
        $statuses = $includeReleased ? ['approved', 'released'] : ['approved'];
        $query->whereIn('status', $statuses);
        if (!$includeInvoiced) {
            $query->whereDoesntHave('invoices');
        }

        if (!$includeReleased) {
            $query->whereNotNull('approved_at');
        } else {
            $query->where(function (Builder $q) {
                $q->whereNotNull('approved_at')
                    ->orWhereNotNull('released_at');
            });
        }

        $this->applySalesOrderFilter($query);
        $this->applyDateFilter($query, $fromDate, $toDate, $includeReleased);

        $salesOrders = $query->get();

        if ($salesOrders->isEmpty()) {
            $this->warn('Tidak ada sales order yang cocok dengan filter.');
            return self::SUCCESS;
        }

        $this->info(sprintf(
            'Memproses %d sales order%s...',
            $salesOrders->count(),
            $dryRun ? ' (DRY-RUN)' : ''
        ));

        $processed = 0;
        $changed = 0;

        foreach ($salesOrders as $salesOrder) {
            $processed++;
            $before = $this->snapshotForSalesOrder($salesOrder);

            if ($dryRun) {
                DB::beginTransaction();
                try {
                    AccountPayable::generateFromSalesOrder($salesOrder->fresh());
                    AccountReceivable::createOrUpdatePreInvoiceFromSalesOrder($salesOrder->fresh());
                    $after = $this->snapshotForSalesOrder($salesOrder->fresh());
                    DB::rollBack();
                } catch (\Throwable $e) {
                    DB::rollBack();
                    $this->error("SO {$salesOrder->order_number}: gagal simulasi - {$e->getMessage()}");
                    continue;
                }
            } else {
                try {
                    AccountPayable::generateFromSalesOrder($salesOrder->fresh());
                    AccountReceivable::createOrUpdatePreInvoiceFromSalesOrder($salesOrder->fresh());
                    $after = $this->snapshotForSalesOrder($salesOrder->fresh());
                } catch (\Throwable $e) {
                    $this->error("SO {$salesOrder->order_number}: gagal resync - {$e->getMessage()}");
                    continue;
                }
            }

            $isChanged = $this->hasSnapshotChanged($before, $after);
            if ($isChanged) {
                $changed++;
            }

            $this->line(sprintf(
                '[%s] SO %s | AP %d -> %d | AR %s -> %s | AR amount %s -> %s | AR outstanding %s -> %s',
                $isChanged ? 'CHANGED' : 'UNCHANGED',
                $salesOrder->order_number ?? ('#' . $salesOrder->id),
                $before['ap_count'],
                $after['ap_count'],
                $before['ar_id'] ?? '-',
                $after['ar_id'] ?? '-',
                $this->formatAmount($before['ar_amount']),
                $this->formatAmount($after['ar_amount']),
                $this->formatAmount($before['ar_outstanding']),
                $this->formatAmount($after['ar_outstanding'])
            ));
        }

        $this->newLine();
        $this->info("Selesai. Diproses: {$processed}, berubah: {$changed}, tidak berubah: " . ($processed - $changed));

        if ($dryRun) {
            $this->comment('Mode DRY-RUN: tidak ada perubahan yang disimpan.');
        }

        return self::SUCCESS;
    }

    private function parseDateOption(string $name): Carbon|false|null
    {
        $value = $this->option($name);
        if (!$value) {
            return null;
        }

        try {
            return Carbon::parse((string) $value)->startOfDay();
        } catch (\Throwable $e) {
            $this->error("Format tanggal --{$name} tidak valid: {$value}");
            return false;
        }
    }

    private function applySalesOrderFilter(Builder $query): void
    {
        $soFilter = trim((string) $this->option('so'));
        if ($soFilter === '') {
            return;
        }

        $soCandidates = $this->salesOrderCandidates($soFilter);
        $query->where(function (Builder $q) use ($soFilter, $soCandidates) {
            if (ctype_digit($soFilter)) {
                $q->orWhere('id', (int) $soFilter);
            }

            $q->orWhereIn('order_number', $soCandidates);
        });
    }

    private function applyDateFilter(Builder $query, ?Carbon $fromDate, ?Carbon $toDate, bool $includeReleased): void
    {
        $dateColumn = $includeReleased ? 'released_at' : 'approved_at';

        if ($fromDate) {
            $query->whereDate($dateColumn, '>=', $fromDate->toDateString());
        }

        if ($toDate) {
            $query->whereDate($dateColumn, '<=', $toDate->toDateString());
        }
    }

    private function snapshotForSalesOrder(SalesOrder $salesOrder): array
    {
        $apRows = AccountPayable::query()
            ->where('sales_order_id', $salesOrder->id)
            ->orderBy('id')
            ->get(['id', 'amount', 'paid_amount', 'outstanding_amount', 'status']);

        $preInvoiceAr = AccountReceivable::query()
            ->where('sales_order_id', $salesOrder->id)
            ->whereNull('invoice_id')
            ->where('is_opening', false)
            ->first(['id', 'invoice_amount', 'paid_amount', 'outstanding_amount', 'status']);

        return [
            'ap_count' => $apRows->count(),
            'ap_total_amount' => (float) $apRows->sum('amount'),
            'ap_total_paid' => (float) $apRows->sum('paid_amount'),
            'ap_total_outstanding' => (float) $apRows->sum('outstanding_amount'),
            'ar_id' => $preInvoiceAr?->id,
            'ar_amount' => (float) ($preInvoiceAr?->invoice_amount ?? 0),
            'ar_paid' => (float) ($preInvoiceAr?->paid_amount ?? 0),
            'ar_outstanding' => (float) ($preInvoiceAr?->outstanding_amount ?? 0),
            'ar_status' => $preInvoiceAr?->status,
        ];
    }

    private function hasSnapshotChanged(array $before, array $after): bool
    {
        return (int) ($before['ap_count'] ?? 0) !== (int) ($after['ap_count'] ?? 0)
            || abs((float) ($before['ap_total_amount'] ?? 0) - (float) ($after['ap_total_amount'] ?? 0)) > 0.0001
            || abs((float) ($before['ap_total_paid'] ?? 0) - (float) ($after['ap_total_paid'] ?? 0)) > 0.0001
            || abs((float) ($before['ap_total_outstanding'] ?? 0) - (float) ($after['ap_total_outstanding'] ?? 0)) > 0.0001
            || ($before['ar_id'] ?? null) !== ($after['ar_id'] ?? null)
            || abs((float) ($before['ar_amount'] ?? 0) - (float) ($after['ar_amount'] ?? 0)) > 0.0001
            || abs((float) ($before['ar_paid'] ?? 0) - (float) ($after['ar_paid'] ?? 0)) > 0.0001
            || abs((float) ($before['ar_outstanding'] ?? 0) - (float) ($after['ar_outstanding'] ?? 0)) > 0.0001
            || ($before['ar_status'] ?? null) !== ($after['ar_status'] ?? null);
    }

    private function salesOrderCandidates(string $value): array
    {
        $value = trim($value);
        $normalized = str_replace('-', '', $value);
        $candidates = [$value, $normalized];

        if (ctype_digit($normalized)) {
            $candidates[] = 'EWILOG' . $normalized;
            $candidates[] = 'EWILOG' . substr($normalized, 0, 4) . '-' . substr($normalized, 4);
        }

        return array_values(array_unique(array_filter($candidates)));
    }

    private function formatAmount(float $value): string
    {
        return number_format($value, 2, '.', ',');
    }
}
