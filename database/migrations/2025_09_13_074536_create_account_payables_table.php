<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('account_payables', function (Blueprint $table) {
            $table->id();
            
            // Reference to Sales Order (source of vendor breakdown)
            $table->foreignId('sales_order_id')->constrained()->onDelete('cascade');
            
            // Reference to Vendor
            $table->foreignId('vendor_id')->nullable()->constrained()->onDelete('set null');
            $table->string('vendor_name'); // Backup vendor name
            
            // Vendor Invoice Information
            $table->string('vendor_invoice_number')->nullable(); // Invoice from vendor (RCVD INV)
            $table->date('vendor_invoice_date')->nullable();
            
            // Service Details
            $table->string('service_description'); // From vendor breakdown description
            $table->text('service_remarks')->nullable(); // From vendor breakdown remarks
            
            // Amount Information  
            $table->decimal('amount', 15, 2); // Buying amount from vendor breakdown
            $table->decimal('paid_amount', 15, 2)->default(0); // Amount already paid
            $table->decimal('outstanding_amount', 15, 2); // Remaining amount
            
            // Status
            $table->enum('status', ['unpaid', 'partial', 'paid'])->default('unpaid');
            
            // Payment Information
            $table->date('payment_due_date')->nullable(); // When payment is due
            $table->date('payment_date')->nullable(); // When payment was made
            $table->string('payment_method')->nullable(); // Transfer, Cash, etc
            $table->text('payment_notes')->nullable();
            
            // Vendor Bank Details (for payment reference)
            $table->string('vendor_bank_account')->nullable();
            $table->string('vendor_account_name')->nullable();
            
            // Tracking
            $table->integer('days_overdue')->default(0);
            
            // System fields
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('paid_by')->nullable()->constrained('users'); // Who processed payment
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'payment_due_date']);
            $table->index(['vendor_id', 'status']);
            $table->index(['sales_order_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_payables');
    }
};
