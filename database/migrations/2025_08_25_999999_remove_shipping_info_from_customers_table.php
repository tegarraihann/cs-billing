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
        Schema::table('customers', function (Blueprint $table) {
            // Remove shipping/operational fields that belong to SO
            $table->dropColumn([
                'no', 
                'so_number', 
                'customer_code', 
                'consignee_shipper', 
                'awb_bl_number', 
                'cust_doc_name', 
                'type_qty', 
                'no_kont_pallet', 
                'pol_pod', 
                'eta', 
                'vendors'
            ]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            // Re-add the columns if rollback is needed
            $table->unsignedBigInteger('no')->default(0);
            $table->string('so_number');
            $table->string('customer_code');
            $table->string('consignee_shipper');
            $table->string('awb_bl_number');
            $table->string('cust_doc_name')->nullable();
            $table->string('type_qty')->nullable();
            $table->string('no_kont_pallet')->nullable();
            $table->string('pol_pod')->nullable();
            $table->date('eta')->nullable();
            $table->json('vendors')->nullable();
        });
    }
};