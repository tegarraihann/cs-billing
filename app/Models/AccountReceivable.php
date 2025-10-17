<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class AccountReceivable extends Model
{
    protected $fillable = [
        'invoice_id',
        'customer_id',
        'customer_name',
        'sales_order_id',
        'invoice_number',
        'invoice_date',
        'due_date',
        'invoice_amount',
        'paid_amount',
        'outstanding_amount',
        'status',
        'payment_terms_days',
        'payment_terms_text',
        'last_payment_date',
        'days_overdue',
        'notes',
        'created_by'
    ];

    protected $casts = [
        'invoice_date' => 'date',
        'due_date' => 'date',
        'last_payment_date' => 'datetime',
        'invoice_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'payment_terms_days' => 'integer',
        'days_overdue' => 'integer'
    ];

    // Relationships
    public function invoice(): BelongsTo
    {
        return $this->belongsTo(Invoice::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Scopes
    public function scopeOutstanding($query)
    {
        return $query->whereIn('status', ['outstanding', 'partial']);
    }

    public function scopeOverdue($query)
    {
        return $query->where('status', 'overdue');
    }

    public function scopeByCustomer($query, $customerId)
    {
        return $query->where('customer_id', $customerId);
    }

    // Helper Methods
    public function calculateDaysOverdue(): int
    {
        if (!$this->due_date || $this->status === 'paid') {
            return 0;
        }

        $today = Carbon::today();
        $dueDate = Carbon::parse($this->due_date);
        
        if ($today->gt($dueDate)) {
            return $today->diffInDays($dueDate);
        }
        
        return 0;
    }

    public function updateOverdueStatus(): void
    {
        $daysOverdue = $this->calculateDaysOverdue();
        
        $this->update([
            'days_overdue' => $daysOverdue,
            'status' => $daysOverdue > 0 && $this->status !== 'paid' ? 'overdue' : $this->status
        ]);
    }

    public function recordPayment(float $amount, string $notes = null): bool
    {
        if ($amount <= 0 || $amount > $this->outstanding_amount) {
            return false;
        }

        $newPaidAmount = $this->paid_amount + $amount;
        $newOutstandingAmount = $this->invoice_amount - $newPaidAmount;
        
        $newStatus = 'outstanding';
        if ($newOutstandingAmount <= 0) {
            $newStatus = 'paid';
            $newOutstandingAmount = 0;
        } elseif ($newPaidAmount > 0) {
            $newStatus = 'partial';
        }

        $this->update([
            'paid_amount' => $newPaidAmount,
            'outstanding_amount' => $newOutstandingAmount,
            'status' => $newStatus,
            'last_payment_date' => now(),
            'notes' => $notes ? ($this->notes ? $this->notes . "\n" . $notes : $notes) : $this->notes
        ]);

        return true;
    }

    // Static Methods
    public static function createFromInvoice(Invoice $invoice): self
    {
        // Calculate due date from payment terms
        $dueDate = null;
        if ($invoice->term_days) {
            $dueDate = Carbon::parse($invoice->invoice_date)->addDays($invoice->term_days);
        }

        return self::create([
            'invoice_id' => $invoice->id,
            'customer_id' => $invoice->customer_id,
            'customer_name' => $invoice->customer->company_name ?? 'Unknown Customer',
            'sales_order_id' => $invoice->sales_order_id,
            'invoice_number' => $invoice->invoice_number,
            'invoice_date' => $invoice->invoice_date,
            'due_date' => $dueDate,
            'invoice_amount' => $invoice->total,
            'outstanding_amount' => $invoice->total,
            'status' => 'outstanding',
            'payment_terms_days' => $invoice->term_days,
            'created_by' => auth()->id()
        ]);
    }

    /**
     * Update Account Receivable from Invoice data after invoice revision
     */
    public function updateFromInvoice(Invoice $invoice): bool
    {
        // Calculate new due date from payment terms
        $dueDate = null;
        if ($invoice->term_days) {
            $dueDate = Carbon::parse($invoice->invoice_date)->addDays($invoice->term_days);
        }

        // Calculate new outstanding amount
        // If there were payments, maintain the payment history
        $oldInvoiceAmount = $this->invoice_amount;
        $newInvoiceAmount = $invoice->total;
        $paidAmount = $this->paid_amount ?? 0;

        $newOutstandingAmount = $newInvoiceAmount - $paidAmount;

        // Determine new status
        $newStatus = 'outstanding';
        if ($newOutstandingAmount <= 0) {
            $newStatus = 'paid';
            $newOutstandingAmount = 0;
        } elseif ($paidAmount > 0) {
            $newStatus = 'partial';
        } elseif ($dueDate && Carbon::now()->gt($dueDate)) {
            $newStatus = 'overdue';
        }

        // Update the record
        return $this->update([
            'customer_id' => $invoice->customer_id,
            'customer_name' => $invoice->customer->company_name ?? $this->customer_name,
            'sales_order_id' => $invoice->sales_order_id,
            'invoice_date' => $invoice->invoice_date,
            'due_date' => $dueDate,
            'invoice_amount' => $newInvoiceAmount,
            'outstanding_amount' => max(0, $newOutstandingAmount),
            'payment_terms_days' => $invoice->term_days,
            'status' => $newStatus,
            'days_overdue' => $newStatus === 'overdue' ? $this->calculateDaysOverdue() : 0
        ]);
    }

    /**
     * Find or create Account Receivable from Invoice
     */
    public static function syncFromInvoice(Invoice $invoice): self
    {
        $accountReceivable = self::where('invoice_id', $invoice->id)->first();

        if ($accountReceivable) {
            // Update existing record
            $accountReceivable->updateFromInvoice($invoice);
            return $accountReceivable->fresh();
        } else {
            // Create new record
            return self::createFromInvoice($invoice);
        }
    }
}
