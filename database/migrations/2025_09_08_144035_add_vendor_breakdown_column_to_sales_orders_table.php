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
            // Add vendor_breakdown column to store pricing information
            if (!Schema::hasColumn('sales_orders', 'vendor_breakdown')) {
                $table->longText('vendor_breakdown')->nullable()->after('exchange_rate');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            if (Schema::hasColumn('sales_orders', 'vendor_breakdown')) {
                $table->dropColumn('vendor_breakdown');
            }
        });
    }
};
