<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\BankTransaction;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Services\InvoicePostingService;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/repair-additional-invoices-remove-leaked-other-cost-items.php
 *   php scripts/repair-additional-invoices-remove-leaked-other-cost-items.php --apply
 *
 * Scope:
 * - Bersihkan item Other Cost yang bocor ke additional invoice:
 *   EWL2601002002-ADD1, EWL2601012012-ADD1, EWL2601014014-ADD1
 * - Recalculate total invoice
 * - Sync ulang AR component dan posting income statement bila invoice sudah posted
 * - Tidak mengubah SO, invoice utama, dan saldo bank
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;
$tolerance = 0.01;

$targetInvoiceNumbers = [
    'EWL2601002002-ADD1',
    'EWL2601012012-ADD1',
    'EWL2601014014-ADD1',
];

$formatAmount = static fn (float $amount): string => number_format($amount, 2, '.', ',');

$isLeakedOtherCostItem = static function (InvoiceItem $item): bool {
    $itemRef = strtolower(trim((string) ($item->item_ref ?? '')));
    $description = strtoupper(trim((string) ($item->description ?? '')));

    if (!str_starts_with($itemRef, 'other_cost_')) {
        return false;
    }

    return str_contains($description, 'REFUND')
        || str_contains($description, 'PPN')
        || str_contains($description, 'OTHER COST');
};

$summarizeItems = static fn (Collection $items): array => $items
    ->map(static fn (InvoiceItem $item): array => [
        'id' => $item->id,
        'description' => $item->description,
        'item_type' => $item->item_type,
        'item_ref' => $item->item_ref,
        'quantity' => (float) $item->quantity,
        'unit' => $item->unit,
        'rate' => (float) $item->rate,
        'amount' => (float) $item->amount,
        'include_in_customer_invoice' => (bool) $item->include_in_customer_invoice,
        'is_hidden_from_customer' => (bool) $item->is_hidden_from_customer,
        'paid_amount' => (float) ($item->paid_amount ?? 0),
        'outstanding_amount' => (float) ($item->outstanding_amount ?? 0),
        'payment_status' => $item->payment_status,
    ])
    ->values()
    ->all();

$calculateCustomerSubtotal = static function (Collection $items): float {
    return round((float) $items
        ->filter(static function (InvoiceItem $item): bool {
            return (bool) $item->include_in_customer_invoice
                && !(bool) $item->is_hidden_from_customer;
        })
        ->sum('amount'), 2);
};

$calculateVatAmount = static function (Invoice $invoice, Collection $items): float {
    $rate = (float) ($invoice->vat_rate ?? 0);
    if ($rate <= 0) {
        return 0.0;
    }

    $vatBase = (float) $items
        ->filter(static function (InvoiceItem $item): bool {
            $type = strtolower((string) ($item->item_type ?? 'billable'));

            return $type === 'billable'
                && (bool) $item->include_in_customer_invoice
                && !(bool) $item->is_hidden_from_customer;
        })
        ->sum('amount');

    return round($vatBase * ($rate / 100), 2);
};

$calculateTotal = static function (Invoice $invoice, Collection $items) use ($calculateCustomerSubtotal, $calculateVatAmount): float {
    $subtotal = $calculateCustomerSubtotal($items);
    $vatAmount = $calculateVatAmount($invoice, $items);

    return round($subtotal + $vatAmount - (float) ($invoice->down_payment_amount ?? 0), 2);
};

$report = [
    'dry_run' => $dryRun,
    'scope' => [
        'target_invoices' => $targetInvoiceNumbers,
        'bank_modified' => false,
        'sales_order_modified' => false,
        'main_invoice_modified' => false,
    ],
    'invoices' => [],
];

$invoices = Invoice::query()
    ->with(['items', 'accountReceivable.components'])
    ->whereIn('invoice_number', $targetInvoiceNumbers)
    ->orderBy('invoice_number')
    ->get()
    ->keyBy('invoice_number');

foreach ($targetInvoiceNumbers as $invoiceNumber) {
    /** @var Invoice|null $invoice */
    $invoice = $invoices->get($invoiceNumber);

    if (!$invoice) {
        $report['invoices'][$invoiceNumber] = [
            'found' => false,
            'action' => 'skip',
            'reason' => 'Invoice tidak ditemukan.',
        ];
        continue;
    }

    if (!$invoice->is_additional) {
        throw new RuntimeException("Invoice {$invoiceNumber} bukan additional invoice.");
    }

    $leakedItems = $invoice->items->filter($isLeakedOtherCostItem)->values();
    $remainingItems = $invoice->items
        ->reject(static fn (InvoiceItem $item): bool => $leakedItems->contains('id', $item->id))
        ->values();

    $newSubtotal = $calculateCustomerSubtotal($remainingItems);
    $newVatAmount = $calculateVatAmount($invoice, $remainingItems);
    $newTotal = $calculateTotal($invoice, $remainingItems);

    $receivable = $invoice->accountReceivable;
    $bankTransactions = collect();
    if ($receivable) {
        $bankTransactions = BankTransaction::query()
            ->where('reference_type', 'customer_payment')
            ->where('reference_id', $receivable->id)
            ->orderBy('id')
            ->get();
    }

    $customerPaymentTotal = round((float) $bankTransactions->sum('amount'), 2);
    $invoicePaidAmount = round((float) ($invoice->paid_amount ?? 0), 2);
    $paymentRisk = max($customerPaymentTotal, $invoicePaidAmount) > $newTotal + $tolerance;

    $report['invoices'][$invoiceNumber] = [
        'found' => true,
        'action' => $leakedItems->isEmpty() ? 'skip' : 'remove_leaked_items',
        'invoice' => [
            'id' => $invoice->id,
            'invoice_number' => $invoice->invoice_number,
            'sales_order_id' => $invoice->sales_order_id,
            'base_invoice_id' => $invoice->base_invoice_id,
            'status' => $invoice->status,
            'subtotal_before' => (float) $invoice->subtotal,
            'vat_amount_before' => (float) ($invoice->vat_amount ?? 0),
            'total_before' => (float) $invoice->total,
            'paid_amount_before' => $invoicePaidAmount,
            'posted_to_profit_loss' => (bool) $invoice->posted_to_profit_loss,
        ],
        'leaked_items' => $summarizeItems($leakedItems),
        'kept_items' => $summarizeItems($remainingItems),
        'after_plan' => [
            'subtotal' => $newSubtotal,
            'vat_amount' => $newVatAmount,
            'total' => $newTotal,
        ],
        'ar_before' => $receivable ? [
            'id' => $receivable->id,
            'invoice_amount' => (float) $receivable->invoice_amount,
            'paid_amount' => (float) $receivable->paid_amount,
            'outstanding_amount' => (float) $receivable->outstanding_amount,
            'status' => $receivable->status,
            'components' => $receivable->components
                ->map(static fn ($component): array => [
                    'id' => $component->id,
                    'component_type' => $component->component_type,
                    'amount' => (float) $component->amount,
                    'paid_amount' => (float) $component->paid_amount,
                    'outstanding_amount' => (float) $component->outstanding_amount,
                    'status' => $component->status,
                ])
                ->values()
                ->all(),
        ] : null,
        'bank_transactions' => $bankTransactions
            ->map(static fn (BankTransaction $transaction): array => [
                'id' => $transaction->id,
                'bank_account_id' => $transaction->bank_account_id,
                'transaction_date' => (string) $transaction->transaction_date,
                'transaction_type' => $transaction->transaction_type,
                'amount' => (float) $transaction->amount,
            ])
            ->values()
            ->all(),
        'payment_risk' => $paymentRisk ? [
            'blocked_on_apply' => true,
            'reason' => 'Paid amount/customer payment lebih besar dari total invoice baru. Perlu keputusan rollback/penyesuaian payment sebelum apply.',
            'customer_payment_total' => $customerPaymentTotal,
            'invoice_paid_amount' => $invoicePaidAmount,
            'new_total' => $newTotal,
        ] : null,
    ];
}

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

DB::transaction(function () use (
    $targetInvoiceNumbers,
    $isLeakedOtherCostItem,
    $calculateTotal,
    $tolerance
): void {
    foreach ($targetInvoiceNumbers as $invoiceNumber) {
        /** @var Invoice|null $invoice */
        $invoice = Invoice::query()
            ->with(['items', 'accountReceivable.components'])
            ->where('invoice_number', $invoiceNumber)
            ->lockForUpdate()
            ->first();

        if (!$invoice) {
            continue;
        }

        if (!$invoice->is_additional) {
            throw new RuntimeException("Invoice {$invoiceNumber} bukan additional invoice saat apply.");
        }

        $leakedItems = $invoice->items->filter($isLeakedOtherCostItem)->values();
        if ($leakedItems->isEmpty()) {
            continue;
        }

        $remainingItems = $invoice->items
            ->reject(static fn (InvoiceItem $item): bool => $leakedItems->contains('id', $item->id))
            ->values();

        $newTotal = $calculateTotal($invoice, $remainingItems);
        $receivable = $invoice->accountReceivable;
        $customerPaymentTotal = 0.0;

        if ($receivable) {
            $customerPaymentTotal = round((float) BankTransaction::query()
                ->where('reference_type', 'customer_payment')
                ->where('reference_id', $receivable->id)
                ->sum('amount'), 2);
        }

        $invoicePaidAmount = round((float) ($invoice->paid_amount ?? 0), 2);
        if (max($customerPaymentTotal, $invoicePaidAmount) > $newTotal + $tolerance) {
            throw new RuntimeException(
                "Apply dibatalkan untuk {$invoiceNumber}: payment ({$customerPaymentTotal}) / paid_amount ({$invoicePaidAmount}) lebih besar dari total baru ({$newTotal})."
            );
        }

        InvoiceItem::query()
            ->whereIn('id', $leakedItems->pluck('id')->all())
            ->delete();

        $invoice->refresh();
        $invoice->calculateTotals();
        $invoice->refresh();

        if ($invoice->accountReceivable) {
            AccountReceivable::syncFromInvoice($invoice);
        }

        app(InvoicePostingService::class)->sync($invoice->fresh(['items', 'customer']));
    }
});

$after = Invoice::query()
    ->with(['items', 'accountReceivable.components'])
    ->whereIn('invoice_number', $targetInvoiceNumbers)
    ->orderBy('invoice_number')
    ->get()
    ->map(static fn (Invoice $invoice): array => [
        'invoice_number' => $invoice->invoice_number,
        'subtotal' => (float) $invoice->subtotal,
        'vat_amount' => (float) ($invoice->vat_amount ?? 0),
        'total' => (float) $invoice->total,
        'status' => $invoice->status,
        'remaining_other_cost_items' => $invoice->items
            ->filter(static fn (InvoiceItem $item): bool => str_starts_with(strtolower((string) $item->item_ref), 'other_cost_'))
            ->map(static fn (InvoiceItem $item): array => [
                'id' => $item->id,
                'description' => $item->description,
                'item_ref' => $item->item_ref,
                'amount' => (float) $item->amount,
            ])
            ->values()
            ->all(),
        'ar' => $invoice->accountReceivable ? [
            'invoice_amount' => (float) $invoice->accountReceivable->invoice_amount,
            'paid_amount' => (float) $invoice->accountReceivable->paid_amount,
            'outstanding_amount' => (float) $invoice->accountReceivable->outstanding_amount,
            'status' => $invoice->accountReceivable->status,
        ] : null,
    ])
    ->values()
    ->all();

echo "DONE - LEAKED OTHER COST ITEMS BERHASIL DIPROSES\n";
echo json_encode([
    'dry_run' => false,
    'after' => $after,
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;

