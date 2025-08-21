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
            // Check if columns don't exist before adding them
            if (!Schema::hasColumn('sales_orders', 'commodity')) {
                $table->text('commodity')->nullable();
            }
            if (!Schema::hasColumn('sales_orders', 'qty')) {
                $table->integer('qty')->nullable();
            }
            if (!Schema::hasColumn('sales_orders', 'net_weight')) {
                $table->decimal('net_weight', 10, 2)->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropColumn(['commodity', 'qty', 'net_weight']);
        });
    }
};
