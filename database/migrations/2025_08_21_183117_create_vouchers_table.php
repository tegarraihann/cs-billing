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
        Schema::create('vouchers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_order_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['payment', 'receipt']);
            $table->string('voucher_no');
            $table->date('date');
            $table->text('description');
            $table->decimal('amount', 15, 2);
            $table->decimal('total', 15, 2)->default(0);
            $table->enum('status', ['draft', 'released', 'approved'])->default('draft');
            
            // Approval fields
            $table->string('prepared_by')->nullable();
            $table->string('authorized_by')->nullable();
            $table->string('finance_by')->nullable();
            $table->string('receipt_by')->nullable();
            
            // Timestamps for status changes
            $table->timestamp('released_at')->nullable();
            $table->timestamp('approved_at')->nullable();
            
            $table->timestamps();
            
            // Indexes
            $table->index(['sales_order_id', 'type']);
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vouchers');
    }
};
