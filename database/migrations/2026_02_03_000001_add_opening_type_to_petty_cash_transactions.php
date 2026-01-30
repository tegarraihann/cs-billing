<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE petty_cash_transactions MODIFY COLUMN type ENUM('expense','topup','refund','opening') DEFAULT 'expense'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE petty_cash_transactions MODIFY COLUMN type ENUM('expense','topup','refund') DEFAULT 'expense'");
    }
};
