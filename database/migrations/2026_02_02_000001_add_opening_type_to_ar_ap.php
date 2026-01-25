<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('account_receivables', function (Blueprint $table) {
            $table->string('opening_type', 32)->default('main')->after('is_opening');
            $table->index(['is_opening', 'opening_type']);
        });

        Schema::table('account_payables', function (Blueprint $table) {
            $table->string('opening_type', 32)->default('main')->after('is_opening');
            $table->index(['is_opening', 'opening_type']);
        });
    }

    public function down(): void
    {
        Schema::table('account_receivables', function (Blueprint $table) {
            $table->dropIndex(['is_opening', 'opening_type']);
            $table->dropColumn('opening_type');
        });

        Schema::table('account_payables', function (Blueprint $table) {
            $table->dropIndex(['is_opening', 'opening_type']);
            $table->dropColumn('opening_type');
        });
    }
};
