<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->date('paid_date')->nullable()->after('status');
            $table->foreignId('confirmed_by')->nullable()->constrained('users')->after('paid_date');
            $table->text('payment_notes')->nullable()->after('confirmed_by');
            $table->string('payment_method')->nullable()->after('payment_notes');
            $table->decimal('paid_amount', 15, 2)->default(0)->after('payment_method');
            $table->timestamp('payment_confirmed_at')->nullable()->after('paid_amount');
        });
    }

    public function down()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropForeign(['confirmed_by']);
            $table->dropColumn([
                'paid_date',
                'confirmed_by',
                'payment_notes',
                'payment_method',
                'paid_amount',
                'payment_confirmed_at'
            ]);
        });
    }
};