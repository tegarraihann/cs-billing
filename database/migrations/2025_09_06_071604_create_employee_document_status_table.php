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
        Schema::create('employee_document_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->boolean('surat_lamaran')->default(false);
            $table->boolean('cv')->default(false);
            $table->boolean('akte_kelahiran')->default(false);
            $table->boolean('kartu_keluarga')->default(false);
            $table->boolean('surat_pengalaman_kerja')->default(false);
            $table->boolean('ktp_sim')->default(false);
            $table->boolean('skck')->default(false);
            $table->boolean('pas_foto')->default(false);
            $table->boolean('ijazah')->default(false);
            $table->boolean('surat_sehat')->default(false);
            $table->boolean('npwp')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_document_status');
    }
};
