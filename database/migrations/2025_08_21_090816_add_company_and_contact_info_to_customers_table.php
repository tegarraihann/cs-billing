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
            // Informasi Perusahaan/Perorangan
            $table->string('company_name')->nullable()->after('customer_code');
            $table->enum('company_type', ['PT', 'CV', 'Perorangan', 'Yayasan', 'Koperasi', 'Lainnya'])->nullable()->after('company_name');
            $table->text('company_address')->nullable()->after('company_type');
            $table->text('invoice_address')->nullable()->after('company_address');
            
            // Data Legalitas
            $table->string('nib')->nullable()->after('invoice_address');
            $table->string('npwp')->nullable()->after('nib');
            $table->string('ktp_number')->nullable()->after('npwp');
            
            // Data PIC (Person In Charge)
            $table->string('pic_name')->nullable()->after('ktp_number');
            $table->string('pic_phone')->nullable()->after('pic_name');
            $table->string('pic_email')->nullable()->after('pic_phone');
            
            // Data Marketing
            $table->string('marketing_name')->nullable()->after('pic_email');
            $table->string('marketing_phone')->nullable()->after('marketing_name');
            $table->string('marketing_email')->nullable()->after('marketing_phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn([
                'company_name', 'company_type', 'company_address', 'invoice_address',
                'nib', 'npwp', 'ktp_number',
                'pic_name', 'pic_phone', 'pic_email',
                'marketing_name', 'marketing_phone', 'marketing_email'
            ]);
        });
    }
};
