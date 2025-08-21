<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Voucher extends Model
{
    protected $fillable = [
        'sales_order_id',
        'type',
        'voucher_no',
        'date',
        'description',
        'amount',
        'total',
        'status',
        'prepared_by',
        'authorized_by',
        'finance_by',
        'receipt_by',
        'released_at',
        'approved_at',
    ];

    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
        'total' => 'decimal:2',
        'released_at' => 'datetime',
        'approved_at' => 'datetime',
    ];

    // Relationship with SalesOrder
    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    // Status constants
    const STATUS_DRAFT = 'draft';
    const STATUS_RELEASED = 'released';
    const STATUS_APPROVED = 'approved';

    // Type constants
    const TYPE_PAYMENT = 'payment';
    const TYPE_RECEIPT = 'receipt';

    // Scopes
    public function scopePayment($query)
    {
        return $query->where('type', self::TYPE_PAYMENT);
    }

    public function scopeReceipt($query)
    {
        return $query->where('type', self::TYPE_RECEIPT);
    }

    public function scopeDraft($query)
    {
        return $query->where('status', self::STATUS_DRAFT);
    }

    public function scopeReleased($query)
    {
        return $query->where('status', self::STATUS_RELEASED);
    }

    public function scopeApproved($query)
    {
        return $query->where('status', self::STATUS_APPROVED);
    }

    // Helper methods
    public function canBeEdited(): bool
    {
        return $this->status === self::STATUS_DRAFT;
    }

    public function canBeReleased(): bool
    {
        return $this->status === self::STATUS_DRAFT;
    }

    public function canBeApproved(): bool
    {
        return $this->status === self::STATUS_RELEASED;
    }
}
