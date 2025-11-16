<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('other_incomes', function (Blueprint $table) {
            $table->string('reference_number')->nullable()->after('id');
            $table->foreignId('customer_id')->nullable()->after('reference_number')->constrained()->nullOnDelete();
            $table->string('customer_name')->nullable()->after('customer_id');
            $table->date('due_date')->nullable()->after('transaction_date');
            $table->enum('status', ['outstanding', 'partial', 'paid'])->default('outstanding')->after('notes');
            $table->decimal('paid_amount', 15, 2)->default(0)->after('amount');
            $table->decimal('outstanding_amount', 15, 2)->default(0)->after('paid_amount');
            $table->decimal('tax_adjustment_amount', 15, 2)->default(0)->after('outstanding_amount');
            $table->decimal('other_adjustment_amount', 15, 2)->default(0)->after('tax_adjustment_amount');
            $table->date('last_payment_date')->nullable()->after('status');
        });

        Schema::create('other_income_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('other_income_id')->constrained()->cascadeOnDelete();
            $table->date('payment_date');
            $table->enum('payment_method', ['bank', 'petty_cash'])->default('bank');
            $table->foreignId('bank_account_id')->nullable()->constrained()->nullOnDelete();
            $table->decimal('amount', 15, 2);
            $table->decimal('adjustment_amount', 15, 2)->default(0);
            $table->enum('adjustment_type', ['tax_expense', 'other_expense'])->nullable();
            $table->text('notes')->nullable();
            $table->foreignId('created_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamps();
        });

        Schema::dropIfExists('other_receivables');
    }

    public function down(): void
    {
        Schema::table('other_incomes', function (Blueprint $table) {
            $table->dropColumn('reference_number');
            $table->dropConstrainedForeignId('customer_id');
            $table->dropColumn([
                'customer_name',
                'due_date',
                'status',
                'paid_amount',
                'outstanding_amount',
                'tax_adjustment_amount',
                'other_adjustment_amount',
                'last_payment_date',
            ]);
        });

        Schema::dropIfExists('other_income_payments');
    }
};
