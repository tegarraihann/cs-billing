<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\AccountReceivableComponent;
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
 *   php scripts/repair-so-ewilog2602044014-remove-stale-main-bca-payment.php
 *   php scripts/repair-so-ewilog2602044014-remove-stale-main-bca-payment.php --apply
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);

$targetSoNumber = 'EWILOG2602044014';
$targetArId = 169;
$targetMainComponentId = 281;
$targetMainAmount = 1950000.00;
$targetBankTransactionId = 621;
$expectedRemainingBankTxId = 622;

$formatAmount = static fn (float $value): string => number_format($value, 2, '.', ',');

echo "=== REPAIR STALE MAIN BCA PAYMENT (EWILOG2602044014) ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";

/** @var AccountReceivable|null $ar */
$ar = AccountReceivable::query()
    ->with(['salesOrder', 'components'])
    ->find($targetArId);

if (!$ar) {
    fwrite(STDERR, "AR #{$targetArId} tidak ditemukan.\n");
    exit(1);
}

if (($ar->salesOrder->order_number ?? null) !== $targetSoNumber) {
    fwrite(STDERR, "AR #{$targetArId} tidak terkait dengan SO {$targetSoNumber}.\n");
    exit(1);
}

/** @var AccountReceivableComponent|null $mainComponent */
$mainComponent = $ar->components->firstWhere('id', $targetMainComponentId);
if (!$mainComponent) {
    fwrite(STDERR, "Komponen main #{$targetMainComponentId} tidak ditemukan.\n");
    exit(1);
}

$debitComponent = $ar->components->firstWhere('component_type', 'debit_note');
if (!$debitComponent) {
    fwrite(STDERR, "Komponen debit note tidak ditemukan.\n");
    exit(1);
}

/** @var BankTransaction|null $mainBankTx */
$mainBankTx = BankTransaction::query()
    ->with('bankAccount')
    ->find($targetBankTransactionId);

if (!$mainBankTx) {
    echo "Bank transaction #{$targetBankTransactionId} sudah tidak ada. Tidak ada perubahan.\n";
    exit(0);
}

/** @var BankTransaction|null $remainingBankTx */
$remainingBankTx = BankTransaction::query()
    ->with('bankAccount')
    ->find($expectedRemainingBankTxId);

echo sprintf(
    "Target: SO=%s | AR#%d | MainComponent#%d | BankTx#%d\n",
    (string) ($ar->salesOrder->order_number ?? '-'),
    $ar->id,
    $mainComponent->id,
    $mainBankTx->id
);

echo "  Before\n";
echo sprintf(
    "    AR#%d | status=%s | invoice_amount=%s | paid=%s | outstanding=%s\n",
    $ar->id,
    (string) $ar->status,
    $formatAmount((float) $ar->invoice_amount),
    $formatAmount((float) $ar->paid_amount),
    $formatAmount((float) $ar->outstanding_amount)
);
echo sprintf(
    "    Main Component#%d | amount=%s | paid=%s | outstanding=%s | status=%s\n",
    $mainComponent->id,
    $formatAmount((float) $mainComponent->amount),
    $formatAmount((float) $mainComponent->paid_amount),
    $formatAmount((float) $mainComponent->outstanding_amount),
    (string) $mainComponent->status
);
echo sprintf(
    "    Debit Note#%d | amount=%s | paid=%s | outstanding=%s | status=%s\n",
    $debitComponent->id,
    $formatAmount((float) $debitComponent->amount),
    $formatAmount((float) $debitComponent->paid_amount),
    $formatAmount((float) $debitComponent->outstanding_amount),
    (string) $debitComponent->status
);
echo sprintf(
    "    BankTx#%d | bank=%s | type=%s | amount=%s | ref=%s#%s\n",
    $mainBankTx->id,
    (string) ($mainBankTx->bankAccount->bank_name ?? '-'),
    (string) $mainBankTx->transaction_type,
    $formatAmount((float) $mainBankTx->amount),
    (string) $mainBankTx->reference_type,
    (string) $mainBankTx->reference_id
);
if ($remainingBankTx) {
    echo sprintf(
        "    Remaining BankTx#%d | bank=%s | type=%s | amount=%s\n",
        $remainingBankTx->id,
        (string) ($remainingBankTx->bankAccount->bank_name ?? '-'),
        (string) $remainingBankTx->transaction_type,
        $formatAmount((float) $remainingBankTx->amount)
    );
}

$errors = [];

if (abs((float) $mainComponent->amount - $targetMainAmount) > 0.01) {
    $errors[] = 'Nominal komponen main tidak sesuai target repair.';
}

if ((float) $mainComponent->paid_amount > 0.01) {
    $errors[] = 'Komponen main belum pada kondisi unpaid/outstanding, repair ini tidak aman dijalankan.';
}

if ((float) $mainComponent->outstanding_amount < ($targetMainAmount - 0.01)) {
    $errors[] = 'Outstanding komponen main belum sesuai nilai yang diharapkan.';
}

if ((string) $mainBankTx->reference_type !== 'customer_payment' || (int) $mainBankTx->reference_id !== $ar->id) {
    $errors[] = 'Bank transaction target tidak terhubung ke AR yang benar.';
}

if ((string) $mainBankTx->transaction_type !== 'credit') {
    $errors[] = 'Bank transaction target bukan transaksi masuk/credit.';
}

if (abs((float) $mainBankTx->amount - $targetMainAmount) > 0.01) {
    $errors[] = 'Nominal bank transaction target bukan Rp 1.950.000.';
}

if ((float) $debitComponent->paid_amount < ((float) $debitComponent->amount - 0.01)) {
    $errors[] = 'Debit note tidak pada kondisi paid penuh. Repair dihentikan agar tidak mengganggu komponen lain.';
}

if (!empty($errors)) {
    foreach ($errors as $error) {
        fwrite(STDERR, $error . "\n");
    }
    exit(1);
}

if (!$apply) {
    echo "  After (simulasi)\n";
    echo sprintf(
        "    BankTx#%d akan dihapus. AR dan komponen tidak berubah lagi karena sudah sinkron.\n",
        $mainBankTx->id
    );
    echo "Mode DRY-RUN: tidak ada perubahan disimpan.\n";
    exit(0);
}

DB::transaction(function () use ($targetBankTransactionId): void {
    $lockedBankTx = BankTransaction::query()->lockForUpdate()->find($targetBankTransactionId);
    if ($lockedBankTx) {
        $lockedBankTx->delete();
    }
});

$bankAfter = BankTransaction::query()->find($targetBankTransactionId);
$arAfter = AccountReceivable::query()->with('components')->find($targetArId);
$mainAfter = $arAfter?->components->firstWhere('id', $targetMainComponentId);

echo "  After\n";
echo sprintf(
    "    AR#%d | status=%s | invoice_amount=%s | paid=%s | outstanding=%s\n",
    $arAfter->id,
    (string) $arAfter->status,
    $formatAmount((float) $arAfter->invoice_amount),
    $formatAmount((float) $arAfter->paid_amount),
    $formatAmount((float) $arAfter->outstanding_amount)
);
echo sprintf(
    "    Main Component#%d | amount=%s | paid=%s | outstanding=%s | status=%s\n",
    $mainAfter->id,
    $formatAmount((float) $mainAfter->amount),
    $formatAmount((float) $mainAfter->paid_amount),
    $formatAmount((float) $mainAfter->outstanding_amount),
    (string) $mainAfter->status
);
echo '    BankTx#' . $targetBankTransactionId . ' exists: ' . ($bankAfter ? 'YES' : 'NO') . "\n";
echo "Selesai. Transaksi BCA stale untuk payment main sudah dibersihkan.\n";
