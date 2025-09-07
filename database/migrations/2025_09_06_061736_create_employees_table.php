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
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('employee_id')->unique();
            
            // Section 1: Data Pribadi
            $table->string('nama');
            $table->string('tempat_lahir');
            $table->date('tanggal_lahir');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan']);
            $table->string('agama');
            $table->string('suku_bangsa');
            $table->string('kewarganegaraan')->default('Indonesia');
            $table->text('alamat_ktp');
            $table->string('rt_ktp');
            $table->string('rw_ktp');
            $table->string('kelurahan_ktp');
            $table->string('kecamatan_ktp');
            $table->string('kota_ktp');
            $table->string('provinsi_ktp');
            $table->string('nomor_telp_rumah')->nullable();
            $table->string('nomor_hp');
            $table->string('email')->unique();
            $table->string('instagram')->nullable();
            $table->string('linkedin')->nullable();
            
            // Section 2: Orang Tua
            $table->text('alamat_orang_tua')->nullable();
            $table->string('rt_orang_tua')->nullable();
            $table->string('rw_orang_tua')->nullable();
            $table->string('kelurahan_orang_tua')->nullable();
            $table->string('kecamatan_orang_tua')->nullable();
            $table->string('kota_orang_tua')->nullable();
            $table->string('provinsi_orang_tua')->nullable();
            $table->string('nomor_telp_orang_tua')->nullable();
            $table->string('nomor_hp_orang_tua')->nullable();
            
            // Additional fields
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->boolean('is_active')->default(true);
            $table->date('tanggal_masuk')->nullable();
            $table->string('posisi')->nullable();
            $table->text('keterangan')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
