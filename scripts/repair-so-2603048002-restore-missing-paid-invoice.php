<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\Customer;
use App\Models\Invoice;
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
 *   php scripts/repair-so-2603048002-restore-missing-paid-invoice.php
 *   php scripts/repair-so-2603048002-restore-missing-paid-invoice.php --apply
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2603048002';
$targetInvoiceNumber = 'EWL2603048002';
$targetInvoiceDate = '2026-03-18';

$so = SalesOrder::query()
    ->with(['vendorBreakdownItems'])
    ->where('order_number', $targetSoNumber)
    ->first();

if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$existingInvoice = Invoice::query()
    ->where('sales_order_id', $so->id)
    ->orWhere('invoice_number', $targetInvoiceNumber)
    ->first();

if ($existingInvoice) {
    throw new RuntimeException("Invoice existing ditemukan (#{$existingInvoice->id} {$existingInvoice->invoice_number}). Script ini hanya untuk kasus invoice belum ada.");
}

$ar = AccountReceivable::query()
    ->with('components')
    ->where('sales_order_id', $so->id)
    ->whereNull('invoice_id')
    ->where('is_opening', false)
    ->first();

if (!$ar) {
    throw new RuntimeException('AR pre-invoice target tidak ditemukan.');
}

$mainComponent = $ar->components->firstWhere('component_type', 'main');
if (!$mainComponent) {
    throw new RuntimeException('Komponen main AR pre-invoice tidak ditemukan.');
}

$vendorBreakdown = is_array($so->vendor_breakdown) ? $so->vendor_breakdown : [];
if (empty($vendorBreakdown)) {
    throw new RuntimeException('vendor_breakdown SO kosong. Tidak ada sumber item invoice.');
}

$customer = null;
if ($so->customer_id) {
    $customer = Customer::query()->find($so->customer_id);
}

if (!$customer) {
    $customerName = trim((string) ($so->customer ?: $so->customer_name ?: 'Unknown Customer'));

    $customer = Customer::query()
        ->where('company_name', $customerName)
        ->first();

    if (!$customer) {
        $customer = new Customer([
            'name' => $customerName,
            'email' => 'unknown@example.com',
            'phone' => 'N/A',
            'company_name' => $customerName,
            'company_address' => $so->customer_address ?: 'N/A',
            'pic_phone' => 'N/A',
            'pic_email' => 'unknown@example.com',
            'handled_by' => $so->created_by,
        ]);
    }
}

$invoiceDate = $targetInvoiceDate;

$containerNo = is_array($so->container_no)
    ? implode(', ', array_filter($so->container_no, static fn ($value) => trim((string) $value) !== ''))
    : $so->container_no;

$termDays = 0;
if (is_numeric($so->top ?? null)) {
    $termDays = max(0, (int) $so->top);
} elseif (is_numeric($so->payment_terms ?? null)) {
    $termDays = max(0, (int) $so->payment_terms);
}

$dueDate = \Carbon\Carbon::parse($invoiceDate)->copy()->addDays($termDays)->toDateString();

$invoicePayload = [
    'invoice_number' => $targetInvoiceNumber,
    'invoice_type' => 'main',
    'sales_order_id' => $so->id,
    'customer_name' => $customer->company_name ?? ($so->customer ?: $so->customer_name),
    'invoice_date' => $invoiceDate,
    'term_days' => $termDays,
    'due_date' => $dueDate,
    'status' => 'paid',
    'shipper' => $so->shipper,
    'consignee' => $so->customer ?: $so->customer_name,
    'awb_bl_no' => $so->bl_awb,
    'gross_weight' => $so->gross_weight,
    'net_weight' => $so->net_weight,
    'volume' => $so->measurement,
    'no_of_packages' => $so->qty,
    'package_unit' => $so->package_unit,
    'vessel' => $so->vessel,
    'origin' => $so->pol,
    'destination' => $so->pod,
    'etd' => $so->etd,
    'eta' => $so->eta,
    'container_no' => $containerNo,
    'container_size' => $so->shipment_type,
    'remarks' => 'Recovered missing invoice from paid pre-invoice AR',
];

$plannedItems = [];
foreach ($vendorBreakdown as $index => $vendor) {
    $description = trim((string) ($vendor['description'] ?? 'Service'));
    $vendorId = isset($vendor['vendor_id']) && is_numeric($vendor['vendor_id'])
        ? (int) $vendor['vendor_id']
        : null;
    $quantity = is_numeric($vendor['quantity'] ?? null) && (float) ($vendor['quantity'] ?? 0) > 0
        ? (float) $vendor['quantity']
        : 1.0;
    $unit = trim((string) ($vendor['unit'] ?? 'SET')) ?: 'SET';
    $sellingRate = (float) ($vendor['selling_amount'] ?? 0);
    $buyingRate = (float) ($vendor['buying_amount'] ?? 0);
    $refKey = $vendorId ?? $index;

    if ($sellingRate > 0) {
        $plannedItems[] = [
            'description' => $description,
            'quantity' => $quantity,
            'unit' => $unit,
            'rate' => $sellingRate,
            'amount' => $sellingRate * $quantity,
            'item_ref' => 'vendor_' . $refKey,
            'item_type' => 'billable',
            'vendor_id' => $vendorId,
            'include_in_customer_invoice' => true,
            'is_hidden_from_customer' => false,
        ];
    }

    if ($buyingRate > 0) {
        $plannedItems[] = [
            'description' => $description . ' - Buying Cost (COGS)',
            'quantity' => $quantity,
            'unit' => $unit,
            'rate' => $buyingRate,
            'amount' => $buyingRate * $quantity,
            'item_ref' => 'cogs_vendor_' . $refKey,
            'item_type' => 'operational_cost',
            'vendor_id' => $vendorId,
            'include_in_customer_invoice' => false,
            'is_hidden_from_customer' => true,
        ];
    }
}

if (empty($plannedItems)) {
    throw new RuntimeException('Tidak ada item invoice yang bisa dipulihkan dari SO.');
}

$plannedSubtotal = array_reduce($plannedItems, static function (float $carry, array $item): float {
    return $carry + ($item['include_in_customer_invoice'] ? (float) $item['amount'] : 0.0);
}, 0.0);

$plannedOperationalCosts = array_reduce($plannedItems, static function (float $carry, array $item): float {
    return $carry + ($item['item_type'] === 'operational_cost' ? (float) $item['amount'] : 0.0);
}, 0.0);

$marchPeriod = DB::table('profit_loss_periods')
    ->whereDate('start_date', '<=', $invoiceDate)
    ->whereDate('end_date', '>=', $invoiceDate)
    ->value('period_name');

$before = [
    'sales_order' => [
        'id' => $so->id,
        'order_number' => $so->order_number,
        'invoice_number' => $so->invoice_number,
        'total_selling' => (float) ($so->total_selling ?? 0),
        'total_buying' => (float) ($so->total_buying ?? 0),
    ],
    'account_receivable' => [
        'id' => $ar->id,
        'invoice_id' => $ar->invoice_id,
        'invoice_number' => $ar->invoice_number,
        'invoice_amount' => (float) $ar->invoice_amount,
        'paid_amount' => (float) $ar->paid_amount,
        'outstanding_amount' => (float) $ar->outstanding_amount,
        'status' => $ar->status,
        'last_payment_date' => (string) $ar->last_payment_date,
        'notes' => $ar->notes,
    ],
    'main_component' => [
        'id' => $mainComponent->id,
        'amount' => (float) $mainComponent->amount,
        'paid_amount' => (float) $mainComponent->paid_amount,
        'outstanding_amount' => (float) $mainComponent->outstanding_amount,
        'status' => $mainComponent->status,
    ],
];

$plan = [
    'create_invoice' => $invoicePayload + [
        'planned_subtotal' => $plannedSubtotal,
        'planned_operational_costs' => $plannedOperationalCosts,
        'planned_total' => $plannedSubtotal,
        'target_profit_loss_period' => $marchPeriod,
    ],
    'planned_items' => $plannedItems,
    'relink_account_receivable' => [
        'account_receivable_id' => $ar->id,
        'preserve_paid_amount' => (float) $ar->paid_amount,
        'preserve_status' => $ar->status,
        'preserve_bank_transactions' => true,
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export([
        'before' => $before,
        'plan' => $plan,
    ]);
    echo PHP_EOL;
    exit(0);
}

$createdInvoiceId = null;
$periodId = DB::table('profit_loss_periods')
    ->whereDate('start_date', '<=', $invoiceDate)
    ->whereDate('end_date', '>=', $invoiceDate)
    ->value('id');
$postingUserId = (int) ($ar->created_by ?: $so->created_by ?: 1);

DB::transaction(function () use ($customer, $so, $invoicePayload, $plannedItems, $ar, &$createdInvoiceId): void {
    if (!$customer->exists) {
        $customer->save();
    }

    $lockedSo = SalesOrder::query()->lockForUpdate()->find($so->id);
    if (!$lockedSo) {
        throw new RuntimeException('SO target hilang saat apply.');
    }

    $lockedAr = AccountReceivable::query()
        ->with('components')
        ->lockForUpdate()
        ->find($ar->id);

    if (!$lockedAr) {
        throw new RuntimeException('AR target hilang saat apply.');
    }

    if ($lockedAr->invoice_id) {
        throw new RuntimeException('AR target sudah tertaut ke invoice lain.');
    }

    if (Invoice::query()->where('sales_order_id', $lockedSo->id)->orWhere('invoice_number', $invoicePayload['invoice_number'])->exists()) {
        throw new RuntimeException('Invoice target sudah terbentuk saat apply. Batalkan untuk hindari duplikasi.');
    }

    $paidDate = $lockedAr->last_payment_date
        ? \Carbon\Carbon::parse($lockedAr->last_payment_date)
        : now();

    $invoice = Invoice::query()->create([
        'invoice_number' => $invoicePayload['invoice_number'],
        'invoice_type' => $invoicePayload['invoice_type'],
        'sales_order_id' => $lockedSo->id,
        'customer_id' => $customer->id,
        'invoice_date' => $invoicePayload['invoice_date'],
        'term_days' => $invoicePayload['term_days'],
        'due_date' => $invoicePayload['due_date'],
        'shipper' => $invoicePayload['shipper'],
        'consignee' => $invoicePayload['consignee'],
        'awb_bl_no' => $invoicePayload['awb_bl_no'],
        'gross_weight' => $invoicePayload['gross_weight'],
        'net_weight' => $invoicePayload['net_weight'],
        'volume' => $invoicePayload['volume'],
        'no_of_packages' => $invoicePayload['no_of_packages'],
        'package_unit' => $invoicePayload['package_unit'],
        'vessel' => $invoicePayload['vessel'],
        'origin' => $invoicePayload['origin'],
        'destination' => $invoicePayload['destination'],
        'etd' => $invoicePayload['etd'],
        'eta' => $invoicePayload['eta'],
        'container_no' => $invoicePayload['container_no'],
        'container_size' => $invoicePayload['container_size'],
        'remarks' => $invoicePayload['remarks'],
        'status' => 'paid',
        'paid_date' => $paidDate->toDateString(),
        'paid_amount' => 0,
        'payment_notes' => 'Recovered from existing paid pre-invoice AR #' . $lockedAr->id,
        'payment_confirmed_at' => $paidDate,
        'confirmed_by' => $lockedAr->created_by,
    ]);

    foreach ($plannedItems as $item) {
        InvoiceItem::query()->create([
            'invoice_id' => $invoice->id,
            'description' => $item['description'],
            'quantity' => $item['quantity'],
            'unit' => $item['unit'],
            'rate' => $item['rate'],
            'currency' => 'IDR',
            'amount' => $item['amount'],
            'item_ref' => $item['item_ref'],
            'item_type' => $item['item_type'],
            'vendor_id' => $item['vendor_id'],
            'include_in_customer_invoice' => $item['include_in_customer_invoice'],
            'is_hidden_from_customer' => $item['is_hidden_from_customer'],
        ]);
    }

    $invoice->calculateTotals();

    AccountReceivable::syncFromInvoice($invoice->fresh());

    $lockedAr->refresh();
    $invoice->refresh();

    $invoice->update([
        'status' => 'paid',
        'paid_amount' => $invoice->total,
        'paid_date' => $paidDate->toDateString(),
        'payment_notes' => 'Recovered from existing paid pre-invoice AR #' . $lockedAr->id,
        'payment_confirmed_at' => $paidDate,
        'confirmed_by' => $lockedAr->created_by,
    ]);

    $createdInvoiceId = $invoice->id;
});

if ($createdInvoiceId && $periodId) {
    $invoiceForPosting = Invoice::query()->find($createdInvoiceId);

    if ($invoiceForPosting && !$invoiceForPosting->posted_to_profit_loss) {
        $invoiceForPosting->postToProfitLoss((int) $periodId, $postingUserId);
        $invoiceForPosting->refresh();
    }
}

$afterInvoice = Invoice::query()
    ->with('items')
    ->where('sales_order_id', $so->id)
    ->where('invoice_number', $targetInvoiceNumber)
    ->first();

$afterAr = AccountReceivable::query()
    ->with('components')
    ->find($ar->id);

echo "APPLY SELESAI\n";
var_export([
    'invoice' => [
        'id' => $afterInvoice?->id,
        'invoice_number' => $afterInvoice?->invoice_number,
        'invoice_date' => (string) $afterInvoice?->invoice_date,
        'subtotal' => $afterInvoice ? (float) $afterInvoice->subtotal : null,
        'total' => $afterInvoice ? (float) $afterInvoice->total : null,
        'status' => $afterInvoice?->status,
        'posted_to_profit_loss' => $afterInvoice?->posted_to_profit_loss,
        'profit_loss_entries' => $afterInvoice?->profit_loss_entries,
        'items_count' => $afterInvoice?->items?->count(),
    ],
    'account_receivable' => [
        'id' => $afterAr?->id,
        'invoice_id' => $afterAr?->invoice_id,
        'invoice_number' => $afterAr?->invoice_number,
        'invoice_amount' => $afterAr ? (float) $afterAr->invoice_amount : null,
        'paid_amount' => $afterAr ? (float) $afterAr->paid_amount : null,
        'outstanding_amount' => $afterAr ? (float) $afterAr->outstanding_amount : null,
        'status' => $afterAr?->status,
    ],
]);
echo PHP_EOL;
