<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\InvoiceItem;
use App\Models\SalesOrder;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/repair-so-2602044014-invoice-other-cost-items.php          # dry-run
 *   php scripts/repair-so-2602044014-invoice-other-cost-items.php --apply  # eksekusi
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2602044014';

$so = SalesOrder::query()
    ->with(['invoices.items'])
    ->where('order_number', $targetSoNumber)
    ->first();

if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$otherCosts = is_array($so->other_costs) ? $so->other_costs : [];
$invoiceTargets = $so->invoices->filter(fn ($invoice) => $invoice->invoice_type !== 'reimbursement')->values();

if ($invoiceTargets->isEmpty()) {
    throw new RuntimeException("SO {$targetSoNumber} tidak memiliki invoice target untuk sinkronisasi other cost.");
}

$plans = [];

foreach ($invoiceTargets as $invoice) {
    $expectedRefs = [];
    $upserts = [];

    foreach ($otherCosts as $index => $otherCost) {
        $rate = (float) ($otherCost['amount'] ?? 0);
        if ($rate <= 0) {
            continue;
        }

        $quantity = is_numeric($otherCost['quantity'] ?? null) && (float) $otherCost['quantity'] > 0
            ? (float) $otherCost['quantity']
            : 1.0;
        $unit = is_string($otherCost['unit'] ?? null) && trim((string) $otherCost['unit']) !== ''
            ? trim((string) $otherCost['unit'])
            : 'pcs';
        $amount = $rate * $quantity;
        $itemRef = 'other_cost_' . $index;
        $description = 'Other Cost - ' . ($otherCost['description'] ?? 'Additional Cost');
        $vendorId = is_numeric($otherCost['vendor_id'] ?? null) ? (int) $otherCost['vendor_id'] : null;

        $expectedRefs[] = $itemRef;

        $payload = [
            'invoice_id' => $invoice->id,
            'description' => $description,
            'quantity' => $quantity,
            'unit' => $unit,
            'rate' => $rate,
            'currency' => 'IDR',
            'amount' => $amount,
            'item_ref' => $itemRef,
            'item_type' => 'operational_cost',
            'include_in_customer_invoice' => false,
            'is_hidden_from_customer' => true,
        ];

        if ($vendorId) {
            $payload['vendor_id'] = $vendorId;
        }

        $upserts[] = $payload;
    }

    $deleteQuery = $invoice->items()
        ->where('item_type', 'operational_cost')
        ->where('item_ref', 'like', 'other_cost_%');

    if (!empty($expectedRefs)) {
        $deleteQuery->whereNotIn('item_ref', $expectedRefs);
    }

    $staleItems = $deleteQuery->get(['id', 'description', 'amount', 'item_ref']);

    $plans[] = [
        'invoice_id' => $invoice->id,
        'invoice_number' => $invoice->invoice_number,
        'invoice_type' => $invoice->invoice_type,
        'expected_refs' => $expectedRefs,
        'upserts' => $upserts,
        'stale_items' => $staleItems->toArray(),
    ];
}

$before = [
    'so' => $so->order_number,
    'other_costs' => $otherCosts,
    'plans' => $plans,
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($before);
    echo PHP_EOL;
    exit(0);
}

DB::transaction(static function () use ($plans): void {
    foreach ($plans as $plan) {
        foreach ($plan['upserts'] as $payload) {
            InvoiceItem::updateOrCreate(
                [
                    'invoice_id' => $plan['invoice_id'],
                    'item_ref' => $payload['item_ref'],
                    'item_type' => 'operational_cost',
                ],
                $payload
            );
        }

        $deleteQuery = InvoiceItem::query()
            ->where('invoice_id', $plan['invoice_id'])
            ->where('item_type', 'operational_cost')
            ->where('item_ref', 'like', 'other_cost_%');

        if (!empty($plan['expected_refs'])) {
            $deleteQuery->whereNotIn('item_ref', $plan['expected_refs']);
        }

        $deleteQuery->delete();
    }
});

foreach ($invoiceTargets as $invoice) {
    $invoice->refresh();
    $invoice->calculateTotals();
    AccountReceivable::syncFromInvoice($invoice->fresh());
}

$after = [];
foreach ($invoiceTargets as $invoice) {
    $rows = $invoice->fresh()->items()
        ->where('item_type', 'operational_cost')
        ->where('item_ref', 'like', 'other_cost_%')
        ->get(['id', 'description', 'amount', 'item_ref']);

    $after[] = [
        'invoice_id' => $invoice->id,
        'invoice_number' => $invoice->invoice_number,
        'other_cost_items_after' => $rows->toArray(),
    ];
}

echo "DONE - INVOICE OTHER COST ITEMS BERHASIL DISINKRONKAN\n";
var_export([
    'so' => $so->order_number,
    'after' => $after,
]);
echo PHP_EOL;
