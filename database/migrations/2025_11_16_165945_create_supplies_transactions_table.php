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
        Schema::create('supplies_transactions', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date');
            $table->enum('transaction_type', ['topup', 'usage', 'depreciation'])->default('topup');
            $table->string('category', 100);
            $table->string('reference_number')->nullable();
            $table->text('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->enum('source_type', ['bank', 'petty_cash', 'other'])->default('other');
            $table->foreignId('bank_account_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('petty_cash_transaction_id')->nullable()->constrained()->nullOnDelete();
            $table->integer('depreciation_months')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['transaction_date', 'transaction_type']);
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('supplies_transactions');
    }
};
