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
        Schema::create('employee_family_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employee_id')->constrained()->onDelete('cascade');
            $table->enum('hubungan_keluarga', ['Ayah', 'Ibu']);
            $table->string('nama_keluarga');
            $table->enum('jenis_kelamin_keluarga', ['L', 'P']);
            $table->string('tempat_lahir_keluarga');
            $table->date('tanggal_lahir_keluarga');
            $table->string('pendidikan_terakhir')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_family_members');
    }
};
