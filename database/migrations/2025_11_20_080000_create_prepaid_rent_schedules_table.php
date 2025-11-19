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
        Schema::create('prepaid_rent_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prepaid_rent_transaction_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('period_month');
            $table->unsignedSmallInteger('period_year');
            $table->decimal('amount', 15, 2);
            $table->foreignId('amortization_transaction_id')->nullable()->constrained('prepaid_rent_transactions')->nullOnDelete();
            $table->timestamp('posted_at')->nullable();
            $table->timestamps();

            $table->unique(['prepaid_rent_transaction_id', 'period_month', 'period_year'], 'prepaid_rent_schedule_unique_period');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prepaid_rent_schedules');
    }
};
