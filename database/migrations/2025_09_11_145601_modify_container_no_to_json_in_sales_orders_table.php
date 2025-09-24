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
        // Handle PostgreSQL and MySQL differently
        if (DB::getDriverName() === 'pgsql') {
            // PostgreSQL: Need explicit USING clause for type conversion
            DB::statement("
                UPDATE sales_orders
                SET container_no = CASE
                    WHEN container_no IS NULL OR container_no = '' THEN NULL
                    ELSE '\"' || container_no || '\"'
                END
            ");

            // Convert to JSON using explicit casting
            DB::statement("
                ALTER TABLE sales_orders
                ALTER COLUMN container_no TYPE JSON
                USING CASE
                    WHEN container_no IS NULL THEN NULL
                    ELSE container_no::JSON
                END
            ");
        } else {
            // MySQL: Use Laravel's built-in method
            DB::statement("UPDATE sales_orders SET container_no = CASE
                WHEN container_no IS NULL THEN NULL
                WHEN container_no = '' THEN NULL
                ELSE JSON_ARRAY(container_no)
                END");

            Schema::table('sales_orders', function (Blueprint $table) {
                $table->json('container_no')->nullable()->change();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'pgsql') {
            // PostgreSQL: Convert JSON back to string
            DB::statement("
                UPDATE sales_orders
                SET container_no = CASE
                    WHEN container_no IS NULL THEN NULL
                    ELSE container_no #>> '{}'
                END
            ");

            DB::statement("
                ALTER TABLE sales_orders
                ALTER COLUMN container_no TYPE VARCHAR(255)
                USING container_no::VARCHAR
            ");
        } else {
            // MySQL
            Schema::table('sales_orders', function (Blueprint $table) {
                $table->string('container_no')->nullable()->change();
            });
        }
    }
};
