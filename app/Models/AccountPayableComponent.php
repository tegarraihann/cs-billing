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
        'vat_receivable_rate',
        'vat_receivable_amount',
        'vat_receivable_posted_at',
        'vat_receivable_account_id',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'due_date' => 'date',
        'related_items' => 'array',
        'vat_receivable_rate' => 'decimal:2',
        'vat_receivable_amount' => 'decimal:2',
        'vat_receivable_posted_at' => 'datetime',
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

    public function isVatReimbursement(): bool
    {
        return $this->component_type === 'vat_reimbursement';
    }

    public function getVatSourceRate(): ?float
    {
        $relatedItems = is_array($this->related_items) ? $this->related_items : [];
        $rate = $relatedItems['vat_rate'] ?? null;

        if ($rate === null || $rate === '') {
            return null;
        }

        return (float) $rate;
    }

    public function isVatReceivableSourceComponent(): bool
    {
        $relatedItems = is_array($this->related_items) ? $this->related_items : [];
        $hasVatFlag = (bool) ($relatedItems['vat_reimbursement'] ?? false);
        $rate = $this->getVatSourceRate();

        return ($this->component_type === 'vat_reimbursement' || $hasVatFlag)
            && in_array($rate, [11.0, 1.1], true);
    }

    public function canPostVatReceivable(): bool
    {
        return $this->isVatReceivableSourceComponent()
            && $this->status === 'paid'
            && (float) ($this->outstanding_amount ?? 0) <= 0
            && $this->vat_receivable_posted_at === null;
    }

    // Get component label
    public function getComponentLabel(): string
    {
        return match ($this->component_type) {
            'vendor_payment' => 'Pembayaran Vendor',
            'operational_cost' => 'Biaya Operational',
            'reimbursement' => 'Reimbursement',
            'vat_reimbursement' => 'VAT Reimbursement',
            default => $this->component_type,
        };
    }
}
