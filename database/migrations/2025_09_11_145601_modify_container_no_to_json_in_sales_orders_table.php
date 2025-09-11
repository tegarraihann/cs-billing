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
        // First, convert existing string data to JSON format
        DB::statement("UPDATE sales_orders SET container_no = CASE 
            WHEN container_no IS NULL THEN NULL
            WHEN container_no = '' THEN NULL
            ELSE JSON_ARRAY(container_no)
            END");
            
        Schema::table('sales_orders', function (Blueprint $table) {
            // Modify container_no from VARCHAR to JSON to support multiple containers
            $table->json('container_no')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            // Rollback to VARCHAR if needed
            $table->string('container_no')->nullable()->change();
        });
    }
};
