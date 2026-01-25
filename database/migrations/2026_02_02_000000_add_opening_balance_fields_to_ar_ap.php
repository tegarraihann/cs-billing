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
            $table->dropForeign(['invoice_id']);
            $table->unsignedBigInteger('invoice_id')->nullable()->change();
            $table->boolean('is_opening')->default(false)->after('status');
            $table->string('source_so_number')->nullable()->after('sales_order_id');
            $table->date('opening_payment_date')->nullable()->after('due_date');
        });

        Schema::table('account_receivables', function (Blueprint $table) {
            $table->foreign('invoice_id')
                ->references('id')
                ->on('invoices')
                ->cascadeOnDelete();
        });

        Schema::table('account_payables', function (Blueprint $table) {
            $table->dropForeign(['sales_order_id']);
            $table->unsignedBigInteger('sales_order_id')->nullable()->change();
            $table->boolean('is_opening')->default(false)->after('status');
            $table->string('source_so_number')->nullable()->after('sales_order_id');
            $table->date('opening_payment_date')->nullable()->after('payment_due_date');
        });

        Schema::table('account_payables', function (Blueprint $table) {
            $table->foreign('sales_order_id')
                ->references('id')
                ->on('sales_orders')
                ->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('account_receivables', function (Blueprint $table) {
            $table->dropForeign(['invoice_id']);
            $table->dropColumn(['is_opening', 'source_so_number', 'opening_payment_date']);
            $table->unsignedBigInteger('invoice_id')->nullable(false)->change();
        });

        Schema::table('account_receivables', function (Blueprint $table) {
            $table->foreign('invoice_id')
                ->references('id')
                ->on('invoices')
                ->cascadeOnDelete();
        });

        Schema::table('account_payables', function (Blueprint $table) {
            $table->dropForeign(['sales_order_id']);
            $table->dropColumn(['is_opening', 'source_so_number', 'opening_payment_date']);
            $table->unsignedBigInteger('sales_order_id')->nullable(false)->change();
        });

        Schema::table('account_payables', function (Blueprint $table) {
            $table->foreign('sales_order_id')
                ->references('id')
                ->on('sales_orders')
                ->cascadeOnDelete();
        });
    }
};
