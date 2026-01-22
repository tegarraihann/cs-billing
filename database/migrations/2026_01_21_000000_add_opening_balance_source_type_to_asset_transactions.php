<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE supplies_transactions MODIFY COLUMN source_type ENUM('bank','petty_cash','other','opening_balance') NOT NULL DEFAULT 'other'");
        DB::statement("ALTER TABLE prepaid_rent_transactions MODIFY COLUMN source_type ENUM('bank','petty_cash','other','opening_balance') NOT NULL DEFAULT 'other'");
        DB::statement("ALTER TABLE equipment_transactions MODIFY COLUMN source_type ENUM('bank','petty_cash','other','opening_balance') NOT NULL DEFAULT 'other'");
    }

    public function down(): void
    {
        DB::statement("ALTER TABLE supplies_transactions MODIFY COLUMN source_type ENUM('bank','petty_cash','other') NOT NULL DEFAULT 'other'");
        DB::statement("ALTER TABLE prepaid_rent_transactions MODIFY COLUMN source_type ENUM('bank','petty_cash','other') NOT NULL DEFAULT 'other'");
        DB::statement("ALTER TABLE equipment_transactions MODIFY COLUMN source_type ENUM('bank','petty_cash','other') NOT NULL DEFAULT 'other'");
    }
};
