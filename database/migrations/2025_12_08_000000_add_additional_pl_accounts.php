<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use App\Models\ChartOfAccount;

return new class extends Migration {
    public function up(): void
    {
        $accounts = [
            ['code' => '4210', 'name' => 'Interest Income', 'type' => 'revenue', 'category' => 'revenue_other', 'parent' => '4200', 'sort' => 4210],
            ['code' => '5260', 'name' => 'Depreciation Expense - Equipment', 'type' => 'expense', 'category' => 'expense_operational', 'parent' => '5000', 'sort' => 5260],
            ['code' => '5340', 'name' => 'Tax Expense', 'type' => 'expense', 'category' => 'expense_admin', 'parent' => '5300', 'sort' => 5340],
            ['code' => '5345', 'name' => 'Bank Card / Admin Fee', 'type' => 'expense', 'category' => 'expense_admin', 'parent' => '5300', 'sort' => 5345],
            ['code' => '5350', 'name' => 'Interest / Bank Charges', 'type' => 'expense', 'category' => 'expense_admin', 'parent' => '5300', 'sort' => 5350],
        ];

        foreach ($accounts as $acc) {
            ChartOfAccount::updateOrCreate(
                ['account_code' => $acc['code']],
                [
                    'account_name' => $acc['name'],
                    'account_type' => $acc['type'],
                    'account_category' => $acc['category'],
                    'parent_code' => $acc['parent'],
                    'sort_order' => $acc['sort'],
                    'is_active' => true,
                    'description' => $acc['name'],
                ]
            );
        }
    }

    public function down(): void
    {
        DB::table('chart_of_accounts')->whereIn('account_code', ['4210','5260','5340','5345','5350'])->delete();
    }
};
