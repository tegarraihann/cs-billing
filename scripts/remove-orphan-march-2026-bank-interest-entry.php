<?php

declare(strict_types=1);

use App\Models\BankAccount;
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
 *   php scripts/remove-orphan-march-2026-bank-interest-entry.php
 *   php scripts/remove-orphan-march-2026-bank-interest-entry.php --apply
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetEntryId = 929;
$targetPeriodName = 'INCOME STATEMENT MARET 2026';

$entry = ProfitLossEntry::query()->find($targetEntryId);

if (!$entry) {
    throw new RuntimeException("ProfitLossEntry #{$targetEntryId} tidak ditemukan.");
}

$period = ProfitLossPeriod::query()->find($entry->period_id);

if (!$period) {
    throw new RuntimeException("Periode untuk entry #{$targetEntryId} tidak ditemukan.");
}

if ($period->period_name !== $targetPeriodName) {
    throw new RuntimeException("Entry #{$targetEntryId} tidak berada di {$targetPeriodName}.");
}

$sourceExists = DB::table('other_incomes')->where('id', (int) $entry->reference_id)->exists();
$bankTransactionExists = DB::table('bank_transactions')
    ->where('reference_type', 'other_income')
    ->where('reference_id', (int) $entry->reference_id)
    ->exists();

$mandiri = BankAccount::getMandiri();
$bca = BankAccount::getBCA();

$plan = [
    'entry' => [
        'id' => $entry->id,
        'period_id' => $entry->period_id,
        'description' => $entry->description,
        'amount' => (float) $entry->amount,
        'entry_type' => $entry->entry_type,
        'reference_type' => $entry->reference_type,
        'reference_id' => $entry->reference_id,
        'transaction_date' => (string) $entry->transaction_date,
    ],
    'period_before' => [
        'id' => $period->id,
        'period_name' => $period->period_name,
        'status' => $period->status,
        'total_revenue' => (float) $period->total_revenue,
        'total_expenses' => (float) $period->total_expenses,
        'net_profit' => (float) $period->net_profit,
        'entries_count' => $period->entries()->count(),
    ],
    'orphan_check' => [
        'other_income_exists' => $sourceExists,
        'bank_transaction_exists' => $bankTransactionExists,
    ],
    'bank_balances_before' => [
        'mandiri' => $mandiri ? [
            'id' => $mandiri->id,
            'balance' => $mandiri->getCurrentBalance(),
        ] : null,
        'bca' => $bca ? [
            'id' => $bca->id,
            'balance' => $bca->getCurrentBalance(),
        ] : null,
    ],
    'expected_effect' => [
        'profit_loss' => 'delete_orphan_entry_only',
        'bank_balance_change' => 0,
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($plan);
    echo PHP_EOL;
    exit(0);
}

if ($period->status === 'closed') {
    throw new RuntimeException('Periode Maret sudah closed. Cleanup dibatalkan.');
}

DB::transaction(function () use ($entry, $period): void {
    $entry->delete();
    $period->refresh();
    $period->calculateTotals();
});

$mandiriAfter = BankAccount::getMandiri();
$bcaAfter = BankAccount::getBCA();
$periodAfter = ProfitLossPeriod::query()->find($period->id);

echo "APPLY SELESAI\n";
var_export([
    'period_after' => $periodAfter ? [
        'id' => $periodAfter->id,
        'period_name' => $periodAfter->period_name,
        'status' => $periodAfter->status,
        'total_revenue' => (float) $periodAfter->total_revenue,
        'total_expenses' => (float) $periodAfter->total_expenses,
        'net_profit' => (float) $periodAfter->net_profit,
        'entries_count' => ProfitLossEntry::query()->where('period_id', $periodAfter->id)->count(),
    ] : null,
    'entry_exists_after' => ProfitLossEntry::query()->where('id', $targetEntryId)->exists(),
    'bank_balances_after' => [
        'mandiri' => $mandiriAfter ? [
            'id' => $mandiriAfter->id,
            'balance' => $mandiriAfter->getCurrentBalance(),
        ] : null,
        'bca' => $bcaAfter ? [
            'id' => $bcaAfter->id,
            'balance' => $bcaAfter->getCurrentBalance(),
        ] : null,
    ],
]);
echo PHP_EOL;
