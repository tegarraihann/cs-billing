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
        Schema::table('customers', function (Blueprint $table) {
            // Partnership & Service Information (Simple Fields Approach - Opsi 1)
            $table->date('partnership_start_date')->nullable()->after('marketing_email');
            $table->json('service_types_available')->nullable()->after('partnership_start_date');
            $table->json('service_types_used')->nullable()->after('service_types_available');
            $table->json('current_active_services')->nullable()->after('service_types_used');
            $table->text('main_goods_description')->nullable()->after('current_active_services');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn([
                'partnership_start_date',
                'service_types_available',
                'service_types_used',
                'current_active_services',
                'main_goods_description'
            ]);
        });
    }
};
