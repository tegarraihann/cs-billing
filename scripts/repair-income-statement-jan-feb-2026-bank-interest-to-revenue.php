<?php

declare(strict_types=1);

/**
 * Usage:
 *   php scripts/repair-income-statement-jan-feb-2026-bank-interest-to-revenue.php
 *   php scripts/repair-income-statement-jan-feb-2026-bank-interest-to-revenue.php --apply
 */

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

$apply = in_array('--apply', $argv ?? [], true);

$targetAccount = ChartOfAccount::where('account_code', '4210')->first();
if (!$targetAccount) {
    throw new RuntimeException('Akun 4210 - Interest Income tidak ditemukan.');
}

$targetEntries = ProfitLossEntry::with(['account', 'period'])
    ->whereIn('id', [747, 868])
    ->orderBy('id')
    ->get();

if ($targetEntries->count() !== 2) {
    throw new RuntimeException('Target entry Januari/Februari bunga bank tidak lengkap.');
}

$janPeriod = ProfitLossPeriod::where('period_name', 'INCOME STATEMENT JANUARI 2026')->first();
$febPeriod = ProfitLossPeriod::where('period_name', 'INCOME STATEMENT FEBRUARI 2026')->first();
if (!$janPeriod || !$febPeriod) {
    throw new RuntimeException('Periode Januari/Februari 2026 tidak ditemukan.');
}

$entryPlans = $targetEntries->map(function (ProfitLossEntry $entry) use ($targetAccount) {
    $additionalData = is_array($entry->additional_data) ? $entry->additional_data : [];
    $monthLabel = str_contains($entry->description, 'FEB') ? 'FEB' : 'JAN';

    $additionalData['category'] = 'Bunga Bank Mandiri';
    $additionalData['description'] = $entry->description;
    $additionalData['reclassified_to_revenue'] = true;
    $additionalData['reclassified_target_account_code'] = '4210';

    return [
        'entry_id' => $entry->id,
        'period_id' => $entry->period_id,
        'period_name' => optional($entry->period)->period_name,
        'description' => $entry->description,
        'amount' => (float) $entry->amount,
        'account_before' => [
            'id' => $entry->account_id,
            'code' => optional($entry->account)->account_code,
            'name' => optional($entry->account)->account_name,
        ],
        'account_after' => [
            'id' => $targetAccount->id,
            'code' => $targetAccount->account_code,
            'name' => $targetAccount->account_name,
        ],
        'additional_data_after' => $additionalData,
    ];
});

$janDelta = (float) optional($targetEntries->firstWhere('period_id', $janPeriod->id))->amount;
$febDelta = (float) optional($targetEntries->firstWhere('period_id', $febPeriod->id))->amount;

$summary = [
    'target_account' => [
        'id' => $targetAccount->id,
        'code' => $targetAccount->account_code,
        'name' => $targetAccount->account_name,
    ],
    'entries' => $entryPlans->values()->all(),
    'periods_before' => [
        'january' => [
            'id' => $janPeriod->id,
            'revenue' => (float) $janPeriod->total_revenue,
            'expenses' => (float) $janPeriod->total_expenses,
            'net_profit' => (float) $janPeriod->net_profit,
        ],
        'february' => [
            'id' => $febPeriod->id,
            'revenue' => (float) $febPeriod->total_revenue,
            'expenses' => (float) $febPeriod->total_expenses,
            'net_profit' => (float) $febPeriod->net_profit,
        ],
    ],
    'periods_after_expected' => [
        'january' => [
            'revenue' => (float) $janPeriod->total_revenue + $janDelta,
            'expenses' => (float) $janPeriod->total_expenses - $janDelta,
            'net_profit' => (float) $janPeriod->net_profit + ($janDelta * 2),
        ],
        'february' => [
            'revenue' => (float) $febPeriod->total_revenue + $febDelta,
            'expenses' => (float) $febPeriod->total_expenses - $febDelta,
            'net_profit' => (float) $febPeriod->net_profit + ($febDelta * 2),
        ],
    ],
    'notes' => [
        'bank_transactions_affected' => false,
        'scope' => 'reclassify bunga bank Jan/Feb from expense to revenue',
    ],
];

if (!$apply) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($summary);
    echo PHP_EOL;
    exit(0);
}

DB::transaction(function () use ($targetEntries, $targetAccount, $janPeriod, $febPeriod): void {
    foreach ($targetEntries as $entry) {
        $additionalData = is_array($entry->additional_data) ? $entry->additional_data : [];
        $additionalData['category'] = 'Bunga Bank Mandiri';
        $additionalData['description'] = $entry->description;
        $additionalData['reclassified_to_revenue'] = true;
        $additionalData['reclassified_target_account_code'] = '4210';

        $entry->account_id = $targetAccount->id;
        $entry->additional_data = $additionalData;
        $entry->save();
    }

    $janPeriod->refresh();
    $janPeriod->calculateTotals();

    $febPeriod->refresh();
    $febPeriod->calculateTotals();
});

$janAfter = ProfitLossPeriod::find($janPeriod->id);
$febAfter = ProfitLossPeriod::find($febPeriod->id);
$entriesAfter = ProfitLossEntry::with('account')->whereIn('id', [747, 868])->orderBy('id')->get();

echo "APPLY BERHASIL\n";
var_export([
    'entries_after' => $entriesAfter->map(function ($entry) {
        return [
            'id' => $entry->id,
            'description' => $entry->description,
            'amount' => (float) $entry->amount,
            'account_id' => $entry->account_id,
            'account_code' => optional($entry->account)->account_code,
            'account_name' => optional($entry->account)->account_name,
            'additional_data' => $entry->additional_data,
        ];
    })->all(),
    'periods_after' => [
        'january' => [
            'id' => $janAfter->id,
            'revenue' => (float) $janAfter->total_revenue,
            'expenses' => (float) $janAfter->total_expenses,
            'net_profit' => (float) $janAfter->net_profit,
        ],
        'february' => [
            'id' => $febAfter->id,
            'revenue' => (float) $febAfter->total_revenue,
            'expenses' => (float) $febAfter->total_expenses,
            'net_profit' => (float) $febAfter->net_profit,
        ],
    ],
]);
echo PHP_EOL;
