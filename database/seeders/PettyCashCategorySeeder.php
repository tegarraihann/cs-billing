<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PettyCashCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'PENGIRIMAN DOKUMENT',
                'description' => 'Biaya pengiriman dokumen via JNE, dll',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'KONSUMSI',
                'description' => 'Konsumsi harian (galon, bensin motor, dll)',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'BEBAN KANTOR',
                'description' => 'Beban operasional kantor',
                'is_active' => true,
                'sort_order' => 3,
            ],
            [
                'name' => 'ATK',
                'description' => 'Alat Tulis Kantor (materai, dll)',
                'is_active' => true,
                'sort_order' => 4,
            ],
            [
                'name' => 'TOLL',
                'description' => 'Biaya tol perjalanan',
                'is_active' => true,
                'sort_order' => 5,
            ],
            [
                'name' => 'BENSIN MOBIL',
                'description' => 'BBM kendaraan operasional',
                'is_active' => true,
                'sort_order' => 6,
            ],
            [
                'name' => 'OPS MISC FEE',
                'description' => 'Biaya operasional lain-lain (gaji, dll)',
                'is_active' => true,
                'sort_order' => 7,
            ],
            [
                'name' => 'LAINNYA',
                'description' => 'Kategori lain-lain',
                'is_active' => true,
                'sort_order' => 8,
            ],
        ];

        foreach ($categories as $category) {
            DB::table('petty_cash_categories')->insert([
                'name' => $category['name'],
                'description' => $category['description'],
                'is_active' => $category['is_active'],
                'sort_order' => $category['sort_order'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
