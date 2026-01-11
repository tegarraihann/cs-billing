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
        Schema::table('account_payable_components', function (Blueprint $table) {
            $table->decimal('vat_receivable_rate', 5, 2)->nullable()->after('related_items');
            $table->decimal('vat_receivable_amount', 15, 2)->nullable()->after('vat_receivable_rate');
            $table->timestamp('vat_receivable_posted_at')->nullable()->after('vat_receivable_amount');
            $table->foreignId('vat_receivable_account_id')
                ->nullable()
                ->constrained('chart_of_accounts')
                ->nullOnDelete()
                ->after('vat_receivable_posted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('account_payable_components', function (Blueprint $table) {
            $table->dropConstrainedForeignId('vat_receivable_account_id');
            $table->dropColumn([
                'vat_receivable_rate',
                'vat_receivable_amount',
                'vat_receivable_posted_at',
            ]);
        });
    }
};
