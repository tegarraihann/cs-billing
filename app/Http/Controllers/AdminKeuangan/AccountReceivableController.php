<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountReceivable;
use App\Models\Customer;
use App\Models\BankAccount;
use App\Models\ChartOfAccount;
use App\Models\FinancialPositionAdjustment;
use App\Models\ProfitLossPeriod;
use App\Models\ProfitLossEntry;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\ReimbursementItem;
use App\Models\SalesOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use Barryvdh\DomPDF\Facade\Pdf;

class AccountReceivableController extends Controller
{
    /**
     * Display a listing of account receivables
     */
    public function index(Request $request)
    {
        if (!$request->filled('date_from') && !$request->filled('date_to')) {
            $request->merge([
                'date_from' => now()->startOfMonth()->toDateString(),
                'date_to' => now()->endOfMonth()->toDateString(),
            ]);
        }

        $query = AccountReceivable::with(['customer', 'invoice', 'salesOrder'])
            ->select('account_receivables.*')
            ->selectSub(
                SalesOrder::query()
                    ->select('order_number')
                    ->whereColumn('sales_orders.id', 'account_receivables.sales_order_id')
                    ->limit(1),
                'sales_order_order_number'
            )
            ->orderByRaw(
                "CASE WHEN sales_order_order_number IS NULL OR sales_order_order_number = '' THEN 1 ELSE 0 END"
            )
            ->orderBy('sales_order_order_number')
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhereHas('customer', function ($customerQuery) use ($search) {
                        $customerQuery->where('company_name', 'like', "%{$search}%");
                    });
            });
        }

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Customer filter
        if ($request->has('customer_id') && $request->customer_id) {
            $query->where('customer_id', $request->customer_id);
        }

        // Date range filter
        if ($request->has('date_from') && $request->date_from) {
            $query->where('invoice_date', '>=', $request->date_from);
        }
        if ($request->has('date_to') && $request->date_to) {
            $query->where('invoice_date', '<=', $request->date_to);
        }

        $receivables = $query->paginate(5)->withQueryString();

        // Calculate summary
        $summary = [
            'total_outstanding' => AccountReceivable::sum('outstanding_amount'),
            'total_overdue' => AccountReceivable::where('status', 'overdue')->sum('outstanding_amount'),
            'count_overdue' => AccountReceivable::where('status', 'overdue')->count(),
            'count_outstanding' => AccountReceivable::whereIn('status', ['outstanding', 'partial'])->count()
        ];

        // Calculate summary per customer (for current filtered results)
        $currentQuery = clone $query;
        $currentResults = $currentQuery->get();

        $customerSummary = $currentResults->groupBy('customer_id')->map(function ($receivables, $customerId) {
            $customer = $receivables->first()->customer;
            return [
                'customer_id' => $customerId,
                'customer_name' => $customer ? $customer->company_name : $receivables->first()->customer_name,
                'total_amount' => (float) $receivables->sum('invoice_amount'),
                'total_paid' => (float) $receivables->sum('paid_amount'),
                'total_outstanding' => (float) $receivables->sum('outstanding_amount'),
                'count_invoices' => (int) $receivables->count(),
                'count_overdue' => (int) $receivables->where('status', 'overdue')->count()
            ];
        })->sortByDesc('total_outstanding')->values();

        // Get customers for filter
        $customers = Customer::select('id', 'company_name')->orderBy('company_name')->get();

        return Inertia::render('Admin/AdminKeuangan/AccountReceivables/Index', [
            'receivables' => $receivables,
            'summary' => $summary,
            'customerSummary' => $customerSummary,
            'customers' => $customers,
            'filters' => $request->only(['search', 'status', 'customer_id', 'date_from', 'date_to'])
        ]);
    }

    /**
     * Display the specified account receivable
     */
    public function show(AccountReceivable $accountReceivable)
    {
        $accountReceivable->load(['customer', 'invoice.items.vendor', 'salesOrder.reimbursementItems.vendor', 'creator']);
        $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
        $accountReceivable->load('components');
        $bankAccounts = \App\Models\BankAccount::all();
        $invoice = $accountReceivable->invoice;
        $salesOrder = $accountReceivable->salesOrder;

        $mainComponent = $accountReceivable->components->firstWhere('component_type', 'main')
            ?? $accountReceivable->components->firstWhere('component_type', 'invoice_main');
        $mainComponentStatus = $mainComponent?->status;

        $mainItems = collect();
        if ($invoice && $invoice->relationLoaded('items')) {
            $mainItems = $invoice->items
                ->where('item_type', '!=', 'reimbursement')
                ->values()
                ->map(function ($item) use ($mainComponentStatus) {
                    $quantity = (float) ($item->quantity ?? 1);
                    $unitPrice = (float) ($item->rate ?? $item->amount ?? 0);
                    return [
                        'id' => $item->id,
                        'description' => $item->description,
                        'quantity' => $quantity,
                        'unit' => $item->unit,
                        'unit_price' => $unitPrice,
                        'line_total' => (float) ($item->amount ?? ($unitPrice * $quantity)),
                        'paid_amount' => (float) ($item->paid_amount ?? 0),
                        'outstanding_amount' => (float) ($item->outstanding_amount ?? $item->getLineTotal()),
                        'status' => $item->payment_status ?? $mainComponentStatus,
                    ];
                });
        }

        if ($mainItems->isEmpty() && $salesOrder && is_array($salesOrder->vendor_breakdown)) {
            $mainItems = collect($salesOrder->vendor_breakdown)
                ->filter(function ($vendor) {
                    return isset($vendor['selling_amount']) && (float) $vendor['selling_amount'] > 0;
                })
                ->values()
                ->map(function ($vendor, $index) use ($mainComponentStatus) {
                    $quantity = (float) ($vendor['qty'] ?? $vendor['quantity'] ?? 1);
                    $unitPrice = (float) ($vendor['selling_amount'] ?? 0);
                    return [
                        'id' => 'so-main-' . $index,
                        'description' => $vendor['description'] ?? 'Service',
                        'quantity' => $quantity,
                        'unit' => $vendor['unit'] ?? null,
                        'unit_price' => $unitPrice,
                        'line_total' => $unitPrice * $quantity,
                        'status' => $mainComponentStatus,
                    ];
                });
        }

        // IMPORTANT: reimbursement list must follow current invoice scope only.
        $reimbursementItems = $this->resolveInvoiceReimbursementItems($accountReceivable);

        return Inertia::render('Admin/AdminKeuangan/AccountReceivables/Show', [
            'receivable' => $accountReceivable,
            'bankAccounts' => $bankAccounts,
            'mainItems' => $mainItems,
            'reimbursementItems' => $reimbursementItems,
        ]);
    }

    /**
     * Provide payment form data for modal (components & bank accounts)
     */
    public function paymentData(AccountReceivable $accountReceivable)
    {
        $accountReceivable->load(['invoice', 'customer']);
        $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
        $accountReceivable->load('components');

        $components = $accountReceivable->components->map(function ($component) {
            return [
                'id' => $component->id,
                'component_type' => $component->component_type,
                'description' => $component->description,
                'invoice_amount' => (float) $component->amount,
                'paid_amount' => (float) $component->paid_amount,
                'outstanding_amount' => (float) $component->outstanding_amount,
            ];
        })->values();

        $bankAccounts = BankAccount::select('id', 'bank_name', 'account_name', 'account_number')
            ->orderBy('bank_name')
            ->get()
            ->map(function ($bank) {
                return [
                    'id' => $bank->id,
                    'bank_name' => $bank->bank_name,
                    'account_name' => $bank->account_name,
                    'account_number' => $bank->account_number,
                ];
            });

        return response()->json([
            'receivable' => [
                'id' => $accountReceivable->id,
                'invoice_number' => $accountReceivable->invoice_number,
                'outstanding_amount' => (float) $accountReceivable->outstanding_amount,
                'status' => $accountReceivable->status,
            ],
            'components' => $components,
            'requires_component' => $components->count() > 1,
            'bank_accounts' => $bankAccounts,
            'default_payment_date' => now()->toDateString(),
        ]);
    }

    /**
     * Post outstanding AR to VAT Payable and close AR.
     */
    public function postVatPayable(AccountReceivable $accountReceivable)
    {
        $accountReceivable->loadMissing(['invoice', 'customer']);
        $invoice = $accountReceivable->invoice;
        if (!$invoice) {
            return redirect()->back()->withErrors(['error' => 'Invoice tidak ditemukan.']);
        }

        if ($accountReceivable->status !== 'paid' || $invoice->status !== 'paid') {
            return redirect()->back()->withErrors(['error' => 'Piutang harus lunas sebelum diposting ke VAT Payable.']);
        }

        if (!$invoice->hasVat()) {
            return redirect()->back()->withErrors(['error' => 'Invoice tidak memiliki PPN yang dapat diposting.']);
        }

        if ($invoice->isVatPosted()) {
            return redirect()->back()->withErrors(['error' => 'VAT Payable untuk invoice ini sudah diposting.']);
        }

        $now = now();

        DB::transaction(function () use ($invoice, $now) {
            $invoice->postVatPayable(Carbon::parse($now), auth()->id());
        });

        return redirect()->back()->with('success', 'VAT Payable berhasil diposting ke Financial Position.');
    }

    /**
     * Post VAT Payable 11% to Financial Position and close AR.
     */
    public function postVatPayable11(AccountReceivable $accountReceivable)
    {
        return $this->postVatPayableByAccount($accountReceivable, '2110', '11%');
    }

    /**
     * Post VAT Payable 1.1% to Financial Position and close AR.
     */
    public function postVatPayable11_1(AccountReceivable $accountReceivable)
    {
        return $this->postVatPayableByAccount($accountReceivable, '2111', '1.1%');
    }

    private function postVatPayableByAccount(AccountReceivable $accountReceivable, string $accountCode, string $label)
    {
        $accountReceivable->loadMissing(['invoice', 'customer']);
        $invoice = $accountReceivable->invoice;
        if (!$invoice) {
            return redirect()->back()->withErrors(['error' => 'Invoice tidak ditemukan.']);
        }

        if ($accountReceivable->status !== 'paid' || $invoice->status !== 'paid') {
            return redirect()->back()->withErrors(['error' => 'Piutang harus lunas sebelum diposting ke VAT Payable.']);
        }

        if (!$invoice->hasVat()) {
            return redirect()->back()->withErrors(['error' => 'Invoice tidak memiliki PPN yang dapat diposting.']);
        }

        if ($invoice->isVatPosted()) {
            return redirect()->back()->withErrors(['error' => 'VAT Payable untuk invoice ini sudah diposting.']);
        }

        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return redirect()->back()->withErrors(['error' => "Akun VAT Payable {$label} belum dikonfigurasi."]);
        }

        $effectiveDate = now()->toDateString();

        $noteEntry = 'Posted to VAT Payable ' . $label;

        DB::transaction(function () use ($invoice, $accountId, $accountCode, $label, $effectiveDate, $accountReceivable, $noteEntry) {
            FinancialPositionAdjustment::create([
                'account_id' => $accountId,
                'effective_date' => $effectiveDate,
                'amount' => (float) $invoice->vat_amount,
                'notes' => 'VAT Payable ' . $label . ' dari Invoice ' . $invoice->invoice_number,
                'created_by' => auth()->id(),
            ]);

            $invoice->update([
                'vat_posted_at' => now(),
                'vat_posted_account_id' => $accountId,
            ]);

            $accountReceivable->notes = $this->appendReceivableNote($accountReceivable->notes, $noteEntry);
            $accountReceivable->save();
        });

        return redirect()->back()->with('success', "VAT Payable {$label} berhasil diposting ke Financial Position.");
    }

    /**
     * Post outstanding AR to tax expense (0.5% or 2%) and close AR.
     */
    public function postTaxExpense(AccountReceivable $accountReceivable, Request $request)
    {
        $validated = $request->validate([
            'tax_rate' => ['required', Rule::in(['0.5', '2', 0.5, 2])],
        ]);

        $accountReceivable->loadMissing(['invoice', 'customer']);
        $invoice = $accountReceivable->invoice;

        if ($invoice && $invoice->hasVat() && (float) ($invoice->pph23_rate ?? 0) > 0) {
            return redirect()->back()->withErrors([
                'error' => 'Invoice ini menggunakan PPh23 dengan PPN. Gunakan aksi Post VAT Receivable PPh23.',
            ]);
        }

        if ($accountReceivable->outstanding_amount <= 0) {
            return redirect()->back()->withErrors(['error' => 'Tidak ada outstanding yang dapat diposting.']);
        }

        if ($accountReceivable->tax_writeoff_at) {
            return redirect()->back()->withErrors(['error' => 'Piutang ini sudah diposting ke beban pajak.']);
        }

        $rate = (float) $validated['tax_rate'];
        $expenseAccount = $this->resolveTaxExpenseAccount($rate);
        if (!$expenseAccount) {
            return redirect()->back()->withErrors(['error' => 'Akun Beban Pajak belum dikonfigurasi.']);
        }

        $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
        $accountReceivable->load('components');
        $mainComponent = $accountReceivable->components->firstWhere('component_type', 'main');

        $amount = (float) $accountReceivable->outstanding_amount;
        $targetComponent = null;

        if ($accountReceivable->components->isNotEmpty()) {
            if (!$mainComponent) {
                return redirect()->back()->withErrors(['error' => 'Komponen main invoice tidak ditemukan.']);
            }
            $targetComponent = $mainComponent;
            $amount = (float) $mainComponent->outstanding_amount;
        }

        if ($amount <= 0) {
            return redirect()->back()->withErrors(['error' => 'Outstanding main invoice tidak valid untuk diposting.']);
        }
        $now = now();

        DB::transaction(function () use ($accountReceivable, $amount, $expenseAccount, $rate, $now, $targetComponent) {
            $invoice = $accountReceivable->invoice;
            $periodId = null;

            if ($invoice && $invoice->invoice_date) {
                $periodId = ProfitLossPeriod::active()
                    ->whereDate('start_date', '<=', $invoice->invoice_date)
                    ->whereDate('end_date', '>=', $invoice->invoice_date)
                    ->orderBy('start_date')
                    ->value('id');
            }

            if ($periodId) {
                ProfitLossEntry::updateOrCreate(
                    [
                        'period_id' => $periodId,
                        'reference_type' => 'account_receivable_tax',
                        'reference_id' => $accountReceivable->id,
                        'entry_type' => $rate === 0.5 ? 'manual_tax_0_5' : 'manual_tax_2',
                    ],
                    [
                        'account_id' => $expenseAccount->id,
                        'description' => ($rate === 0.5 ? 'Beban Pajak 0.5%' : 'Beban Pajak 2%') . ' - ' . ($invoice?->invoice_number ?? $accountReceivable->invoice_number),
                        'amount' => $amount,
                        'transaction_date' => $now->toDateString(),
                        'notes' => 'Post beban pajak dari AR ' . $accountReceivable->invoice_number,
                        'additional_data' => [
                            'invoice_number' => $invoice?->invoice_number,
                            'customer_name' => $accountReceivable->customer->company_name ?? $accountReceivable->customer_name ?? '',
                            'tax_rate' => $rate,
                        ],
                        'created_by' => auth()->id(),
                    ]
                );
            }

            $accountReceivable->update([
                'tax_writeoff_rate' => $rate,
                'tax_writeoff_amount' => $amount,
                'tax_writeoff_at' => $now,
                'tax_writeoff_account_id' => $expenseAccount->id,
            ]);

            $accountReceivable->recordPayment(
                $amount,
                'Posted to Tax Expense ' . $rate . '%',
                $targetComponent,
                Carbon::parse($now)
            );
        });

        return redirect()->back()->with('success', 'Outstanding main invoice diposting ke beban pajak.');
    }

    /**
     * Post outstanding AR to VAT Receivable PPh23 (0.5% / 2%) and close AR.
     */
    public function postPph23Receivable(AccountReceivable $accountReceivable, Request $request)
    {
        $validated = $request->validate([
            'tax_rate' => ['required', Rule::in(['0.5', '2', 0.5, 2])],
        ]);

        $accountReceivable->loadMissing(['invoice', 'customer']);
        $invoice = $accountReceivable->invoice;

        if (!$invoice) {
            return redirect()->back()->withErrors(['error' => 'Invoice tidak ditemukan.']);
        }

        if ($invoice->isPph23Posted()) {
            return redirect()->back()->withErrors(['error' => 'PPH23 untuk invoice ini sudah diposting.']);
        }

        $rate = (float) $validated['tax_rate'];

        $receivableAccount = $this->resolvePph23ReceivableAccount($rate);
        if (!$receivableAccount) {
            return redirect()->back()->withErrors(['error' => 'Akun VAT Receivable PPh23 belum dikonfigurasi.']);
        }

        $now = now();

        $accountReceivable->syncComponentsFromInvoice($invoice);
        $accountReceivable->load('components');
        $mainComponent = $accountReceivable->components->firstWhere('component_type', 'main');
        $mainOutstanding = (float) ($mainComponent?->outstanding_amount ?? 0);

        if ($mainOutstanding <= 0) {
            return redirect()->back()->withErrors(['error' => 'Outstanding main invoice tidak valid untuk diposting.']);
        }

        $amount = $mainOutstanding;

        DB::transaction(function () use ($accountReceivable, $invoice, $amount, $receivableAccount, $rate, $now) {
            $invoice->postPph23Receivable($amount, Carbon::parse($now), auth()->id(), $rate);

            $accountReceivable->syncComponentsFromInvoice($invoice);
            $accountReceivable->load('components');
            $mainComponent = $accountReceivable->components->firstWhere('component_type', 'main');

            if (!$mainComponent || (float) $mainComponent->outstanding_amount <= 0) {
                return;
            }

            $payAmount = min($amount, (float) $mainComponent->outstanding_amount);

            if ($accountReceivable->components->isEmpty()) {
                $accountReceivable->recordPayment(
                    $payAmount,
                    'Posted to VAT Receivable PPh23 ' . $rate . '%',
                    null,
                    Carbon::parse($now)
                );
                return;
            }
            $accountReceivable->recordPayment(
                $payAmount,
                'Posted to VAT Receivable PPh23 ' . $rate . '%',
                $mainComponent,
                Carbon::parse($now)
            );
        });

        return redirect()->back()->with('success', 'Outstanding main invoice diposting ke VAT Receivable PPh23.');
    }

    private function resolveTaxExpenseAccount(float $rate): ?ChartOfAccount
    {
        $rateKey = $rate === 0.5 ? '0.5' : '2';
        $accountName = $rate === 0.5 ? 'Beban Pajak 0.5%' : 'Beban Pajak 2%';
        $accountCode = $rate === 0.5 ? '5450' : '5451';

        $account = ChartOfAccount::where('account_code', $accountCode)->first();
        if (!$account) {
            $account = ChartOfAccount::where('account_name', $accountName)->first();
        }

        if (!$account) {
            $account = ChartOfAccount::create([
                'account_code' => $accountCode,
                'account_name' => $accountName,
                'account_type' => 'expense',
                'account_category' => 'expense_tax',
                'is_active' => true,
                'sort_order' => 0,
                'description' => 'Auto created for tax expense rate ' . $rateKey . '%',
            ]);
        } elseif ($account->account_category !== 'expense_tax') {
            $account->update(['account_category' => 'expense_tax']);
        }

        return $account;
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

    private function appendReceivableNote(?string $currentNotes, string $noteEntry): string
    {
        $currentNotes = $currentNotes ?? '';
        if (trim($currentNotes) === '') {
            return $noteEntry;
        }

        if (str_contains($currentNotes, $noteEntry)) {
            return $currentNotes;
        }

        return $currentNotes . "\n" . $noteEntry;
    }

    /**
     * Record a payment for account receivable
     */
    public function recordPayment(Request $request, AccountReceivable $accountReceivable)
    {
        if ($accountReceivable->invoice) {
            $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
        }
        $accountReceivable->refresh();
        $components = $accountReceivable->components()->get();
        $requiresComponent = $components->count() > 1;
        if (!$request->filled('component_id')) {
            $request->merge(['component_id' => null]);
        }

        // Normalize Indonesian number format before validation
        $amount = $request->input('amount');
        if ($amount) {
            $amount = $this->normalizeIndonesianNumber($amount);
            $request->merge(['amount' => $amount]);
        }

        $rules = [
            'amount' => 'required|numeric|min:0.01|max:' . $accountReceivable->outstanding_amount,
            'payment_date' => 'required|date',
            'bank_account_id' => 'required|exists:bank_accounts,id',
            'notes' => 'nullable|string|max:500',
        ];

        $rules['component_id'] = [
            $requiresComponent ? 'required' : 'nullable',
            Rule::exists('account_receivable_components', 'id')->where(function ($query) use ($accountReceivable) {
                $query->where('account_receivable_id', $accountReceivable->id);
            }),
        ];

        $validated = $request->validate($rules);

        $component = null;
        if (!empty($validated['component_id'])) {
            $component = $components->firstWhere('id', (int) $validated['component_id']);
        } elseif ($components->count() === 1) {
            $component = $components->first();
        }

        if ($requiresComponent && !$component) {
            return redirect()->back()->withErrors([
                'component_id' => 'Pilih komponen pembayaran.'
            ])->withInput();
        }

        if ($component && $validated['amount'] > $component->outstanding_amount) {
            $componentLabel = $component->component_type === 'debit_note'
                ? 'Debit Note'
                : ($component->component_type === 'vat' ? 'VAT' : 'Invoice Main');
            return redirect()->back()->withErrors([
                'amount' => 'Amount cannot exceed outstanding balance for ' . $componentLabel . ' (Rp ' . number_format($component->outstanding_amount, 0, ',', '.') . ')'
            ])->withInput();
        }

        DB::transaction(function () use ($accountReceivable, $validated) {
            $component = null;
            if (!empty($validated['component_id'])) {
                $component = $accountReceivable->components()->find($validated['component_id']);
            } elseif ($accountReceivable->components()->count() === 1) {
                $component = $accountReceivable->components()->first();
            }

            $success = $accountReceivable->recordPayment(
                $validated['amount'],
                $validated['notes'],
                $component,
                Carbon::parse($validated['payment_date'])
            );

            if (!$success) {
                \Log::warning('AR recordPayment failed', [
                    'account_receivable_id' => $accountReceivable->id,
                    'component_id' => $component?->id,
                    'amount' => $validated['amount'] ?? null,
                    'payment_date' => $validated['payment_date'] ?? null,
                    'bank_account_id' => $validated['bank_account_id'] ?? null,
                    'user_id' => auth()->id(),
                ]);
                throw new \Exception('Failed to record payment');
            }

            $componentLabel = $component
                ? ($component->component_type === 'debit_note'
                    ? 'Debit Note'
                    : ($component->component_type === 'vat' ? 'VAT' : 'Invoice Main'))
                : 'Invoice';

            $customerName = $accountReceivable->customer?->company_name
                ?? $accountReceivable->customer_name
                ?? 'Customer';

            $invoiceNumber = $accountReceivable->invoice_number
                ?? $accountReceivable->reference_number
                ?? 'Opening Balance';

            // Record bank transaction (Customer Payment = Credit to bank)
            \App\Models\BankTransaction::recordCustomerPayment(
                $validated['bank_account_id'],
                $validated['amount'],
                "Customer payment for {$componentLabel} {$invoiceNumber} from {$customerName}",
                $accountReceivable->id,
                $validated['payment_date']
            );

            // Update related invoice status if fully paid
            if ($accountReceivable->status === 'paid' && $accountReceivable->invoice) {
                $accountReceivable->invoice->update([
                    'status' => 'paid',
                    'paid_date' => now(),
                    'paid_amount' => $accountReceivable->invoice_amount
                ]);
            }
        });

        return redirect()->back()->with('success', 'Payment recorded successfully');
    }

    public function recordItemPayment(Request $request, AccountReceivable $accountReceivable)
    {
        $accountReceivable->load(['invoice.items', 'salesOrder.reimbursementItems', 'customer']);
        $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
        $accountReceivable->load('components');

        $amount = $request->input('amount');
        if ($amount) {
            $amount = $this->normalizeIndonesianNumber($amount);
            $request->merge(['amount' => $amount]);
        }

        $validated = $request->validate([
            'item_type' => ['required', Rule::in(['main', 'reimbursement'])],
            'item_id' => 'required',
            'amount' => 'required|numeric|min:0.01',
            'payment_date' => 'required|date',
            'bank_account_id' => 'required|exists:bank_accounts,id',
            'notes' => 'nullable|string|max:500',
        ]);

        $invoiceItem = null;
        $reimbursementItem = null;
        $linkedInvoiceReimbursementItem = null;
        $outstanding = 0;

        if ($validated['item_type'] === 'main') {
            $invoiceItem = InvoiceItem::where('id', $validated['item_id'])
                ->whereHas('invoice', function ($query) use ($accountReceivable) {
                    $query->where('id', $accountReceivable->invoice_id);
                })
                ->first();

            if (!$invoiceItem) {
                return redirect()->back()->withErrors(['amount' => 'Main item not found.'])->withInput();
            }

            $outstanding = $invoiceItem->outstanding_amount ?? $invoiceItem->getLineTotal();
        } else {
            $invoiceScopedReimbursements = $this->resolveInvoiceReimbursementItems($accountReceivable, true);
            $selected = $invoiceScopedReimbursements->firstWhere('id', (int) $validated['item_id']);
            if (!$selected) {
                return redirect()->back()->withErrors(['amount' => 'Reimbursement item not found.'])->withInput();
            }

            $reimbursementItem = $selected['reimbursement_model'] ?? null;
            $linkedInvoiceReimbursementItem = $selected['invoice_item_model'] ?? null;
            $outstanding = (float) ($selected['outstanding_amount'] ?? 0);
        }

        if ($validated['amount'] > $outstanding) {
            return redirect()->back()->withErrors([
                'amount' => 'Amount cannot exceed outstanding balance (Rp ' . number_format($outstanding, 0, ',', '.') . ')'
            ])->withInput();
        }

        DB::transaction(function () use (
            $accountReceivable,
            $validated,
            $invoiceItem,
            $reimbursementItem,
            $linkedInvoiceReimbursementItem
        ) {
            if ($validated['item_type'] === 'main' && $invoiceItem) {
                $invoiceItem->updateItemPayment($validated['amount'], $validated['payment_date'], $validated['notes']);
                $this->syncMainComponentFromItems($accountReceivable);
            }

            if ($validated['item_type'] === 'reimbursement' && $reimbursementItem && $linkedInvoiceReimbursementItem) {
                $reimbursementItem->updateCustomerPayment($validated['amount'], $validated['payment_date'], $validated['notes']);
                $linkedInvoiceReimbursementItem->updateItemPayment($validated['amount'], $validated['payment_date'], $validated['notes']);
                $this->syncReimbursementComponentFromItems($accountReceivable);
            }

            $accountReceivable->refresh();

            $componentLabel = $validated['item_type'] === 'main' ? 'Main Item' : 'Reimbursement Item';
            $customerName = $accountReceivable->customer?->company_name
                ?? $accountReceivable->customer_name
                ?? 'Customer';
            $invoiceNumber = $accountReceivable->invoice_number
                ?? $accountReceivable->reference_number
                ?? 'Opening Balance';

            \App\Models\BankTransaction::recordCustomerPayment(
                $validated['bank_account_id'],
                $validated['amount'],
                "Customer payment for {$componentLabel} {$invoiceNumber} from {$customerName}",
                $accountReceivable->id,
                $validated['payment_date']
            );
        });

        return redirect()->back()->with('success', 'Item payment recorded successfully');
    }

    private function syncMainComponentFromItems(AccountReceivable $accountReceivable): void
    {
        $component = $accountReceivable->components->firstWhere('component_type', 'main')
            ?? $accountReceivable->components->firstWhere('component_type', 'invoice_main');

        if (!$component) {
            return;
        }

        $invoice = $accountReceivable->invoice;
        if (!$invoice) {
            return;
        }

        $invoice->load('items');
        $items = $invoice->items->where('item_type', '!=', 'reimbursement');
        if ($items->isEmpty()) {
            return;
        }

        $totalAmount = $items->sum(function (InvoiceItem $item) {
            return $item->getLineTotal();
        });
        $totalPaid = $items->sum(function (InvoiceItem $item) {
            return (float) ($item->paid_amount ?? 0);
        });
        $outstanding = max(0, $totalAmount - $totalPaid);

        $component->amount = $totalAmount;
        $component->paid_amount = min($totalPaid, $totalAmount);
        $component->outstanding_amount = $outstanding;
        $component->status = $accountReceivable->resolveComponentStatus($component);
        $component->save();

        $accountReceivable->recalculateTotals(false);
    }

    private function syncReimbursementComponentFromItems(AccountReceivable $accountReceivable): void
    {
        $component = $accountReceivable->components->firstWhere('component_type', 'debit_note')
            ?? $accountReceivable->components->firstWhere('component_type', 'reimbursement');

        if (!$component) {
            return;
        }

        $invoice = $accountReceivable->invoice;
        if (!$invoice) {
            return;
        }

        $invoice->load('items');
        $items = $invoice->items
            ->filter(fn (InvoiceItem $item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
            ->groupBy(function (InvoiceItem $item) {
                return $this->resolveInvoiceReimbursementSourceKey($item);
            })
            ->map(function ($group) {
                return $group->sortByDesc(function (InvoiceItem $item) {
                    return (float) ($item->amount ?? $item->getLineTotal());
                })->first();
            })
            ->values();

        if ($items->isEmpty()) {
            $component->amount = 0;
            $component->paid_amount = 0;
            $component->outstanding_amount = 0;
            $component->status = 'outstanding';
            $component->save();
            $accountReceivable->recalculateTotals(false);
            return;
        }

        $totalAmount = $items->sum(function (InvoiceItem $item) {
            return (float) ($item->amount ?? $item->getLineTotal());
        });
        $totalPaid = $items->sum(function (InvoiceItem $item) {
            $lineTotal = (float) ($item->amount ?? $item->getLineTotal());
            return min($lineTotal, max(0, (float) ($item->paid_amount ?? 0)));
        });
        $outstanding = max(0, $totalAmount - $totalPaid);

        $component->amount = $totalAmount;
        $component->paid_amount = min($totalPaid, $totalAmount);
        $component->outstanding_amount = $outstanding;
        $component->status = $accountReceivable->resolveComponentStatus($component);
        $component->save();

        $accountReceivable->recalculateTotals(false);
    }

    private function resolveInvoiceReimbursementItems(AccountReceivable $accountReceivable, bool $includeModels = false)
    {
        $invoice = $accountReceivable->invoice;
        if (!$invoice) {
            return collect();
        }

        $invoice->loadMissing(['items.vendor']);
        $salesOrder = $accountReceivable->salesOrder;
        if ($salesOrder) {
            $salesOrder->loadMissing(['reimbursementItems.vendor']);
        }

        $reimbursementMap = $salesOrder
            ? $salesOrder->reimbursementItems->keyBy('id')
            : collect();

        $rows = $invoice->items
            ->filter(fn (InvoiceItem $item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
            ->values()
            ->map(function (InvoiceItem $item) use ($reimbursementMap, $includeModels) {
                $reimbursementId = $this->parseReimbursementIdFromItemRef($item->item_ref);
                /** @var ReimbursementItem|null $reimbursement */
                $reimbursement = $reimbursementId ? $reimbursementMap->get($reimbursementId) : null;

                $quantity = (float) ($item->quantity ?? 1);
                if ($quantity <= 0) {
                    $quantity = 1;
                }
                $lineTotal = (float) ($item->amount ?? ((float) ($item->rate ?? 0) * $quantity));
                $itemPaid = max(0, (float) ($item->paid_amount ?? 0));
                $itemOutstanding = $item->outstanding_amount !== null
                    ? max(0, (float) $item->outstanding_amount)
                    : max(0, $lineTotal - min($lineTotal, $itemPaid));

                $row = [
                    'id' => $reimbursement?->id ?? $item->id,
                    'description' => $reimbursement?->description ?? $item->description,
                    'quantity' => $quantity,
                    'unit' => $item->unit ?: ($reimbursement?->unit ?? null),
                    'unit_price' => (float) ($item->rate ?? ($quantity > 0 ? $lineTotal / $quantity : $lineTotal)),
                    'line_total' => $lineTotal,
                    'paid_amount' => $itemPaid,
                    'outstanding_amount' => $itemOutstanding,
                    'status' => $item->payment_status ?: ($reimbursement?->customer_payment_status ?? 'outstanding'),
                    'vendor' => $reimbursement?->vendor?->company_name
                        ?? $reimbursement?->vendor?->name
                        ?? $item->vendor?->company_name
                        ?? $item->vendor?->name,
                ];

                if ($includeModels) {
                    $row['invoice_item_model'] = $item;
                    $row['reimbursement_model'] = $reimbursement;
                }

                return $row;
            });

        if ($includeModels) {
            return $rows;
        }

        return $rows->map(function ($row) {
            unset($row['invoice_item_model'], $row['reimbursement_model']);
            return $row;
        })->values();
    }

    private function parseReimbursementIdFromItemRef(?string $itemRef): ?int
    {
        $value = strtolower(trim((string) $itemRef));
        if ($value === '') {
            return null;
        }

        if (preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $value, $matches)) {
            return (int) $matches[1];
        }

        return null;
    }

    private function resolveInvoiceReimbursementSourceKey(InvoiceItem $item): string
    {
        $reimbursementId = $this->parseReimbursementIdFromItemRef($item->item_ref);
        if ($reimbursementId) {
            return 'reimbursement_' . $reimbursementId;
        }

        return 'invoice_item_' . (int) $item->id;
    }

    /**
     * Generate SOA for a customer
     */
    public function generateSOA(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'date_from' => 'nullable|date',
            'date_to' => 'nullable|date',
            'include_paid' => 'nullable|boolean'
        ]);

        $query = AccountReceivable::where('customer_id', $customer->id);

        if ($validated['date_from'] ?? false) {
            $query->where('invoice_date', '>=', $validated['date_from']);
        }

        if ($validated['date_to'] ?? false) {
            $query->where('invoice_date', '<=', $validated['date_to']);
        }

        if (!($validated['include_paid'] ?? false)) {
            $query->whereIn('status', ['outstanding', 'partial', 'overdue']);
        }

        $receivables = $query->with(['invoice', 'salesOrder'])
            ->orderBy('invoice_date', 'asc')
            ->get();

        $summary = [
            'total_invoiced' => $receivables->sum('invoice_amount'),
            'total_paid' => $receivables->sum('paid_amount'),
            'total_outstanding' => $receivables->sum('outstanding_amount'),
            'oldest_invoice' => $receivables->where('status', '!=', 'paid')->min('invoice_date'),
            'count_overdue' => $receivables->where('status', 'overdue')->count()
        ];

        $pdf = Pdf::loadView('admin.admin-keuangan.account-receivables.soa', [
            'customer' => $customer,
            'receivables' => $receivables,
            'summary' => $summary,
            'date_from' => $validated['date_from'] ?? null,
            'date_to' => $validated['date_to'] ?? null,
            'generated_at' => now()
        ])
        ->setPaper('a4', 'portrait')
        ->setOptions([
            'defaultFont' => 'Arial',
            'isRemoteEnabled' => true,
            'isHtml5ParserEnabled' => true
        ]);

        $fileName = 'SOA_' . str_replace(' ', '_', $customer->company_name) . '_' . now()->format('Y-m-d') . '.pdf';

        return $pdf->download($fileName);
    }

    /**
     * Bulk update overdue status
     */
    public function updateOverdueStatus()
    {
        $updated = 0;
        AccountReceivable::whereIn('status', ['outstanding', 'partial'])
            ->chunk(100, function ($receivables) use (&$updated) {
                foreach ($receivables as $receivable) {
                    $receivable->updateOverdueStatus();
                    $updated++;
                }
            });

        return response()->json(['message' => "Updated {$updated} receivables"]);
    }

    /**
     * Normalize Indonesian number format to standard format
     * Examples: 2.500 -> 2500, 2.500,50 -> 2500.50, 2500,50 -> 2500.50, 45.67 -> 45.67
     */
    private function normalizeIndonesianNumber($value)
    {
        if ($value === null || $value === '') {
            return $value;
        }

        if (is_int($value) || is_float($value)) {
            return (string) $value;
        }

        $value = str_replace(' ', '', trim((string) $value));
        $hasDot = strpos($value, '.') !== false;
        $hasComma = strpos($value, ',') !== false;

        if ($hasDot && $hasComma) {
            $lastDot = strrpos($value, '.');
            $lastComma = strrpos($value, ',');

            // Indonesian style: 1.234,56
            if ($lastComma > $lastDot) {
                return str_replace(',', '.', str_replace('.', '', $value));
            } else {
                // International style: 1,234.56
                return str_replace(',', '', $value);
            }
        }

        if ($hasComma) {
            $parts = explode(',', $value);
            if (count($parts) === 2 && strlen($parts[1]) <= 2) {
                return str_replace(',', '.', $value);
            }

            return str_replace(',', '', $value);
        }

        if ($hasDot) {
            $parts = explode('.', $value);

            if (count($parts) === 2) {
                $leftPart = $parts[0];
                $rightPart = $parts[1];

                if (strlen($rightPart) <= 2) {
                    return $value;
                }

                if (strlen($rightPart) === 3 && strlen($leftPart) <= 3) {
                    return str_replace('.', '', $value);
                }

                return $value;
            }

            $isThousandGrouping = true;
            for ($i = 1; $i < count($parts); $i++) {
                if (strlen($parts[$i]) !== 3) {
                    $isThousandGrouping = false;
                    break;
                }
            }

            return $isThousandGrouping ? str_replace('.', '', $value) : $value;
        }

        return $value;
    }

    /**
     * Get receivables by customer for SOA preview
     */
    public function getByCustomer(Customer $customer)
    {
        $receivables = AccountReceivable::where('customer_id', $customer->id)
            ->whereIn('status', ['outstanding', 'partial', 'overdue'])
            ->with(['invoice', 'salesOrder'])
            ->orderBy('invoice_date', 'desc')
            ->get();

        return response()->json($receivables);
    }

    /**
     * Export receivables to Excel/CSV
     */
    public function export(Request $request)
    {
        // This can be implemented later with Laravel Excel
        return response()->json(['message' => 'Export feature coming soon']);
    }
}
