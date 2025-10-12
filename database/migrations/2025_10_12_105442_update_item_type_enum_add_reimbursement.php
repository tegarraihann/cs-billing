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
        // Update the enum to include 'reimbursement'
        DB::statement("ALTER TABLE invoice_items MODIFY COLUMN item_type ENUM('billable', 'operational_cost', 'reimbursement') DEFAULT 'billable'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert back to original enum
        DB::statement("ALTER TABLE invoice_items MODIFY COLUMN item_type ENUM('billable', 'operational_cost') DEFAULT 'billable'");
    }
};