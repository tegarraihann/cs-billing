<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('invoices', 'net_weight')) {
            return;
        }

        DB::statement('ALTER TABLE invoices MODIFY net_weight DECIMAL(12,4) NULL');
    }

    public function down(): void
    {
        if (!Schema::hasColumn('invoices', 'net_weight')) {
            return;
        }

        DB::statement('ALTER TABLE invoices MODIFY net_weight DECIMAL(10,4) NULL');
    }
};
