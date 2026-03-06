<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_id',
        'description',
        'quantity',
        'unit',
        'rate',
        'currency',
        'amount',
        'paid_amount',
        'outstanding_amount',
        'payment_status',
        'paid_at',
        'item_ref',
        'item_type',
        'vendor_id',
        'include_in_customer_invoice',
        'is_hidden_from_customer'
    ];

    protected $casts = [
        'quantity' => 'decimal:2',
        'rate' => 'decimal:2',
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'paid_at' => 'datetime',
        'include_in_customer_invoice' => 'boolean',
        'is_hidden_from_customer' => 'boolean'
    ];

    protected static function booted()
    {
        static::creating(function (InvoiceItem $item) {
            if ($item->paid_amount === null) {
                $item->paid_amount = 0;
            }
            if ($item->outstanding_amount === null) {
                $amount = $item->amount ?? 0;
                $item->outstanding_amount = $amount;
            }
            if (empty($item->payment_status)) {
                $item->payment_status = 'outstanding';
            }
        });
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function vendor()
    {
        return $this->belongsTo(Vendor::class);
    }

    // Scopes for filtering by item type
    public function scopeBillable($query)
    {
        return $query->where('item_type', 'billable');
    }

    public function scopeOperationalCost($query)
    {
        return $query->where('item_type', 'operational_cost');
    }

    public function scopeReimbursement($query)
    {
        return $query->where('item_type', 'reimbursement');
    }

    public function scopeCustomerVisible($query)
    {
        return $query->where('include_in_customer_invoice', true)
                    ->where('is_hidden_from_customer', false);
    }

    public function scopeHiddenFromCustomer($query)
    {
        return $query->where(function($q) {
            $q->where('include_in_customer_invoice', false)
              ->orWhere('is_hidden_from_customer', true);
        });
    }

    // Helper methods
    public function isBillable(): bool
    {
        return $this->item_type === 'billable';
    }

    public function isOperationalCost(): bool
    {
        return $this->item_type === 'operational_cost';
    }

    public function isReimbursement(): bool
    {
        return $this->item_type === 'reimbursement';
    }

    public function isVisibleToCustomer(): bool
    {
        return $this->include_in_customer_invoice && !$this->is_hidden_from_customer;
    }

    public function isHiddenFromCustomer(): bool
    {
        return !$this->include_in_customer_invoice || $this->is_hidden_from_customer;
    }

    public function getLineTotal(): float
    {
        $quantity = (float) ($this->quantity ?? 1);
        $rate = (float) ($this->rate ?? $this->amount ?? 0);
        $amount = (float) ($this->amount ?? ($rate * $quantity));
        return $amount;
    }

    public function updateItemPayment(float $amount, ?string $paidAt = null, ?string $notes = null): void
    {
        $lineTotal = $this->getLineTotal();
        $currentPaid = (float) ($this->paid_amount ?? 0);
        $newPaid = max(0, $currentPaid + $amount);
        if ($newPaid > $lineTotal) {
            $newPaid = $lineTotal;
        }

        $outstanding = max(0, $lineTotal - $newPaid);
        $status = 'outstanding';
        if ($outstanding <= 0.01) {
            $status = 'paid';
            $outstanding = 0;
        } elseif ($newPaid > 0) {
            $status = 'partial';
        }

        $this->paid_amount = $newPaid;
        $this->outstanding_amount = $outstanding;
        $this->payment_status = $status;
        $this->paid_at = $status === 'paid'
            ? ($paidAt ? \Carbon\Carbon::parse($paidAt) : now())
            : $this->paid_at;
        // Keep item_ref immutable to preserve source linking integrity.

        $this->save();
    }
}
