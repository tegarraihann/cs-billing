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
        Schema::create('simple_category_rules', function (Blueprint $table) {
            $table->id();
            $table->string('keyword', 50);
            $table->foreignId('category_id')->constrained('petty_cash_categories');
            $table->integer('weight')->default(10);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['keyword', 'is_active']);
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('simple_category_rules');
    }
};