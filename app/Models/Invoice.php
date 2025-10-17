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
        'invoice_type',
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
        'payment_confirmed_at',
        'down_payment_amount',
        'down_payment_date',
        'down_payment_notes',
        'posted_to_profit_loss',
        'posted_to_profit_loss_at',
        'posted_by',
        'profit_loss_entries'
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
        'paid_amount' => 'decimal:2',
        'down_payment_amount' => 'decimal:2',
        'down_payment_date' => 'date',
        'posted_to_profit_loss' => 'boolean',
        'posted_to_profit_loss_at' => 'datetime',
        'profit_loss_entries' => 'array'
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

    // New relationships for operational costs feature
    public function billableItems()
    {
        return $this->hasMany(InvoiceItem::class)->billable();
    }

    public function operationalCosts()
    {
        return $this->hasMany(InvoiceItem::class)->operationalCost();
    }

    public function reimbursementItems()
    {
        return $this->hasMany(InvoiceItem::class)->reimbursement();
    }

    public function customerVisibleItems()
    {
        return $this->hasMany(InvoiceItem::class)->customerVisible();
    }

    /**
     * Generate invoice number based on Sales Order number
     * Format: EWL + (SO number without EWILOG prefix)
     *
     * Example:
     * - SO: EWILOG2509008008 → Invoice: EWL2509008008
     * - SO: EWILOG2601001001 → Invoice: EWL2601001001
     *
     * This ensures invoice numbers follow SO numbers for better tracking
     */
    public static function generateInvoiceNumberFromSO(SalesOrder $salesOrder): string
    {
        // Extract the number part from SO number (remove EWILOG prefix)
        $soNumber = $salesOrder->order_number;

        if (strpos($soNumber, 'EWILOG') === 0) {
            // Remove EWILOG prefix and add EWL prefix
            $numberPart = substr($soNumber, 6); // Remove 'EWILOG' (6 characters)
            $invoiceNumber = "EWL{$numberPart}";
        } else {
            // Fallback: use old generation method if SO number format is unexpected
            $invoiceNumber = self::generateInvoiceNumberLegacy();
        }

        // Check if this invoice number already exists
        $exists = self::where('invoice_number', $invoiceNumber)->exists();
        if ($exists) {
            // If exists, append suffix to make it unique
            $counter = 1;
            $baseNumber = $invoiceNumber;
            do {
                $invoiceNumber = $baseNumber . 'R' . str_pad($counter, 2, '0', STR_PAD_LEFT);
                $counter++;
            } while (self::where('invoice_number', $invoiceNumber)->exists());
        }

        return $invoiceNumber;
    }

    /**
     * Legacy method for generating invoice numbers (kept for backward compatibility)
     */
    public static function generateInvoiceNumberLegacy(): string
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

    /**
     * Generate unique invoice number (main method - backwards compatible)
     */
    public static function generateInvoiceNumber(): string
    {
        return self::generateInvoiceNumberLegacy();
    }

    public function confirmedBy()
    {
        return $this->belongsTo(User::class, 'confirmed_by');
    }

    public function calculateTotals()
    {
        // Only calculate totals from billable items (customer-facing)
        // Operational costs should not be included in customer invoice totals
        $subtotal = $this->customerVisibleItems()->sum('amount');
        $total = $subtotal - ($this->down_payment_amount ?? 0);
        $this->update([
            'subtotal' => $subtotal,
            'total' => $total
        ]);
    }

    // New profit calculation methods for operational costs
    public function calculateGrossRevenue(): float
    {
        // Only calculate revenue from billable items (excludes reimbursement which is cost-neutral)
        return (float) $this->billableItems()->sum('amount');
    }

    public function calculateReimbursementTotal(): float
    {
        // Reimbursement items are cost-neutral (tidak ada profit/loss)
        return (float) $this->reimbursementItems()->sum('amount');
    }

    public function calculateOperationalCosts(): float
    {
        return (float) $this->operationalCosts()->sum('amount');
    }

    public function calculateNetProfit(): float
    {
        return $this->calculateGrossRevenue() - $this->calculateOperationalCosts();
    }

    public function calculateCustomerInvoiceTotal(): float
    {
        return (float) $this->customerVisibleItems()->sum('amount');
    }

    public function getProfitMarginPercentage(): float
    {
        $grossRevenue = $this->calculateGrossRevenue();
        if ($grossRevenue <= 0) {
            return 0;
        }
        return ($this->calculateNetProfit() / $grossRevenue) * 100;
    }

    // Accessor methods for easy access
    public function getGrossRevenueAttribute(): float
    {
        return $this->calculateGrossRevenue();
    }

    public function getOperationalCostsAttribute(): float
    {
        return $this->calculateOperationalCosts();
    }

    public function getNetProfitAttribute(): float
    {
        return $this->calculateNetProfit();
    }
    public function getReimbursementTotalAttribute(): float
    {
        return $this->calculateReimbursementTotal();
    }

    public function getCustomerTotalAttribute(): float
    {
        return $this->calculateCustomerInvoiceTotal();
    }

    public function getProfitMarginAttribute(): float
    {
        return $this->getProfitMarginPercentage();
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

    public function getTotalAfterDownPaymentAttribute()
    {
        return $this->subtotal - ($this->down_payment_amount ?? 0);
    }

    public function hasDownPayment()
    {
        return $this->down_payment_amount > 0;
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

    public function scopeMainInvoices($query)
    {
        return $query->where('invoice_type', 'main');
    }

    public function scopeReimbursementInvoices($query)
    {
        return $query->where('invoice_type', 'reimbursement');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('invoice_type', $type);
    }

    public function isMainInvoice()
    {
        return $this->invoice_type === 'main';
    }

    public function isReimbursementInvoice()
    {
        return $this->invoice_type === 'reimbursement';
    }

    public function getInvoiceTypeNameAttribute()
    {
        return match($this->invoice_type) {
            'main' => 'Main Invoice',
            'reimbursement' => 'Reimbursement',
            default => 'Main Invoice'
        };
    }

    // Relationship to posted by user
    public function postedByUser()
    {
        return $this->belongsTo(User::class, 'posted_by');
    }

    // Method untuk post ke laba rugi
    public function postToProfitLoss($periodId, $userId = null): array
    {
        if ($this->posted_to_profit_loss) {
            throw new \Exception('Invoice sudah di-post ke laba rugi sebelumnya.');
        }

        $userId = $userId ?? auth()->id();
        $entryIds = [];

        try {
            \DB::beginTransaction();

            // Get accounts
            $revenueAccount = \App\Models\ChartOfAccount::where('account_category', 'revenue_main')->first();
            $expenseAccount = \App\Models\ChartOfAccount::where('account_category', 'expense_operational')->first();

            if (!$revenueAccount || !$expenseAccount) {
                throw new \Exception('Account laba rugi belum dikonfigurasi. Hubungi administrator.');
            }

            // Create revenue entry (jika ada gross revenue)
            if ($this->calculateGrossRevenue() > 0) {
                $revenueEntry = \App\Models\ProfitLossEntry::create([
                    'period_id' => $periodId,
                    'account_id' => $revenueAccount->id,
                    'description' => "Pendapatan - Invoice {$this->invoice_number}",
                    'amount' => $this->calculateGrossRevenue(),
                    'entry_type' => 'auto_invoice',
                    'reference_type' => 'invoice',
                    'reference_id' => $this->id,
                    'transaction_date' => $this->invoice_date,
                    'notes' => "Auto-generated dari invoice {$this->invoice_number}",
                    'additional_data' => [
                        'invoice_number' => $this->invoice_number,
                        'customer_name' => $this->customer->company_name ?? 'Unknown',
                        'gross_revenue' => $this->calculateGrossRevenue(),
                        'operational_costs' => $this->calculateOperationalCosts(),
                        'net_profit' => $this->calculateNetProfit()
                    ],
                    'created_by' => $userId,
                ]);
                $entryIds[] = $revenueEntry->id;
            }

            // Create operational cost entries (per item)
            foreach ($this->operationalCosts as $cost) {
                $costEntry = \App\Models\ProfitLossEntry::create([
                    'period_id' => $periodId,
                    'account_id' => $expenseAccount->id,
                    'description' => "Biaya Operasional - {$cost->description}",
                    'amount' => $cost->amount,
                    'entry_type' => 'auto_invoice',
                    'reference_type' => 'invoice_item',
                    'reference_id' => $cost->id,
                    'transaction_date' => $this->invoice_date,
                    'notes' => "Auto-generated dari invoice {$this->invoice_number} - {$cost->description}",
                    'additional_data' => [
                        'invoice_number' => $this->invoice_number,
                        'invoice_item_id' => $cost->id,
                        'item_description' => $cost->description,
                        'item_quantity' => $cost->quantity,
                        'item_rate' => $cost->rate
                    ],
                    'created_by' => $userId,
                ]);
                $entryIds[] = $costEntry->id;
            }

            // Update invoice status
            $this->update([
                'posted_to_profit_loss' => true,
                'posted_to_profit_loss_at' => now(),
                'posted_by' => $userId,
                'profit_loss_entries' => $entryIds
            ]);

            \DB::commit();

            return [
                'success' => true,
                'message' => 'Invoice berhasil di-post ke laba rugi.',
                'entry_ids' => $entryIds,
                'gross_revenue' => $this->calculateGrossRevenue(),
                'operational_costs' => $this->calculateOperationalCosts(),
                'net_profit' => $this->calculateNetProfit()
            ];

        } catch (\Exception $e) {
            \DB::rollback();
            throw $e;
        }
    }

    // Method untuk unpost dari laba rugi (jika diperlukan)
    public function unpostFromProfitLoss($userId = null): bool
    {
        if (!$this->posted_to_profit_loss) {
            throw new \Exception('Invoice belum pernah di-post ke laba rugi.');
        }

        $userId = $userId ?? auth()->id();

        try {
            \DB::beginTransaction();

            // Delete related profit loss entries
            if ($this->profit_loss_entries && is_array($this->profit_loss_entries)) {
                \App\Models\ProfitLossEntry::whereIn('id', $this->profit_loss_entries)->delete();
            }

            // Update invoice status
            $this->update([
                'posted_to_profit_loss' => false,
                'posted_to_profit_loss_at' => null,
                'posted_by' => null,
                'profit_loss_entries' => null
            ]);

            \DB::commit();
            return true;

        } catch (\Exception $e) {
            \DB::rollback();
            throw $e;
        }
    }

    // Check if can be posted
    public function canBePostedToProfitLoss(): bool
    {
        return $this->status === 'sent' &&
               !$this->posted_to_profit_loss &&
               ($this->calculateGrossRevenue() > 0 || $this->calculateOperationalCosts() > 0);
    }
}