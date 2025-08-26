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
        Schema::table('sales_orders', function (Blueprint $table) {
            // Remove old single buying/selling/revenue columns
            $table->dropColumn(['buying', 'selling', 'revenue']);
            
            // Add new breakdown structure as JSON
            $table->json('buying_breakdown')->nullable(); // [{"vendor": "Vendor 1", "amount": 1000}, ...]
            $table->json('selling_breakdown')->nullable(); // [{"description": "Service 1", "amount": 1500}, ...]
            
            // Keep calculated totals for quick reference
            $table->decimal('total_buying', 15, 2)->default(0);
            $table->decimal('total_selling', 15, 2)->default(0);
            $table->decimal('total_revenue', 15, 2)->default(0); // auto calculated: selling - buying
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            // Remove new breakdown structure
            $table->dropColumn(['buying_breakdown', 'selling_breakdown', 'total_buying', 'total_selling', 'total_revenue']);
            
            // Restore old single columns
            $table->decimal('buying', 15, 2)->nullable();
            $table->decimal('selling', 15, 2)->nullable();
            $table->decimal('revenue', 15, 2)->nullable();
        });
    }
};
