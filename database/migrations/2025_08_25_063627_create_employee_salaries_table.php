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
        Schema::create('employee_salaries', function (Blueprint $table) {
            $table->id();
            $table->string('employee_name');
            $table->string('employee_id')->nullable(); // NIK/Employee ID
            $table->enum('division', ['customer_support', 'marketing', 'finance', 'operations', 'management']);
            $table->string('position');
            $table->decimal('basic_salary', 12, 2);
            $table->decimal('allowances', 12, 2)->default(0); // Tunjangan
            $table->decimal('deductions', 12, 2)->default(0); // Potongan
            $table->decimal('total_salary', 12, 2); // Total yang dibayar
            $table->date('salary_date'); // Tanggal pembayaran
            $table->string('period_month', 7); // Format: YYYY-MM
            $table->enum('status', ['draft', 'paid', 'cancelled'])->default('draft');
            $table->text('notes')->nullable();
            $table->json('details')->nullable(); // Store breakdown details
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('approved_by')->nullable()->constrained('users');
            $table->timestamp('approved_at')->nullable();
            $table->timestamps();
            
            $table->index(['period_month', 'status']);
            $table->index(['division', 'salary_date']);
            $table->index(['employee_name', 'period_month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employee_salaries');
    }
};
