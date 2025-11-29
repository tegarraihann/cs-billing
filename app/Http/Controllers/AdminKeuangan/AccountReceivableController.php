<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\AccountReceivable;
use App\Models\Customer;
use App\Models\BankAccount;
use App\Models\ChartOfAccount;
use App\Models\FinancialPositionAdjustment;
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
        $query = AccountReceivable::with(['customer', 'invoice', 'salesOrder'])
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

        $receivables = $query->paginate(15);

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
        $accountReceivable->load(['customer', 'invoice', 'salesOrder', 'creator']);
        $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
        $accountReceivable->load('components');
        $bankAccounts = \App\Models\BankAccount::all();

        return Inertia::render('Admin/AdminKeuangan/AccountReceivables/Show', [
            'receivable' => $accountReceivable,
            'bankAccounts' => $bankAccounts
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

        if ($accountReceivable->outstanding_amount <= 0) {
            return redirect()->back()->withErrors(['error' => 'Tidak ada outstanding yang dapat diposting ke VAT Payable.']);
        }

        $accountId = ChartOfAccount::idByCode('2110') ?: ChartOfAccount::idByCode('2111');
        if (!$accountId) {
            return redirect()->back()->withErrors(['error' => 'Akun VAT Payable (2110/2111) belum dikonfigurasi.']);
        }

        $amount = (float) $accountReceivable->outstanding_amount;
        $now = now();

        DB::transaction(function () use ($accountReceivable, $amount, $accountId, $now) {
            FinancialPositionAdjustment::create([
                'account_id' => $accountId,
                'effective_date' => $now->toDateString(),
                'amount' => $amount,
                'notes' => 'Post VAT Payable dari AR ' . $accountReceivable->invoice_number,
                'created_by' => auth()->id(),
            ]);

            // Tutup semua komponen/outstanding AR
            $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
            $accountReceivable->load('components');

            $remaining = $amount;
            $components = $accountReceivable->components;

            if ($components->isEmpty()) {
                $accountReceivable->recordPayment(
                    $remaining,
                    'Posted to VAT Payable',
                    null,
                    Carbon::parse($now)
                );
            } else {
                foreach ($components as $component) {
                    $out = (float) $component->outstanding_amount;
                    if ($out <= 0 || $remaining <= 0) {
                        continue;
                    }
                    $pay = min($out, $remaining);
                    $accountReceivable->recordPayment(
                        $pay,
                        'Posted to VAT Payable',
                        $component,
                        Carbon::parse($now)
                    );
                    $remaining -= $pay;
                }
            }
        });

        return redirect()->back()->with('success', 'Outstanding diposting ke VAT Payable dan piutang ditutup.');
    }

    /**
     * Record a payment for account receivable
     */
    public function recordPayment(Request $request, AccountReceivable $accountReceivable)
    {
        $accountReceivable->syncComponentsFromInvoice($accountReceivable->invoice);
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
            return redirect()->back()->withErrors([
                'amount' => 'Amount cannot exceed outstanding balance for ' . ($component->component_type === 'debit_note' ? 'Debit Note' : 'Invoice Main') . ' (Rp ' . number_format($component->outstanding_amount, 0, ',', '.') . ')'
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
                throw new \Exception('Failed to record payment');
            }

            $componentLabel = $component
                ? ($component->component_type === 'debit_note' ? 'Debit Note' : 'Invoice Main')
                : 'Invoice';

            // Record bank transaction (Customer Payment = Credit to bank)
            \App\Models\BankTransaction::recordCustomerPayment(
                $validated['bank_account_id'],
                $validated['amount'],
                "Customer payment for {$componentLabel} {$accountReceivable->invoice_number} from {$accountReceivable->customer->company_name}",
                $accountReceivable->id,
                $validated['payment_date']
            );

            // Update related invoice status if fully paid
            if ($accountReceivable->status === 'paid') {
                $accountReceivable->invoice->update([
                    'status' => 'paid',
                    'paid_date' => now(),
                    'paid_amount' => $accountReceivable->invoice_amount
                ]);
            }
        });

        return redirect()->back()->with('success', 'Payment recorded successfully');
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
     * Examples: 2.500 -> 2500, 2.500,50 -> 2500.50, 2500,50 -> 2500.50
     */
    private function normalizeIndonesianNumber($value)
    {
        if (!$value) {
            return $value;
        }

        $value = trim($value);

        // Handle Indonesian format
        if (strpos($value, '.') !== false && strpos($value, ',') !== false) {
            // Format: 2.500,50 (dot = thousand separator, comma = decimal)
            $value = str_replace('.', '', $value);
            $value = str_replace(',', '.', $value);
        } elseif (strpos($value, '.') !== false && strpos($value, ',') === false) {
            // Could be: 2.500 (thousand) or 2500.50 (decimal)
            $parts = explode('.', $value);
            if (count($parts) === 2) {
                $decimalPart = $parts[1];
                // If decimal part has 3+ digits or is > 99, treat as thousand separator
                if (strlen($decimalPart) >= 3 || intval($decimalPart) >= 100 || strlen($parts[0]) >= 2) {
                    // Likely thousand separator: 2.500 or 12.500
                    $value = str_replace('.', '', $value);
                }
                // Otherwise keep as decimal: 25.50
            } else {
                // Multiple dots, treat as thousand separators: 1.000.500
                $value = str_replace('.', '', $value);
            }
        } elseif (strpos($value, ',') !== false) {
            // Format: 2500,50 (comma as decimal)
            $value = str_replace(',', '.', $value);
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
