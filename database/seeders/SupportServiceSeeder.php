<?php

namespace Database\Seeders;

use App\Models\SupportService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SupportServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $supportServices = [
            [
                'title' => 'Warehousing',
                'description' => 'Secure and efficient storage solutions with modern facilities and inventory management systems.',
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Packaging',
                'description' => 'Professional packaging services to ensure your products are protected during transit.',
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Cargo Service',
                'description' => 'Comprehensive cargo handling with specialized equipment and experienced personnel.',
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Stuffing/Stripping',
                'description' => 'Professional container loading and unloading services with careful handling procedures.',
                'order_index' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Cold Chain',
                'description' => 'Temperature-controlled logistics system to maintain quality of perishable products.',
                'order_index' => 5,
                'is_active' => true,
            ],
            [
                'title' => 'Freight Forwarding',
                'description' => 'Multimodal shipping coordination with global network for maximum efficiency.',
                'order_index' => 6,
                'is_active' => true,
            ],
        ];

        foreach ($supportServices as $supportService) {
            SupportService::create($supportService);
        }
    }
}
