<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('equity_entries', function (Blueprint $table) {
            $table->id();
            $table->string('entry_type', 50);
            $table->unsignedBigInteger('account_id')->nullable();
            $table->date('entry_date');
            $table->decimal('amount', 15, 2);
            $table->string('direction', 20)->default('increase');
            $table->boolean('is_opening')->default(false);
            $table->boolean('affects_bank')->default(false);
            $table->unsignedBigInteger('bank_account_id')->nullable();
            $table->unsignedBigInteger('bank_transaction_id')->nullable();
            $table->string('bank_transaction_type', 10)->nullable();
            $table->string('status', 30)->default('recorded');
            $table->date('settled_at')->nullable();
            $table->string('reference', 255)->nullable();
            $table->text('notes')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->index('entry_type');
            $table->index('entry_date');
            $table->index('account_id');
            $table->index('bank_account_id');
            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('equity_entries');
    }
};
