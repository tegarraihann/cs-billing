<?php

use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        $accountReceivableModel = \App\Models\AccountReceivable::class;

        $accountReceivableModel::with('invoice')
            ->chunk(100, function ($receivables) {
                foreach ($receivables as $receivable) {
                    $receivable->syncComponentsFromInvoice($receivable->invoice);
                }
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        \App\Models\AccountReceivableComponent::query()->delete();
    }
};

