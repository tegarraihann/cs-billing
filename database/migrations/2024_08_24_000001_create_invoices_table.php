<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('invoice_number')->unique();
            $table->foreignId('sales_order_id')->constrained()->onDelete('cascade');
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->date('invoice_date');
            $table->integer('term_days')->default(30);
            $table->date('due_date');
            
            // Shipment Details
            $table->string('shipper')->nullable();
            $table->string('consignee')->nullable();
            $table->string('awb_bl_no')->nullable();
            $table->string('mawb_obl_no')->nullable();
            $table->decimal('gross_weight', 12, 4)->nullable();
            $table->string('volume')->nullable();
            $table->integer('no_of_packages')->nullable();
            $table->string('vessel')->nullable();
            $table->string('flight_voy')->nullable();
            $table->string('pol_pod')->nullable();
            $table->string('origin')->nullable();
            $table->string('destination')->nullable();
            $table->date('etd')->nullable();
            $table->date('eta')->nullable();
            $table->string('container_no')->nullable();
            $table->string('container_size')->nullable();
            $table->text('remarks')->nullable();
            
            // Billing
            $table->decimal('subtotal', 15, 2)->default(0);
            $table->decimal('total', 15, 2)->default(0);
            
            $table->enum('status', ['draft', 'sent', 'paid', 'overdue', 'cancelled'])->default('draft');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('invoices');
    }
};