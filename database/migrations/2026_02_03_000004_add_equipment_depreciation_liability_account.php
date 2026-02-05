<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        $now = Carbon::now();

        $account = [
            'account_code' => '2150',
            'account_name' => 'Depreciation Liability',
            'account_type' => 'liability',
            'account_category' => 'liability_payable',
            'parent_code' => '2000',
            'sort_order' => 76,
            'description' => 'Akumulasi penyusutan equipment yang dicatat sebagai liabilitas sesuai kebutuhan laporan.',
        ];

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

    public function down(): void
    {
        DB::table('chart_of_accounts')
            ->where('account_code', '2150')
            ->delete();
    }
};
