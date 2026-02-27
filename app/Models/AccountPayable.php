<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;
use Illuminate\Support\Collection;
use App\Models\Vendor;
use App\Models\SalesOrderVendorItem;
use App\Models\ChartOfAccount;
use App\Models\FinancialPositionAdjustment;
use App\Models\AccountPayableNote;
use Illuminate\Support\Facades\DB;

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
        'is_opening',
        'opening_type',
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
        'source_so_number',
        'opening_payment_date',
        'vat_receivable_rate',
        'vat_receivable_amount',
        'vat_receivable_posted_at',
        'vat_receivable_account_id',
        'vat_payable_rate',
        'vat_payable_amount',
        'vat_payable_posted_at',
        'vat_payable_account_id',
        'pph23_payable_rate',
        'pph23_payable_amount',
        'pph23_payable_posted_at',
        'pph23_payable_account_id',
    ];

    protected $casts = [
        'vendor_invoice_date' => 'date',
        'payment_due_date' => 'date',
        'payment_date' => 'date',
        'amount' => 'decimal:2',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'is_opening' => 'boolean',
        'opening_payment_date' => 'date',
        'days_overdue' => 'integer',
        'account_id' => 'integer',
        'vat_receivable_rate' => 'decimal:2',
        'vat_receivable_amount' => 'decimal:2',
        'vat_receivable_posted_at' => 'datetime',
        'vat_receivable_account_id' => 'integer',
        'vat_payable_rate' => 'decimal:2',
        'vat_payable_amount' => 'decimal:2',
        'vat_payable_posted_at' => 'datetime',
        'vat_payable_account_id' => 'integer',
        'pph23_payable_rate' => 'decimal:2',
        'pph23_payable_amount' => 'decimal:2',
        'pph23_payable_posted_at' => 'datetime',
        'pph23_payable_account_id' => 'integer',
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

    public function notes(): HasMany
    {
        return $this->hasMany(AccountPayableNote::class);
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

        $mergedNotes = $this->payment_notes;
        if ($notes) {
            $mergedNotes = $this->buildPaymentNotes($mergedNotes, $notes);
        }

        $this->update([
            'paid_amount' => $newPaidAmount,
            'outstanding_amount' => $newOutstandingAmount,
            'status' => $newStatus,
            'payment_date' => now(),
            'payment_method' => $paymentMethod,
            'payment_notes' => $mergedNotes,
            'paid_by' => auth()->id(),
            'days_overdue' => 0
        ]);

        if ($notes) {
            $this->logPaymentNote($notes, null, 'payment');
        }

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
        $lineAmount = self::calculateVendorBreakdownAmount($vendorBreakdownItem);

        return self::create([
            'sales_order_id' => $salesOrder->id,
            'vendor_id' => $vendor?->id,
            'vendor_name' => $vendor?->nama_vendor ?? $vendorBreakdownItem['nama_vendor'] ?? 'Unknown Vendor',
            'vendor_invoice_number' => $vendorBreakdownItem['rcvd_inv'] ?? null,
            'service_description' => $vendorBreakdownItem['description'] ?? 'Service',
            'service_remarks' => $vendorBreakdownItem['remarks'] ?? null,
            'amount' => $lineAmount,
            'outstanding_amount' => $lineAmount,
            'vendor_bank_account' => $vendor?->nomor_rekening,
            'vendor_account_name' => $vendor?->nama_rekening,
            'created_by' => auth()->id()
        ]);
    }

    public static function generateFromSalesOrder(SalesOrder $salesOrder): void
    {
        $vendorBreakdown = is_array($salesOrder->vendor_breakdown) ? $salesOrder->vendor_breakdown : [];
        $baseVendorBreakdown = $vendorBreakdown;

        // Prefer vendor breakdown items table if available
        $vendorItems = $salesOrder->relationLoaded('vendorBreakdownItems')
            ? $salesOrder->vendorBreakdownItems
            : $salesOrder->vendorBreakdownItems()->get();

        if ($vendorItems && $vendorItems->isNotEmpty()) {
            $vendorBreakdown = $vendorItems
                ->map(fn (SalesOrderVendorItem $item) => $item->toVendorBreakdownArray())
                ->all();
        }

        // Tambahkan other_costs (refund/operational) sebagai vendor breakdown untuk hutang
        if (is_array($salesOrder->other_costs) && !empty($salesOrder->other_costs)) {
            $mappedOtherCosts = collect($salesOrder->other_costs)
                ->filter(function ($item) {
                    if (!is_array($item) || !isset($item['amount'])) {
                        return false;
                    }
                    $amount = (float) $item['amount'];
                    if ($amount <= 0) {
                        return false;
                    }
                    $vendorId = self::normalizeVendorIdentifierValue($item['vendor_id'] ?? null);
                    $vendorName = $item['vendor_name'] ?? ($item['category'] ?? null);
                    return $vendorId !== null || !empty($vendorName);
                })
                ->map(function ($item) {
                    $vendorId = self::normalizeVendorIdentifierValue($item['vendor_id'] ?? null);
                    $vendor = $vendorId ? Vendor::find($vendorId) : null;
                    return [
                        'vendor_id' => $vendorId,
                        'nama_vendor' => $vendor?->nama_vendor ?? ($item['vendor_name'] ?? ($item['category'] ?? 'Divisi Operational')),
                        'description' => $item['description'] ?? 'Other Cost',
                        'remarks' => $item['remarks'] ?? ($item['category'] ?? null),
                        'buying_amount' => (float) ($item['amount'] ?? 0),
                        'id' => $item['id'] ?? null,
                    ];
                })
                ->values()
                ->all();

            $vendorBreakdown = array_merge($vendorBreakdown, $mappedOtherCosts);
        }

        // Tambahkan reimbursement items sebagai vendor breakdown agar ada payable per vendor reimbursement
        $mappedReimbursements = collect();
        if ($salesOrder->relationLoaded('reimbursementItems')) {
            $reimbursementItems = $salesOrder->reimbursementItems;
        } else {
            $reimbursementItems = $salesOrder->reimbursementItems()->get();
        }
        if ($reimbursementItems && $reimbursementItems->isNotEmpty()) {
            $mappedReimbursements = $reimbursementItems
                ->filter(function ($item) {
                    return (float) ($item->amount ?? 0) > 0 && ($item->status ?? null) !== 'paid';
                })
                ->map(function ($item) {
                    $vendorId = self::normalizeVendorIdentifierValue($item->vendor_id ?? null);
                    $vendorName = $item->vendor?->nama_vendor
                        ?? data_get($item->receipt_info ?? [], 'vendor_name')
                        ?? ($item->category ?? 'Divisi Operational');
                    $quantity = is_numeric($item->quantity) && (float) $item->quantity > 0
                        ? (float) $item->quantity
                        : 1;
                    $amount = (float) $item->amount * $quantity;
                    return [
                        'vendor_id' => $vendorId,
                        'nama_vendor' => $vendorName,
                        'description' => $item->description ?? 'Reimbursement',
                        'remarks' => $item->notes ?? null,
                        'buying_amount' => $amount,
                        'id' => 'reimbursement_' . $item->id,
                    ];
                })
                ->values();
        }

        if ($mappedReimbursements->isNotEmpty()) {
            $vendorBreakdown = array_merge($vendorBreakdown, $mappedReimbursements->all());
        }

        if (empty($vendorBreakdown)) {
            return;
        }

        // Set ulang vendor_breakdown pada model untuk sinkronisasi komponen
        $salesOrder->setAttribute('vendor_breakdown', $vendorBreakdown);

        $existingPayables = self::where('sales_order_id', $salesOrder->id)->get();
        $existingMap = $existingPayables->keyBy(function (self $payable) {
            return self::makeVendorGroupKey($payable->vendor_id, $payable->vendor_name);
        });
        $processedKeys = [];

        $grouped = collect($salesOrder->vendor_breakdown)
            ->filter(fn ($item) => is_array($item) && !empty($item['buying_amount']) && floatval($item['buying_amount']) > 0)
            ->groupBy(function ($item) use ($salesOrder) {
                $vendorId = self::normalizeVendorIdentifierValue($item['vendor_id'] ?? null);
                $vendorName = trim((string) ($item['nama_vendor'] ?? ''));

                return self::makeVendorGroupKey($vendorId, $vendorName);
            });

        foreach ($grouped as $items) {
            $firstItem = $items->first();
            $normalizedVendorId = self::normalizeVendorIdentifierValue($firstItem['vendor_id'] ?? null);
            $totalBuying = $items->sum(function ($item) {
                return self::calculateVendorBreakdownAmount(is_array($item) ? $item : []);
            });

            if ($totalBuying <= 0) {
                continue;
            }

            $vendor = $normalizedVendorId ? Vendor::find($normalizedVendorId) : null;
            $vendorName = $vendor?->nama_vendor ?? trim((string) ($firstItem['nama_vendor'] ?? 'Divisi Operational'));
            $vendorKey = self::makeVendorGroupKey($normalizedVendorId, $vendorName);
            $processedKeys[] = $vendorKey;

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

        // Hapus hutang lama yang tidak lagi muncul di vendor_breakdown
        if (!empty($processedKeys)) {
            $staleKeys = $existingMap->keys()->diff($processedKeys);
        } else {
            $staleKeys = $existingMap->keys();
        }

        foreach ($staleKeys as $key) {
            /** @var self|null $stale */
            $stale = $existingMap->get($key);
            if ($stale) {
                $stale->components()->delete();
                $stale->delete();
            }
        }

        // Kembalikan vendor_breakdown ke nilai asli agar data SO tidak tercampur reimbursement
        $salesOrder->setAttribute('vendor_breakdown', $baseVendorBreakdown);
    }

    private static function makeVendorGroupKey($vendorId, ?string $vendorName): string
    {
        if ($vendorId !== null) {
            return 'id_' . (int) $vendorId;
        }

        $name = trim(strtolower($vendorName ?? ''));
        if ($name === '') {
            $name = 'divisi operational';
        }

        return 'internal_' . $name;
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
        $processedExistingKeys = [];

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
            $matchedExistingKey = $component ? $key : null;

            if (!$component) {
                // Fallback: cari komponen existing yang belum diproses dengan tipe/vendor/description yang sama
                $fallback = $existingComponentsCollection
                    ->filter(function ($item) use ($type, $vendorId, $payload, $processedExistingKeys) {
                        $existingKey = $this->computeExistingComponentKey($item);
                        if (in_array($existingKey, $processedExistingKeys, true)) {
                            return false;
                        }
                        if ($item->component_type !== $type) {
                            return false;
                        }
                        if ((int) $item->vendor_id !== (int) ($vendorId ?? null)) {
                            return false;
                        }
                        $descMatch = trim(strtolower($item->description ?? '')) === trim(strtolower($payload['description'] ?? ''));
                        return $descMatch;
                    })
                    ->first();

                if ($fallback) {
                    $component = $fallback;
                    $matchedExistingKey = $this->computeExistingComponentKey($component);
                    $processedExistingKeys[] = $matchedExistingKey;
                }
            } else {
                $processedExistingKeys[] = $matchedExistingKey;
            }

            if ($component) {
                // Pastikan lookup_ref terisi agar stabil
                $existingRelatedItems = is_array($component->related_items) ? $component->related_items : [];
                if ($lookupReference !== null) {
                    $existingRelatedItems['lookup_ref'] = $lookupReference;
                }
                $component->related_items = !empty($existingRelatedItems) ? $existingRelatedItems : null;
            }

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
                // Component exists - update fields dan pertahankan paid_amount
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
                // Pertahankan paid_amount lama, tetapi batasi ke amount baru
                $component->paid_amount = min((float) $component->paid_amount, (float) $component->amount);
            }

            if ($component->paid_amount > $component->amount) {
                $component->paid_amount = $component->amount;
            }

            $component->outstanding_amount = max(0, $component->amount - $component->paid_amount);
            $component->status = $this->determineComponentStatus($component);
            $component->due_date = $this->payment_due_date;
            $component->save();

        }

        // Hapus komponen yang tidak lagi relevan (lookup_ref tidak muncul di payload)
        if (!empty($processedKeys)) {
            $processedKeys = array_unique(array_merge($processedKeys, $processedExistingKeys));
            foreach ($existingComponentsCollection as $existingComponent) {
                $existingKey = $this->computeExistingComponentKey($existingComponent);
                $isManual = $this->isProtectedComponentSource(
                    is_array($existingComponent->related_items) ? $existingComponent->related_items : null
                );
                $shouldDelete = !in_array($existingKey, $processedKeys, true)
                    && $existingComponent->status !== 'paid'
                    && !$isManual;

                if ($shouldDelete) {
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
            return $this->isProtectedComponentSource(is_array($related) ? $related : null);
        });

        foreach ($manualComponents as $component) {
            $related = is_array($component->related_items) ? $component->related_items : [];
            $source = (string) ($related['source'] ?? '');
            $lookupReference = $related['lookup_ref'] ?? null;

            if (!$lookupReference && $source === 'invoice_operational_cost' && !empty($related['invoice_item_id'])) {
                $lookupReference = 'invoice_operational_item_' . $related['invoice_item_id'];
            }

            if (!$lookupReference) {
                $lookupReference = 'manual_component_' . $component->id;
            }

            $payloads[] = [
                'component_type' => $component->component_type,
                'description' => $component->description,
                'amount' => (float) $component->amount,
                'recipient_name' => $component->recipient_name,
                'vendor_id' => $component->vendor_id,
                'related_items' => $related,
                'lookup_reference' => $lookupReference,
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
                  if (!empty($entry['vendor_invoice_number'])) {
                      $relatedItems['vendor_invoice_number'] = $entry['vendor_invoice_number'];
                  }
                  if (!empty($entry['quantity'])) {
                      $relatedItems['quantity'] = $entry['quantity'];
                  }
                  if (array_key_exists('unit_price', $entry)) {
                      $relatedItems['unit_price'] = $entry['unit_price'];
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

        $operationalEntries = $this->collectOperationalCostEntries();
        foreach ($operationalEntries as $entry) {
            $relatedItems = [
                'source' => 'other_costs',
                'other_cost_index' => $entry['entry_index'],
            ];
            if ($entry['entry_id'] !== null) {
                $relatedItems['other_cost_id'] = $entry['entry_id'];
            }
            if (!empty($entry['category'])) {
                $relatedItems['category'] = $entry['category'];
            }

            $payloads[] = [
                'component_type' => 'operational_cost',
                'description' => $entry['description'] !== '' ? $entry['description'] : 'Biaya Operational',
                'amount' => $entry['amount'],
                'recipient_name' => $entry['vendor_name'] ?? $this->vendor_name,
                'vendor_id' => $entry['vendor_id'],
                'related_items' => $relatedItems,
                'lookup_reference' => $entry['lookup_ref'],
            ];
        }

        $reimbursementEntries = $this->collectReimbursementEntries();
        foreach ($reimbursementEntries as $entry) {
            $relatedItems = [
                'source' => 'reimbursement_items',
                'reimbursement_item_id' => $entry['entry_id'],
            ];
            if (!empty($entry['category'])) {
                $relatedItems['category'] = $entry['category'];
            }
            if (!empty($entry['quantity'])) {
                $relatedItems['quantity'] = $entry['quantity'];
            }
            if (!empty($entry['unit'])) {
                $relatedItems['unit'] = $entry['unit'];
            }
            if (array_key_exists('unit_price', $entry)) {
                $relatedItems['unit_price'] = $entry['unit_price'];
            }

            $payloads[] = [
                'component_type' => 'reimbursement',
                'description' => $entry['description'] !== '' ? $entry['description'] : 'Reimbursement',
                'amount' => $entry['amount'],
                'recipient_name' => $entry['vendor_name'] ?? $this->vendor_name,
                'vendor_id' => $entry['vendor_id'],
                'related_items' => $relatedItems,
                'lookup_reference' => $entry['lookup_ref'],
            ];
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

                $amount = self::calculateVendorBreakdownAmount($entry);
                if ($amount <= 0) {
                    return null;
                }
                $quantity = self::normalizeBreakdownQuantity($entry['quantity'] ?? null);
                $unitPrice = (float) ($entry['buying_amount'] ?? 0);

                  $description = trim((string) ($entry['description'] ?? ''));
                  $vendorInvoiceNumber = isset($entry['rcvd_inv']) ? trim((string) $entry['rcvd_inv']) : '';

                $entryId = $entry['id'] ?? null;
                if ($entryId !== null) {
                    $lookupRef = 'vendor_breakdown_' . (string) $entryId;
                } else {
                    $lookupRef = 'vendor_breakdown_' . md5(json_encode([
                        'vendor_id' => $entryVendorId,
                        'vendor_name' => $entryVendorName,
                        'description' => $description,
                        'amount' => $unitPrice,
                        'quantity' => $quantity,
                    ]));
                }

                  return [
                      'amount' => $amount,
                      'quantity' => $quantity,
                      'unit_price' => $unitPrice,
                      'description' => $description,
                      'entry_index' => $index,
                      'entry_id' => $entry['id'] ?? null,
                      'lookup_ref' => $lookupRef,
                      'vendor_invoice_number' => $vendorInvoiceNumber !== '' ? $vendorInvoiceNumber : null,
                  ];
              })
            ->filter()
            ->values();
    }

    protected function collectOperationalCostEntries(): Collection
    {
        if (!$this->salesOrder || !is_array($this->salesOrder->other_costs)) {
            return collect();
        }

        $payableVendorId = $this->vendor_id ? (int) $this->vendor_id : null;
        $payableVendorName = $this->vendor_name ? trim((string) $this->vendor_name) : null;

        return collect($this->salesOrder->other_costs)
            ->values()
            ->filter(function ($entry) {
                return is_array($entry);
            })
            ->map(function ($entry, $index) use ($payableVendorId, $payableVendorName) {
                $source = $entry['source'] ?? null;
                if ($source === 'account_payable_component' || !empty($entry['component_id'])) {
                    return null;
                }

                $amount = (float) ($entry['amount'] ?? 0);
                if ($amount <= 0) {
                    return null;
                }

                $entryVendorId = $this->normalizeVendorIdentifier($entry['vendor_id'] ?? null);
                $entryVendorName = $this->resolveOtherCostVendorName($entry);

                if (!$this->matchesPayableVendor($entryVendorId, $entryVendorName, $payableVendorId, $payableVendorName)) {
                    return null;
                }

                $description = trim((string) ($entry['description'] ?? ''));
                $entryId = $entry['id'] ?? null;
                $lookupRef = $entryId !== null
                    ? 'other_cost_' . $entryId
                    : 'other_cost_' . md5(json_encode([
                        'description' => $description,
                        'amount' => $amount,
                        'vendor_id' => $entryVendorId,
                        'vendor_name' => $entryVendorName,
                        'category' => $entry['category'] ?? null,
                    ]));

                return [
                    'amount' => $amount,
                    'description' => $description,
                    'entry_index' => $index,
                    'entry_id' => $entryId,
                    'lookup_ref' => $lookupRef,
                    'vendor_id' => $entryVendorId,
                    'vendor_name' => $entryVendorName,
                    'category' => $entry['category'] ?? null,
                ];
            })
            ->filter()
            ->unique('lookup_ref')
            ->values();
    }

    protected function collectReimbursementEntries(): Collection
    {
        if (!$this->salesOrder) {
            return collect();
        }

        $this->salesOrder->loadMissing(['reimbursementItems.vendor']);

        $payableVendorId = $this->vendor_id ? (int) $this->vendor_id : null;
        $payableVendorName = $this->vendor_name ? trim((string) $this->vendor_name) : null;

        return $this->salesOrder->reimbursementItems
            ->filter(function ($item) {
                if ((float) ($item->amount ?? 0) <= 0) {
                    return false;
                }

                if (($item->status ?? null) === 'paid') {
                    return false;
                }

                $receiptInfo = $item->receipt_info ?? [];
                if (!is_array($receiptInfo)) {
                    $receiptInfo = json_decode($receiptInfo, true) ?: [];
                }

                if (($receiptInfo['source'] ?? null) === 'account_payable_component') {
                    return false;
                }

                if (!empty($receiptInfo['component_id'])) {
                    return false;
                }

                return true;
            })
            ->map(function ($item) use ($payableVendorId, $payableVendorName) {
                $entryVendorId = $this->normalizeVendorIdentifier($item->vendor_id ?? $item->vendor?->id ?? null);
                $entryVendorName = $this->resolveReimbursementVendorName($item);

                if (!$this->matchesPayableVendor($entryVendorId, $entryVendorName, $payableVendorId, $payableVendorName)) {
                    return null;
                }

                $description = trim((string) ($item->description ?? ''));
                $lookupRef = 'reimbursement_' . $item->id;
                $quantity = is_numeric($item->quantity) && (float) $item->quantity > 0
                    ? (float) $item->quantity
                    : 1;
                $unit = is_string($item->unit) && trim($item->unit) !== ''
                    ? trim($item->unit)
                    : null;
                $unitPrice = (float) ($item->amount ?? 0);
                $amount = $unitPrice * $quantity;

                return [
                    'amount' => $amount,
                    'description' => $description,
                    'entry_index' => null,
                    'entry_id' => $item->id,
                    'lookup_ref' => $lookupRef,
                    'vendor_id' => $entryVendorId,
                    'vendor_name' => $entryVendorName,
                    'category' => $item->category ?? null,
                    'quantity' => $quantity,
                    'unit' => $unit,
                    'unit_price' => $unitPrice,
                ];
            })
            ->filter()
            ->unique('lookup_ref')
            ->values();
    }

    protected function resolveOtherCostVendorName(array $entry): ?string
    {
        $vendorId = $this->normalizeVendorIdentifier($entry['vendor_id'] ?? null);
        if ($vendorId) {
            $vendor = Vendor::find($vendorId);
            if ($vendor?->nama_vendor) {
                return $vendor->nama_vendor;
            }
        }

        $vendorName = trim((string) ($entry['vendor_name'] ?? ''));
        if ($vendorName !== '') {
            return $vendorName;
        }

        $category = trim((string) ($entry['category'] ?? ''));
        if ($category !== '') {
            return $category;
        }

        return 'Divisi Operational';
    }

    protected function resolveReimbursementVendorName($item): ?string
    {
        $vendorName = trim((string) ($item->vendor?->nama_vendor ?? ''));
        if ($vendorName !== '') {
            return $vendorName;
        }

        $receiptName = trim((string) (data_get($item->receipt_info ?? [], 'vendor_name') ?? ''));
        if ($receiptName !== '') {
            return $receiptName;
        }

        $category = trim((string) ($item->category ?? ''));
        if ($category !== '') {
            return $category;
        }

        return 'Divisi Operational';
    }

    protected function matchesPayableVendor(?int $entryVendorId, ?string $entryVendorName, ?int $payableVendorId, ?string $payableVendorName): bool
    {
        if ($payableVendorId !== null || $entryVendorId !== null) {
            return $payableVendorId === $entryVendorId;
        }

        $entryName = trim((string) ($entryVendorName ?? ''));
        $payableName = trim((string) ($payableVendorName ?? ''));

        if ($entryName === '' || $payableName === '') {
            return true;
        }

        return strcasecmp($entryName, $payableName) === 0;
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
        } elseif ($component->id) {
            $reference = 'component_' . $component->id;
        }

        return $this->makeComponentLookupKey($component->component_type, $component->vendor_id, $reference);
    }

    protected function isProtectedComponentSource(?array $relatedItems): bool
    {
        if (!$relatedItems) {
            return false;
        }

        $source = (string) ($relatedItems['source'] ?? '');
        return in_array($source, ['account_payable_manual_entry', 'invoice_operational_cost'], true);
    }

    protected function collectInvoiceItemsForVendor(): Collection
    {
        if (!$this->sales_order_id) {
            return collect();
        }

        $vendorId = $this->vendor_id ? (string) $this->vendor_id : null;

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
            ->where(function ($query) use ($vendorId) {
                $query->whereNull('item_ref')
                      ->orWhere(function ($subQuery) use ($vendorId) {
                          $subQuery->where('item_ref', 'not like', 'ap_component_%');
                          $subQuery->where(function ($refQuery) use ($vendorId) {
                              // Abaikan COGS vendor lain, tetapi izinkan COGS milik vendor yang sama
                              $refQuery->where('item_ref', 'not like', 'cogs_vendor_%');

                              if ($vendorId !== null) {
                                  $refQuery->orWhere(function ($matchQuery) use ($vendorId) {
                                      $matchQuery->where('item_ref', 'like', 'cogs_vendor_%')
                                          ->whereRaw('REPLACE(item_ref, "cogs_vendor_", "") = ?', [$vendorId]);
                                  });
                              }
                          });
                      });
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

    protected static function normalizeBreakdownQuantity($value): float
    {
        return is_numeric($value) && (float) $value > 0
            ? (float) $value
            : 1.0;
    }

    protected static function calculateVendorBreakdownAmount(array $entry): float
    {
        $unitPrice = (float) ($entry['buying_amount'] ?? 0);
        if ($unitPrice <= 0) {
            return 0.0;
        }

        $quantity = self::normalizeBreakdownQuantity($entry['quantity'] ?? null);
        return $unitPrice * $quantity;
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
        // Gunakan komponen yang sudah tersinkronisasi di UI
        $components = $this->components()->get();

        // If no components, use old method
        if ($components->isEmpty()) {
            if ($amount <= 0 || $amount > $this->outstanding_amount) {
                \Log::warning('AP recordPaymentToComponent failed: invalid amount without components', [
                    'account_payable_id' => $this->id,
                    'amount' => $amount,
                    'outstanding_amount' => $this->outstanding_amount,
                ]);
            }
            return $this->markAsPaid($amount, $paymentMethod, $notes);
        }

        // Get the component to pay
        $component = $component ?: $components->first();

        if (!$component || (int) $component->account_payable_id !== (int) $this->id) {
            \Log::warning('AP recordPaymentToComponent failed: component mismatch', [
                'account_payable_id' => $this->id,
                'component_id' => $component?->id,
                'component_account_payable_id' => $component?->account_payable_id,
            ]);
            return false;
        }

        if ($amount <= 0 || $amount > $component->outstanding_amount) {
            \Log::warning('AP recordPaymentToComponent failed: amount exceeds outstanding', [
                'account_payable_id' => $this->id,
                'component_id' => $component->id,
                'amount' => $amount,
                'outstanding_amount' => $component->outstanding_amount,
            ]);
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
        if ($noteEntry) {
            $this->payment_notes = $this->buildPaymentNotes($this->payment_notes, $noteEntry);
        }
        $this->paid_by = auth()->id();
        $this->save();

        if ($noteEntry) {
            $this->logPaymentNote($noteEntry, $component->id, 'payment');
        }

        return true;
    }

    protected function buildPaymentNotes(?string $currentNotes, string $noteEntry): string
    {
        $currentNotes = $currentNotes ?? '';
        $noteEntry = trim($noteEntry);
        if ($noteEntry === '') {
            return $currentNotes;
        }

        if (trim($currentNotes) === '') {
            return $noteEntry;
        }

        if (str_contains($currentNotes, $noteEntry)) {
            return $currentNotes;
        }

        return $currentNotes . "\n" . $noteEntry;
    }

    public function appendPaymentNote(string $noteEntry): void
    {
        $this->payment_notes = $this->buildPaymentNotes($this->payment_notes, $noteEntry);
    }

    public function logPaymentNote(string $noteEntry, ?int $componentId = null, ?string $sourceType = null): void
    {
        $noteEntry = trim($noteEntry);
        if ($noteEntry === '') {
            return;
        }

        AccountPayableNote::create([
            'sales_order_id' => $this->sales_order_id,
            'account_payable_id' => $this->id,
            'component_id' => $componentId,
            'source_type' => $sourceType,
            'note' => $noteEntry,
            'created_by' => auth()->id(),
        ]);
    }

    protected function postVatReceivableForComponent(AccountPayableComponent $component): void
    {
        if ($component->component_type !== 'vat_reimbursement') {
            return;
        }

        if ($component->status !== 'paid') {
            return;
        }

        $relatedItems = is_array($component->related_items) ? $component->related_items : [];
        if (!empty($relatedItems['vat_posted_at'])) {
            return;
        }

        $rate = data_get($relatedItems, 'vat_rate');
        if (!$rate) {
            return;
        }

        $rateValue = (float) $rate;
        $accountCode = abs($rateValue - 1.1) < 0.01 ? '1231' : '1230';
        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            \Log::error('AP VAT reimbursement post failed: account missing', [
                'account_code' => $accountCode,
                'account_payable_id' => $this->id,
                'component_id' => $component->id,
            ]);
            return;
        }

        $amount = (float) $component->amount;
        if ($amount <= 0) {
            return;
        }

        $effectiveDate = $this->payment_date
            ? Carbon::parse($this->payment_date)->toDateString()
            : now()->toDateString();

        try {
            DB::transaction(function () use ($accountId, $amount, $effectiveDate, $component, $relatedItems, $rateValue) {
                FinancialPositionAdjustment::create([
                    'account_id' => $accountId,
                    'effective_date' => $effectiveDate,
                    'amount' => $amount,
                    'notes' => 'Post VAT Receivable ' . rtrim(rtrim(number_format($rateValue, 2, '.', ''), '0'), '.')
                        . '% dari AP ' . ($this->vendor_invoice_number ?? $this->id),
                    'created_by' => auth()->id(),
                ]);

                $updatedRelatedItems = $relatedItems;
                $updatedRelatedItems['vat_posted_at'] = now()->toDateTimeString();
                $updatedRelatedItems['vat_posted_account_id'] = $accountId;
                $updatedRelatedItems['vat_posted_amount'] = $amount;
                $component->related_items = $updatedRelatedItems;
                $component->save();
            });
        } catch (\Throwable $e) {
            \Log::error('AP VAT reimbursement post failed', [
                'account_payable_id' => $this->id,
                'component_id' => $component->id,
                'error' => $e->getMessage(),
            ]);
        }
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
