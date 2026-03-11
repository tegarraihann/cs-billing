<?php

declare(strict_types=1);

use App\Models\BankAccount;
use App\Models\BankBalance;
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
 *   php scripts/recalculate-bca-feb-mar-2026-balances.php
 *   php scripts/recalculate-bca-feb-mar-2026-balances.php --apply
 *
 * Scope:
 * - Rebuild saldo bulanan BCA untuk Februari 2026 dan Maret 2026
 * - Menyesuaikan opening/current balance agar selaras dengan mutasi bank aktual
 * - Tidak mengubah transaksi bank
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetBankName = 'BCA';
$targetMonths = ['2026-02', '2026-03'];

$formatAmount = static fn (float $value): string => number_format($value, 2, '.', ',');

$bank = BankAccount::query()
    ->where('bank_name', $targetBankName)
    ->where('is_active', true)
    ->first();

if (!$bank) {
    throw new RuntimeException("Bank {$targetBankName} tidak ditemukan.");
}

$balanceRows = BankBalance::query()
    ->where('bank_account_id', $bank->id)
    ->whereIn('period_month', $targetMonths)
    ->orderBy('period_month')
    ->get()
    ->keyBy('period_month');

foreach ($targetMonths as $month) {
    if (!$balanceRows->has($month)) {
        throw new RuntimeException("Bank balance {$targetBankName} untuk periode {$month} tidak ditemukan.");
    }
}

$febBalance = $balanceRows->get('2026-02');
$marBalance = $balanceRows->get('2026-03');

$monthNetMovement = static function (BankAccount $bank, string $month): float {
    $monthStart = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
    $monthEnd = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

    return (float) $bank->transactions()
        ->whereBetween('transaction_date', [$monthStart, $monthEnd])
        ->get()
        ->reduce(function (float $carry, $transaction): float {
            return $carry + ($transaction->transaction_type === 'credit'
                ? (float) $transaction->amount
                : -(float) $transaction->amount);
        }, 0.0);
};

$febNet = $monthNetMovement($bank, '2026-02');
$marNet = $monthNetMovement($bank, '2026-03');

$before = [
    'bank' => [
        'id' => $bank->id,
        'bank_name' => $bank->bank_name,
        'account_name' => $bank->account_name,
    ],
    'balances' => [
        '2026-02' => [
            'id' => $febBalance->id,
            'opening_balance' => (float) $febBalance->opening_balance,
            'current_balance' => (float) $febBalance->current_balance,
            'net_movement' => $febNet,
            'recalculated_current_balance' => round((float) $febBalance->opening_balance + $febNet, 2),
        ],
        '2026-03' => [
            'id' => $marBalance->id,
            'opening_balance' => (float) $marBalance->opening_balance,
            'current_balance' => (float) $marBalance->current_balance,
            'net_movement' => $marNet,
            'recalculated_opening_balance' => round((float) $febBalance->opening_balance + $febNet, 2),
            'recalculated_current_balance' => round((float) $febBalance->opening_balance + $febNet + $marNet, 2),
        ],
    ],
];

echo "=== RECALCULATE BCA FEB-MAR 2026 BALANCES ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo sprintf(
    "Bank %s (#%d)\n",
    (string) $bank->bank_name,
    (int) $bank->id
);
echo sprintf(
    "Feb 2026 | opening=%s | current(before)=%s | net=%s | current(after)=%s\n",
    $formatAmount($before['balances']['2026-02']['opening_balance']),
    $formatAmount($before['balances']['2026-02']['current_balance']),
    $formatAmount($before['balances']['2026-02']['net_movement']),
    $formatAmount($before['balances']['2026-02']['recalculated_current_balance'])
);
echo sprintf(
    "Mar 2026 | opening(before)=%s | current(before)=%s | net=%s | opening(after)=%s | current(after)=%s\n",
    $formatAmount($before['balances']['2026-03']['opening_balance']),
    $formatAmount($before['balances']['2026-03']['current_balance']),
    $formatAmount($before['balances']['2026-03']['net_movement']),
    $formatAmount($before['balances']['2026-03']['recalculated_opening_balance']),
    $formatAmount($before['balances']['2026-03']['recalculated_current_balance'])
);

if ($dryRun) {
    echo "Mode DRY-RUN: tidak ada perubahan yang disimpan.\n";
    exit(0);
}

DB::transaction(function () use ($febBalance, $marBalance, $before): void {
    $febBalance->current_balance = $before['balances']['2026-02']['recalculated_current_balance'];
    $febBalance->saveQuietly();

    $marBalance->opening_balance = $before['balances']['2026-03']['recalculated_opening_balance'];
    $marBalance->current_balance = $before['balances']['2026-03']['recalculated_current_balance'];
    $marBalance->saveQuietly();
});

$after = [
    '2026-02' => BankBalance::query()->find($febBalance->id, ['id', 'period_month', 'opening_balance', 'current_balance']),
    '2026-03' => BankBalance::query()->find($marBalance->id, ['id', 'period_month', 'opening_balance', 'current_balance']),
];

echo "DONE - saldo BCA Februari dan Maret 2026 berhasil dihitung ulang.\n";
var_export([
    '2026-02' => $after['2026-02']?->toArray(),
    '2026-03' => $after['2026-03']?->toArray(),
]);
echo PHP_EOL;
