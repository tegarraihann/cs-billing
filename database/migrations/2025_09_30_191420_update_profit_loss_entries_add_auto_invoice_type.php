<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('profit_loss_entries', function (Blueprint $table) {
            // Update enum to include auto_invoice type
            DB::statement("ALTER TABLE profit_loss_entries MODIFY COLUMN entry_type ENUM('manual', 'auto_so', 'auto_petty_cash', 'auto_salary', 'auto_invoice')");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profit_loss_entries', function (Blueprint $table) {
            // Revert back to original enum
            DB::statement("ALTER TABLE profit_loss_entries MODIFY COLUMN entry_type ENUM('manual', 'auto_so', 'auto_petty_cash', 'auto_salary')");
        });
    }
};
