<?php

/**
 * FILE 10: database/seeders/ChartOfAccountSeeder.php
 * Chart of Accounts
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChartOfAccount;

class ChartOfAccountSeeder extends Seeder
{
    public function run(): void
    {
        $accounts = [
            // REVENUE ACCOUNTS
            ['code' => '4000', 'name' => 'PENDAPATAN', 'type' => 'revenue', 'category' => 'revenue_main', 'parent' => null, 'sort' => 1],
            ['code' => '4100', 'name' => 'Pendapatan Jasa Logistik', 'type' => 'revenue', 'category' => 'revenue_main', 'parent' => '4000', 'sort' => 2],
            ['code' => '4110', 'name' => 'Ocean Freight', 'type' => 'revenue', 'category' => 'revenue_main', 'parent' => '4100', 'sort' => 3],
            ['code' => '4120', 'name' => 'Air Freight', 'type' => 'revenue', 'category' => 'revenue_main', 'parent' => '4100', 'sort' => 4],
            ['code' => '4130', 'name' => 'Land Transportation', 'type' => 'revenue', 'category' => 'revenue_main', 'parent' => '4100', 'sort' => 5],
            ['code' => '4140', 'name' => 'Documentation Service', 'type' => 'revenue', 'category' => 'revenue_main', 'parent' => '4100', 'sort' => 6],
            ['code' => '4200', 'name' => 'Pendapatan Lain-lain', 'type' => 'revenue', 'category' => 'revenue_other', 'parent' => '4000', 'sort' => 7],

            // EXPENSE ACCOUNTS
            ['code' => '5000', 'name' => 'BEBAN OPERASIONAL', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => null, 'sort' => 10],
            ['code' => '5100', 'name' => 'Beban Gaji dan Tunjangan', 'type' => 'expense', 'category' => 'expense_salary', 'parent' => '5000', 'sort' => 11],
            ['code' => '5110', 'name' => 'Gaji Pokok', 'type' => 'expense', 'category' => 'expense_salary', 'parent' => '5100', 'sort' => 12],
            ['code' => '5120', 'name' => 'Tunjangan Transport', 'type' => 'expense', 'category' => 'expense_salary', 'parent' => '5100', 'sort' => 13],
            ['code' => '5130', 'name' => 'Tunjangan Makan', 'type' => 'expense', 'category' => 'expense_salary', 'parent' => '5100', 'sort' => 14],
            ['code' => '5140', 'name' => 'BPJS & Asuransi', 'type' => 'expense', 'category' => 'expense_salary', 'parent' => '5100', 'sort' => 15],

            ['code' => '5200', 'name' => 'Beban Operasional Harian', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => '5000', 'sort' => 20],
            ['code' => '5210', 'name' => 'Transportasi', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => '5200', 'sort' => 21],
            ['code' => '5220', 'name' => 'Konsumsi', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => '5200', 'sort' => 22],
            ['code' => '5230', 'name' => 'ATK & Supplies', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => '5200', 'sort' => 23],
            ['code' => '5240', 'name' => 'Komunikasi', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => '5200', 'sort' => 24],
            ['code' => '5250', 'name' => 'Maintenance', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => '5200', 'sort' => 25],

            ['code' => '5300', 'name' => 'Beban Administrasi', 'type' => 'expense', 'category' => 'expense_admin', 'parent' => '5000', 'sort' => 30],
            ['code' => '5310', 'name' => 'Listrik & Air', 'type' => 'expense', 'category' => 'expense_utilities', 'parent' => '5300', 'sort' => 31],
            ['code' => '5320', 'name' => 'Internet & Telepon', 'type' => 'expense', 'category' => 'expense_utilities', 'parent' => '5300', 'sort' => 32],
            ['code' => '5330', 'name' => 'Sewa Kantor', 'type' => 'expense', 'category' => 'expense_admin', 'parent' => '5300', 'sort' => 33],

            ['code' => '5400', 'name' => 'Beban Marketing', 'type' => 'expense', 'category' => 'expense_marketing', 'parent' => '5000', 'sort' => 40],
            ['code' => '5410', 'name' => 'Promosi & Iklan', 'type' => 'expense', 'category' => 'expense_marketing', 'parent' => '5400', 'sort' => 41],
            ['code' => '5420', 'name' => 'Entertainment', 'type' => 'expense', 'category' => 'expense_marketing', 'parent' => '5400', 'sort' => 42],

            // ASSET ACCOUNTS
            ['code' => '1000', 'name' => 'ASET LANCAR', 'type' => 'asset', 'category' => 'asset_cash', 'parent' => null, 'sort' => 50],
            ['code' => '1100', 'name' => 'Kas dan Bank', 'type' => 'asset', 'category' => 'asset_cash', 'parent' => '1000', 'sort' => 51],
            ['code' => '1110', 'name' => 'Kas Kecil', 'type' => 'asset', 'category' => 'asset_cash', 'parent' => '1100', 'sort' => 52],
            ['code' => '1120', 'name' => 'Bank Mandiri', 'type' => 'asset', 'category' => 'asset_bank', 'parent' => '1100', 'sort' => 53],
            ['code' => '1130', 'name' => 'Bank BCA', 'type' => 'asset', 'category' => 'asset_bank', 'parent' => '1100', 'sort' => 54],

            ['code' => '1200', 'name' => 'Piutang Usaha', 'type' => 'asset', 'category' => 'asset_receivable', 'parent' => '1000', 'sort' => 60],

            // LIABILITY ACCOUNTS
            ['code' => '2000', 'name' => 'KEWAJIBAN', 'type' => 'liability', 'category' => 'liability_payable', 'parent' => null, 'sort' => 70],
            ['code' => '2100', 'name' => 'Hutang Usaha', 'type' => 'liability', 'category' => 'liability_payable', 'parent' => '2000', 'sort' => 71],
            ['code' => '2200', 'name' => 'Hutang Gaji', 'type' => 'liability', 'category' => 'liability_payable', 'parent' => '2000', 'sort' => 72],

            // EQUITY ACCOUNTS
            ['code' => '3000', 'name' => 'MODAL', 'type' => 'equity', 'category' => 'equity_capital', 'parent' => null, 'sort' => 80],
            ['code' => '3100', 'name' => 'Modal Disetor', 'type' => 'equity', 'category' => 'equity_capital', 'parent' => '3000', 'sort' => 81],
            ['code' => '3200', 'name' => 'Laba Ditahan', 'type' => 'equity', 'category' => 'equity_retained', 'parent' => '3000', 'sort' => 82],
        ];

        foreach ($accounts as $account) {
            ChartOfAccount::create([
                'account_code' => $account['code'],
                'account_name' => $account['name'],
                'account_type' => $account['type'],
                'account_category' => $account['category'],
                'parent_code' => $account['parent'],
                'sort_order' => $account['sort'],
                'is_active' => true,
                'description' => 'Chart of account untuk ' . $account['name']
            ]);
        }

        $this->command->info('Chart of Account seeder completed successfully!');
    }
}
