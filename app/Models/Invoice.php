<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\User;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'invoice_number',
        'sales_order_id',
        'customer_id',
        'invoice_date',
        'term_days',
        'due_date',
        'shipper',
        'consignee',
        'awb_bl_no',
        'mawb_obl_no',
        'gross_weight',
        'volume',
        'no_of_packages',
        'vessel',
        'flight_voy',
        'pol_pod',
        'origin',
        'destination',
        'etd',
        'eta',
        'container_no',
        'container_size',
        'remarks',
        'subtotal',
        'total',
        'status',
        'paid_date',
        'confirmed_by',
        'payment_notes',
        'payment_method',
        'paid_amount',
        'payment_confirmed_at'
    ];

    protected $casts = [
        'invoice_date' => 'date',
        'due_date' => 'date',
        'paid_date' => 'date',
        'etd' => 'date',
        'eta' => 'date',
        'payment_confirmed_at' => 'datetime',
        'gross_weight' => 'decimal:4',
        'subtotal' => 'decimal:2',
        'total' => 'decimal:2',
        'paid_amount' => 'decimal:2'
    ];

    public function salesOrder()
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function items()
    {
        return $this->hasMany(InvoiceItem::class);
    }

    /**
     * Generate unique invoice number with format EWL2509001001
     * Format: EWL + YYMM + NNN + HHH
     * - EWL: Company prefix for invoices
     * - YY: Year (25 for 2025)
     * - MM: Month (09 for September)
     * - NNN: Opening number (increments every new invoice, resets every new year)
     * - HHH: Sequential invoice number (increments every new invoice, resets every new year)
     * 
     * Example: EWL2509001001, EWL2509002002, EWL2509003003
     * Next year: EWL2601001001, EWL2601002002 (resets because new year)
     * 
     * Note: Same pattern as Sales Order but with EWL prefix instead of EWILOG
     */
    public static function generateInvoiceNumber(): string
    {
        $now = Carbon::now();
        $year = $now->format('y'); // 2 digit year (25 for 2025)
        $month = $now->format('m'); // Month with leading zero (01-12)
        
        // Get the highest opening number and sequential number from current year
        $maxNumbers = self::whereNotNull('invoice_number')
                        ->where('invoice_number', 'LIKE', "EWL{$year}%") // Match current year only
                        ->selectRaw('
                            MAX(CAST(SUBSTRING(invoice_number, 8, 3) AS UNSIGNED)) as max_opening,
                            MAX(CAST(SUBSTRING(invoice_number, 11, 3) AS UNSIGNED)) as max_sequential
                        ')
                        ->first();
        
        $maxOpening = $maxNumbers->max_opening ?? 0;
        $maxSequential = $maxNumbers->max_sequential ?? 0;
        
        // Both opening number and sequential number increment for each new invoice
        $nextOpening = str_pad($maxOpening + 1, 3, '0', STR_PAD_LEFT);
        $nextSequential = str_pad($maxSequential + 1, 3, '0', STR_PAD_LEFT);
        
        // Generate final invoice number: EWL + YYMM + Opening + Sequential
        return "EWL{$year}{$month}{$nextOpening}{$nextSequential}";
    }

    public function confirmedBy()
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }

    public function calculateTotals()
    {
        $subtotal = $this->items()->sum('amount');
        $this->update([
            'subtotal' => $subtotal,
            'total' => $subtotal
        ]);
    }

    public function confirmPayment($paidAmount, $paymentDate, $paymentMethod = null, $notes = null)
    {
        $this->update([
            'status' => 'paid',
            'paid_amount' => $paidAmount,
            'paid_date' => $paymentDate,
            'payment_method' => $paymentMethod,
            'payment_notes' => $notes,
            'confirmed_by' => auth()->id(),
            'payment_confirmed_at' => now()
        ]);
    }

    public function isOverdue()
    {
        return $this->status !== 'paid' && $this->due_date < now()->toDateString();
    }

    public function getPaymentStatusAttribute()
    {
        if ($this->status === 'paid') {
            return 'Lunas';
        }
        
        if ($this->isOverdue()) {
            return 'Overdue';
        }
        
        return 'Belum Dibayar';
    }

    public function getDaysOverdueAttribute()
    {
        if ($this->status === 'paid' || !$this->isOverdue()) {
            return 0;
        }
        
        return now()->diffInDays($this->due_date);
    }

    public function getOutstandingAmountAttribute()
    {
        if ($this->status === 'paid') {
            return 0;
        }
        
        return $this->total - ($this->paid_amount ?? 0);
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', '!=', 'paid')
                    ->where('due_date', '<', now()->toDateString());
    }

    public function scopePendingPayment($query)
    {
        return $query->whereIn('status', ['sent', 'draft'])
                    ->where('status', '!=', 'paid');
    }
}