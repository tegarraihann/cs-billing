<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ChartOfAccountsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accounts = [
            // ASSET ACCOUNTS
            [
                'account_code' => '1001',
                'account_name' => 'Kas',
                'account_type' => 'asset',
                'account_category' => 'asset_cash',
                'parent_code' => null,
                'sort_order' => 1,
                'description' => 'Kas perusahaan'
            ],
            [
                'account_code' => '1002',
                'account_name' => 'Bank Mandiri',
                'account_type' => 'asset',
                'account_category' => 'asset_bank',
                'parent_code' => null,
                'sort_order' => 2,
                'description' => 'Rekening Bank Mandiri'
            ],
            [
                'account_code' => '1003',
                'account_name' => 'Bank BCA',
                'account_type' => 'asset',
                'account_category' => 'asset_bank',
                'parent_code' => null,
                'sort_order' => 3,
                'description' => 'Rekening Bank BCA'
            ],
            [
                'account_code' => '1101',
                'account_name' => 'Piutang Usaha',
                'account_type' => 'asset',
                'account_category' => 'asset_receivable',
                'parent_code' => null,
                'sort_order' => 10,
                'description' => 'Piutang dari customer'
            ],

            // REVENUE ACCOUNTS
            [
                'account_code' => '4001',
                'account_name' => 'Pendapatan Jasa Logistik',
                'account_type' => 'revenue',
                'account_category' => 'revenue_main',
                'parent_code' => null,
                'sort_order' => 101,
                'description' => 'Pendapatan utama dari jasa logistik'
            ],
            [
                'account_code' => '4002',
                'account_name' => 'Pendapatan Bunga Bank',
                'account_type' => 'revenue',
                'account_category' => 'revenue_other',
                'parent_code' => null,
                'sort_order' => 102,
                'description' => 'Pendapatan dari bunga bank'
            ],
            [
                'account_code' => '4003',
                'account_name' => 'Pendapatan Lain-lain',
                'account_type' => 'revenue',
                'account_category' => 'revenue_other',
                'parent_code' => null,
                'sort_order' => 103,
                'description' => 'Pendapatan lain-lain'
            ],

            // EXPENSE ACCOUNTS - SALARY
            [
                'account_code' => '5001',
                'account_name' => 'Beban Gaji Karyawan',
                'account_type' => 'expense',
                'account_category' => 'expense_salary',
                'parent_code' => null,
                'sort_order' => 201,
                'description' => 'Gaji dan tunjangan karyawan'
            ],

            // EXPENSE ACCOUNTS - OPERATIONAL
            [
                'account_code' => '5101',
                'account_name' => 'Beban Listrik dan Air',
                'account_type' => 'expense',
                'account_category' => 'expense_utilities',
                'parent_code' => null,
                'sort_order' => 301,
                'description' => 'Beban listrik, air, dan utilitas'
            ],
            [
                'account_code' => '5102',
                'account_name' => 'Beban Internet dan Telepon',
                'account_type' => 'expense',
                'account_category' => 'expense_utilities',
                'parent_code' => null,
                'sort_order' => 302,
                'description' => 'Beban internet, indihome, telepon'
            ],
            [
                'account_code' => '5201',
                'account_name' => 'Beban Sewa',
                'account_type' => 'expense',
                'account_category' => 'expense_operational',
                'parent_code' => null,
                'sort_order' => 401,
                'description' => 'Beban sewa kantor dan fasilitas'
            ],
            [
                'account_code' => '5202',
                'account_name' => 'Beban Perjalanan Dinas',
                'account_type' => 'expense',
                'account_category' => 'expense_travel',
                'parent_code' => null,
                'sort_order' => 402,
                'description' => 'Beban perjalanan dinas'
            ],
            [
                'account_code' => '5203',
                'account_name' => 'Beban Perlengkapan Kantor',
                'account_type' => 'expense',
                'account_category' => 'expense_operational',
                'parent_code' => null,
                'sort_order' => 403,
                'description' => 'Beban ATK dan perlengkapan kantor'
            ],
            [
                'account_code' => '5204',
                'account_name' => 'Beban Equipment dan Penyusutan',
                'account_type' => 'expense',
                'account_category' => 'expense_equipment',
                'parent_code' => null,
                'sort_order' => 404,
                'description' => 'Beban equipment dan penyusutan'
            ],
            [
                'account_code' => '5205',
                'account_name' => 'Beban Entertaint',
                'account_type' => 'expense',
                'account_category' => 'expense_other',
                'parent_code' => null,
                'sort_order' => 405,
                'description' => 'Beban entertaint dan jamuan'
            ],
            [
                'account_code' => '5206',
                'account_name' => 'Beban Bensin dan Toll',
                'account_type' => 'expense',
                'account_category' => 'expense_operational',
                'parent_code' => null,
                'sort_order' => 406,
                'description' => 'Beban transportasi: bensin dan toll'
            ],

            // EXPENSE ACCOUNTS - ADMIN
            [
                'account_code' => '5301',
                'account_name' => 'Beban Admin Bank Mandiri',
                'account_type' => 'expense',
                'account_category' => 'expense_admin',
                'parent_code' => null,
                'sort_order' => 501,
                'description' => 'Biaya administrasi Bank Mandiri'
            ],
            [
                'account_code' => '5302',
                'account_name' => 'Beban Admin Bank BCA',
                'account_type' => 'expense',
                'account_category' => 'expense_admin',
                'parent_code' => null,
                'sort_order' => 502,
                'description' => 'Biaya administrasi Bank BCA'
            ],
            [
                'account_code' => '5303',
                'account_name' => 'Beban Lain-lain',
                'account_type' => 'expense',
                'account_category' => 'expense_other',
                'parent_code' => null,
                'sort_order' => 503,
                'description' => 'Beban operasional lain-lain'
            ],

            // LIABILITY ACCOUNTS
            [
                'account_code' => '2001',
                'account_name' => 'Hutang Usaha',
                'account_type' => 'liability',
                'account_category' => 'liability_payable',
                'parent_code' => null,
                'sort_order' => 601,
                'description' => 'Hutang kepada supplier dan vendor'
            ],
            [
                'account_code' => '2002',
                'account_name' => 'Pinjaman Modal',
                'account_type' => 'liability',
                'account_category' => 'liability_loan',
                'parent_code' => null,
                'sort_order' => 602,
                'description' => 'Pinjaman modal untuk operasional'
            ],

            // EQUITY ACCOUNTS
            [
                'account_code' => '3001',
                'account_name' => 'Modal Disetor',
                'account_type' => 'equity',
                'account_category' => 'equity_capital',
                'parent_code' => null,
                'sort_order' => 701,
                'description' => 'Modal yang disetor pemilik'
            ],
            [
                'account_code' => '3002',
                'account_name' => 'Laba Ditahan',
                'account_type' => 'equity',
                'account_category' => 'equity_retained',
                'parent_code' => null,
                'sort_order' => 702,
                'description' => 'Akumulasi laba yang ditahan'
            ]
        ];

        foreach ($accounts as $account) {
            DB::table('chart_of_accounts')->insert([
                'account_code' => $account['account_code'],
                'account_name' => $account['account_name'],
                'account_type' => $account['account_type'],
                'account_category' => $account['account_category'],
                'parent_code' => $account['parent_code'],
                'is_active' => true,
                'sort_order' => $account['sort_order'],
                'description' => $account['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
