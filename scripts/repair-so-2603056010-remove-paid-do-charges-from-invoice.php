<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\AccountReceivableComponent;
use App\Models\BankTransaction;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\ReimbursementItem;
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
 *   php scripts/repair-so-2603056010-remove-paid-do-charges-from-invoice.php
 *   php scripts/repair-so-2603056010-remove-paid-do-charges-from-invoice.php --apply
 *
 * Scope:
 * - Hapus DO CHARGES yang sudah dibayar customer dari item invoice EWL2603056010
 * - Pertahankan payment history DO CHARGES pada reimbursement source dan bank transaction
 * - Recalculate invoice total dan AR agar PDF/invoice tidak menagih DO CHARGES lagi
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetInvoiceNumber = 'EWL2603056010';
$targetReimbursementId = 452;
$targetInvoiceItemRef = 'reimbursement_' . $targetReimbursementId;
$targetDescription = 'DO CHARGES';
$targetAmount = 7369180.00;
$tolerance = 0.01;

$formatAmount = static fn (float $amount): string => number_format($amount, 2, '.', ',');

$resolveStatus = static function (float $paid, float $outstanding, ?string $dueDate = null): string {
    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($paid > 0.01) {
        return 'partial';
    }

    if ($dueDate && \Carbon\Carbon::today()->gt(\Carbon\Carbon::parse($dueDate))) {
        return 'overdue';
    }

    return 'outstanding';
};

$lineTotal = static function (ReimbursementItem $item): float {
    return method_exists($item, 'getLineTotal')
        ? (float) $item->getLineTotal()
        : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0));
};

$calculateInvoiceCustomerTotal = static function (Collection $items): float {
    $mainAmount = (float) $items
        ->filter(fn (InvoiceItem $item) => in_array(strtolower((string) ($item->item_type ?? 'billable')), ['billable', ''], true))
        ->sum('amount');

    $reimbursementAmount = (float) $items
        ->filter(fn (InvoiceItem $item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
        ->groupBy(function (InvoiceItem $item): string {
            $itemRef = strtolower(trim((string) ($item->item_ref ?? '')));

            if ($itemRef !== '' && preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $itemRef, $matches)) {
                return 'reimbursement_' . (int) $matches[1];
            }

            return 'invoice_item_' . (string) $item->id;
        })
        ->sum(function (Collection $group): float {
            return (float) $group->max(fn (InvoiceItem $item) => (float) ($item->amount ?? 0));
        });

    return round($mainAmount + $reimbursementAmount, 2);
};

$invoice = Invoice::query()
    ->with(['items', 'salesOrder.reimbursementItems', 'accountReceivable.components'])
    ->where('invoice_number', $targetInvoiceNumber)
    ->first();

if (!$invoice) {
    throw new RuntimeException("Invoice {$targetInvoiceNumber} tidak ditemukan.");
}

$targetInvoiceItems = $invoice->items
    ->filter(function (InvoiceItem $item) use ($targetInvoiceItemRef, $targetDescription, $targetAmount, $tolerance): bool {
        $description = strtoupper((string) $item->description);
        $amount = (float) ($item->amount ?? 0);

        return strtolower((string) $item->item_type) === 'reimbursement'
            && strtolower((string) $item->item_ref) === strtolower($targetInvoiceItemRef)
            && str_contains($description, $targetDescription)
            && abs($amount - $targetAmount) <= $tolerance;
    })
    ->values();

if ($targetInvoiceItems->isEmpty()) {
    throw new RuntimeException("Item invoice {$targetDescription} {$formatAmount($targetAmount)} tidak ditemukan pada {$targetInvoiceNumber}.");
}

if ($targetInvoiceItems->count() > 1) {
    throw new RuntimeException("Ditemukan lebih dari satu item {$targetDescription}; repair dihentikan agar tidak salah hapus.");
}

/** @var InvoiceItem $targetInvoiceItem */
$targetInvoiceItem = $targetInvoiceItems->first();

$reimbursement = ReimbursementItem::query()
    ->where('id', $targetReimbursementId)
    ->where('sales_order_id', $invoice->sales_order_id)
    ->first();

if (!$reimbursement) {
    throw new RuntimeException("Reimbursement #{$targetReimbursementId} tidak ditemukan untuk invoice {$targetInvoiceNumber}.");
}

$reimbursementLineTotal = $lineTotal($reimbursement);
if (abs($reimbursementLineTotal - $targetAmount) > $tolerance) {
    throw new RuntimeException(
        "Nominal reimbursement #{$targetReimbursementId} tidak sesuai. Expected {$formatAmount($targetAmount)}, actual {$formatAmount($reimbursementLineTotal)}."
    );
}

$receivable = $invoice->accountReceivable;
if (!$receivable) {
    $receivable = AccountReceivable::query()
        ->with('components')
        ->where('invoice_id', $invoice->id)
        ->first();
}

if (!$receivable) {
    throw new RuntimeException("AR untuk invoice {$targetInvoiceNumber} tidak ditemukan.");
}

$customerPayment = BankTransaction::query()
    ->where('reference_type', 'customer_payment')
    ->where('reference_id', $receivable->id)
    ->where('amount', $targetAmount)
    ->orderBy('id')
    ->first();

if (!$customerPayment && strtolower((string) $reimbursement->customer_payment_status) !== 'paid') {
    throw new RuntimeException("Payment customer DO CHARGES tidak ditemukan, dan reimbursement belum berstatus paid.");
}

$itemsAfterRemoval = $invoice->items
    ->reject(fn (InvoiceItem $item) => (int) $item->id === (int) $targetInvoiceItem->id)
    ->values();

$invoiceTotalBefore = $calculateInvoiceCustomerTotal($invoice->items);
$invoiceTotalAfter = $calculateInvoiceCustomerTotal($itemsAfterRemoval);

$mainComponent = $receivable->components->firstWhere('component_type', 'main');
$debitComponent = $receivable->components->firstWhere('component_type', 'debit_note')
    ?? $receivable->components->firstWhere('component_type', 'reimbursement');

$debitPaidBefore = (float) ($debitComponent?->paid_amount ?? 0);
$debitPaidAfter = max(0.0, round($debitPaidBefore - $targetAmount, 2));

$reimbursementAmountAfter = (float) $itemsAfterRemoval
    ->filter(fn (InvoiceItem $item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
    ->groupBy(function (InvoiceItem $item): string {
        $itemRef = strtolower(trim((string) ($item->item_ref ?? '')));

        if ($itemRef !== '' && preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $itemRef, $matches)) {
            return 'reimbursement_' . (int) $matches[1];
        }

        return 'invoice_item_' . (string) $item->id;
    })
    ->sum(function (Collection $group): float {
        return (float) $group->max(fn (InvoiceItem $item) => (float) ($item->amount ?? 0));
    });

$mainAmountAfter = (float) $itemsAfterRemoval
    ->filter(fn (InvoiceItem $item) => in_array(strtolower((string) ($item->item_type ?? 'billable')), ['billable', ''], true))
    ->sum('amount');

$mainPaidAfter = min((float) ($mainComponent?->paid_amount ?? 0), $mainAmountAfter);
$mainOutstandingAfter = max(0.0, $mainAmountAfter - $mainPaidAfter);
$debitPaidAfter = min($debitPaidAfter, $reimbursementAmountAfter);
$debitOutstandingAfter = max(0.0, $reimbursementAmountAfter - $debitPaidAfter);
$arPaidAfter = round($mainPaidAfter + $debitPaidAfter, 2);
$arOutstandingAfter = round($mainOutstandingAfter + $debitOutstandingAfter, 2);
$arAmountAfter = round($mainAmountAfter + $reimbursementAmountAfter, 2);

$report = [
    'dry_run' => $dryRun,
    'scope' => [
        'invoice_number' => $invoice->invoice_number,
        'sales_order_id' => $invoice->sales_order_id,
        'remove_invoice_item_id' => $targetInvoiceItem->id,
        'reimbursement_id' => $reimbursement->id,
        'bank_modified' => false,
    ],
    'evidence' => [
        'invoice_item' => [
            'id' => $targetInvoiceItem->id,
            'description' => $targetInvoiceItem->description,
            'item_ref' => $targetInvoiceItem->item_ref,
            'amount' => (float) $targetInvoiceItem->amount,
        ],
        'reimbursement' => [
            'id' => $reimbursement->id,
            'description' => $reimbursement->description,
            'status' => $reimbursement->status,
            'customer_payment_status' => $reimbursement->customer_payment_status,
            'customer_paid_amount' => (float) ($reimbursement->customer_paid_amount ?? 0),
            'customer_outstanding_amount' => (float) ($reimbursement->customer_outstanding_amount ?? 0),
            'invoice_id' => $reimbursement->invoice_id,
        ],
        'customer_payment_bank_transaction' => $customerPayment ? [
            'id' => $customerPayment->id,
            'reference_type' => $customerPayment->reference_type,
            'reference_id' => $customerPayment->reference_id,
            'transaction_date' => (string) $customerPayment->transaction_date,
            'amount' => (float) $customerPayment->amount,
        ] : null,
    ],
    'before' => [
        'invoice' => [
            'subtotal' => (float) $invoice->subtotal,
            'total' => (float) $invoice->total,
            'calculated_customer_total' => $invoiceTotalBefore,
        ],
        'ar' => [
            'id' => $receivable->id,
            'invoice_amount' => (float) $receivable->invoice_amount,
            'paid_amount' => (float) $receivable->paid_amount,
            'outstanding_amount' => (float) $receivable->outstanding_amount,
            'status' => $receivable->status,
        ],
        'debit_component' => $debitComponent ? [
            'id' => $debitComponent->id,
            'amount' => (float) $debitComponent->amount,
            'paid_amount' => (float) $debitComponent->paid_amount,
            'outstanding_amount' => (float) $debitComponent->outstanding_amount,
            'status' => $debitComponent->status,
        ] : null,
    ],
    'after_plan' => [
        'invoice' => [
            'subtotal' => $invoiceTotalAfter,
            'total' => $invoiceTotalAfter,
            'removed_amount' => $targetAmount,
        ],
        'reimbursement' => [
            'invoice_id' => null,
            'customer_payment_status' => 'paid',
            'customer_paid_amount' => $targetAmount,
            'customer_outstanding_amount' => 0.0,
        ],
        'ar' => [
            'invoice_amount' => $arAmountAfter,
            'paid_amount' => $arPaidAfter,
            'outstanding_amount' => $arOutstandingAfter,
            'status' => $resolveStatus($arPaidAfter, $arOutstandingAfter, optional($receivable->due_date)->toDateString()),
        ],
        'debit_component' => [
            'amount' => $reimbursementAmountAfter,
            'paid_amount' => $debitPaidAfter,
            'outstanding_amount' => $debitOutstandingAfter,
            'status' => $resolveStatus($debitPaidAfter, $debitOutstandingAfter, optional($debitComponent?->due_date)->toDateString()),
        ],
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

DB::transaction(function () use (
    $invoice,
    $receivable,
    $targetInvoiceItem,
    $reimbursement,
    $customerPayment,
    $targetAmount,
    $invoiceTotalAfter,
    $mainAmountAfter,
    $mainPaidAfter,
    $mainOutstandingAfter,
    $reimbursementAmountAfter,
    $debitPaidAfter,
    $debitOutstandingAfter,
    $arAmountAfter,
    $arPaidAfter,
    $arOutstandingAfter,
    $resolveStatus
): void {
    $lockedInvoice = Invoice::query()
        ->with(['items', 'accountReceivable.components'])
        ->lockForUpdate()
        ->find($invoice->id);

    if (!$lockedInvoice) {
        throw new RuntimeException('Invoice target hilang saat apply.');
    }

    $lockedItem = InvoiceItem::query()
        ->where('invoice_id', $lockedInvoice->id)
        ->lockForUpdate()
        ->find($targetInvoiceItem->id);

    if (!$lockedItem) {
        throw new RuntimeException('Item DO CHARGES sudah tidak ada saat apply.');
    }

    $lockedReimbursement = ReimbursementItem::query()
        ->lockForUpdate()
        ->find($reimbursement->id);

    if (!$lockedReimbursement) {
        throw new RuntimeException('Reimbursement DO CHARGES hilang saat apply.');
    }

    $lockedReceivable = AccountReceivable::query()
        ->with('components')
        ->lockForUpdate()
        ->find($receivable->id);

    if (!$lockedReceivable) {
        throw new RuntimeException('AR target hilang saat apply.');
    }

    $lockedItem->delete();

    $lockedReimbursement->invoice_id = null;
    $lockedReimbursement->customer_paid_amount = $targetAmount;
    $lockedReimbursement->customer_outstanding_amount = 0;
    $lockedReimbursement->customer_payment_status = 'paid';
    if (!$lockedReimbursement->customer_paid_at && $customerPayment) {
        $lockedReimbursement->customer_paid_at = $customerPayment->transaction_date ?: $customerPayment->created_at;
    }

    $notes = (string) ($lockedReimbursement->notes ?? '');
    $repairNote = 'REPAIR: removed from invoice ' . $lockedInvoice->invoice_number . ' because customer already paid DO CHARGES';
    if (!str_contains($notes, $repairNote)) {
        $lockedReimbursement->notes = trim($notes === '' ? $repairNote : ($notes . "\n" . $repairNote));
    }
    $lockedReimbursement->save();

    $lockedInvoice->subtotal = $invoiceTotalAfter;
    $lockedInvoice->total = $invoiceTotalAfter;
    $lockedInvoice->save();

    $mainComponent = $lockedReceivable->components->firstWhere('component_type', 'main');
    if ($mainComponent) {
        $mainComponent->amount = $mainAmountAfter;
        $mainComponent->paid_amount = $mainPaidAfter;
        $mainComponent->outstanding_amount = $mainOutstandingAfter;
        $mainComponent->status = $resolveStatus($mainPaidAfter, $mainOutstandingAfter, optional($mainComponent->due_date)->toDateString());
        $mainComponent->save();
    }

    $debitComponent = $lockedReceivable->components->firstWhere('component_type', 'debit_note')
        ?? $lockedReceivable->components->firstWhere('component_type', 'reimbursement');

    if ($debitComponent) {
        $debitComponent->amount = $reimbursementAmountAfter;
        $debitComponent->paid_amount = $debitPaidAfter;
        $debitComponent->outstanding_amount = $debitOutstandingAfter;
        $debitComponent->status = $resolveStatus($debitPaidAfter, $debitOutstandingAfter, optional($debitComponent->due_date)->toDateString());
        $debitComponent->save();
    }

    $lockedReceivable->invoice_amount = $arAmountAfter;
    $lockedReceivable->paid_amount = $arPaidAfter;
    $lockedReceivable->outstanding_amount = $arOutstandingAfter;
    $lockedReceivable->status = $resolveStatus($arPaidAfter, $arOutstandingAfter, optional($lockedReceivable->due_date)->toDateString());
    $lockedReceivable->save();
});

$afterInvoice = Invoice::query()
    ->with(['items', 'accountReceivable.components'])
    ->find($invoice->id);
$afterReimbursement = ReimbursementItem::query()->find($reimbursement->id);
$afterReceivable = $afterInvoice?->accountReceivable;
$afterDebit = $afterReceivable?->components->firstWhere('component_type', 'debit_note')
    ?? $afterReceivable?->components->firstWhere('component_type', 'reimbursement');

echo "DONE - DO CHARGES BERHASIL DIHAPUS DARI INVOICE {$targetInvoiceNumber}\n";
echo json_encode([
    'invoice' => [
        'id' => $afterInvoice?->id,
        'invoice_number' => $afterInvoice?->invoice_number,
        'subtotal' => (float) ($afterInvoice?->subtotal ?? 0),
        'total' => (float) ($afterInvoice?->total ?? 0),
        'do_charges_item_exists' => $afterInvoice?->items
            ->contains(fn (InvoiceItem $item) => strtolower((string) $item->item_ref) === strtolower($targetInvoiceItemRef)),
    ],
    'reimbursement' => [
        'id' => $afterReimbursement?->id,
        'invoice_id' => $afterReimbursement?->invoice_id,
        'customer_payment_status' => $afterReimbursement?->customer_payment_status,
        'customer_paid_amount' => (float) ($afterReimbursement?->customer_paid_amount ?? 0),
        'customer_outstanding_amount' => (float) ($afterReimbursement?->customer_outstanding_amount ?? 0),
    ],
    'ar' => [
        'id' => $afterReceivable?->id,
        'invoice_amount' => (float) ($afterReceivable?->invoice_amount ?? 0),
        'paid_amount' => (float) ($afterReceivable?->paid_amount ?? 0),
        'outstanding_amount' => (float) ($afterReceivable?->outstanding_amount ?? 0),
        'status' => $afterReceivable?->status,
    ],
    'debit_component' => [
        'id' => $afterDebit?->id,
        'amount' => (float) ($afterDebit?->amount ?? 0),
        'paid_amount' => (float) ($afterDebit?->paid_amount ?? 0),
        'outstanding_amount' => (float) ($afterDebit?->outstanding_amount ?? 0),
        'status' => $afterDebit?->status,
    ],
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;

