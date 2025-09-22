<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\User;

class SalesOrderSeeder extends Seeder
{
    public function run(): void
    {
        $customers = Customer::all();
        $csUser = User::where('role', 'admin_cs')->first();

        if ($customers->isEmpty() || !$csUser) {
            $this->command->info('Please run CustomerSeeder and UserSeeder first.');
            return;
        }

        $salesOrders = [
            [
                // Basic SO Information (dari create table)
                'so_number' => 'SO-2025-001',
                'so_date' => now()->subDays(10)->toDateString(),

                // Customer Information (dari create table)
                'customer_id' => $customers->first()->id,
                'customer_name' => $customers->first()->name,
                'customer_code' => 'CUST-001',
                'customer_address' => $customers->first()->address ?? 'Jakarta',
                'customer_phone' => $customers->first()->phone,
                'customer_email' => $customers->first()->email,

                // Shipping Information (dari create table)
                'consignee_shipper' => 'John Doe Logistics',
                'shipping_address' => 'Jl. Pengiriman No. 123, Jakarta',
                'awb_bl_number' => 'AWB-001-2025',
                'vessel_flight' => 'MV Ocean Star',
                'etd' => now()->addDays(2)->toDateString(),
                'eta' => now()->addDays(7)->toDateString(),
                'pol_pod' => 'Jakarta - Surabaya',
                'no_kont_pallet' => 'CONT-40FT-001',

                // Service Details (dari create table)
                'service_description' => 'Full Container Load (FCL) service untuk pengiriman general cargo',
                'commodity' => 'General Cargo',
                'package_type' => 'Container',
                'qty' => 1,
                'weight_volume' => '20 CBM / 15 TON',

                // Pricing (dari create table)
                'rate' => 2500000.00,
                'rate_unit' => 'per container',
                'total_amount' => 2500000.00,
                'currency' => 'IDR',
                'additional_charges' => null,

                // Terms (dari create table)
                'payment_terms' => '30 days after delivery',
                'special_instructions' => null,
                'terms_conditions' => null,

                // Status (dari create table + updates)
                'status' => 'confirmed',
                'sent_at' => null,
                'confirmed_at' => now()->subDays(8),
                'created_by' => $csUser->id,
                'last_modified_at' => null,

                // Release tracking (dari migration 2025_08_16_033207)
                'released_at' => now()->subDays(5),
                'released_by' => $csUser->id,

                // Admin Keuangan (dari migration 2025_08_16_123909)
                'approved_at' => now()->subDays(3),
                'approved_by' => $csUser->id,
                'rejected_at' => null,
                'rejected_by' => null,
                'rejection_reason' => null,

                // Additional fields (dari migration 2025_08_15_161052) - HANYA yang belum dihapus
                'order_number' => 'ORD-2025-001',
                'shipper' => 'PT Shipper Indonesia',
                'bl_awb' => 'BL-001-2025',
                'liner' => 'Ocean Line',
                'vessel' => 'MV Ocean Star',
                'aju' => 'AJU-001-2025',
                'sppb_date' => now()->addDays(5)->toDateString(),
                'shipment_type' => 'FCL',
                'gudang_utc' => 'TPK Tanjung Priok',
                'party_lcl' => null,
                'prepared_by' => 'Admin CS',
                'exchange_rate' => 15850.00,
                'jenis_biaya' => 'Ocean Freight',
                'remarks' => 'Pengiriman sesuai jadwal',
                'container_no' => 'TEMU1234567',
                'invoice_number' => 'INV-2025-001',
                'invoice_date' => now()->subDays(5)->toDateString(),
                'top' => '30 days',

                // Missing fields from 2025_08_21_184816
                'net_weight' => 15.00,

                // Fields from 2025_08_15_162658
                'customer' => 'John Doe',

                // Vendors column (dari migration 2025_08_25_191712)
                'vendors' => json_encode([
                    ['name' => 'PT Logistik Prima', 'cost' => 2000000],
                    ['name' => 'CV Express', 'cost' => 300000]
                ]),

                // Total breakdown (dari migration 2025_08_25_195810)
                'total_buying' => 2300000.00,
                'total_selling' => 2500000.00,
                'total_revenue' => 200000.00,
            ],
            [
                // Basic SO 2
                'so_number' => 'SO-2025-002',
                'so_date' => now()->subDays(8)->toDateString(),

                'customer_id' => $customers->skip(1)->first()->id,
                'customer_name' => $customers->skip(1)->first()->name,
                'customer_code' => 'CUST-002',
                'customer_address' => $customers->skip(1)->first()->address ?? 'Surabaya',
                'customer_phone' => $customers->skip(1)->first()->phone,
                'customer_email' => $customers->skip(1)->first()->email,

                'consignee_shipper' => 'Sarah Wilson Trading',
                'shipping_address' => 'Jl. Perdagangan No. 456, Surabaya',
                'awb_bl_number' => 'AWB-002-2025',
                'vessel_flight' => 'GA-123',
                'etd' => now()->addDays(1)->toDateString(),
                'eta' => now()->addDays(2)->toDateString(),
                'pol_pod' => 'Surabaya - Jakarta',
                'no_kont_pallet' => null,

                'service_description' => 'Air freight service untuk dokumen dan sample produk',
                'commodity' => 'Documents & Samples',
                'package_type' => 'Carton',
                'qty' => 5,
                'weight_volume' => '2.5 KG / 0.1 CBM',

                'rate' => 750000.00,
                'rate_unit' => 'per kg',
                'total_amount' => 750000.00,
                'currency' => 'IDR',
                'additional_charges' => null,

                'payment_terms' => '15 days after delivery',
                'special_instructions' => null,
                'terms_conditions' => null,

                'status' => 'sent',
                'sent_at' => now()->subDays(6),
                'confirmed_at' => null,
                'created_by' => $csUser->id,
                'last_modified_at' => null,

                'released_at' => null,
                'released_by' => null,

                'approved_at' => null,
                'approved_by' => null,
                'rejected_at' => null,
                'rejected_by' => null,
                'rejection_reason' => null,

                'order_number' => 'ORD-2025-002',
                'customer' => 'Sarah Wilson',
                'shipper' => 'CV Express Cargo',
                'bl_awb' => 'AWB-002-2025',
                'liner' => 'Garuda Indonesia',
                'vessel' => 'GA-123',
                'aju' => 'AJU-002-2025',
                'sppb_date' => now()->addDays(1)->toDateString(),
                'shipment_type' => 'Air Freight',
                'gudang_utc' => 'Cargo Terminal Soetta',
                'party_lcl' => null,
                'prepared_by' => 'Admin CS',
                'exchange_rate' => 15850.00,
                'jenis_biaya' => 'Air Freight',
                'remarks' => 'Express delivery',
                'container_no' => null,
                'invoice_number' => 'INV-2025-002',
                'invoice_date' => now()->subDays(3)->toDateString(),
                'top' => '15 days',
                'net_weight' => 2.50,

                'vendors' => json_encode([
                    ['name' => 'PT Air Cargo', 'cost' => 600000]
                ]),

                'total_buying' => 600000.00,
                'total_selling' => 750000.00,
                'total_revenue' => 150000.00,
            ],
            [
                // Basic SO 3
                'so_number' => 'SO-2025-003',
                'so_date' => now()->subDays(15)->toDateString(),

                'customer_id' => $customers->skip(2)->first()->id,
                'customer_name' => $customers->skip(2)->first()->name,
                'customer_code' => 'CUST-003',
                'customer_address' => $customers->skip(2)->first()->address ?? 'Yogyakarta',
                'customer_phone' => $customers->skip(2)->first()->phone,
                'customer_email' => $customers->skip(2)->first()->email,

                'consignee_shipper' => 'Michael Johnson Import',
                'shipping_address' => 'Jl. Import No. 789, Yogyakarta',
                'awb_bl_number' => 'BL-003-2025',
                'vessel_flight' => 'MV Cargo Express',
                'etd' => now()->subDays(5)->toDateString(),
                'eta' => now()->addDays(2)->toDateString(),
                'pol_pod' => 'Singapore - Jakarta',
                'no_kont_pallet' => 'CONT-20FT-003',

                'service_description' => 'LCL (Less Container Load) import service',
                'commodity' => 'Electronics',
                'package_type' => 'Boxes',
                'qty' => 50,
                'weight_volume' => '8 CBM / 12 TON',

                'rate' => 1800000.00,
                'rate_unit' => 'per CBM',
                'total_amount' => 1800000.00,
                'currency' => 'IDR',
                'additional_charges' => null,

                'payment_terms' => '45 days after arrival',
                'special_instructions' => null,
                'terms_conditions' => null,

                'status' => 'confirmed',
                'sent_at' => now()->subDays(12),
                'confirmed_at' => now()->subDays(10),
                'created_by' => $csUser->id,
                'last_modified_at' => null,

                'released_at' => now()->subDays(8),
                'released_by' => $csUser->id,

                'approved_at' => now()->subDays(6),
                'approved_by' => $csUser->id,
                'rejected_at' => null,
                'rejected_by' => null,
                'rejection_reason' => null,

                'order_number' => 'ORD-2025-003',
                'customer' => 'Michael Johnson',
                'shipper' => 'Singapore Freight Pte Ltd',
                'bl_awb' => 'BL-003-2025',
                'liner' => 'PIL Pacific',
                'vessel' => 'MV Cargo Express',
                'aju' => 'AJU-003-2025',
                'sppb_date' => now()->addDays(1)->toDateString(),
                'shipment_type' => 'LCL',
                'gudang_utc' => 'Container Terminal Priok',
                'party_lcl' => 'LCL Group A',
                'prepared_by' => 'Admin CS',
                'exchange_rate' => 15850.00,
                'jenis_biaya' => 'Ocean Freight LCL',
                'remarks' => 'Import clearance required',
                'container_no' => 'MSKU7654321',
                'invoice_number' => 'INV-2025-003',
                'invoice_date' => now()->subDays(10)->toDateString(),
                'top' => '45 days',
                'net_weight' => 12.00,

                'vendors' => json_encode([
                    ['name' => 'PT Ocean Freight', 'cost' => 1400000]
                ]),

                'total_buying' => 1400000.00,
                'total_selling' => 1800000.00,
                'total_revenue' => 400000.00,
            ]
        ];

        foreach ($salesOrders as $salesOrder) {
            SalesOrder::create($salesOrder);
        }

        $this->command->info('Sales Order seeder completed successfully!');
    }
}
