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
        Schema::table('petty_cash_transactions', function (Blueprint $table) {
            // Reference to expense template used
            $table->foreignId('template_id')->nullable()->after('category_id')->constrained('expense_templates');

            // Categorization method tracking
            $table->enum('categorization_method', ['template', 'keyword', 'manual'])->default('manual')->after('template_id');

            // Auto-generation tracking
            $table->boolean('auto_generated')->default(false)->after('categorization_method');
            $table->foreignId('invoice_id')->nullable()->after('auto_generated')->constrained('invoices');
            $table->foreignId('invoice_item_id')->nullable()->after('invoice_id')->constrained('invoice_items');

            // Add indexes for performance
            $table->index(['template_id', 'categorization_method']);
            $table->index(['auto_generated', 'invoice_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('petty_cash_transactions', function (Blueprint $table) {
            $table->dropForeign(['template_id']);
            $table->dropForeign(['invoice_id']);
            $table->dropForeign(['invoice_item_id']);
            $table->dropIndex(['template_id', 'categorization_method']);
            $table->dropIndex(['auto_generated', 'invoice_id']);
            $table->dropColumn([
                'template_id',
                'categorization_method',
                'auto_generated',
                'invoice_id',
                'invoice_item_id'
            ]);
        });
    }
};