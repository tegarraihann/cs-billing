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
        Schema::table('supplies_transactions', function (Blueprint $table) {
            $table->foreignId('petty_cash_category_id')
                ->nullable()
                ->after('petty_cash_transaction_id')
                ->constrained('petty_cash_categories')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supplies_transactions', function (Blueprint $table) {
            $table->dropConstrainedForeignId('petty_cash_category_id');
        });
    }
};
