<?php

declare(strict_types=1);

use App\Models\BankAccount;
use App\Models\BankTransaction;
use App\Models\GeneralExpense;
use App\Models\OtherIncome;
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
 *   php scripts/rollback-income-statement-april-2026-sources.php
 *   php scripts/rollback-income-statement-april-2026-sources.php --apply
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetPeriodName = 'INCOME STATEMENT APRIL 2026';

$period = ProfitLossPeriod::query()
    ->with('entries')
    ->where('period_name', $targetPeriodName)
    ->first();

if (!$period) {
    throw new RuntimeException("Periode {$targetPeriodName} tidak ditemukan.");
}

$entries = $period->entries()->orderBy('id')->get();
$entryIds = $entries->pluck('id')->all();

$otherIncomeIds = $entries->where('reference_type', 'other_income')
    ->pluck('reference_id')
    ->filter()
    ->unique()
    ->values()
    ->all();

$generalExpenseIds = $entries->where('reference_type', 'general_expense')
    ->pluck('reference_id')
    ->filter()
    ->unique()
    ->values()
    ->all();

$otherIncomes = empty($otherIncomeIds)
    ? collect()
    : OtherIncome::query()->whereIn('id', $otherIncomeIds)->get();

$otherIncomePaymentRows = empty($otherIncomeIds)
    ? collect()
    : DB::table('other_income_payments')->whereIn('other_income_id', $otherIncomeIds)->get();

$generalExpenses = empty($generalExpenseIds)
    ? collect()
    : GeneralExpense::query()->whereIn('id', $generalExpenseIds)->get();

$generalExpenseItemRows = empty($generalExpenseIds)
    ? collect()
    : DB::table('general_expense_items')->whereIn('expense_id', $generalExpenseIds)->get();

$bankTransactions = BankTransaction::query()
    ->where(function ($query) use ($otherIncomeIds, $generalExpenseIds) {
        if (!empty($otherIncomeIds)) {
            $query->orWhere(function ($qq) use ($otherIncomeIds) {
                $qq->whereIn('reference_type', ['other_income', 'other_income_direct'])
                    ->whereIn('reference_id', $otherIncomeIds);
            });
        }

        if (!empty($generalExpenseIds)) {
            $query->orWhere(function ($qq) use ($generalExpenseIds) {
                $qq->where('reference_type', 'general_expense')
                    ->whereIn('reference_id', $generalExpenseIds);
            });
        }
    })
    ->orderBy('id')
    ->get();

$mandiri = BankAccount::getMandiri();
$bca = BankAccount::getBCA();

$bankSnapshot = [
    'mandiri' => $mandiri ? [
        'id' => $mandiri->id,
        'balance' => $mandiri->getCurrentBalance(),
    ] : null,
    'bca' => $bca ? [
        'id' => $bca->id,
        'balance' => $bca->getCurrentBalance(),
    ] : null,
];

$bankDeltaByAccount = [];
foreach ($bankTransactions as $tx) {
    $accountId = (int) $tx->bank_account_id;
    if (!isset($bankDeltaByAccount[$accountId])) {
        $bankDeltaByAccount[$accountId] = 0.0;
    }

    $amount = (float) $tx->amount;
    if ($tx->transaction_type === 'credit') {
        $bankDeltaByAccount[$accountId] -= $amount;
    } else {
        $bankDeltaByAccount[$accountId] += $amount;
    }
}

$plan = [
    'period' => [
        'id' => $period->id,
        'period_code' => $period->period_code,
        'period_name' => $period->period_name,
        'status' => $period->status,
        'total_revenue' => (float) $period->total_revenue,
        'total_expenses' => (float) $period->total_expenses,
        'net_profit' => (float) $period->net_profit,
    ],
    'profit_loss_entries' => $entries->map(static function ($entry) {
        return [
            'id' => $entry->id,
            'reference_type' => $entry->reference_type,
            'reference_id' => $entry->reference_id,
            'amount' => (float) $entry->amount,
            'description' => $entry->description,
        ];
    })->values()->all(),
    'other_incomes' => $otherIncomes->map(static function ($row) {
        return [
            'id' => $row->id,
            'transaction_date' => (string) $row->transaction_date,
            'description' => $row->description,
            'amount' => (float) $row->amount,
            'posted_to_profit_loss' => (bool) $row->posted_to_profit_loss,
        ];
    })->values()->all(),
    'other_income_payments' => $otherIncomePaymentRows->map(static function ($row) {
        return [
            'id' => $row->id,
            'other_income_id' => $row->other_income_id,
            'payment_date' => (string) $row->payment_date,
            'amount' => (float) $row->amount,
            'payment_method' => $row->payment_method,
        ];
    })->values()->all(),
    'general_expenses' => $generalExpenses->map(static function ($row) {
        return [
            'id' => $row->id,
            'expense_date' => (string) $row->expense_date,
            'category' => $row->category,
            'total_amount' => (float) $row->total_amount,
            'status' => $row->status,
            'notes' => $row->notes,
        ];
    })->values()->all(),
    'general_expense_items' => $generalExpenseItemRows->map(static function ($row) {
        return [
            'id' => $row->id,
            'expense_id' => $row->expense_id,
            'description' => $row->description,
            'amount' => (float) $row->amount,
        ];
    })->values()->all(),
    'bank_transactions' => $bankTransactions->map(static function ($row) {
        return [
            'id' => $row->id,
            'bank_account_id' => $row->bank_account_id,
            'transaction_type' => $row->transaction_type,
            'amount' => (float) $row->amount,
            'reference_type' => $row->reference_type,
            'reference_id' => $row->reference_id,
            'description' => $row->description,
        ];
    })->values()->all(),
    'bank_balances_before' => $bankSnapshot,
    'expected_bank_balance_delta' => $bankDeltaByAccount,
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($plan);
    echo PHP_EOL;
    exit(0);
}

if ($period->status === 'closed') {
    throw new RuntimeException('Periode April sudah closed. Rollback dibatalkan.');
}

DB::transaction(function () use ($period, $entryIds, $otherIncomeIds, $generalExpenseIds): void {
    if (!empty($entryIds)) {
        ProfitLossEntry::query()
            ->whereIn('id', $entryIds)
            ->delete();
    }

    if (!empty($otherIncomeIds)) {
        BankTransaction::query()
            ->whereIn('reference_type', ['other_income', 'other_income_direct'])
            ->whereIn('reference_id', $otherIncomeIds)
            ->delete();

        DB::table('other_income_payments')
            ->whereIn('other_income_id', $otherIncomeIds)
            ->delete();

        OtherIncome::query()
            ->whereIn('id', $otherIncomeIds)
            ->delete();
    }

    if (!empty($generalExpenseIds)) {
        BankTransaction::query()
            ->where('reference_type', 'general_expense')
            ->whereIn('reference_id', $generalExpenseIds)
            ->delete();

        DB::table('general_expense_items')
            ->whereIn('expense_id', $generalExpenseIds)
            ->delete();

        GeneralExpense::query()
            ->whereIn('id', $generalExpenseIds)
            ->delete();
    }

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
        'summary_data' => $periodAfter->summary_data,
        'entries_count' => ProfitLossEntry::query()->where('period_id', $periodAfter->id)->count(),
    ] : null,
    'remaining_other_income_count' => empty($otherIncomeIds) ? 0 : OtherIncome::query()->whereIn('id', $otherIncomeIds)->count(),
    'remaining_general_expense_count' => empty($generalExpenseIds) ? 0 : GeneralExpense::query()->whereIn('id', $generalExpenseIds)->count(),
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
