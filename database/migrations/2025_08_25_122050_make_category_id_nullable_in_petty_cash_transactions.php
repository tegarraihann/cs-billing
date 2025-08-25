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
        Schema::table('petty_cash_transactions', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['category_id']);
            
            // Make category_id nullable
            $table->foreignId('category_id')->nullable()->change();
            
            // Add the foreign key constraint back
            $table->foreign('category_id')->references('id')->on('petty_cash_categories');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('petty_cash_transactions', function (Blueprint $table) {
            // Drop the foreign key constraint first
            $table->dropForeign(['category_id']);
            
            // Make category_id not nullable again
            $table->foreignId('category_id')->change();
            
            // Add the foreign key constraint back
            $table->foreign('category_id')->references('id')->on('petty_cash_categories');
        });
    }
};
