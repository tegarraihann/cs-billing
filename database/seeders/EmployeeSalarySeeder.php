<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EmployeeSalary;
use App\Models\User;

class EmployeeSalarySeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();

        if ($users->isEmpty()) {
            $this->command->info('Please run UserSeeder first.');
            return;
        }

        $salaryData = [
            'master_admin' => [
                'basic_salary' => 12000000,
                'allowances' => 3750000, // transport + meal + position
                'division' => 'management',
                'position' => 'General Manager'
            ],
            'admin_cs' => [
                'basic_salary' => 6500000,
                'allowances' => 2150000, // transport + meal + position
                'division' => 'customer_support',
                'position' => 'CS Staff'
            ],
            'admin_keuangan' => [
                'basic_salary' => 8500000,
                'allowances' => 2650000, // transport + meal + position
                'division' => 'finance',
                'position' => 'Finance Staff'
            ]
        ];

        foreach ($users as $user) {
            $salary = $salaryData[$user->role] ?? $salaryData['admin_cs'];

            // Create salary record for last 3 months
            for ($i = 2; $i >= 0; $i--) {
                $month = now()->subMonths($i);

                $overtimeHours = rand(0, 20);
                $overtimeAmount = $overtimeHours * 50000;
                $bonus = $i === 0 ? rand(500000, 2000000) : 0; // Bonus only for current month

                $totalAllowances = $salary['allowances'] + $overtimeAmount + $bonus;
                $deductions = ($salary['basic_salary'] * 0.06); // 6% total deduction (BPJS + tax)
                $totalSalary = $salary['basic_salary'] + $totalAllowances - $deductions;

                EmployeeSalary::create([
                    'employee_name' => $user->name,
                    'employee_id' => 'EMP-' . str_pad($user->id, 3, '0', STR_PAD_LEFT), // Generate NIK
                    'division' => $salary['division'],
                    'position' => $salary['position'],
                    'basic_salary' => $salary['basic_salary'],
                    'allowances' => $totalAllowances,
                    'deductions' => $deductions,
                    'total_salary' => $totalSalary,
                    'salary_date' => $i > 0 ? $month->endOfMonth()->toDateString() : now()->toDateString(),
                    'period_month' => $month->format('Y-m'), // Format YYYY-MM
                    'status' => $i > 0 ? 'paid' : 'draft',
                    'notes' => $i === 0 ? 'Salary untuk bulan berjalan' : 'Salary bulan ' . $month->format('M Y'),
                    'details' => json_encode([
                        'basic_salary' => $salary['basic_salary'],
                        'transport_allowance' => 750000,
                        'meal_allowance' => 600000,
                        'position_allowance' => $salary['allowances'] - 1350000,
                        'overtime_hours' => $overtimeHours,
                        'overtime_amount' => $overtimeAmount,
                        'bonus' => $bonus,
                        'bpjs_deduction' => $salary['basic_salary'] * 0.01,
                        'tax_deduction' => $salary['basic_salary'] * 0.05,
                    ]),
                    'is_active' => true,
                    'created_by' => $users->where('role', 'admin_keuangan')->first()->id ?? $users->first()->id,
                    'approved_by' => $i > 0 ? ($users->where('role', 'master_admin')->first()->id ?? $users->first()->id) : null,
                    'approved_at' => $i > 0 ? $month->endOfMonth()->subDays(2) : null,
                ]);
            }
        }

        $this->command->info('Employee Salary seeder completed successfully!');
    }
}
