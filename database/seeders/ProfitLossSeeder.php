<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfitLossPeriod;
use App\Models\ChartOfAccount;
use App\Models\ProfitLossEntry;
use App\Models\EmployeeSalary;
use Illuminate\Support\Facades\Auth;

class ProfitLossSeeder extends Seeder
{
    public function run(): void
    {
        // Create a sample period
        $period = ProfitLossPeriod::create([
            'period_code' => 'PL-M-2024-12',
            'period_name' => 'Laporan Laba Rugi Desember 2024',
            'period_type' => 'monthly',
            'start_date' => '2024-12-01',
            'end_date' => '2024-12-31',
            'total_revenue' => 100500000,
            'total_expenses' => 33540001,
            'net_profit' => 66959999,
            'summary_data' => [
                'total_salary_expense' => 25000000,
                'total_operational_expense' => 5540001,
                'total_admin_expense' => 3000000,
                'total_other_expense' => 0,
            ],
            'status' => 'closed',
            'created_by' => 1, // Assume user ID 1 exists
            'approved_by' => 1,
            'approved_at' => now(),
        ]);

        // Get accounts for entries
        $revenueAccount = ChartOfAccount::where('account_code', '4001')->first();
        $salaryAccount = ChartOfAccount::where('account_code', '5001')->first();
        $utilitiesAccount = ChartOfAccount::where('account_code', '5101')->first();
        $rentAccount = ChartOfAccount::where('account_code', '5201')->first();

        if ($revenueAccount) {
            // Create revenue entry
            ProfitLossEntry::create([
                'period_id' => $period->id,
                'account_id' => $revenueAccount->id,
                'description' => 'Pendapatan Jasa Logistik Bulan Desember',
                'amount' => 100500000,
                'entry_type' => 'manual',
                'transaction_date' => '2024-12-31',
                'notes' => 'Total pendapatan jasa logistik untuk periode Desember 2024',
                'created_by' => 1,
            ]);
        }

        if ($salaryAccount) {
            // Create salary entries
            $employees = [
                ['name' => 'Tegar Raihan', 'position' => 'Finance Manager', 'division' => 'finance', 'salary' => 8000000],
                ['name' => 'Ahmad Setiawan', 'position' => 'Operations Staff', 'division' => 'operations', 'salary' => 5000000],
                ['name' => 'Siti Nurhaliza', 'position' => 'Customer Service', 'division' => 'customer_support', 'salary' => 4500000],
                ['name' => 'Budi Santoso', 'position' => 'Marketing Staff', 'division' => 'marketing', 'salary' => 4000000],
                ['name' => 'Rina Kartika', 'position' => 'Admin Staff', 'division' => 'finance', 'salary' => 3500000],
            ];

            foreach ($employees as $emp) {
                // Create employee salary record
                $salary = EmployeeSalary::create([
                    'employee_name' => $emp['name'],
                    'employee_id' => 'EMP' . str_pad(array_search($emp, $employees) + 1, 3, '0', STR_PAD_LEFT),
                    'division' => $emp['division'],
                    'position' => $emp['position'],
                    'basic_salary' => $emp['salary'],
                    'allowances' => $emp['salary'] * 0.1, // 10% allowance
                    'deductions' => $emp['salary'] * 0.05, // 5% deduction
                    'total_salary' => $emp['salary'] * 1.05, // basic + allowances - deductions
                    'salary_date' => '2024-12-25',
                    'period_month' => '2024-12',
                    'status' => 'paid',
                    'created_by' => 1,
                    'approved_by' => 1,
                    'approved_at' => now(),
                ]);

                // Create corresponding profit loss entry
                ProfitLossEntry::create([
                    'period_id' => $period->id,
                    'account_id' => $salaryAccount->id,
                    'description' => 'Gaji ' . $emp['name'] . ' - 2024-12',
                    'amount' => $salary->total_salary,
                    'entry_type' => 'auto_salary',
                    'reference_type' => 'employee_salary',
                    'reference_id' => $salary->id,
                    'transaction_date' => '2024-12-25',
                    'additional_data' => [
                        'employee_name' => $emp['name'],
                        'division' => $emp['division'],
                        'position' => $emp['position'],
                        'basic_salary' => $emp['salary'],
                        'total_salary' => $salary->total_salary,
                    ],
                    'created_by' => 1,
                ]);
            }
        }

        if ($utilitiesAccount) {
            ProfitLossEntry::create([
                'period_id' => $period->id,
                'account_id' => $utilitiesAccount->id,
                'description' => 'Beban Listrik dan Air Bulan Desember',
                'amount' => 2500000,
                'entry_type' => 'manual',
                'transaction_date' => '2024-12-30',
                'notes' => 'Pembayaran listrik dan air untuk kantor',
                'created_by' => 1,
            ]);
        }

        if ($rentAccount) {
            ProfitLossEntry::create([
                'period_id' => $period->id,
                'account_id' => $rentAccount->id,
                'description' => 'Beban Sewa Kantor Bulan Desember',
                'amount' => 15000000,
                'entry_type' => 'manual',
                'transaction_date' => '2024-12-01',
                'notes' => 'Sewa kantor untuk periode Desember 2024',
                'created_by' => 1,
            ]);
        }

        // Create another period for current month
        $currentPeriod = ProfitLossPeriod::create([
            'period_code' => 'PL-M-2025-08',
            'period_name' => 'Laporan Laba Rugi Agustus 2025',
            'period_type' => 'monthly',
            'start_date' => '2025-08-01',
            'end_date' => '2025-08-31',
            'status' => 'draft',
            'created_by' => 1,
        ]);

        echo "Sample profit loss data created successfully!\n";
    }
}