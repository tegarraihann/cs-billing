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
        Schema::table('employee_document_status', function (Blueprint $table) {
            $table->boolean('bpjs_kesehatan')->default(false)->after('npwp');
            $table->boolean('bpjs_ketenagakerjaan')->default(false)->after('bpjs_kesehatan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employee_document_status', function (Blueprint $table) {
            $table->dropColumn(['bpjs_kesehatan', 'bpjs_ketenagakerjaan']);
        });
    }
};
