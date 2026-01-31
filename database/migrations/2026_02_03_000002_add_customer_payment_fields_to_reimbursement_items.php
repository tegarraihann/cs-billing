<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reimbursement_items', function (Blueprint $table) {
            $table->decimal('customer_paid_amount', 15, 2)->default(0)->after('status');
            $table->decimal('customer_outstanding_amount', 15, 2)->default(0)->after('customer_paid_amount');
            $table->enum('customer_payment_status', ['outstanding', 'partial', 'paid'])->default('outstanding')->after('customer_outstanding_amount');
            $table->timestamp('customer_paid_at')->nullable()->after('customer_payment_status');
        });

        DB::statement("
            UPDATE reimbursement_items
            SET customer_paid_amount = 0,
                customer_outstanding_amount = amount * (CASE WHEN quantity IS NULL OR quantity = 0 THEN 1 ELSE quantity END),
                customer_payment_status = 'outstanding',
                customer_paid_at = NULL
        ");
    }

    public function down(): void
    {
        Schema::table('reimbursement_items', function (Blueprint $table) {
            $table->dropColumn([
                'customer_paid_amount',
                'customer_outstanding_amount',
                'customer_payment_status',
                'customer_paid_at',
            ]);
        });
    }
};
