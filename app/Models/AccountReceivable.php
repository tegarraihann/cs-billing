<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;
use App\Models\SalesOrder;
use App\Models\ReimbursementItem;

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
        'is_opening',
        'opening_type',
        'payment_terms_days',
        'payment_terms_text',
        'last_payment_date',
        'days_overdue',
        'notes',
        'created_by',
        'account_id',
        'source_so_number',
        'opening_payment_date',
        'tax_writeoff_rate',
        'tax_writeoff_amount',
        'tax_writeoff_at',
        'tax_writeoff_account_id',
    ];

    protected $casts = [
        'invoice_date' => 'date',
        'due_date' => 'date',
        'last_payment_date' => 'datetime',
        'invoice_amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'payment_terms_days' => 'integer',
        'days_overdue' => 'integer',
        'account_id' => 'integer',
        'is_opening' => 'boolean',
        'opening_payment_date' => 'date',
        'tax_writeoff_rate' => 'decimal:2',
        'tax_writeoff_amount' => 'decimal:2',
        'tax_writeoff_at' => 'datetime',
        'tax_writeoff_account_id' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $receivable) {
            $receivable->account_id = $receivable->account_id ?: ChartOfAccount::idByCode('1200');
        });

        static::saving(function (self $receivable) {
            if (!$receivable->account_id) {
                $receivable->account_id = ChartOfAccount::idByCode('1200');
            }
        });
    }

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

    public function components(): HasMany
    {
        return $this->hasMany(AccountReceivableComponent::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(ChartOfAccount::class);
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

    public function recordPayment(float $amount, string $notes = null, ?AccountReceivableComponent $component = null, ?Carbon $paymentDate = null): bool
    {
        if ($this->invoice) {
            $this->syncComponentsFromInvoice($this->invoice);
        }

        $components = $this->components()->get();
        if ($components->isEmpty()) {
            if ($amount <= 0 || $amount > $this->outstanding_amount) {
                \Log::warning('AR recordPayment failed: invalid amount without components', [
                    'account_receivable_id' => $this->id,
                    'amount' => $amount,
                    'outstanding_amount' => $this->outstanding_amount,
                ]);
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
                'last_payment_date' => $paymentDate ?? now(),
                'notes' => $notes ? ($this->notes ? $this->notes . "\n" . $notes : $notes) : $this->notes
            ]);

            return true;
        }

        $component = $component ?: $components->first();

        if (!$component || (int) $component->account_receivable_id !== (int) $this->id) {
            \Log::warning('AR recordPayment failed: component mismatch', [
                'account_receivable_id' => $this->id,
                'component_id' => $component?->id,
                'component_account_receivable_id' => $component?->account_receivable_id,
            ]);
            return false;
        }

        if ($amount <= 0 || $amount > $component->outstanding_amount) {
            \Log::warning('AR recordPayment failed: amount exceeds outstanding', [
                'account_receivable_id' => $this->id,
                'component_id' => $component->id,
                'amount' => $amount,
                'outstanding_amount' => $component->outstanding_amount,
            ]);
            return false;
        }

        $component->paid_amount = $component->paid_amount + $amount;
        $component->outstanding_amount = max(0, $component->amount - $component->paid_amount);
        $component->status = $this->determineComponentStatus($component);
        $component->due_date = $component->due_date ?? $this->due_date;
        $component->save();

        $summary = $this->recalculateTotals(false);

        $label = $this->componentLabel($component->component_type);
        $noteEntry = "Payment applied to {$label} (Rp " . number_format($amount, 2, '.', ',') . ')';
        if ($notes) {
            $noteEntry .= ' - ' . $notes;
        }

        $this->fill($summary);
        $this->last_payment_date = $paymentDate ?? now();
        $this->notes = $noteEntry
            ? ($this->notes ? $this->notes . "\n" . $noteEntry : $noteEntry)
            : $this->notes;
        $this->save();

        return true;
    }

    // Static Methods
    public static function createFromInvoice(Invoice $invoice): self
    {
        // Calculate due date from payment terms
        $dueDate = null;
        if ($invoice->term_days) {
            $dueDays = (int) $invoice->term_days;
            $dueDate = Carbon::parse($invoice->invoice_date)->addDays($dueDays);
        }

        $receivable = self::create([
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
            'created_by' => auth()->id(),
        ]);

        $receivable->syncComponentsFromInvoice($invoice);

        return $receivable->fresh();
    }

    public static function createOrUpdatePreInvoiceFromSalesOrder(SalesOrder $salesOrder): ?self
    {
        $salesOrder->loadMissing(['customer', 'reimbursementItems']);

        $mainAmount = (float) ($salesOrder->total_selling ?? 0);
        $reimbursementAmount = $salesOrder->reimbursementItems
            ->sum(function (ReimbursementItem $item) {
                $lineTotal = method_exists($item, 'getLineTotal') ? $item->getLineTotal() : ((float) $item->amount * ((float) $item->quantity ?: 1));
                $outstanding = $item->customer_outstanding_amount;
                if ($outstanding === null) {
                    return $lineTotal;
                }
                return max(0, (float) $outstanding);
            });
        $totalAmount = $mainAmount + $reimbursementAmount;

        if ($totalAmount <= 0) {
            return null;
        }

        $invoiceDate = $salesOrder->approved_at ?? $salesOrder->released_at ?? now();

        $receivable = self::where('sales_order_id', $salesOrder->id)
            ->whereNull('invoice_id')
            ->where('is_opening', false)
            ->first();

        if (!$receivable) {
            $receivable = self::create([
                'invoice_id' => null,
                'customer_id' => $salesOrder->customer_id,
                'customer_name' => $salesOrder->customer?->company_name
                    ?? $salesOrder->customer
                    ?? $salesOrder->customer_name
                    ?? 'Unknown Customer',
                'sales_order_id' => $salesOrder->id,
                'invoice_number' => $salesOrder->invoice_number ?? $salesOrder->order_number ?? ('SO-' . $salesOrder->id),
                'invoice_date' => $invoiceDate,
                'due_date' => null,
                'invoice_amount' => $totalAmount,
                'outstanding_amount' => $totalAmount,
                'status' => 'outstanding',
                'created_by' => auth()->id() ?? $salesOrder->created_by,
            ]);
        } else {
            $receivable->update([
                'customer_id' => $salesOrder->customer_id,
                'customer_name' => $salesOrder->customer?->company_name
                    ?? $salesOrder->customer
                    ?? $salesOrder->customer_name
                    ?? $receivable->customer_name,
                'invoice_number' => $salesOrder->invoice_number ?? $receivable->invoice_number,
                'invoice_date' => $invoiceDate,
            ]);
        }

        $components = $receivable->components()->get()->keyBy('component_type');

        $payloads = [
            'main' => [
                'description' => 'Invoice Main (Pre-Invoice)',
                'amount' => $mainAmount,
            ],
            'debit_note' => [
                'description' => 'Debit Note / Reimbursement (Pre-Invoice)',
                'amount' => $reimbursementAmount,
            ],
        ];

        $processedTypes = [];
        foreach ($payloads as $type => $payload) {
            if ($payload['amount'] <= 0) {
                continue;
            }

            $processedTypes[] = $type;
            $component = $components->get($type);

            if (!$component) {
                $component = $receivable->components()->make([
                    'component_type' => $type,
                    'paid_amount' => 0,
                ]);
            }

            $component->description = $payload['description'];
            $component->amount = $payload['amount'];
            $component->paid_amount = min($component->paid_amount, $component->amount);
            $component->outstanding_amount = max(0, $component->amount - $component->paid_amount);
            $component->status = $receivable->determineComponentStatus($component);
            $component->due_date = $receivable->due_date;
            $component->save();
        }

        if (!empty($processedTypes)) {
            $receivable->components()->whereNotIn('component_type', $processedTypes)->delete();
        }

        $receivable->recalculateTotals(true);

        return $receivable->fresh(['components']);
    }

    /**
     * Update Account Receivable from Invoice data after invoice revision
     */
    public function updateFromInvoice(Invoice $invoice): bool
    {
        // Calculate new due date from payment terms
        $dueDate = null;
        if ($invoice->term_days) {
            $dueDays = (int) $invoice->term_days;
            $dueDate = Carbon::parse($invoice->invoice_date)->addDays($dueDays);
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
        $updated = $this->update([
            'invoice_id' => $invoice->id,
            'invoice_number' => $invoice->invoice_number,
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

        $this->syncComponentsFromInvoice($invoice);

        return $updated;
    }

    /**
     * Find or create Account Receivable from Invoice
     */
    public static function syncFromInvoice(Invoice $invoice): self
    {
        $accountReceivable = self::where('invoice_id', $invoice->id)->first();
        if (!$accountReceivable) {
            $accountReceivable = self::where('sales_order_id', $invoice->sales_order_id)
                ->whereNull('invoice_id')
                ->where('is_opening', false)
                ->first();
        }

        if ($accountReceivable) {
            $accountReceivable->updateFromInvoice($invoice);
            $accountReceivable->syncComponentsFromInvoice($invoice);
            return $accountReceivable->fresh();
        } else {
            return self::createFromInvoice($invoice);
        }
    }

    public function syncComponentsFromInvoice(?Invoice $invoice = null): void
    {
        $invoice = $invoice ?? $this->invoice;
        if ($invoice) {
            $invoice->loadMissing('items');
        }

        $existingComponents = $this->components()->get()->keyBy('component_type');
        $paidToDistribute = $existingComponents->isEmpty() ? (float) $this->paid_amount : 0.0;

        $componentPayloads = $this->prepareComponentPayloads($invoice, $paidToDistribute);

        $processedTypes = [];
        foreach ($componentPayloads as $payload) {
            $type = $payload['component_type'];
            $processedTypes[] = $type;

            $component = $existingComponents->get($type);

            if (!$component) {
                $component = $this->components()->make([
                    'component_type' => $type,
                ]);
                $component->paid_amount = $payload['paid_amount'] ?? 0;
            }

            $component->description = $payload['description'] ?? null;
            $component->amount = $payload['amount'];

            if (array_key_exists('paid_amount', $payload) && !$component->exists) {
                $component->paid_amount = min($payload['amount'], $payload['paid_amount']);
            }

            if ($component->paid_amount > $component->amount) {
                $component->paid_amount = $component->amount;
            }

            $component->outstanding_amount = max(0, $component->amount - $component->paid_amount);
            $component->status = $this->determineComponentStatus($component);
            $component->due_date = $this->due_date;
            $component->save();
        }

        if (!empty($processedTypes)) {
            $this->components()->whereNotIn('component_type', $processedTypes)->delete();
        }

        if (empty($componentPayloads) && $existingComponents->isEmpty()) {
            $component = $this->components()->create([
                'component_type' => 'main',
                'description' => 'Invoice Main',
                'amount' => $this->invoice_amount,
                'paid_amount' => $this->paid_amount,
                'outstanding_amount' => max(0, $this->invoice_amount - $this->paid_amount),
                'status' => $this->status,
                'due_date' => $this->due_date,
            ]);

            $component->status = $this->determineComponentStatus($component);
            $component->save();
        }

        $this->recalculateTotals();
    }

    protected function prepareComponentPayloads(?Invoice $invoice, float $paidToDistribute = 0): array
    {
        if (!$invoice) {
            return [];
        }

        $items = $invoice->items ?? collect();

        if ($items->isEmpty()) {
            $invoice->loadMissing('items');
            $items = $invoice->items ?? collect();
        }

        $mainAmount = (float) $items->filter(function ($item) {
            $itemType = strtolower($item->item_type ?? 'billable');
            return $itemType === 'billable' || $item->item_type === null;
        })->sum('amount');

        $debitAmount = (float) $items->filter(function ($item) {
            return strtolower($item->item_type ?? '') === 'reimbursement';
        })->sum('amount');

        $vatAmount = (float) ($invoice->vat_amount ?? 0);

        if ($invoice->invoice_type === 'main' && $mainAmount <= 0) {
            $mainAmount = (float) ($invoice->subtotal ?? 0);
            if ($mainAmount <= 0) {
                $mainAmount = max(0, (float) $invoice->total - $vatAmount);
            }
        }

        if ($invoice->invoice_type === 'reimbursement' && $debitAmount <= 0) {
            $debitAmount = (float) $invoice->total;
        }

        if ($invoice->invoice_type === 'combined' && $mainAmount <= 0 && $debitAmount > 0) {
            $mainAmount = max(0, (float) $invoice->total - $debitAmount - $vatAmount);
        }

        $payloads = [];

        if ($mainAmount > 0) {
            $payloads[] = [
                'component_type' => 'main',
                'description' => 'Invoice Main',
                'amount' => $mainAmount,
            ];
        }

        if ($debitAmount > 0) {
            $payloads[] = [
                'component_type' => 'debit_note',
                'description' => 'Debit Note / Reimbursement',
                'amount' => $debitAmount,
            ];
        }

        if ($vatAmount > 0) {
            $payloads[] = [
                'component_type' => 'vat',
                'description' => 'VAT',
                'amount' => $vatAmount,
            ];
        }

        if (empty($payloads) && (float) $invoice->total > 0) {
            $payloads[] = [
                'component_type' => 'main',
                'description' => 'Invoice Main',
                'amount' => max(0, (float) $invoice->total - $vatAmount),
            ];
        }

        if ($paidToDistribute > 0 && !empty($payloads)) {
            foreach ($payloads as &$payload) {
                $allocated = min($payload['amount'], $paidToDistribute);
                $payload['paid_amount'] = $allocated;
                $paidToDistribute -= $allocated;
            }
        }

        return $payloads;
    }

    protected function determineComponentStatus(AccountReceivableComponent $component): string
    {
        if ($component->outstanding_amount <= 0.01) {
            return 'paid';
        }

        if ($component->paid_amount > 0) {
            return 'partial';
        }

        if ($component->due_date && Carbon::today()->gt(Carbon::parse($component->due_date))) {
            return 'overdue';
        }

        return 'outstanding';
    }

    public function resolveComponentStatus(AccountReceivableComponent $component): string
    {
        return $this->determineComponentStatus($component);
    }

    protected function componentLabel(string $type): string
    {
        return match ($type) {
            'debit_note' => 'Debit Note',
            'vat' => 'VAT',
            default => 'Invoice Main',
        };
    }

    public function recalculateTotals(bool $save = true): array
    {
        $components = $this->components()->get();

        if ($components->isEmpty()) {
            $summary = [
                'invoice_amount' => $this->invoice_amount,
                'paid_amount' => $this->paid_amount,
                'outstanding_amount' => $this->outstanding_amount,
                'status' => $this->status,
            ];

            if ($save) {
                $this->fill($summary)->save();
            }

            $this->syncInvoicePaymentStatus($summary);
            return $summary;
        }

        $totalAmount = (float) $components->sum('amount');
        $totalPaid = (float) $components->sum('paid_amount');
        $totalOutstanding = (float) $components->sum('outstanding_amount');

        $status = 'outstanding';
        if ($totalOutstanding <= 0.01) {
            $status = 'paid';
            $totalOutstanding = 0;
        } elseif ($components->contains(fn ($component) => $component->status === 'overdue')) {
            $status = 'overdue';
        } elseif ($totalPaid > 0) {
            $status = 'partial';
        }

        $summary = [
            'invoice_amount' => $totalAmount,
            'paid_amount' => $totalPaid,
            'outstanding_amount' => $totalOutstanding,
            'status' => $status,
        ];

        if ($save) {
            $this->fill($summary)->save();
        }

        $this->syncInvoicePaymentStatus($summary);

        return $summary;
    }

    protected function syncInvoicePaymentStatus(array $summary): void
    {
        if ($summary['status'] !== 'paid') {
            return;
        }

        $invoice = $this->relationLoaded('invoice') ? $this->invoice : $this->invoice()->first();
        if (!$invoice || $invoice->status === 'paid') {
            return;
        }

        $invoice->update([
            'status' => 'paid',
            'paid_amount' => $summary['paid_amount'],
            'paid_date' => $this->last_payment_date ?? $invoice->paid_date ?? now(),
        ]);
        app(\App\Services\InvoicePostingService::class)->sync($invoice->fresh());
    }
}
