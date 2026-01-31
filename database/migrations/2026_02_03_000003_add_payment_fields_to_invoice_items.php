<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoice_items', function (Blueprint $table) {
            if (!Schema::hasColumn('invoice_items', 'paid_amount')) {
                $table->decimal('paid_amount', 15, 2)->default(0)->after('amount');
            }
            if (!Schema::hasColumn('invoice_items', 'outstanding_amount')) {
                $table->decimal('outstanding_amount', 15, 2)->default(0)->after('paid_amount');
            }
            if (!Schema::hasColumn('invoice_items', 'payment_status')) {
                $table->string('payment_status', 20)->default('outstanding')->after('outstanding_amount');
            }
            if (!Schema::hasColumn('invoice_items', 'paid_at')) {
                $table->timestamp('paid_at')->nullable()->after('payment_status');
            }
        });

        DB::table('invoice_items')->update([
            'paid_amount' => 0,
            'outstanding_amount' => DB::raw('COALESCE(amount, 0)'),
            'payment_status' => 'outstanding',
            'paid_at' => null,
        ]);
    }

    public function down(): void
    {
        Schema::table('invoice_items', function (Blueprint $table) {
            if (Schema::hasColumn('invoice_items', 'paid_at')) {
                $table->dropColumn('paid_at');
            }
            if (Schema::hasColumn('invoice_items', 'payment_status')) {
                $table->dropColumn('payment_status');
            }
            if (Schema::hasColumn('invoice_items', 'outstanding_amount')) {
                $table->dropColumn('outstanding_amount');
            }
            if (Schema::hasColumn('invoice_items', 'paid_amount')) {
                $table->dropColumn('paid_amount');
            }
        });
    }
};
