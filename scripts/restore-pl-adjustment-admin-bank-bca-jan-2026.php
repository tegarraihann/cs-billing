<?php

declare(strict_types=1);

use App\Models\BankAccount;
use App\Models\BankTransaction;
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
 *   php scripts/restore-pl-adjustment-admin-bank-bca-jan-2026.php
 *   php scripts/restore-pl-adjustment-admin-bank-bca-jan-2026.php --apply
 *
 * Scope:
 * - Menambah kembali entry manual Income Statement Januari 2026 untuk ADMIN BANK BCA 30.000
 * - Menambah kembali mutasi bank BCA Januari yang hilang
 * - Tidak mengubah entry Februari yang sekarang sudah benar
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetJanPeriodCode = 'PL-M-2026-01';
$sourceFebPeriodCode = 'PL-M-2026-02';
$targetDescription = 'ADMIN BANK BCA JAN 2026';
$sourceDescription = 'ADMIN BANK BCA FEB 2026';
$targetAmount = 30000.00;
$targetTransactionDate = '2026-01-31';
$targetBankTransactionType = 'debit';

$janPeriod = ProfitLossPeriod::query()->where('period_code', $targetJanPeriodCode)->first();
$febPeriod = ProfitLossPeriod::query()->where('period_code', $sourceFebPeriodCode)->first();
$bcaBankId = BankAccount::query()->where('bank_name', 'BCA')->value('id');

if (!$janPeriod || !$febPeriod) {
    throw new RuntimeException('Periode Januari/Februari 2026 tidak lengkap.');
}

if (!$bcaBankId) {
    throw new RuntimeException('Bank account BCA tidak ditemukan.');
}

$sourceEntry = ProfitLossEntry::query()
    ->where('period_id', $febPeriod->id)
    ->where('entry_type', 'manual')
    ->where('amount', $targetAmount)
    ->where('description', $sourceDescription)
    ->first();

if (!$sourceEntry) {
    throw new RuntimeException("Entry sumber {$sourceDescription} di periode Februari tidak ditemukan.");
}

$existingJanEntry = ProfitLossEntry::query()
    ->where('period_id', $janPeriod->id)
    ->where('entry_type', 'manual')
    ->where('amount', $targetAmount)
    ->where('description', $targetDescription)
    ->first();

$existingJanBankTx = null;
if ($existingJanEntry) {
    $existingJanBankTxId = data_get($existingJanEntry->additional_data, 'bank_transaction_id');
    if ($existingJanBankTxId) {
        $existingJanBankTx = BankTransaction::query()->find((int) $existingJanBankTxId);
    }
}

if (!$existingJanBankTx) {
    $existingJanBankTx = BankTransaction::query()
        ->where('bank_account_id', $bcaBankId)
        ->where('reference_type', 'profit_loss_adjustment')
        ->whereDate('transaction_date', $targetTransactionDate)
        ->where('amount', $targetAmount)
        ->where('description', 'Income Statement Adjustment - ' . $targetDescription)
        ->first();
}

$before = [
    'source_entry' => [
        'id' => $sourceEntry->id,
        'period_id' => $sourceEntry->period_id,
        'description' => $sourceEntry->description,
        'amount' => (float) $sourceEntry->amount,
        'transaction_date' => (string) $sourceEntry->transaction_date,
        'created_by' => $sourceEntry->created_by,
        'account_id' => $sourceEntry->account_id,
        'additional_data' => $sourceEntry->additional_data,
    ],
    'existing_jan_entry' => $existingJanEntry ? [
        'id' => $existingJanEntry->id,
        'period_id' => $existingJanEntry->period_id,
        'description' => $existingJanEntry->description,
        'amount' => (float) $existingJanEntry->amount,
        'transaction_date' => (string) $existingJanEntry->transaction_date,
        'additional_data' => $existingJanEntry->additional_data,
    ] : null,
    'existing_jan_bank_tx' => $existingJanBankTx ? [
        'id' => $existingJanBankTx->id,
        'bank_account_id' => $existingJanBankTx->bank_account_id,
        'transaction_date' => (string) $existingJanBankTx->transaction_date,
        'transaction_type' => $existingJanBankTx->transaction_type,
        'amount' => (float) $existingJanBankTx->amount,
        'description' => $existingJanBankTx->description,
        'reference_type' => $existingJanBankTx->reference_type,
        'reference_id' => $existingJanBankTx->reference_id,
    ] : null,
    'target' => [
        'period_code' => $targetJanPeriodCode,
        'description' => $targetDescription,
        'amount' => $targetAmount,
        'transaction_date' => $targetTransactionDate,
        'bank_account_id' => $bcaBankId,
        'bank_transaction_type' => $targetBankTransactionType,
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($before);
    echo PHP_EOL;
    exit(0);
}

DB::transaction(function () use (
    $existingJanEntry,
    $existingJanBankTx,
    $sourceEntry,
    $janPeriod,
    $bcaBankId,
    $targetDescription,
    $targetAmount,
    $targetTransactionDate,
    $targetBankTransactionType
): void {
    $entry = $existingJanEntry ?: new ProfitLossEntry();
    $entry->period_id = $janPeriod->id;
    $entry->account_id = $sourceEntry->account_id;
    $entry->description = $targetDescription;
    $entry->amount = $targetAmount;
    $entry->entry_type = 'manual';
    $entry->transaction_date = $targetTransactionDate;
    $entry->notes = null;
    $entry->created_by = $sourceEntry->created_by;
    $entry->save();

    $bankTx = $existingJanBankTx ?: new BankTransaction();
    $bankTx->bank_account_id = $bcaBankId;
    $bankTx->transaction_date = $targetTransactionDate;
    $bankTx->transaction_type = $targetBankTransactionType;
    $bankTx->amount = $targetAmount;
    $bankTx->description = 'Income Statement Adjustment - ' . $targetDescription;
    $bankTx->reference_type = 'profit_loss_adjustment';
    $bankTx->reference_id = $entry->id;
    $bankTx->created_by = $sourceEntry->created_by;
    $bankTx->save();

    $entry->additional_data = array_merge($entry->additional_data ?? [], [
        'bank_transaction_id' => $bankTx->id,
        'bank_account_id' => $bankTx->bank_account_id,
        'bank_transaction_type' => $bankTx->transaction_type,
    ]);
    $entry->save();
});

$janPeriod->refresh();
$janPeriod->calculateTotals();
$febPeriod->refresh();
$febPeriod->calculateTotals();

$entryAfter = ProfitLossEntry::query()
    ->where('period_id', $janPeriod->id)
    ->where('entry_type', 'manual')
    ->where('amount', $targetAmount)
    ->where('description', $targetDescription)
    ->first();

$bankTxAfter = null;
if ($entryAfter) {
    $bankTxAfterId = data_get($entryAfter->additional_data, 'bank_transaction_id');
    if ($bankTxAfterId) {
        $bankTxAfter = BankTransaction::query()->find((int) $bankTxAfterId);
    }
}

echo "DONE - ENTRY JANUARI BCA 30.000 BERHASIL DIRESTORE\n";
var_export([
    'entry_after' => $entryAfter ? [
        'id' => $entryAfter->id,
        'period_id' => $entryAfter->period_id,
        'description' => $entryAfter->description,
        'amount' => (float) $entryAfter->amount,
        'transaction_date' => (string) $entryAfter->transaction_date,
        'notes' => $entryAfter->notes,
        'additional_data' => $entryAfter->additional_data,
    ] : null,
    'bank_transaction_after' => $bankTxAfter ? [
        'id' => $bankTxAfter->id,
        'bank_account_id' => $bankTxAfter->bank_account_id,
        'transaction_date' => (string) $bankTxAfter->transaction_date,
        'transaction_type' => $bankTxAfter->transaction_type,
        'amount' => (float) $bankTxAfter->amount,
        'description' => $bankTxAfter->description,
        'reference_type' => $bankTxAfter->reference_type,
        'reference_id' => $bankTxAfter->reference_id,
    ] : null,
]);
echo PHP_EOL;
