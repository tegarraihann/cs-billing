<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('account_payable_notes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sales_order_id')->nullable();
            $table->unsignedBigInteger('account_payable_id')->nullable();
            $table->unsignedBigInteger('component_id')->nullable();
            $table->string('source_type')->nullable();
            $table->text('note');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->index('sales_order_id');
            $table->index('account_payable_id');
            $table->index('component_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('account_payable_notes');
    }
};
