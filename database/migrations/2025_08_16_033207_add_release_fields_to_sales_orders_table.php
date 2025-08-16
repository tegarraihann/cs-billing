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
        Schema::table('sales_orders', function (Blueprint $table) {
            // Add release tracking fields
            $table->timestamp('released_at')->nullable()->after('status');
            $table->foreignId('released_by')->nullable()->constrained('users')->after('released_at');
            
            // Update status enum to include 'released'
            $table->enum('status', ['draft', 'sent', 'confirmed', 'cancelled', 'released'])->default('draft')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            // Remove release tracking fields
            $table->dropColumn(['released_at', 'released_by']);
            
            // Revert status enum to original values
            $table->enum('status', ['draft', 'sent', 'confirmed', 'cancelled'])->default('draft')->change();
        });
    }
};
