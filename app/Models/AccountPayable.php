<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;
use Illuminate\Support\Collection;

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
        'paid_by',
        'account_id',
    ];

    protected $casts = [
        'vendor_invoice_date' => 'date',
        'payment_due_date' => 'date',
        'payment_date' => 'date',
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'days_overdue' => 'integer',
        'account_id' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $payable) {
            $payable->account_id = $payable->account_id ?: ChartOfAccount::idByCode('2100');
        });

        static::saving(function (self $payable) {
            if (!$payable->account_id) {
                $payable->account_id = ChartOfAccount::idByCode('2100');
            }
        });
    }

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

    public function account(): BelongsTo
    {
        return $this->belongsTo(ChartOfAccount::class);
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

        $grouped = collect($salesOrder->vendor_breakdown)
            ->filter(fn ($item) => is_array($item) && !empty($item['buying_amount']) && floatval($item['buying_amount']) > 0)
            ->groupBy(function ($item) use ($salesOrder) {
                $vendorId = self::normalizeVendorIdentifierValue($item['vendor_id'] ?? null);
                $vendorName = trim((string) ($item['nama_vendor'] ?? ''));

                if ($vendorId !== null) {
                    return 'id_' . $vendorId;
                }

                if ($vendorName === '') {
                    $vendorName = 'Divisi Operational';
                }

                return 'internal_' . strtolower($vendorName);
            });

        foreach ($grouped as $items) {
            $firstItem = $items->first();
            $normalizedVendorId = self::normalizeVendorIdentifierValue($firstItem['vendor_id'] ?? null);
            $totalBuying = $items->sum(function ($item) {
                return (float) ($item['buying_amount'] ?? 0);
            });

            if ($totalBuying <= 0) {
                continue;
            }

            $vendor = $normalizedVendorId ? Vendor::find($normalizedVendorId) : null;
            $vendorName = $vendor?->nama_vendor ?? trim((string) ($firstItem['nama_vendor'] ?? 'Divisi Operational'));

            $descriptions = $items->pluck('description')->filter()->map(fn ($desc) => trim((string) $desc))->filter()->unique()->values();
            $remarks = $items->pluck('remarks')->filter()->map(fn ($remark) => trim((string) $remark))->filter()->unique()->values();

            $lookup = [
                'sales_order_id' => $salesOrder->id,
                'vendor_id' => $normalizedVendorId,
            ];

            if ($normalizedVendorId === null) {
                $lookup['vendor_name'] = $vendorName;
            }

            $payable = self::firstOrNew($lookup);

            $serviceDescription = $descriptions->isNotEmpty() ? $descriptions->implode(', ') : 'Vendor Payment';
            $serviceRemarks = $remarks->isNotEmpty() ? $remarks->implode(PHP_EOL) : null;

            if (!$payable->exists) {
                $payable->fill([
                    'vendor_name' => $vendorName,
                    'vendor_invoice_number' => $firstItem['rcvd_inv'] ?? null,
                    'service_description' => $serviceDescription,
                    'service_remarks' => $serviceRemarks,
                    'amount' => $totalBuying,
                    'paid_amount' => 0,
                    'outstanding_amount' => $totalBuying,
                    'status' => $totalBuying > 0 ? 'unpaid' : 'paid',
                    'vendor_bank_account' => $vendor?->nomor_rekening,
                    'vendor_account_name' => $vendor?->nama_rekening,
                    'created_by' => auth()->id(),
                ]);
            } else {
                $payable->vendor_name = $vendorName;
                $payable->service_description = $serviceDescription;
                $payable->service_remarks = $serviceRemarks ?? $payable->service_remarks;
                $payable->vendor_bank_account = $vendor?->nomor_rekening ?? $payable->vendor_bank_account;
                $payable->vendor_account_name = $vendor?->nama_rekening ?? $payable->vendor_account_name;
                $payable->amount = $totalBuying;
                $payable->outstanding_amount = max(0, $payable->amount - $payable->paid_amount);

                if ($payable->outstanding_amount <= 0.01) {
                    $payable->status = 'paid';
                } elseif ($payable->paid_amount > 0 && $payable->outstanding_amount > 0.01) {
                    $payable->status = 'partial';
                } else {
                    $payable->status = 'unpaid';
                }
            }

            $payable->save();
            $payable->syncComponents();
        }
    }

    /**
     * Sync components from sales order and related invoices
     */
    public function syncComponents(): void
    {
        $this->loadMissing(['salesOrder']);

        $existingComponentsCollection = $this->components()->get();
        $existingComponents = $existingComponentsCollection->keyBy(function ($item) {
            return $this->computeExistingComponentKey($item);
        });

        $paidToDistribute = $existingComponentsCollection->isEmpty() ? (float) $this->paid_amount : 0.0;

        $componentPayloads = $this->prepareComponentPayloads($paidToDistribute, $existingComponentsCollection);

        $processedKeys = [];
        foreach ($componentPayloads as $payload) {
            $type = $payload['component_type'];
            $vendorId = $payload['vendor_id'] ?? null;
            $lookupReference = $payload['lookup_reference'] ?? null;
            $key = $this->makeComponentLookupKey($type, $vendorId, $lookupReference);
            $processedKeys[] = $key;

            $component = $existingComponents->get($key);

            if (!$component) {
                // Create new component
                $component = $this->components()->make([
                    'component_type' => $type,
                ]);
                $component->paid_amount = $payload['paid_amount'] ?? 0;

                // Set these fields only on creation
                $relatedItemsPayload = $payload['related_items'] ?? [];
                if ($lookupReference !== null) {
                    $relatedItemsPayload['lookup_ref'] = $lookupReference;
                }

                $component->description = $payload['description'] ?? null;
                $component->amount = $payload['amount'];
                $component->recipient_name = $payload['recipient_name'] ?? null;
                $component->vendor_id = $payload['vendor_id'] ?? null;
                $component->related_items = !empty($relatedItemsPayload) ? $relatedItemsPayload : null;

                if (array_key_exists('paid_amount', $payload)) {
                    $component->paid_amount = min($payload['amount'], $payload['paid_amount']);
                }
            } else {
                // Component exists - only update non-financial fields
                // DO NOT update amount to prevent duplication bug
                $component->description = $payload['description'] ?? $component->description;
                $component->recipient_name = $payload['recipient_name'] ?? $component->recipient_name;
                $existingRelatedItems = is_array($component->related_items) ? $component->related_items : [];
                if (!empty($payload['related_items'])) {
                    $existingRelatedItems = array_merge($existingRelatedItems, $payload['related_items']);
                }
                if ($lookupReference !== null) {
                    $existingRelatedItems['lookup_ref'] = $lookupReference;
                }
                $component->related_items = !empty($existingRelatedItems) ? $existingRelatedItems : null;
                if (array_key_exists('vendor_id', $payload)) {
                    $component->vendor_id = $payload['vendor_id'];
                }
                if (isset($payload['amount']) && abs((float) $component->amount - (float) $payload['amount']) > 0.01) {
                    $component->amount = (float) $payload['amount'];
                }
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
        if (!empty($processedKeys)) {
            $processedKeys = array_unique($processedKeys);
            foreach ($existingComponentsCollection as $existingComponent) {
                $existingKey = $this->computeExistingComponentKey($existingComponent);
                if (!in_array($existingKey, $processedKeys, true)) {
                    $existingComponent->delete();
                }
            }
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
    protected function prepareComponentPayloads(float $paidToDistribute = 0, ?Collection $existingComponents = null): array
    {
        $payloads = [];
        $existingComponents = $existingComponents ?? collect();

        // Preserve manual components (created via AP detail modal)
        $manualComponents = $existingComponents->filter(function ($component) {
            $related = $component->related_items;
            return is_array($related) && ($related['source'] ?? null) === 'account_payable_manual_entry';
        });

        foreach ($manualComponents as $component) {
            $payloads[] = [
                'component_type' => $component->component_type,
                'description' => $component->description,
                'amount' => (float) $component->amount,
                'recipient_name' => $component->recipient_name,
                'vendor_id' => $component->vendor_id,
                'related_items' => $component->related_items,
                'lookup_reference' => 'manual_component_' . $component->id,
                'paid_amount' => (float) $component->paid_amount,
            ];
        }

        $vendorPaymentEntries = $this->collectVendorPaymentEntries();

        $existingVendorComponents = $existingComponents->filter(function ($component) {
            return $component->component_type === 'vendor_payment';
        });

        $existingVendorByReference = $existingVendorComponents->filter(function ($component) {
            $related = $component->related_items;
            return is_array($related) && !empty($related['lookup_ref']);
        })->keyBy(function ($component) {
            return $component->related_items['lookup_ref'];
        });

        $legacyVendorComponents = $existingVendorComponents->filter(function ($component) {
            $related = $component->related_items;
            return !is_array($related) || empty($related['lookup_ref']);
        })->values();

        $legacyPaidPool = $legacyVendorComponents->sum('paid_amount');
        $remainingLegacyPaid = $legacyPaidPool;
        $remainingLegacyAmount = $vendorPaymentEntries->sum('amount');

        if ($vendorPaymentEntries->isNotEmpty()) {
            foreach ($vendorPaymentEntries as $entry) {
                $lookupRef = $entry['lookup_ref'];
                $existingForEntry = $existingVendorByReference->get($lookupRef);
                $legacyFallbackComponent = $legacyVendorComponents->first();

                $paidAmount = $existingForEntry ? (float) $existingForEntry->paid_amount : 0.0;
                if (!$existingForEntry && $remainingLegacyPaid > 0 && $remainingLegacyAmount > 0) {
                    $allocationRatio = $entry['amount'] / $remainingLegacyAmount;
                    $allocation = $allocationRatio > 0 ? $allocationRatio * $remainingLegacyPaid : 0.0;
                    $paidAmount = min($entry['amount'], $allocation);
                    $remainingLegacyPaid = max(0.0, $remainingLegacyPaid - $paidAmount);
                    $remainingLegacyAmount = max(0.0, $remainingLegacyAmount - $entry['amount']);
                }

                $descriptionCandidates = $entry['description'] !== '' ? [$entry['description']] : [];
                $relatedItems = [
                    'source' => 'vendor_breakdown',
                    'vendor_breakdown_index' => $entry['entry_index'],
                ];

                if ($entry['entry_id'] !== null) {
                    $relatedItems['vendor_breakdown_id'] = $entry['entry_id'];
                }

                $payload = [
                    'component_type' => 'vendor_payment',
                    'description' => $this->buildVendorPaymentDescription(
                        $descriptionCandidates,
                        $existingForEntry ?? $legacyFallbackComponent
                    ),
                    'amount' => $entry['amount'],
                    'recipient_name' => $this->vendor_name,
                    'vendor_id' => $this->vendor_id,
                    'related_items' => $relatedItems,
                    'lookup_reference' => $lookupRef,
                ];

                if ($paidAmount > 0) {
                    $payload['paid_amount'] = min($entry['amount'], $paidAmount);
                }

                $payloads[] = $payload;
            }
        } elseif ($existingVendorComponents->isNotEmpty()) {
            /** @var AccountPayableComponent|null $existingVendorComponent */
            $existingVendorComponent = $existingVendorComponents->first();
            if ($existingVendorComponent && (float) $existingVendorComponent->amount > 0) {
                $payload = [
                    'component_type' => 'vendor_payment',
                    'description' => $existingVendorComponent->description ?? $this->service_description,
                    'amount' => (float) $existingVendorComponent->amount,
                    'recipient_name' => $existingVendorComponent->recipient_name ?? $this->vendor_name,
                    'vendor_id' => $existingVendorComponent->vendor_id ?? $this->vendor_id,
                ];

                $related = $existingVendorComponent->related_items;
                if (is_array($related) && !empty($related)) {
                    $payload['related_items'] = $related;
                    if (!empty($related['lookup_ref'])) {
                        $payload['lookup_reference'] = $related['lookup_ref'];
                    }
                }

                if ((float) $existingVendorComponent->paid_amount > 0) {
                    $payload['paid_amount'] = min(
                        (float) $existingVendorComponent->amount,
                        (float) $existingVendorComponent->paid_amount
                    );
                }

                $payloads[] = $payload;
            }
        }

        $invoiceItems = $this->collectInvoiceItemsForVendor();

        if ($invoiceItems->isNotEmpty()) {
            $operationalItems = $invoiceItems->where('item_type', 'operational_cost');
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

            $reimbursementItems = $invoiceItems->where('item_type', 'reimbursement');
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

        if ($paidToDistribute > 0 && !empty($payloads)) {
            $totalAmount = array_sum(array_column($payloads, 'amount'));
            foreach ($payloads as &$payload) {
                if (isset($payload['paid_amount']) && $payload['paid_amount'] !== null) {
                    continue;
                }
                $ratio = $totalAmount > 0 ? $payload['amount'] / $totalAmount : 0;
                $allocated = $ratio * $paidToDistribute;
                $payload['paid_amount'] = min($payload['amount'], $allocated);
            }
            unset($payload);
        }

        return $payloads;
    }

    protected function collectVendorPaymentEntries(): Collection
    {
        if (!$this->salesOrder || !is_array($this->salesOrder->vendor_breakdown)) {
            return collect();
        }

        $payableVendorId = $this->vendor_id ? (int) $this->vendor_id : null;
        $payableVendorName = $this->vendor_name ? trim((string) $this->vendor_name) : null;

        return collect($this->salesOrder->vendor_breakdown)
            ->values()
            ->filter(function ($entry) {
                return is_array($entry);
            })
            ->map(function ($entry, $index) use ($payableVendorId, $payableVendorName) {
                $entryVendorId = $this->normalizeVendorIdentifier($entry['vendor_id'] ?? null);
                $entryVendorName = isset($entry['nama_vendor']) ? trim((string) $entry['nama_vendor']) : null;

                $matchesVendor = $payableVendorId === $entryVendorId;

                if (!$matchesVendor) {
                    $entryIsInternal = $entryVendorId === null;
                    $payableIsInternal = $payableVendorId === null;

                    if ($payableIsInternal && $entryIsInternal) {
                        $matchesVendor = true;
                    } elseif ($payableIsInternal && $payableVendorName && $entryVendorName) {
                        $matchesVendor = strcasecmp($payableVendorName, $entryVendorName) === 0;
                    }
                }

                if (!$matchesVendor) {
                    return null;
                }

                $amount = (float) ($entry['buying_amount'] ?? 0);
                if ($amount <= 0) {
                    return null;
                }

                $description = trim((string) ($entry['description'] ?? ''));

                $lookupRef = $entry['id'] ?? null;
                if ($lookupRef === null) {
                    $lookupRef = md5(json_encode([
                        'index' => $index,
                        'description' => $description,
                        'amount' => $amount,
                    ]));
                } else {
                    $lookupRef = (string) $lookupRef;
                }

                return [
                    'amount' => $amount,
                    'description' => $description,
                    'entry_index' => $index,
                    'entry_id' => $entry['id'] ?? null,
                    'lookup_ref' => $lookupRef,
                ];
            })
            ->filter()
            ->values();
    }

    protected function makeComponentLookupKey(string $componentType, $vendorId, ?string $reference = null): string
    {
        $base = $componentType . '_' . ($vendorId ?? 'null');

        return $reference ? $base . '_' . $reference : $base;
    }

    protected function computeExistingComponentKey(AccountPayableComponent $component): string
    {
        $relatedItems = $component->related_items;
        $reference = null;

        if (is_array($relatedItems) && !empty($relatedItems['lookup_ref'])) {
            $reference = (string) $relatedItems['lookup_ref'];
        } elseif (
            is_array($relatedItems) &&
            ($relatedItems['source'] ?? null) === 'account_payable_manual_entry' &&
            $component->id
        ) {
            $reference = 'manual_component_' . $component->id;
        }

        return $this->makeComponentLookupKey($component->component_type, $component->vendor_id, $reference);
    }

    protected function collectInvoiceItemsForVendor(): Collection
    {
        if (!$this->sales_order_id) {
            return collect();
        }

        return InvoiceItem::query()
            ->whereHas('invoice', function ($query) {
                $query->where('sales_order_id', $this->sales_order_id);
            })
            ->whereIn('item_type', ['operational_cost', 'reimbursement'])
            ->where(function ($query) {
                if ($this->vendor_id) {
                    $query->where('vendor_id', $this->vendor_id);
                } else {
                    $query->whereNull('vendor_id');
                }
            })
            ->where(function ($query) {
                $query->whereNull('item_ref')
                      ->orWhere('item_ref', 'not like', 'cogs_vendor_%');
            })
            ->get();
    }

    protected function buildVendorPaymentDescription(array $descriptions, ?AccountPayableComponent $existingComponent = null): string
    {
        if (!empty($descriptions)) {
            return implode(', ', $descriptions);
        }

        if ($existingComponent && $existingComponent->description) {
            return $existingComponent->description;
        }

        return $this->service_description ?? 'Vendor Payment';
    }

    protected function normalizeVendorIdentifier($value): ?int
    {
        return static::normalizeVendorIdentifierValue($value);
    }

    protected static function normalizeVendorIdentifierValue($value): ?int
    {
        if ($value === null) {
            return null;
        }

        if (is_numeric($value)) {
            return (int) $value;
        }

        if (is_string($value)) {
            $trimmed = trim($value);
            if ($trimmed === '' || strtolower($trimmed) === 'internal') {
                return null;
            }

            if (is_numeric($trimmed)) {
                return (int) $trimmed;
            }
        }

        return null;
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
