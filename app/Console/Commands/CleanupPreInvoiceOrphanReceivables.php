<?php

namespace App\Console\Commands;

use App\Models\AccountReceivable;
use App\Models\BankTransaction;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

class CleanupPreInvoiceOrphanReceivables extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'ar:cleanup-preinvoice-orphans
                            {--so= : SO number (EWILOG...) / invoice number (EWL...) / SO ID}
                            {--from= : Start date AR created_at (YYYY-MM-DD)}
                            {--to= : End date AR created_at (YYYY-MM-DD)}
                            {--dry-run : Simulasi tanpa simpan}
                            {--apply : Eksekusi cleanup}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cleanup AR pre-invoice orphan (invoice_id NULL) yang sudah punya AR invoice resmi';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $apply = (bool) $this->option('apply');
        $dryRunOption = (bool) $this->option('dry-run');
        $dryRun = !$apply || $dryRunOption;

        if ($apply && $dryRunOption) {
            $this->warn('Kombinasi --apply + --dry-run terdeteksi. Mode dry-run akan dipakai.');
            $apply = false;
        }

        $fromDate = $this->parseDateOption('from');
        $toDate = $this->parseDateOption('to');

        if ($fromDate === false || $toDate === false) {
            return self::FAILURE;
        }

        if ($fromDate && $toDate && $fromDate->gt($toDate)) {
            $this->error('Nilai --from tidak boleh lebih besar dari --to.');
            return self::FAILURE;
        }

        $query = AccountReceivable::query()
            ->with([
                'salesOrder:id,order_number',
                'salesOrder.invoices:id,sales_order_id,invoice_number',
                'components:id,account_receivable_id,amount,paid_amount,status',
            ])
            ->whereNull('invoice_id')
            ->where('is_opening', false)
            ->whereHas('salesOrder.invoices')
            ->orderBy('id');

        $this->applyFilter($query);
        $this->applyDateFilter($query, $fromDate, $toDate);

        $receivables = $query->get();

        if ($receivables->isEmpty()) {
            $this->warn('Tidak ada AR pre-invoice orphan yang cocok dengan filter.');
            return self::SUCCESS;
        }

        $this->info(sprintf(
            'Memproses %d AR orphan%s...',
            $receivables->count(),
            $dryRun ? ' (DRY-RUN)' : ''
        ));

        $safeCandidates = 0;
        $deleted = 0;
        $skipped = 0;

        foreach ($receivables as $receivable) {
            $safety = $this->evaluateSafety($receivable);
            if (!$safety['safe']) {
                $skipped++;
                $this->line(sprintf(
                    '[SKIP] AR #%d | SO %s | reason: %s',
                    $receivable->id,
                    $receivable->salesOrder?->order_number ?? ('#' . $receivable->sales_order_id),
                    implode('; ', $safety['reasons'])
                ));
                continue;
            }

            $safeCandidates++;

            if ($dryRun) {
                $this->line(sprintf(
                    '[CANDIDATE] AR #%d | SO %s | inv_no %s | amount %s',
                    $receivable->id,
                    $receivable->salesOrder?->order_number ?? ('#' . $receivable->sales_order_id),
                    $receivable->invoice_number ?? '-',
                    $this->formatAmount((float) $receivable->invoice_amount)
                ));
                continue;
            }

            DB::transaction(function () use ($receivable) {
                $receivable->components()->delete();
                $receivable->delete();
            });

            $deleted++;
            $this->line(sprintf(
                '[DELETED] AR #%d | SO %s | inv_no %s',
                $receivable->id,
                $receivable->salesOrder?->order_number ?? ('#' . $receivable->sales_order_id),
                $receivable->invoice_number ?? '-'
            ));
        }

        $this->newLine();
        $this->info(sprintf(
            'Selesai. total=%d, candidate_aman=%d, deleted=%d, skipped=%d',
            $receivables->count(),
            $safeCandidates,
            $deleted,
            $skipped
        ));

        if ($dryRun) {
            $this->comment('Mode DRY-RUN: tidak ada perubahan yang disimpan. Gunakan --apply untuk eksekusi.');
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

    private function applyFilter(Builder $query): void
    {
        $filter = trim((string) $this->option('so'));
        if ($filter === '') {
            return;
        }

        $soCandidates = $this->salesOrderCandidates($filter);
        $invoiceCandidates = $this->invoiceCandidates($filter);
        $digits = preg_replace('/\D+/', '', $filter);

        $query->where(function (Builder $q) use ($soCandidates, $invoiceCandidates, $digits) {
            if (!empty($digits) && ctype_digit($digits)) {
                $q->orWhere('sales_order_id', (int) $digits);
            }

            if (!empty($invoiceCandidates)) {
                $q->orWhereIn('invoice_number', $invoiceCandidates);
            }

            $q->orWhereHas('salesOrder', function (Builder $sq) use ($soCandidates) {
                $sq->whereIn('order_number', $soCandidates);
            });
        });
    }

    private function applyDateFilter(Builder $query, ?Carbon $fromDate, ?Carbon $toDate): void
    {
        if ($fromDate) {
            $query->whereDate('created_at', '>=', $fromDate->toDateString());
        }

        if ($toDate) {
            $query->whereDate('created_at', '<=', $toDate->toDateString());
        }
    }

    private function evaluateSafety(AccountReceivable $receivable): array
    {
        $reasons = [];

        $hasLinkedInvoice = $receivable->salesOrder && $receivable->salesOrder->invoices->isNotEmpty();
        if (!$hasLinkedInvoice) {
            $reasons[] = 'SO belum punya invoice';
        }

        if ((float) ($receivable->paid_amount ?? 0) > 0.0001) {
            $reasons[] = 'AR sudah ada paid_amount';
        }

        $invoiceAmount = (float) ($receivable->invoice_amount ?? 0);
        $outstandingAmount = (float) ($receivable->outstanding_amount ?? 0);
        if (abs($invoiceAmount - $outstandingAmount) > 0.01) {
            $reasons[] = 'invoice_amount != outstanding_amount';
        }

        if ($receivable->tax_writeoff_at) {
            $reasons[] = 'AR sudah ada tax write-off';
        }

        $hasPaidComponent = $receivable->components->contains(function ($component) {
            return (float) ($component->paid_amount ?? 0) > 0.0001;
        });
        if ($hasPaidComponent) {
            $reasons[] = 'Komponen AR sudah ada pembayaran';
        }

        $hasBankPayment = BankTransaction::query()
            ->where('reference_type', 'customer_payment')
            ->where('reference_id', $receivable->id)
            ->exists();
        if ($hasBankPayment) {
            $reasons[] = 'Sudah ada bank transaction customer_payment';
        }

        return [
            'safe' => empty($reasons),
            'reasons' => $reasons,
        ];
    }

    private function salesOrderCandidates(string $value): array
    {
        $value = trim($value);
        $normalized = str_replace('-', '', $value);
        $candidates = [$value, $normalized];

        if (ctype_digit($normalized)) {
            $candidates[] = 'EWILOG' . $normalized;
            if (strlen($normalized) > 4) {
                $candidates[] = 'EWILOG' . substr($normalized, 0, 4) . '-' . substr($normalized, 4);
            }
        }

        return array_values(array_unique(array_filter($candidates)));
    }

    private function invoiceCandidates(string $value): array
    {
        $value = trim($value);
        $normalized = str_replace('-', '', $value);
        $candidates = [$value, $normalized];

        if (str_starts_with(strtoupper($normalized), 'EWILOG')) {
            $suffix = substr($normalized, 6);
            if ($suffix !== '') {
                $candidates[] = 'EWL' . $suffix;
            }
        }

        if (ctype_digit($normalized)) {
            $candidates[] = 'EWL' . $normalized;
        }

        return array_values(array_unique(array_filter($candidates)));
    }

    private function formatAmount(float $value): string
    {
        return number_format($value, 2, '.', ',');
    }
}

