<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        // Add package_unit to invoices table
        Schema::table('invoices', function (Blueprint $table) {
            $table->string('package_unit', 10)->default('BAG')->after('no_of_packages');
            $table->foreign('package_unit')->references('code')->on('master_package_units')->onUpdate('cascade');
        });

        // Add package_unit to sales_orders table
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->string('package_unit', 10)->default('BAG')->after('qty');
            $table->foreign('package_unit')->references('code')->on('master_package_units')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['package_unit']);
            $table->dropColumn('package_unit');
        });

        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropForeign(['package_unit']);
            $table->dropColumn('package_unit');
        });
    }
};