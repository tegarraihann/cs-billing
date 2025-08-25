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
        Schema::create('petty_cash_balances', function (Blueprint $table) {
            $table->id();
            $table->date('balance_date');
            $table->decimal('opening_balance', 12, 2)->default(0);
            $table->decimal('total_in', 12, 2)->default(0); // topup + refund
            $table->decimal('total_out', 12, 2)->default(0); // expenses
            $table->decimal('closing_balance', 12, 2)->default(0);
            $table->integer('transaction_count')->default(0);
            $table->text('notes')->nullable();
            $table->timestamps();
            
            $table->unique('balance_date');
            $table->index('balance_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('petty_cash_balances');
    }
};
