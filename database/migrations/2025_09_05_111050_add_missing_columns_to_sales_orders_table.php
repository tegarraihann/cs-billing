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
            // Check which columns exist first and add missing ones
            if (!Schema::hasColumn('sales_orders', 'ref_no')) {
                $table->string('ref_no')->nullable()->after('order_number');
            }
            if (!Schema::hasColumn('sales_orders', 'total_buying')) {
                $table->decimal('total_buying', 15, 2)->default(0)->after('total_selling');
            }
            if (!Schema::hasColumn('sales_orders', 'total_revenue')) {
                $table->decimal('total_revenue', 15, 2)->default(0)->after('total_buying');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            if (Schema::hasColumn('sales_orders', 'ref_no')) {
                $table->dropColumn('ref_no');
            }
            if (Schema::hasColumn('sales_orders', 'total_buying')) {
                $table->dropColumn('total_buying');
            }
            if (Schema::hasColumn('sales_orders', 'total_revenue')) {
                $table->dropColumn('total_revenue');
            }
        });
    }
};
