<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $categories = [
            // Revenue categories
            'revenue_main', 'revenue_other',
            // Expense categories
            'expense_salary', 'expense_operational', 'expense_admin', 'expense_marketing',
            'expense_utilities', 'expense_travel', 'expense_equipment', 'expense_other', 'expense_tax',
            'expense_consumption',
            // Asset categories
            'asset_cash', 'asset_bank', 'asset_receivable', 'asset_fixed',
            'asset_inventory', 'asset_prepaid', 'asset_fixed_contra',
            // Liability categories
            'liability_payable', 'liability_loan', 'liability_tax',
            // Equity categories
            'equity_capital', 'equity_retained', 'equity_current',
        ];

        $enumValues = "'" . implode("','", $categories) . "'";

        DB::statement("ALTER TABLE chart_of_accounts MODIFY COLUMN account_category ENUM($enumValues)");
    }

    public function down(): void
    {
        $categories = [
            // Revenue categories
            'revenue_main', 'revenue_other',
            // Expense categories
            'expense_salary', 'expense_operational', 'expense_admin', 'expense_marketing',
            'expense_utilities', 'expense_travel', 'expense_equipment', 'expense_other', 'expense_tax',
            // Asset categories
            'asset_cash', 'asset_bank', 'asset_receivable', 'asset_fixed',
            'asset_inventory', 'asset_prepaid', 'asset_fixed_contra',
            // Liability categories
            'liability_payable', 'liability_loan', 'liability_tax',
            // Equity categories
            'equity_capital', 'equity_retained', 'equity_current',
        ];

        $enumValues = "'" . implode("','", $categories) . "'";

        DB::statement("ALTER TABLE chart_of_accounts MODIFY COLUMN account_category ENUM($enumValues)");
    }
};
