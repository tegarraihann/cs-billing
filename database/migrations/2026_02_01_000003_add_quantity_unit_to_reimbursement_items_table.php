<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('reimbursement_items', function (Blueprint $table) {
            $table->decimal('quantity', 15, 2)->nullable()->after('amount');
            $table->string('unit', 50)->nullable()->after('quantity');
        });
    }

    public function down(): void
    {
        Schema::table('reimbursement_items', function (Blueprint $table) {
            $table->dropColumn(['quantity', 'unit']);
        });
    }
};
