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
            // Add item type to distinguish between billable items and operational costs
            $table->enum('item_type', ['billable', 'operational_cost'])
                  ->default('billable')
                  ->after('item_ref')
                  ->comment('Type of item: billable (shown to customer) or operational_cost (internal only)');

            // Flag to control visibility in customer invoice
            $table->boolean('include_in_customer_invoice')
                  ->default(true)
                  ->after('item_type')
                  ->comment('Whether this item should appear in customer invoice PDF');

            // Additional flag for hiding from customer view (redundant but explicit)
            $table->boolean('is_hidden_from_customer')
                  ->default(false)
                  ->after('include_in_customer_invoice')
                  ->comment('Explicitly hide this item from customer-facing documents');

            // Index for performance
            $table->index(['item_type', 'include_in_customer_invoice'], 'idx_item_visibility');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoice_items', function (Blueprint $table) {
            $table->dropIndex('idx_item_visibility');
            $table->dropColumn([
                'item_type',
                'include_in_customer_invoice',
                'is_hidden_from_customer'
            ]);
        });
    }
};
