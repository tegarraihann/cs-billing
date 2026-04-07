<?php

declare(strict_types=1);

/**
 * Usage:
 *   php scripts/restore-april-2026-income-entries-to-march-2026.php
 *   php scripts/restore-april-2026-income-entries-to-march-2026.php --apply
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
$period = ProfitLossPeriod::query()->where('period_name', 'INCOME STATEMENT MARET 2026')->first();

if (!$period) {
    throw new RuntimeException('Periode INCOME STATEMENT MARET 2026 tidak ditemukan.');
}

$account4210 = ChartOfAccount::where('account_code', '4210')->first();
$account5340 = ChartOfAccount::where('account_code', '5340')->first();
$account5345 = ChartOfAccount::where('account_code', '5345')->first();

foreach (['4210' => $account4210, '5340' => $account5340, '5345' => $account5345] as $code => $account) {
    if (!$account) {
        throw new RuntimeException("Akun {$code} tidak ditemukan.");
    }
}

$entriesToRestore = [
    [
        'account_id' => $account4210->id,
        'description' => 'Pendapatan Lain-lain (PENDAPATAN BUNGA BANK) - BUNGA BANK MANDIRI',
        'amount' => 414150.08,
        'entry_type' => 'manual',
        'transaction_date' => '2026-03-31',
        'notes' => 'Restored to March after April income rollback; bank effect already restored separately.',
        'additional_data' => [
            'category' => 'Bunga Bank Mandiri',
            'description' => 'BUNGA BANK MANDIRI',
            'restored_from_april_income_rollback' => true,
            'restore_group' => 'april_2026_bank_entries_to_march',
            'original_month' => '2026-04',
            'bank_effect_restored_separately' => true,
        ],
    ],
    [
        'account_id' => $account5340->id,
        'description' => 'General Expense - PAJAK ATAS BUNGA BANK',
        'amount' => 82830.02,
        'entry_type' => 'manual',
        'transaction_date' => '2026-03-31',
        'notes' => 'Restored to March after April income rollback; bank effect already restored separately.',
        'additional_data' => [
            'category' => 'Beban Admin Bank',
            'description' => 'PAJAK ATAS BUNGA BANK',
            'restored_from_april_income_rollback' => true,
            'restore_group' => 'april_2026_bank_entries_to_march',
            'original_month' => '2026-04',
            'bank_effect_restored_separately' => true,
        ],
    ],
    [
        'account_id' => $account5345->id,
        'description' => 'General Expense - BEBAN ADMIN BANK BCA',
        'amount' => 30000.00,
        'entry_type' => 'manual',
        'transaction_date' => '2026-03-31',
        'notes' => 'Restored to March after April income rollback; bank effect already restored separately.',
        'additional_data' => [
            'category' => 'Beban Admin Bank',
            'description' => 'BEBAN ADMIN BANK BCA',
            'restored_from_april_income_rollback' => true,
            'restore_group' => 'april_2026_bank_entries_to_march',
            'original_month' => '2026-04',
            'bank_effect_restored_separately' => true,
        ],
    ],
    [
        'account_id' => $account5345->id,
        'description' => 'General Expense - BIAYA ADMIN BANK MANDIRI',
        'amount' => 13000.00,
        'entry_type' => 'manual',
        'transaction_date' => '2026-03-31',
        'notes' => 'Restored to March after April income rollback; bank effect already restored separately.',
        'additional_data' => [
            'category' => 'Beban Admin Bank',
            'description' => 'BIAYA ADMIN BANK MANDIRI',
            'restored_from_april_income_rollback' => true,
            'restore_group' => 'april_2026_bank_entries_to_march',
            'original_month' => '2026-04',
            'bank_effect_restored_separately' => true,
        ],
    ],
];

$existing = ProfitLossEntry::query()
    ->where('period_id', $period->id)
    ->where(function ($query) {
        $query->where('description', 'Pendapatan Lain-lain (PENDAPATAN BUNGA BANK) - BUNGA BANK MANDIRI')
            ->orWhere('description', 'General Expense - PAJAK ATAS BUNGA BANK')
            ->orWhere('description', 'General Expense - BEBAN ADMIN BANK BCA')
            ->orWhere('description', 'General Expense - BIAYA ADMIN BANK MANDIRI');
    })
    ->orderBy('id')
    ->get();

$summary = [
    'period' => [
        'id' => $period->id,
        'name' => $period->period_name,
        'total_revenue_before' => (float) $period->total_revenue,
        'total_expenses_before' => (float) $period->total_expenses,
        'net_profit_before' => (float) $period->net_profit,
    ],
    'entries_to_restore' => $entriesToRestore,
    'existing_matching_entries' => $existing->map(function ($entry) {
        return [
            'id' => $entry->id,
            'description' => $entry->description,
            'amount' => (float) $entry->amount,
            'account_id' => $entry->account_id,
            'transaction_date' => (string) $entry->transaction_date,
            'additional_data' => $entry->additional_data,
        ];
    })->all(),
    'expected_period_after' => [
        'total_revenue' => (float) $period->total_revenue + 414150.08,
        'total_expenses' => (float) $period->total_expenses + 125830.02,
        'net_profit' => (float) $period->net_profit + 288320.06,
    ],
    'notes' => [
        'bank_transactions_affected' => false,
        'income_statement_april_affected' => false,
        'scope' => 'restore missing March entries only',
    ],
];

if (!$apply) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($summary);
    echo PHP_EOL;
    exit(0);
}

if ($existing->isNotEmpty()) {
    throw new RuntimeException('Entry restore serupa sudah ada di periode Maret. Apply dibatalkan untuk mencegah duplikasi.');
}

DB::transaction(function () use ($entriesToRestore, $period): void {
    foreach ($entriesToRestore as $payload) {
        ProfitLossEntry::create($payload + [
            'period_id' => $period->id,
            'reference_type' => null,
            'reference_id' => null,
            'created_by' => 3,
        ]);
    }

    $period->refresh();
    $period->calculateTotals();
});

$periodAfter = ProfitLossPeriod::query()->find($period->id);
$restoredEntries = ProfitLossEntry::query()
    ->where('period_id', $period->id)
    ->where(function ($query) {
        $query->where('description', 'Pendapatan Lain-lain (PENDAPATAN BUNGA BANK) - BUNGA BANK MANDIRI')
            ->orWhere('description', 'General Expense - PAJAK ATAS BUNGA BANK')
            ->orWhere('description', 'General Expense - BEBAN ADMIN BANK BCA')
            ->orWhere('description', 'General Expense - BIAYA ADMIN BANK MANDIRI');
    })
    ->orderBy('id')
    ->get();

echo "APPLY BERHASIL\n";
var_export([
    'period_after' => [
        'id' => $periodAfter->id,
        'name' => $periodAfter->period_name,
        'total_revenue' => (float) $periodAfter->total_revenue,
        'total_expenses' => (float) $periodAfter->total_expenses,
        'net_profit' => (float) $periodAfter->net_profit,
    ],
    'restored_entries' => $restoredEntries->map(function ($entry) {
        return [
            'id' => $entry->id,
            'description' => $entry->description,
            'amount' => (float) $entry->amount,
            'account_id' => $entry->account_id,
            'transaction_date' => (string) $entry->transaction_date,
        ];
    })->all(),
]);
echo PHP_EOL;
