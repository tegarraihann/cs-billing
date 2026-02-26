<?php

use App\Models\BankBalance;
use App\Models\BankTransaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

$apply = isset($applyBcaJanFix) ? (bool) $applyBcaJanFix : false;

$bankId = 2; // BCA
$target = [
    'opening' => 6199444.00,
    'inflow' => 386933428.00,
    'outflow' => 278718468.00,
    'closing' => 114414404.00,
];

$systemUserId = 1;
$janMonth = '2026-01';
$febMonth = '2026-02';

$sumForMonth = static function (int $bankAccountId, string $month): array {
    $start = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
    $end = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

    $opening = (float) BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $month)
        ->value('opening_balance');

    $inflow = (float) BankTransaction::query()
        ->where('bank_account_id', $bankAccountId)
        ->whereBetween('transaction_date', [$start, $end])
        ->where('transaction_type', 'credit')
        ->sum('amount');

    $outflow = (float) BankTransaction::query()
        ->where('bank_account_id', $bankAccountId)
        ->whereBetween('transaction_date', [$start, $end])
        ->where('transaction_type', 'debit')
        ->sum('amount');

    return [
        'opening' => round($opening, 2),
        'inflow' => round($inflow, 2),
        'outflow' => round($outflow, 2),
        'closing' => round($opening + $inflow - $outflow, 2),
    ];
};

$recalculateMonthBalance = static function (int $bankAccountId, string $month, int $createdBy = 1): void {
    $monthStart = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
    $monthEnd = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

    $balance = BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $month)
        ->first();

    if (!$balance) {
        $previousMonth = Carbon::createFromFormat('Y-m', $month)->subMonth()->format('Y-m');
        $previousCurrent = (float) BankBalance::query()
            ->where('bank_account_id', $bankAccountId)
            ->where('period_month', $previousMonth)
            ->value('current_balance');

        $balance = BankBalance::query()->create([
            'bank_account_id' => $bankAccountId,
            'period_month' => $month,
            'opening_balance' => round($previousCurrent, 2),
            'current_balance' => round($previousCurrent, 2),
            'notes' => 'Auto created during BCA Jan 2026 fix',
            'created_by' => $createdBy,
        ]);
    }

    $net = (float) BankTransaction::query()
        ->where('bank_account_id', $bankAccountId)
        ->whereBetween('transaction_date', [$monthStart, $monthEnd])
        ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
        ->value('net');

    $opening = (float) $balance->opening_balance;
    $balance->current_balance = round($opening + $net, 2);
    $balance->save();
};

$before = $sumForMonth($bankId, $janMonth);
$deltaInflow = 0.0;
$deltaOutflow = 0.0;
$plan = [];

$tx369 = BankTransaction::query()->find(369);
if ($tx369 && (int) $tx369->bank_account_id === $bankId) {
    $old = (float) $tx369->amount;
    $new = 45000000.00;
    if (round($old, 2) !== round($new, 2)) {
        if (Carbon::parse($tx369->transaction_date)->format('Y-m') === $janMonth && strtolower((string) $tx369->transaction_type) === 'credit') {
            $deltaInflow += ($new - $old);
        }
        $plan[] = "Update ID 369 amount {$old} -> {$new}";
    }
}

$tx373 = BankTransaction::query()->find(373);
if ($tx373 && (int) $tx373->bank_account_id === $bankId) {
    $old = (float) $tx373->amount;
    $new = 350000.00;
    if (round($old, 2) !== round($new, 2)) {
        if (Carbon::parse($tx373->transaction_date)->format('Y-m') === $janMonth && strtolower((string) $tx373->transaction_type) === 'debit') {
            $deltaOutflow += ($new - $old);
        }
        $plan[] = "Update ID 373 amount {$old} -> {$new}";
    }
}

$tx434 = BankTransaction::query()->find(434);
if ($tx434 && (int) $tx434->bank_account_id === $bankId) {
    $old = (float) $tx434->amount;
    $new = 35000.00;
    if (round($old, 2) !== round($new, 2)) {
        if (Carbon::parse($tx434->transaction_date)->format('Y-m') === $janMonth && strtolower((string) $tx434->transaction_type) === 'debit') {
            $deltaOutflow += ($new - $old);
        }
        $plan[] = "Update ID 434 amount {$old} -> {$new}";
    }
}

$tx504 = BankTransaction::query()->find(504);
if ($tx504 && (int) $tx504->bank_account_id === $bankId) {
    $oldMonth = Carbon::parse($tx504->transaction_date)->format('Y-m');
    if ($oldMonth !== $janMonth) {
        if (strtolower((string) $tx504->transaction_type) === 'debit') {
            $deltaOutflow += (float) $tx504->amount;
        } elseif (strtolower((string) $tx504->transaction_type) === 'credit') {
            $deltaInflow += (float) $tx504->amount;
        }
        $plan[] = "Move ID 504 date {$tx504->transaction_date} -> 2026-01-31";
    }
}

$missingKeiDescription = 'Payment for Pembayaran Vendor - TRUCKING KEI (manual reconciliation): Opening Balance - Reimbursement';
$hasMissingKei = BankTransaction::query()
    ->where('bank_account_id', $bankId)
    ->whereDate('transaction_date', '2026-01-31')
    ->where('transaction_type', 'debit')
    ->where('amount', 350000.00)
    ->where('description', $missingKeiDescription)
    ->exists();

if (!$hasMissingKei) {
    $deltaOutflow += 350000.00;
    $plan[] = 'Create missing TRUCKING KEI debit 350000 on 2026-01-31';
}

$predicted = [
    'opening' => round($before['opening'], 2),
    'inflow' => round($before['inflow'] + $deltaInflow, 2),
    'outflow' => round($before['outflow'] + $deltaOutflow, 2),
];
$predicted['closing'] = round($predicted['opening'] + $predicted['inflow'] - $predicted['outflow'], 2);

if (!$apply) {
    echo "MODE: DRY-RUN\n";
    echo "Planned actions:\n";
    foreach ($plan as $idx => $item) {
        $n = $idx + 1;
        echo "  {$n}. {$item}\n";
    }
    if (empty($plan)) {
        echo "  (no changes needed)\n";
    }

    echo "\nBEFORE\n";
    echo '  opening=' . $before['opening'] . ', inflow=' . $before['inflow'] . ', outflow=' . $before['outflow'] . ', closing=' . $before['closing'] . "\n";
    echo "PREDICTED AFTER\n";
    echo '  opening=' . $predicted['opening'] . ', inflow=' . $predicted['inflow'] . ', outflow=' . $predicted['outflow'] . ', closing=' . $predicted['closing'] . "\n";
    echo "TARGET\n";
    echo '  opening=' . $target['opening'] . ', inflow=' . $target['inflow'] . ', outflow=' . $target['outflow'] . ', closing=' . $target['closing'] . "\n";
    echo 'DELTA TO TARGET (predicted): closing=' . round($predicted['closing'] - $target['closing'], 2) . "\n";
    echo "\nSet \$applyBcaJanFix = true before require() to apply.\n";
    return;
}

DB::transaction(function () use (
    $bankId,
    $systemUserId,
    $recalculateMonthBalance,
    $janMonth,
    $febMonth,
    $missingKeiDescription
): void {
    $tx = BankTransaction::query()->lockForUpdate()->find(369);
    if ($tx && (int) $tx->bank_account_id === $bankId) {
        $tx->amount = 45000000.00;
        $tx->save();
    }

    $tx = BankTransaction::query()->lockForUpdate()->find(373);
    if ($tx && (int) $tx->bank_account_id === $bankId) {
        $tx->amount = 350000.00;
        $tx->save();
    }

    $tx = BankTransaction::query()->lockForUpdate()->find(434);
    if ($tx && (int) $tx->bank_account_id === $bankId) {
        $tx->amount = 35000.00;
        $tx->save();
    }

    $tx = BankTransaction::query()->lockForUpdate()->find(504);
    if ($tx && (int) $tx->bank_account_id === $bankId) {
        $tx->transaction_date = '2026-01-31';
        $tx->save();
    }

    $exists = BankTransaction::query()
        ->where('bank_account_id', $bankId)
        ->whereDate('transaction_date', '2026-01-31')
        ->where('transaction_type', 'debit')
        ->where('amount', 350000.00)
        ->where('description', $missingKeiDescription)
        ->exists();

    if (!$exists) {
        BankTransaction::query()->create([
            'bank_account_id' => $bankId,
            'transaction_date' => '2026-01-31',
            'transaction_type' => 'debit',
            'amount' => 350000.00,
            'description' => $missingKeiDescription,
            'reference_type' => 'manual_reconciliation',
            'reference_id' => null,
            'created_by' => $systemUserId,
        ]);
    }

    // Recalculate January first.
    $recalculateMonthBalance($bankId, $janMonth, $systemUserId);

    // Keep February opening synced with January closing.
    $janCurrent = (float) BankBalance::query()
        ->where('bank_account_id', $bankId)
        ->where('period_month', $janMonth)
        ->value('current_balance');

    $febBalance = BankBalance::query()->firstOrNew([
        'bank_account_id' => $bankId,
        'period_month' => $febMonth,
    ]);

    if (!$febBalance->exists) {
        $febBalance->created_by = $systemUserId;
        $febBalance->notes = 'Auto rollover correction from 2026-01 (BCA fix)';
    }

    $febBalance->opening_balance = round($janCurrent, 2);
    $febBalance->save();

    $recalculateMonthBalance($bankId, $febMonth, $systemUserId);
});

$afterJan = $sumForMonth($bankId, $janMonth);
$afterFeb = $sumForMonth($bankId, $febMonth);

echo "MODE: APPLY\n";
echo "AFTER JAN 2026\n";
echo '  opening=' . $afterJan['opening'] . ', inflow=' . $afterJan['inflow'] . ', outflow=' . $afterJan['outflow'] . ', closing=' . $afterJan['closing'] . "\n";
echo "TARGET JAN 2026\n";
echo '  opening=' . $target['opening'] . ', inflow=' . $target['inflow'] . ', outflow=' . $target['outflow'] . ', closing=' . $target['closing'] . "\n";
echo 'DELTA TO TARGET: closing=' . round($afterJan['closing'] - $target['closing'], 2) . "\n";

echo "\nAFTER FEB 2026\n";
echo '  opening=' . $afterFeb['opening'] . ', inflow=' . $afterFeb['inflow'] . ', outflow=' . $afterFeb['outflow'] . ', closing=' . $afterFeb['closing'] . "\n";

