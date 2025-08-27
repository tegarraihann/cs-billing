<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Vendor;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        $vendors = [
            [
                'nama_vendor' => 'PT Logistik Prima',
                'nomor_rekening' => '1234567890',
                'nama_rekening' => 'PT Logistik Prima',
                'nib' => '1234567890123456',
                'photo_path' => null,
                'legal_document_path' => null,
            ],
            [
                'nama_vendor' => 'CV Express Indonesia',
                'nomor_rekening' => '9876543210',
                'nama_rekening' => 'CV Express Indonesia',
                'nib' => '6543210987654321',
                'photo_path' => null,
                'legal_document_path' => null,
            ],
            [
                'nama_vendor' => 'PT Ocean Freight Services',
                'nomor_rekening' => '5555666677',
                'nama_rekening' => 'PT Ocean Freight Services',
                'nib' => '9999888877776666',
                'photo_path' => null,
                'legal_document_path' => null,
            ],
            [
                'nama_vendor' => 'PT Air Cargo International',
                'nomor_rekening' => '1111222233',
                'nama_rekening' => 'PT Air Cargo International',
                'nib' => '4444555566667777',
                'photo_path' => null,
                'legal_document_path' => null,
            ],
            [
                'nama_vendor' => 'CV Trucking Jaya Abadi',
                'nomor_rekening' => '7777888899',
                'nama_rekening' => 'CV Trucking Jaya Abadi',
                'nib' => '2222333344445555',
                'photo_path' => null,
                'legal_document_path' => null,
            ]
        ];

        foreach ($vendors as $vendor) {
            Vendor::create($vendor);
        }

        $this->command->info('Vendor seeder completed successfully!');
    }
}
