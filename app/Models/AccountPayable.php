<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class AccountPayable extends Model
{
    protected $fillable = [
        'sales_order_id',
        'vendor_id',
        'vendor_name',
        'vendor_invoice_number',
        'vendor_invoice_date',
        'service_description',
        'service_remarks',
        'amount',
        'paid_amount',
        'outstanding_amount',
        'status',
        'payment_due_date',
        'payment_date',
        'payment_method',
        'payment_notes',
        'vendor_bank_account',
        'vendor_account_name',
        'days_overdue',
        'created_by',
        'paid_by'
    ];

    protected $casts = [
        'vendor_invoice_date' => 'date',
        'payment_due_date' => 'date',
        'payment_date' => 'date',
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'days_overdue' => 'integer'
    ];

    // Relationships
    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function paidByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'paid_by');
    }

    // Scopes
    public function scopeUnpaid($query)
    {
        return $query->whereIn('status', ['unpaid', 'partial']);
    }

    public function scopeOverdue($query)
    {
        return $query->where('payment_due_date', '<', Carbon::today())
                    ->whereIn('status', ['unpaid', 'partial']);
    }

    public function scopeByVendor($query, $vendorId)
    {
        return $query->where('vendor_id', $vendorId);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    // Helper Methods
    public function calculateDaysOverdue(): int
    {
        if (!$this->payment_due_date || $this->status === 'paid') {
            return 0;
        }

        $today = Carbon::today();
        $dueDate = Carbon::parse($this->payment_due_date);
        
        if ($today->gt($dueDate)) {
            return $today->diffInDays($dueDate);
        }
        
        return 0;
    }

    public function updateOverdueStatus(): void
    {
        $daysOverdue = $this->calculateDaysOverdue();
        
        $this->update([
            'days_overdue' => $daysOverdue
        ]);
    }

    public function markAsPaid(float $amount, string $paymentMethod = null, string $notes = null): bool
    {
        if ($amount <= 0) {
            return false;
        }

        $newPaidAmount = $this->paid_amount + $amount;
        $newOutstandingAmount = $this->amount - $newPaidAmount;
        
        $newStatus = 'unpaid';
        if ($newOutstandingAmount <= 0) {
            $newStatus = 'paid';
            $newOutstandingAmount = 0;
            $newPaidAmount = $this->amount; // Ensure not overpaid
        } elseif ($newPaidAmount > 0) {
            $newStatus = 'partial';
        }

        $this->update([
            'paid_amount' => $newPaidAmount,
            'outstanding_amount' => $newOutstandingAmount,
            'status' => $newStatus,
            'payment_date' => now(),
            'payment_method' => $paymentMethod,
            'payment_notes' => $notes,
            'paid_by' => auth()->id(),
            'days_overdue' => 0
        ]);

        return true;
    }

    public function isOverdue(): bool
    {
        return $this->calculateDaysOverdue() > 0;
    }

    // Static Methods
    public static function createFromVendorBreakdown(SalesOrder $salesOrder, array $vendorBreakdownItem): self
    {
        // Find vendor if exists
        $vendor = null;
        if (!empty($vendorBreakdownItem['vendor_id'])) {
            $vendor = Vendor::find($vendorBreakdownItem['vendor_id']);
        }

        return self::create([
            'sales_order_id' => $salesOrder->id,
            'vendor_id' => $vendor?->id,
            'vendor_name' => $vendor?->nama_vendor ?? $vendorBreakdownItem['nama_vendor'] ?? 'Unknown Vendor',
            'vendor_invoice_number' => $vendorBreakdownItem['rcvd_inv'] ?? null,
            'service_description' => $vendorBreakdownItem['description'] ?? 'Service',
            'service_remarks' => $vendorBreakdownItem['remarks'] ?? null,
            'amount' => floatval($vendorBreakdownItem['buying_amount'] ?? 0),
            'outstanding_amount' => floatval($vendorBreakdownItem['buying_amount'] ?? 0),
            'vendor_bank_account' => $vendor?->nomor_rekening,
            'vendor_account_name' => $vendor?->nama_rekening,
            'created_by' => auth()->id()
        ]);
    }

    public static function generateFromSalesOrder(SalesOrder $salesOrder): void
    {
        if (!$salesOrder->vendor_breakdown || !is_array($salesOrder->vendor_breakdown)) {
            return;
        }

        foreach ($salesOrder->vendor_breakdown as $vendorItem) {
            // Only create if there's a buying amount
            if (!empty($vendorItem['buying_amount']) && floatval($vendorItem['buying_amount']) > 0) {
                self::createFromVendorBreakdown($salesOrder, $vendorItem);
            }
        }
    }
}
