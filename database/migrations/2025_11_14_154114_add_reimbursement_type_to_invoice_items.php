<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasColumn('invoice_items', 'item_type')) {
            DB::statement("
                ALTER TABLE invoice_items
                MODIFY item_type ENUM('billable', 'operational_cost', 'reimbursement')
                    DEFAULT 'billable'
                    COMMENT 'Type of item: billable (customer), operational_cost (internal), reimbursement'
            ");

            DB::statement("
                UPDATE invoice_items
                SET item_type = 'reimbursement'
                WHERE item_ref REGEXP '^(reimb|reimbursement)'
                  AND item_type <> 'reimbursement'
            ");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('invoice_items', 'item_type')) {
            DB::statement("
                ALTER TABLE invoice_items
                MODIFY item_type ENUM('billable', 'operational_cost')
                    DEFAULT 'billable'
                    COMMENT 'Type of item: billable (shown to customer) or operational_cost (internal only)'
            ");

            DB::statement("
                UPDATE invoice_items
                SET item_type = 'billable'
                WHERE item_type = 'reimbursement'
            ");
        }
    }
};
