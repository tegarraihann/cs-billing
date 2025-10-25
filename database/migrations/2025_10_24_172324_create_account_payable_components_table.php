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
        Schema::create('account_payable_components', function (Blueprint $table) {
            $table->id();
            $table->foreignId('account_payable_id')->constrained()->onDelete('cascade');

            // Component identification
            $table->string('component_type', 30); // vendor_payment, operational_cost, reimbursement
            $table->string('description')->nullable();

            // Financial tracking
            $table->decimal('amount', 15, 2);
            $table->decimal('paid_amount', 15, 2)->default(0);
            $table->decimal('outstanding_amount', 15, 2);

            // Status per component
            $table->enum('status', ['unpaid', 'partial', 'paid'])->default('unpaid');

            // Due date per component (bisa berbeda)
            $table->date('due_date')->nullable();

            // Vendor/recipient specific info
            $table->string('recipient_name')->nullable(); // Nama divisi/vendor/karyawan
            $table->foreignId('vendor_id')->nullable()->constrained()->onDelete('set null');

            // Reference to related items
            $table->json('related_items')->nullable(); // IDs of reimbursement_items or invoice_items

            $table->timestamps();

            // Indexes for performance (with shorter names)
            $table->index(['component_type', 'status'], 'idx_component_type_status');
            $table->index(['account_payable_id', 'component_type'], 'idx_payable_component_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_payable_components');
    }
};
