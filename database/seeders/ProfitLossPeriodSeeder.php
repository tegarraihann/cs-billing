<?php

/**
 * FILE 11: database/seeders/ProfitLossPeriodSeeder.php
 * Profit Loss Periods
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfitLossPeriod;
use App\Models\User;

class ProfitLossPeriodSeeder extends Seeder
{
    public function run(): void
    {
        $adminKeuangan = User::where('role', 'admin_keuangan')->first();

        if (!$adminKeuangan) {
            $this->command->info('Please create admin_keuangan user first.');
            return;
        }

        $periods = [
            [
                'period_code' => '2024-12',
                'period_name' => 'Desember 2024',
                'period_type' => 'monthly',
                'start_date' => '2024-12-01',
                'end_date' => '2024-12-31',
                'status' => 'closed',
                'total_revenue' => 15750000.00,
                'total_expenses' => 12500000.00,
                'net_profit' => 3250000.00
            ],
            [
                'period_code' => '2025-01',
                'period_name' => 'Januari 2025',
                'period_type' => 'monthly',
                'start_date' => '2025-01-01',
                'end_date' => '2025-01-31',
                'status' => 'closed',
                'total_revenue' => 18500000.00,
                'total_expenses' => 14750000.00,
                'net_profit' => 3750000.00
            ],
            [
                'period_code' => '2025-02',
                'period_name' => 'Februari 2025',
                'period_type' => 'monthly',
                'start_date' => '2025-02-01',
                'end_date' => '2025-02-28',
                'status' => 'published',
                'total_revenue' => 22150000.00,
                'total_expenses' => 16800000.00,
                'net_profit' => 5350000.00
            ],
            [
                'period_code' => '2025-Q1',
                'period_name' => 'Kuartal I 2025',
                'period_type' => 'quarterly',
                'start_date' => '2025-01-01',
                'end_date' => '2025-03-31',
                'status' => 'draft',
                'total_revenue' => 0,
                'total_expenses' => 0,
                'net_profit' => 0
            ],
            [
                'period_code' => '2025',
                'period_name' => 'Tahun 2025',
                'period_type' => 'yearly',
                'start_date' => '2025-01-01',
                'end_date' => '2025-12-31',
                'status' => 'draft',
                'total_revenue' => 0,
                'total_expenses' => 0,
                'net_profit' => 0
            ]
        ];

        foreach ($periods as $period) {
            ProfitLossPeriod::create([
                'period_code' => $period['period_code'],
                'period_name' => $period['period_name'],
                'period_type' => $period['period_type'],
                'start_date' => $period['start_date'],
                'end_date' => $period['end_date'],
                'status' => $period['status'],
                'total_revenue' => $period['total_revenue'],
                'total_expenses' => $period['total_expenses'],
                'net_profit' => $period['net_profit'],
                'created_by' => $adminKeuangan->id,
                'approved_by' => $period['status'] === 'closed' ? $adminKeuangan->id : null,
                'approved_at' => $period['status'] === 'closed' ? now()->subDays(10) : null,
            ]);
        }

        $this->command->info('Profit Loss Period seeder completed successfully!');
    }
}
