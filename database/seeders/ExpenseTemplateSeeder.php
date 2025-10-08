<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ExpenseTemplate;
use App\Models\PettyCashCategory;

class ExpenseTemplateSeeder extends Seeder
{
    public function run(): void
    {
        // Get category IDs
        $categories = PettyCashCategory::pluck('id', 'name')->toArray();

        $templates = [
            // TRANSPORTASI
            [
                'name' => 'Parkir Mall/Gedung',
                'description' => 'Biaya parkir di mall atau gedung perkantoran',
                'category_id' => $categories['Transportasi'] ?? 1,
                'typical_amount_min' => 5000,
                'typical_amount_max' => 25000,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Tol Jalan',
                'description' => 'Biaya tol perjalanan dinas',
                'category_id' => $categories['Transportasi'] ?? 1,
                'typical_amount_min' => 10000,
                'typical_amount_max' => 50000,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Bensin Motor',
                'description' => 'Isi bensin motor dinas',
                'category_id' => $categories['Transportasi'] ?? 1,
                'typical_amount_min' => 20000,
                'typical_amount_max' => 60000,
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Grab/Gojek',
                'description' => 'Transportasi online untuk keperluan dinas',
                'category_id' => $categories['Transportasi'] ?? 1,
                'typical_amount_min' => 15000,
                'typical_amount_max' => 100000,
                'is_active' => true,
                'sort_order' => 4
            ],
            [
                'name' => 'Ojek Pangkalan',
                'description' => 'Ojek tradisional untuk jarak dekat',
                'category_id' => $categories['Transportasi'] ?? 1,
                'typical_amount_min' => 5000,
                'typical_amount_max' => 20000,
                'is_active' => true,
                'sort_order' => 5
            ],

            // KONSUMSI
            [
                'name' => 'Makan Siang Tim',
                'description' => 'Makan siang bersama tim atau client',
                'category_id' => $categories['Konsumsi'] ?? 2,
                'typical_amount_min' => 50000,
                'typical_amount_max' => 200000,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Kopi/Teh Rapat',
                'description' => 'Minuman untuk meeting atau rapat',
                'category_id' => $categories['Konsumsi'] ?? 2,
                'typical_amount_min' => 10000,
                'typical_amount_max' => 50000,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Air Mineral Kantor',
                'description' => 'Pembelian air mineral untuk kantor',
                'category_id' => $categories['Konsumsi'] ?? 2,
                'typical_amount_min' => 15000,
                'typical_amount_max' => 40000,
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Snack Meeting',
                'description' => 'Camilan untuk meeting atau acara kantor',
                'category_id' => $categories['Konsumsi'] ?? 2,
                'typical_amount_min' => 25000,
                'typical_amount_max' => 75000,
                'is_active' => true,
                'sort_order' => 4
            ],

            // ATK & SUPPLIES
            [
                'name' => 'Fotocopy Dokumen',
                'description' => 'Fotocopy dokumen dan berkas',
                'category_id' => $categories['ATK & Supplies'] ?? 3,
                'typical_amount_min' => 5000,
                'typical_amount_max' => 30000,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Pulpen/Kertas ATK',
                'description' => 'Alat tulis kantor (pulpen, kertas, dll)',
                'category_id' => $categories['ATK & Supplies'] ?? 3,
                'typical_amount_min' => 10000,
                'typical_amount_max' => 50000,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Tinta Printer',
                'description' => 'Refill tinta printer atau cartridge',
                'category_id' => $categories['ATK & Supplies'] ?? 3,
                'typical_amount_min' => 100000,
                'typical_amount_max' => 300000,
                'is_active' => true,
                'sort_order' => 3
            ],
            [
                'name' => 'Materai & Perangko',
                'description' => 'Materai dan perangko untuk surat',
                'category_id' => $categories['ATK & Supplies'] ?? 3,
                'typical_amount_min' => 10000,
                'typical_amount_max' => 50000,
                'is_active' => true,
                'sort_order' => 4
            ],

            // KOMUNIKASI
            [
                'name' => 'Kirim Dokumen JNE/TIKI',
                'description' => 'Pengiriman dokumen via ekspedisi',
                'category_id' => $categories['Komunikasi'] ?? 4,
                'typical_amount_min' => 15000,
                'typical_amount_max' => 50000,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Pulsa Telepon Kantor',
                'description' => 'Isi pulsa untuk telepon kantor',
                'category_id' => $categories['Komunikasi'] ?? 4,
                'typical_amount_min' => 25000,
                'typical_amount_max' => 100000,
                'is_active' => true,
                'sort_order' => 2
            ],
            [
                'name' => 'Kurir Ekspedisi',
                'description' => 'Jasa kurir untuk pengiriman cepat',
                'category_id' => $categories['Komunikasi'] ?? 4,
                'typical_amount_min' => 20000,
                'typical_amount_max' => 75000,
                'is_active' => true,
                'sort_order' => 3
            ],

            // MAINTENANCE
            [
                'name' => 'Service AC Kantor',
                'description' => 'Maintenance dan service AC',
                'category_id' => $categories['Maintenance'] ?? 5,
                'typical_amount_min' => 100000,
                'typical_amount_max' => 300000,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Perbaikan Kecil',
                'description' => 'Perbaikan minor equipment kantor',
                'category_id' => $categories['Maintenance'] ?? 5,
                'typical_amount_min' => 50000,
                'typical_amount_max' => 200000,
                'is_active' => true,
                'sort_order' => 2
            ],

            // EMERGENCY
            [
                'name' => 'Biaya Darurat',
                'description' => 'Pengeluaran mendadak yang tidak terduga',
                'category_id' => $categories['Emergency'] ?? 6,
                'typical_amount_min' => 50000,
                'typical_amount_max' => 500000,
                'is_active' => true,
                'sort_order' => 1
            ],
            [
                'name' => 'Lain-lain',
                'description' => 'Pengeluaran lain yang tidak terkategorikan',
                'category_id' => $categories['Emergency'] ?? 6,
                'typical_amount_min' => 10000,
                'typical_amount_max' => 100000,
                'is_active' => true,
                'sort_order' => 2
            ],
        ];

        foreach ($templates as $template) {
            ExpenseTemplate::create($template);
        }

        $this->command->info('Expense Template seeder completed successfully!');
        $this->command->info('Created ' . count($templates) . ' expense templates.');
    }
}