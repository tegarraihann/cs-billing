<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            if (!Schema::hasColumn('sales_orders', 'cs_snapshot')) {
                $table->json('cs_snapshot')->nullable()->after('rejected_by');
            }

            if (!Schema::hasColumn('sales_orders', 'cs_snapshot_generated_at')) {
                $table->timestamp('cs_snapshot_generated_at')->nullable()->after('cs_snapshot');
            }
        });
    }

    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            if (Schema::hasColumn('sales_orders', 'cs_snapshot_generated_at')) {
                $table->dropColumn('cs_snapshot_generated_at');
            }

            if (Schema::hasColumn('sales_orders', 'cs_snapshot')) {
                $table->dropColumn('cs_snapshot');
            }
        });
    }
};

