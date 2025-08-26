<?php

/**
 * FILE 6: database/seeders/InvoiceItemSeeder.php
 * Invoice Items data
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\InvoiceItem;
use App\Models\Invoice;

class InvoiceItemSeeder extends Seeder
{
    public function run(): void
    {
        $invoices = Invoice::all();

        if ($invoices->isEmpty()) {
            $this->command->info('Please run InvoiceSeeder first.');
            return;
        }

        foreach ($invoices as $invoice) {
            $salesOrder = $invoice->salesOrder;

            // Main service item
            InvoiceItem::create([
                'invoice_id' => $invoice->id,
                'description' => $salesOrder->service_description ?? 'Freight Service',
                'quantity' => $salesOrder->qty ?? 1,
                'unit' => $salesOrder->rate_unit ?? 'service',
                'rate' => $salesOrder->rate ?? $salesOrder->total_amount,
                'currency' => $salesOrder->currency,
                'amount' => $salesOrder->total_amount * 0.8
            ]);

            // Additional charges (if any)
            if (rand(0, 1)) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => 'Documentation Fee',
                    'quantity' => 1,
                    'unit' => 'service',
                    'rate' => 250000.00,
                    'currency' => 'IDR',
                    'amount' => 250000.00
                ]);
            }

            if (rand(0, 1)) {
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => 'Handling Fee',
                    'quantity' => 1,
                    'unit' => 'service',
                    'rate' => 150000.00,
                    'currency' => 'IDR',
                    'amount' => 150000.00
                ]);
            }
        }

        $this->command->info('Invoice Item seeder completed successfully!');
    }
}
