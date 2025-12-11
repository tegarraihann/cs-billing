<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('equipment_transactions', function (Blueprint $table) {
            $table->foreignId('pl_account_id')->nullable()->after('amount')->constrained('chart_of_accounts')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('equipment_transactions', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pl_account_id');
        });
    }
};
