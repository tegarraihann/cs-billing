<?php

declare(strict_types=1);

use App\Http\Controllers\AdminKeuangan\SalesOrderController;
use App\Models\AccountPayable;
use App\Models\AccountReceivable;
use App\Models\Invoice;
use App\Models\SalesOrder;
use App\Models\SalesOrderVendorItem;
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
 *   php scripts/cleanup-so-2602035005-red-vendor-breakdown-items.php
 *   php scripts/cleanup-so-2602035005-red-vendor-breakdown-items.php --apply
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2602035005';
$targetInvoiceNumber = 'EWL2602035005';

$redFieldTargets = [
    'PICK UP ORIGIN' => ['selling_amount' => 0.0],
    'MATERAI' => ['selling_amount' => 0.0],
    'NEXT HANDLING' => ['buying_amount' => 0.0],
    'OPEN PU PROCESS' => ['buying_amount' => 0.0],
    'ADMIN FEE' => ['buying_amount' => 0.0],
    'DOK FEE' => ['buying_amount' => 0.0],
    'TOESLAGH' => ['buying_amount' => 0.0],
    'CANCELATION FEE' => ['buying_amount' => 0.0],
];

$normalize = static function (?string $value): string {
    return strtolower(trim((string) $value));
};

$calculateTotals = static function (array $items): array {
    $buying = 0.0;
    $selling = 0.0;

    foreach ($items as $item) {
        if (!is_array($item)) {
            continue;
        }

        $quantity = is_numeric($item['quantity'] ?? null) && (float) ($item['quantity'] ?? 0) > 0
            ? (float) $item['quantity']
            : 1.0;

        $buying += ((float) ($item['buying_amount'] ?? 0)) * $quantity;
        $selling += ((float) ($item['selling_amount'] ?? 0)) * $quantity;
    }

    return [
        'buying' => round($buying, 2),
        'selling' => round($selling, 2),
        'revenue' => round($selling - $buying, 2),
    ];
};

$collectPayableSummary = static function (int $salesOrderId): array {
    return AccountPayable::query()
        ->with(['components'])
        ->where('sales_order_id', $salesOrderId)
        ->orderBy('id')
        ->get()
        ->map(function (AccountPayable $payable) {
            return [
                'id' => $payable->id,
                'vendor_name' => $payable->vendor_name,
                'amount' => (float) $payable->amount,
                'paid_amount' => (float) $payable->paid_amount,
                'outstanding_amount' => (float) $payable->outstanding_amount,
                'status' => $payable->status,
                'components' => $payable->components
                    ->sortBy('id')
                    ->values()
                    ->map(function ($component) {
                        return [
                            'id' => $component->id,
                            'description' => $component->description,
                            'amount' => (float) $component->amount,
                            'paid_amount' => (float) $component->paid_amount,
                            'outstanding_amount' => (float) $component->outstanding_amount,
                            'status' => $component->status,
                            'lookup_ref' => data_get($component->related_items, 'lookup_ref'),
                            'vendor_breakdown_id' => data_get($component->related_items, 'vendor_breakdown_id'),
                            'source' => data_get($component->related_items, 'source'),
                        ];
                    })
                    ->all(),
            ];
        })
        ->all();
};

$collectInvoiceSummary = static function (Collection $invoices): array {
    return $invoices->map(function (Invoice $invoice) {
        $invoice->loadMissing('items');

        return [
            'id' => $invoice->id,
            'invoice_number' => $invoice->invoice_number,
            'invoice_type' => $invoice->invoice_type,
            'status' => $invoice->status,
            'subtotal' => (float) $invoice->subtotal,
            'vat_amount' => (float) $invoice->vat_amount,
            'total' => (float) $invoice->total,
            'customer_visible_sum' => (float) $invoice->items
                ->where('include_in_customer_invoice', true)
                ->where('is_hidden_from_customer', false)
                ->sum('amount'),
            'vendor_items' => $invoice->items
                ->filter(function ($item) {
                    return is_string($item->item_ref)
                        && (str_starts_with($item->item_ref, 'vendor_') || str_starts_with($item->item_ref, 'cogs_vendor_'));
                })
                ->values()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'description' => $item->description,
                        'item_ref' => $item->item_ref,
                        'item_type' => $item->item_type,
                        'vendor_id' => $item->vendor_id,
                        'amount' => (float) $item->amount,
                    ];
                })
                ->all(),
            'non_vendor_visible_items' => $invoice->items
                ->filter(function ($item) {
                    return (!is_string($item->item_ref) || (!str_starts_with($item->item_ref, 'vendor_') && !str_starts_with($item->item_ref, 'cogs_vendor_')))
                        && $item->include_in_customer_invoice
                        && !$item->is_hidden_from_customer;
                })
                ->values()
                ->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'description' => $item->description,
                        'item_ref' => $item->item_ref,
                        'item_type' => $item->item_type,
                        'amount' => (float) $item->amount,
                    ];
                })
                ->all(),
        ];
    })->all();
};

$collectReceivableSummary = static function (int $salesOrderId): array {
    return AccountReceivable::query()
        ->with('components')
        ->where('sales_order_id', $salesOrderId)
        ->orderBy('id')
        ->get()
        ->map(function (AccountReceivable $receivable) {
            return [
                'id' => $receivable->id,
                'invoice_id' => $receivable->invoice_id,
                'invoice_number' => $receivable->invoice_number,
                'invoice_amount' => (float) $receivable->invoice_amount,
                'paid_amount' => (float) $receivable->paid_amount,
                'outstanding_amount' => (float) $receivable->outstanding_amount,
                'status' => $receivable->status,
                'components' => $receivable->components
                    ->sortBy('id')
                    ->values()
                    ->map(function ($component) {
                        return [
                            'id' => $component->id,
                            'component_type' => $component->component_type,
                            'description' => $component->description,
                            'amount' => (float) $component->amount,
                            'paid_amount' => (float) $component->paid_amount,
                            'outstanding_amount' => (float) $component->outstanding_amount,
                            'status' => $component->status,
                        ];
                    })
                    ->all(),
            ];
        })
        ->all();
};

$collectState = static function (SalesOrder $salesOrder) use ($calculateTotals, $collectInvoiceSummary, $collectPayableSummary, $collectReceivableSummary): array {
    $salesOrder->loadMissing(['vendorBreakdownItems', 'invoices.items', 'reimbursementItems']);

    $vendorItems = $salesOrder->vendorBreakdownItems
        ->sortBy('sort_order')
        ->values()
        ->map(fn (SalesOrderVendorItem $item) => $item->toVendorBreakdownArray() + ['id' => $item->id])
        ->all();

    return [
        'sales_order' => [
            'id' => $salesOrder->id,
            'order_number' => $salesOrder->order_number,
            'invoice_number' => $salesOrder->invoice_number,
            'status' => $salesOrder->status,
            'total_buying' => (float) $salesOrder->total_buying,
            'total_selling' => (float) $salesOrder->total_selling,
            'total_revenue' => (float) $salesOrder->total_revenue,
            'total_amount' => (float) $salesOrder->total_amount,
        ],
        'vendor_breakdown_items' => $vendorItems,
        'vendor_breakdown_totals' => $calculateTotals($vendorItems),
        'invoices' => $collectInvoiceSummary($salesOrder->invoices),
        'receivables' => $collectReceivableSummary($salesOrder->id),
        'payables' => $collectPayableSummary($salesOrder->id),
    ];
};

$invokePrivate = static function (object $instance, string $methodName, array $arguments = []) {
    $method = new ReflectionMethod($instance, $methodName);
    $method->setAccessible(true);

    return $method->invokeArgs($instance, $arguments);
};

$buildTargetItems = static function (Collection $currentItems) use (
    $normalize,
    $redFieldTargets
): array {
    $normalizedTargets = [];
    foreach ($redFieldTargets as $description => $fields) {
        $normalizedTargets[$normalize($description)] = $fields;
    }

    $targetItems = [];
    $zeroed = [];
    $alreadyZeroed = [];
    $matchedTargets = [];

    foreach ($currentItems->sortBy('sort_order')->values() as $item) {
        /** @var SalesOrderVendorItem $item */
        $payload = $item->toVendorBreakdownArray();
        $payload['id'] = $item->id;

        $descriptionKey = $normalize($item->description);
        $targetFields = $normalizedTargets[$descriptionKey] ?? null;

        if ($targetFields !== null) {
            $matchedTargets[] = $descriptionKey;

            foreach ($targetFields as $field => $newAmount) {
                $currentAmount = (float) ($payload[$field] ?? 0);

                if ($currentAmount !== (float) $newAmount) {
                    $zeroed[] = [
                        'id' => $item->id,
                        'description' => $item->description,
                        'field' => $field,
                        'old_amount' => $currentAmount,
                        'new_amount' => (float) $newAmount,
                    ];
                    $payload[$field] = (float) $newAmount;
                } else {
                    $alreadyZeroed[] = [
                        'id' => $item->id,
                        'description' => $item->description,
                        'field' => $field,
                        'amount' => $currentAmount,
                    ];
                }
            }
        }

        $targetItems[] = $payload;
    }

    $missingTargets = array_values(array_diff(array_keys($normalizedTargets), array_unique($matchedTargets)));

    return [
        'items' => array_values($targetItems),
        'zeroed' => $zeroed,
        'already_zeroed' => $alreadyZeroed,
        'missing_targets' => $missingTargets,
    ];
};

$salesOrder = SalesOrder::query()
    ->with(['vendorBreakdownItems', 'invoices.items', 'reimbursementItems'])
    ->where('order_number', $targetSoNumber)
    ->first();

if (!$salesOrder) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

if ((string) $salesOrder->invoice_number !== $targetInvoiceNumber) {
    throw new RuntimeException("SO {$targetSoNumber} tidak terkait invoice {$targetInvoiceNumber}.");
}

$buildResult = $buildTargetItems($salesOrder->vendorBreakdownItems);
$targetItems = $buildResult['items'];
$zeroedRows = $buildResult['zeroed'];
$alreadyZeroedRows = $buildResult['already_zeroed'];
$missingTargets = $buildResult['missing_targets'];

$beforeState = $collectState($salesOrder);
$targetTotals = $calculateTotals($targetItems);

$targetPreview = [
    'sales_order_target_totals' => [
        'total_buying' => $targetTotals['buying'],
        'total_selling' => $targetTotals['selling'],
        'total_revenue' => $targetTotals['revenue'],
        'total_amount' => $targetTotals['selling'],
    ],
    'fields_zeroed' => $zeroedRows,
    'fields_already_zero' => $alreadyZeroedRows,
    'fields_missing_in_current_db' => $missingTargets,
    'targeted_fields' => $redFieldTargets,
    'target_vendor_breakdown_items' => $targetItems,
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export([
        'before' => $beforeState,
        'target' => $targetPreview,
    ]);
    echo PHP_EOL;
    exit(0);
}

DB::transaction(static function () use (
    $salesOrder,
    $targetItems,
    $invokePrivate
): void {
    $so = SalesOrder::query()
        ->with(['vendorBreakdownItems', 'invoices.items', 'reimbursementItems'])
        ->lockForUpdate()
        ->find($salesOrder->id);

    if (!$so) {
        throw new RuntimeException('SO target hilang saat apply.');
    }

    $so->setAttribute('vendor_breakdown', $targetItems);
    $so->syncVendorBreakdownItems($targetItems, $so->created_by);

    $so->refresh();
    $so->total_amount = (float) $so->total_selling;
    $so->saveQuietly();

    $controller = app(SalesOrderController::class);

    $invokePrivate($controller, 'syncVendorBreakdownToInvoices', [$so]);
    $invokePrivate($controller, 'syncOperationalAndReimbursementToInvoices', [$so]);

    $so->refresh();
    AccountPayable::generateFromSalesOrder($so);

    $so->load('invoices');
    foreach ($so->invoices as $invoice) {
        $invoice->calculateTotals();
        AccountReceivable::syncFromInvoice($invoice->fresh());
    }
});

$afterState = $collectState(
    SalesOrder::query()
        ->with(['vendorBreakdownItems', 'invoices.items', 'reimbursementItems'])
        ->findOrFail($salesOrder->id)
);

echo "DONE - CLEANUP SO 2602035005 BERHASIL DIEKSEKUSI\n";
var_export([
    'before' => [
        'sales_order' => $beforeState['sales_order'],
        'receivables' => $beforeState['receivables'],
        'payables' => $beforeState['payables'],
    ],
    'target' => $targetPreview,
    'after' => $afterState,
]);
echo PHP_EOL;
