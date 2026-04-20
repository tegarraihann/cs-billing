<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
use App\Models\AccountPayableNote;
use App\Models\AccountReceivable;
use App\Models\BankTransaction;
use App\Models\ReimbursementItem;
use App\Models\SalesOrder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/repair-so-2603057011-restore-do-charges-and-split-demurrage-lolo.php
 *   php scripts/repair-so-2603057011-restore-do-charges-and-split-demurrage-lolo.php --apply
 *
 * Scope:
 * - Pulihkan customer payment DO CHARGES pada SO EWILOG2603057011
 * - Pecah reimbursement/AP DEMURRAGE 27.837.924 menjadi:
 *   - DEMURRAGE 26.438.880
 *   - LOLO 1.399.044
 * - Rapikan sinkronisasi data reimbursement dan AP tanpa mengubah total payment bank yang sudah terjadi
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2603057011';
$targetReceivableId = 206;
$targetPayableId = 612;
$targetDoDescription = 'DO CHARGES';
$targetDemurrageDescription = 'DEMURRAGE';
$newLoloDescription = 'LOLO';
$targetDoCustomerPaymentAmount = 5012786.00;
$targetDoCustomerPaymentTransactionId = 684;
$targetApPaymentTransactionId = 739;
$targetApPaymentAmount = 27837924.00;
$newDemurrageAmount = 26438880.00;
$newLoloAmount = 1399044.00;
$systemUserId = 1;

$formatAmount = static fn (float $amount): string => number_format($amount, 2, '.', ',');

$resolveReceivableStatus = static function (float $paid, float $outstanding): string {
    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($paid > 0.01) {
        return 'partial';
    }

    return 'outstanding';
};

$getLineTotal = static function (ReimbursementItem $item): float {
    return method_exists($item, 'getLineTotal')
        ? (float) $item->getLineTotal()
        : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0));
};

$so = SalesOrder::query()
    ->with(['reimbursementItems', 'accountReceivables.components', 'accountPayables.components'])
    ->where('order_number', $targetSoNumber)
    ->first();

if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$doCharges = $so->reimbursementItems->first(
    fn (ReimbursementItem $item) => strtoupper((string) $item->description) === $targetDoDescription
);
$demurrage = $so->reimbursementItems->first(
    fn (ReimbursementItem $item) => strtoupper((string) $item->description) === $targetDemurrageDescription
);
$existingLolo = $so->reimbursementItems->first(
    fn (ReimbursementItem $item) => strtoupper((string) $item->description) === $newLoloDescription
);

if (!$doCharges) {
    throw new RuntimeException("Reimbursement {$targetDoDescription} tidak ditemukan.");
}

if (!$demurrage) {
    throw new RuntimeException("Reimbursement {$targetDemurrageDescription} tidak ditemukan.");
}

if ($existingLolo) {
    throw new RuntimeException("Reimbursement {$newLoloDescription} sudah ada. Script ini tidak aman dijalankan ulang.");
}

$receivable = $so->accountReceivables
    ->first(fn (AccountReceivable $item) => (int) $item->id === $targetReceivableId)
    ?? AccountReceivable::query()->with('components')->find($targetReceivableId);

if (!$receivable || (int) $receivable->sales_order_id !== (int) $so->id) {
    throw new RuntimeException("AR #{$targetReceivableId} untuk SO {$targetSoNumber} tidak valid.");
}

$debitComponent = $receivable->components->firstWhere('component_type', 'debit_note');
$mainComponent = $receivable->components->firstWhere('component_type', 'main');

if (!$debitComponent) {
    throw new RuntimeException("Komponen debit_note pada AR #{$receivable->id} tidak ditemukan.");
}

$payable = $so->accountPayables
    ->first(fn (AccountPayable $item) => (int) $item->id === $targetPayableId)
    ?? AccountPayable::query()->with('components')->find($targetPayableId);

if (!$payable || (int) $payable->sales_order_id !== (int) $so->id) {
    throw new RuntimeException("AP #{$targetPayableId} untuk SO {$targetSoNumber} tidak valid.");
}

$apDemurrageComponent = $payable->components->first(
    fn (AccountPayableComponent $component) => (string) $component->description === $targetDemurrageDescription
        && round((float) $component->amount, 2) === round($targetApPaymentAmount, 2)
);

if (!$apDemurrageComponent) {
    throw new RuntimeException("Komponen AP DEMURRAGE {$formatAmount($targetApPaymentAmount)} tidak ditemukan.");
}

$customerPayment = BankTransaction::query()->find($targetDoCustomerPaymentTransactionId);
if (
    !$customerPayment
    || (string) $customerPayment->reference_type !== 'customer_payment'
    || (int) $customerPayment->reference_id !== (int) $receivable->id
    || round((float) $customerPayment->amount, 2) !== round($targetDoCustomerPaymentAmount, 2)
) {
    throw new RuntimeException("Bukti customer payment DO CHARGES tidak valid.");
}

$vendorPayment = BankTransaction::query()->find($targetApPaymentTransactionId);
if (
    !$vendorPayment
    || (string) $vendorPayment->reference_type !== 'vendor_payment'
    || (int) $vendorPayment->reference_id !== (int) $payable->id
    || round((float) $vendorPayment->amount, 2) !== round($targetApPaymentAmount, 2)
) {
    throw new RuntimeException("Bukti vendor payment AP #{$payable->id} tidak valid.");
}

$paymentNote = AccountPayableNote::query()
    ->where('account_payable_id', $payable->id)
    ->where('component_id', $apDemurrageComponent->id)
    ->where('source_type', 'payment')
    ->orderByDesc('id')
    ->first();

$doLineTotal = $getLineTotal($doCharges);
$expectedDoPaid = min($doLineTotal, (float) $customerPayment->amount);
$expectedDoOutstanding = max(0.0, $doLineTotal - $expectedDoPaid);
$expectedDoStatus = $resolveReceivableStatus($expectedDoPaid, $expectedDoOutstanding);
$expectedDoPaidAt = $customerPayment->transaction_date ?: $customerPayment->created_at;

$simulatedReimbursementPaid = (float) $so->reimbursementItems->sum(function (ReimbursementItem $item) use ($doCharges, $expectedDoPaid): float {
    $lineTotal = method_exists($item, 'getLineTotal')
        ? (float) $item->getLineTotal()
        : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0));

    if ((int) $item->id === (int) $doCharges->id) {
        return $expectedDoPaid;
    }

    return min($lineTotal, max(0.0, (float) ($item->customer_paid_amount ?? 0)));
});

$totalReimbursementAmount = 0.0;
foreach ($so->reimbursementItems as $item) {
    if ((int) $item->id === (int) $demurrage->id) {
        $totalReimbursementAmount += $newDemurrageAmount;
        $totalReimbursementAmount += $newLoloAmount;
        continue;
    }

    $totalReimbursementAmount += $getLineTotal($item);
}

$simulatedDebitOutstanding = max(0.0, $totalReimbursementAmount - $simulatedReimbursementPaid);
$simulatedDebitStatus = $resolveReceivableStatus($simulatedReimbursementPaid, $simulatedDebitOutstanding);

$mainPaid = (float) ($mainComponent->paid_amount ?? 0.0);
$mainOutstanding = (float) ($mainComponent->outstanding_amount ?? 0.0);
$simulatedArPaid = $mainPaid + $simulatedReimbursementPaid;
$simulatedArOutstanding = $mainOutstanding + $simulatedDebitOutstanding;
$simulatedArStatus = $resolveReceivableStatus($simulatedArPaid, $simulatedArOutstanding);

$repairSplitNote = sprintf(
    'REPAIR SPLIT: total Rp %s dialokasikan menjadi DEMURRAGE Rp %s + LOLO Rp %s',
    $formatAmount($targetApPaymentAmount),
    $formatAmount($newDemurrageAmount),
    $formatAmount($newLoloAmount)
);

$report = [
    'dry_run' => $dryRun,
    'scope' => [
        'sales_order' => $so->order_number,
        'repair' => 'restore_do_charges_and_split_demurrage_lolo',
        'bank_amount_unchanged' => true,
    ],
    'evidence' => [
        'customer_payment' => [
            'bank_transaction_id' => $customerPayment->id,
            'amount' => (float) $customerPayment->amount,
            'transaction_date' => $customerPayment->transaction_date,
            'description' => $customerPayment->description,
        ],
        'vendor_payment' => [
            'bank_transaction_id' => $vendorPayment->id,
            'amount' => (float) $vendorPayment->amount,
            'transaction_date' => $vendorPayment->transaction_date,
            'description' => $vendorPayment->description,
        ],
    ],
    'before' => [
        'do_charges' => [
            'id' => $doCharges->id,
            'customer_paid_amount' => (float) ($doCharges->customer_paid_amount ?? 0),
            'customer_outstanding_amount' => (float) ($doCharges->customer_outstanding_amount ?? 0),
            'customer_payment_status' => $doCharges->customer_payment_status,
            'customer_paid_at' => (string) $doCharges->customer_paid_at,
        ],
        'demurrage_reimbursement' => [
            'id' => $demurrage->id,
            'amount' => (float) $getLineTotal($demurrage),
            'status' => $demurrage->status,
            'customer_payment_status' => $demurrage->customer_payment_status,
        ],
        'ap_demurrage_component' => [
            'id' => $apDemurrageComponent->id,
            'amount' => (float) $apDemurrageComponent->amount,
            'paid_amount' => (float) $apDemurrageComponent->paid_amount,
            'status' => $apDemurrageComponent->status,
        ],
        'ar' => [
            'id' => $receivable->id,
            'paid_amount' => (float) ($receivable->paid_amount ?? 0),
            'outstanding_amount' => (float) ($receivable->outstanding_amount ?? 0),
            'status' => $receivable->status,
        ],
    ],
    'plan' => [
        'do_charges_after' => [
            'customer_paid_amount' => $expectedDoPaid,
            'customer_outstanding_amount' => $expectedDoOutstanding,
            'customer_payment_status' => $expectedDoStatus,
            'customer_paid_at' => (string) $expectedDoPaidAt,
        ],
        'demurrage_after' => [
            'amount' => $newDemurrageAmount,
            'status' => 'paid',
        ],
        'new_lolo_after' => [
            'amount' => $newLoloAmount,
            'status' => 'paid',
            'customer_payment_status' => 'outstanding',
        ],
        'ap_after' => [
            'header_total_unchanged' => true,
            'demurrage_component_amount' => $newDemurrageAmount,
            'new_lolo_component_amount' => $newLoloAmount,
        ],
        'ar_after' => [
            'paid_amount' => $simulatedArPaid,
            'outstanding_amount' => $simulatedArOutstanding,
            'status' => $simulatedArStatus,
        ],
        'debit_note_after' => [
            'paid_amount' => $simulatedReimbursementPaid,
            'outstanding_amount' => $simulatedDebitOutstanding,
            'status' => $simulatedDebitStatus,
        ],
        'note' => $repairSplitNote,
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

DB::transaction(function () use (
    $so,
    $doCharges,
    $demurrage,
    $receivable,
    $payable,
    $apDemurrageComponent,
    $customerPayment,
    $vendorPayment,
    $expectedDoPaid,
    $expectedDoOutstanding,
    $expectedDoStatus,
    $expectedDoPaidAt,
    $newDemurrageAmount,
    $newLoloAmount,
    $newLoloDescription,
    $repairSplitNote,
    $paymentNote,
    $systemUserId
): void {
    $lockedSo = SalesOrder::query()->lockForUpdate()->find($so->id);
    $lockedDo = ReimbursementItem::query()->lockForUpdate()->find($doCharges->id);
    $lockedDemurrage = ReimbursementItem::query()->lockForUpdate()->find($demurrage->id);
    $lockedAr = AccountReceivable::query()->with('components')->lockForUpdate()->find($receivable->id);
    $lockedPayable = AccountPayable::query()->with('components')->lockForUpdate()->find($payable->id);
    $lockedVendorPayment = BankTransaction::query()->lockForUpdate()->find($vendorPayment->id);

    if (!$lockedSo || !$lockedDo || !$lockedDemurrage || !$lockedAr || !$lockedPayable || !$lockedVendorPayment) {
        throw new RuntimeException('Sebagian data target hilang saat apply.');
    }

    $lockedApDemurrage = $lockedPayable->components->firstWhere('id', $apDemurrageComponent->id);
    if (!$lockedApDemurrage) {
        throw new RuntimeException('Komponen AP demurrage hilang saat apply.');
    }

    $lockedDo->customer_paid_amount = $expectedDoPaid;
    $lockedDo->customer_outstanding_amount = $expectedDoOutstanding;
    $lockedDo->customer_payment_status = $expectedDoStatus;
    $lockedDo->customer_paid_at = $expectedDoPaidAt;
    $lockedDo->notes = trim(
        ((string) ($lockedDo->notes ?? '')) . "\nREPAIR: customer payment restored from bank transaction #{$customerPayment->id}"
    );
    $lockedDo->save();

    $demurrageReceiptInfo = $lockedDemurrage->receipt_info;
    if (!is_array($demurrageReceiptInfo)) {
        $demurrageReceiptInfo = json_decode((string) $demurrageReceiptInfo, true) ?: [];
    }

    $demurrageReceiptInfo['unit_price'] = $newDemurrageAmount;
    $demurrageReceiptInfo['quantity'] = 1;
    $demurrageReceiptInfo['unit'] = 'SET';
    $demurrageReceiptInfo['repair_split_source_reimbursement_id'] = $lockedDemurrage->id;
    $demurrageReceiptInfo['repair_split_total_amount'] = $lockedApDemurrage->amount;

    $lockedDemurrage->amount = $newDemurrageAmount;
    $lockedDemurrage->quantity = 1;
    $lockedDemurrage->unit = 'SET';
    $lockedDemurrage->customer_paid_amount = 0.0;
    $lockedDemurrage->customer_outstanding_amount = $newDemurrageAmount;
    $lockedDemurrage->customer_payment_status = 'outstanding';
    $lockedDemurrage->receipt_info = $demurrageReceiptInfo;
    $lockedDemurrage->notes = trim(((string) ($lockedDemurrage->notes ?? '')) . "\n" . $repairSplitNote);
    $lockedDemurrage->save();

    $newLoloReceiptInfo = $demurrageReceiptInfo;
    $newLoloReceiptInfo['unit_price'] = $newLoloAmount;
    $newLoloReceiptInfo['repair_split_source_reimbursement_id'] = $lockedDemurrage->id;
    unset($newLoloReceiptInfo['account_payable_component_id'], $newLoloReceiptInfo['component_id']);

    $newLolo = ReimbursementItem::query()->create([
        'sales_order_id' => $lockedSo->id,
        'invoice_id' => $lockedDemurrage->invoice_id,
        'description' => $newLoloDescription,
        'amount' => $newLoloAmount,
        'quantity' => 1,
        'unit' => 'SET',
        'vendor_id' => $lockedDemurrage->vendor_id,
        'category' => $lockedDemurrage->category,
        'status' => 'paid',
        'customer_paid_amount' => 0.0,
        'customer_outstanding_amount' => $newLoloAmount,
        'customer_payment_status' => 'outstanding',
        'customer_paid_at' => null,
        'receipt_info' => $newLoloReceiptInfo,
        'notes' => trim(((string) ($lockedDemurrage->notes ?? 'PAID')) . "\nREPAIR: split from reimbursement #{$lockedDemurrage->id}"),
        'created_by' => $lockedDemurrage->created_by ?? $systemUserId,
        'approved_by' => $lockedDemurrage->approved_by,
        'linked_at' => $lockedDemurrage->linked_at,
        'invoiced_at' => $lockedDemurrage->invoiced_at,
        'paid_at' => $lockedDemurrage->paid_at,
    ]);

    $lockedApDemurrage->amount = $newDemurrageAmount;
    $lockedApDemurrage->paid_amount = $newDemurrageAmount;
    $lockedApDemurrage->outstanding_amount = 0.0;
    $lockedApDemurrage->status = 'paid';

    $relatedItems = $lockedApDemurrage->related_items;
    if (!is_array($relatedItems)) {
        $relatedItems = json_decode((string) $relatedItems, true) ?: [];
    }
    $relatedItems['reimbursement_item_id'] = $lockedDemurrage->id;
    $relatedItems['quantity'] = 1;
    $relatedItems['unit'] = 'SET';
    $relatedItems['unit_price'] = $newDemurrageAmount;
    $relatedItems['lookup_ref'] = 'reimbursement_' . $lockedDemurrage->id;
    $lockedApDemurrage->related_items = $relatedItems;
    $lockedApDemurrage->save();

    $newLoloComponent = new AccountPayableComponent([
        'account_payable_id' => $lockedPayable->id,
        'component_type' => 'reimbursement',
        'description' => $newLoloDescription,
        'amount' => $newLoloAmount,
        'paid_amount' => $newLoloAmount,
        'outstanding_amount' => 0.0,
        'status' => 'paid',
        'due_date' => $lockedPayable->payment_due_date,
        'recipient_name' => $lockedPayable->vendor_name,
        'vendor_id' => $lockedPayable->vendor_id,
        'related_items' => [
            'source' => 'reimbursement_items',
            'reimbursement_item_id' => $newLolo->id,
            'category' => $newLolo->category,
            'quantity' => 1,
            'unit' => 'SET',
            'unit_price' => $newLoloAmount,
            'lookup_ref' => 'reimbursement_' . $newLolo->id,
        ],
    ]);
    $newLoloComponent->save();

    $newLoloReceiptInfo['account_payable_id'] = $lockedPayable->id;
    $newLoloReceiptInfo['account_payable_component_id'] = $newLoloComponent->id;
    $newLoloReceiptInfo['component_id'] = $newLoloComponent->id;
    $newLoloReceiptInfo['account_payable_vendor'] = $lockedPayable->vendor_name;
    $newLoloReceiptInfo['account_payable_invoice_number'] = $lockedPayable->vendor_invoice_number;
    $newLolo->receipt_info = $newLoloReceiptInfo;
    $newLolo->save();

    $demurrageReceiptInfo['account_payable_component_id'] = $lockedApDemurrage->id;
    $demurrageReceiptInfo['component_id'] = $lockedApDemurrage->id;
    $lockedDemurrage->receipt_info = $demurrageReceiptInfo;
    $lockedDemurrage->save();

    $lockedPayable->recalculateTotals(true);

    $lockedVendorPayment->description = 'Payment for Reimbursement - SEACON BINTANG SEJAHTERA: DEMURRAGE, LOLO';
    $lockedVendorPayment->save();

    $paymentLines = [
        'Payment allocation - Reimbursement - SEACON BINTANG SEJAHTERA (DEMURRAGE Rp ' . number_format($newDemurrageAmount, 2, '.', ',') . ') - PAID 31/03/2026',
        'Payment allocation - Reimbursement - SEACON BINTANG SEJAHTERA (LOLO Rp ' . number_format($newLoloAmount, 2, '.', ',') . ') - PAID 31/03/2026',
    ];
    $lockedPayable->payment_notes = implode("\n", $paymentLines);
    $lockedPayable->save();

    if ($paymentNote) {
        $paymentNote->component_id = $lockedApDemurrage->id;
        $paymentNote->note = 'Payment allocation - Reimbursement - SEACON BINTANG SEJAHTERA (DEMURRAGE Rp '
            . number_format($newDemurrageAmount, 2, '.', ',')
            . ') - PAID 31/03/2026';
        $paymentNote->save();
    }

    AccountPayableNote::query()->create([
        'sales_order_id' => $lockedSo->id,
        'account_payable_id' => $lockedPayable->id,
        'component_id' => $newLoloComponent->id,
        'source_type' => 'payment',
        'note' => 'Payment allocation - Reimbursement - SEACON BINTANG SEJAHTERA (LOLO Rp '
            . number_format($newLoloAmount, 2, '.', ',')
            . ') - PAID 31/03/2026',
        'created_by' => $paymentNote?->created_by ?? $systemUserId,
    ]);

    AccountPayableNote::query()->create([
        'sales_order_id' => $lockedSo->id,
        'account_payable_id' => $lockedPayable->id,
        'component_id' => null,
        'source_type' => 'repair',
        'note' => $repairSplitNote,
        'created_by' => $systemUserId,
    ]);

    AccountReceivable::createOrUpdatePreInvoiceFromSalesOrder($lockedSo);
});

$afterSo = SalesOrder::query()->with(['reimbursementItems', 'accountReceivables.components', 'accountPayables.components'])->find($so->id);
$afterAr = $afterSo?->accountReceivables->firstWhere('id', $receivable->id);
$afterDebit = $afterAr?->components->firstWhere('component_type', 'debit_note');
$afterPayable = $afterSo?->accountPayables->firstWhere('id', $payable->id);

echo "DONE - REPAIR 2603-057011 BERHASIL\n";
echo json_encode([
    'after' => [
        'reimbursements' => $afterSo?->reimbursementItems
            ? $afterSo->reimbursementItems
                ->sortBy('id')
                ->values()
                ->map(fn (ReimbursementItem $item) => [
                    'id' => $item->id,
                    'description' => $item->description,
                    'amount' => (float) $getLineTotal($item),
                    'status' => $item->status,
                    'customer_payment_status' => $item->customer_payment_status,
                    'customer_paid_amount' => (float) ($item->customer_paid_amount ?? 0),
                    'customer_outstanding_amount' => (float) ($item->customer_outstanding_amount ?? 0),
                ])
                ->all()
            : [],
        'ar' => $afterAr ? [
            'id' => $afterAr->id,
            'paid_amount' => (float) ($afterAr->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterAr->outstanding_amount ?? 0),
            'status' => $afterAr->status,
        ] : null,
        'debit_note_component' => $afterDebit ? [
            'id' => $afterDebit->id,
            'paid_amount' => (float) ($afterDebit->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterDebit->outstanding_amount ?? 0),
            'status' => $afterDebit->status,
        ] : null,
        'payable_components' => $afterPayable?->components
            ? $afterPayable->components
                ->sortBy('id')
                ->values()
                ->map(fn ($component) => [
                    'id' => $component->id,
                    'description' => $component->description,
                    'amount' => (float) $component->amount,
                    'paid_amount' => (float) $component->paid_amount,
                    'outstanding_amount' => (float) $component->outstanding_amount,
                    'status' => $component->status,
                ])
                ->all()
            : [],
    ],
    'note' => 'Total bank payment tetap sama; yang dirapikan hanya struktur rincian reimbursement/AP dan customer payment DO CHARGES.',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
