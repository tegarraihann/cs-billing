<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Arr;
use App\Models\SalesOrderVendorItem;

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
        'package_unit',
        'net_weight',
        'gross_weight',
        'measurement',
        'container_no',
        'invoice_number',
        'invoice_date',
        'top',
        'vendors',
        'other_costs',

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
        'other_costs' => 'array',
        'cs_snapshot' => 'array',
        'cs_snapshot_generated_at' => 'datetime',
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

    public function packageUnit()
    {
        return $this->belongsTo(MasterPackageUnit::class, 'package_unit', 'code');
    }

    public function reimbursementItems(): HasMany
    {
        return $this->hasMany(ReimbursementItem::class);
    }

    public function vendorBreakdownItems(): HasMany
    {
        return $this->hasMany(SalesOrderVendorItem::class)->orderBy('sort_order');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function accountReceivables(): HasMany
    {
        return $this->hasMany(AccountReceivable::class);
    }

    public function accountPayables(): HasMany
    {
        return $this->hasMany(AccountPayable::class);
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

    // Helper methods for other costs
    public function calculateOtherCosts(): float
    {
        if ($this->other_costs && is_array($this->other_costs)) {
            return collect($this->other_costs)->sum('amount');
        }
        return 0;
    }

    public function calculateTotalBuyingWithOtherCosts(): float
    {
        return $this->calculateTotalBuying() + $this->calculateOtherCosts();
    }

    public function calculateTotalRevenueWithOtherCosts(): float
    {
        return $this->calculateTotalSelling() - $this->calculateTotalBuyingWithOtherCosts();
    }

    // Helper methods for reimbursement items
    public function calculateTotalReimbursement(): float
    {
        return $this->reimbursementItems()->sum('amount');
    }

    public function calculatePendingReimbursement(): float
    {
        return $this->reimbursementItems()->where('status', 'pending')->sum('amount');
    }

    public function calculateLinkedReimbursement(): float
    {
        return $this->reimbursementItems()->where('status', 'linked')->sum('amount');
    }

    public function calculateInvoicedReimbursement(): float
    {
        return $this->reimbursementItems()->where('status', 'invoiced')->sum('amount');
    }

    public function hasPendingReimbursements(): bool
    {
        return $this->reimbursementItems()->where('status', 'pending')->exists();
    }

    public function canCreateInvoice(): bool
    {
        // SO can create invoice if approved and no pending reimbursements
        return $this->approved_at && !$this->hasPendingReimbursements();
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

    public function syncVendorBreakdownItems(array $items, ?int $userId = null): void
    {
        $userId = $userId ?: $this->created_by;
        $existing = $this->vendorBreakdownItems()->get()->keyBy('id');

        $hasIdsInInput = collect($items)->contains(function ($item) {
            return is_array($item) && !empty($item['id']);
        });

        $seenIds = [];

        if ($hasIdsInInput) {
            foreach ($items as $index => $item) {
                if (!is_array($item)) {
                    continue;
                }
                $itemId = isset($item['id']) && is_numeric($item['id']) ? (int) $item['id'] : null;
                $payload = $this->mapVendorItemPayload($item, $index, $userId);

                if ($itemId && $existing->has($itemId)) {
                    $existing->get($itemId)->fill($payload)->save();
                    $seenIds[] = $itemId;
                } else {
                    $created = $this->vendorBreakdownItems()->create($payload);
                    $seenIds[] = $created->id;
                }
            }

            $existing->keys()->diff($seenIds)->each(function ($id) use ($existing) {
                $existing->get($id)?->delete();
            });
        } else {
            $this->vendorBreakdownItems()->delete();
            foreach ($items as $index => $item) {
                if (!is_array($item)) {
                    continue;
                }
                $payload = $this->mapVendorItemPayload($item, $index, $userId);
                $this->vendorBreakdownItems()->create($payload);
            }
        }

        $normalized = $this->vendorBreakdownItems()
            ->orderBy('sort_order')
            ->get()
            ->map(fn (SalesOrderVendorItem $item) => $item->toVendorBreakdownArray())
            ->all();

        $this->setAttribute('vendor_breakdown', $normalized);
        $this->saveQuietly();
    }

    private function mapVendorItemPayload(array $item, int $index, ?int $userId): array
    {
        $vendorId = $item['vendor_id'] ?? null;
        if (is_string($vendorId) && strtolower(trim($vendorId)) === 'internal') {
            $vendorId = null;
        }
        if (is_numeric($vendorId)) {
            $vendorId = (int) $vendorId;
        } else {
            $vendorId = null;
        }

        return [
            'vendor_id' => $vendorId,
            'vendor_name' => $item['nama_vendor'] ?? null,
            'vendor_bank_account' => $item['no_rekening'] ?? null,
            'vendor_account_name' => $item['nama_rekening'] ?? null,
            'description' => $item['description'] ?? null,
            'buying_amount' => (float) ($item['buying_amount'] ?? 0),
            'selling_amount' => (float) ($item['selling_amount'] ?? 0),
            'quantity' => isset($item['quantity']) && is_numeric($item['quantity'])
                ? (float) $item['quantity']
                : null,
            'unit' => isset($item['unit']) && is_string($item['unit'])
                ? trim($item['unit'])
                : null,
            'rcvd_inv' => $item['rcvd_inv'] ?? null,
            'remarks' => $item['remarks'] ?? null,
            'sort_order' => $index,
            'created_by' => $userId,
        ];
    }

    /**
     * Capture a snapshot of CS-submitted data before finance edits.
     */
    public function captureCsSnapshot(): void
    {
        $this->loadMissing(['reimbursementItems']);

        $snapshot = $this->attributesToArray();
        $snapshot['reimbursement_items'] = $this->reimbursementItems
            ? $this->reimbursementItems->map(function ($item) {
                return Arr::only($item->toArray(), [
                    'id',
                    'description',
                    'amount',
                    'category',
                    'notes',
                    'vendor_id',
                    'status',
                ]);
            })->all()
            : [];

        $this->forceFill([
            'cs_snapshot' => $snapshot,
            'cs_snapshot_generated_at' => now(),
        ])->save();
    }

    /**
     * Generate unique order number with format EWILOG2510226001
     * Format: EWILOG + YYMM + NNN + HHH
     * - EWILOG: Company prefix
     * - YY: Year (25 for 2025)
     * - MM: Month (10 for October)
     * - NNN: Opening number (increments every new SO, resets every new year)
     * - HHH: Sequential SO number (increments every new SO, resets every new year)
     *
     * Example: EWILOG2510226001, EWILOG2510227002, EWILOG2510228003
     * Next year: EWILOG2601001001, EWILOG2601002002 (resets because new year)
     *
     * Starting numbers:
     * - September 2025: EWILOG2509219020 (closed at EWILOG2509225026)
     * - October 2025: EWILOG2510226001
     */
    public static function generateOrderNumber(): string
    {
        $now = now();
        $year = $now->format('y'); // 2 digit year (25 for 2025)
        $month = $now->format('m'); // Month with leading zero (01-12)

        // Counter tahunan (AAA): lintas bulan dalam tahun berjalan, reset tiap tahun
        $yearMax = self::whereNotNull('order_number')
            ->where('order_number', 'LIKE', "EWILOG{$year}%")
            ->selectRaw('MAX(CAST(SUBSTRING(order_number, 11, 3) AS UNSIGNED)) as max_opening_year')
            ->first();
        $maxOpeningYear = $yearMax->max_opening_year ?? 0;
        $nextOpening = str_pad($maxOpeningYear + 1, 3, '0', STR_PAD_LEFT);

        // Counter bulanan (BBB): reset setiap bulan
        $currentMaxSeq = self::whereNotNull('order_number')
            ->where('order_number', 'LIKE', "EWILOG{$year}{$month}%")
            ->selectRaw('MAX(CAST(SUBSTRING(order_number, 14, 3) AS UNSIGNED)) as max_seq')
            ->first();
        $maxSeq = $currentMaxSeq->max_seq ?? 0;
        $nextSequential = str_pad($maxSeq + 1, 3, '0', STR_PAD_LEFT);

        // Generate final order number: EWILOG + YYMM + Opening + Sequential
        return "EWILOG{$year}{$month}{$nextOpening}{$nextSequential}";
    }

    /**
     * Get invoice items data from vendor breakdown selling amounts
     * Used to auto-populate invoice items when creating invoice from SO
     */
    public function getInvoiceItemsFromVendorBreakdown(): array
    {
        $items = [];

        if ($this->vendor_breakdown && is_array($this->vendor_breakdown)) {
            foreach ($this->vendor_breakdown as $vendor) {
                // Only include items with selling amount
                if (isset($vendor['selling_amount']) && $vendor['selling_amount'] > 0) {
                    $items[] = [
                        'description' => $vendor['description'] ?? 'Service',
                        'quantity' => 1,
                        'unit' => 'service',
                        'rate' => floatval($vendor['selling_amount']),
                        'currency' => 'IDR'
                    ];
                }
            }
        }

        return $items;
    }

    /**
     * Check if SO has vendor breakdown data for auto-populating invoice
     */
    public function hasVendorBreakdownForInvoice(): bool
    {
        if (!$this->vendor_breakdown || !is_array($this->vendor_breakdown)) {
            return false;
        }

        // Check if at least one vendor has selling amount
        foreach ($this->vendor_breakdown as $vendor) {
            if (isset($vendor['selling_amount']) && $vendor['selling_amount'] > 0) {
                return true;
            }
        }

        return false;
    }
}
