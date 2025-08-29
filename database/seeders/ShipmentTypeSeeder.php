<?php

namespace Database\Seeders;

use App\Models\ShipmentType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShipmentTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shipmentTypes = [
            [
                'name' => 'Sea Freight',
                'code' => 'SEA',
                'description' => 'Sea freight shipping for large volumes',
                'is_active' => true
            ],
            [
                'name' => 'Air Freight',
                'code' => 'AIR',
                'description' => 'Air freight shipping for fast delivery',
                'is_active' => true
            ],
            [
                'name' => 'Land Transportation',
                'code' => 'LAND',
                'description' => 'Land transportation for domestic shipping',
                'is_active' => true
            ],
            [
                'name' => 'FCL (Full Container Load)',
                'code' => 'FCL',
                'description' => 'Full container load for sea freight',
                'is_active' => true
            ],
            [
                'name' => 'LCL (Less Container Load)',
                'code' => 'LCL',
                'description' => 'Less container load for sea freight',
                'is_active' => true
            ],
            [
                'name' => 'Door to Door',
                'code' => 'DTD',
                'description' => 'Door to door delivery service',
                'is_active' => true
            ],
            [
                'name' => 'Import Service',
                'code' => 'IMP',
                'description' => 'Import customs clearance service',
                'is_active' => true
            ],
            [
                'name' => 'Export Service',
                'code' => 'EXP',
                'description' => 'Export customs clearance service',
                'is_active' => true
            ]
        ];

        foreach ($shipmentTypes as $type) {
            ShipmentType::firstOrCreate(
                ['code' => $type['code']],
                $type
            );
        }
    }
}