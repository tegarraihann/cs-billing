<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('sales_order_vendor_items', function (Blueprint $table) {
            $table->decimal('quantity', 8, 2)->nullable()->after('selling_amount');
            $table->string('unit')->nullable()->after('quantity');
        });

        if (!Schema::hasColumn('sales_orders', 'vendor_breakdown')) {
            return;
        }

        $orders = DB::table('sales_orders')
            ->select('id', 'vendor_breakdown')
            ->whereNotNull('vendor_breakdown')
            ->get();

        foreach ($orders as $order) {
            $raw = $order->vendor_breakdown;
            $items = is_string($raw) ? json_decode($raw, true) : $raw;
            if (!is_array($items)) {
                continue;
            }

            foreach ($items as $item) {
                if (!is_array($item) || empty($item['id'])) {
                    continue;
                }

                $quantity = isset($item['quantity']) && is_numeric($item['quantity'])
                    ? (float) $item['quantity']
                    : null;
                $unit = isset($item['unit']) && is_string($item['unit'])
                    ? trim($item['unit'])
                    : null;

                DB::table('sales_order_vendor_items')
                    ->where('id', $item['id'])
                    ->update([
                        'quantity' => $quantity,
                        'unit' => $unit,
                        'updated_at' => now(),
                    ]);
            }
        }
    }

    public function down(): void
    {
        Schema::table('sales_order_vendor_items', function (Blueprint $table) {
            $table->dropColumn(['quantity', 'unit']);
        });
    }
};
