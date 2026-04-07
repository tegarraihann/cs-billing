<?php

declare(strict_types=1);

use App\Models\ChartOfAccount;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/repair-income-statement-jan-2026-bank-interest-to-revenue.php
 *   php scripts/repair-income-statement-jan-2026-bank-interest-to-revenue.php --apply
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetEntryId = 747;
$targetPeriodName = 'INCOME STATEMENT JANUARI 2026';
$targetRevenueAccountCode = '4210';

$entry = ProfitLossEntry::query()->with('account', 'period')->find($targetEntryId);
if (!$entry) {
    throw new RuntimeException("ProfitLossEntry #{$targetEntryId} tidak ditemukan.");
}

$period = $entry->period;
if (!$period) {
    throw new RuntimeException("Periode untuk entry #{$targetEntryId} tidak ditemukan.");
}

if ($period->period_name !== $targetPeriodName) {
    throw new RuntimeException("Entry #{$targetEntryId} tidak berada di {$targetPeriodName}.");
}

$targetAccount = ChartOfAccount::query()
    ->where('account_code', $targetRevenueAccountCode)
    ->where('account_type', 'revenue')
    ->first();

if (!$targetAccount) {
    throw new RuntimeException("Akun revenue {$targetRevenueAccountCode} tidak ditemukan.");
}

$beforeRevenue = (float) $period->total_revenue;
$beforeExpenses = (float) $period->total_expenses;
$beforeNetProfit = (float) $period->net_profit;
$entryAmount = (float) $entry->amount;

$additionalData = is_array($entry->additional_data) ? $entry->additional_data : [];
$newAdditionalData = array_merge($additionalData, [
    'category' => 'Bunga Bank Mandiri',
    'description' => $entry->description,
]);

$plan = [
    'target_entry' => [
        'id' => $entry->id,
        'description' => $entry->description,
        'amount' => $entryAmount,
        'transaction_date' => (string) $entry->transaction_date,
        'account_before' => [
            'id' => $entry->account?->id,
            'code' => $entry->account?->account_code,
            'name' => $entry->account?->account_name,
            'type' => $entry->account?->account_type,
            'category' => $entry->account?->account_category,
        ],
        'account_after' => [
            'id' => $targetAccount->id,
            'code' => $targetAccount->account_code,
            'name' => $targetAccount->account_name,
            'type' => $targetAccount->account_type,
            'category' => $targetAccount->account_category,
        ],
    ],
    'period_before' => [
        'id' => $period->id,
        'period_name' => $period->period_name,
        'total_revenue' => $beforeRevenue,
        'total_expenses' => $beforeExpenses,
        'net_profit' => $beforeNetProfit,
    ],
    'period_expected_after' => [
        'total_revenue' => $beforeRevenue + $entryAmount,
        'total_expenses' => $beforeExpenses - $entryAmount,
        'net_profit' => $beforeNetProfit + ($entryAmount * 2),
    ],
    'bank_effect' => [
        'change_required' => false,
        'reason' => 'Bank transaction tetap, hanya klasifikasi akun profit/loss yang berubah.',
        'bank_transaction_id' => $additionalData['bank_transaction_id'] ?? null,
    ],
    'additional_data_before' => $additionalData,
    'additional_data_after' => $newAdditionalData,
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($plan);
    echo PHP_EOL;
    exit(0);
}

if ($period->status === 'closed') {
    throw new RuntimeException('Periode Januari sudah closed. Repair dibatalkan.');
}

DB::transaction(function () use ($entry, $targetAccount, $newAdditionalData, $period): void {
    $entry->account_id = $targetAccount->id;
    $entry->additional_data = $newAdditionalData;
    $entry->save();

    $period->refresh();
    $period->calculateTotals();
});

$entryAfter = ProfitLossEntry::query()->with('account')->find($targetEntryId);
$periodAfter = ProfitLossPeriod::query()->find($period->id);

echo "APPLY SELESAI\n";
var_export([
    'entry_after' => [
        'id' => $entryAfter?->id,
        'account_code' => $entryAfter?->account?->account_code,
        'account_name' => $entryAfter?->account?->account_name,
        'account_type' => $entryAfter?->account?->account_type,
        'account_category' => $entryAfter?->account?->account_category,
        'additional_data' => $entryAfter?->additional_data,
    ],
    'period_after' => $periodAfter ? [
        'id' => $periodAfter->id,
        'period_name' => $periodAfter->period_name,
        'total_revenue' => (float) $periodAfter->total_revenue,
        'total_expenses' => (float) $periodAfter->total_expenses,
        'net_profit' => (float) $periodAfter->net_profit,
        'summary_data' => $periodAfter->summary_data,
    ] : null,
]);
echo PHP_EOL;
