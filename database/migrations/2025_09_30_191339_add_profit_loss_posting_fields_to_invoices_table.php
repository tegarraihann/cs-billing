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
            $table->boolean('posted_to_profit_loss')->default(false)->after('status');
            $table->timestamp('posted_to_profit_loss_at')->nullable()->after('posted_to_profit_loss');
            $table->foreignId('posted_by')->nullable()->constrained('users')->after('posted_to_profit_loss_at');
            $table->json('profit_loss_entries')->nullable()->after('posted_by'); // Store entry IDs for reference

            $table->index('posted_to_profit_loss');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['posted_by']);
            $table->dropIndex(['posted_to_profit_loss']);
            $table->dropColumn([
                'posted_to_profit_loss',
                'posted_to_profit_loss_at',
                'posted_by',
                'profit_loss_entries'
            ]);
        });
    }
};
