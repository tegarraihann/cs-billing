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
                'status' => 'new',
                'notes' => 'Inquiry tentang layanan pengiriman barang ke Surabaya. Butuh estimasi biaya dan waktu pengiriman.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subDays(1)
            ],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@company.com',
                'phone' => '+62823456789',
                'company' => 'CV Maju Bersama',
                'address' => 'Jl. Merdeka No. 45, Bandung',
                'inquiry_source' => 'email',
                'status' => 'contacted',
                'notes' => 'Klien reguler. Butuh layanan ekspres untuk pengiriman dokumen penting.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subHours(5)
            ],
            [
                'name' => 'Michael Johnson',
                'email' => 'mike.johnson@gmail.com',
                'phone' => '+62834567890',
                'company' => null,
                'address' => 'Jl. Raya No. 67, Yogyakarta',
                'inquiry_source' => 'website',
                'status' => 'quoted',
                'notes' => 'Pengiriman personal, butuh asuransi untuk barang elektronik senilai 10 juta.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subHours(2)
            ],
            [
                'name' => 'Sarah Wilson',
                'email' => 'sarah.wilson@logistics.co.id',
                'phone' => '+62845678901',
                'company' => 'PT Logistics Nusantara',
                'address' => 'Jl. Industri No. 88, Surabaya',
                'inquiry_source' => 'phone',
                'status' => 'converted',
                'notes' => 'Partnership untuk layanan reguler. Sudah deal kontrak bulanan untuk 50 pengiriman.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subMinutes(30)
            ],
            [
                'name' => 'Robert Brown',
                'email' => 'robert.brown@startup.id',
                'phone' => '+62856789012',
                'company' => 'StartupTech Indonesia',
                'address' => 'Jl. Startup No. 99, Jakarta Pusat',
                'inquiry_source' => 'whatsapp',
                'status' => 'closed',
                'notes' => 'Inquiry selesai. Klien memutuskan menggunakan competitor karena harga.',
                'handled_by' => $csUser->id,
                'last_contact_at' => now()->subDays(3)
            ]
        ];

        foreach ($customers as $customer) {
            Customer::create($customer);
        }

        $this->command->info('Customer seeder completed successfully!');
    }
}
