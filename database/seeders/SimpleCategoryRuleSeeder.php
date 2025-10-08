<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SimpleCategoryRule;
use App\Models\PettyCashCategory;

class SimpleCategoryRuleSeeder extends Seeder
{
    public function run(): void
    {
        // Get category IDs
        $categories = PettyCashCategory::pluck('id', 'name')->toArray();

        $rules = [
            // TRANSPORTASI (weight 10 = highest priority)
            ['keyword' => 'parkir', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 10],
            ['keyword' => 'tol', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 10],
            ['keyword' => 'bensin', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 10],
            ['keyword' => 'solar', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 9],
            ['keyword' => 'pertamax', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 9],
            ['keyword' => 'grab', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 10],
            ['keyword' => 'gojek', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 10],
            ['keyword' => 'ojek', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 9],
            ['keyword' => 'taxi', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 9],
            ['keyword' => 'motor', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 8],
            ['keyword' => 'mobil', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 8],
            ['keyword' => 'angkot', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 7],
            ['keyword' => 'bus', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 7],
            ['keyword' => 'kereta', 'category_id' => $categories['Transportasi'] ?? 1, 'weight' => 7],

            // KONSUMSI
            ['keyword' => 'makan', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 10],
            ['keyword' => 'minum', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 10],
            ['keyword' => 'konsumsi', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 10],
            ['keyword' => 'warung', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 9],
            ['keyword' => 'resto', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 9],
            ['keyword' => 'restoran', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 9],
            ['keyword' => 'catering', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 9],
            ['keyword' => 'kopi', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 8],
            ['keyword' => 'teh', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 8],
            ['keyword' => 'snack', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 8],
            ['keyword' => 'air mineral', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 8],
            ['keyword' => 'aqua', 'category_id' => $categories['Konsumsi'] ?? 2, 'weight' => 7],

            // ATK & SUPPLIES
            ['keyword' => 'atk', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 10],
            ['keyword' => 'fotocopy', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 10],
            ['keyword' => 'kertas', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 9],
            ['keyword' => 'tinta', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 9],
            ['keyword' => 'pulpen', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 9],
            ['keyword' => 'pensil', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 8],
            ['keyword' => 'staples', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 8],
            ['keyword' => 'print', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 8],
            ['keyword' => 'printer', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 8],
            ['keyword' => 'supplies', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 8],
            ['keyword' => 'alat tulis', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 9],
            ['keyword' => 'materai', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 8],
            ['keyword' => 'perangko', 'category_id' => $categories['ATK & Supplies'] ?? 3, 'weight' => 8],

            // KOMUNIKASI
            ['keyword' => 'kirim', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 10],
            ['keyword' => 'dokumen', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 9],
            ['keyword' => 'ekspedisi', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 10],
            ['keyword' => 'kurir', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 9],
            ['keyword' => 'jne', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 9],
            ['keyword' => 'tiki', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 9],
            ['keyword' => 'sicepat', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 9],
            ['keyword' => 'pos', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 8],
            ['keyword' => 'telepon', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 9],
            ['keyword' => 'pulsa', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 9],
            ['keyword' => 'internet', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 8],
            ['keyword' => 'wifi', 'category_id' => $categories['Komunikasi'] ?? 4, 'weight' => 8],

            // MAINTENANCE
            ['keyword' => 'service', 'category_id' => $categories['Maintenance'] ?? 5, 'weight' => 10],
            ['keyword' => 'maintenance', 'category_id' => $categories['Maintenance'] ?? 5, 'weight' => 10],
            ['keyword' => 'perbaikan', 'category_id' => $categories['Maintenance'] ?? 5, 'weight' => 10],
            ['keyword' => 'servis', 'category_id' => $categories['Maintenance'] ?? 5, 'weight' => 10],
            ['keyword' => 'ac', 'category_id' => $categories['Maintenance'] ?? 5, 'weight' => 8],
            ['keyword' => 'listrik', 'category_id' => $categories['Maintenance'] ?? 5, 'weight' => 8],
            ['keyword' => 'lampu', 'category_id' => $categories['Maintenance'] ?? 5, 'weight' => 7],

            // EMERGENCY
            ['keyword' => 'darurat', 'category_id' => $categories['Emergency'] ?? 6, 'weight' => 10],
            ['keyword' => 'emergency', 'category_id' => $categories['Emergency'] ?? 6, 'weight' => 10],
            ['keyword' => 'mendadak', 'category_id' => $categories['Emergency'] ?? 6, 'weight' => 9],
            ['keyword' => 'lain-lain', 'category_id' => $categories['Emergency'] ?? 6, 'weight' => 8],
            ['keyword' => 'lainnya', 'category_id' => $categories['Emergency'] ?? 6, 'weight' => 8],
        ];

        foreach ($rules as $rule) {
            SimpleCategoryRule::create($rule);
        }

        $this->command->info('Simple Category Rule seeder completed successfully!');
        $this->command->info('Created ' . count($rules) . ' categorization rules.');
    }
}