<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

return new class extends Migration
{
    public function up(): void
    {
        $now = Carbon::now();

        $accounts = [
            [
                'account_code' => '3700',
                'account_name' => 'AR Balance',
                'account_type' => 'equity',
                'account_category' => 'equity_current',
                'parent_code' => '3000',
                'sort_order' => 86,
                'description' => 'Opening balance for accounts receivable (AR) at system start.',
            ],
            [
                'account_code' => '3710',
                'account_name' => 'AP Balance',
                'account_type' => 'equity',
                'account_category' => 'equity_current',
                'parent_code' => '3000',
                'sort_order' => 87,
                'description' => 'Opening balance for accounts payable (AP) at system start.',
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

    public function down(): void
    {
        DB::table('chart_of_accounts')
            ->whereIn('account_code', ['3700', '3710'])
            ->delete();
    }
};
