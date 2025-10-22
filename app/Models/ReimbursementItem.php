<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

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
            'status' => $this->status === 'paid' ? 'paid' : 'invoiced',
            'invoice_id' => $invoiceId,
            'invoiced_at' => now(),
        ]);
    }

    public function markAsPaid(?string $vendorName = null, $paidAt = null, ?string $notes = null, ?array $extraInfo = []): void
    {
        $paidTimestamp = $paidAt ? Carbon::parse($paidAt) : now();

        $this->updatePaymentStatus('paid', [
            'vendor_name' => $vendorName,
            'paid_at' => $paidTimestamp,
            'notes' => $notes,
            'extra_info' => $extraInfo,
        ]);
    }

    public function markAsUnpaid(): void
    {
        $this->updatePaymentStatus('invoiced');
    }

    public function updatePaymentStatus(string $status, array $options = []): void
    {
        $allowedStatuses = ['pending', 'linked', 'invoiced', 'paid'];
        if (!in_array($status, $allowedStatuses, true)) {
            throw new \InvalidArgumentException('Invalid reimbursement status.');
        }

        $updateData = [
            'status' => $status,
        ];

        if ($status === 'paid') {
            $paidAt = $options['paid_at'] ?? now();
            $updateData['paid_at'] = $paidAt instanceof Carbon ? $paidAt : Carbon::parse($paidAt);
        } else {
            $updateData['paid_at'] = null;
        }

        if (array_key_exists('notes', $options)) {
            $updateData['notes'] = $options['notes'];
        }

        $receiptInfo = $this->receipt_info ?? [];
        if (!is_array($receiptInfo)) {
            $receiptInfo = json_decode($receiptInfo, true) ?: [];
        }

        $actingUser = auth()->user()?->only(['id', 'name']);

        $history = $receiptInfo['payment_history'] ?? [];
        if (!is_array($history)) {
            $history = [];
        }

        $history[] = [
            'status' => $status,
            'vendor_name' => $options['vendor_name'] ?? ($status === 'paid' ? ($receiptInfo['vendor_name'] ?? null) : null),
            'notes' => $options['notes'] ?? null,
            'timestamp' => now()->toDateTimeString(),
            'user' => $actingUser,
        ];

        $receiptInfo['payment_history'] = $history;

        if ($status === 'paid') {
            if (!empty($options['vendor_name'])) {
                $receiptInfo['vendor_name'] = $options['vendor_name'];
            }
            $receiptInfo['marked_paid_by'] = $actingUser;
            $receiptInfo['marked_paid_at'] = now()->toDateTimeString();
            if (!empty($options['extra_info']) && is_array($options['extra_info'])) {
                $receiptInfo = array_merge($receiptInfo, $options['extra_info']);
            }
        } else {
            unset($receiptInfo['marked_paid_by'], $receiptInfo['marked_paid_at']);
        }

        $updateData['receipt_info'] = empty($receiptInfo) ? null : $receiptInfo;

        $this->update($updateData);
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
