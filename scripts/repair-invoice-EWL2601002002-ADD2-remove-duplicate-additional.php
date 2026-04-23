<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\BankBalance;
use App\Models\BankTransaction;
use App\Models\Invoice;
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
 *   php scripts/repair-invoice-EWL2601002002-ADD2-remove-duplicate-additional.php
 *   php scripts/repair-invoice-EWL2601002002-ADD2-remove-duplicate-additional.php --apply
 *
 * Scope:
 * - Hapus duplicate additional invoice EWL2601002002-ADD2
 * - Hapus AR dan item invoice terkait melalui cascade
 * - Hapus customer payment bank transaction untuk ADD2
 * - Recalculate saldo bank mulai bulan transaksi payment
 * - Unpost invoice dari income statement sebelum invoice dihapus
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetInvoiceNumber = 'EWL2601002002-ADD2';
$duplicateOfInvoiceNumber = 'EWL2601002002-ADD1';
$expectedSalesOrderId = 155;
$expectedBaseInvoiceId = 127;
$expectedAmount = 61138.00;
$expectedBankAccountId = 2; // BCA
$systemUserId = 3;
$tolerance = 0.01;

$formatAmount = static fn (float $amount): string => number_format($amount, 2, '.', ',');

$recalculateBankBalancesFromMonth = static function (int $bankAccountId, string $startingMonth, int $systemUserId): void {
    $months = BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', '>=', $startingMonth)
        ->orderBy('period_month')
        ->get();

    if ($months->isEmpty()) {
        return;
    }

    $previousMonth = Carbon::createFromFormat('Y-m', $startingMonth)->subMonth()->format('Y-m');
    $previousCurrent = (float) BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $previousMonth)
        ->value('current_balance');

    foreach ($months as $balance) {
        $balance->opening_balance = $previousCurrent;

        $monthStart = Carbon::createFromFormat('Y-m', $balance->period_month)->startOfMonth()->toDateString();
        $monthEnd = Carbon::createFromFormat('Y-m', $balance->period_month)->endOfMonth()->toDateString();

        $net = (float) BankTransaction::query()
            ->where('bank_account_id', $bankAccountId)
            ->whereBetween('transaction_date', [$monthStart, $monthEnd])
            ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
            ->value('net');

        $balance->current_balance = round((float) $balance->opening_balance + $net, 2);

        if (!$balance->created_by) {
            $balance->created_by = $systemUserId;
        }

        $balance->save();
        $previousCurrent = (float) $balance->current_balance;
    }
};

$invoice = Invoice::query()
    ->with(['items', 'accountReceivable.components'])
    ->where('invoice_number', $targetInvoiceNumber)
    ->first();

if (!$invoice) {
    throw new RuntimeException("Invoice {$targetInvoiceNumber} tidak ditemukan.");
}

$duplicateOf = Invoice::query()
    ->with(['items'])
    ->where('invoice_number', $duplicateOfInvoiceNumber)
    ->first();

if (!$duplicateOf) {
    throw new RuntimeException("Invoice pembanding {$duplicateOfInvoiceNumber} tidak ditemukan.");
}

if (!$invoice->is_additional || (int) $invoice->additional_sequence !== 2) {
    throw new RuntimeException("Invoice {$targetInvoiceNumber} bukan additional invoice sequence 2.");
}

if ((int) $invoice->sales_order_id !== $expectedSalesOrderId || (int) $invoice->base_invoice_id !== $expectedBaseInvoiceId) {
    throw new RuntimeException("Invoice {$targetInvoiceNumber} tidak sesuai target SO/base invoice.");
}

if ((int) $duplicateOf->sales_order_id !== $expectedSalesOrderId || (int) $duplicateOf->base_invoice_id !== $expectedBaseInvoiceId) {
    throw new RuntimeException("Invoice pembanding {$duplicateOfInvoiceNumber} tidak sesuai target SO/base invoice.");
}

if (abs((float) $invoice->total - $expectedAmount) > $tolerance) {
    throw new RuntimeException("Total {$targetInvoiceNumber} tidak sesuai target {$formatAmount($expectedAmount)}.");
}

if (abs((float) $duplicateOf->total - $expectedAmount) > $tolerance) {
    throw new RuntimeException("Total {$duplicateOfInvoiceNumber} tidak sesuai target {$formatAmount($expectedAmount)}.");
}

$targetItems = $invoice->items->map(static fn ($item): array => [
    'id' => $item->id,
    'description' => $item->description,
    'quantity' => (float) $item->quantity,
    'unit' => $item->unit,
    'rate' => (float) $item->rate,
    'amount' => (float) $item->amount,
    'item_ref' => $item->item_ref,
    'item_type' => $item->item_type,
])->values();

$duplicateItems = $duplicateOf->items->map(static fn ($item): array => [
    'id' => $item->id,
    'description' => $item->description,
    'quantity' => (float) $item->quantity,
    'unit' => $item->unit,
    'rate' => (float) $item->rate,
    'amount' => (float) $item->amount,
    'item_ref' => $item->item_ref,
    'item_type' => $item->item_type,
])->values();

$receivable = $invoice->accountReceivable;
if (!$receivable) {
    $receivable = AccountReceivable::query()
        ->with('components')
        ->where('invoice_id', $invoice->id)
        ->first();
}

if (!$receivable) {
    throw new RuntimeException("AR untuk invoice {$targetInvoiceNumber} tidak ditemukan.");
}

if (abs((float) $receivable->invoice_amount - $expectedAmount) > $tolerance) {
    throw new RuntimeException("AR invoice amount tidak sesuai target {$formatAmount($expectedAmount)}.");
}

$bankTransactions = BankTransaction::query()
    ->where('reference_type', 'customer_payment')
    ->where('reference_id', $receivable->id)
    ->orderBy('id')
    ->get();

if ($invoice->status === 'paid') {
    if ($bankTransactions->count() !== 1) {
        throw new RuntimeException("Invoice paid tetapi jumlah customer payment bank transaction bukan 1.");
    }

    $payment = $bankTransactions->first();
    if ((int) $payment->bank_account_id !== $expectedBankAccountId) {
        throw new RuntimeException("Bank account payment bukan BCA target.");
    }

    if ($payment->transaction_type !== 'credit' || abs((float) $payment->amount - $expectedAmount) > $tolerance) {
        throw new RuntimeException("Bank transaction payment tidak sesuai target.");
    }
}

$startingMonth = $bankTransactions->isNotEmpty()
    ? Carbon::parse((string) $bankTransactions->first()->transaction_date)->format('Y-m')
    : null;

$balancePreviewBefore = $startingMonth
    ? BankBalance::query()
        ->where('bank_account_id', $expectedBankAccountId)
        ->where('period_month', '>=', $startingMonth)
        ->orderBy('period_month')
        ->get(['period_month', 'opening_balance', 'current_balance'])
        ->map(static fn ($row): array => [
            'period_month' => $row->period_month,
            'opening_balance' => (float) $row->opening_balance,
            'current_balance' => (float) $row->current_balance,
        ])
        ->values()
        ->all()
    : [];

$report = [
    'dry_run' => $dryRun,
    'scope' => [
        'delete_invoice' => $invoice->invoice_number,
        'duplicate_of' => $duplicateOf->invoice_number,
        'sales_order_id' => $invoice->sales_order_id,
        'base_invoice_id' => $invoice->base_invoice_id,
        'bank_account_id' => $expectedBankAccountId,
    ],
    'target_invoice' => [
        'id' => $invoice->id,
        'invoice_number' => $invoice->invoice_number,
        'status' => $invoice->status,
        'total' => (float) $invoice->total,
        'paid_amount' => (float) ($invoice->paid_amount ?? 0),
        'posted_to_profit_loss' => (bool) $invoice->posted_to_profit_loss,
        'profit_loss_entries' => $invoice->profit_loss_entries,
        'created_at' => (string) $invoice->created_at,
    ],
    'duplicate_existing_invoice' => [
        'id' => $duplicateOf->id,
        'invoice_number' => $duplicateOf->invoice_number,
        'status' => $duplicateOf->status,
        'total' => (float) $duplicateOf->total,
        'created_at' => (string) $duplicateOf->created_at,
    ],
    'items_to_delete' => $targetItems->all(),
    'duplicate_existing_items' => $duplicateItems->all(),
    'ar_to_delete' => [
        'id' => $receivable->id,
        'invoice_amount' => (float) $receivable->invoice_amount,
        'paid_amount' => (float) $receivable->paid_amount,
        'outstanding_amount' => (float) $receivable->outstanding_amount,
        'status' => $receivable->status,
        'components' => $receivable->components->map(static fn ($component): array => [
            'id' => $component->id,
            'component_type' => $component->component_type,
            'amount' => (float) $component->amount,
            'paid_amount' => (float) $component->paid_amount,
            'outstanding_amount' => (float) $component->outstanding_amount,
            'status' => $component->status,
        ])->values()->all(),
    ],
    'bank_transactions_to_delete' => $bankTransactions->map(static fn ($transaction): array => [
        'id' => $transaction->id,
        'bank_account_id' => $transaction->bank_account_id,
        'transaction_date' => optional($transaction->transaction_date)->toDateString(),
        'transaction_type' => $transaction->transaction_type,
        'amount' => (float) $transaction->amount,
        'description' => $transaction->description,
    ])->values()->all(),
    'bank_balance_before' => $balancePreviewBefore,
    'notes' => [
        'ADD1 tetap dipertahankan',
        'Bank credit ADD2 akan dihapus',
        'Invoice akan di-unpost dari income statement sebelum dihapus jika sudah posted',
        'AR, AR components, invoice items akan hilang melalui cascade setelah invoice dihapus',
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

DB::transaction(function () use (
    $invoice,
    $receivable,
    $bankTransactions,
    $startingMonth,
    $expectedBankAccountId,
    $systemUserId,
    $recalculateBankBalancesFromMonth
): void {
    $lockedInvoice = Invoice::query()
        ->with(['accountReceivable.components'])
        ->lockForUpdate()
        ->find($invoice->id);

    if (!$lockedInvoice) {
        throw new RuntimeException('Invoice target sudah tidak ada saat apply.');
    }

    $lockedReceivable = AccountReceivable::query()
        ->with('components')
        ->lockForUpdate()
        ->find($receivable->id);

    if (!$lockedReceivable) {
        throw new RuntimeException('AR target sudah tidak ada saat apply.');
    }

    if ($lockedInvoice->posted_to_profit_loss) {
        $lockedInvoice->unpostFromProfitLoss($systemUserId);
        $lockedInvoice->refresh();
    }

    foreach ($bankTransactions as $transaction) {
        $lockedTransaction = BankTransaction::query()
            ->lockForUpdate()
            ->find($transaction->id);

        if ($lockedTransaction) {
            $lockedTransaction->delete();
        }
    }

    $lockedInvoice->delete();

    if ($startingMonth) {
        $recalculateBankBalancesFromMonth($expectedBankAccountId, $startingMonth, $systemUserId);
    }
});

$afterInvoiceExists = Invoice::query()->where('invoice_number', $targetInvoiceNumber)->exists();
$afterArExists = AccountReceivable::query()->where('id', $receivable->id)->exists();
$afterBankExists = BankTransaction::query()
    ->where('reference_type', 'customer_payment')
    ->where('reference_id', $receivable->id)
    ->exists();
$afterDuplicateOf = Invoice::query()
    ->where('invoice_number', $duplicateOfInvoiceNumber)
    ->first(['id', 'invoice_number', 'status', 'total']);
$balanceAfter = $startingMonth
    ? BankBalance::query()
        ->where('bank_account_id', $expectedBankAccountId)
        ->where('period_month', '>=', $startingMonth)
        ->orderBy('period_month')
        ->get(['period_month', 'opening_balance', 'current_balance'])
        ->map(static fn ($row): array => [
            'period_month' => $row->period_month,
            'opening_balance' => (float) $row->opening_balance,
            'current_balance' => (float) $row->current_balance,
        ])
        ->values()
        ->all()
    : [];

echo "DONE - DUPLICATE ADDITIONAL INVOICE {$targetInvoiceNumber} BERHASIL DIHAPUS\n";
echo json_encode([
    'target_invoice_exists' => $afterInvoiceExists,
    'target_ar_exists' => $afterArExists,
    'target_bank_payment_exists' => $afterBankExists,
    'duplicate_existing_invoice_kept' => $afterDuplicateOf ? [
        'id' => $afterDuplicateOf->id,
        'invoice_number' => $afterDuplicateOf->invoice_number,
        'status' => $afterDuplicateOf->status,
        'total' => (float) $afterDuplicateOf->total,
    ] : null,
    'bank_balance_after' => $balanceAfter,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;

