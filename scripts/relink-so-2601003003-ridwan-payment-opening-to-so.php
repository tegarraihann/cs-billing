<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
use App\Models\AccountPayableNote;
use App\Models\BankTransaction;
use App\Models\SalesOrder;
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
 *   php scripts/relink-so-2601003003-ridwan-payment-opening-to-so.php          # dry-run
 *   php scripts/relink-so-2601003003-ridwan-payment-opening-to-so.php --apply  # eksekusi relink
 *
 * Tujuan:
 * - Memindahkan referensi payment Ridwan dari AP opening (id=349) ke AP SO EWILOG2601003003 (id=382)
 * - Tanpa membuat transaksi bank baru (hanya update link reference_id)
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);

$targetSoNumber = 'EWILOG2601003003';
$sourcePayableId = 349; // opening payable
$targetPayableId = 382; // payable di SO target
$targetComponentId = 2122; // komponen trucking di AP target
$bankTransactionId = 373; // transaksi BCA existing
$transferAmount = 350000.00;
$systemUserId = 1;

$resolveComponentStatus = static function (float $paid, float $outstanding): string {
    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($paid > 0) {
        return 'partial';
    }

    return 'unpaid';
};

$appendNote = static function (?string $existing, string $line): string {
    $line = trim($line);
    $existing = trim((string) $existing);

    if ($line === '') {
        return $existing;
    }

    if ($existing === '') {
        return $line;
    }

    if (str_contains($existing, $line)) {
        return $existing;
    }

    return $existing . PHP_EOL . $line;
};

$formatPayable = static function (AccountPayable $payable): array {
    $payable->loadMissing('components');

    return [
        'id' => $payable->id,
        'sales_order_id' => $payable->sales_order_id,
        'vendor_name' => $payable->vendor_name,
        'service_description' => $payable->service_description,
        'is_opening' => (bool) $payable->is_opening,
        'opening_type' => $payable->opening_type,
        'amount' => (float) $payable->amount,
        'paid_amount' => (float) $payable->paid_amount,
        'outstanding_amount' => (float) $payable->outstanding_amount,
        'status' => $payable->status,
        'payment_date' => $payable->payment_date?->toDateString(),
        'payment_method' => $payable->payment_method,
        'components' => $payable->components->map(function (AccountPayableComponent $component) {
            return [
                'id' => $component->id,
                'type' => $component->component_type,
                'description' => $component->description,
                'amount' => (float) $component->amount,
                'paid_amount' => (float) $component->paid_amount,
                'outstanding_amount' => (float) $component->outstanding_amount,
                'status' => $component->status,
            ];
        })->values()->all(),
    ];
};

$so = SalesOrder::query()->where('order_number', $targetSoNumber)->first();
if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$sourcePayable = AccountPayable::query()->with('components')->find($sourcePayableId);
if (!$sourcePayable) {
    throw new RuntimeException("Source AP {$sourcePayableId} tidak ditemukan.");
}

$targetPayable = AccountPayable::query()->with('components')->find($targetPayableId);
if (!$targetPayable) {
    throw new RuntimeException("Target AP {$targetPayableId} tidak ditemukan.");
}

if ((int) $targetPayable->sales_order_id !== (int) $so->id) {
    throw new RuntimeException("Target AP {$targetPayableId} bukan milik SO {$targetSoNumber}.");
}

$bankTx = BankTransaction::query()->find($bankTransactionId);
if (!$bankTx) {
    throw new RuntimeException("Bank transaction {$bankTransactionId} tidak ditemukan.");
}

if ((string) $bankTx->reference_type !== 'vendor_payment') {
    throw new RuntimeException("Bank transaction {$bankTransactionId} reference_type harus vendor_payment.");
}

if (strtolower((string) $bankTx->transaction_type) !== 'debit') {
    throw new RuntimeException("Bank transaction {$bankTransactionId} harus debit.");
}

if (round((float) $bankTx->amount, 2) !== round($transferAmount, 2)) {
    throw new RuntimeException("Nominal bank transaction {$bankTransactionId} tidak sesuai {$transferAmount}.");
}

if ((int) $bankTx->reference_id !== (int) $sourcePayable->id) {
    throw new RuntimeException(
        "Bank transaction {$bankTransactionId} saat ini tidak mengarah ke source AP {$sourcePayableId}."
    );
}

$targetComponent = $targetPayable->components->firstWhere('id', $targetComponentId);
if (!$targetComponent) {
    throw new RuntimeException("Target component {$targetComponentId} tidak ditemukan di AP {$targetPayableId}.");
}

if ((float) $targetComponent->outstanding_amount + 0.01 < $transferAmount) {
    throw new RuntimeException('Outstanding komponen target tidak cukup untuk relink nominal.');
}

$sourceComponent = null;
if ($sourcePayable->components->count() === 1) {
    $sourceComponent = $sourcePayable->components->first();
} else {
    $sourceComponent = $sourcePayable->components
        ->sortByDesc(fn (AccountPayableComponent $component) => (float) $component->paid_amount)
        ->first();
}

if (!$sourceComponent) {
    throw new RuntimeException("Source component pada AP {$sourcePayableId} tidak ditemukan.");
}

if ((float) $sourceComponent->paid_amount + 0.01 < $transferAmount) {
    throw new RuntimeException('Paid amount pada source component tidak cukup untuk dipindahkan.');
}

$dryRunProjection = static function (
    AccountPayableComponent $srcComp,
    AccountPayableComponent $dstComp,
    float $amount
) use ($resolveComponentStatus): array {
    $srcPaidAfter = max(0.0, round((float) $srcComp->paid_amount - $amount, 2));
    $srcOutstandingAfter = max(0.0, round((float) $srcComp->amount - $srcPaidAfter, 2));
    $dstPaidAfter = max(0.0, round((float) $dstComp->paid_amount + $amount, 2));
    $dstOutstandingAfter = max(0.0, round((float) $dstComp->amount - $dstPaidAfter, 2));

    return [
        'source_component_after' => [
            'id' => $srcComp->id,
            'paid_amount' => $srcPaidAfter,
            'outstanding_amount' => $srcOutstandingAfter,
            'status' => $resolveComponentStatus($srcPaidAfter, $srcOutstandingAfter),
        ],
        'target_component_after' => [
            'id' => $dstComp->id,
            'paid_amount' => $dstPaidAfter,
            'outstanding_amount' => $dstOutstandingAfter,
            'status' => $resolveComponentStatus($dstPaidAfter, $dstOutstandingAfter),
        ],
    ];
};

$projection = $dryRunProjection($sourceComponent, $targetComponent, $transferAmount);

if (!$apply) {
    echo "DRY RUN - TIDAK ADA UPDATE\n";
    var_export([
        'target_so' => $targetSoNumber,
        'bank_transaction' => [
            'id' => $bankTx->id,
            'bank_account_id' => $bankTx->bank_account_id,
            'transaction_date' => Carbon::parse($bankTx->transaction_date)->toDateString(),
            'amount' => (float) $bankTx->amount,
            'description' => $bankTx->description,
            'reference_type' => $bankTx->reference_type,
            'reference_id_before' => (int) $bankTx->reference_id,
            'reference_id_after' => $targetPayableId,
        ],
        'source_payable_before' => $formatPayable($sourcePayable),
        'target_payable_before' => $formatPayable($targetPayable),
        'component_projection' => $projection,
    ]);
    echo PHP_EOL;
    exit(0);
}

DB::transaction(function () use (
    $bankTransactionId,
    $sourcePayableId,
    $targetPayableId,
    $targetComponentId,
    $transferAmount,
    $resolveComponentStatus,
    $appendNote,
    $systemUserId
): void {
    $bankTx = BankTransaction::query()->lockForUpdate()->find($bankTransactionId);
    $sourcePayable = AccountPayable::query()->lockForUpdate()->with('components')->find($sourcePayableId);
    $targetPayable = AccountPayable::query()->lockForUpdate()->with('components')->find($targetPayableId);

    if (!$bankTx || !$sourcePayable || !$targetPayable) {
        throw new RuntimeException('Data lock gagal: bankTx/sourcePayable/targetPayable tidak ditemukan.');
    }

    if ((int) $bankTx->reference_id !== (int) $sourcePayable->id) {
        throw new RuntimeException('Reference bank transaction berubah sebelum eksekusi.');
    }

    $targetComponent = AccountPayableComponent::query()->lockForUpdate()->find($targetComponentId);
    if (!$targetComponent || (int) $targetComponent->account_payable_id !== (int) $targetPayable->id) {
        throw new RuntimeException('Target component tidak valid saat lock.');
    }

    $sourceComponent = null;
    if ($sourcePayable->components->count() === 1) {
        $sourceComponent = AccountPayableComponent::query()
            ->lockForUpdate()
            ->find($sourcePayable->components->first()->id);
    } else {
        $sourceComponentId = $sourcePayable->components
            ->sortByDesc(fn (AccountPayableComponent $component) => (float) $component->paid_amount)
            ->first()?->id;
        if ($sourceComponentId) {
            $sourceComponent = AccountPayableComponent::query()->lockForUpdate()->find($sourceComponentId);
        }
    }

    if (!$sourceComponent || (int) $sourceComponent->account_payable_id !== (int) $sourcePayable->id) {
        throw new RuntimeException('Source component tidak valid saat lock.');
    }

    if ((float) $sourceComponent->paid_amount + 0.01 < $transferAmount) {
        throw new RuntimeException('Paid amount source component tidak cukup saat lock.');
    }

    if ((float) $targetComponent->outstanding_amount + 0.01 < $transferAmount) {
        throw new RuntimeException('Outstanding target component tidak cukup saat lock.');
    }

    $sourceComponent->paid_amount = max(0.0, round((float) $sourceComponent->paid_amount - $transferAmount, 2));
    $sourceComponent->outstanding_amount = max(
        0.0,
        round((float) $sourceComponent->amount - (float) $sourceComponent->paid_amount, 2)
    );
    $sourceComponent->status = $resolveComponentStatus(
        (float) $sourceComponent->paid_amount,
        (float) $sourceComponent->outstanding_amount
    );
    $sourceComponent->save();

    $targetComponent->paid_amount = max(0.0, round((float) $targetComponent->paid_amount + $transferAmount, 2));
    $targetComponent->outstanding_amount = max(
        0.0,
        round((float) $targetComponent->amount - (float) $targetComponent->paid_amount, 2)
    );
    $targetComponent->status = $resolveComponentStatus(
        (float) $targetComponent->paid_amount,
        (float) $targetComponent->outstanding_amount
    );
    $targetComponent->save();

    $sourceSummary = $sourcePayable->recalculateTotals(false);
    $sourcePayable->fill($sourceSummary);

    $targetSummary = $targetPayable->recalculateTotals(false);
    $targetPayable->fill($targetSummary);

    $txDate = Carbon::parse($bankTx->transaction_date)->toDateString();
    $correctionNote = sprintf(
        '[CORRECTION] Relink payment Rp %s via bank tx #%d (%s): AP #%d -> AP #%d',
        number_format($transferAmount, 2, '.', ','),
        $bankTx->id,
        $txDate,
        $sourcePayable->id,
        $targetPayable->id
    );

    $sourcePayable->payment_notes = $appendNote($sourcePayable->payment_notes, $correctionNote);
    $targetPayable->payment_notes = $appendNote($targetPayable->payment_notes, $correctionNote);

    if (!$targetPayable->payment_date) {
        $targetPayable->payment_date = $txDate;
    }
    if (!$targetPayable->payment_method) {
        $targetPayable->payment_method = $sourcePayable->payment_method ?: 'Transfer Bank';
    }
    if (!$targetPayable->paid_by) {
        $targetPayable->paid_by = $sourcePayable->paid_by ?: $systemUserId;
    }

    $sourcePayable->save();
    $targetPayable->save();

    AccountPayableNote::query()->create([
        'sales_order_id' => $sourcePayable->sales_order_id,
        'account_payable_id' => $sourcePayable->id,
        'component_id' => $sourceComponent->id,
        'source_type' => 'adjustment',
        'note' => $correctionNote,
        'created_by' => $systemUserId,
    ]);

    AccountPayableNote::query()->create([
        'sales_order_id' => $targetPayable->sales_order_id,
        'account_payable_id' => $targetPayable->id,
        'component_id' => $targetComponent->id,
        'source_type' => 'adjustment',
        'note' => $correctionNote,
        'created_by' => $systemUserId,
    ]);

    $bankTx->reference_id = $targetPayable->id;
    $bankTx->description = sprintf(
        'Payment for Pembayaran Vendor - %s: %s (relinked from AP %d)',
        (string) $targetPayable->vendor_name,
        (string) $targetPayable->service_description,
        (int) $sourcePayable->id
    );
    $bankTx->save();
});

$bankTxAfter = BankTransaction::query()->findOrFail($bankTransactionId);
$sourcePayableAfter = AccountPayable::query()->with('components')->findOrFail($sourcePayableId);
$targetPayableAfter = AccountPayable::query()->with('components')->findOrFail($targetPayableId);

echo "DONE - RELINK BERHASIL\n";
var_export([
    'target_so' => $targetSoNumber,
    'bank_transaction_after' => [
        'id' => $bankTxAfter->id,
        'reference_type' => $bankTxAfter->reference_type,
        'reference_id' => $bankTxAfter->reference_id,
        'amount' => (float) $bankTxAfter->amount,
        'description' => $bankTxAfter->description,
    ],
    'source_payable_after' => $formatPayable($sourcePayableAfter),
    'target_payable_after' => $formatPayable($targetPayableAfter),
]);
echo PHP_EOL;
