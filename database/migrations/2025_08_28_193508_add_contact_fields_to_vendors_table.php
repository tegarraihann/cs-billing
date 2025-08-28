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
        Schema::table('vendors', function (Blueprint $table) {
            $table->string('pic')->nullable()->after('nama_vendor');
            $table->string('no_hp')->nullable()->after('pic');
            $table->string('email')->nullable()->after('no_hp');
            $table->string('no_kantor')->nullable()->after('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropColumn(['pic', 'no_hp', 'email', 'no_kantor']);
        });
    }
};
