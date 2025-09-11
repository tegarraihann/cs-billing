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
        'vendor_breakdown',
        'buying_breakdown',
        'selling_breakdown',
        'total_buying',
        'total_selling',
        'total_revenue',
        'remarks',
        'note',
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
        'vendor_breakdown' => 'array',
        'buying_breakdown' => 'array',
        'selling_breakdown' => 'array',
        'total_buying' => 'decimal:2',
        'total_selling' => 'decimal:2',
        'total_revenue' => 'decimal:2',
        'vendors' => 'array',
        'container_no' => 'array',
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
        // Use vendor_breakdown as primary source
        if ($this->vendor_breakdown && is_array($this->vendor_breakdown)) {
            return collect($this->vendor_breakdown)->sum('buying_amount');
        }
        
        // Fallback to buying_breakdown for backward compatibility
        if ($this->buying_breakdown && is_array($this->buying_breakdown)) {
            return collect($this->buying_breakdown)->sum('amount');
        }
        
        return 0;
    }

    public function calculateTotalSelling(): float
    {
        // Use vendor_breakdown as primary source
        if ($this->vendor_breakdown && is_array($this->vendor_breakdown)) {
            return collect($this->vendor_breakdown)->sum('selling_amount');
        }
        
        // Fallback to selling_breakdown for backward compatibility
        if ($this->selling_breakdown && is_array($this->selling_breakdown)) {
            return collect($this->selling_breakdown)->sum('amount');
        }
        
        return 0;
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
     * Generate unique order number with format EWILOG2509001003
     * Format: EWILOG + YYMM + XXX + YYY
     * - EWILOG: Company prefix
     * - YY: Year (25 for 2025)
     * - MM: Month (09 for September)
     * - XXX: Opening number for the month (increments each month)
     * - YYY: Sequential SO number within the month (resets every month)
     * 
     * Example: EWILOG2509001003 -> EWILOG2510002001 (Oct starts with opening 002, SO #1)
     */
    public static function generateOrderNumber(): string
    {
        $now = now();
        $year = $now->format('y'); // 2 digit year (25 for 2025)
        $month = $now->format('m'); // Month with leading zero (01-12)
        
        // Get the highest opening number from ALL previous months (never reset)
        $maxOpening = self::whereNotNull('order_number')
                        ->where('order_number', 'LIKE', "EWILOG{$year}%") // Match EWILOG format
                        ->selectRaw('MAX(CAST(SUBSTRING(order_number, 11, 3) AS UNSIGNED)) as max_opening') // Position 11-13 for opening
                        ->value('max_opening') ?? 0;
        
        // Check if we already have SOs for current month
        $currentMonthExists = self::whereNotNull('order_number')
                                ->where('order_number', 'LIKE', "EWILOG{$year}{$month}%")
                                ->exists();
        
        // If this is the first SO of the month, increment opening number
        // Otherwise, use the same opening number as other SOs in this month
        if (!$currentMonthExists) {
            $openingNumber = str_pad($maxOpening + 1, 3, '0', STR_PAD_LEFT);
        } else {
            // Find the opening number used in current month
            $currentOpening = self::whereNotNull('order_number')
                                ->where('order_number', 'LIKE', "EWILOG{$year}{$month}%")
                                ->selectRaw('SUBSTRING(order_number, 11, 3) as opening') // Position 11-13
                                ->value('opening');
            $openingNumber = $currentOpening;
        }
        
        // Get sequential count for current month (resets every month)
        $monthlyCount = self::whereNotNull('order_number')
                           ->where('order_number', 'LIKE', "EWILOG{$year}{$month}%")
                           ->count();
        
        // Increment monthly sequential (reset every month)
        $nextSequential = str_pad($monthlyCount + 1, 3, '0', STR_PAD_LEFT);
        
        // Generate final order number: EWILOG + YYMM + Opening + Sequential
        return "EWILOG{$year}{$month}{$openingNumber}{$nextSequential}";
    }
}
