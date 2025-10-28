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
        Schema::table('master_service_types', function (Blueprint $table) {
            $table->dropColumn(['name', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('master_service_types', function (Blueprint $table) {
            $table->string('name', 255)->after('code')->comment('Nama lengkap service type');
            $table->integer('sort_order')->default(0)->after('is_active')->comment('Urutan tampilan');
        });
    }
};
