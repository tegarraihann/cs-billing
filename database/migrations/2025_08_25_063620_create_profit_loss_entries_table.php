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
        Schema::create('profit_loss_entries', function (Blueprint $table) {
            $table->id();
            $table->foreignId('period_id')->constrained('profit_loss_periods');
            $table->foreignId('account_id')->constrained('chart_of_accounts');
            $table->string('description');
            $table->decimal('amount', 15, 2);
            $table->enum('entry_type', ['manual', 'auto_so', 'auto_petty_cash', 'auto_salary']);
            $table->string('reference_type')->nullable(); // 'sales_order', 'petty_cash_transaction', 'employee_salary'
            $table->bigInteger('reference_id')->nullable();
            $table->date('transaction_date');
            $table->text('notes')->nullable();
            $table->json('additional_data')->nullable(); // Store SO details, employee info, etc.
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            
            $table->index(['period_id', 'account_id']);
            $table->index(['entry_type', 'reference_type']);
            $table->index(['reference_type', 'reference_id']);
            $table->index('transaction_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profit_loss_entries');
    }
};
