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
        Schema::create('prepaid_rent_transactions', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date');
            $table->enum('transaction_type', ['topup', 'amortization'])->default('topup');
            $table->string('reference_number')->nullable();
            $table->string('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->enum('source_type', ['bank', 'petty_cash', 'other'])->default('other');
            $table->foreignId('bank_account_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('petty_cash_category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('petty_cash_transaction_id')->nullable()->constrained('petty_cash_transactions')->nullOnDelete();
            $table->date('rental_start_date')->nullable();
            $table->date('rental_end_date')->nullable();
            $table->integer('amortization_months')->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['transaction_date', 'transaction_type'], 'prepaid_rent_txn_date_type_idx');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prepaid_rent_transactions');
    }
};
