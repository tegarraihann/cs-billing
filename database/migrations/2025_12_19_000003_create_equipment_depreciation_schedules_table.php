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
        Schema::create('equipment_depreciation_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_transaction_id')
                ->constrained('equipment_transactions')
                ->cascadeOnDelete();
            $table->date('schedule_date');
            $table->decimal('amount', 15, 2);
            $table->timestamp('posted_at')->nullable();
            $table->foreignId('posted_transaction_id')->nullable()
                ->constrained('equipment_transactions')
                ->nullOnDelete();
            $table->timestamps();

            $table->unique(['equipment_transaction_id', 'schedule_date'], 'equipment_depr_schedule_unique');
            $table->index(['schedule_date', 'posted_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_depreciation_schedules');
    }
};
