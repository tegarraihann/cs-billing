<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Update existing sales order numbers to new format:
     * From: EWILOG2509001003 (old format)
     * To: EWILOG2509001001, EWILOG2509002002, EWILOG2509003003 (new format)
     */
    public function up(): void
    {
        // Get all sales orders with existing order numbers, ordered by creation date
        $salesOrders = DB::table('sales_orders')
            ->whereNotNull('order_number')
            ->orderBy('created_at', 'asc')
            ->get();

        if ($salesOrders->isEmpty()) {
            return;
        }

        // Group by year for processing
        $groupedByYear = $salesOrders->groupBy(function ($order) {
            $createdAt = \Carbon\Carbon::parse($order->created_at);
            return $createdAt->format('y'); // 2-digit year
        });

        foreach ($groupedByYear as $year => $yearOrders) {
            $counter = 1;
            
            foreach ($yearOrders as $order) {
                $createdAt = \Carbon\Carbon::parse($order->created_at);
                $month = $createdAt->format('m'); // 2-digit month
                
                // Generate new format: EWILOG + YY + MM + NNN + HHH
                // Both NNN (opening) and HHH (sequential) use the same counter
                $openingNumber = str_pad($counter, 3, '0', STR_PAD_LEFT);
                $sequentialNumber = str_pad($counter, 3, '0', STR_PAD_LEFT);
                
                $newOrderNumber = "EWILOG{$year}{$month}{$openingNumber}{$sequentialNumber}";
                
                // Update the order number
                DB::table('sales_orders')
                    ->where('id', $order->id)
                    ->update(['order_number' => $newOrderNumber]);
                
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
        DB::statement("SELECT 'WARNING: Cannot reverse sales order number migration without original data backup' as message");
    }
};
