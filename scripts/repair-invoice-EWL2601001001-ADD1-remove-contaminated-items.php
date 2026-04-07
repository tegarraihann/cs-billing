<?php

/**
 * Usage:
 *   php scripts/repair-invoice-EWL2601001001-ADD1-remove-contaminated-items.php
 *   php scripts/repair-invoice-EWL2601001001-ADD1-remove-contaminated-items.php --apply
 */

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\AccountReceivable;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Support\Facades\DB;

$apply = in_array('--apply', $argv, true);
$invoiceNumber = 'EWL2601001001-ADD1';
$keepItemIds = [3775, 3776];

$invoice = Invoice::with(['items' => function ($q) {
    $q->orderBy('id');
}])->where('invoice_number', $invoiceNumber)->first();

if (!$invoice) {
    fwrite(STDERR, "Invoice {$invoiceNumber} tidak ditemukan.\n");
    exit(1);
}

$ar = AccountReceivable::with('components')->where('invoice_id', $invoice->id)->first();

$itemsToKeep = $invoice->items->whereIn('id', $keepItemIds)->values();
$itemsToDelete = $invoice->items->whereNotIn('id', $keepItemIds)->values();

$expectedSubtotal = (float) $itemsToKeep->sum('amount');
$expectedOperationalCost = (float) $itemsToKeep->filter(function ($item) {
    return strtolower((string) $item->item_type) === 'operational_cost';
})->sum('amount');
$expectedArMain = (float) $itemsToKeep->filter(function ($item) {
    $type = strtolower((string) ($item->item_type ?? 'billable'));
    return $type === 'billable' || $item->item_type === null;
})->sum('amount');

$result = [
    'invoice' => [
        'id' => $invoice->id,
        'invoice_number' => $invoice->invoice_number,
        'invoice_type' => $invoice->invoice_type,
        'is_additional' => (bool) $invoice->is_additional,
        'subtotal_before' => (float) $invoice->subtotal,
        'total_before' => (float) $invoice->total,
        'subtotal_after_expected' => $expectedSubtotal,
        'total_after_expected' => $expectedSubtotal,
    ],
    'items_kept' => $itemsToKeep->map(function ($item) {
        return [
            'id' => $item->id,
            'description' => $item->description,
            'item_type' => $item->item_type,
            'item_ref' => $item->item_ref,
            'amount' => (float) $item->amount,
        ];
    })->all(),
    'items_deleted' => $itemsToDelete->map(function ($item) {
        return [
            'id' => $item->id,
            'description' => $item->description,
            'item_type' => $item->item_type,
            'item_ref' => $item->item_ref,
            'amount' => (float) $item->amount,
        ];
    })->all(),
    'ar_before' => $ar ? [
        'id' => $ar->id,
        'invoice_amount' => (float) $ar->invoice_amount,
        'paid_amount' => (float) $ar->paid_amount,
        'outstanding_amount' => (float) $ar->outstanding_amount,
        'status' => $ar->status,
        'components' => $ar->components->map(function ($component) {
            return [
                'id' => $component->id,
                'type' => $component->component_type,
                'amount' => (float) $component->amount,
                'paid_amount' => (float) $component->paid_amount,
                'outstanding_amount' => (float) $component->outstanding_amount,
                'status' => $component->status,
            ];
        })->all(),
    ] : null,
    'ar_after_expected' => [
        'invoice_amount' => $expectedArMain,
        'paid_amount' => $ar ? (float) $ar->paid_amount : 0.0,
        'outstanding_amount' => max(0, $expectedArMain - ($ar ? (float) $ar->paid_amount : 0.0)),
        'main_component_amount' => $expectedArMain,
        'operational_cost_total_retained_on_invoice' => $expectedOperationalCost,
    ],
    'notes' => [
        'repair_scope' => 'case-specific invoice tambahan cleanup only',
        'bank_transactions_affected' => false,
        'customer_payments_affected' => false,
        'global_logic_changed' => false,
    ],
];

if (!$apply) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($result);
    exit(0);
}

DB::transaction(function () use ($invoice, $itemsToDelete, &$result) {
    if ($itemsToDelete->isNotEmpty()) {
        InvoiceItem::whereIn('id', $itemsToDelete->pluck('id')->all())->delete();
    }

    $invoice->refresh();
    $invoice->load('items');
    $invoice->calculateTotals();

    $ar = AccountReceivable::syncFromInvoice($invoice->fresh(['items']))->fresh('components');

    $result['invoice_after'] = [
        'subtotal' => (float) $invoice->fresh()->subtotal,
        'total' => (float) $invoice->fresh()->total,
        'remaining_item_ids' => $invoice->fresh()->items()->orderBy('id')->pluck('id')->all(),
    ];

    $result['ar_after'] = [
        'id' => $ar->id,
        'invoice_amount' => (float) $ar->invoice_amount,
        'paid_amount' => (float) $ar->paid_amount,
        'outstanding_amount' => (float) $ar->outstanding_amount,
        'status' => $ar->status,
        'components' => $ar->components->map(function ($component) {
            return [
                'id' => $component->id,
                'type' => $component->component_type,
                'amount' => (float) $component->amount,
                'paid_amount' => (float) $component->paid_amount,
                'outstanding_amount' => (float) $component->outstanding_amount,
                'status' => $component->status,
            ];
        })->all(),
    ];
});

echo "APPLY BERHASIL\n";
var_export($result);
