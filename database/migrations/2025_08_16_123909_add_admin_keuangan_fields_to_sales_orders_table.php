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
            // Admin Keuangan approval fields
            $table->timestamp('approved_at')->nullable()->after('released_by');
            $table->foreignId('approved_by')->nullable()->constrained('users')->after('approved_at');

            // Admin Keuangan rejection fields
            $table->timestamp('rejected_at')->nullable()->after('approved_by');
            $table->foreignId('rejected_by')->nullable()->constrained('users')->after('rejected_at');
            $table->text('rejection_reason')->nullable()->after('rejected_by');
        });

        // No enum changes needed - just allow new status values at application level
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            // Remove admin keuangan fields
            $table->dropColumn(['approved_at', 'approved_by', 'rejected_at', 'rejected_by', 'rejection_reason']);
        });
    }
};
