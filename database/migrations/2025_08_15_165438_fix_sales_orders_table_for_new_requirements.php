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
        Schema::table('sales_orders', function (Blueprint $table) {
            // Make all legacy required fields nullable since we're using new fields
            $table->string('customer_name')->nullable()->change();
            $table->text('customer_address')->nullable()->change();
            $table->string('consignee_shipper')->nullable()->change();
            $table->text('shipping_address')->nullable()->change();
            $table->text('service_description')->nullable()->change();
            $table->decimal('total_amount', 15, 2)->nullable()->change();

            // For PostgreSQL, we need to handle enum differently
            // First change to varchar, then add constraint separately
            $table->string('status')->nullable()->change();
        });

        // Add check constraint for PostgreSQL (only if it doesn't exist)
        if (DB::getDriverName() === 'pgsql') {
            // Check if constraint already exists
            $constraintExists = DB::select("
                SELECT 1 FROM information_schema.table_constraints
                WHERE table_name = 'sales_orders'
                AND constraint_name = 'sales_orders_status_check'
                AND table_schema = current_schema()
            ");

            if (empty($constraintExists)) {
                DB::statement('ALTER TABLE sales_orders ADD CONSTRAINT sales_orders_status_check CHECK (status IN (\'draft\', \'sent\', \'confirmed\', \'cancelled\'))');
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the check constraint first if it exists
        if (DB::getDriverName() === 'pgsql') {
            DB::statement('ALTER TABLE sales_orders DROP CONSTRAINT IF EXISTS sales_orders_status_check');
        }

        Schema::table('sales_orders', function (Blueprint $table) {
            // Revert changes
            $table->string('customer_name')->nullable(false)->change();
            $table->text('customer_address')->nullable(false)->change();
            $table->string('consignee_shipper')->nullable(false)->change();
            $table->text('shipping_address')->nullable(false)->change();
            $table->text('service_description')->nullable(false)->change();
            $table->decimal('total_amount', 15, 2)->nullable(false)->change();

            // For rollback, just change back to string with default
            $table->string('status')->default('draft')->nullable(false)->change();
        });
    }
};
