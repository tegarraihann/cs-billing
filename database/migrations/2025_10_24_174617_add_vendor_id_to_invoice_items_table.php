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
        Schema::table('invoice_items', function (Blueprint $table) {
            // Add vendor_id for operational costs and reimbursements
            // This allows assigning specific vendors to be paid for these items
            $table->foreignId('vendor_id')
                ->nullable()
                ->after('item_type')
                ->constrained('vendors')
                ->onDelete('set null')
                ->comment('Vendor to pay for this item (for operational_cost and reimbursement)');

            // Add index for performance
            $table->index(['vendor_id', 'item_type'], 'idx_vendor_item_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoice_items', function (Blueprint $table) {
            $table->dropIndex('idx_vendor_item_type');
            $table->dropForeign(['vendor_id']);
            $table->dropColumn('vendor_id');
        });
    }
};
