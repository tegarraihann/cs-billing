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
        Schema::create('other_incomes', function (Blueprint $table) {
            $table->id();
            $table->date('transaction_date');
            $table->string('category'); // 'Bunga Bank Mandiri', 'Bunga Bank BCA', 'Lainnya'
            $table->text('description');
            $table->decimal('amount', 15, 2);
            $table->text('notes')->nullable();
            $table->string('receipt_file')->nullable();
            $table->boolean('posted_to_profit_loss')->default(false);
            $table->timestamp('posted_at')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('approved_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();

            $table->index('transaction_date');
            $table->index('category');
            $table->index('posted_to_profit_loss');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_incomes');
    }
};
