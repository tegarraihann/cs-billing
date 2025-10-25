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
        Schema::create('account_receivable_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_receivable_id')->constrained()->onDelete('cascade');
            $table->string('component_type', 20); // main, debit_note, etc.
            $table->string('description')->nullable();
            $table->decimal('amount', 15, 2);
            $table->decimal('paid_amount', 15, 2)->default(0);
            $table->decimal('outstanding_amount', 15, 2);
            $table->enum('status', ['outstanding', 'partial', 'paid', 'overdue'])->default('outstanding');
            $table->date('due_date')->nullable();
            $table->timestamps();

            $table->index(['component_type', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_receivable_components');
    }
};

