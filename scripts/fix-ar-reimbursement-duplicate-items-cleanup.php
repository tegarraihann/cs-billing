<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/fix-ar-reimbursement-duplicate-items-cleanup.php --invoice-id=140
 *   php scripts/fix-ar-reimbursement-duplicate-items-cleanup.php --invoice-number=EWL2602044014
 *   php scripts/fix-ar-reimbursement-duplicate-items-cleanup.php --so=EWILOG2602044014
 *   php scripts/fix-ar-reimbursement-duplicate-items-cleanup.php --invoice-number=EWL2602044014 --apply
 *
 * Default = DRY-RUN.
 *
 * Scope:
 * - Deteksi item reimbursement duplikat dalam invoice yang menunjuk ke source yang sama
 * - Pertahankan satu item canonical per source reimbursement
 * - Hapus item duplikat
 * - Hitung ulang total invoice
 * - Sync ulang AR dari invoice yang sudah bersih
 *
 * Catatan:
 * - Tidak membuat atau menghapus transaksi bank
 * - Tidak mengubah histori payment customer
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$invoiceIdFilter = null;
$invoiceNumberFilter = null;
$soFilter = null;

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--invoice-id=')) {
        $invoiceIdFilter = trim((string) substr($arg, strlen('--invoice-id=')));
        continue;
    }

    if (str_starts_with($arg, '--invoice-number=')) {
        $invoiceNumberFilter = trim((string) substr($arg, strlen('--invoice-number=')));
        continue;
    }

    if (str_starts_with($arg, '--so=')) {
        $soFilter = trim((string) substr($arg, strlen('--so=')));
    }
}

if ($invoiceIdFilter === null && $invoiceNumberFilter === null && $soFilter === null) {
    fwrite(STDERR, "Wajib beri salah satu filter: --invoice-id=..., --invoice-number=..., atau --so=...\n");
    exit(1);
}

$formatAmount = static function (float $amount): string {
    return number_format($amount, 2, '.', ',');
};

$normalizeInvoiceCandidates = static function (string $value): array {
    $raw = strtoupper(trim($value));
    $compact = preg_replace('/[^A-Z0-9]/', '', $raw) ?: $raw;
    $withoutPrefix = preg_replace('/^EWL/', '', $compact);

    return array_values(array_unique(array_filter([
        $raw,
        $compact,
        $withoutPrefix,
        $withoutPrefix !== '' ? 'EWL' . $withoutPrefix : null,
    ])));
};

$normalizeSoCandidates = static function (string $value): array {
    $raw = strtoupper(trim($value));
    $compact = preg_replace('/[^A-Z0-9]/', '', $raw) ?: $raw;
    $withoutPrefix = preg_replace('/^EWILOG/', '', $compact);
    $withoutPrefix = preg_replace('/^EWL/', '', $withoutPrefix);

    return array_values(array_unique(array_filter([
        $raw,
        $compact,
        $withoutPrefix,
        $withoutPrefix !== '' ? 'EWILOG' . $withoutPrefix : null,
        $withoutPrefix !== '' ? 'EWL' . $withoutPrefix : null,
    ])));
};

$normalizeReimbursementKey = static function (?string $itemRef, ?int $itemId = null): ?string {
    $value = strtolower(trim((string) $itemRef));
    if ($value !== '' && preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $value, $matches)) {
        return 'reimbursement_' . (int) $matches[1];
    }

    if ($value !== '') {
        return $value;
    }

    return $itemId !== null ? 'invoice_item_' . $itemId : null;
};

$describeAr = static function (Invoice $invoice): array {
    $invoice->loadMissing('accountReceivable.components');
    $ar = $invoice->accountReceivable;
    $debit = $ar?->components?->firstWhere('component_type', 'debit_note');
    $main = $ar?->components?->firstWhere('component_type', 'main');

    return [
        'id' => $ar?->id,
        'total' => (float) ($ar?->invoice_amount ?? 0),
        'paid' => (float) ($ar?->paid_amount ?? 0),
        'outstanding' => (float) ($ar?->outstanding_amount ?? 0),
        'status' => (string) ($ar?->status ?? '-'),
        'main_amount' => (float) ($main?->amount ?? 0),
        'main_paid' => (float) ($main?->paid_amount ?? 0),
        'main_outstanding' => (float) ($main?->outstanding_amount ?? 0),
        'debit_amount' => (float) ($debit?->amount ?? 0),
        'debit_paid' => (float) ($debit?->paid_amount ?? 0),
        'debit_outstanding' => (float) ($debit?->outstanding_amount ?? 0),
        'debit_status' => (string) ($debit?->status ?? '-'),
    ];
};

$printAr = static function (string $label, array $snapshot) use ($formatAmount): void {
    if (empty($snapshot['id'])) {
        echo "  {$label}: tidak ada AR linked.\n";
        return;
    }

    echo sprintf(
        "  %s AR#%d | total=%s | paid=%s | outstanding=%s | status=%s\n",
        $label,
        $snapshot['id'],
        $formatAmount($snapshot['total']),
        $formatAmount($snapshot['paid']),
        $formatAmount($snapshot['outstanding']),
        $snapshot['status']
    );
    echo sprintf(
        "    main=%s (paid %s, outstanding %s) | debit=%s (paid %s, outstanding %s, %s)\n",
        $formatAmount($snapshot['main_amount']),
        $formatAmount($snapshot['main_paid']),
        $formatAmount($snapshot['main_outstanding']),
        $formatAmount($snapshot['debit_amount']),
        $formatAmount($snapshot['debit_paid']),
        $formatAmount($snapshot['debit_outstanding']),
        $snapshot['debit_status']
    );
};

$query = Invoice::query()
    ->with(['items', 'salesOrder', 'accountReceivable.components'])
    ->orderBy('id');

if ($invoiceIdFilter !== null && $invoiceIdFilter !== '') {
    if (!ctype_digit($invoiceIdFilter)) {
        fwrite(STDERR, "--invoice-id harus numerik.\n");
        exit(1);
    }

    $query->where('id', (int) $invoiceIdFilter);
}

if ($invoiceNumberFilter !== null && $invoiceNumberFilter !== '') {
    $candidates = $normalizeInvoiceCandidates($invoiceNumberFilter);
    $query->where(function (Builder $builder) use ($candidates, $invoiceNumberFilter) {
        foreach ($candidates as $candidate) {
            $builder->orWhere('invoice_number', $candidate);
        }

        $builder->orWhere('invoice_number', 'like', '%' . $invoiceNumberFilter . '%');
    });
}

if ($soFilter !== null && $soFilter !== '') {
    $candidates = $normalizeSoCandidates($soFilter);
    $query->where(function (Builder $builder) use ($candidates, $soFilter) {
        if (ctype_digit($soFilter)) {
            $builder->orWhere('sales_order_id', (int) $soFilter);
        }

        $builder->orWhereHas('salesOrder', function (Builder $salesOrderQuery) use ($candidates, $soFilter) {
            $salesOrderQuery->where(function (Builder $nested) use ($candidates, $soFilter) {
                foreach ($candidates as $candidate) {
                    $nested->orWhere('order_number', $candidate);
                }

                $nested->orWhere('order_number', 'like', '%' . $soFilter . '%');
            });
        });
    });
}

/** @var Collection<int, Invoice> $invoices */
$invoices = $query->get();

if ($invoices->isEmpty()) {
    echo "Tidak ada invoice yang cocok dengan filter.\n";
    exit(0);
}

echo "=== FIX-AR-REIMB-DUP-001: CLEANUP DUPLICATE REIMBURSEMENT INVOICE ITEMS ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo 'Invoice diperiksa: ' . $invoices->count() . "\n\n";

$processed = 0;
$changed = 0;
$skipped = 0;
$deletedItems = 0;

foreach ($invoices as $invoice) {
    ++$processed;

    $invoice->loadMissing(['items', 'salesOrder', 'accountReceivable.components']);

    $reimbursementItems = $invoice->items
        ->filter(fn (InvoiceItem $item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
        ->values();

    $grouped = $reimbursementItems
        ->groupBy(fn (InvoiceItem $item) => $normalizeReimbursementKey($item->item_ref, $item->id));

    $duplicateGroups = $grouped->filter(fn (Collection $group) => $group->count() > 1);

    echo sprintf(
        "Invoice %s (#%d) | SO %s | reimbursement_items=%d | duplicate_groups=%d\n",
        (string) $invoice->invoice_number,
        (int) $invoice->id,
        (string) ($invoice->salesOrder?->order_number ?? '-'),
        $reimbursementItems->count(),
        $duplicateGroups->count()
    );

    if ($duplicateGroups->isEmpty()) {
        echo "  Skip: tidak ada reimbursement duplikat.\n\n";
        ++$skipped;
        continue;
    }

    $toDelete = collect();

    foreach ($duplicateGroups as $key => $group) {
        $sorted = $group->sort(function (InvoiceItem $left, InvoiceItem $right) {
            $leftRef = strtolower((string) ($left->item_ref ?? ''));
            $rightRef = strtolower((string) ($right->item_ref ?? ''));

            $leftPreferred = str_starts_with($leftRef, 'reimbursement_') ? 1 : 0;
            $rightPreferred = str_starts_with($rightRef, 'reimbursement_') ? 1 : 0;

            if ($leftPreferred !== $rightPreferred) {
                return $rightPreferred <=> $leftPreferred;
            }

            return $right->id <=> $left->id;
        })->values();

        /** @var InvoiceItem $keeper */
        $keeper = $sorted->first();
        $duplicates = $sorted->slice(1)->values();

        echo sprintf(
            "  Source %s | keeper item #%d (%s | %s) | delete=%s\n",
            (string) $key,
            (int) $keeper->id,
            (string) $keeper->description,
            (string) $keeper->item_ref,
            $duplicates->isEmpty() ? '-' : $duplicates->pluck('id')->implode(', ')
        );

        foreach ($duplicates as $dup) {
            echo sprintf(
                "    duplicate item #%d | %s | ref=%s | amount=%s\n",
                (int) $dup->id,
                (string) $dup->description,
                (string) $dup->item_ref,
                $formatAmount((float) $dup->amount)
            );
        }

        $toDelete = $toDelete->merge($duplicates);
    }

    if ($toDelete->isEmpty()) {
        echo "  Skip: tidak ada item aman untuk dihapus.\n\n";
        ++$skipped;
        continue;
    }

    $beforeInvoiceTotal = (float) ($invoice->total ?? 0);
    $beforeSubtotal = (float) ($invoice->subtotal ?? 0);
    $beforeAr = $describeAr($invoice);

    echo sprintf(
        "  Before: subtotal=%s | total=%s\n",
        $formatAmount($beforeSubtotal),
        $formatAmount($beforeInvoiceTotal)
    );
    $printAr('Before', $beforeAr);

    if ($apply) {
        DB::transaction(function () use ($invoice, $toDelete): void {
            InvoiceItem::query()
                ->whereIn('id', $toDelete->pluck('id')->all())
                ->delete();

            $invoice->load('items');
            $invoice->calculateTotals();
            AccountReceivable::syncFromInvoice($invoice->fresh());
        });

        $invoice->refresh()->load(['items', 'salesOrder', 'accountReceivable.components']);
    } else {
        $simulatedSubtotal = max(0, $beforeSubtotal - (float) $toDelete->sum(fn (InvoiceItem $item) => (float) $item->amount));
        $simulatedTotal = max(0, $beforeInvoiceTotal - (float) $toDelete->sum(fn (InvoiceItem $item) => (float) $item->amount));
        $simulatedArTotal = max(0, $beforeAr['total'] - (float) $toDelete->sum(fn (InvoiceItem $item) => (float) $item->amount));
        $simulatedDebit = max(0, $beforeAr['debit_amount'] - (float) $toDelete->sum(fn (InvoiceItem $item) => (float) $item->amount));
        $simulatedDebitPaid = min($simulatedDebit, $beforeAr['debit_paid']);
        $simulatedDebitOutstanding = max(0, $simulatedDebit - $simulatedDebitPaid);
        $simulatedArPaid = $beforeAr['paid'];
        $simulatedArOutstanding = max(0, $simulatedArTotal - $simulatedArPaid);
        $simulatedStatus = $simulatedArOutstanding <= 0.01 ? 'paid' : ($simulatedArPaid > 0.01 ? 'partial' : 'outstanding');
        $simulatedDebitStatus = $simulatedDebitOutstanding <= 0.01 ? 'paid' : ($simulatedDebitPaid > 0.01 ? 'partial' : 'outstanding');

        echo sprintf(
            "  After (simulasi): subtotal=%s | total=%s\n",
            $formatAmount($simulatedSubtotal),
            $formatAmount($simulatedTotal)
        );
        $printAr('After (simulasi)', [
            'id' => $beforeAr['id'],
            'total' => $simulatedArTotal,
            'paid' => $simulatedArPaid,
            'outstanding' => $simulatedArOutstanding,
            'status' => $simulatedStatus,
            'main_amount' => $beforeAr['main_amount'],
            'main_paid' => $beforeAr['main_paid'],
            'main_outstanding' => $beforeAr['main_outstanding'],
            'debit_amount' => $simulatedDebit,
            'debit_paid' => $simulatedDebitPaid,
            'debit_outstanding' => $simulatedDebitOutstanding,
            'debit_status' => $simulatedDebitStatus,
        ]);
    }

    if ($apply) {
        $afterInvoiceTotal = (float) ($invoice->total ?? 0);
        $afterSubtotal = (float) ($invoice->subtotal ?? 0);
        $afterAr = $describeAr($invoice);

        echo sprintf(
            "  After: subtotal=%s | total=%s\n",
            $formatAmount($afterSubtotal),
            $formatAmount($afterInvoiceTotal)
        );
        $printAr('After', $afterAr);
    }

    $deletedCount = $toDelete->count();
    $deletedItems += $deletedCount;
    ++$changed;

    echo sprintf(
        "  %s %d item duplikat reimbursement.\n\n",
        $apply ? 'Deleted' : 'Akan menghapus',
        $deletedCount
    );
}

echo "Selesai. Diproses: {$processed} | Berubah: {$changed} | Tidak berubah: {$skipped}\n";
if ($apply) {
    echo "Deleted invoice items: {$deletedItems}\n";
} else {
    echo "Mode DRY-RUN: tidak ada perubahan yang disimpan.\n";
}
