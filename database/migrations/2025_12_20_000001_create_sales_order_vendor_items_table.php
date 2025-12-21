<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('sales_order_vendor_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('sales_order_id')->constrained()->onDelete('cascade');
            $table->foreignId('vendor_id')->nullable()->constrained()->nullOnDelete();
            $table->string('vendor_name')->nullable();
            $table->string('vendor_bank_account')->nullable();
            $table->string('vendor_account_name')->nullable();
            $table->string('description')->nullable();
            $table->decimal('buying_amount', 15, 2)->default(0);
            $table->decimal('selling_amount', 15, 2)->default(0);
            $table->string('rcvd_inv')->nullable();
            $table->string('remarks', 500)->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();

            $table->index(['sales_order_id', 'sort_order'], 'so_vendor_items_order_idx');
        });

        // Backfill from existing vendor_breakdown JSON
        if (Schema::hasColumn('sales_orders', 'vendor_breakdown')) {
            $orders = DB::table('sales_orders')
                ->select('id', 'vendor_breakdown', 'created_by')
                ->whereNotNull('vendor_breakdown')
                ->get();

            foreach ($orders as $order) {
                $raw = $order->vendor_breakdown;
                $items = is_string($raw) ? json_decode($raw, true) : $raw;
                if (!is_array($items)) {
                    continue;
                }

                $normalized = [];
                foreach ($items as $index => $item) {
                    if (!is_array($item)) {
                        continue;
                    }

                    $vendorId = $item['vendor_id'] ?? null;
                    if (is_string($vendorId) && strtolower(trim($vendorId)) === 'internal') {
                        $vendorId = null;
                    }
                    if (is_numeric($vendorId)) {
                        $vendorId = (int) $vendorId;
                    } else {
                        $vendorId = null;
                    }

                    $insertId = DB::table('sales_order_vendor_items')->insertGetId([
                        'sales_order_id' => $order->id,
                        'vendor_id' => $vendorId,
                        'vendor_name' => $item['nama_vendor'] ?? null,
                        'vendor_bank_account' => $item['no_rekening'] ?? null,
                        'vendor_account_name' => $item['nama_rekening'] ?? null,
                        'description' => $item['description'] ?? null,
                        'buying_amount' => (float) ($item['buying_amount'] ?? 0),
                        'selling_amount' => (float) ($item['selling_amount'] ?? 0),
                        'rcvd_inv' => $item['rcvd_inv'] ?? null,
                        'remarks' => $item['remarks'] ?? null,
                        'sort_order' => (int) $index,
                        'created_by' => $order->created_by ?? null,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);

                    $item['id'] = $insertId;
                    $normalized[] = $item;
                }

                if (!empty($normalized)) {
                    DB::table('sales_orders')
                        ->where('id', $order->id)
                        ->update(['vendor_breakdown' => json_encode($normalized)]);
                }
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('sales_order_vendor_items');
    }
};
