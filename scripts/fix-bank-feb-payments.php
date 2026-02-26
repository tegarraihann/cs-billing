<?php

use App\Models\BankBalance;
use App\Models\BankTransaction;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use Illuminate\Support\Facades\Artisan;

$transactionIds = [505, 506, 507];
$targetDate = '2026-01-31';
$bankAccountIds = [1, 2];
$affectedMonths = ['2026-01', '2026-02'];

// Move adjustment-related bank transactions into January.
BankTransaction::whereIn('id', $transactionIds)->update([
    'transaction_date' => $targetDate,
]);

// Keep manual income statement entries in the same date as bank transactions.
$referenceEntryIds = BankTransaction::query()
    ->whereIn('id', $transactionIds)
    ->where('reference_type', 'profit_loss_adjustment')
    ->pluck('reference_id')
    ->filter()
    ->values()
    ->all();

if (!empty($referenceEntryIds)) {
    ProfitLossEntry::whereIn('id', $referenceEntryIds)->update([
        'transaction_date' => $targetDate,
    ]);

    $periodIds = ProfitLossEntry::query()
        ->whereIn('id', $referenceEntryIds)
        ->pluck('period_id')
        ->unique()
        ->values()
        ->all();

    if (!empty($periodIds)) {
        ProfitLossPeriod::whereIn('id', $periodIds)->get()->each(function (ProfitLossPeriod $period) {
            $period->calculateTotals();
        });
    }
}

// Recompute January current balances directly from opening + January transactions.
foreach ($bankAccountIds as $bankAccountId) {
    $opening = (float) BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', '2026-01')
        ->value('opening_balance');

    $netJanuary = (float) BankTransaction::query()
        ->where('bank_account_id', $bankAccountId)
        ->whereBetween('transaction_date', ['2026-01-01', '2026-01-31'])
        ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
        ->value('net');

    BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', '2026-01')
        ->update([
            'current_balance' => round($opening + $netJanuary, 2),
        ]);
}

// Remove Feb opening balances for Mandiri & BCA.
BankBalance::where('period_month', '2026-02')
    ->whereIn('bank_account_id', $bankAccountIds)
    ->delete();

// Rebuild monthly opening balances from latest history.
Artisan::call('bank:rollover-opening');

// Recalculate current balances for January and February.
foreach ($affectedMonths as $month) {
    $monthStart = $month . '-01';
    $monthEnd = date('Y-m-t', strtotime($monthStart));

    foreach ($bankAccountIds as $bankAccountId) {
        $opening = (float) BankBalance::query()
            ->where('bank_account_id', $bankAccountId)
            ->where('period_month', $month)
            ->value('opening_balance');

        $net = (float) BankTransaction::query()
            ->where('bank_account_id', $bankAccountId)
            ->whereBetween('transaction_date', [$monthStart, $monthEnd])
            ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
            ->value('net');

        BankBalance::query()
            ->where('bank_account_id', $bankAccountId)
            ->where('period_month', $month)
            ->update([
                'current_balance' => round($opening + $net, 2),
            ]);
    }
}
