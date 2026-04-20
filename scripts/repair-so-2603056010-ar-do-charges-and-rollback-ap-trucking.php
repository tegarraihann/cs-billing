<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableNote;
use App\Models\AccountReceivable;
use App\Models\BankBalance;
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
 *   php scripts/repair-so-2603056010-ar-do-charges-and-rollback-ap-trucking.php
 *   php scripts/repair-so-2603056010-ar-do-charges-and-rollback-ap-trucking.php --apply
 *
 * Scope:
 * - Pulihkan customer payment DO CHARGES pada SO EWILOG2603056010
 * - Sinkronkan AR invoice agar debit note membaca payment customer tersebut
 * - Batalkan payment AP trucking 13.404.000 pada AP #605
 * - Hapus efek transaksi bank BCA yang salah dan recalculate saldo bulanan mulai Maret 2026
 * - Tidak memecah rincian baru; finance akan input ulang manual setelah rollback
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2603056010';
$targetDoDescription = 'DO CHARGES';
$targetBongkarDescription = 'BONGKAR';
$targetReceivableId = 205;
$targetPayableId = 605;
$targetArCustomerPaymentAmount = 7369180.00;
$targetApRollbackAmount = 13404000.00;
$targetBankTransactionId = 729;
$targetBankAccountId = 2; // BCA
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

$resolvePayableStatus = static function (float $paid, float $outstanding): string {
    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($paid > 0.01) {
        return 'partial';
    }

    return 'unpaid';
};

$getLineTotal = static function (ReimbursementItem $item): float {
    return method_exists($item, 'getLineTotal')
        ? (float) $item->getLineTotal()
        : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0));
};

$recalculateBankBalancesFromMonth = static function (int $bankAccountId, string $startingMonth, int $systemUserId): void {
    $months = BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', '>=', $startingMonth)
        ->orderBy('period_month')
        ->get();

    if ($months->isEmpty()) {
        return;
    }

    $previousMonth = Carbon::createFromFormat('Y-m', $startingMonth)->subMonth()->format('Y-m');
    $previousCurrent = (float) BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $previousMonth)
        ->value('current_balance');

    foreach ($months as $balance) {
        $balance->opening_balance = $previousCurrent;

        $monthStart = Carbon::createFromFormat('Y-m', $balance->period_month)->startOfMonth()->toDateString();
        $monthEnd = Carbon::createFromFormat('Y-m', $balance->period_month)->endOfMonth()->toDateString();

        $net = (float) BankTransaction::query()
            ->where('bank_account_id', $bankAccountId)
            ->whereBetween('transaction_date', [$monthStart, $monthEnd])
            ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
            ->value('net');

        $balance->current_balance = round((float) $balance->opening_balance + $net, 2);

        if (!$balance->created_by) {
            $balance->created_by = $systemUserId;
        }

        $balance->save();
        $previousCurrent = (float) $balance->current_balance;
    }
};

$so = SalesOrder::query()
    ->with(['reimbursementItems', 'accountReceivables.components', 'accountPayables.components'])
    ->where('order_number', $targetSoNumber)
    ->first();

if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$doCharges = $so->reimbursementItems
    ->first(fn (ReimbursementItem $item) => strtoupper((string) $item->description) === $targetDoDescription);

if (!$doCharges) {
    throw new RuntimeException("Reimbursement {$targetDoDescription} tidak ditemukan pada SO {$targetSoNumber}.");
}

$bongkar = $so->reimbursementItems
    ->first(fn (ReimbursementItem $item) => strtoupper((string) $item->description) === $targetBongkarDescription);

$receivable = $so->accountReceivables
    ->first(fn (AccountReceivable $item) => (int) $item->id === $targetReceivableId)
    ?? AccountReceivable::query()->with('components')->find($targetReceivableId);

if (!$receivable || (int) $receivable->sales_order_id !== (int) $so->id) {
    throw new RuntimeException("AR #{$targetReceivableId} untuk SO {$targetSoNumber} tidak valid.");
}

$debitComponent = $receivable->components
    ->first(fn ($component) => (string) $component->component_type === 'debit_note');

if (!$debitComponent) {
    throw new RuntimeException("Komponen debit_note pada AR #{$receivable->id} tidak ditemukan.");
}

$mainComponent = $receivable->components
    ->first(fn ($component) => (string) $component->component_type === 'main');

$payable = $so->accountPayables
    ->first(fn (AccountPayable $item) => (int) $item->id === $targetPayableId)
    ?? AccountPayable::query()->with('components')->find($targetPayableId);

if (!$payable || (int) $payable->sales_order_id !== (int) $so->id) {
    throw new RuntimeException("AP #{$targetPayableId} untuk SO {$targetSoNumber} tidak valid.");
}

$truckingComponent = $payable->components
    ->first(fn ($component) => (string) $component->description === 'TRUCKING' && round((float) $component->paid_amount, 2) === round($targetApRollbackAmount, 2));

if (!$truckingComponent) {
    throw new RuntimeException("Komponen TRUCKING paid {$formatAmount($targetApRollbackAmount)} pada AP #{$payable->id} tidak ditemukan.");
}

$bankTransaction = BankTransaction::query()->find($targetBankTransactionId);
if (!$bankTransaction) {
    throw new RuntimeException("Bank transaction #{$targetBankTransactionId} tidak ditemukan.");
}

if ((int) $bankTransaction->bank_account_id !== $targetBankAccountId) {
    throw new RuntimeException("Bank account transaksi #{$bankTransaction->id} tidak sesuai.");
}

if ((string) $bankTransaction->reference_type !== 'vendor_payment' || (int) $bankTransaction->reference_id !== (int) $payable->id) {
    throw new RuntimeException("Referensi transaksi bank #{$bankTransaction->id} tidak mengarah ke AP #{$payable->id}.");
}

if (round((float) $bankTransaction->amount, 2) !== round($targetApRollbackAmount, 2)) {
    throw new RuntimeException("Nominal transaksi bank #{$bankTransaction->id} tidak sesuai target rollback.");
}

$startingMonth = Carbon::parse((string) $bankTransaction->transaction_date)->format('Y-m');
$previousMonth = Carbon::createFromFormat('Y-m', $startingMonth)->subMonth()->format('Y-m');

$customerPayment = BankTransaction::query()
    ->where('reference_type', 'customer_payment')
    ->where('reference_id', $receivable->id)
    ->where('amount', $targetArCustomerPaymentAmount)
    ->orderBy('id')
    ->first();

if (!$customerPayment) {
    throw new RuntimeException(
        "Bukti customer payment sebesar {$formatAmount($targetArCustomerPaymentAmount)} untuk AR #{$receivable->id} tidak ditemukan."
    );
}

$doLineTotal = $getLineTotal($doCharges);
$expectedDoPaid = min($doLineTotal, (float) $customerPayment->amount);
$expectedDoOutstanding = max(0.0, $doLineTotal - $expectedDoPaid);
$expectedDoStatus = $resolveReceivableStatus($expectedDoPaid, $expectedDoOutstanding);
$expectedDoPaidAt = $customerPayment->transaction_date ?: $customerPayment->created_at;

$totalReimbursementAmount = (float) $so->reimbursementItems->sum($getLineTotal);
$simulatedReimbursementPaid = (float) $so->reimbursementItems->sum(function (ReimbursementItem $item) use ($doCharges, $expectedDoPaid): float {
    if ((int) $item->id === (int) $doCharges->id) {
        return $expectedDoPaid;
    }

    $lineTotal = method_exists($item, 'getLineTotal')
        ? (float) $item->getLineTotal()
        : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0));

    return min($lineTotal, max(0.0, (float) ($item->customer_paid_amount ?? 0)));
});

$simulatedDebitOutstanding = max(0.0, $totalReimbursementAmount - $simulatedReimbursementPaid);
$simulatedDebitStatus = $resolveReceivableStatus($simulatedReimbursementPaid, $simulatedDebitOutstanding);

$mainPaid = (float) ($mainComponent->paid_amount ?? 0.0);
$mainOutstanding = (float) ($mainComponent->outstanding_amount ?? 0.0);
$simulatedArPaid = $mainPaid + $simulatedReimbursementPaid;
$simulatedArOutstanding = $mainOutstanding + $simulatedDebitOutstanding;
$simulatedArStatus = $resolveReceivableStatus($simulatedArPaid, $simulatedArOutstanding);

$remainingTruckingPaid = max(0.0, round((float) $truckingComponent->paid_amount - $targetApRollbackAmount, 2));
$remainingTruckingOutstanding = max(0.0, round((float) $truckingComponent->amount - $remainingTruckingPaid, 2));
$remainingTruckingStatus = $resolvePayableStatus($remainingTruckingPaid, $remainingTruckingOutstanding);

$otherPayableComponents = $payable->components
    ->reject(fn ($component) => (int) $component->id === (int) $truckingComponent->id);

$simulatedPayablePaid = (float) $otherPayableComponents->sum('paid_amount') + $remainingTruckingPaid;
$simulatedPayableOutstanding = (float) $otherPayableComponents->sum('outstanding_amount') + $remainingTruckingOutstanding;
$simulatedPayableStatus = $resolvePayableStatus($simulatedPayablePaid, $simulatedPayableOutstanding);

$paymentNotesAfter = collect(preg_split('/\r?\n/', (string) $payable->payment_notes))
    ->map(static fn ($line) => trim((string) $line))
    ->filter()
    ->reject(static fn ($line) => str_contains($line, '13,404,000.00'))
    ->values()
    ->all();

$balanceMonths = BankBalance::query()
    ->where('bank_account_id', $targetBankAccountId)
    ->where('period_month', '>=', $startingMonth)
    ->orderBy('period_month')
    ->get(['period_month', 'opening_balance', 'current_balance']);

$bankImpactPreview = [];
if ($balanceMonths->isNotEmpty()) {
    $runningOpening = (float) BankBalance::query()
        ->where('bank_account_id', $targetBankAccountId)
        ->where('period_month', $previousMonth)
        ->value('current_balance');

    foreach ($balanceMonths as $balance) {
        $month = (string) $balance->period_month;
        $monthStart = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
        $monthEnd = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

        $net = (float) BankTransaction::query()
            ->where('bank_account_id', $targetBankAccountId)
            ->whereBetween('transaction_date', [$monthStart, $monthEnd])
            ->when($month === $startingMonth, function ($query) use ($bankTransaction) {
                $query->where('id', '!=', $bankTransaction->id);
            })
            ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
            ->value('net');

        $newCurrent = round($runningOpening + $net, 2);

        $bankImpactPreview[] = [
            'period_month' => $month,
            'opening_before' => (float) $balance->opening_balance,
            'opening_after' => $runningOpening,
            'current_before' => (float) $balance->current_balance,
            'current_after' => $newCurrent,
        ];

        $runningOpening = $newCurrent;
    }
}

$report = [
    'dry_run' => $dryRun,
    'scope' => [
        'sales_order' => $so->order_number,
        'repair' => 'restore_ar_do_charges_and_rollback_ap_trucking_payment',
    ],
    'evidence' => [
        'customer_payment' => [
            'bank_transaction_id' => $customerPayment->id,
            'amount' => (float) $customerPayment->amount,
            'transaction_date' => $customerPayment->transaction_date,
            'description' => $customerPayment->description,
        ],
        'rollback_bank_transaction' => [
            'bank_transaction_id' => $bankTransaction->id,
            'amount' => (float) $bankTransaction->amount,
            'transaction_date' => $bankTransaction->transaction_date,
            'description' => $bankTransaction->description,
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
        'ar' => [
            'id' => $receivable->id,
            'paid_amount' => (float) ($receivable->paid_amount ?? 0),
            'outstanding_amount' => (float) ($receivable->outstanding_amount ?? 0),
            'status' => $receivable->status,
        ],
        'debit_note_component' => [
            'id' => $debitComponent->id,
            'paid_amount' => (float) ($debitComponent->paid_amount ?? 0),
            'outstanding_amount' => (float) ($debitComponent->outstanding_amount ?? 0),
            'status' => $debitComponent->status,
        ],
        'payable' => [
            'id' => $payable->id,
            'paid_amount' => (float) ($payable->paid_amount ?? 0),
            'outstanding_amount' => (float) ($payable->outstanding_amount ?? 0),
            'status' => $payable->status,
            'payment_notes' => $payable->payment_notes,
        ],
        'trucking_component' => [
            'id' => $truckingComponent->id,
            'paid_amount' => (float) ($truckingComponent->paid_amount ?? 0),
            'outstanding_amount' => (float) ($truckingComponent->outstanding_amount ?? 0),
            'status' => $truckingComponent->status,
        ],
        'bongkar_component' => $bongkar ? [
            'reimbursement_id' => $bongkar->id,
            'customer_payment_status' => $bongkar->customer_payment_status,
            'amount' => (float) $getLineTotal($bongkar),
            'status' => $bongkar->status,
        ] : null,
    ],
    'plan' => [
        'do_charges_after' => [
            'customer_paid_amount' => $expectedDoPaid,
            'customer_outstanding_amount' => $expectedDoOutstanding,
            'customer_payment_status' => $expectedDoStatus,
            'customer_paid_at' => (string) $expectedDoPaidAt,
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
        'trucking_component_after' => [
            'paid_amount' => $remainingTruckingPaid,
            'outstanding_amount' => $remainingTruckingOutstanding,
            'status' => $remainingTruckingStatus,
        ],
        'payable_after' => [
            'paid_amount' => $simulatedPayablePaid,
            'outstanding_amount' => $simulatedPayableOutstanding,
            'status' => $simulatedPayableStatus,
            'payment_notes' => empty($paymentNotesAfter) ? null : implode("\n", $paymentNotesAfter),
        ],
        'bank_balance_preview' => $bankImpactPreview,
        'bongkar_action' => 'Tidak diubah. Tetap outstanding karena belum ada bukti payment valid.',
        'manual_follow_up' => 'Finance akan split / input ulang rincian trucking sendiri setelah rollback.',
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
    $receivable,
    $debitComponent,
    $payable,
    $truckingComponent,
    $customerPayment,
    $expectedDoPaid,
    $expectedDoOutstanding,
    $expectedDoStatus,
    $expectedDoPaidAt,
    $targetApRollbackAmount,
    $bankTransaction,
    $targetBankAccountId,
    $recalculateBankBalancesFromMonth,
    $systemUserId,
    $paymentNotesAfter,
    $resolvePayableStatus
): void {
    $lockedSo = SalesOrder::query()->lockForUpdate()->find($so->id);
    $lockedDo = ReimbursementItem::query()->lockForUpdate()->find($doCharges->id);
    $lockedAr = AccountReceivable::query()->with('components')->lockForUpdate()->find($receivable->id);
    $lockedPayable = AccountPayable::query()->with('components')->lockForUpdate()->find($payable->id);
    $lockedBankTransaction = BankTransaction::query()->lockForUpdate()->find($bankTransaction->id);

    if (!$lockedSo || !$lockedDo || !$lockedAr || !$lockedPayable || !$lockedBankTransaction) {
        throw new RuntimeException('Sebagian data target hilang saat apply.');
    }

    $lockedDebit = $lockedAr->components->firstWhere('component_type', 'debit_note');
    $lockedMain = $lockedAr->components->firstWhere('component_type', 'main');
    $lockedTrucking = $lockedPayable->components->firstWhere('id', $truckingComponent->id);

    if (!$lockedDebit || !$lockedTrucking) {
        throw new RuntimeException('Komponen target hilang saat apply.');
    }

    $lockedDo->customer_paid_amount = $expectedDoPaid;
    $lockedDo->customer_outstanding_amount = $expectedDoOutstanding;
    $lockedDo->customer_payment_status = $expectedDoStatus;
    $lockedDo->customer_paid_at = $expectedDoPaidAt;

    $repairNote = 'REPAIR: customer payment restored from bank transaction #' . $customerPayment->id;
    $notes = (string) ($lockedDo->notes ?? '');
    if (!str_contains($notes, $repairNote)) {
        $lockedDo->notes = trim($notes === '' ? $repairNote : ($notes . "\n" . $repairNote));
    }
    $lockedDo->save();

    $reimbursementItems = $lockedSo->reimbursementItems()->get();
    $totalReimbursementPaid = (float) $reimbursementItems->sum(function (ReimbursementItem $item): float {
        $lineTotal = method_exists($item, 'getLineTotal')
            ? (float) $item->getLineTotal()
            : ((float) $item->amount * ((float) $item->quantity > 0 ? (float) $item->quantity : 1.0));
        return min($lineTotal, max(0.0, (float) ($item->customer_paid_amount ?? 0)));
    });

    $lockedDebit->paid_amount = min((float) $lockedDebit->amount, $totalReimbursementPaid);
    $lockedDebit->outstanding_amount = max(0.0, (float) $lockedDebit->amount - (float) $lockedDebit->paid_amount);
    $lockedDebit->status = $lockedAr->resolveComponentStatus($lockedDebit);
    $lockedDebit->save();

    $mainPaid = (float) ($lockedMain->paid_amount ?? 0.0);
    $mainOutstanding = (float) ($lockedMain->outstanding_amount ?? 0.0);
    $lockedAr->paid_amount = $mainPaid + (float) $lockedDebit->paid_amount;
    $lockedAr->outstanding_amount = $mainOutstanding + (float) $lockedDebit->outstanding_amount;
    $lockedAr->status = $lockedAr->outstanding_amount <= 0.01
        ? 'paid'
        : ($lockedAr->paid_amount > 0.01 ? 'partial' : 'outstanding');
    $lockedAr->save();

    $lockedTrucking->paid_amount = max(0.0, round((float) $lockedTrucking->paid_amount - $targetApRollbackAmount, 2));
    $lockedTrucking->outstanding_amount = max(0.0, round((float) $lockedTrucking->amount - (float) $lockedTrucking->paid_amount, 2));
    $lockedTrucking->status = $resolvePayableStatus((float) $lockedTrucking->paid_amount, (float) $lockedTrucking->outstanding_amount);
    $lockedTrucking->save();

    AccountPayableNote::query()
        ->where('account_payable_id', $lockedPayable->id)
        ->where('component_id', $lockedTrucking->id)
        ->where('source_type', 'payment')
        ->where('note', 'like', '%13,404,000.00%')
        ->delete();

    $summary = $lockedPayable->recalculateTotals(false);
    $lockedPayable->fill($summary);
    $lockedPayable->payment_notes = empty($paymentNotesAfter) ? null : implode("\n", $paymentNotesAfter);
    $lockedPayable->save();

    $bankStartingMonth = Carbon::parse((string) $lockedBankTransaction->transaction_date)->format('Y-m');
    $lockedBankTransaction->delete();

    $recalculateBankBalancesFromMonth($targetBankAccountId, $bankStartingMonth, $systemUserId);
});

$afterDo = ReimbursementItem::query()->find($doCharges->id);
$afterAr = AccountReceivable::query()->with('components')->find($receivable->id);
$afterDebit = $afterAr?->components->firstWhere('component_type', 'debit_note');
$afterPayable = AccountPayable::query()->with('components')->find($payable->id);
$afterTrucking = $afterPayable?->components->firstWhere('id', $truckingComponent->id);
$deletedBankTransactionStillExists = BankTransaction::query()->find($bankTransaction->id) !== null;
$afterBalances = BankBalance::query()
    ->where('bank_account_id', $targetBankAccountId)
    ->where('period_month', '>=', $startingMonth)
    ->orderBy('period_month')
    ->get(['period_month', 'opening_balance', 'current_balance']);

echo "DONE - REPAIR 2603-056010 BERHASIL\n";
echo json_encode([
    'after' => [
        'do_charges' => [
            'id' => $afterDo?->id,
            'customer_paid_amount' => (float) ($afterDo?->customer_paid_amount ?? 0),
            'customer_outstanding_amount' => (float) ($afterDo?->customer_outstanding_amount ?? 0),
            'customer_payment_status' => $afterDo?->customer_payment_status,
            'customer_paid_at' => (string) $afterDo?->customer_paid_at,
        ],
        'ar' => [
            'id' => $afterAr?->id,
            'paid_amount' => (float) ($afterAr?->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterAr?->outstanding_amount ?? 0),
            'status' => $afterAr?->status,
        ],
        'debit_note_component' => [
            'id' => $afterDebit?->id,
            'paid_amount' => (float) ($afterDebit?->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterDebit?->outstanding_amount ?? 0),
            'status' => $afterDebit?->status,
        ],
        'payable' => [
            'id' => $afterPayable?->id,
            'paid_amount' => (float) ($afterPayable?->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterPayable?->outstanding_amount ?? 0),
            'status' => $afterPayable?->status,
            'payment_notes' => $afterPayable?->payment_notes,
        ],
        'trucking_component' => [
            'id' => $afterTrucking?->id,
            'paid_amount' => (float) ($afterTrucking?->paid_amount ?? 0),
            'outstanding_amount' => (float) ($afterTrucking?->outstanding_amount ?? 0),
            'status' => $afterTrucking?->status,
        ],
        'bank_transaction_deleted' => !$deletedBankTransactionStillExists,
        'bank_balances' => $afterBalances,
    ],
    'note' => 'BONGKAR tidak diubah. Finance perlu split / input ulang rincian manual setelah rollback.',
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
