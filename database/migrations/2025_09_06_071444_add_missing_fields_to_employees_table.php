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
        Schema::table('employees', function (Blueprint $table) {
            // Add missing fields from Data Pribadi
            $table->string('kode_pos')->nullable()->after('provinsi_ktp');
            
            // Update field names to match requirement
            // Note: We'll keep existing field names and add new ones where needed
            $table->string('nomor_telepon_rumah')->nullable()->after('kode_pos'); // rename from nomor_telp_rumah
            
            // Emergency Contact fields
            $table->string('nama_emergency')->nullable()->after('linkedin');
            $table->string('hubungan_emergency')->nullable()->after('nama_emergency');
            $table->text('alamat_emergency')->nullable()->after('hubungan_emergency');
            $table->string('nomor_telepon_emergency')->nullable()->after('alamat_emergency');
            
            // Data Orang Tua - add missing fields
            $table->string('kode_pos_ortu')->nullable()->after('provinsi_orang_tua');
            
            // Data Gaji & Join
            $table->decimal('gaji_bulanan', 15, 2)->nullable()->after('posisi');
            $table->date('tanggal_join')->nullable()->after('gaji_bulanan'); // alias for tanggal_masuk
            
            // Metadata
            $table->string('created_by')->nullable()->after('keterangan');
            $table->enum('status_verifikasi', ['pending', 'verified', 'rejected'])->default('pending')->after('created_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn([
                'kode_pos',
                'nomor_telepon_rumah',
                'nama_emergency',
                'hubungan_emergency', 
                'alamat_emergency',
                'nomor_telepon_emergency',
                'kode_pos_ortu',
                'gaji_bulanan',
                'tanggal_join',
                'created_by',
                'status_verifikasi'
            ]);
        });
    }
};
