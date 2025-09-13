<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Update existing invoice numbers to new format:
     * From: EWL2509001003 (old format)
     * To: EWIINV2509001001, EWIINV2509002002, EWIINV2509003003 (new format)
     */
    public function up(): void
    {
        // Get all invoices with existing invoice numbers, ordered by creation date
        $invoices = DB::table('invoices')
            ->whereNotNull('invoice_number')
            ->orderBy('created_at', 'asc')
            ->get();

        if ($invoices->isEmpty()) {
            return;
        }

        // Group by year for processing
        $groupedByYear = $invoices->groupBy(function ($invoice) {
            $createdAt = \Carbon\Carbon::parse($invoice->created_at);
            return $createdAt->format('y'); // 2-digit year
        });

        foreach ($groupedByYear as $year => $yearInvoices) {
            $counter = 1;
            
            foreach ($yearInvoices as $invoice) {
                $createdAt = \Carbon\Carbon::parse($invoice->created_at);
                $month = $createdAt->format('m'); // 2-digit month
                
                // Generate new format: EWIINV + YY + MM + NNN + HHH
                // Both NNN (opening) and HHH (sequential) use the same counter
                $openingNumber = str_pad($counter, 3, '0', STR_PAD_LEFT);
                $sequentialNumber = str_pad($counter, 3, '0', STR_PAD_LEFT);
                
                $newInvoiceNumber = "EWIINV{$year}{$month}{$openingNumber}{$sequentialNumber}";
                
                // Update the invoice number
                DB::table('invoices')
                    ->where('id', $invoice->id)
                    ->update(['invoice_number' => $newInvoiceNumber]);
                
                $counter++;
            }
        }
    }

    /**
     * Reverse the migrations.
     * Note: This is a one-way migration for data migration.
     * Reverse operation would require backing up original data first.
     */
    public function down(): void
    {
        // Cannot easily reverse this migration without backup
        // Log a warning instead
        DB::statement("SELECT 'WARNING: Cannot reverse invoice number migration without original data backup' as message");
    }
};
