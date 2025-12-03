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
        Schema::table('other_incomes', function (Blueprint $table) {
            $table->foreignId('pl_account_id')
                ->nullable()
                ->after('amount')
                ->constrained('chart_of_accounts')
                ->nullOnDelete();
        });

        Schema::table('general_expenses', function (Blueprint $table) {
            $table->foreignId('pl_account_id')
                ->nullable()
                ->after('status')
                ->constrained('chart_of_accounts')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('other_incomes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pl_account_id');
        });

        Schema::table('general_expenses', function (Blueprint $table) {
            $table->dropConstrainedForeignId('pl_account_id');
        });
    }
};
