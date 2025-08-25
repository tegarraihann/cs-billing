<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chart_of_accounts', function (Blueprint $table) {
            $table->id();
            $table->string('account_code', 20)->unique();
            $table->string('account_name');
            $table->enum('account_type', ['revenue', 'expense', 'asset', 'liability', 'equity']);
            $table->enum('account_category', [
                // Revenue categories
                'revenue_main', 'revenue_other',
                // Expense categories
                'expense_salary', 'expense_operational', 'expense_admin', 'expense_marketing',
                'expense_utilities', 'expense_travel', 'expense_equipment', 'expense_other',
                // Asset categories
                'asset_cash', 'asset_bank', 'asset_receivable', 'asset_fixed',
                // Liability categories
                'liability_payable', 'liability_loan',
                // Equity categories
                'equity_capital', 'equity_retained'
            ]);
            $table->string('parent_code', 20)->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->text('description')->nullable();
            $table->timestamps();
            
            $table->index(['account_type', 'account_category']);
            $table->index('is_active');
            $table->index('parent_code');
            $table->index('account_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chart_of_accounts');
    }
};
