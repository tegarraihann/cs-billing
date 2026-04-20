<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\ReimbursementItem;
use App\Models\SalesOrder;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/repair-so-2603055009-ar-do-charges-customer-paid.php
 *   php scripts/repair-so-2603055009-ar-do-charges-customer-paid.php --apply
 *
 * Scope:
 * - Pulihkan customer payment untuk reimbursement DO CHARGES pada SO EWILOG2603055009
 * - Sinkronkan ulang AR pre-invoice agar komponen debit note membaca payment tersebut
 * - Tidak mengubah AP karena belum ada bukti payment yang valid untuk AP #637
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2603055009';
$targetDescription = 'DO CHARGES';
$targetArId = 207;
$customerPaymentReferenceType = 'customer_payment';
$customerPaymentAmount = 8067560.00;

$formatAmount = static fn (float $amount): string => number_format($amount, 2, '.', ',');

$resolveStatus = static function (float $paid, float $outstanding): string {
    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($paid > 0.01) {
        return 'partial';
    }

    return 'outstanding';
};

$so = SalesOrder::query()
    ->with(['reimbursementItems', 'accountReceivables.components'])
    ->where('order_number', $targetSoNumber)
    ->first();

if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$doCharges = $so->reimbursementItems
    ->first(fn (ReimbursementItem $item) => strtoupper((string) $item->description) === $targetDescription);

if (!$doCharges) {
    throw new RuntimeException("Reimbursement {$targetDescription} pada SO {$targetSoNumber} tidak ditemukan.");
}

$receivable = $so->accountReceivables
    ->first(fn (AccountReceivable $item) => (int) $item->id === $targetArId);

if (!$receivable) {
    $receivable = AccountReceivable::query()
        ->with('components')
        ->find($targetArId);
}

if (!$receivable || (int) $receivable->sales_order_id !== (int) $so->id) {
    throw new RuntimeException("AR #{$targetArId} untuk SO {$targetSoNumber} tidak valid.");
}

$debitNoteComponent = $receivable->components
    ->first(fn ($component) => (string) $component->component_type === 'debit_note');

if (!$debitNoteComponent) {
    throw new RuntimeException("Komponen debit_note pada AR #{$receivable->id} tidak ditemukan.");
}

$customerPayment = DB::table('bank_transactions')
    ->where('reference_type', $customerPaymentReferenceType)
    ->where('reference_id', $receivable->id)
    ->where('amount', $customerPaymentAmount)
    ->orderBy('id')
    ->first();

if (!$customerPayment) {
    throw new RuntimeException(
        "Bukti customer payment sebesar {$formatAmount($customerPaymentAmount)} untuk AR #{$receivable->id} tidak ditemukan."
    );
}

$lineTotal = method_exists($doCharges, 'getLineTotal')
    ? (float) $doCharges->getLineTotal()
    : ((float) $doCharges->amount * ((float) $doCharges->quantity > 0 ? (float) $doCharges->quantity : 1.0));

$expectedPaidAmount = min($lineTotal, (float) $customerPayment->amount);
$expectedOutstandingAmount = max(0.0, $lineTotal - $expectedPaidAmount);
$expectedCustomerStatus = $resolveStatus($expectedPaidAmount, $expectedOutstandingAmount);
$expectedCustomerPaidAt = $customerPayment->transaction_date ?: $customerPayment->created_at;

$existingReimbursements = $so->reimbursementItems;
$totalReimbursementAmount = (float) $existingReimbursements->sum(function (ReimbursementItem $item): float {
    return method_exists($item, 'getLineTotal')
        ? (float) $item->getLineTotal()
        : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0));
});

$simulatedReimbursementPaid = (float) $existingReimbursements->sum(function (ReimbursementItem $item) use ($doCharges, $expectedPaidAmount): float {
    if ((int) $item->id === (int) $doCharges->id) {
        return $expectedPaidAmount;
    }

    return min(
        method_exists($item, 'getLineTotal')
            ? (float) $item->getLineTotal()
            : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0)),
        max(0.0, (float) ($item->customer_paid_amount ?? 0))
    );
});

$simulatedDebitOutstanding = max(0.0, $totalReimbursementAmount - $simulatedReimbursementPaid);
$simulatedDebitStatus = $resolveStatus($simulatedReimbursementPaid, $simulatedDebitOutstanding);

$mainComponent = $receivable->components
    ->first(fn ($component) => (string) $component->component_type === 'main');
$mainPaid = (float) ($mainComponent->paid_amount ?? 0.0);
$mainOutstanding = (float) ($mainComponent->outstanding_amount ?? 0.0);

$simulatedArPaid = $mainPaid + $simulatedReimbursementPaid;
$simulatedArOutstanding = $mainOutstanding + $simulatedDebitOutstanding;
$simulatedArStatus = $resolveStatus($simulatedArPaid, $simulatedArOutstanding);

$report = [
    'dry_run' => $dryRun,
    'scope' => [
        'sales_order' => $so->order_number,
        'repair' => 'customer_payment_do_charges_only',
        'ap_modified' => false,
    ],
    'evidence' => [
        'bank_transaction_id' => $customerPayment->id,
        'reference_type' => $customerPayment->reference_type,
        'reference_id' => $customerPayment->reference_id,
        'transaction_date' => $customerPayment->transaction_date,
        'amount' => (float) $customerPayment->amount,
        'description' => $customerPayment->description,
    ],
    'before' => [
        'reimbursement' => [
            'id' => $doCharges->id,
            'description' => $doCharges->description,
            'line_total' => $lineTotal,
            'customer_paid_amount' => (float) ($doCharges->customer_paid_amount ?? 0),
            'customer_outstanding_amount' => (float) ($doCharges->customer_outstanding_amount ?? 0),
            'customer_payment_status' => $doCharges->customer_payment_status,
            'customer_paid_at' => (string) $doCharges->customer_paid_at,
        ],
        'ar' => [
            'id' => $receivable->id,
            'paid_amount' => (float) ($receivable->paid_amount ?? 0),
            'outstanding_amount' => (float) ($receivable->outstanding_amount ?? 0),
            'status' => $receivable->status,
        ],
        'debit_note_component' => [
            'id' => $debitNoteComponent->id,
            'amount' => (float) ($debitNoteComponent->amount ?? 0),
            'paid_amount' => (float) ($debitNoteComponent->paid_amount ?? 0),
            'outstanding_amount' => (float) ($debitNoteComponent->outstanding_amount ?? 0),
            'status' => $debitNoteComponent->status,
        ],
    ],
    'plan' => [
        'reimbursement_after' => [
            'customer_paid_amount' => $expectedPaidAmount,
            'customer_outstanding_amount' => $expectedOutstandingAmount,
            'customer_payment_status' => $expectedCustomerStatus,
            'customer_paid_at' => (string) $expectedCustomerPaidAt,
        ],
        'debit_note_component_after' => [
            'paid_amount' => $simulatedReimbursementPaid,
            'outstanding_amount' => $simulatedDebitOutstanding,
            'status' => $simulatedDebitStatus,
        ],
        'ar_after' => [
            'paid_amount' => $simulatedArPaid,
            'outstanding_amount' => $simulatedArOutstanding,
            'status' => $simulatedArStatus,
        ],
        'note' => 'AP #637 tidak diubah karena tidak ada bukti payment valid untuk trucking 4.600.000 / LOLO 2 1.454.100.',
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

DB::transaction(function () use ($so, $doCharges, $receivable, $customerPayment, $expectedPaidAmount, $expectedOutstandingAmount, $expectedCustomerStatus, $expectedCustomerPaidAt): void {
    $lockedSo = SalesOrder::query()
        ->lockForUpdate()
        ->find($so->id);

    if (!$lockedSo) {
        throw new RuntimeException('SO target hilang saat apply.');
    }

    $lockedReimbursement = ReimbursementItem::query()
        ->lockForUpdate()
        ->find($doCharges->id);

    if (!$lockedReimbursement) {
        throw new RuntimeException('Reimbursement DO CHARGES hilang saat apply.');
    }

    $lockedAr = AccountReceivable::query()
        ->lockForUpdate()
        ->find($receivable->id);

    if (!$lockedAr) {
        throw new RuntimeException('AR target hilang saat apply.');
    }

    $lockedReimbursement->customer_paid_amount = $expectedPaidAmount;
    $lockedReimbursement->customer_outstanding_amount = $expectedOutstandingAmount;
    $lockedReimbursement->customer_payment_status = $expectedCustomerStatus;
    $lockedReimbursement->customer_paid_at = $expectedCustomerPaidAt;

    $notes = (string) ($lockedReimbursement->notes ?? '');
    $repairNote = 'REPAIR: customer payment restored from bank transaction #' . $customerPayment->id;
    if (!str_contains($notes, $repairNote)) {
        $lockedReimbursement->notes = trim($notes === '' ? $repairNote : ($notes . "\n" . $repairNote));
    }

    $lockedReimbursement->save();

    AccountReceivable::createOrUpdatePreInvoiceFromSalesOrder($lockedSo);
});

$afterReimbursement = ReimbursementItem::query()->find($doCharges->id);
$afterAr = AccountReceivable::query()->with('components')->find($receivable->id);
$afterDebitNote = $afterAr?->components->first(fn ($component) => (string) $component->component_type === 'debit_note');

echo "DONE - CUSTOMER PAYMENT DO CHARGES BERHASIL DIPULIHKAN\n";
echo json_encode([
    'after' => [
        'reimbursement' => [
            'id' => $afterReimbursement?->id,
            'customer_paid_amount' => (float) ($afterReimbursement?->customer_paid_amount ?? 0),
            'customer_outstanding_amount' => (float) ($afterReimbursement?->customer_outstanding_amount ?? 0),
            'customer_payment_status' => $afterReimbursement?->customer_payment_status,
            'customer_paid_at' => (string) $afterReimbursement?->customer_paid_at,
        ],
        'ar' => [
            'id' => $afterAr?->id,
            'paid_amount' => (float) ($afterAr?->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterAr?->outstanding_amount ?? 0),
            'status' => $afterAr?->status,
        ],
        'debit_note_component' => [
            'id' => $afterDebitNote?->id,
            'paid_amount' => (float) ($afterDebitNote?->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterDebitNote?->outstanding_amount ?? 0),
            'status' => $afterDebitNote?->status,
        ],
    ],
    'note' => 'AP tidak diubah oleh script ini.',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
