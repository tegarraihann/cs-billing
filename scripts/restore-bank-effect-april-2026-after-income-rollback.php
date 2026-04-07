<?php

declare(strict_types=1);

use App\Models\BankAccount;
use App\Models\BankTransaction;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/restore-bank-effect-april-2026-after-income-rollback.php
 *   php scripts/restore-bank-effect-april-2026-after-income-rollback.php --apply
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$mandiri = BankAccount::getMandiri();
$bca = BankAccount::getBCA();

if (!$mandiri || !$bca) {
    throw new RuntimeException('Bank Mandiri / BCA tidak ditemukan.');
}

$createdBy = 3;
$restoreDate = '2026-04-01';

$transactions = [
    [
        'bank_account_id' => $mandiri->id,
        'transaction_date' => $restoreDate,
        'transaction_type' => 'credit',
        'amount' => 414150.08,
        'description' => 'RESTORE APRIL BANK EFFECT - BUNGA BANK MANDIRI',
        'reference_type' => 'bank_balance_restore',
        'reference_id' => null,
        'created_by' => $createdBy,
    ],
    [
        'bank_account_id' => $mandiri->id,
        'transaction_date' => $restoreDate,
        'transaction_type' => 'debit',
        'amount' => 13000.00,
        'description' => 'RESTORE APRIL BANK EFFECT - BIAYA ADMIN BANK MANDIRI',
        'reference_type' => 'bank_balance_restore',
        'reference_id' => null,
        'created_by' => $createdBy,
    ],
    [
        'bank_account_id' => $mandiri->id,
        'transaction_date' => $restoreDate,
        'transaction_type' => 'debit',
        'amount' => 82830.02,
        'description' => 'RESTORE APRIL BANK EFFECT - PAJAK ATAS BUNGA BANK',
        'reference_type' => 'bank_balance_restore',
        'reference_id' => null,
        'created_by' => $createdBy,
    ],
    [
        'bank_account_id' => $bca->id,
        'transaction_date' => $restoreDate,
        'transaction_type' => 'debit',
        'amount' => 30000.00,
        'description' => 'RESTORE APRIL BANK EFFECT - BEBAN ADMIN BANK BCA',
        'reference_type' => 'bank_balance_restore',
        'reference_id' => null,
        'created_by' => $createdBy,
    ],
];

$existing = collect();
foreach ($transactions as $payload) {
    $found = BankTransaction::query()
        ->where('bank_account_id', $payload['bank_account_id'])
        ->where('transaction_date', $payload['transaction_date'])
        ->where('transaction_type', $payload['transaction_type'])
        ->where('amount', $payload['amount'])
        ->where('description', $payload['description'])
        ->where('reference_type', $payload['reference_type'])
        ->first();

    if ($found) {
        $existing->push($found);
    }
}

$mandiriBefore = $mandiri->getCurrentBalance();
$bcaBefore = $bca->getCurrentBalance();

$mandiriDelta = 414150.08 - 13000.00 - 82830.02;
$bcaDelta = -30000.00;

$plan = [
    'bank_balances_before' => [
        'mandiri' => $mandiriBefore,
        'bca' => $bcaBefore,
    ],
    'transactions_to_restore' => $transactions,
    'existing_restore_transactions' => $existing->map(static function ($row) {
        return [
            'id' => $row->id,
            'bank_account_id' => $row->bank_account_id,
            'transaction_date' => (string) $row->transaction_date,
            'transaction_type' => $row->transaction_type,
            'amount' => (float) $row->amount,
            'description' => $row->description,
        ];
    })->values()->all(),
    'expected_bank_balance_after' => [
        'mandiri' => round($mandiriBefore + $mandiriDelta, 2),
        'bca' => round($bcaBefore + $bcaDelta, 2),
    ],
    'notes' => [
        'restore_only_bank_effect' => true,
        'income_statement_april_remains_empty' => true,
        'bank_delta_mandiri' => $mandiriDelta,
        'bank_delta_bca' => $bcaDelta,
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($plan);
    echo PHP_EOL;
    exit(0);
}

if ($existing->isNotEmpty()) {
    throw new RuntimeException('Transaksi restore sudah pernah dibuat. Apply dibatalkan agar tidak dobel.');
}

DB::transaction(function () use ($transactions): void {
    foreach ($transactions as $payload) {
        BankTransaction::create($payload);
    }
});

$mandiriAfter = BankAccount::getMandiri();
$bcaAfter = BankAccount::getBCA();

echo "APPLY SELESAI\n";
var_export([
    'bank_balances_after' => [
        'mandiri' => $mandiriAfter?->getCurrentBalance(),
        'bca' => $bcaAfter?->getCurrentBalance(),
    ],
    'created_transactions' => BankTransaction::query()
        ->where('reference_type', 'bank_balance_restore')
        ->whereDate('transaction_date', $restoreDate)
        ->orderBy('id')
        ->get(['id', 'bank_account_id', 'transaction_type', 'amount', 'description'])
        ->toArray(),
]);
echo PHP_EOL;
