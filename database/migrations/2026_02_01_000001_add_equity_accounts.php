<?php

use App\Models\ChartOfAccount;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $accounts = [
            [
                'account_code' => '3400',
                'account_name' => 'Prive/Dividend',
                'account_type' => 'equity',
                'account_category' => 'equity_distribution',
                'parent_code' => '3000',
                'sort_order' => 84,
                'description' => 'Equity distribution (prive/dividend)',
            ],
            [
                'account_code' => '3500',
                'account_name' => 'Management Loan',
                'account_type' => 'equity',
                'account_category' => 'equity_management',
                'parent_code' => '3000',
                'sort_order' => 85,
                'description' => 'Management loan related to equity',
            ],
            [
                'account_code' => '3600',
                'account_name' => 'Deferred Liabilities',
                'account_type' => 'equity',
                'account_category' => 'equity_deferred',
                'parent_code' => '3000',
                'sort_order' => 86,
                'description' => 'Deferred equity-related liabilities',
            ],
        ];

        foreach ($accounts as $account) {
            ChartOfAccount::updateOrCreate(
                ['account_code' => $account['account_code']],
                $account
            );
        }
    }

    public function down(): void
    {
        ChartOfAccount::whereIn('account_code', ['3400', '3500', '3600'])->delete();
    }
};
