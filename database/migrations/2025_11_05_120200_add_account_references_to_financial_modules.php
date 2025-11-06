<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bank_accounts', function (Blueprint $table) {
            $table->foreignId('account_id')
                  ->nullable()
                  ->after('currency')
                  ->constrained('chart_of_accounts')
                  ->nullOnDelete();
        });

        Schema::table('petty_cash_balances', function (Blueprint $table) {
            $table->foreignId('account_id')
                  ->nullable()
                  ->after('notes')
                  ->constrained('chart_of_accounts')
                  ->nullOnDelete();
        });

        Schema::table('account_receivables', function (Blueprint $table) {
            $table->foreignId('account_id')
                  ->nullable()
                  ->after('outstanding_amount')
                  ->constrained('chart_of_accounts')
                  ->nullOnDelete();
        });

        Schema::table('account_payables', function (Blueprint $table) {
            $table->foreignId('account_id')
                  ->nullable()
                  ->after('outstanding_amount')
                  ->constrained('chart_of_accounts')
                  ->nullOnDelete();
        });

        // Map existing records to their default chart of account
        $mapping = [
            'bank_accounts' => [
                'Mandiri' => '1120',
                'BCA' => '1130',
            ],
            'petty_cash_balances' => '1110',
            'account_receivables' => '1200',
            'account_payables' => '2100',
        ];

        foreach ($mapping['bank_accounts'] as $bankName => $accountCode) {
            $accountId = DB::table('chart_of_accounts')
                ->where('account_code', $accountCode)
                ->value('id');

            if ($accountId) {
                DB::table('bank_accounts')
                    ->where('bank_name', $bankName)
                    ->update(['account_id' => $accountId]);
            }
        }

        foreach (['petty_cash_balances', 'account_receivables', 'account_payables'] as $table) {
            $accountCode = $mapping[$table];
            $accountId = DB::table('chart_of_accounts')
                ->where('account_code', $accountCode)
                ->value('id');

            if ($accountId) {
                DB::table($table)->update(['account_id' => $accountId]);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('account_payables', function (Blueprint $table) {
            $table->dropConstrainedForeignId('account_id');
        });

        Schema::table('account_receivables', function (Blueprint $table) {
            $table->dropConstrainedForeignId('account_id');
        });

        Schema::table('petty_cash_balances', function (Blueprint $table) {
            $table->dropConstrainedForeignId('account_id');
        });

        Schema::table('bank_accounts', function (Blueprint $table) {
            $table->dropConstrainedForeignId('account_id');
        });
    }
};
