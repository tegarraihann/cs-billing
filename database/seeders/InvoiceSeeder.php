<?php

/**
 * FILE 5: database/seeders/InvoiceSeeder.php
 * Invoice data
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Invoice;
use App\Models\SalesOrder;
use App\Models\Customer;

class InvoiceSeeder extends Seeder
{
    public function run(): void
    {
        $salesOrders = SalesOrder::all();

        if ($salesOrders->isEmpty()) {
            $this->command->info('Please run SalesOrderSeeder first.');
            return;
        }

        foreach ($salesOrders as $so) {
            $invoice = Invoice::create([
                'invoice_number' => 'INV-' . now()->format('Y') . '-' . str_pad($so->id, 3, '0', STR_PAD_LEFT),
                'sales_order_id' => $so->id,
                'customer_id' => $so->customer_id,
                'invoice_date' => now()->subDays(rand(1, 30))->toDateString(),
                'term_days' => 30,
                'due_date' => now()->addDays(30)->toDateString(),
                'shipper' => $so->shipper ?? 'Default Shipper',
                'consignee' => $so->consignee_shipper,
                'awb_bl_no' => $so->awb_bl_number,
                'mawb_obl_no' => 'MAWB-' . $so->id,
                'gross_weight' => $so->net_weight + 2.5,
                'volume' => $so->weight_volume,
                'no_of_packages' => $so->qty,
                'vessel' => $so->vessel_flight,
                'flight_voy' => $so->vessel_flight,
                'pol_pod' => $so->pol_pod,
                'origin' => explode(' - ', $so->pol_pod)[0] ?? 'Jakarta',
                'destination' => explode(' - ', $so->pol_pod)[1] ?? 'Surabaya',
                'etd' => $so->etd,
                'eta' => $so->eta,
                'container_no' => $so->container_no,
                'container_size' => $so->container_no ? '40FT' : null,
                'remarks' => $so->remarks,
                'subtotal' => $so->total_amount,
                'total' => $so->total_amount,
                'status' => rand(0, 1) ? 'sent' : 'paid',
                'paid_date' => rand(0, 1) ? now()->subDays(rand(1, 15))->toDateString() : null,
                'paid_amount' => rand(0, 1) ? $so->total_amount : 0,
                'payment_method' => rand(0, 1) ? 'transfer' : null,
            ]);
        }

        $this->command->info('Invoice seeder completed successfully!');
    }
}
