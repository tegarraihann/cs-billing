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
        Schema::table('invoices', function (Blueprint $table) {
            $table->decimal('down_payment_amount', 15, 2)->default(0.00)->after('total');
            $table->date('down_payment_date')->nullable()->after('down_payment_amount');
            $table->text('down_payment_notes')->nullable()->after('down_payment_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn([
                'down_payment_amount',
                'down_payment_date',
                'down_payment_notes'
            ]);
        });
    }
};
