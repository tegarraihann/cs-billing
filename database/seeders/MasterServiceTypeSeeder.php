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
            ['code' => 'OF/AF', 'name' => 'Ocean Freight / Air Freight', 'description' => 'Biaya pengiriman laut atau udara', 'sort_order' => 1],
            ['code' => 'HANDLING', 'name' => 'Handling', 'description' => 'Biaya penanganan barang', 'sort_order' => 2],
            ['code' => 'PIB EDI', 'name' => 'PIB EDI', 'description' => 'Biaya Pemberitahuan Impor Barang Electronic Data Interchange', 'sort_order' => 3],
            ['code' => 'ADMIN DOC', 'name' => 'Admin Document', 'description' => 'Biaya administrasi dokumen', 'sort_order' => 4],
            ['code' => 'TRUCKING', 'name' => 'Trucking', 'description' => 'Biaya pengiriman darat menggunakan truk', 'sort_order' => 5],
        ];

        foreach ($serviceTypes as $type) {
            DB::table('master_service_types')->insert([
                'code' => $type['code'],
                'name' => $type['name'],
                'description' => $type['description'],
                'is_active' => true,
                'sort_order' => $type['sort_order'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
