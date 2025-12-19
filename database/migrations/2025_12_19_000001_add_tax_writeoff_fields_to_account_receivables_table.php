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
        Schema::table('account_receivables', function (Blueprint $table) {
            $table->decimal('tax_writeoff_rate', 4, 2)->nullable()->after('account_id');
            $table->decimal('tax_writeoff_amount', 15, 2)->nullable()->after('tax_writeoff_rate');
            $table->timestamp('tax_writeoff_at')->nullable()->after('tax_writeoff_amount');
            $table->foreignId('tax_writeoff_account_id')->nullable()->after('tax_writeoff_at')
                ->constrained('chart_of_accounts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('account_receivables', function (Blueprint $table) {
            $table->dropForeign(['tax_writeoff_account_id']);
            $table->dropColumn([
                'tax_writeoff_rate',
                'tax_writeoff_amount',
                'tax_writeoff_at',
                'tax_writeoff_account_id',
            ]);
        });
    }
};
