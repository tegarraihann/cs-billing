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
            // Make all legacy required fields nullable since we're using new fields
            $table->string('customer_name')->nullable()->change();
            $table->text('customer_address')->nullable()->change();
            $table->string('consignee_shipper')->nullable()->change();
            $table->text('shipping_address')->nullable()->change();
            $table->text('service_description')->nullable()->change();
            $table->decimal('total_amount', 15, 2)->nullable()->change();
            $table->enum('status', ['draft', 'sent', 'confirmed', 'cancelled'])->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            // Revert changes
            $table->string('customer_name')->nullable(false)->change();
            $table->text('customer_address')->nullable(false)->change();
            $table->string('consignee_shipper')->nullable(false)->change();
            $table->text('shipping_address')->nullable(false)->change();
            $table->text('service_description')->nullable(false)->change();
            $table->decimal('total_amount', 15, 2)->nullable(false)->change();
            $table->enum('status', ['draft', 'sent', 'confirmed', 'cancelled'])->default('draft')->change();
        });
    }
};
