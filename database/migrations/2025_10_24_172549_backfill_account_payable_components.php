<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Backfill existing account payables with components
        $payables = AccountPayable::all();

        foreach ($payables as $payable) {
            // Skip if already has components
            if ($payable->components()->exists()) {
                continue;
            }

            // Determine component type based on vendor_name and context
            $componentType = 'vendor_payment'; // default

            if ($payable->vendor_name === 'Divisi Operational') {
                $componentType = 'operational_cost';
            }

            // Check if related to reimbursement by looking at related sales order
            if ($payable->salesOrder) {
                $hasReimbursement = \App\Models\ReimbursementItem::where('sales_order_id', $payable->sales_order_id)
                    ->whereNotNull('invoice_id')
                    ->exists();

                // If has reimbursement and is operational division, might be reimbursement
                if ($hasReimbursement && $payable->vendor_name === 'Divisi Operational') {
                    // Check invoice items to determine
                    $invoice = $payable->salesOrder->invoices()
                        ->whereHas('items', function ($q) {
                            $q->where('item_type', 'reimbursement');
                        })
                        ->first();

                    if ($invoice) {
                        // Has reimbursement items, keep as operational for now
                        // syncComponents will split them later
                    }
                }
            }

            // Create the component
            AccountPayableComponent::create([
                'account_payable_id' => $payable->id,
                'component_type' => $componentType,
                'description' => $payable->service_description,
                'amount' => $payable->amount,
                'paid_amount' => $payable->paid_amount,
                'outstanding_amount' => $payable->outstanding_amount,
                'status' => $payable->status,
                'due_date' => $payable->payment_due_date,
                'recipient_name' => $payable->vendor_name,
                'vendor_id' => $payable->vendor_id,
            ]);

            echo "Backfilled component for Account Payable ID: {$payable->id}\n";
        }

        echo "Backfill completed. Total payables processed: " . $payables->count() . "\n";
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove all components (optional, can be kept)
        AccountPayableComponent::truncate();
    }
};
