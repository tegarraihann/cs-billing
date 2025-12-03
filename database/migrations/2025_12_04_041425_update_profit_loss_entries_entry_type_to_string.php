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
        Schema::table('profit_loss_entries', function (Blueprint $table) {
            $table->string('entry_type', 50)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('profit_loss_entries', function (Blueprint $table) {
            $table->enum('entry_type', ['manual', 'auto_so', 'auto_petty_cash', 'auto_salary'])->change();
        });
    }
};
