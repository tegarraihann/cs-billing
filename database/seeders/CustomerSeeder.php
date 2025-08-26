<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Customer;
use App\Models\User;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get a CS user to assign as handler
        $csUser = User::where('role', 'admin_cs')->first();

        if (!$csUser) {
            $this->command->info('No CS user found. Please create an admin_cs user first.');
            return;
        }

        $customers = [
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'phone' => '+62812345678',
                'company' => 'PT Contoh Jaya',
                'address' => 'Jl. Contoh No. 123, Jakarta Selatan',
                'inquiry_source' => 'whatsapp',
                'status' => 'converted',
                'notes' => 'Client reguler dengan volume pengiriman tinggi. Spesialisasi elektronik dan furniture.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subDays(1),

                // Company & Contact Info (masih ada setelah migration)
                'company_name' => 'PT Contoh Jaya Elektronik',
                'company_type' => 'PT',
                'company_address' => 'Jl. Contoh Raya No. 123, Jakarta Selatan 12345',
                'invoice_address' => 'Jl. Invoice No. 456, Jakarta Selatan 12346',
                'nib' => '1234567890123456',
                'npwp' => '12.345.678.9-012.000',
                'ktp_number' => '3171234567890123',

                // PIC (Person In Charge)
                'pic_name' => 'John Doe',
                'pic_phone' => '+62812345678',
                'pic_email' => 'john.doe@contohjaya.com',

                // Marketing Contact
                'marketing_name' => 'Jane Marketing',
                'marketing_phone' => '+62823456789',
                'marketing_email' => 'marketing@contohjaya.com',

                // File uploads (nullable)
                'photo_path' => null,
                'legal_document_path' => null,
            ],
            [
                'name' => 'Sarah Wilson',
                'email' => 'sarah.wilson@logistics.co.id',
                'phone' => '+62845678901',
                'company' => 'PT Logistics Nusantara',
                'address' => 'Jl. Industri No. 88, Surabaya',
                'inquiry_source' => 'phone',
                'status' => 'converted',
                'notes' => 'Partnership contract untuk 50+ shipments per month. Very reliable client.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subMinutes(30),

                // Company Info
                'company_name' => 'PT Logistics Nusantara Sejahtera',
                'company_type' => 'PT',
                'company_address' => 'Jl. Industri Raya No. 88, Surabaya 60291',
                'invoice_address' => 'Jl. Billing No. 123, Surabaya 60292',
                'nib' => '9876543210987654',
                'npwp' => '98.765.432.1-098.000',
                'ktp_number' => '3578987654321098',

                // PIC
                'pic_name' => 'Sarah Wilson',
                'pic_phone' => '+62845678901',
                'pic_email' => 'sarah@logisticsnusantara.com',

                // Marketing
                'marketing_name' => 'Budi Sales',
                'marketing_phone' => '+62856789012',
                'marketing_email' => 'sales@logisticsnusantara.com',
            ],
            [
                'name' => 'Michael Johnson',
                'email' => 'mike.johnson@gmail.com',
                'phone' => '+62834567890',
                'company' => null,
                'address' => 'Jl. Raya No. 67, Yogyakarta',
                'inquiry_source' => 'website',
                'status' => 'quoted',
                'notes' => 'Personal shipment, elektronik high value. Butuh asuransi comprehensive.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subHours(2),

                // Personal customer - minimal company info
                'company_name' => null,
                'company_type' => 'Perorangan',
                'company_address' => 'Jl. Raya No. 67, Yogyakarta 55281',
                'invoice_address' => 'Jl. Raya No. 67, Yogyakarta 55281',
                'nib' => null,
                'npwp' => '12.345.678.9-543.000',
                'ktp_number' => '3404123456789012',

                // PIC (same as customer)
                'pic_name' => 'Michael Johnson',
                'pic_phone' => '+62834567890',
                'pic_email' => 'mike.johnson@gmail.com',

                // No dedicated marketing
                'marketing_name' => null,
                'marketing_phone' => null,
                'marketing_email' => null,
            ],
            [
                'name' => 'Linda Sari',
                'email' => 'linda@tradingco.id',
                'phone' => '+62867890123',
                'company' => 'CV Sari Trading',
                'address' => 'Jl. Perdagangan No. 99, Medan',
                'inquiry_source' => 'email',
                'status' => 'contacted',
                'notes' => 'Import specialist, regular customer untuk spare parts dan machinery.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subHours(8),

                // Company Info
                'company_name' => 'CV Sari Trading Indonesia',
                'company_type' => 'CV',
                'company_address' => 'Jl. Perdagangan Raya No. 99, Medan 20111',
                'invoice_address' => 'Jl. Perdagangan Raya No. 99, Medan 20111',
                'nib' => '5432109876543210',
                'npwp' => '54.321.098.7-654.000',
                'ktp_number' => '1271098765432109',

                // PIC
                'pic_name' => 'Linda Sari',
                'pic_phone' => '+62867890123',
                'pic_email' => 'linda@tradingco.id',

                // Marketing
                'marketing_name' => 'Rudi Marketing',
                'marketing_phone' => '+62878901234',
                'marketing_email' => 'marketing@tradingco.id',
            ],
            [
                'name' => 'Ahmad Setiawan',
                'email' => 'ahmad@manufacturing.co.id',
                'phone' => '+62889012345',
                'company' => 'PT Setiawan Manufacturing',
                'address' => 'Jl. Industri No. 123, Bandung',
                'inquiry_source' => 'whatsapp',
                'status' => 'new',
                'notes' => 'Manufacturer baru, potential untuk volume besar. Needs competitive rate.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subHours(12),

                // Company Info
                'company_name' => 'PT Setiawan Manufacturing Indonesia',
                'company_type' => 'PT',
                'company_address' => 'Jl. Industri Raya No. 123, Bandung 40195',
                'invoice_address' => 'Jl. Finance No. 456, Bandung 40196',
                'nib' => '1111222233334444',
                'npwp' => '11.111.222.3-333.000',
                'ktp_number' => '3204111122233344',

                // PIC
                'pic_name' => 'Ahmad Setiawan',
                'pic_phone' => '+62889012345',
                'pic_email' => 'ahmad@manufacturing.co.id',

                // Marketing
                'marketing_name' => 'Siti Export Manager',
                'marketing_phone' => '+62890123456',
                'marketing_email' => 'export@manufacturing.co.id',
            ]
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }

        $this->command->info('Customer seeder completed successfully!');
    }
}
