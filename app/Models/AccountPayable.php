<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
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

    public function components(): HasMany
    {
        return $this->hasMany(AccountPayableComponent::class);
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

    /**
     * Sync components from sales order and related invoices
     */
    public function syncComponents(): void
    {
        // FIX: Use composite key (component_type + vendor_id) for proper matching
        $existingComponents = $this->components()->get()->keyBy(function ($item) {
            return $item->component_type . '_' . ($item->vendor_id ?? 'null');
        });

        $paidToDistribute = $existingComponents->isEmpty() ? (float) $this->paid_amount : 0.0;

        $componentPayloads = $this->prepareComponentPayloads($paidToDistribute);

        $processedTypes = [];
        foreach ($componentPayloads as $payload) {
            $type = $payload['component_type'];
            $key = $type . '_' . ($payload['vendor_id'] ?? 'null');
            $processedTypes[] = $key;

            $component = $existingComponents->get($key);

            if (!$component) {
                // Create new component
                $component = $this->components()->make([
                    'component_type' => $type,
                ]);
                $component->paid_amount = $payload['paid_amount'] ?? 0;

                // Set these fields only on creation
                $component->description = $payload['description'] ?? null;
                $component->amount = $payload['amount'];
                $component->recipient_name = $payload['recipient_name'] ?? null;
                $component->vendor_id = $payload['vendor_id'] ?? null;
                $component->related_items = $payload['related_items'] ?? null;

                if (array_key_exists('paid_amount', $payload)) {
                    $component->paid_amount = min($payload['amount'], $payload['paid_amount']);
                }
            } else {
                // Component exists - only update non-financial fields
                // DO NOT update amount to prevent duplication bug
                $component->description = $payload['description'] ?? $component->description;
                $component->recipient_name = $payload['recipient_name'] ?? $component->recipient_name;
                $component->related_items = $payload['related_items'] ?? $component->related_items;
            }

            if ($component->paid_amount > $component->amount) {
                $component->paid_amount = $component->amount;
            }

            $component->outstanding_amount = max(0, $component->amount - $component->paid_amount);
            $component->status = $this->determineComponentStatus($component);
            $component->due_date = $this->payment_due_date;
            $component->save();
        }

        // Remove components that are no longer relevant
        if (!empty($processedTypes)) {
            $this->components()->whereNotIn(
                \DB::raw("CONCAT(component_type, '_', COALESCE(vendor_id, 'null'))"),
                $processedTypes
            )->delete();
        }

        // If no components exist, create a default one from main record
        if (empty($componentPayloads) && $existingComponents->isEmpty() && $this->amount > 0) {
            $componentType = $this->vendor_name === 'Divisi Operational' ? 'operational_cost' : 'vendor_payment';

            $this->components()->create([
                'component_type' => $componentType,
                'description' => $this->service_description,
                'amount' => $this->amount,
                'paid_amount' => $this->paid_amount,
                'outstanding_amount' => max(0, $this->amount - $this->paid_amount),
                'status' => $this->status,
                'due_date' => $this->payment_due_date,
                'recipient_name' => $this->vendor_name,
                'vendor_id' => $this->vendor_id,
            ]);
        }

        $this->recalculateTotals();
    }

    /**
     * Prepare component payloads from various sources
     */
    protected function prepareComponentPayloads(float $paidToDistribute = 0): array
    {
        $payloads = [];

        // For vendor payments from vendor_breakdown (not operational/reimbursement)
        if ($this->vendor_id && $this->vendor_name !== 'Divisi Operational') {
            // Check if this is from vendor_breakdown or from invoice items
            $hasInvoiceItems = false;
            if ($this->salesOrder) {
                $hasInvoiceItems = $this->salesOrder->invoices()
                    ->whereHas('items', function ($q) {
                        $q->whereIn('item_type', ['operational_cost', 'reimbursement'])
                          ->where('vendor_id', $this->vendor_id);
                    })
                    ->exists();
            }

            if (!$hasInvoiceItems) {
                // Traditional vendor payment from vendor_breakdown
                $payloads[] = [
                    'component_type' => 'vendor_payment',
                    'description' => $this->service_description,
                    'amount' => (float) $this->amount,
                    'recipient_name' => $this->vendor_name,
                    'vendor_id' => $this->vendor_id,
                ];
                return $payloads;
            }
        }

        // Get invoice items that match this payable's vendor
        if ($this->salesOrder) {
            $invoice = $this->salesOrder->invoices()
                ->whereHas('items', function ($q) {
                    $q->whereIn('item_type', ['operational_cost', 'reimbursement']);

                    // Filter by vendor_id matching this payable
                    if ($this->vendor_id) {
                        $q->where('vendor_id', $this->vendor_id);
                    } else {
                        // For internal (Divisi Operational), get items with null vendor_id
                        $q->whereNull('vendor_id');
                    }
                })
                ->first();

            if ($invoice) {
                // Get operational cost items for this vendor
                $operationalItems = $invoice->items()
                    ->where('item_type', 'operational_cost')
                    ->where(function ($q) {
                        if ($this->vendor_id) {
                            $q->where('vendor_id', $this->vendor_id);
                        } else {
                            $q->whereNull('vendor_id');
                        }
                    })
                    ->get();

                $totalOperational = (float) $operationalItems->sum('amount');

                if ($totalOperational > 0) {
                    $payloads[] = [
                        'component_type' => 'operational_cost',
                        'description' => 'Biaya Operational',
                        'amount' => $totalOperational,
                        'recipient_name' => $this->vendor_name,
                        'vendor_id' => $this->vendor_id,
                        'related_items' => $operationalItems->pluck('id')->toArray(),
                    ];
                }

                // Get reimbursement items for this vendor
                $reimbursementItems = $invoice->items()
                    ->where('item_type', 'reimbursement')
                    ->where(function ($q) {
                        if ($this->vendor_id) {
                            $q->where('vendor_id', $this->vendor_id);
                        } else {
                            $q->whereNull('vendor_id');
                        }
                    })
                    ->get();

                $totalReimbursement = (float) $reimbursementItems->sum('amount');

                if ($totalReimbursement > 0) {
                    $payloads[] = [
                        'component_type' => 'reimbursement',
                        'description' => 'Reimbursement',
                        'amount' => $totalReimbursement,
                        'recipient_name' => $this->vendor_name,
                        'vendor_id' => $this->vendor_id,
                        'related_items' => $reimbursementItems->pluck('id')->toArray(),
                    ];
                }
            }
        }

        // Distribute paid amount proportionally if exists
        if ($paidToDistribute > 0 && !empty($payloads)) {
            $totalAmount = array_sum(array_column($payloads, 'amount'));
            foreach ($payloads as &$payload) {
                $ratio = $totalAmount > 0 ? $payload['amount'] / $totalAmount : 0;
                $allocated = $ratio * $paidToDistribute;
                $payload['paid_amount'] = min($payload['amount'], $allocated);
            }
        }

        return $payloads;
    }

    /**
     * Determine component status based on payment
     */
    protected function determineComponentStatus(AccountPayableComponent $component): string
    {
        if ($component->outstanding_amount <= 0.01) {
            return 'paid';
        }

        if ($component->paid_amount > 0) {
            return 'partial';
        }

        return 'unpaid';
    }

    /**
     * Record payment to a specific component
     */
    public function recordPaymentToComponent(
        ?AccountPayableComponent $component,
        float $amount,
        string $paymentMethod = null,
        string $notes = null,
        $paymentDate = null
    ): bool {
        // Sync components first
        $this->syncComponents();

        $components = $this->components()->get();

        // If no components, use old method
        if ($components->isEmpty()) {
            return $this->markAsPaid($amount, $paymentMethod, $notes);
        }

        // Get the component to pay
        $component = $component ?: $components->first();

        if (!$component || $component->account_payable_id !== $this->id) {
            return false;
        }

        if ($amount <= 0 || $amount > $component->outstanding_amount) {
            return false;
        }

        // Update component
        $component->paid_amount = $component->paid_amount + $amount;
        $component->outstanding_amount = max(0, $component->amount - $component->paid_amount);
        $component->status = $this->determineComponentStatus($component);
        $component->save();

        // Recalculate totals
        $summary = $this->recalculateTotals(false);

        // Build note entry
        $label = $component->getComponentLabel();
        $noteEntry = "Payment to {$label} - {$component->recipient_name} (Rp " . number_format($amount, 2, '.', ',') . ')';
        if ($notes) {
            $noteEntry .= ' - ' . $notes;
        }

        // Update main record
        $this->fill($summary);
        $this->payment_date = $paymentDate ?? now();
        $this->payment_method = $paymentMethod;
        $this->payment_notes = $noteEntry
            ? ($this->payment_notes ? $this->payment_notes . "\n" . $noteEntry : $noteEntry)
            : $this->payment_notes;
        $this->paid_by = auth()->id();
        $this->save();

        return true;
    }

    /**
     * Recalculate totals from components
     */
    public function recalculateTotals(bool $save = true): array
    {
        $components = $this->components()->get();

        if ($components->isEmpty()) {
            $summary = [
                'amount' => $this->amount,
                'paid_amount' => $this->paid_amount,
                'outstanding_amount' => $this->outstanding_amount,
                'status' => $this->status,
            ];

            if ($save) {
                $this->fill($summary)->save();
            }

            return $summary;
        }

        $totalAmount = (float) $components->sum('amount');
        $totalPaid = (float) $components->sum('paid_amount');
        $totalOutstanding = (float) $components->sum('outstanding_amount');

        $status = 'unpaid';
        if ($totalOutstanding <= 0.01) {
            $status = 'paid';
            $totalOutstanding = 0;
        } elseif ($totalPaid > 0) {
            $status = 'partial';
        }

        $summary = [
            'amount' => $totalAmount,
            'paid_amount' => $totalPaid,
            'outstanding_amount' => $totalOutstanding,
            'status' => $status,
        ];

        if ($save) {
            $this->fill($summary)->save();
        }

        return $summary;
    }
}
