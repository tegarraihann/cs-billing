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
        Schema::create('account_receivables', function (Blueprint $table) {
            $table->id();
            
            // Reference to Invoice
            $table->foreignId('invoice_id')->constrained()->onDelete('cascade');
            
            // Reference to Customer  
            $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            $table->string('customer_name'); // Backup customer name
            
            // Reference to Sales Order
            $table->foreignId('sales_order_id')->nullable()->constrained()->onDelete('set null');
            
            // Invoice Details
            $table->string('invoice_number');
            $table->date('invoice_date');
            $table->date('due_date')->nullable(); // Calculated from payment terms
            
            // Amount Information
            $table->decimal('invoice_amount', 15, 2); // Original invoice amount
            $table->decimal('paid_amount', 15, 2)->default(0); // Amount already paid
            $table->decimal('outstanding_amount', 15, 2); // Remaining amount
            
            // Status
            $table->enum('status', ['outstanding', 'partial', 'paid', 'overdue'])->default('outstanding');
            
            // Payment Terms (flexible for future)
            $table->integer('payment_terms_days')->nullable(); // NET 30, NET 60, etc
            $table->string('payment_terms_text')->nullable(); // Custom payment terms
            
            // Tracking
            $table->timestamp('last_payment_date')->nullable();
            $table->integer('days_overdue')->default(0);
            
            // Notes
            $table->text('notes')->nullable();
            
            // System fields
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            
            // Indexes
            $table->index(['status', 'due_date']);
            $table->index(['customer_id', 'status']);
            $table->index(['invoice_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_receivables');
    }
};
