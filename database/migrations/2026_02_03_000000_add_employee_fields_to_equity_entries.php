<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('equity_entries', function (Blueprint $table) {
            $table->string('employee_name', 255)->nullable()->after('entry_type');
            $table->date('payment_date')->nullable()->after('entry_date');
        });
    }

    public function down(): void
    {
        Schema::table('equity_entries', function (Blueprint $table) {
            $table->dropColumn(['employee_name', 'payment_date']);
        });
    }

};
