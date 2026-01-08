<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('account_payables', function (Blueprint $table) {
            $table->decimal('vat_payable_rate', 5, 2)->nullable()->after('vat_receivable_account_id');
            $table->decimal('vat_payable_amount', 15, 2)->nullable()->after('vat_payable_rate');
            $table->timestamp('vat_payable_posted_at')->nullable()->after('vat_payable_amount');
            $table->foreignId('vat_payable_account_id')
                ->nullable()
                ->constrained('chart_of_accounts')
                ->nullOnDelete()
                ->after('vat_payable_posted_at');

            $table->decimal('pph23_payable_rate', 5, 2)->nullable()->after('vat_payable_account_id');
            $table->decimal('pph23_payable_amount', 15, 2)->nullable()->after('pph23_payable_rate');
            $table->timestamp('pph23_payable_posted_at')->nullable()->after('pph23_payable_amount');
            $table->foreignId('pph23_payable_account_id')
                ->nullable()
                ->constrained('chart_of_accounts')
                ->nullOnDelete()
                ->after('pph23_payable_posted_at');
        });
    }

    public function down(): void
    {
        Schema::table('account_payables', function (Blueprint $table) {
            $table->dropConstrainedForeignId('vat_payable_account_id');
            $table->dropColumn(['vat_payable_rate', 'vat_payable_amount', 'vat_payable_posted_at']);

            $table->dropConstrainedForeignId('pph23_payable_account_id');
            $table->dropColumn(['pph23_payable_rate', 'pph23_payable_amount', 'pph23_payable_posted_at']);
        });
    }
};
