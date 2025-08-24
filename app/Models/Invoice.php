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

    public static function generateInvoiceNumber()
    {
        $date = Carbon::now();
        $prefix = 'EWL' . $date->format('ymdHis');
        
        // Check if exists, add sequence
        $lastInvoice = self::where('invoice_number', 'like', $prefix . '%')
            ->orderBy('invoice_number', 'desc')
            ->first();
            
        if ($lastInvoice) {
            $sequence = intval(substr($lastInvoice->invoice_number, -2)) + 1;
            return $prefix . str_pad($sequence, 2, '0', STR_PAD_LEFT);
        }
        
        return $prefix . '01';
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