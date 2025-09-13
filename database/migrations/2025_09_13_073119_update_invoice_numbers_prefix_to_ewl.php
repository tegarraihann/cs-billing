<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Update invoice numbers from EWIINV prefix to EWL prefix
     * From: EWIINV2509001001 
     * To: EWL2509001001
     */
    public function up(): void
    {
        // Update all invoice numbers that start with EWIINV to EWL
        DB::table('invoices')
            ->where('invoice_number', 'LIKE', 'EWIINV%')
            ->update([
                'invoice_number' => DB::raw("REPLACE(invoice_number, 'EWIINV', 'EWL')")
            ]);
    }

    /**
     * Reverse the migrations.
     * Revert EWL prefix back to EWIINV
     */
    public function down(): void
    {
        // Revert EWL back to EWIINV (only for the new format, not old EWL format)
        DB::table('invoices')
            ->where('invoice_number', 'LIKE', 'EWL25%') // Only new format (year 25)
            ->whereRaw('LENGTH(invoice_number) = 13') // Ensure new format length
            ->update([
                'invoice_number' => DB::raw("REPLACE(invoice_number, 'EWL', 'EWIINV')")
            ]);
    }
};
