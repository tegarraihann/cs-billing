<?php

/**
 * FILE 12: database/seeders/ProfitLossEntrySeeder.php
 * Profit Loss Entries
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use App\Models\ChartOfAccount;
use App\Models\SalesOrder;
use App\Models\User;

class ProfitLossEntrySeeder extends Seeder
{
    public function run(): void
    {
        $periods = ProfitLossPeriod::where('status', '!=', 'draft')->get();
        $accounts = ChartOfAccount::all();
        $salesOrders = SalesOrder::all();
        $adminKeuangan = User::where('role', 'admin_keuangan')->first();

        if ($periods->isEmpty() || $accounts->isEmpty() || !$adminKeuangan) {
            $this->command->info('Please run required seeders first.');
            return;
        }

        foreach ($periods->take(2) as $period) { // Only for closed periods
            // Revenue Entries from Sales Orders
            foreach ($salesOrders as $so) {
                ProfitLossEntry::create([
                    'period_id' => $period->id,
                    'account_id' => $accounts->where('account_code', '4110')->first()->id, // Ocean Freight
                    'description' => 'Revenue from ' . $so->so_number,
                    'amount' => $so->selling ?? $so->total_amount,
                    'entry_type' => 'auto_so',
                    'reference_type' => 'sales_order',
                    'reference_id' => $so->id,
                    'transaction_date' => $so->confirmed_at ?? $so->created_at,
                    'notes' => 'Automatic entry from Sales Order',
                    'created_by' => $adminKeuangan->id
                ]);

                // Cost Entry
                if ($so->buying) {
                    ProfitLossEntry::create([
                        'period_id' => $period->id,
                        'account_id' => $accounts->where('account_code', '5210')->first()->id, // Transportasi
                        'description' => 'Cost for ' . $so->so_number,
                        'amount' => $so->buying,
                        'entry_type' => 'auto_so',
                        'reference_type' => 'sales_order',
                        'reference_id' => $so->id,
                        'transaction_date' => $so->confirmed_at ?? $so->created_at,
                        'notes' => 'Cost from vendor for SO',
                        'created_by' => $adminKeuangan->id
                    ]);
                }
            }

            // Manual Expense Entries
            $manualExpenses = [
                ['account_code' => '5110', 'description' => 'Gaji Bulanan Karyawan', 'amount' => 8500000],
                ['account_code' => '5310', 'description' => 'Listrik Kantor', 'amount' => 650000],
                ['account_code' => '5320', 'description' => 'Internet & Telepon', 'amount' => 450000],
                ['account_code' => '5330', 'description' => 'Sewa Kantor', 'amount' => 2500000],
                ['account_code' => '5220', 'description' => 'Konsumsi Kantor', 'amount' => 850000],
                ['account_code' => '5230', 'description' => 'ATK & Supplies', 'amount' => 275000],
            ];

            foreach ($manualExpenses as $expense) {
                ProfitLossEntry::create([
                    'period_id' => $period->id,
                    'account_id' => $accounts->where('account_code', $expense['account_code'])->first()->id,
                    'description' => $expense['description'] . ' - ' . $period->period_name,
                    'amount' => $expense['amount'],
                    'entry_type' => 'manual',
                    'reference_type' => null,
                    'reference_id' => null,
                    'transaction_date' => $period->end_date,
                    'notes' => 'Manual entry for fixed monthly expense',
                    'created_by' => $adminKeuangan->id
                ]);
            }
        }

        $this->command->info('Profit Loss Entry seeder completed successfully!');
    }
}
