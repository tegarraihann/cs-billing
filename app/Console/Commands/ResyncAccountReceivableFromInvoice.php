<?php

namespace App\Console\Commands;

use App\Models\AccountReceivable;
use App\Models\Invoice;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class ResyncAccountReceivableFromInvoice extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ar:resync-from-invoice
                            {--so= : SO number (EWILOG...) atau SO ID}
                            {--invoice= : Invoice number (EWL...) atau Invoice ID}
                            {--from= : Start date invoice (YYYY-MM-DD)}
                            {--to= : End date invoice (YYYY-MM-DD)}
                            {--dry-run : Simulasi tanpa simpan perubahan}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resync Account Receivable berdasarkan data invoice terbaru';

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

        $query = Invoice::query()
            ->with('salesOrder')
            ->orderBy('id');

        $this->applyInvoiceFilter($query);
        $this->applySalesOrderFilter($query);
        $this->applyDateFilter($query, $fromDate, $toDate);

        $invoices = $query->get();

        if ($invoices->isEmpty()) {
            $this->warn('Tidak ada invoice yang cocok dengan filter.');
            return self::SUCCESS;
        }

        $this->info(sprintf(
            'Memproses %d invoice%s...',
            $invoices->count(),
            $dryRun ? ' (DRY-RUN)' : ''
        ));

        $changed = 0;
        $processed = 0;

        foreach ($invoices as $invoice) {
            $processed++;
            $before = $this->snapshotForInvoice($invoice);

            if ($dryRun) {
                DB::beginTransaction();
                try {
                    $synced = AccountReceivable::syncFromInvoice($invoice->fresh());
                    $after = $this->snapshotForReceivable($invoice->fresh(), $synced);
                    DB::rollBack();
                } catch (\Throwable $e) {
                    DB::rollBack();
                    $this->error("Invoice {$invoice->invoice_number}: gagal simulasi - {$e->getMessage()}");
                    continue;
                }
            } else {
                try {
                    $synced = AccountReceivable::syncFromInvoice($invoice->fresh());
                    $after = $this->snapshotForReceivable($invoice->fresh(), $synced);
                } catch (\Throwable $e) {
                    $this->error("Invoice {$invoice->invoice_number}: gagal resync - {$e->getMessage()}");
                    continue;
                }
            }

            $isChanged = $this->hasSnapshotChanged($before, $after);
            if ($isChanged) {
                $changed++;
            }

            $soNumber = $invoice->salesOrder?->order_number ?? '-';
            $this->line(sprintf(
                '[%s] INV %s | SO %s | AR %s | amount %s -> %s | status %s -> %s | outstanding %s -> %s',
                $isChanged ? 'CHANGED' : 'UNCHANGED',
                $invoice->invoice_number ?? ('#' . $invoice->id),
                $soNumber,
                $after['ar_id'] ?? '-',
                $this->formatAmount($before['invoice_amount']),
                $this->formatAmount($after['invoice_amount']),
                $before['status'] ?? '-',
                $after['status'] ?? '-',
                $this->formatAmount($before['outstanding_amount']),
                $this->formatAmount($after['outstanding_amount'])
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

    private function applyInvoiceFilter(Builder $query): void
    {
        $invoiceFilter = trim((string) $this->option('invoice'));
        if ($invoiceFilter === '') {
            return;
        }

        $invoiceCandidates = $this->invoiceCandidates($invoiceFilter);
        $query->where(function (Builder $q) use ($invoiceFilter, $invoiceCandidates) {
            if (ctype_digit($invoiceFilter)) {
                $q->orWhere('id', (int) $invoiceFilter);
            }
            $q->orWhereIn('invoice_number', $invoiceCandidates);
        });
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
                $q->orWhere('sales_order_id', (int) $soFilter);
            }

            $q->orWhereHas('salesOrder', function (Builder $soQuery) use ($soCandidates) {
                $soQuery->whereIn('order_number', $soCandidates);
            });
        });
    }

    private function applyDateFilter(Builder $query, ?Carbon $fromDate, ?Carbon $toDate): void
    {
        if ($fromDate) {
            $query->whereDate('invoice_date', '>=', $fromDate->toDateString());
        }

        if ($toDate) {
            $query->whereDate('invoice_date', '<=', $toDate->toDateString());
        }
    }

    private function snapshotForInvoice(Invoice $invoice): array
    {
        $receivable = AccountReceivable::query()
            ->where('invoice_id', $invoice->id)
            ->orderBy('id')
            ->first();

        return $this->snapshotForReceivable($invoice, $receivable);
    }

    private function snapshotForReceivable(Invoice $invoice, ?AccountReceivable $receivable): array
    {
        return [
            'invoice_id' => $invoice->id,
            'invoice_number' => $invoice->invoice_number,
            'invoice_total' => (float) ($invoice->total ?? 0),
            'ar_id' => $receivable?->id,
            'invoice_amount' => (float) ($receivable?->invoice_amount ?? 0),
            'paid_amount' => (float) ($receivable?->paid_amount ?? 0),
            'outstanding_amount' => (float) ($receivable?->outstanding_amount ?? 0),
            'status' => $receivable?->status,
        ];
    }

    private function hasSnapshotChanged(array $before, array $after): bool
    {
        return ($before['ar_id'] ?? null) !== ($after['ar_id'] ?? null)
            || abs((float) ($before['invoice_amount'] ?? 0) - (float) ($after['invoice_amount'] ?? 0)) > 0.0001
            || abs((float) ($before['paid_amount'] ?? 0) - (float) ($after['paid_amount'] ?? 0)) > 0.0001
            || abs((float) ($before['outstanding_amount'] ?? 0) - (float) ($after['outstanding_amount'] ?? 0)) > 0.0001
            || ($before['status'] ?? null) !== ($after['status'] ?? null);
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

    private function invoiceCandidates(string $value): array
    {
        $value = trim($value);
        $candidates = [$value];

        if (ctype_digit($value) && !str_starts_with($value, 'EWL')) {
            $candidates[] = 'EWL' . $value;
        }

        return array_values(array_unique($candidates));
    }

    private function formatAmount(float $value): string
    {
        return number_format($value, 2, '.', ',');
    }
}
