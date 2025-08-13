<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Export & Import',
                'description' => 'We specialize in export and import services with comprehensive customs clearance, door-to-door delivery, and real-time tracking.',
                'features' => [
                    'Customs Clearance & Support',
                    'Door-to-Door Delivery Service', 
                    'Real-time Shipment Tracking',
                    'Export Consultation & Support',
                    'Document Processing',
                    'International Trade Compliance'
                ],
                'category' => 'International Trade',
                'icon_path' => null,
                'image_path' => null, // Will be populated manually via admin panel
                'order_index' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Trucking Inland',
                'description' => 'Ground shipping throughout Indonesia with a well-maintained fleet and real-time tracking.',
                'features' => [
                    'Nationwide Coverage Across Indonesia',
                    'Real-time GPS Tracking',
                    'Professional Experienced Drivers',
                    'Well-maintained Fleet of Trucks',
                    'Competitive Pricing',
                    'Door-to-door Service'
                ],
                'category' => 'Domestic Transport',
                'icon_path' => null,
                'image_path' => null, // Will be populated manually via admin panel
                'order_index' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Money Transfer',
                'description' => 'International transfers at competitive rates and fast processing worldwide.',
                'features' => [
                    'Competitive Exchange Rates',
                    'Fast Processing Time',
                    'Secure and Reliable Transfers',
                    'Worldwide Coverage',
                    'Multiple Payment Methods',
                    '24/7 Customer Support'
                ],
                'category' => 'Financial Services',
                'icon_path' => null,
                'image_path' => null, // Will be populated manually via admin panel
                'order_index' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Freight Insurance',
                'description' => 'Complete protection for shipments with comprehensive coverage and easy claims.',
                'features' => [
                    'Comprehensive Shipment Coverage',
                    'Easy Claims Process',
                    'Competitive Premium Rates',
                    'Quick Claim Settlements',
                    'Professional Risk Assessment',
                    'Global Coverage Network'
                ],
                'category' => 'Insurance Services',
                'icon_path' => null,
                'image_path' => null, // Will be populated manually via admin panel
                'order_index' => 4,
                'is_active' => true,
            ],
        ];

        foreach ($services as $service) {
            Service::updateOrCreate(
                ['title' => $service['title']], // Check if service with same title exists
                $service
            );
        }
    }
}