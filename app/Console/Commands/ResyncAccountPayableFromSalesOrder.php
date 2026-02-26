<?php

namespace App\Console\Commands;

use App\Models\AccountPayable;
use App\Models\SalesOrder;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ResyncAccountPayableFromSalesOrder extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ap:resync-from-so
                            {--so= : SO number (EWILOG...) atau SO ID}
                            {--from= : Start date SO (YYYY-MM-DD)}
                            {--to= : End date SO (YYYY-MM-DD)}
                            {--dry-run : Simulasi tanpa simpan perubahan}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resync Account Payable berdasarkan data Sales Order terbaru';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $dryRun = (bool) $this->option('dry-run');
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

        $this->applySalesOrderFilter($query);
        $this->applyDateFilter($query, $fromDate, $toDate);

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
                '[%s] SO %s | AP %d -> %d | amount %s -> %s | paid %s -> %s | outstanding %s -> %s',
                $isChanged ? 'CHANGED' : 'UNCHANGED',
                $salesOrder->order_number ?? ('#' . $salesOrder->id),
                $before['count'],
                $after['count'],
                $this->formatAmount($before['total_amount']),
                $this->formatAmount($after['total_amount']),
                $this->formatAmount($before['total_paid']),
                $this->formatAmount($after['total_paid']),
                $this->formatAmount($before['total_outstanding']),
                $this->formatAmount($after['total_outstanding'])
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

    private function applyDateFilter(Builder $query, ?Carbon $fromDate, ?Carbon $toDate): void
    {
        if ($fromDate) {
            $query->where(function (Builder $q) use ($fromDate) {
                $q->whereDate('order_date', '>=', $fromDate->toDateString())
                    ->orWhere(function (Builder $subQuery) use ($fromDate) {
                        $subQuery->whereNull('order_date')
                            ->whereDate('created_at', '>=', $fromDate->toDateString());
                    });
            });
        }

        if ($toDate) {
            $query->where(function (Builder $q) use ($toDate) {
                $q->whereDate('order_date', '<=', $toDate->toDateString())
                    ->orWhere(function (Builder $subQuery) use ($toDate) {
                        $subQuery->whereNull('order_date')
                            ->whereDate('created_at', '<=', $toDate->toDateString());
                    });
            });
        }
    }

    private function snapshotForSalesOrder(SalesOrder $salesOrder): array
    {
        $payables = AccountPayable::query()
            ->where('sales_order_id', $salesOrder->id)
            ->with('components')
            ->orderBy('id')
            ->get();

        $rows = $payables->map(function (AccountPayable $payable) {
            return [
                'id' => $payable->id,
                'vendor_id' => $payable->vendor_id,
                'vendor_name' => $payable->vendor_name,
                'amount' => (float) ($payable->amount ?? 0),
                'paid_amount' => (float) ($payable->paid_amount ?? 0),
                'outstanding_amount' => (float) ($payable->outstanding_amount ?? 0),
                'status' => $payable->status,
                'components' => $payable->components->map(function ($component) {
                    return [
                        'id' => $component->id,
                        'type' => $component->component_type,
                        'amount' => (float) ($component->amount ?? 0),
                        'paid_amount' => (float) ($component->paid_amount ?? 0),
                        'status' => $component->status,
                        'lookup_ref' => data_get($component->related_items, 'lookup_ref'),
                    ];
                })->sortBy('id')->values()->all(),
            ];
        })->values()->all();

        return [
            'count' => $payables->count(),
            'total_amount' => (float) $payables->sum('amount'),
            'total_paid' => (float) $payables->sum('paid_amount'),
            'total_outstanding' => (float) $payables->sum('outstanding_amount'),
            'rows' => $rows,
        ];
    }

    private function hasSnapshotChanged(array $before, array $after): bool
    {
        return abs((float) ($before['total_amount'] ?? 0) - (float) ($after['total_amount'] ?? 0)) > 0.0001
            || abs((float) ($before['total_paid'] ?? 0) - (float) ($after['total_paid'] ?? 0)) > 0.0001
            || abs((float) ($before['total_outstanding'] ?? 0) - (float) ($after['total_outstanding'] ?? 0)) > 0.0001
            || (int) ($before['count'] ?? 0) !== (int) ($after['count'] ?? 0)
            || json_encode($before['rows']) !== json_encode($after['rows']);
    }

    private function salesOrderCandidates(string $value): array
    {
        $value = trim($value);
        $candidates = [$value];

        if (ctype_digit($value) && !str_starts_with($value, 'EWILOG')) {
            $candidates[] = 'EWILOG' . $value;
        }

        return array_values(array_unique($candidates));
    }

    private function formatAmount(float $value): string
    {
        return number_format($value, 2, '.', ',');
    }
}

