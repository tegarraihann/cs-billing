<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->decimal('pph23_rate', 4, 2)->nullable()->after('vat_posted_account_id');
            $table->decimal('pph23_amount', 15, 2)->nullable()->after('pph23_rate');
            $table->timestamp('pph23_posted_at')->nullable()->after('pph23_amount');
            $table->unsignedBigInteger('pph23_posted_account_id')->nullable()->after('pph23_posted_at');
        });
    }

    public function down(): void
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn([
                'pph23_rate',
                'pph23_amount',
                'pph23_posted_at',
                'pph23_posted_account_id',
            ]);
        });
    }
};
