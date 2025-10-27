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
        Schema::create('master_service_types', function (Blueprint $table) {
            $table->id();
            $table->string('code', 50)->unique()->comment('Kode service type, contoh: OF/AF, HANDLING');
            $table->string('name', 255)->comment('Nama lengkap service type');
            $table->text('description')->nullable()->comment('Deskripsi service type');
            $table->boolean('is_active')->default(true)->comment('Status aktif/non-aktif');
            $table->integer('sort_order')->default(0)->comment('Urutan tampilan');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('master_service_types');
    }
};
