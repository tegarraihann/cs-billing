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
        'ref_no',
        'so_date',
        'customer',
        'shipper',
        'bl_awb',
        'liner',
        'vessel',
        'eta',
        'etd',
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
        'buying_breakdown',
        'selling_breakdown',
        'total_buying',
        'total_selling',
        'total_revenue',
        'remarks',
        'commodity',
        'qty',
        'net_weight',
        'measurement',
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
        'etd' => 'date',
        'sppb_date' => 'date',
        'invoice_date' => 'date',
        'released_at' => 'datetime',
        'approved_at' => 'datetime',
        'rejected_at' => 'datetime',
        'exchange_rate' => 'decimal:4',
        'buying_breakdown' => 'array',
        'selling_breakdown' => 'array',
        'total_buying' => 'decimal:2',
        'total_selling' => 'decimal:2',
        'total_revenue' => 'decimal:2',
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

    // Helper methods for breakdown calculations
    public function calculateTotalBuying(): float
    {
        if (!$this->buying_breakdown) {
            return 0;
        }
        
        return collect($this->buying_breakdown)->sum('amount');
    }

    public function calculateTotalSelling(): float
    {
        if (!$this->selling_breakdown) {
            return 0;
        }
        
        return collect($this->selling_breakdown)->sum('amount');
    }

    public function calculateTotalRevenue(): float
    {
        return $this->calculateTotalSelling() - $this->calculateTotalBuying();
    }

    // Auto-update totals when breakdown changes
    public function updateTotals(): void
    {
        $this->total_buying = $this->calculateTotalBuying();
        $this->total_selling = $this->calculateTotalSelling();
        $this->total_revenue = $this->calculateTotalRevenue();
    }

    // Override save to auto-calculate totals
    public function save(array $options = [])
    {
        $this->updateTotals();
        return parent::save($options);
    }

    /**
     * Generate unique order number with format EWILOG2501001001
     * Format: EWILOG + YY + MM + XXX + YYY
     * - EWILOG: Prefix
     * - YY: Year (25 for 2025)
     * - MM: Month (01-12)
     * - XXX: Yearly sequential number (001-999)
     * - YYY: Monthly sequential number (001-999)
     */
    public static function generateOrderNumber(): string
    {
        $now = now();
        $year = $now->format('y'); // 2 digit year (25 for 2025)
        $month = $now->format('m'); // Month with leading zero (01-12)
        
        // Get yearly count (from January to current month)
        $yearStart = $now->startOfYear();
        $yearlyCount = self::where('created_at', '>=', $yearStart)
                          ->whereNotNull('order_number')
                          ->where('order_number', 'LIKE', "EWILOG{$year}%")
                          ->count();
        
        // Get monthly count
        $monthStart = $now->startOfMonth();
        $monthEnd = $now->endOfMonth();
        $monthlyCount = self::whereBetween('created_at', [$monthStart, $monthEnd])
                           ->whereNotNull('order_number')
                           ->where('order_number', 'LIKE', "EWILOG{$year}{$month}%")
                           ->count();
        
        // Increment counts (next number)
        $yearlySeq = str_pad($yearlyCount + 1, 3, '0', STR_PAD_LEFT);
        $monthlySeq = str_pad($monthlyCount + 1, 3, '0', STR_PAD_LEFT);
        
        // Generate final order number
        return "EWILOG{$year}{$month}{$yearlySeq}{$monthlySeq}";
    }
}
