<?php

/**
 * FILE 8: database/seeders/PettyCashCategorySeeder.php
 * Petty Cash Categories
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PettyCashCategory;

class PettyCashCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Transportasi',
                'description' => 'Biaya transportasi karyawan dan operasional',
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Konsumsi',
                'description' => 'Biaya makan, minum, dan konsumsi rapat',
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'ATK & Supplies',
                'description' => 'Alat tulis kantor dan perlengkapan operasional',
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Komunikasi',
                'description' => 'Biaya telepon, internet, dan komunikasi',
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'name' => 'Maintenance',
                'description' => 'Biaya pemeliharaan dan perbaikan kecil',
                'is_active' => true,
                'sort_order' => 5
            ],
            [
                'name' => 'Emergency',
                'description' => 'Biaya darurat dan tidak terduga',
                'is_active' => true,
                'sort_order' => 6
            ],
            [
                'name' => 'Top Up',
                'description' => 'Pengisian dana petty cash',
                'is_active' => true,
                'sort_order' => 7
            ]
        ];

        foreach ($categories as $category) {
            PettyCashCategory::create($category);
        }

        $this->command->info('Petty Cash Category seeder completed successfully!');
    }
}
