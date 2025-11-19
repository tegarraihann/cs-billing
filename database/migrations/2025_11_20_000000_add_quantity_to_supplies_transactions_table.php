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
        Schema::table('supplies_transactions', function (Blueprint $table) {
            // Total barang terkait transaksi supplies (misal jumlah pcs)
            $table->decimal('quantity', 12, 2)->nullable()->after('amount');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('supplies_transactions', function (Blueprint $table) {
            $table->dropColumn('quantity');
        });
    }
};
