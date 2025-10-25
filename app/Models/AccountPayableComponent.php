<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountPayableComponent extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_payable_id',
        'component_type',
        'description',
        'amount',
        'paid_amount',
        'outstanding_amount',
        'status',
        'due_date',
        'recipient_name',
        'vendor_id',
        'related_items',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'due_date' => 'date',
        'related_items' => 'array',
    ];

    // Relationships
    public function accountPayable(): BelongsTo
    {
        return $this->belongsTo(AccountPayable::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    // Helper methods to check component type
    public function isVendorPayment(): bool
    {
        return $this->component_type === 'vendor_payment';
    }

    public function isOperationalCost(): bool
    {
        return $this->component_type === 'operational_cost';
    }

    public function isReimbursement(): bool
    {
        return $this->component_type === 'reimbursement';
    }

    // Get component label
    public function getComponentLabel(): string
    {
        return match ($this->component_type) {
            'vendor_payment' => 'Pembayaran Vendor',
            'operational_cost' => 'Biaya Operational',
            'reimbursement' => 'Reimbursement',
            default => $this->component_type,
        };
    }
}
