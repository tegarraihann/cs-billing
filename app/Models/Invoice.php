<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\User;
use App\Models\ReimbursementItem;
use App\Models\AccountReceivable;
use App\Models\BankTransaction;
use App\Models\ChartOfAccount;
use App\Models\FinancialPositionAdjustment;

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
        'net_weight',
        'volume',
        'no_of_packages',
        'package_unit',
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
        'vat_rate',
        'vat_amount',
        'vat_posted_at',
        'vat_posted_account_id',
        'pph23_rate',
        'pph23_amount',
        'pph23_posted_at',
        'pph23_posted_account_id',
        'posted_to_profit_loss',
        'posted_to_profit_loss_at',
        'posted_by',
        'profit_loss_entries',
        'bank_account_name',
        'bank_account_name_bca',
        'bank_name_bca',
        'bank_number_bca',
        'swift_code',
        'swift_code_bca'
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
        'vat_rate' => 'decimal:2',
        'vat_amount' => 'decimal:2',
        'vat_posted_at' => 'datetime',
        'vat_posted_account_id' => 'integer',
        'pph23_rate' => 'decimal:2',
        'pph23_amount' => 'decimal:2',
        'pph23_posted_at' => 'datetime',
        'pph23_posted_account_id' => 'integer',
        'posted_to_profit_loss' => 'boolean',
        'posted_to_profit_loss_at' => 'datetime',
        'profit_loss_entries' => 'array'
    ];

    protected static function booted()
    {
        static::deleting(function (self $invoice) {
            $accountReceivable = $invoice->accountReceivable()->first();

            if (!$accountReceivable) {
                return;
            }

            $transactions = BankTransaction::where('reference_type', 'customer_payment')
                ->where('reference_id', $accountReceivable->id)
                ->get();

            foreach ($transactions as $transaction) {
                $transaction->delete();
            }
        });
    }

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

    public function mainBillableItems()
    {
        return $this->hasMany(InvoiceItem::class)->billable()->customerVisible();
    }

    public function operationalCosts()
    {
        return $this->hasMany(InvoiceItem::class)->operationalCost();
    }

    public function packageUnit()
    {
        return $this->belongsTo(MasterPackageUnit::class, 'package_unit', 'code');
    }

    public function reimbursementItems()
    {
        return $this->hasMany(InvoiceItem::class)->reimbursement();
    }

    public function reimbursementRecords()
    {
        return $this->hasMany(ReimbursementItem::class);
    }

    public function customerVisibleItems()
    {
        return $this->hasMany(InvoiceItem::class)->customerVisible();
    }

    public function accountReceivable()
    {
        return $this->hasOne(AccountReceivable::class);
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
        $vatBase = $this->mainBillableItems()->sum('amount');
        $vatAmount = $this->calculateVatAmount($vatBase);
        $pph23Amount = $this->calculatePph23Amount($vatBase);
        $total = $subtotal + $vatAmount - ($this->down_payment_amount ?? 0);
        $this->update([
            'subtotal' => $subtotal,
            'vat_amount' => $vatAmount,
            'pph23_amount' => $pph23Amount,
            'total' => $total
        ]);
    }

    public function calculateVatAmount(?float $baseAmount = null): float
    {
        $rate = (float) ($this->vat_rate ?? 0);
        if ($rate <= 0) {
            return 0;
        }

        $base = $baseAmount ?? (float) $this->mainBillableItems()->sum('amount');

        return round($base * ($rate / 100), 2);
    }

    public function calculatePph23Amount(?float $baseAmount = null): float
    {
        $rate = (float) ($this->pph23_rate ?? 0);
        if ($rate <= 0) {
            return 0;
        }

        $base = $baseAmount ?? (float) $this->mainBillableItems()->sum('amount');

        return round($base * ($rate / 100), 2);
    }

    public function hasVat(): bool
    {
        return (float) ($this->vat_amount ?? 0) > 0 && (float) ($this->vat_rate ?? 0) > 0;
    }

    public function hasPph23(): bool
    {
        return (float) ($this->pph23_amount ?? 0) > 0 && (float) ($this->pph23_rate ?? 0) > 0;
    }

    public function isVatPosted(): bool
    {
        return $this->vat_posted_at !== null;
    }

    public function isPph23Posted(): bool
    {
        return $this->pph23_posted_at !== null;
    }

    public function postVatPayable(?Carbon $paymentDate = null, ?int $userId = null): bool
    {
        if (!$this->hasVat() || $this->isVatPosted()) {
            return false;
        }

        $rate = (float) $this->vat_rate;
        $accountCode = abs($rate - 1.1) < 0.01 ? '2111' : '2110';
        $accountId = ChartOfAccount::idByCode($accountCode);

        if (!$accountId) {
            return false;
        }

        $effectiveDate = ($paymentDate ?? now())->toDateString();

        FinancialPositionAdjustment::create([
            'account_id' => $accountId,
            'effective_date' => $effectiveDate,
            'amount' => (float) $this->vat_amount,
            'notes' => 'VAT Payable dari Invoice ' . $this->invoice_number,
            'created_by' => $userId ?? auth()->id(),
        ]);

        $this->update([
            'vat_posted_at' => now(),
            'vat_posted_account_id' => $accountId,
        ]);

        return true;
    }

    public function postPph23Receivable(?float $amount = null, ?Carbon $effectiveDate = null, ?int $userId = null): bool
    {
        if (!$this->hasPph23() || $this->isPph23Posted()) {
            return false;
        }

        $rate = (float) $this->pph23_rate;
        $account = $this->resolvePph23ReceivableAccount($rate);
        if (!$account) {
            return false;
        }

        $amountToPost = $amount ?? (float) $this->pph23_amount;
        if ($amountToPost <= 0) {
            return false;
        }

        $effective = ($effectiveDate ?? now())->toDateString();

        FinancialPositionAdjustment::create([
            'account_id' => $account->id,
            'effective_date' => $effective,
            'amount' => $amountToPost,
            'notes' => 'PPH 23 Receivable dari Invoice ' . $this->invoice_number,
            'created_by' => $userId ?? auth()->id(),
        ]);

        $this->update([
            'pph23_posted_at' => now(),
            'pph23_posted_account_id' => $account->id,
        ]);

        return true;
    }

    private function resolvePph23ReceivableAccount(float $rate): ?ChartOfAccount
    {
        $accountCode = abs($rate - 0.5) < 0.01 ? '1220' : '1221';
        $accountName = abs($rate - 0.5) < 0.01
            ? 'VAT Receivable PPH 23 0.5%'
            : 'VAT Receivable PPH 23 2%';

        $account = ChartOfAccount::where('account_code', $accountCode)->first();
        if ($account) {
            return $account;
        }

        $account = ChartOfAccount::where('account_name', $accountName)->first();
        if ($account) {
            return $account;
        }

        return ChartOfAccount::where('account_name', 'like', '%PPH%23%')
            ->where('account_name', 'like', '%' . rtrim(rtrim(number_format($rate, 2, '.', ''), '0'), '.') . '%')
            ->where('account_type', 'asset')
            ->first();
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
        return ($this->subtotal + ($this->vat_amount ?? 0)) - ($this->down_payment_amount ?? 0);
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
        $period = \App\Models\ProfitLossPeriod::findOrFail($periodId);

        try {
            \DB::beginTransaction();

            // Update invoice status first so sync uses latest posted invoices
            $this->update([
                'posted_to_profit_loss' => true,
                'posted_to_profit_loss_at' => now(),
                'posted_by' => $userId,
            ]);

            // Sync profit shipment entry for the sales order within this period
            $profitEntry = $this->syncShipmentProfitEntry($period, $userId);
            if ($profitEntry) {
                $entryIds[] = $profitEntry->id;
            }

            // Update profit & loss period summary so ringkasan reflects latest totals
            $period->calculateTotals();

            // Update invoice status
            $this->update([
                'profit_loss_entries' => $entryIds
            ]);

            \DB::commit();

            return [
                'success' => true,
                'message' => 'Invoice berhasil di-post ke laba rugi.',
                'entry_ids' => $entryIds,
                'gross_revenue' => $profitEntry?->additional_data['gross_revenue'] ?? 0,
                'operational_costs' => $profitEntry?->additional_data['operational_costs'] ?? 0,
                'net_profit' => $profitEntry?->amount ?? 0
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
        $periods = [];

        try {
            \DB::beginTransaction();

            if ($this->profit_loss_entries && is_array($this->profit_loss_entries)) {
                \App\Models\ProfitLossEntry::whereIn('id', $this->profit_loss_entries)->delete();
            }

            if ($this->invoice_date) {
                $period = \App\Models\ProfitLossPeriod::active()
                    ->whereDate('start_date', '<=', $this->invoice_date)
                    ->whereDate('end_date', '>=', $this->invoice_date)
                    ->orderBy('start_date')
                    ->first();
                if ($period) {
                    $periods[] = $period;
                }
            }

            // Update invoice status
            $this->update([
                'posted_to_profit_loss' => false,
                'posted_to_profit_loss_at' => null,
                'posted_by' => null,
                'profit_loss_entries' => null
            ]);

            // Sync shipment profit entries for affected periods
            foreach ($periods as $period) {
                $this->syncShipmentProfitEntry($period, $userId);
            }

            // Recalculate affected profit & loss periods after removing entries
            foreach ($periods as $period) {
                $period->calculateTotals();
            }

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
        $eligibleStatuses = ['draft', 'sent', 'paid'];

        return in_array($this->status, $eligibleStatuses, true) &&
               ($this->calculateGrossRevenue() > 0 || $this->calculateOperationalCosts() > 0);
    }

    protected function syncShipmentProfitEntry(\App\Models\ProfitLossPeriod $period, int $userId): ?\App\Models\ProfitLossEntry
    {
        $salesOrder = $this->salesOrder;
        if (!$salesOrder) {
            return null;
        }

        $invoices = $salesOrder->invoices()
            ->with('items')
            ->whereBetween('invoice_date', [$period->start_date, $period->end_date])
            ->where('posted_to_profit_loss', true)
            ->get();

        if ($invoices->isEmpty()) {
            \App\Models\ProfitLossEntry::where('period_id', $period->id)
                ->where('reference_type', 'shipment_profit')
                ->where('reference_id', $salesOrder->id)
                ->delete();
            return null;
        }

        $grossRevenue = $invoices->sum(function ($invoice) {
            return $invoice->calculateGrossRevenue();
        });
        $operationalCosts = $invoices->sum(function ($invoice) {
            return $invoice->calculateOperationalCosts();
        });

        $latestInvoiceDate = $invoices->max(function ($invoice) {
            return $invoice->invoice_date?->format('Y-m-d') ?? $invoice->created_at->format('Y-m-d');
        });

        return \App\Models\ProfitLossEntry::createFromShipmentProfit($salesOrder, $period->id, $userId, [
            'gross_revenue' => $grossRevenue,
            'operational_costs' => $operationalCosts,
            'profit' => $grossRevenue - $operationalCosts,
            'invoice_ids' => $invoices->pluck('id')->all(),
            'transaction_date' => $latestInvoiceDate,
        ]);
    }
}
