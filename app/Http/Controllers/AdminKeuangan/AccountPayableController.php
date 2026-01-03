<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountPayable;
use App\Models\Vendor;
use App\Models\ReimbursementItem;
use App\Models\BankAccount;
use App\Models\OperationalCostCategory;
use App\Models\SalesOrder;
use App\Models\PettyCashCategory;
use App\Models\PettyCashTransaction;
use App\Models\PettyCashBalance;
use App\Models\ChartOfAccount;
use App\Models\FinancialPositionAdjustment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use App\Services\InvoiceCostSyncService;
use Carbon\Carbon;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;

class AccountPayableController extends Controller
{
    /**
     * Display a listing of account payables
     */
    public function index(Request $request)
    {
        $payables = $this->paginatePayableGroups($request);

        // Calculate summary
        $summary = [
            'total_outstanding' => AccountPayable::sum('outstanding_amount'),
            'total_overdue' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->sum('outstanding_amount'),
            'count_overdue' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->count(),
            'count_unpaid' => AccountPayable::whereIn('status', ['unpaid', 'partial'])->count()
        ];

        // Calculate summary per vendor (for current filtered results)
        $filteredResults = $this->filteredPayablesQuery($request)
            ->with([
                'components' => function ($query) {
                    $query->orderBy('component_type');
                },
                'vendor',
            ])
            ->get();

        $filteredResults->each(function (AccountPayable $payable) {
            $payable->syncComponents();
            $payable->loadMissing(['components', 'vendor']);
        });

        $vendorSummary = $this->buildVendorSummaryFromCollection($filteredResults);

        // Get vendors for filter
        $vendors = Vendor::select('id', 'nama_vendor')->orderBy('nama_vendor')->get();

        return Inertia::render('Admin/AdminKeuangan/AccountPayables/Index', [
            'payables' => $payables,
            'summary' => $summary,
            'vendorSummary' => $vendorSummary,
            'vendors' => $vendors,
            'filters' => $request->only(['search', 'status', 'vendor_id', 'date_from', 'date_to']),
            'bankAccounts' => BankAccount::all(),
        ]);
    }

    /**
     * Display the specified account payable
     */
    public function show(Request $request, AccountPayable $accountPayable)
    {
        $accountPayable->load([
            'vendor',
            'salesOrder:id,order_number,customer,customer_name,shipper,consignee_shipper,released_at,so_date,vendor_breakdown,other_costs',
            'creator',
            'paidByUser'
        ]);
        $accountPayable->syncComponents();
        $accountPayable->load('components');

        $groupPayables = $this->getPayablesForShow($accountPayable);
        $groupSummary = $this->buildGroupSummary($groupPayables, $accountPayable->salesOrder);
        $formattedGroupPayables = $groupPayables->map(fn (AccountPayable $payable) => $this->formatPayable($payable));

        $bankAccounts = BankAccount::all();
        $reimbursementItems = $this->mapReimbursementItems($accountPayable);
        $selectedComponentId = $request->query('component_id');
        $selectedComponentId = $selectedComponentId !== null ? (int) $selectedComponentId : null;

        return Inertia::render('Admin/AdminKeuangan/AccountPayables/Show', [
            'payable' => $this->formatPayable($accountPayable),
            'groupPayables' => $formattedGroupPayables,
            'groupSummary' => $groupSummary,
            'bankAccounts' => $bankAccounts,
            'reimbursementItems' => $reimbursementItems,
            'selectedComponentId' => $selectedComponentId,
            'operationalCostCategories' => OperationalCostCategory::active()
                ->orderBy('name')
                ->get(['id', 'name', 'description']),
            'vendors' => Vendor::orderBy('nama_vendor')
                ->get(['id', 'nama_vendor']),
            'pettyCashCategories' => PettyCashCategory::active()
                ->ordered()
                ->get(['id', 'name', 'description']),
        ]);
    }

    public function reimbursementItems(AccountPayable $accountPayable)
    {
        return response()->json($this->mapReimbursementItems($accountPayable));
    }

    /**
     * Post outstanding payable to VAT Payable (2110/2111) and close payable.
     */
    public function postVatPayable(AccountPayable $accountPayable)
    {
        $accountCode = ChartOfAccount::idByCode('2110') ? '2110' : (ChartOfAccount::idByCode('2111') ? '2111' : null);
        if (!$accountCode) {
            return redirect()->back()->withErrors(['error' => 'Akun VAT Payable (2110/2111) belum dikonfigurasi.']);
        }

        $label = $accountCode === '2110' ? '11%' : '1.1%';
        return $this->postVatPayableByAccount($accountPayable, $accountCode, $label);
    }

    /**
     * Post outstanding payable to VAT Payable 11% (2110).
     */
    public function postVatPayable11(AccountPayable $accountPayable)
    {
        return $this->postVatPayableByAccount($accountPayable, '2110', '11%');
    }

    /**
     * Post outstanding payable to VAT Payable 1.1% (2111).
     */
    public function postVatPayable11_1(AccountPayable $accountPayable)
    {
        return $this->postVatPayableByAccount($accountPayable, '2111', '1.1%');
    }

    /**
     * Post outstanding payable to VAT Payable PPh23 0.5% (2112).
     */
    public function postPph23Payable05(AccountPayable $accountPayable)
    {
        return $this->postPph23Payable($accountPayable, 0.5);
    }

    /**
     * Post outstanding payable to VAT Payable PPh23 2% (2113).
     */
    public function postPph23Payable2(AccountPayable $accountPayable)
    {
        return $this->postPph23Payable($accountPayable, 2);
    }

    /**
     * Post VAT Receivable 11% (PPN Masukan) after payable is paid.
     */
    public function postVatReceivable11(AccountPayable $accountPayable)
    {
        return $this->postVatReceivable($accountPayable, 11, '1230', '11%');
    }

    /**
     * Post VAT Receivable 1.1% (PPN Masukan) after payable is paid.
     */
    public function postVatReceivable11_1(AccountPayable $accountPayable)
    {
        return $this->postVatReceivable($accountPayable, 1.1, '1231', '1.1%');
    }

    private function postVatReceivable(AccountPayable $accountPayable, float $rate, string $accountCode, string $label)
    {
        if ($accountPayable->status !== 'paid') {
            return redirect()->back()->withErrors(['error' => 'VAT Receivable hanya bisa diposting setelah hutang paid.']);
        }

        if (($accountPayable->outstanding_amount ?? 0) > 0) {
            return redirect()->back()->withErrors(['error' => 'VAT Receivable hanya bisa diposting setelah hutang lunas.']);
        }

        if ($accountPayable->vat_receivable_posted_at) {
            return redirect()->back()->withErrors(['error' => 'VAT Receivable sudah diposting untuk hutang ini.']);
        }

        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return redirect()->back()->withErrors(['error' => "Akun VAT Receivable {$label} belum dikonfigurasi."]);
        }

        $paidAmount = (float) ($accountPayable->paid_amount ?? 0);
        $baseAmount = $paidAmount > 0 ? $paidAmount : (float) $accountPayable->amount;
        $vatAmount = round($baseAmount * ($rate / 100), 2);

        if ($vatAmount <= 0) {
            return redirect()->back()->withErrors(['error' => 'Nominal VAT Receivable tidak valid.']);
        }

        $effectiveDate = $accountPayable->payment_date
            ? Carbon::parse($accountPayable->payment_date)->toDateString()
            : now()->toDateString();

        DB::transaction(function () use ($accountPayable, $accountId, $vatAmount, $rate, $label, $effectiveDate) {
            FinancialPositionAdjustment::create([
                'account_id' => $accountId,
                'effective_date' => $effectiveDate,
                'amount' => $vatAmount,
                'notes' => 'Post VAT Receivable ' . $label . ' dari AP ' . ($accountPayable->vendor_invoice_number ?? $accountPayable->id),
                'created_by' => auth()->id(),
            ]);

            $accountPayable->update([
                'vat_receivable_rate' => $rate,
                'vat_receivable_amount' => $vatAmount,
                'vat_receivable_posted_at' => now(),
                'vat_receivable_account_id' => $accountId,
            ]);
        });

        return redirect()->back()->with('success', 'VAT Receivable ' . $label . ' berhasil diposting ke Financial Position.');
    }

    private function postVatPayableByAccount(AccountPayable $accountPayable, string $accountCode, string $label)
    {
        if ($accountPayable->outstanding_amount <= 0) {
            return redirect()->back()->withErrors(['error' => 'Tidak ada outstanding yang dapat diposting ke VAT Payable.']);
        }

        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return redirect()->back()->withErrors(['error' => "Akun VAT Payable {$label} belum dikonfigurasi."]);
        }

        $accountPayable->syncComponents();
        $accountPayable->load('components');

        $amount = (float) $accountPayable->outstanding_amount;
        $now = now();
        $paymentMethod = 'VAT Payable ' . $label;
        $paymentNotes = 'Posted to VAT Payable ' . $label;

        DB::transaction(function () use ($accountPayable, $amount, $accountId, $now, $label, $paymentMethod, $paymentNotes) {
            FinancialPositionAdjustment::create([
                'account_id' => $accountId,
                'effective_date' => $now->toDateString(),
                'amount' => $amount,
                'notes' => 'Post VAT Payable ' . $label . ' dari AP ' . ($accountPayable->vendor_invoice_number ?? $accountPayable->id),
                'created_by' => auth()->id(),
            ]);

            if ($accountPayable->components->isEmpty()) {
                $accountPayable->markAsPaid($amount, $paymentMethod, $paymentNotes);
                return;
            }

            foreach ($accountPayable->components as $component) {
                $outstanding = (float) $component->outstanding_amount;
                if ($outstanding <= 0) {
                    continue;
                }

                $accountPayable->recordPaymentToComponent(
                    $component,
                    $outstanding,
                    $paymentMethod,
                    $paymentNotes,
                    $now
                );
            }
        });

        return redirect()->back()->with('success', 'Outstanding hutang diposting ke VAT Payable ' . $label . ' dan status ditutup.');
    }

    private function postPph23Payable(AccountPayable $accountPayable, float $rate)
    {
        if ($accountPayable->outstanding_amount <= 0) {
            return redirect()->back()->withErrors(['error' => 'Tidak ada outstanding yang dapat diposting ke VAT Payable PPh23.']);
        }

        $account = $this->resolvePph23PayableAccount($rate);
        if (!$account) {
            return redirect()->back()->withErrors(['error' => 'Akun VAT Payable PPh23 belum dikonfigurasi.']);
        }

        $accountPayable->syncComponents();
        $accountPayable->load('components');

        $amount = (float) $accountPayable->outstanding_amount;
        $now = now();
        $label = rtrim(rtrim(number_format($rate, 2, '.', ''), '0'), '.');
        $paymentMethod = 'VAT Payable PPh23 ' . $label . '%';
        $paymentNotes = 'Posted to VAT Payable PPh23 ' . $label . '%';

        DB::transaction(function () use ($accountPayable, $amount, $account, $now, $paymentMethod, $paymentNotes, $label) {
            FinancialPositionAdjustment::create([
                'account_id' => $account->id,
                'effective_date' => $now->toDateString(),
                'amount' => $amount,
                'notes' => 'Post VAT Payable PPh23 ' . $label . '% dari AP ' . ($accountPayable->vendor_invoice_number ?? $accountPayable->id),
                'created_by' => auth()->id(),
            ]);

            if ($accountPayable->components->isEmpty()) {
                $accountPayable->markAsPaid($amount, $paymentMethod, $paymentNotes);
                return;
            }

            foreach ($accountPayable->components as $component) {
                $outstanding = (float) $component->outstanding_amount;
                if ($outstanding <= 0) {
                    continue;
                }

                $accountPayable->recordPaymentToComponent(
                    $component,
                    $outstanding,
                    $paymentMethod,
                    $paymentNotes,
                    $now
                );
            }
        });

        return redirect()->back()->with('success', 'Outstanding hutang diposting ke VAT Payable PPh23 dan status ditutup.');
    }

    private function resolvePph23PayableAccount(float $rate): ?ChartOfAccount
    {
        $accountCode = abs($rate - 0.5) < 0.01 ? '2112' : '2113';
        $accountName = abs($rate - 0.5) < 0.01
            ? 'VAT Payable PPH 23 0.5%'
            : 'VAT Payable PPH 23 2%';

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
            ->where('account_type', 'liability')
            ->first();
    }

    /**
     * Mark payment for account payable
     */
    public function markAsPaid(Request $request, AccountPayable $accountPayable)
    {
        // Assume components already synced at page load
        $accountPayable->refresh();
        $components = $accountPayable->components()->get();
        $requiresComponent = $components->count() > 1;

        // Prepare validation rules
        $rules = [
            'amount' => 'required|numeric|min:0.01',
            'payment_method' => 'required|string|max:100',
            'payment_date' => 'required|date',
            'payment_source' => ['required', Rule::in(['bank', 'petty_cash'])],
            'bank_account_id' => ['nullable', 'exists:bank_accounts,id'],
            'petty_cash_category_id' => ['nullable', 'exists:petty_cash_categories,id'],
            'notes' => 'nullable|string|max:500',
            'reimbursement_items' => 'nullable|array',
            'reimbursement_items.*' => 'integer|exists:reimbursement_items,id',
            'reimbursement_vendor_name' => 'nullable|string|max:255',
            'reimbursement_paid_at' => 'nullable|date',
            'reimbursement_notes' => 'nullable|string|max:500'
        ];

        if ($request->input('payment_source', 'bank') === 'bank') {
            $rules['bank_account_id'][] = 'required';
        } else {
            $rules['petty_cash_category_id'][] = 'required';
        }

        // Add component_id validation if multiple components
        $rules['component_id'] = 'nullable|integer';

        $validated = $request->validate($rules);

        // Allow routing payment to the correct payable if component belongs elsewhere in the SO group
        $targetPayable = $accountPayable;
        $component = null;

        if (!empty($validated['component_id'])) {
            $componentId = (int) $validated['component_id'];
            $component = $components->firstWhere('id', $componentId);

            if (!$component) {
                // Try find globally by ID
                $componentModel = \App\Models\AccountPayableComponent::with('accountPayable')->find($componentId);

                if ($componentModel && $componentModel->accountPayable) {
                    $targetPayable = $componentModel->accountPayable;
                    $targetPayable->refresh();
                    $components = $targetPayable->components()->get();
                    $requiresComponent = $components->count() > 1;
                    $component = $components->firstWhere('id', $componentId);
                }

                // If still not found, try decode legacy fallback ID pattern {payableId}{index4digits}
                if (!$component && $componentId > 9999) {
                    $idString = (string) $componentId;
                    $indexPart = (int) substr($idString, -4);
                    $payablePart = (int) substr($idString, 0, strlen($idString) - 4);
                    if ($payablePart > 0) {
                        $legacyPayable = AccountPayable::with('components')->find($payablePart);
                        if ($legacyPayable) {
                            $legacyPayable->refresh()->load('components');
                            $targetPayable = $legacyPayable;
                            $components = $targetPayable->components()->values();
                            $requiresComponent = $components->count() > 1;
                            if ($components->has($indexPart)) {
                                $component = $components->get($indexPart);
                            }
                        }
                    }
                }

                // As a last attempt, sync components once to include latest data
                if (!$component) {
                    $targetPayable->syncComponents();
                    $targetPayable->refresh()->load('components');
                    $components = $targetPayable->components()->get();
                    $requiresComponent = $components->count() > 1;
                    $component = $components->firstWhere('id', $componentId);
                }
            }
        } elseif ($components->count() === 1) {
            $component = $components->first();
        }

        // If multiple components and no component selected, attempt fallback selection on SO group
        if ($requiresComponent && !$component) {
            $groupComponents = \App\Models\AccountPayableComponent::query()
                ->whereHas('accountPayable', function ($q) use ($accountPayable) {
                    if ($accountPayable->sales_order_id) {
                        $q->where('sales_order_id', $accountPayable->sales_order_id);
                    } else {
                        $q->where('id', $accountPayable->id);
                    }
                })
                ->get();

            $unpaidGroup = $groupComponents->filter(function ($item) {
                return $item->status !== 'paid' && $item->outstanding_amount > 0.01;
            });

            if ($unpaidGroup->count() === 1) {
                $candidate = $unpaidGroup->first();
                $targetPayable = $candidate->accountPayable ?? $accountPayable;
                $targetPayable->refresh()->load('components');
                $component = $targetPayable->components->firstWhere('id', $candidate->id);
                $components = $targetPayable->components()->get();
                $requiresComponent = $components->count() > 1;
            } else {
                // Cari kandidat dengan outstanding >= amount dan terbesar
                $candidate = $unpaidGroup
                    ->filter(function ($item) use ($validated) {
                        return $item->outstanding_amount >= ($validated['amount'] ?? 0) - 0.01;
                    })
                    ->sortByDesc('outstanding_amount')
                    ->first();

                if ($candidate) {
                    $targetPayable = $candidate->accountPayable ?? $accountPayable;
                    $targetPayable->refresh()->load('components');
                    $component = $targetPayable->components->firstWhere('id', $candidate->id);
                    $components = $targetPayable->components()->get();
                    $requiresComponent = $components->count() > 1;
                }
            }

            if (!$component) {
                return redirect()->back()->withErrors([
                    'component_id' => 'Pilih komponen pembayaran.'
                ])->withInput();
            }
        }

        // Validate amount doesn't exceed component outstanding
        if ($component && $validated['amount'] > $component->outstanding_amount) {
            return redirect()->back()->withErrors([
                'amount' => 'Amount cannot exceed outstanding balance for ' . $component->getComponentLabel() . ' (Rp ' . number_format($component->outstanding_amount, 0, ',', '.') . ')'
            ])->withInput();
        }

        $payableForPayment = $targetPayable ?? $accountPayable;

        DB::transaction(function () use ($payableForPayment, $component, $validated) {
            // Record payment to component
            $success = $payableForPayment->recordPaymentToComponent(
                $component,
                $validated['amount'],
                $validated['payment_method'],
                $validated['notes'],
                \Carbon\Carbon::parse($validated['payment_date'])
            );

            if (!$success) {
                \Log::warning('AP markAsPaid failed', [
                    'account_payable_id' => $payableForPayment->id,
                    'component_id' => $component?->id,
                    'amount' => $validated['amount'] ?? null,
                    'payment_method' => $validated['payment_method'] ?? null,
                    'payment_date' => $validated['payment_date'] ?? null,
                    'payment_source' => $validated['payment_source'] ?? null,
                    'bank_account_id' => $validated['bank_account_id'] ?? null,
                    'petty_cash_category_id' => $validated['petty_cash_category_id'] ?? null,
                    'user_id' => auth()->id(),
                ]);
                throw new \Exception('Failed to mark payment');
            }

            $componentLabel = $component
                ? $component->getComponentLabel() . ' - ' . $component->recipient_name
                : $payableForPayment->vendor_name;

            $description = "Payment for {$componentLabel}: {$payableForPayment->service_description}";

            if ($validated['payment_source'] === 'bank') {
                // Record bank transaction (Vendor Payment = Debit from bank)
                \App\Models\BankTransaction::recordVendorPayment(
                    $validated['bank_account_id'],
                    $validated['amount'],
                    $description,
                    $payableForPayment->id,
                    $validated['payment_date']
                );
            } else {
                $balanceBefore = PettyCashBalance::calculateBalanceUpToDate($validated['payment_date'], false);
                $balanceAfter = $balanceBefore - $validated['amount'];

                PettyCashTransaction::create([
                    'transaction_date' => $validated['payment_date'],
                    'description' => $description,
                    'category_id' => $validated['petty_cash_category_id'],
                    'amount' => $validated['amount'],
                    'type' => 'expense',
                    'so_number' => $payableForPayment->salesOrder->order_number ?? null,
                    'balance_after' => $balanceAfter,
                    'notes' => $validated['notes'] ?? null,
                    'status' => 'approved',
                    'user_id' => auth()->id(),
                    'approved_by' => auth()->id(),
                    'approved_at' => now(),
                    'auto_generated' => false,
                    'categorization_method' => 'manual',
                ]);

                PettyCashBalance::updateBalanceForDate($validated['payment_date']);
            }

            // If component is reimbursement, mark related reimbursement items as paid
            if ($component && $component->component_type === 'reimbursement' && !empty($validated['reimbursement_items'])) {
                $reimbursementVendor = $validated['reimbursement_vendor_name']
                    ?? $payableForPayment->vendor_name
                    ?? 'Eshaka Wijaya Logistics';

                $reimbursementPaidAt = $validated['reimbursement_paid_at'] ?? $validated['payment_date'];
                $reimbursementNotes = $validated['reimbursement_notes'] ?? $validated['notes'] ?? null;

                $reimbursementExtras = [
                    'account_payable_id' => $payableForPayment->id,
                    'account_payable_component_id' => $component->id,
                    'account_payable_vendor' => $payableForPayment->vendor_name,
                    'account_payable_invoice_number' => $payableForPayment->vendor_invoice_number,
                ];

                $items = ReimbursementItem::whereIn('id', $validated['reimbursement_items'])->get();
                foreach ($items as $item) {
                    $item->markAsPaid($reimbursementVendor, $reimbursementPaidAt, $reimbursementNotes, $reimbursementExtras);
                }
            }
        });

        return redirect()->back()->with('success', 'Payment marked successfully');
    }

    /**
     * Bulk update overdue status
     */
    public function updateOverdueStatus()
    {
        $updated = 0;
        AccountPayable::whereIn('status', ['unpaid', 'partial'])
            ->chunk(100, function ($payables) use (&$updated) {
                foreach ($payables as $payable) {
                    $payable->updateOverdueStatus();
                    $updated++;
                }
            });

        return response()->json(['message' => "Updated {$updated} payables"]);
    }

    /**
     * Get payables by vendor
     */
    public function getByVendor(Vendor $vendor)
    {
        $payables = AccountPayable::where('vendor_id', $vendor->id)
            ->whereIn('status', ['unpaid', 'partial'])
            ->with(['salesOrder'])
            ->orderBy('vendor_invoice_date', 'desc')
            ->get();

        return response()->json($payables);
    }

    /**
     * Export payables to Excel/CSV
     */
    public function export(Request $request)
    {
        // This can be implemented later with Laravel Excel
        return response()->json(['message' => 'Export feature coming soon']);
    }

    /**
     * Update payment due date
     */
    public function updateDueDate(Request $request, AccountPayable $accountPayable)
    {
        $validated = $request->validate([
            'payment_due_date' => 'required|date|after_or_equal:today'
        ]);

        $accountPayable->update([
            'payment_due_date' => $validated['payment_due_date']
        ]);

        return redirect()->back()->with('success', 'Due date updated successfully');
    }

    /**
     * Add vendor invoice details
     */
    public function updateVendorInvoice(Request $request, AccountPayable $accountPayable)
    {
        $validated = $request->validate([
            'vendor_invoice_number' => 'nullable|string|max:100',
            'vendor_invoice_date' => 'nullable|date',
            'service_remarks' => 'nullable|string'
        ]);

        $accountPayable->update($validated);

        return redirect()->back()->with('success', 'Vendor invoice details updated');
    }

    public function storeAdditionalComponent(
        Request $request,
        AccountPayable $accountPayable,
        InvoiceCostSyncService $invoiceCostSyncService
    )
    {
        $validated = $request->validate([
            'component_type' => ['required', Rule::in(['operational_cost', 'reimbursement'])],
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'category_id' => 'nullable|exists:operational_cost_categories,id',
            'vendor_id' => 'nullable|exists:vendors,id',
            'notes' => 'nullable|string|max:500',
        ]);

        if ($validated['component_type'] === 'operational_cost' && empty($validated['category_id'])) {
            return redirect()->back()
                ->withErrors(['category_id' => 'Kategori biaya wajib diisi untuk biaya operasional.'])
                ->withInput();
        }

        \Log::info('AP add component request', [
            'account_payable_id' => $accountPayable->id,
            'sales_order_id' => $accountPayable->sales_order_id,
            'component_type' => $validated['component_type'],
            'amount' => $validated['amount'],
            'category_id' => $validated['category_id'] ?? null,
            'vendor_id' => $validated['vendor_id'] ?? null,
            'user_id' => auth()->id(),
        ]);

        try {
            $component = DB::transaction(function () use ($validated, $accountPayable) {
                $category = !empty($validated['category_id'])
                    ? OperationalCostCategory::find($validated['category_id'])
                    : null;

                $vendor = !empty($validated['vendor_id'])
                    ? Vendor::find($validated['vendor_id'])
                    : null;

                $recipientName = $vendor?->nama_vendor ?? 'Divisi Operational';

                $amount = (float) $validated['amount'];

                $component = $accountPayable->components()->create([
                    'component_type' => $validated['component_type'],
                    'description' => $validated['description'],
                    'amount' => $amount,
                    'paid_amount' => 0,
                    'outstanding_amount' => $amount,
                    'status' => 'unpaid',
                    'due_date' => $accountPayable->payment_due_date,
                    'recipient_name' => $recipientName,
                    'vendor_id' => $vendor->id ?? null,
                    'related_items' => [
                        'category_id' => $category?->id,
                        'category_name' => $category?->name,
                        'notes' => $validated['notes'] ?? null,
                        'source' => 'account_payable_manual_entry',
                    ],
                ]);

                // Ensure manual component has unique lookup reference for sync
                $component->update([
                    'related_items' => array_merge(
                        $component->related_items ?? [],
                        ['lookup_ref' => 'manual_component_' . $component->id]
                    ),
                ]);

                $salesOrder = $accountPayable->salesOrder;

                // Operational cost tambahan disimpan sebagai component saja.
                // Sinkronisasi ke invoice/profit dilakukan via InvoiceCostSyncService,
                // sehingga tidak perlu menambah entry di other_costs untuk menghindari duplikasi.

                if ($validated['component_type'] === 'reimbursement' && $salesOrder) {
                    $reimbursementItem = ReimbursementItem::create([
                        'sales_order_id' => $salesOrder->id,
                        'description' => $validated['description'],
                        'amount' => $amount,
                        'vendor_id' => $vendor->id ?? null,
                        'category' => $category?->name ?? 'Reimbursement',
                        'status' => 'pending',
                        'created_by' => auth()->id(),
                        'receipt_info' => [
                            'source' => 'account_payable_component',
                            'component_id' => null,
                        ],
                    ]);

                    $receiptInfo = $reimbursementItem->receipt_info ?? [];
                    $receiptInfo['component_id'] = $component->id;
                    $reimbursementItem->receipt_info = $receiptInfo;
                    $reimbursementItem->save();

                    $relatedItems = $component->related_items ?? [];
                    $relatedItems['reimbursement_item_id'] = $reimbursementItem->id;
                    $component->related_items = $relatedItems;
                    $component->save();
                }

                $accountPayable->recalculateTotals();

                return $component;
            });
        } catch (\Throwable $e) {
            \Log::error('AP add component failed', [
                'account_payable_id' => $accountPayable->id,
                'sales_order_id' => $accountPayable->sales_order_id,
                'payload' => $validated,
                'user_id' => auth()->id(),
                'error' => $e->getMessage(),
            ]);
            throw $e;
        }

        if ($component) {
            \Log::info('AP add component created', [
                'account_payable_id' => $accountPayable->id,
                'component_id' => $component->id,
                'component_type' => $component->component_type,
                'amount' => $component->amount,
                'user_id' => auth()->id(),
            ]);
            try {
                \Log::info('AP add component sync started', [
                    'account_payable_id' => $accountPayable->id,
                    'component_id' => $component->id,
                    'user_id' => auth()->id(),
                ]);
                $invoiceCostSyncService->syncFromAccountPayableComponent($component);
                \Log::info('AP add component sync completed', [
                    'account_payable_id' => $accountPayable->id,
                    'component_id' => $component->id,
                    'user_id' => auth()->id(),
                ]);
            } catch (\Throwable $e) {
                \Log::error('AP add component sync failed', [
                    'account_payable_id' => $accountPayable->id,
                    'component_id' => $component->id,
                    'user_id' => auth()->id(),
                    'error' => $e->getMessage(),
                ]);
                throw $e;
            }
        }

        return redirect()->back()->with('success', 'Biaya tambahan berhasil ditambahkan.');
    }

    private function mapReimbursementItems(AccountPayable $accountPayable)
    {
        return ReimbursementItem::query()
            ->with(['invoice:id,invoice_number,invoice_type'])
            ->when($accountPayable->sales_order_id, function ($query) use ($accountPayable) {
                $query->where('sales_order_id', $accountPayable->sales_order_id);
            })
            ->whereNotNull('invoice_id')
            ->whereHas('invoice', function ($query) {
                $query->whereIn('invoice_type', ['reimbursement', 'combined']);
            })
            ->orderBy('created_at')
            ->get()
            ->map(function (ReimbursementItem $item) {
                $receiptInfo = $item->receipt_info ?? [];

                return [
                    'id' => $item->id,
                    'description' => $item->description,
                    'amount' => (float) $item->amount,
                    'status' => $item->status,
                    'paid_at' => optional($item->paid_at)->toDateTimeString(),
                    'invoice_id' => $item->invoice_id,
                    'invoice_number' => $item->invoice?->invoice_number,
                    'invoice_type' => $item->invoice?->invoice_type,
                    'vendor_name' => data_get($receiptInfo, 'vendor_name'),
                    'component_id' => data_get($receiptInfo, 'component_id'),
                ];
            });
    }

    private function getPayablesForShow(AccountPayable $accountPayable): Collection
    {
        $query = AccountPayable::with([
            'components' => function ($query) {
                $query->orderBy('component_type');
            },
            'vendor',
            'salesOrder:id,order_number,customer,customer_name,shipper,consignee_shipper,released_at,so_date,vendor_breakdown,other_costs',
            'creator:id,name',
            'paidByUser:id,name',
        ]);

        if ($accountPayable->sales_order_id) {
            $query->where('sales_order_id', $accountPayable->sales_order_id);
        } else {
            $query->where('id', $accountPayable->id);
        }

        $payables = $query->orderBy('vendor_invoice_number')->orderBy('created_at')->get();

        $payables->each(function (AccountPayable $payable) {
            $payable->loadMissing('salesOrder');
            $payable->syncComponents();
            $payable->load('components');
        });

        return $payables;
    }

    private function buildGroupSummary(Collection $payables, ?SalesOrder $salesOrder): array
    {
        $totalAmount = (float) $payables->sum('amount');
        $totalPaid = (float) $payables->sum('paid_amount');
        $totalOutstanding = (float) $payables->sum('outstanding_amount');

        $dueDates = $payables->pluck('payment_due_date')->filter();
        $vendorInvoiceDates = $payables->pluck('vendor_invoice_date')->filter();

        return [
            'total_amount' => $totalAmount,
            'total_paid' => $totalPaid,
            'total_outstanding' => $totalOutstanding,
            'status' => $this->determineOverallStatus($totalOutstanding, $totalPaid),
            'sales_order' => $this->formatSalesOrder($salesOrder),
            'invoice_numbers' => $payables->pluck('vendor_invoice_number')->filter()->unique()->values(),
            'vendor_names' => $payables
                ->map(fn (AccountPayable $payable) => $payable->vendor->nama_vendor ?? $payable->vendor_name)
                ->filter()
                ->unique()
                ->values(),
            'due_date' => $this->formatDateValue($dueDates->min()),
            'latest_vendor_invoice_date' => $this->formatDateValue($vendorInvoiceDates->max()),
            'count' => $payables->count(),
        ];
    }

    private function paginatePayableGroups(Request $request): LengthAwarePaginator
    {
        $groupingExpression = DB::raw('COALESCE(account_payables.sales_order_id, account_payables.id)');

        $paginator = $this->filteredPayablesQuery($request)
            ->selectRaw('COALESCE(account_payables.sales_order_id, account_payables.id) as grouping_key')
            ->selectRaw('MIN(account_payables.sales_order_id) as sales_order_id')
            ->selectRaw('SUM(account_payables.amount) as total_amount')
            ->selectRaw('SUM(account_payables.paid_amount) as total_paid_amount')
            ->selectRaw('SUM(account_payables.outstanding_amount) as total_outstanding_amount')
            ->selectRaw('COUNT(*) as payable_count')
            ->selectRaw('MIN(account_payables.payment_due_date) as earliest_due_date')
            ->selectRaw('MAX(account_payables.payment_due_date) as latest_due_date')
            ->selectRaw('MAX(account_payables.vendor_invoice_date) as latest_vendor_invoice_date')
            ->selectRaw('MAX(account_payables.created_at) as latest_created_at')
            ->selectRaw('MAX(account_payables.id) as representative_payable_id')
            ->groupBy($groupingExpression)
            ->orderByDesc('latest_created_at')
            ->paginate(15);

        $groupItems = collect($paginator->items());

        if ($groupItems->isEmpty()) {
            return $paginator->setCollection(collect());
        }

        $salesOrderIds = $groupItems
            ->pluck('sales_order_id')
            ->filter()
            ->unique()
            ->values();

        $standalonePayableIds = $groupItems
            ->filter(fn ($group) => !$group->sales_order_id)
            ->pluck('representative_payable_id')
            ->filter()
            ->unique()
            ->values();

        $payablesBySalesOrder = $salesOrderIds->isNotEmpty()
            ? $this->fetchPayablesBySalesOrder($request, $salesOrderIds->all())
            : collect();

        $standalonePayables = $standalonePayableIds->isNotEmpty()
            ? $this->fetchStandalonePayables($request, $standalonePayableIds->all())
            : collect();

        $transformed = $groupItems
            ->map(function ($group) use ($payablesBySalesOrder, $standalonePayables) {
                if ($group->sales_order_id) {
                    $payables = $payablesBySalesOrder->get($group->sales_order_id, collect());
                    return $this->formatSalesOrderGroup($group, $payables);
                }

                $payable = $standalonePayables->get($group->representative_payable_id);
                return $this->formatStandaloneGroup($group, $payable);
            })
            ->filter()
            ->values();

        return $paginator->setCollection($transformed);
    }

    private function filteredPayablesQuery(Request $request)
    {
        $query = AccountPayable::query();
        $this->applyFilters($query, $request);

        return $query;
    }

    private function applyFilters($query, Request $request): void
    {
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('vendor_invoice_number', 'like', "%{$search}%")
                    ->orWhere('vendor_name', 'like', "%{$search}%")
                    ->orWhere('service_description', 'like', "%{$search}%")
                    ->orWhereHas('vendor', function ($vendorQuery) use ($search) {
                        $vendorQuery->where('nama_vendor', 'like', "%{$search}%");
                    })
                    ->orWhereHas('salesOrder', function ($salesOrderQuery) use ($search) {
                        $salesOrderQuery->where('order_number', 'like', "%{$search}%")
                            ->orWhere('customer', 'like', "%{$search}%")
                            ->orWhere('shipper', 'like', "%{$search}%")
                            ->orWhere('customer_name', 'like', "%{$search}%")
                            ->orWhere('consignee_shipper', 'like', "%{$search}%");
                    });
            });
        }

        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        if ($vendorId = $request->get('vendor_id')) {
            $query->where('vendor_id', $vendorId);
        }

        if ($dateFrom = $request->get('date_from')) {
            $query->whereDate('vendor_invoice_date', '>=', $dateFrom);
        }

        if ($dateTo = $request->get('date_to')) {
            $query->whereDate('vendor_invoice_date', '<=', $dateTo);
        }
    }

    private function fetchPayablesBySalesOrder(Request $request, array $salesOrderIds): Collection
    {
        return $this->filteredPayablesQuery($request)
            ->with([
                'components' => function ($query) {
                    $query->orderBy('component_type');
                },
                'vendor',
                'salesOrder:id,order_number,customer,customer_name,shipper,consignee_shipper,released_at,so_date',
            ])
            ->whereIn('sales_order_id', $salesOrderIds)
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('sales_order_id');
    }

    private function fetchStandalonePayables(Request $request, array $payableIds): Collection
    {
        return $this->filteredPayablesQuery($request)
            ->with([
                'components' => function ($query) {
                    $query->orderBy('component_type');
                },
                'vendor',
            ])
            ->whereIn('id', $payableIds)
            ->orderBy('created_at', 'desc')
            ->get()
            ->keyBy('id');
    }

    private function formatSalesOrderGroup(object $group, Collection $payables): ?array
    {
        if ($payables->isEmpty()) {
            return null;
        }

        $salesOrder = $payables->first()->salesOrder ?? null;
        $formattedPayables = $payables
            ->map(fn (AccountPayable $payable) => $this->formatPayable($payable))
            ->values();

        return [
            'group_key' => $salesOrder
                ? 'sales-order-' . $salesOrder->id
                : 'sales-order-' . $group->grouping_key,
            'group_type' => 'sales_order',
            'sales_order' => $this->formatSalesOrder($salesOrder),
            'account_payables' => $formattedPayables->toArray(),
            'totals' => [
                'amount' => (float) $group->total_amount,
                'paid' => (float) $group->total_paid_amount,
                'outstanding' => (float) $group->total_outstanding_amount,
            ],
            'status' => $this->determineOverallStatus(
                (float) $group->total_outstanding_amount,
                (float) $group->total_paid_amount
            ),
            'due_date' => $this->formatDateValue($group->earliest_due_date),
            'latest_vendor_invoice_date' => $this->formatDateValue(
                $group->latest_vendor_invoice_date ?? $formattedPayables->pluck('vendor_invoice_date')->filter()->first()
            ),
            'vendor_summary' => $this->buildVendorSummaryPayload($formattedPayables),
            'invoice_numbers' => $this->collectInvoiceNumbers($formattedPayables),
            'service_description' => $formattedPayables->pluck('service_description')->filter()->first(),
            'service_remarks' => $formattedPayables->pluck('service_remarks')->filter()->first(),
        ];
    }

    private function formatStandaloneGroup(object $group, ?AccountPayable $payable): ?array
    {
        if (!$payable) {
            return null;
        }

        $formattedPayables = collect([$this->formatPayable($payable)]);
        $firstPayable = $formattedPayables->first();

        return [
            'group_key' => 'payable-' . $payable->id,
            'group_type' => 'single_payable',
            'sales_order' => null,
            'account_payables' => $formattedPayables->toArray(),
            'totals' => [
                'amount' => (float) $group->total_amount,
                'paid' => (float) $group->total_paid_amount,
                'outstanding' => (float) $group->total_outstanding_amount,
            ],
            'status' => $this->determineOverallStatus(
                (float) $group->total_outstanding_amount,
                (float) $group->total_paid_amount
            ),
            'due_date' => $this->formatDateValue(
                $group->earliest_due_date ?? ($firstPayable['payment_due_date'] ?? null)
            ),
            'latest_vendor_invoice_date' => $this->formatDateValue(
                $group->latest_vendor_invoice_date ?? ($firstPayable['vendor_invoice_date'] ?? null)
            ),
            'vendor_summary' => $this->buildVendorSummaryPayload($formattedPayables),
            'invoice_numbers' => $this->collectInvoiceNumbers($formattedPayables),
            'service_description' => $firstPayable['service_description'] ?? null,
            'service_remarks' => $firstPayable['service_remarks'] ?? null,
        ];
    }

    private function formatSalesOrder(?SalesOrder $salesOrder): ?array
    {
        if (!$salesOrder) {
            return null;
        }

        return [
            'id' => $salesOrder->id,
            'order_number' => $salesOrder->order_number ?? $salesOrder->so_number,
            'customer' => $salesOrder->customer ?? $salesOrder->customer_name,
            'shipper' => $salesOrder->shipper ?? $salesOrder->consignee_shipper,
            'so_date' => $this->formatDateValue($salesOrder->so_date),
            'released_at' => optional($salesOrder->released_at)->toDateTimeString(),
        ];
    }

    private function formatPayable(AccountPayable $payable): array
    {
        $payable->syncComponents();
        $payable->loadMissing([
            'components' => function ($query) {
                $query->orderBy('component_type');
            },
            'vendor',
            'salesOrder:id,order_number,customer,customer_name,shipper,consignee_shipper,released_at,so_date,vendor_breakdown,other_costs',
            'creator:id,name',
            'paidByUser:id,name',
        ]);

        return [
            'id' => $payable->id,
            'sales_order_id' => $payable->sales_order_id,
            'vendor_invoice_number' => $payable->vendor_invoice_number,
            'vendor_invoice_date' => $this->formatDateValue($payable->vendor_invoice_date),
            'service_description' => $payable->service_description,
            'service_remarks' => $payable->service_remarks,
            'sales_order' => $this->formatSalesOrder($payable->salesOrder),
            'amount' => (float) $payable->amount,
            'paid_amount' => (float) $payable->paid_amount,
            'outstanding_amount' => (float) $payable->outstanding_amount,
            'status' => $payable->status,
            'payment_due_date' => $this->formatDateValue($payable->payment_due_date),
            'payment_date' => $this->formatDateValue($payable->payment_date),
            'payment_method' => $payable->payment_method,
            'payment_notes' => $payable->payment_notes,
            'vendor_bank_account' => $payable->vendor_bank_account,
            'vendor_account_name' => $payable->vendor_account_name,
            'days_overdue' => $payable->days_overdue,
            'vat_receivable_rate' => $payable->vat_receivable_rate !== null ? (float) $payable->vat_receivable_rate : null,
            'vat_receivable_amount' => $payable->vat_receivable_amount !== null ? (float) $payable->vat_receivable_amount : null,
            'vat_receivable_posted_at' => $payable->vat_receivable_posted_at?->toDateTimeString(),
            'vat_receivable_account_id' => $payable->vat_receivable_account_id,
            'vendor_name' => $payable->vendor->nama_vendor ?? $payable->vendor_name,
            'vendor' => $payable->vendor ? [
                'id' => $payable->vendor->id,
                'nama_vendor' => $payable->vendor->nama_vendor,
            ] : null,
            'creator' => $payable->creator ? [
                'id' => $payable->creator->id,
                'name' => $payable->creator->name,
            ] : null,
            'paid_by_user' => $payable->paidByUser ? [
                'id' => $payable->paidByUser->id,
                'name' => $payable->paidByUser->name,
            ] : null,
            'components' => $payable->components->map(function ($component) {
                return [
                    'id' => $component->id,
                    'component_type' => $component->component_type,
                    'description' => $component->description,
                    'amount' => (float) $component->amount,
                    'paid_amount' => (float) $component->paid_amount,
                    'outstanding_amount' => (float) $component->outstanding_amount,
                    'status' => $component->status,
                    'due_date' => $this->formatDateValue($component->due_date),
                    'recipient_name' => $component->recipient_name,
                    'related_items' => $component->related_items,
                ];
            })->values()->all(),
        ];
    }

    private function determineOverallStatus(float $outstanding, float $paid): string
    {
        if ($outstanding <= 0.01) {
            return 'paid';
        }

        if ($paid > 0) {
            return 'partial';
        }

        return 'unpaid';
    }

    private function formatDateValue($value): ?string
    {
        if (!$value) {
            return null;
        }

        try {
            return Carbon::parse($value)->toDateString();
        } catch (\Throwable $e) {
            return null;
        }
    }

    private function buildVendorSummaryFromCollection(Collection $payables): Collection
    {
        return $payables
            ->flatMap(function (AccountPayable $payable) {
                $payable->loadMissing('components');

                if ($payable->components->isEmpty()) {
                    return [[
                        'vendor_id' => $payable->vendor_id,
                        'vendor_name' => $payable->vendor->nama_vendor ?? $payable->vendor_name,
                        'source_type' => $payable->vendor_id ? 'vendor_payment' : 'operational_cost',
                        'source_label' => $payable->vendor_id ? 'Vendor Payment' : 'Biaya Operasional',
                        'total_amount' => (float) $payable->amount,
                        'total_paid' => (float) $payable->paid_amount,
                        'total_outstanding' => (float) $payable->outstanding_amount,
                        'count_payables' => 1,
                        'count_overdue' => in_array($payable->status, ['unpaid', 'partial'], true)
                            && $payable->payment_due_date
                            && $payable->payment_due_date < now()
                            ? 1
                            : 0,
                    ]];
                }

                return $payable->components->map(function ($component) use ($payable) {
                    return [
                        'vendor_id' => $payable->vendor_id,
                        'vendor_name' => $payable->vendor->nama_vendor ?? $payable->vendor_name,
                        'source_type' => $component->component_type,
                        'source_label' => $component->getComponentLabel(),
                        'total_amount' => (float) $component->amount,
                        'total_paid' => (float) $component->paid_amount,
                        'total_outstanding' => (float) $component->outstanding_amount,
                        'count_payables' => 1,
                        'count_overdue' => $component->due_date && $component->status !== 'paid' && $component->due_date < now() ? 1 : 0,
                    ];
                });
            })
            ->groupBy(function ($entry) {
                return ($entry['vendor_id'] ?? 'internal') . '::' . $entry['source_type'];
            })
            ->map(function ($entries) {
                $first = $entries->first();
                return [
                    'vendor_id' => $first['vendor_id'],
                    'vendor_name' => $first['vendor_name'],
                    'source_type' => $first['source_type'],
                    'source_label' => $first['source_label'],
                    'total_amount' => (float) $entries->sum('total_amount'),
                    'total_paid' => (float) $entries->sum('total_paid'),
                    'total_outstanding' => (float) $entries->sum('total_outstanding'),
                    'count_payables' => (int) $entries->sum('count_payables'),
                    'count_overdue' => (int) $entries->sum('count_overdue'),
                ];
            })
            ->sortByDesc('total_outstanding')
            ->values();
    }

    private function buildVendorSummaryPayload(Collection $payables): array
    {
        return $payables->map(function ($payable) {
            $vendorName = data_get($payable, 'vendor.nama_vendor')
                ?? data_get($payable, 'vendor_name')
                ?? 'Internal';

            return [
                'id' => data_get($payable, 'id'),
                'vendor_name' => $vendorName,
                'invoice_number' => data_get($payable, 'vendor_invoice_number'),
                'status' => data_get($payable, 'status', 'unpaid'),
                'outstanding' => (float) data_get($payable, 'outstanding_amount', 0),
                'amount' => (float) data_get($payable, 'amount', 0),
            ];
        })->values()->all();
    }

    private function collectInvoiceNumbers(Collection $payables): array
    {
        return $payables
            ->pluck('vendor_invoice_number')
            ->filter()
            ->unique()
            ->values()
            ->all();
    }

    /**
     * Dashboard summary for payables
     */
    public function summary()
    {
        $summary = [
            'total_amount' => AccountPayable::sum('amount'),
            'total_outstanding' => AccountPayable::sum('outstanding_amount'),
            'total_paid' => AccountPayable::sum('paid_amount'),
            'overdue_amount' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->sum('outstanding_amount'),
            'count_total' => AccountPayable::count(),
            'count_unpaid' => AccountPayable::where('status', 'unpaid')->count(),
            'count_partial' => AccountPayable::where('status', 'partial')->count(),
            'count_paid' => AccountPayable::where('status', 'paid')->count(),
            'count_overdue' => AccountPayable::where('payment_due_date', '<', now())
                ->whereIn('status', ['unpaid', 'partial'])
                ->count(),
        ];

        return response()->json($summary);
    }
}
