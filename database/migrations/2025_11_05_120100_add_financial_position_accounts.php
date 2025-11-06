<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $now = Carbon::now();

        $accounts = [
            [
                'account_code' => '1140',
                'account_name' => 'Emergency Fund',
                'account_type' => 'asset',
                'account_category' => 'asset_bank',
                'parent_code' => '1100',
                'sort_order' => 55,
                'description' => 'Dana darurat perusahaan yang dipisahkan dari kas utama.',
            ],
            [
                'account_code' => '1210',
                'account_name' => 'Other Receivables',
                'account_type' => 'asset',
                'account_category' => 'asset_receivable',
                'parent_code' => '1000',
                'sort_order' => 61,
                'description' => 'Piutang lain-lain di luar piutang usaha utama.',
            ],
            [
                'account_code' => '1300',
                'account_name' => 'Supplies',
                'account_type' => 'asset',
                'account_category' => 'asset_inventory',
                'parent_code' => '1000',
                'sort_order' => 70,
                'description' => 'Persediaan perlengkapan kantor yang belum digunakan.',
            ],
            [
                'account_code' => '1400',
                'account_name' => 'Prepaid Rent',
                'account_type' => 'asset',
                'account_category' => 'asset_prepaid',
                'parent_code' => '1000',
                'sort_order' => 80,
                'description' => 'Pembayaran sewa yang masih menjadi aset hingga masa sewanya berakhir.',
            ],
            [
                'account_code' => '1500',
                'account_name' => 'Fixed Assets',
                'account_type' => 'asset',
                'account_category' => 'asset_fixed',
                'parent_code' => null,
                'sort_order' => 90,
                'description' => 'Kelompok aset tetap perusahaan.',
            ],
            [
                'account_code' => '1510',
                'account_name' => 'Equipment',
                'account_type' => 'asset',
                'account_category' => 'asset_fixed',
                'parent_code' => '1500',
                'sort_order' => 91,
                'description' => 'Peralatan operasional perusahaan.',
            ],
            [
                'account_code' => '1515',
                'account_name' => 'Accumulated Depreciation - Equipment',
                'account_type' => 'asset',
                'account_category' => 'asset_fixed_contra',
                'parent_code' => '1510',
                'sort_order' => 92,
                'description' => 'Akumulasi penyusutan atas peralatan perusahaan.',
            ],
            [
                'account_code' => '2110',
                'account_name' => 'VAT Payable 11%',
                'account_type' => 'liability',
                'account_category' => 'liability_tax',
                'parent_code' => '2000',
                'sort_order' => 74,
                'description' => 'Kewajiban PPN keluaran dengan tarif 11% yang belum disetorkan.',
            ],
            [
                'account_code' => '2111',
                'account_name' => 'VAT Payable 1.1%',
                'account_type' => 'liability',
                'account_category' => 'liability_tax',
                'parent_code' => '2000',
                'sort_order' => 75,
                'description' => 'Kewajiban PPN keluaran dengan tarif 1.1% yang belum disetorkan.',
            ],
            [
                'account_code' => '3300',
                'account_name' => 'Current Year Earnings',
                'account_type' => 'equity',
                'account_category' => 'equity_current',
                'parent_code' => '3000',
                'sort_order' => 83,
                'description' => 'Laba rugi tahun berjalan yang belum ditutup ke laba ditahan.',
            ],
        ];

        foreach ($accounts as $account) {
            $existing = DB::table('chart_of_accounts')
                ->where('account_code', $account['account_code'])
                ->first();

            $payload = array_merge($account, [
                'is_active' => true,
                'updated_at' => $now,
            ]);

            if ($existing) {
                DB::table('chart_of_accounts')
                    ->where('account_code', $account['account_code'])
                    ->update($payload);
            } else {
                $payload['created_at'] = $now;
                DB::table('chart_of_accounts')->insert($payload);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('chart_of_accounts')
            ->whereIn('account_code', ['1140', '1210', '1300', '1400', '1500', '1510', '1515', '2110', '2111', '3300'])
            ->delete();
    }
};
