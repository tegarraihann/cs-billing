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
        Schema::create('sales_orders', function (Blueprint $table) {
            $table->id();
            
            // SO Information
            $table->string('so_number')->unique();
            $table->date('so_date');
            
            // Customer Information (can be linked to existing customer or standalone)
            $table->foreignId('customer_id')->nullable()->constrained()->onDelete('set null');
            $table->string('customer_name');
            $table->string('customer_code')->nullable();
            $table->text('customer_address');
            $table->string('customer_phone')->nullable();
            $table->string('customer_email')->nullable();
            
            // Shipping Information
            $table->string('consignee_shipper');
            $table->text('shipping_address');
            $table->string('awb_bl_number')->nullable();
            $table->string('vessel_flight')->nullable();
            $table->date('etd')->nullable(); // Estimated Time of Departure
            $table->date('eta')->nullable(); // Estimated Time of Arrival
            $table->string('pol_pod')->nullable(); // Port of Loading / Port of Discharge
            $table->string('no_kont_pallet')->nullable();
            
            // Service Details
            $table->text('service_description');
            $table->string('commodity')->nullable();
            $table->string('package_type')->nullable();
            $table->integer('qty')->nullable();
            $table->string('weight_volume')->nullable();
            
            // Pricing
            $table->decimal('rate', 15, 2)->nullable();
            $table->string('rate_unit')->nullable(); // per CBM, per TON, etc
            $table->decimal('total_amount', 15, 2);
            $table->string('currency', 3)->default('IDR');
            
            // Additional Charges
            $table->json('additional_charges')->nullable(); // [{name, amount, currency}]
            
            // Terms and Conditions
            $table->text('payment_terms')->nullable();
            $table->text('special_instructions')->nullable();
            $table->text('terms_conditions')->nullable();
            
            // Status and Tracking
            $table->enum('status', ['draft', 'sent', 'confirmed', 'cancelled'])->default('draft');
            $table->timestamp('sent_at')->nullable();
            $table->timestamp('confirmed_at')->nullable();
            
            // Created by (CS Admin)
            $table->foreignId('created_by')->constrained('users');
            $table->timestamp('last_modified_at')->nullable();
            
            $table->timestamps();
            
            $table->index(['so_number', 'customer_code', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_orders');
    }
};
