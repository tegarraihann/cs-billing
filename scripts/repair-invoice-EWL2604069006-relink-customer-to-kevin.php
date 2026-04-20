<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\Customer;
use App\Models\Invoice;
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
 *   php scripts/repair-invoice-EWL2604069006-relink-customer-to-kevin.php
 *   php scripts/repair-invoice-EWL2604069006-relink-customer-to-kevin.php --apply
 *
 * Scope:
 * - Audit invoice EWL2604069006 yang saat ini tertaut ke customer yang salah
 * - Relink Sales Order EWILOG2604069006 ke master customer KEVIN MULJONO
 * - Relink invoice dan Account Receivable terkait ke master customer yang sama
 * - Tidak mengubah nominal, item invoice, status payment, atau transaksi bank
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetInvoiceNumber = 'EWL2604069006';
$targetSalesOrderNumber = 'EWILOG2604069006';
$targetCustomerCompanyName = 'KEVIN MULJONO';

$invoice = Invoice::query()
    ->with(['customer', 'salesOrder.customer', 'accountReceivable'])
    ->where('invoice_number', $targetInvoiceNumber)
    ->first();

if (!$invoice) {
    throw new RuntimeException("Invoice {$targetInvoiceNumber} tidak ditemukan.");
}

$salesOrder = SalesOrder::query()
    ->with('customer')
    ->where('order_number', $targetSalesOrderNumber)
    ->first();

if (!$salesOrder) {
    throw new RuntimeException("Sales Order {$targetSalesOrderNumber} tidak ditemukan.");
}

if ((int) $invoice->sales_order_id !== (int) $salesOrder->id) {
    throw new RuntimeException("Invoice {$targetInvoiceNumber} tidak tertaut ke SO {$targetSalesOrderNumber}.");
}

$targetCustomer = Customer::query()
    ->where('company_name', $targetCustomerCompanyName)
    ->orderBy('id')
    ->first();

if (!$targetCustomer) {
    throw new RuntimeException("Master customer {$targetCustomerCompanyName} tidak ditemukan.");
}

$invoiceReceivables = AccountReceivable::query()
    ->where('sales_order_id', $salesOrder->id)
    ->where(function ($query) use ($invoice) {
        $query->where('invoice_id', $invoice->id)
            ->orWhere('invoice_number', $invoice->invoice_number);
    })
    ->orderBy('id')
    ->get();

$currentInvoiceCustomer = $invoice->customer;
$currentSalesOrderCustomer = $salesOrder->customer()->first();

$plannedSalesOrder = [
    'customer_id' => $targetCustomer->id,
    'customer' => $targetCustomer->company_name ?: $targetCustomer->name,
    'customer_name' => $targetCustomer->company_name ?: $targetCustomer->name,
    'customer_code' => $targetCustomer->customer_code,
    'customer_address' => $targetCustomer->company_address ?: 'N/A',
    'shipping_address' => $targetCustomer->invoice_address ?: ($targetCustomer->company_address ?: 'N/A'),
    'customer_email' => $targetCustomer->email ?: $targetCustomer->pic_email,
    'customer_phone' => $targetCustomer->phone ?: $targetCustomer->pic_phone,
];

$report = [
    'dry_run' => $dryRun,
    'scope' => [
        'invoice_number' => $targetInvoiceNumber,
        'sales_order_number' => $targetSalesOrderNumber,
        'target_customer' => $targetCustomerCompanyName,
    ],
    'before' => [
        'invoice' => [
            'id' => $invoice->id,
            'customer_id' => $invoice->customer_id,
            'customer_company_name' => $currentInvoiceCustomer?->company_name,
            'customer_name' => $currentInvoiceCustomer?->name,
            'customer_pic_name' => $currentInvoiceCustomer?->pic_name,
            'company_address' => $currentInvoiceCustomer?->company_address,
            'invoice_address' => $currentInvoiceCustomer?->invoice_address,
            'consignee' => $invoice->consignee,
            'created_at' => optional($invoice->created_at)->toDateTimeString(),
        ],
        'sales_order' => [
            'id' => $salesOrder->id,
            'customer_id' => $salesOrder->customer_id,
            'customer' => $salesOrder->customer,
            'customer_name' => $salesOrder->customer_name,
            'customer_address' => $salesOrder->customer_address,
            'shipping_address' => $salesOrder->shipping_address,
            'linked_customer_company_name' => $currentSalesOrderCustomer?->company_name,
            'created_at' => optional($salesOrder->created_at)->toDateTimeString(),
        ],
        'account_receivables' => $invoiceReceivables->map(static fn (AccountReceivable $receivable) => [
            'id' => $receivable->id,
            'invoice_id' => $receivable->invoice_id,
            'customer_id' => $receivable->customer_id,
            'customer_name' => $receivable->customer_name,
            'status' => $receivable->status,
            'paid_amount' => (float) ($receivable->paid_amount ?? 0),
            'outstanding_amount' => (float) ($receivable->outstanding_amount ?? 0),
        ])->values()->all(),
    ],
    'target_customer_snapshot' => [
        'id' => $targetCustomer->id,
        'customer_code' => $targetCustomer->customer_code,
        'company_name' => $targetCustomer->company_name,
        'name' => $targetCustomer->name,
        'pic_name' => $targetCustomer->pic_name,
        'company_address' => $targetCustomer->company_address,
        'invoice_address' => $targetCustomer->invoice_address,
        'email' => $targetCustomer->email,
        'pic_email' => $targetCustomer->pic_email,
        'created_at' => optional($targetCustomer->created_at)->toDateTimeString(),
    ],
    'comparison' => [
        'invoice_matches_target_customer' => (int) $invoice->customer_id === (int) $targetCustomer->id,
        'sales_order_matches_target_customer' => (int) ($salesOrder->customer_id ?? 0) === (int) $targetCustomer->id,
        'account_receivable_matches_target_customer' => $invoiceReceivables->every(
            static fn (AccountReceivable $receivable): bool => (int) $receivable->customer_id === (int) $targetCustomer->id
        ),
    ],
    'plan' => [
        'sales_order_after' => $plannedSalesOrder,
        'invoice_after' => [
            'customer_id' => $targetCustomer->id,
        ],
        'account_receivables_after' => $invoiceReceivables->map(static fn (AccountReceivable $receivable) => [
            'id' => $receivable->id,
            'customer_id' => $targetCustomer->id,
            'customer_name' => $targetCustomer->company_name ?: $targetCustomer->name,
        ])->values()->all(),
        'safe_note' => 'Tidak mengubah nominal invoice, item invoice, AR amount, atau transaksi bank.',
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    echo json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
    exit(0);
}

DB::transaction(function () use ($invoice, $salesOrder, $invoiceReceivables, $plannedSalesOrder, $targetCustomer): void {
    $lockedSalesOrder = SalesOrder::query()->lockForUpdate()->find($salesOrder->id);
    $lockedInvoice = Invoice::query()->lockForUpdate()->find($invoice->id);

    if (!$lockedSalesOrder || !$lockedInvoice) {
        throw new RuntimeException('Invoice atau Sales Order target hilang saat apply.');
    }

    $lockedSalesOrder->update($plannedSalesOrder);
    $lockedInvoice->update([
        'customer_id' => $targetCustomer->id,
    ]);

    foreach ($invoiceReceivables as $receivable) {
        $lockedReceivable = AccountReceivable::query()->lockForUpdate()->find($receivable->id);

        if (!$lockedReceivable) {
            throw new RuntimeException("AR #{$receivable->id} hilang saat apply.");
        }

        $lockedReceivable->update([
            'customer_id' => $targetCustomer->id,
            'customer_name' => $targetCustomer->company_name ?: $targetCustomer->name,
        ]);
    }
});

$afterInvoice = Invoice::query()->with('customer')->find($invoice->id);
$afterSalesOrder = SalesOrder::query()->find($salesOrder->id);
$afterSalesOrderCustomer = $afterSalesOrder?->customer()->first();
$afterReceivables = AccountReceivable::query()
    ->where('sales_order_id', $salesOrder->id)
    ->where(function ($query) use ($invoice) {
        $query->where('invoice_id', $invoice->id)
            ->orWhere('invoice_number', $invoice->invoice_number);
    })
    ->orderBy('id')
    ->get();

echo "DONE - INVOICE CUSTOMER BERHASIL DIRELINK KE KEVIN\n";
echo json_encode([
    'after' => [
        'invoice' => [
            'id' => $afterInvoice?->id,
            'invoice_number' => $afterInvoice?->invoice_number,
            'customer_id' => $afterInvoice?->customer_id,
            'customer_company_name' => $afterInvoice?->customer?->company_name,
            'customer_company_address' => $afterInvoice?->customer?->company_address,
            'customer_invoice_address' => $afterInvoice?->customer?->invoice_address,
        ],
        'sales_order' => [
            'id' => $afterSalesOrder?->id,
            'order_number' => $afterSalesOrder?->order_number,
            'customer_id' => $afterSalesOrder?->customer_id,
            'customer' => $afterSalesOrder?->customer,
            'customer_name' => $afterSalesOrder?->customer_name,
            'customer_address' => $afterSalesOrder?->customer_address,
            'shipping_address' => $afterSalesOrder?->shipping_address,
            'linked_customer_company_name' => $afterSalesOrderCustomer?->company_name,
        ],
        'account_receivables' => $afterReceivables->map(static fn (AccountReceivable $receivable) => [
            'id' => $receivable->id,
            'customer_id' => $receivable->customer_id,
            'customer_name' => $receivable->customer_name,
            'status' => $receivable->status,
            'paid_amount' => (float) ($receivable->paid_amount ?? 0),
            'outstanding_amount' => (float) ($receivable->outstanding_amount ?? 0),
        ])->values()->all(),
    ],
], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE) . PHP_EOL;
