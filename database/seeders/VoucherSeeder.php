<?php

/**
 * FILE 7: database/seeders/VoucherSeeder.php
 * Voucher data (Payment & Receipt)
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Voucher;
use App\Models\SalesOrder;

class VoucherSeeder extends Seeder
{
    public function run(): void
    {
        $salesOrders = SalesOrder::all();

        if ($salesOrders->isEmpty()) {
            $this->command->info('Please run SalesOrderSeeder first.');
            return;
        }

        foreach ($salesOrders as $so) {
            // Payment Voucher
            Voucher::create([
                'sales_order_id' => $so->id,
                'type' => 'payment',
                'voucher_no' => 'PV-' . now()->format('Y') . '-' . str_pad($so->id, 3, '0', STR_PAD_LEFT),
                'date' => now()->subDays(rand(1, 20))->toDateString(),
                'description' => 'Payment for ' . $so->service_description,
                'amount' => $so->buying ?? ($so->total_amount * 0.7),
                'total' => $so->buying ?? ($so->total_amount * 0.7),
                'status' => 'approved',
                'prepared_by' => 'Admin Keuangan',
                'authorized_by' => 'Manager Finance',
                'finance_by' => 'Finance Staff',
                'receipt_by' => 'Vendor',
                'approved_at' => now()->subDays(rand(1, 15)),
            ]);

            // Receipt Voucher
            Voucher::create([
                'sales_order_id' => $so->id,
                'type' => 'receipt',
                'voucher_no' => 'RV-' . now()->format('Y') . '-' . str_pad($so->id, 3, '0', STR_PAD_LEFT),
                'date' => now()->subDays(rand(1, 10))->toDateString(),
                'description' => 'Receipt from customer for ' . $so->service_description,
                'amount' => $so->total_amount,
                'total' => $so->total_amount,
                'status' => rand(0, 1) ? 'approved' : 'released',
                'prepared_by' => 'Admin CS',
                'authorized_by' => 'Manager CS',
                'finance_by' => 'Finance Staff',
                'receipt_by' => 'Customer',
                'approved_at' => rand(0, 1) ? now()->subDays(rand(1, 5)) : null,
            ]);
        }

        $this->command->info('Voucher seeder completed successfully!');
    }
}
