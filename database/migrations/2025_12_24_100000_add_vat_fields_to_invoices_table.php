<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->decimal('vat_rate', 5, 2)->nullable()->after('down_payment_notes');
            $table->decimal('vat_amount', 15, 2)->default(0)->after('vat_rate');
            $table->timestamp('vat_posted_at')->nullable()->after('vat_amount');
            $table->unsignedBigInteger('vat_posted_account_id')->nullable()->after('vat_posted_at');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn([
                'vat_rate',
                'vat_amount',
                'vat_posted_at',
                'vat_posted_account_id',
            ]);
        });
    }
};
