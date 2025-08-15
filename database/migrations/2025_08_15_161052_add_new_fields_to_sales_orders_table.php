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
            // Rename dan update existing columns
            $table->string('order_number')->nullable()->after('so_number'); // ORDER NUMB
            $table->string('shipper')->nullable()->after('consignee_shipper'); // SHIPPER
            $table->string('bl_awb')->nullable()->after('awb_bl_number'); // BL/AWB
            $table->string('liner')->nullable()->after('vessel_flight'); // LINER  
            $table->string('vessel')->nullable()->after('liner'); // VESSEL
            $table->string('aju')->nullable()->after('eta'); // AJU
            $table->date('sppb_date')->nullable()->after('aju'); // SPPB DATE
            $table->string('shipment_type')->nullable()->after('sppb_date'); // SHIPMENT TYPE
            $table->string('gudang_utc')->nullable()->after('pol_pod'); // GUDANG/UTC
            $table->string('party_lcl')->nullable()->after('gudang_utc'); // PARTY/LCL
            $table->string('prepared_by')->nullable()->after('party_lcl'); // PREPARED BY
            $table->decimal('exchange_rate', 10, 4)->nullable()->after('prepared_by'); // EXCHANGE RATE
            
            // JENIS BIAYA fields
            $table->string('jenis_biaya')->nullable()->after('exchange_rate'); // JENIS BIAYA dropdown
            $table->decimal('buying', 15, 2)->nullable()->after('jenis_biaya'); // BUYING
            $table->decimal('selling', 15, 2)->nullable()->after('buying'); // SELLING
            $table->decimal('revenue', 15, 2)->nullable()->after('selling'); // REVENUE
            
            // Additional fields
            $table->text('remarks')->nullable()->after('revenue'); // REMARKS
            $table->text('goods')->nullable()->after('remarks'); // GOODS
            $table->string('container_no')->nullable()->after('goods'); // CONTAINER NO
            $table->string('invoice_number')->nullable()->after('container_no'); // INVOICE NUMB
            $table->date('invoice_date')->nullable()->after('invoice_number'); // INVOICE DATE
            $table->string('top')->nullable()->after('invoice_date'); // T.O.P (Terms of Payment)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropColumn([
                'order_number',
                'shipper',
                'bl_awb',
                'liner',
                'vessel',
                'aju',
                'sppb_date',
                'shipment_type',
                'gudang_utc',
                'party_lcl',
                'prepared_by',
                'exchange_rate',
                'jenis_biaya',
                'buying',
                'selling',
                'revenue',
                'remarks',
                'goods',
                'container_no',
                'invoice_number',
                'invoice_date',
                'top'
            ]);
        });
    }
};
