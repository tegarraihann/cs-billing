<?php

declare(strict_types=1);

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
 *   php scripts/repair-pl-adjustment-admin-bank-bca-feb-2026.php
 *   php scripts/repair-pl-adjustment-admin-bank-bca-feb-2026.php --apply
 *   php scripts/repair-pl-adjustment-admin-bank-bca-feb-2026.php --entry-id=744 --apply
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$entryId = null;
foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--entry-id=')) {
        $raw = trim((string) substr($arg, strlen('--entry-id=')));
        $entryId = ctype_digit($raw) ? (int) $raw : null;
    }
}

$targetPeriodCode = 'PL-M-2026-02';
$targetTransactionDate = '2026-02-28';
$targetDescription = 'ADMIN BANK BCA FEB 2026';
$targetAmount = 30000.00;
$targetBankAccountId = 2; // BCA
$targetBankTransactionType = 'debit';
$targetNotes = 'PAID 28/02/2026';

$targetPeriod = ProfitLossPeriod::query()
    ->where('period_code', $targetPeriodCode)
    ->first();

if (!$targetPeriod) {
    throw new RuntimeException("Target period {$targetPeriodCode} tidak ditemukan.");
}

$entryQuery = ProfitLossEntry::query()
    ->where('entry_type', 'manual');

if ($entryId !== null) {
    $entryQuery->where('id', $entryId);
} else {
    $entryQuery
        ->where('amount', $targetAmount)
        ->where(function ($query): void {
            $query->where('description', 'like', '%ADMIN BANK BCA%')
                ->orWhere('description', 'like', '%BANK CHARGES%');
        });
}

$entries = $entryQuery->orderBy('id')->get();

if ($entries->count() !== 1) {
    throw new RuntimeException(
        'Entry target harus tepat 1. Ditemukan: ' . $entries->count() . '. Kandidat: ' . json_encode(
            $entries->map(static fn (ProfitLossEntry $entry) => [
                'id' => $entry->id,
                'period_id' => $entry->period_id,
                'description' => $entry->description,
                'amount' => (float) $entry->amount,
                'transaction_date' => (string) $entry->transaction_date,
            ])->all(),
            JSON_UNESCAPED_UNICODE
        )
    );
}

/** @var ProfitLossEntry $entry */
$entry = $entries->first();
$entry->load('period');
$sourcePeriod = $entry->period;

$additionalData = is_array($entry->additional_data) ? $entry->additional_data : [];
$bankTransactionId = isset($additionalData['bank_transaction_id']) && is_numeric($additionalData['bank_transaction_id'])
    ? (int) $additionalData['bank_transaction_id']
    : null;

$bankTransaction = null;
if ($bankTransactionId) {
    $bankTransaction = BankTransaction::query()->find($bankTransactionId);
}
if (!$bankTransaction) {
    $bankTransaction = BankTransaction::query()
        ->where('reference_type', 'profit_loss_adjustment')
        ->where('reference_id', $entry->id)
        ->first();
}

$before = [
    'entry' => [
        'id' => $entry->id,
        'period_id' => $entry->period_id,
        'period_code' => $sourcePeriod?->period_code,
        'description' => $entry->description,
        'amount' => (float) $entry->amount,
        'transaction_date' => (string) $entry->transaction_date,
        'notes' => $entry->notes,
        'additional_data' => $entry->additional_data,
    ],
    'bank_transaction' => $bankTransaction ? [
        'id' => $bankTransaction->id,
        'bank_account_id' => $bankTransaction->bank_account_id,
        'transaction_date' => (string) $bankTransaction->transaction_date,
        'transaction_type' => $bankTransaction->transaction_type,
        'amount' => (float) $bankTransaction->amount,
        'description' => $bankTransaction->description,
        'reference_type' => $bankTransaction->reference_type,
        'reference_id' => $bankTransaction->reference_id,
    ] : null,
    'target' => [
        'period_code' => $targetPeriod->period_code,
        'transaction_date' => $targetTransactionDate,
        'description' => $targetDescription,
        'amount' => $targetAmount,
        'bank_account_id' => $targetBankAccountId,
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
    $entry,
    $targetPeriod,
    $targetTransactionDate,
    $targetDescription,
    $targetAmount,
    $targetNotes,
    $targetBankAccountId,
    $targetBankTransactionType,
    $bankTransaction,
    $sourcePeriod,
    &$additionalData
): void {
    $entry->period_id = $targetPeriod->id;
    $entry->description = $targetDescription;
    $entry->amount = $targetAmount;
    $entry->transaction_date = $targetTransactionDate;
    $entry->notes = $targetNotes;

    if ($bankTransaction) {
        $bankTransaction->bank_account_id = $targetBankAccountId;
        $bankTransaction->transaction_date = $targetTransactionDate;
        $bankTransaction->transaction_type = $targetBankTransactionType;
        $bankTransaction->amount = $targetAmount;
        $bankTransaction->description = 'Income Statement Adjustment - ' . $targetDescription;
        $bankTransaction->reference_type = 'profit_loss_adjustment';
        $bankTransaction->reference_id = $entry->id;
        $bankTransaction->save();
    } else {
        $bankTransaction = BankTransaction::query()->create([
            'bank_account_id' => $targetBankAccountId,
            'transaction_date' => $targetTransactionDate,
            'transaction_type' => $targetBankTransactionType,
            'amount' => $targetAmount,
            'description' => 'Income Statement Adjustment - ' . $targetDescription,
            'reference_type' => 'profit_loss_adjustment',
            'reference_id' => $entry->id,
            'created_by' => $entry->created_by,
        ]);
    }

    $additionalData['bank_transaction_id'] = $bankTransaction->id;
    $additionalData['bank_account_id'] = $bankTransaction->bank_account_id;
    $additionalData['bank_transaction_type'] = $bankTransaction->transaction_type;
    $entry->additional_data = $additionalData;
    $entry->save();

    if ($sourcePeriod) {
        $sourcePeriod->refresh();
        $sourcePeriod->calculateTotals();
    }

    $targetPeriod->refresh();
    $targetPeriod->calculateTotals();
});

$entryAfter = ProfitLossEntry::query()->find($entry->id);
$periodAfter = $entryAfter?->period;
$additionalAfter = is_array($entryAfter?->additional_data) ? $entryAfter->additional_data : [];
$bankAfterId = isset($additionalAfter['bank_transaction_id']) ? (int) $additionalAfter['bank_transaction_id'] : null;
$bankAfter = $bankAfterId ? BankTransaction::query()->find($bankAfterId) : null;

echo "DONE - ENTRY & BANK TRANSACTION BERHASIL DISESUAIKAN KE FEBRUARI 2026\n";
var_export([
    'entry_after' => [
        'id' => $entryAfter?->id,
        'period_id' => $entryAfter?->period_id,
        'period_code' => $periodAfter?->period_code,
        'description' => $entryAfter?->description,
        'amount' => (float) ($entryAfter?->amount ?? 0),
        'transaction_date' => (string) ($entryAfter?->transaction_date ?? ''),
        'notes' => $entryAfter?->notes,
        'additional_data' => $entryAfter?->additional_data,
    ],
    'bank_transaction_after' => $bankAfter ? [
        'id' => $bankAfter->id,
        'bank_account_id' => $bankAfter->bank_account_id,
        'transaction_date' => (string) $bankAfter->transaction_date,
        'transaction_type' => $bankAfter->transaction_type,
        'amount' => (float) $bankAfter->amount,
        'description' => $bankAfter->description,
        'reference_type' => $bankAfter->reference_type,
        'reference_id' => $bankAfter->reference_id,
    ] : null,
]);
echo PHP_EOL;
