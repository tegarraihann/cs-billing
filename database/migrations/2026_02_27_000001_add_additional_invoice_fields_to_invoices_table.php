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
        Schema::table('invoices', function (Blueprint $table) {
            $table->boolean('is_additional')->default(false)->after('invoice_type');
            $table->unsignedInteger('additional_sequence')->nullable()->after('is_additional');
            $table->unsignedBigInteger('base_invoice_id')->nullable()->after('additional_sequence');
            $table->text('additional_reason')->nullable()->after('base_invoice_id');

            $table->index(['sales_order_id', 'is_additional'], 'invoices_so_additional_idx');
            $table->index(['sales_order_id', 'additional_sequence'], 'invoices_so_additional_seq_idx');
            $table->foreign('base_invoice_id')
                ->references('id')
                ->on('invoices')
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['base_invoice_id']);
            $table->dropIndex('invoices_so_additional_idx');
            $table->dropIndex('invoices_so_additional_seq_idx');

            $table->dropColumn([
                'is_additional',
                'additional_sequence',
                'base_invoice_id',
                'additional_reason',
            ]);
        });
    }
};

