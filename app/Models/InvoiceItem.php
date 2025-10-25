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
        'include_in_customer_invoice' => 'boolean',
        'is_hidden_from_customer' => 'boolean'
    ];

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
}