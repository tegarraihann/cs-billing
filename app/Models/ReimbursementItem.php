<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReimbursementItem extends Model
{
    protected $fillable = [
        'sales_order_id',
        'invoice_id',
        'description',
        'amount',
        'category',
        'status',
        'receipt_info',
        'notes',
        'created_by',
        'approved_by',
        'linked_at',
        'invoiced_at',
        'paid_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'receipt_info' => 'array',
        'linked_at' => 'datetime',
        'invoiced_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    // Relationships
    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Scopes
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    public function scopeLinked($query)
    {
        return $query->where('status', 'linked');
    }

    public function scopeInvoiced($query)
    {
        return $query->where('status', 'invoiced');
    }

    public function scopeForSalesOrder($query, $salesOrderId)
    {
        return $query->where('sales_order_id', $salesOrderId);
    }

    // Helper methods
    public function markAsLinked($salesOrderId = null): void
    {
        $this->update([
            'status' => 'linked',
            'sales_order_id' => $salesOrderId ?? $this->sales_order_id,
            'linked_at' => now(),
        ]);
    }

    public function markAsInvoiced($invoiceId): void
    {
        $this->update([
            'status' => 'invoiced',
            'invoice_id' => $invoiceId,
            'invoiced_at' => now(),
        ]);
    }

    public function markAsPaid(): void
    {
        $this->update([
            'status' => 'paid',
            'paid_at' => now(),
        ]);
    }

    public function canBeEdited(): bool
    {
        return in_array($this->status, ['pending', 'linked']);
    }

    public function canBeDeleted(): bool
    {
        return $this->status === 'pending';
    }

    // Static methods for categories
    public static function getCategories(): array
    {
        return [
            'transport' => 'Transportasi',
            'accommodation' => 'Akomodasi',
            'meal' => 'Makan & Minum',
            'fuel' => 'BBM',
            'parking' => 'Parkir',
            'toll' => 'Tol',
            'admin' => 'Administrasi',
            'communication' => 'Komunikasi',
            'equipment' => 'Peralatan',
            'general' => 'Lain-lain',
        ];
    }

    public function getCategoryLabelAttribute(): string
    {
        $categories = self::getCategories();
        return $categories[$this->category] ?? 'Lain-lain';
    }

    // Calculate totals
    public static function calculateTotalForSalesOrder($salesOrderId): float
    {
        return self::where('sales_order_id', $salesOrderId)->sum('amount');
    }

    public static function calculatePendingTotalForSalesOrder($salesOrderId): float
    {
        return self::where('sales_order_id', $salesOrderId)
                   ->where('status', 'pending')
                   ->sum('amount');
    }
}