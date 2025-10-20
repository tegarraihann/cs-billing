<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Seed default bank accounts (Mandiri and BCA)
        DB::table('bank_accounts')->insert([
            [
                'bank_name' => 'Mandiri',
                'account_number' => '122-00-12330539',
                'account_name' => 'Eshaka Wijaya Logistics',
                'swift_code' => 'BMRIIDJA',
                'branch' => 'KCP JAKARTA R.S.C.M',
                'currency' => 'IDR',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'bank_name' => 'BCA',
                'account_number' => '5445-974975',
                'account_name' => 'Eshaka Wijaya Logistics',
                'swift_code' => 'CENAIDJAXXX',
                'branch' => 'KCP CITRA 2 EXT',
                'currency' => 'IDR',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('bank_accounts')->whereIn('bank_name', ['Mandiri', 'BCA'])->delete();
    }
};