<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
use App\Models\AccountPayableNote;
use App\Models\BankTransaction;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

/**
 * Usage:
 *   php scripts/close-ridwan-opening-payable-after-relink.php
 *   php scripts/close-ridwan-opening-payable-after-relink.php --apply
 *
 * Tujuan:
 * - Menutup opening payable Ridwan #349 yang masih tersisa 350.000
 * - Berdasarkan koreksi sebelumnya, payment 350.000 sudah direlink ke AP aktif #382
 * - Tidak membuat / menghapus bank transaction baru
 */

$apply = in_array('--apply', $argv, true);

$openingPayableId = 349;
$activePayableId = 382;
$activeBankTxId = 373;
$relinkedAmount = 350000.00;

$resolveStatus = static function (float $paid, float $outstanding): string {
    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($paid > 0.01) {
        return 'partial';
    }

    return 'unpaid';
};

$opening = AccountPayable::query()->with('components')->find($openingPayableId);
$active = AccountPayable::query()->with('components')->find($activePayableId);
$bankTx = BankTransaction::query()->find($activeBankTxId);

echo "=== CLOSE RIDWAN OPENING PAYABLE AFTER RELINK ===\n";
echo "Mode: " . ($apply ? 'APPLY' : 'DRY-RUN') . "\n\n";

if (!$opening || !$active || !$bankTx) {
    throw new RuntimeException('Data opening/active payable atau bank transaction tidak ditemukan.');
}

if ((int) $opening->is_opening !== 1 || (string) $opening->vendor_name !== 'RIDWAN ( TRUCKING VENDOR BY AIR)') {
    throw new RuntimeException('Opening AP target tidak sesuai.');
}

if ((int) $active->is_opening !== 0 || (string) $active->vendor_name !== 'RIDWAN ( TRUCKING VENDOR BY AIR)') {
    throw new RuntimeException('AP aktif target tidak sesuai.');
}

if ((int) $bankTx->reference_id !== $activePayableId || round((float) $bankTx->amount, 2) !== round($relinkedAmount, 2)) {
    throw new RuntimeException('Bank transaction relink Ridwan tidak sesuai.');
}

$openingComponent = $opening->components->first();
if (!$openingComponent) {
    throw new RuntimeException('Opening component Ridwan tidak ditemukan.');
}

$newPaidAmount = round((float) $opening->paid_amount + $relinkedAmount, 2);
$newOutstanding = max(0.0, round((float) $opening->amount - $newPaidAmount, 2));
$newStatus = $resolveStatus($newPaidAmount, $newOutstanding);

$newComponentPaid = round((float) $openingComponent->paid_amount + $relinkedAmount, 2);
$newComponentOutstanding = max(0.0, round((float) $openingComponent->amount - $newComponentPaid, 2));
$newComponentStatus = $resolveStatus($newComponentPaid, $newComponentOutstanding);

$newNotes = trim((string) $opening->payment_notes);
$appendLine = '[FINAL CLEANUP] Opening payable ditutup karena payment Rp 350,000.00 sudah direlink ke AP aktif #382 / bank tx #373.';
if (!str_contains($newNotes, $appendLine)) {
    $newNotes = trim($newNotes . PHP_EOL . $appendLine);
}

$preview = [
    'opening_before' => [
        'id' => $opening->id,
        'amount' => (float) $opening->amount,
        'paid_amount' => (float) $opening->paid_amount,
        'outstanding_amount' => (float) $opening->outstanding_amount,
        'status' => $opening->status,
        'payment_date' => optional($opening->payment_date)->toDateString(),
    ],
    'component_before' => [
        'id' => $openingComponent->id,
        'amount' => (float) $openingComponent->amount,
        'paid_amount' => (float) $openingComponent->paid_amount,
        'outstanding_amount' => (float) $openingComponent->outstanding_amount,
        'status' => $openingComponent->status,
    ],
    'active_payable' => [
        'id' => $active->id,
        'amount' => (float) $active->amount,
        'paid_amount' => (float) $active->paid_amount,
        'outstanding_amount' => (float) $active->outstanding_amount,
        'status' => $active->status,
    ],
    'bank_tx' => [
        'id' => $bankTx->id,
        'amount' => (float) $bankTx->amount,
        'reference_id' => (int) $bankTx->reference_id,
        'description' => $bankTx->description,
    ],
    'opening_after' => [
        'paid_amount' => $newPaidAmount,
        'outstanding_amount' => $newOutstanding,
        'status' => $newStatus,
    ],
    'component_after' => [
        'paid_amount' => $newComponentPaid,
        'outstanding_amount' => $newComponentOutstanding,
        'status' => $newComponentStatus,
    ],
];

var_export($preview);
echo "\n\n";

if (!$apply) {
    echo "DRY-RUN selesai. Tidak ada perubahan data.\n";
    exit(0);
}

DB::transaction(function () use (
    $openingPayableId,
    $activePayableId,
    $activeBankTxId,
    $relinkedAmount,
    $appendLine,
    $resolveStatus
): void {
    $opening = AccountPayable::query()->with('components')->lockForUpdate()->find($openingPayableId);
    $active = AccountPayable::query()->lockForUpdate()->find($activePayableId);
    $bankTx = BankTransaction::query()->lockForUpdate()->find($activeBankTxId);

    if (!$opening || !$active || !$bankTx) {
        throw new RuntimeException('Data target berubah saat apply.');
    }

    if ((int) $bankTx->reference_id !== $activePayableId) {
        throw new RuntimeException('Reference bank tx berubah sebelum apply.');
    }

    $component = $opening->components()->lockForUpdate()->first();
    if (!$component) {
        throw new RuntimeException('Component opening Ridwan tidak ditemukan saat apply.');
    }

    $opening->paid_amount = round((float) $opening->paid_amount + $relinkedAmount, 2);
    $opening->outstanding_amount = max(0.0, round((float) $opening->amount - (float) $opening->paid_amount, 2));
    $opening->status = $resolveStatus((float) $opening->paid_amount, (float) $opening->outstanding_amount);
    $opening->payment_date = $opening->payment_date ?: $active->payment_date;
    $opening->payment_method = $opening->payment_method ?: $active->payment_method;
    $opening->paid_by = $opening->paid_by ?: $active->paid_by;

    $paymentNotes = trim((string) $opening->payment_notes);
    if (!str_contains($paymentNotes, $appendLine)) {
        $paymentNotes = trim($paymentNotes . PHP_EOL . $appendLine);
    }
    $opening->payment_notes = $paymentNotes;
    $opening->save();

    $component->paid_amount = round((float) $component->paid_amount + $relinkedAmount, 2);
    $component->outstanding_amount = max(0.0, round((float) $component->amount - (float) $component->paid_amount, 2));
    $component->status = $resolveStatus((float) $component->paid_amount, (float) $component->outstanding_amount);
    $component->save();

    $existingNote = AccountPayableNote::query()
        ->where('account_payable_id', $openingPayableId)
        ->where('source_type', 'adjustment')
        ->where('note', $appendLine)
        ->exists();

    if (!$existingNote) {
        AccountPayableNote::query()->create([
            'account_payable_id' => $openingPayableId,
            'component_id' => $component->id,
            'source_type' => 'adjustment',
            'note' => $appendLine,
        ]);
    }
});

echo "DONE: opening payable Ridwan #{$openingPayableId} berhasil ditutup.\n";
