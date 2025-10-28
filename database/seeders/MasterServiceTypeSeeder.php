<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MasterServiceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $serviceTypes = [
            ['code' => 'OF/AF', 'description' => 'Biaya pengiriman laut atau udara'],
            ['code' => 'HANDLING', 'description' => 'Biaya penanganan barang'],
            ['code' => 'PIB EDI', 'description' => 'Biaya Pemberitahuan Impor Barang Electronic Data Interchange'],
            ['code' => 'ADMIN DOC', 'description' => 'Biaya administrasi dokumen'],
            ['code' => 'TRUCKING', 'description' => 'Biaya pengiriman darat menggunakan truk'],
        ];

        foreach ($serviceTypes as $type) {
            DB::table('master_service_types')->insert([
                'code' => $type['code'],
                'description' => $type['description'],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
