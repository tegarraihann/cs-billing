<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\AccountReceivableComponent;
use App\Models\BankTransaction;
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
 *   php scripts/revert-so-ewilog2602044014-main-ar-payment.php                         # dry-run
 *   php scripts/revert-so-ewilog2602044014-main-ar-payment.php --apply                 # execute
 *   php scripts/revert-so-ewilog2602044014-main-ar-payment.php --so=EWILOG2602044014
 *   php scripts/revert-so-ewilog2602044014-main-ar-payment.php --ar-id=169 --apply
 *   php scripts/revert-so-ewilog2602044014-main-ar-payment.php --bank-tx-id=621 --apply
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$soFilter = 'EWILOG2602044014';
$arIdFilter = null;
$componentIdFilter = null;
$bankTxIdFilter = null;

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--so=')) {
        $soFilter = trim((string) substr($arg, strlen('--so=')));
        continue;
    }

    if (str_starts_with($arg, '--ar-id=')) {
        $arIdFilter = trim((string) substr($arg, strlen('--ar-id=')));
        continue;
    }

    if (str_starts_with($arg, '--component-id=')) {
        $componentIdFilter = trim((string) substr($arg, strlen('--component-id=')));
        continue;
    }

    if (str_starts_with($arg, '--bank-tx-id=')) {
        $bankTxIdFilter = trim((string) substr($arg, strlen('--bank-tx-id=')));
    }
}

$formatAmount = static fn (float $value): string => number_format($value, 2, '.', ',');

$normalizeSoCandidates = static function (string $value): array {
    $raw = strtoupper(trim($value));
    $compact = preg_replace('/[^A-Z0-9]/', '', $raw) ?: $raw;
    $withoutPrefix = preg_replace('/^EWILOG/', '', $compact);
    $withoutPrefix = preg_replace('/^EWL/', '', $withoutPrefix);

    return array_values(array_unique(array_filter([
        $raw,
        $compact,
        $withoutPrefix,
        $withoutPrefix !== '' ? 'EWILOG' . $withoutPrefix : null,
        $withoutPrefix !== '' ? 'EWL' . $withoutPrefix : null,
    ])));
};

$resolveInvoiceStatus = static function (AccountReceivable $ar): string {
    $paid = (float) $ar->paid_amount;
    $outstanding = (float) $ar->outstanding_amount;

    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($ar->due_date && Carbon::today()->gt(Carbon::parse($ar->due_date))) {
        return 'overdue';
    }

    // Gunakan status yang kompatibel dengan enum/status invoice existing.
    // Walau AR bisa partial, invoice table pada beberapa environment tidak menerima 'partial'.
    if ($paid > 0.01) {
        return 'sent';
    }

    return 'sent';
};

$printSnapshot = static function (string $title, AccountReceivable $ar, ?AccountReceivableComponent $mainComponent, ?BankTransaction $bankTx) use ($formatAmount): void {
    echo "  {$title}\n";
    echo sprintf(
        "    AR#%d | invoice=%s | status=%s | invoice_amount=%s | paid=%s | outstanding=%s\n",
        $ar->id,
        (string) ($ar->invoice_number ?? '-'),
        (string) ($ar->status ?? '-'),
        $formatAmount((float) ($ar->invoice_amount ?? 0)),
        $formatAmount((float) ($ar->paid_amount ?? 0)),
        $formatAmount((float) ($ar->outstanding_amount ?? 0))
    );

    if ($mainComponent) {
        echo sprintf(
            "    Main Component#%d | amount=%s | paid=%s | outstanding=%s | status=%s\n",
            $mainComponent->id,
            $formatAmount((float) ($mainComponent->amount ?? 0)),
            $formatAmount((float) ($mainComponent->paid_amount ?? 0)),
            $formatAmount((float) ($mainComponent->outstanding_amount ?? 0)),
            (string) ($mainComponent->status ?? '-')
        );
    } else {
        echo "    Main Component: -\n";
    }

    if ($bankTx) {
        echo sprintf(
            "    BankTx#%d | bank=%s | type=%s | amount=%s | date=%s\n",
            $bankTx->id,
            (string) ($bankTx->bankAccount->bank_name ?? '-'),
            (string) ($bankTx->transaction_type ?? '-'),
            $formatAmount((float) ($bankTx->amount ?? 0)),
            (string) optional($bankTx->transaction_date)->format('Y-m-d')
        );
        echo "      desc: " . (string) ($bankTx->description ?? '-') . "\n";
    } else {
        echo "    BankTx target: -\n";
    }
};

echo "=== REVERT MAIN AR PAYMENT (EWILOG2602044014) ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";

$arQuery = AccountReceivable::query()
    ->with(['components', 'salesOrder', 'invoice', 'invoice.items']);

if ($arIdFilter !== null && $arIdFilter !== '') {
    if (!ctype_digit($arIdFilter)) {
        fwrite(STDERR, "--ar-id harus numerik.\n");
        exit(1);
    }
    $arQuery->where('id', (int) $arIdFilter);
} else {
    $soCandidates = $normalizeSoCandidates($soFilter);
    $arQuery->whereHas('salesOrder', function ($query) use ($soCandidates, $soFilter) {
        $query->where(function ($nested) use ($soCandidates, $soFilter) {
            foreach ($soCandidates as $candidate) {
                $nested->orWhere('order_number', $candidate);
            }
            $nested->orWhere('order_number', 'like', '%' . $soFilter . '%');
        });
    });
}

/** @var AccountReceivable|null $ar */
$ar = $arQuery->orderByDesc('id')->first();
if (!$ar) {
    echo "AR tidak ditemukan untuk filter tersebut.\n";
    exit(0);
}

/** @var AccountReceivableComponent|null $mainComponent */
$mainComponent = null;
if ($componentIdFilter !== null && $componentIdFilter !== '') {
    if (!ctype_digit($componentIdFilter)) {
        fwrite(STDERR, "--component-id harus numerik.\n");
        exit(1);
    }
    $mainComponent = $ar->components->firstWhere('id', (int) $componentIdFilter);
} else {
    $mainComponent = $ar->components->firstWhere('component_type', 'main')
        ?? $ar->components->firstWhere('component_type', 'invoice_main');
}

if (!$mainComponent) {
    echo "Komponen main tidak ditemukan.\n";
    exit(1);
}

$bankTxQuery = BankTransaction::query()
    ->with('bankAccount')
    ->where('reference_type', 'customer_payment')
    ->where('reference_id', $ar->id);

/** @var BankTransaction|null $bankTx */
if ($bankTxIdFilter !== null && $bankTxIdFilter !== '') {
    if (!ctype_digit($bankTxIdFilter)) {
        fwrite(STDERR, "--bank-tx-id harus numerik.\n");
        exit(1);
    }
    $bankTx = $bankTxQuery->where('id', (int) $bankTxIdFilter)->first();
} else {
    $invoiceNumber = (string) ($ar->invoice_number ?? '');
    $bankTx = $bankTxQuery
        ->where('description', 'like', "%Invoice Main {$invoiceNumber}%")
        ->orderByDesc('id')
        ->first();
}

echo sprintf(
    "Target: SO=%s | AR#%d | Invoice=%s\n",
    (string) ($ar->salesOrder->order_number ?? '-'),
    $ar->id,
    (string) ($ar->invoice_number ?? '-')
);

$printSnapshot('Before', $ar, $mainComponent, $bankTx);

if ((float) $mainComponent->paid_amount <= 0.01) {
    echo "Main component sudah unpaid. Tidak ada perubahan.\n";
    exit(0);
}

if (!$bankTx) {
    echo "Peringatan: transaksi bank target untuk main payment tidak ditemukan.\n";
}

echo sprintf(
    "  Info mismatch check: main paid=%s vs bank tx=%s\n",
    $formatAmount((float) $mainComponent->paid_amount),
    $formatAmount((float) ($bankTx->amount ?? 0))
);

if (!$apply) {
    $simMainPaid = 0.0;
    $simMainOutstanding = (float) $mainComponent->amount;
    $otherComponents = $ar->components->where('id', '!=', $mainComponent->id);
    $simTotal = $simMainOutstanding + (float) $otherComponents->sum('amount');
    $simPaid = $simMainPaid + (float) $otherComponents->sum('paid_amount');
    $simOutstanding = $simTotal - $simPaid;
    $simStatus = $simOutstanding <= 0.01 ? 'paid' : ($simPaid > 0.01 ? 'partial' : 'outstanding');

    echo "  After (simulasi)\n";
    echo sprintf(
        "    AR#%d | status=%s | invoice_amount=%s | paid=%s | outstanding=%s\n",
        $ar->id,
        $simStatus,
        $formatAmount($simTotal),
        $formatAmount($simPaid),
        $formatAmount($simOutstanding)
    );
    echo sprintf(
        "    Main Component#%d | amount=%s | paid=%s | outstanding=%s | status=outstanding\n",
        $mainComponent->id,
        $formatAmount((float) $mainComponent->amount),
        $formatAmount($simMainPaid),
        $formatAmount($simMainOutstanding)
    );
    echo "Mode DRY-RUN: tidak ada perubahan disimpan.\n";
    exit(0);
}

DB::transaction(function () use ($ar, $mainComponent, $bankTx, $resolveInvoiceStatus): void {
    if ($bankTx) {
        $bankTx->delete();
    }

    $mainComponent->paid_amount = 0;
    $mainComponent->outstanding_amount = (float) $mainComponent->amount;
    $mainComponent->status = $ar->resolveComponentStatus($mainComponent);
    $mainComponent->save();

    $summary = $ar->recalculateTotals(true);

    $remainingPaymentTx = BankTransaction::query()
        ->where('reference_type', 'customer_payment')
        ->where('reference_id', $ar->id)
        ->orderByDesc('transaction_date')
        ->first();

    $ar->last_payment_date = $remainingPaymentTx?->transaction_date;
    $ar->save();

    $invoice = $ar->invoice;
    if ($invoice) {
        $newInvoiceStatus = $resolveInvoiceStatus($ar->fresh());
        $invoicePayload = [
            'status' => $newInvoiceStatus,
            'paid_amount' => $summary['paid_amount'] ?? $ar->paid_amount,
        ];

        if ($newInvoiceStatus !== 'paid') {
            $invoicePayload['paid_date'] = null;
            $invoicePayload['payment_method'] = null;
        }

        $invoice->update($invoicePayload);
    }
});

$ar->refresh()->load(['components', 'salesOrder', 'invoice']);
$mainAfter = $ar->components->firstWhere('id', $mainComponent->id);
$bankAfter = null;
if ($bankTx) {
    $bankAfter = BankTransaction::query()->with('bankAccount')->find($bankTx->id);
}

$printSnapshot('After', $ar, $mainAfter, $bankAfter);
echo "Selesai. Pembatalan komponen main payment sudah diterapkan.\n";
