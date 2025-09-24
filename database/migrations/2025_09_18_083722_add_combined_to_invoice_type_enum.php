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
        if (DB::getDriverName() === 'mysql') {
            // MySQL: Use original MODIFY syntax
            DB::statement("ALTER TABLE invoices MODIFY COLUMN invoice_type ENUM('main', 'reimbursement', 'combined') DEFAULT 'main'");
        } else {
            // PostgreSQL: Skip enum modification, just allow new values at application level
            // Or change to string if needed
            Schema::table('invoices', function (Blueprint $table) {
                // If column doesn't exist as string, change it
                if (Schema::hasColumn('invoices', 'invoice_type')) {
                    $table->string('invoice_type')->default('main')->change();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (DB::getDriverName() === 'mysql') {
            DB::statement("ALTER TABLE invoices MODIFY COLUMN invoice_type ENUM('main', 'reimbursement') DEFAULT 'main'");
        } else {
            // PostgreSQL: Revert to original if needed
            Schema::table('invoices', function (Blueprint $table) {
                $table->string('invoice_type')->default('main')->change();
            });
        }
    }
};
