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
        Schema::table('reimbursement_items', function (Blueprint $table) {
            // Add vendor_id column after amount
            // nullable because reimbursement can be internal (no vendor) or external (with vendor)
            $table->unsignedBigInteger('vendor_id')->nullable()->after('amount');

            // Add foreign key constraint
            $table->foreign('vendor_id')
                  ->references('id')
                  ->on('vendors')
                  ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('reimbursement_items', function (Blueprint $table) {
            // Drop foreign key first
            $table->dropForeign(['vendor_id']);

            // Then drop column
            $table->dropColumn('vendor_id');
        });
    }
};
