<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class SalesOrder extends Model
{
    protected $fillable = [
        // New required fields based on requirements
        'order_number',
        'customer',
        'shipper',
        'bl_awb',
        'liner',
        'vessel',
        'eta',
        'aju',
        'sppb_date',
        'shipment_type',
        'pol',
        'pod',
        'gudang_utc',
        'party_lcl',
        'prepared_by',
        'exchange_rate',
        'jenis_biaya',
        'buying',
        'selling',
        'revenue',
        'remarks',
        'goods',
        'commodity',
        'qty',
        'net_weight',
        'container_no',
        'invoice_number',
        'invoice_date',
        'top',
        'vendors',
        
        // Legacy fields for backward compatibility (now nullable)
        'so_number',
        'so_date',
        'customer_id',
        'customer_name',
        'customer_code',
        'customer_address',
        'customer_phone',
        'customer_email',
        'consignee_shipper',
        'shipping_address',
        'awb_bl_number',
        'vessel_flight',
        'etd',
        'pol_pod',
        'no_kont_pallet',
        'service_description',
        'commodity',
        'package_type',
        'qty',
        'weight_volume',
        'rate',
        'rate_unit',
        'total_amount',
        'currency',
        'additional_charges',
        'payment_terms',
        'special_instructions',
        'terms_conditions',
        'status',
        'sent_at',
        'confirmed_at',
        'last_modified_at',
        
        // System fields
        'created_by',
        'created_at',
        'updated_at',
        
        // Release tracking fields
        'released_at',
        'released_by',
        
        // Admin Keuangan approval/rejection fields
        'approved_at',
        'approved_by',
        'rejected_at',
        'rejected_by',
        'rejection_reason'
    ];

    protected $casts = [
        'so_date' => 'date',
        'eta' => 'date',
        'sppb_date' => 'date',
        'invoice_date' => 'date',
        'released_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
        'exchange_rate' => 'decimal:4',
        'buying' => 'decimal:2',
        'selling' => 'decimal:2',
        'revenue' => 'decimal:2',
        'vendors' => 'array',
    ];

    // Relationships
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function releasedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'released_by');
    }

    public function approvedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function rejectedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    // Relationship with Vouchers
    public function vouchers(): HasMany
    {
        return $this->hasMany(Voucher::class);
    }

    public function paymentVouchers(): HasMany
    {
        return $this->hasMany(Voucher::class)->where('type', Voucher::TYPE_PAYMENT);
    }

    public function receiptVouchers(): HasMany
    {
        return $this->hasMany(Voucher::class)->where('type', Voucher::TYPE_RECEIPT);
    }

    // Helper methods for vouchers
    public function getTotalPaymentVouchers(): float
    {
        return $this->paymentVouchers()->sum('total');
    }

    public function getTotalReceiptVouchers(): float
    {
        return $this->receiptVouchers()->sum('total');
    }

    public function hasUnreleasedVouchers(): bool
    {
        return $this->vouchers()->where('status', Voucher::STATUS_DRAFT)->exists();
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }
}
