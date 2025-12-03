<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\OtherIncome;
use App\Models\OtherIncomePayment;
use App\Models\Customer;
use App\Models\OperationalCostCategory;
use App\Models\BankAccount;
use App\Models\BankTransaction;
use App\Models\ProfitLossPeriod;
use App\Models\ProfitLossEntry;
use App\Models\ChartOfAccount;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class OtherIncomeController extends Controller
{
    public function index(Request $request)
    {
        $query = OtherIncome::with(['creator', 'approver', 'customer'])
            ->orderByDesc('transaction_date')
            ->orderByDesc('created_at');

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('transaction_date', [$request->start_date, $request->end_date]);
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('customer_id')) {
            $query->where('customer_id', $request->customer_id);
        }

        if ($request->filled('posted')) {
            if ($request->posted === 'yes') {
                $query->where('posted_to_profit_loss', true);
            } elseif ($request->posted === 'no') {
                $query->where('posted_to_profit_loss', false);
            }
        }

        $otherIncomes = $query->paginate(15)->withQueryString();

        $summary = [
            'total_amount' => OtherIncome::sum('amount'),
            'total_outstanding' => OtherIncome::whereIn('status', [
                OtherIncome::STATUS_OUTSTANDING,
                OtherIncome::STATUS_PARTIAL,
            ])->sum('outstanding_amount'),
            'overdue_count' => OtherIncome::whereIn('status', [
                OtherIncome::STATUS_OUTSTANDING,
                OtherIncome::STATUS_PARTIAL,
            ])
                ->whereNotNull('due_date')
                ->where('due_date', '<', now()->toDateString())
                ->count(),
        ];

        $masterCategories = OperationalCostCategory::orderBy('name')->pluck('name');
        $existingCategories = OtherIncome::select('category')->distinct()->pluck('category');
        $categories = $masterCategories
            ->merge($existingCategories)
            ->filter()
            ->unique()
            ->sort()
            ->values();

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Index', [
            'otherIncomes' => $otherIncomes,
            'summary' => $summary,
            'categories' => $categories,
            'customers' => Customer::select('id', 'company_name')->orderBy('company_name')->get(),
            'statusOptions' => [
                OtherIncome::STATUS_OUTSTANDING,
                OtherIncome::STATUS_PARTIAL,
                OtherIncome::STATUS_PAID,
            ],
            'filters' => $request->only(['start_date', 'end_date', 'category', 'posted', 'status', 'customer_id']),
        ]);
    }

    public function create()
    {
        $categories = OperationalCostCategory::orderBy('name')
            ->pluck('name')
            ->values();
        $revenueAccounts = ChartOfAccount::where('account_type', 'revenue')
            ->orderBy('account_code')
            ->get(['id', 'account_code', 'account_name']);

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Create', [
            'categories' => $categories,
            'customers' => Customer::select('id', 'company_name')->orderBy('company_name')->get(),
            'bankAccounts' => BankAccount::active()->orderBy('bank_name')->get(['id', 'bank_name', 'account_number', 'account_name']),
            'revenueAccounts' => $revenueAccounts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateForm($request);

        DB::transaction(function () use ($request, $validated) {
            $receiptFile = null;
            if ($request->hasFile('receipt_file')) {
                $receiptFile = $request->file('receipt_file')->store('other-income-receipts', 'public');
            }

            $customerName = $validated['customer_name']
                ?? optional(Customer::find($validated['customer_id'] ?? null))->company_name;

            $otherIncome = OtherIncome::create([
                'reference_number' => $validated['reference_number'] ?? null,
                'customer_id' => $validated['customer_id'] ?? null,
                'customer_name' => $customerName,
                'transaction_date' => $validated['transaction_date'],
                'due_date' => $validated['due_date'] ?? null,
                'category' => $validated['category'],
                'description' => $validated['description'],
                'amount' => $validated['amount'],
                'pl_account_id' => $validated['pl_account_id'],
                'notes' => $validated['notes'] ?? null,
                'receipt_file' => $receiptFile,
                'created_by' => Auth::id(),
            ]);

            // Catat transaksi bank (credit) saat input pendapatan lain-lain
            BankTransaction::create([
                'bank_account_id' => $validated['bank_account_id'],
                'transaction_date' => $validated['transaction_date'],
                'transaction_type' => 'credit',
                'amount' => $validated['amount'],
                'description' => 'Other income: ' . $validated['description'],
                'reference_type' => 'other_income_direct',
                'reference_id' => $otherIncome->id,
                'created_by' => Auth::id(),
            ]);
        });

        return redirect()->route('admin-keuangan.other-incomes.index')
            ->with('success', 'Pendapatan lain-lain berhasil ditambahkan.');
    }

    public function show(OtherIncome $otherIncome)
    {
        $otherIncome->load(['creator', 'approver', 'customer', 'payments.creator', 'payments.bankAccount']);

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Show', [
            'otherIncome' => $otherIncome,
            'bankAccounts' => BankAccount::active()->get(['id', 'bank_name', 'account_number', 'account_name']),
            'statusOptions' => [
                OtherIncome::STATUS_OUTSTANDING,
                OtherIncome::STATUS_PARTIAL,
                OtherIncome::STATUS_PAID,
            ],
        ]);
    }

    public function edit(OtherIncome $otherIncome)
    {
        $categories = OperationalCostCategory::orderBy('name')
            ->pluck('name')
            ->values();
        $linkedBankAccountId = BankTransaction::where('reference_type', 'other_income_direct')
            ->where('reference_id', $otherIncome->id)
            ->value('bank_account_id');

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Edit', [
            'otherIncome' => $otherIncome,
            'categories' => $categories,
            'customers' => Customer::select('id', 'company_name')->orderBy('company_name')->get(),
            'bankAccounts' => BankAccount::active()->orderBy('bank_name')->get(['id', 'bank_name', 'account_number', 'account_name']),
            'linkedBankAccountId' => $linkedBankAccountId,
            'revenueAccounts' => ChartOfAccount::where('account_type', 'revenue')
                ->orderBy('account_code')
                ->get(['id', 'account_code', 'account_name']),
        ]);
    }

    public function update(Request $request, OtherIncome $otherIncome)
    {
        if ($otherIncome->posted_to_profit_loss) {
            return back()->withErrors([
                'error' => 'Tidak dapat mengedit pendapatan yang sudah diposting ke laba rugi.',
            ]);
        }

        $validated = $this->validateForm($request, $otherIncome);

        DB::transaction(function () use ($request, $validated, $otherIncome) {
            $receiptFile = $otherIncome->receipt_file;
            if ($request->hasFile('receipt_file')) {
                if ($receiptFile) {
                    Storage::disk('public')->delete($receiptFile);
                }
                $receiptFile = $request->file('receipt_file')->store('other-income-receipts', 'public');
            }

            $customerName = $validated['customer_name']
                ?? optional(Customer::find($validated['customer_id'] ?? null))->company_name
                ?? $otherIncome->customer_name;

            $otherIncome->update([
                'reference_number' => $validated['reference_number'] ?? null,
                'customer_id' => $validated['customer_id'] ?? null,
                'customer_name' => $customerName,
                'transaction_date' => $validated['transaction_date'],
                'due_date' => $validated['due_date'] ?? null,
                'category' => $validated['category'],
                'description' => $validated['description'],
                'amount' => $validated['amount'],
                'pl_account_id' => $validated['pl_account_id'],
                'notes' => $validated['notes'] ?? null,
                'receipt_file' => $receiptFile,
            ]);

            $otherIncome->recalculateStatus();

            // Sinkronisasi transaksi bank (credit)
            $bankTx = BankTransaction::where('reference_type', 'other_income_direct')
                ->where('reference_id', $otherIncome->id)
                ->first();

            if ($bankTx) {
                $bankTx->update([
                    'bank_account_id' => $validated['bank_account_id'],
                    'transaction_date' => $validated['transaction_date'],
                    'amount' => $validated['amount'],
                    'description' => 'Other income: ' . $validated['description'],
                ]);
            } else {
                BankTransaction::create([
                    'bank_account_id' => $validated['bank_account_id'],
                    'transaction_date' => $validated['transaction_date'],
                    'transaction_type' => 'credit',
                    'amount' => $validated['amount'],
                    'description' => 'Other income: ' . $validated['description'],
                    'reference_type' => 'other_income_direct',
                    'reference_id' => $otherIncome->id,
                    'created_by' => Auth::id(),
                ]);
            }
        });

        return redirect()->route('admin-keuangan.other-incomes.show', $otherIncome->id)
            ->with('success', 'Pendapatan lain-lain berhasil diperbarui.');
    }

    public function recordPayment(Request $request, OtherIncome $otherIncome)
    {
        $validated = $request->validate([
            'payment_date' => ['required', 'date'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'payment_method' => ['required', Rule::in(['bank', 'petty_cash'])],
            'bank_account_id' => ['nullable', 'required_if:payment_method,bank', 'exists:bank_accounts,id'],
            'adjustment_amount' => ['nullable', 'numeric', 'min:0'],
            'adjustment_type' => ['nullable', Rule::in(['tax_expense', 'other_expense'])],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $adjustment = $validated['adjustment_amount'] ?? 0;
        $totalImpact = $validated['amount'] + $adjustment;

        if ($totalImpact - 0.01 > $otherIncome->outstanding_amount) {
            return back()->withErrors([
                'amount' => 'Total pembayaran melebihi outstanding.',
            ]);
        }

        DB::transaction(function () use ($validated, $otherIncome, $adjustment) {
            $payment = $otherIncome->recordPayment([
                'payment_date' => $validated['payment_date'],
                'payment_method' => $validated['payment_method'],
                'bank_account_id' => $validated['bank_account_id'] ?? null,
                'amount' => $validated['amount'],
                'adjustment_amount' => $adjustment,
                'adjustment_type' => $validated['adjustment_type'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'created_by' => Auth::id(),
            ]);

            if ($payment->payment_method === 'bank' && $payment->bank_account_id) {
                BankTransaction::create([
                    'bank_account_id' => $payment->bank_account_id,
                    'transaction_date' => $payment->payment_date,
                    'transaction_type' => 'credit',
                    'amount' => $payment->amount,
                    'description' => "Other income receipt {$otherIncome->reference_number}",
                    'reference_type' => 'other_income',
                    'reference_id' => $otherIncome->id,
                    'created_by' => Auth::id(),
                ]);
            }

            // Jika status sudah paid dan belum ada entry P&L, buatkan
            if ($otherIncome->posted_to_profit_loss) {
                $this->createProfitLossEntries($otherIncome);
            }
        });

        return back()->with('success', 'Pembayaran piutang berhasil dicatat.');
    }

    public function destroy(OtherIncome $otherIncome)
    {
        if ($otherIncome->posted_to_profit_loss) {
            return redirect()->back()
                ->withErrors(['error' => 'Tidak dapat menghapus pendapatan yang sudah diposting ke laba rugi.']);
        }

        DB::transaction(function () use ($otherIncome) {
            // Hapus transaksi bank direct (bukan payment) jika ada
            BankTransaction::where('reference_type', 'other_income_direct')
                ->where('reference_id', $otherIncome->id)
                ->delete();

            $otherIncome->payments()->delete();
            $otherIncome->delete();
        });

        return redirect()->route('admin-keuangan.other-incomes.index')
            ->with('success', 'Pendapatan lain-lain berhasil dihapus.');
    }

    public function postToProfitLoss(OtherIncome $otherIncome)
    {
        try {
            $otherIncome->postToProfitLoss(Auth::id());

            $createdEntries = $this->createProfitLossEntries($otherIncome);
            if ($createdEntries === 0) {
                return redirect()->back()
                    ->withErrors(['error' => 'Tidak ada periode laba rugi yang cocok. Pastikan ada periode aktif yang mencakup tanggal transaksi.']);
            }

            return redirect()->back()
                ->with('success', 'Pendapatan berhasil diposting ke laba rugi.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function unpostFromProfitLoss(OtherIncome $otherIncome)
    {
        try {
            $otherIncome->unpostFromProfitLoss();

            return redirect()->back()
                ->with('success', 'Pendapatan berhasil di-unpost dari laba rugi.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    public function summaryByCategory(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());

        $summary = OtherIncome::selectRaw('category, SUM(amount) as total, COUNT(*) as count')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->groupBy('category')
            ->get();

        return response()->json([
            'summary' => $summary,
            'date_range' => [
                'start' => $startDate,
                'end' => $endDate,
            ],
        ]);
    }

    private function validateForm(Request $request, ?OtherIncome $otherIncome = null): array
    {
        return $request->validate([
            'reference_number' => ['nullable', 'string', 'max:100'],
            'customer_id' => ['nullable', 'exists:customers,id'],
            'customer_name' => ['nullable', 'string', 'max:255'],
            'transaction_date' => 'required|date',
            'due_date' => 'nullable|date|after_or_equal:transaction_date',
            'category' => [
                'required',
                'string',
                'max:255',
                Rule::exists('operational_cost_categories', 'name')
                    ->where(fn ($query) => $query->where('is_active', true)),
            ],
            'description' => 'required|string|max:500',
            'amount' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string|max:1000',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
            'bank_account_id' => ['required', 'exists:bank_accounts,id'],
            'pl_account_id' => ['required', 'exists:chart_of_accounts,id'],
        ]);
    }

    /**
     * Buatkan entri laba rugi untuk Other Income di periode yang relevan
     */
    private function createProfitLossEntries(OtherIncome $otherIncome): int
    {
        $txnDate = Carbon::parse($otherIncome->transaction_date)->toDateString();
        $createdEntries = 0;

        // Cari periode non-closed yang mencakup tanggal transaksi
        $periods = ProfitLossPeriod::where('status', '!=', 'closed')
            ->where('start_date', '<=', $txnDate)
            ->where('end_date', '>=', $txnDate)
            ->get();

        // Fallback: periode yang mencakup bulan transaksi
        if ($periods->isEmpty()) {
            $monthStart = Carbon::parse($txnDate)->startOfMonth()->toDateString();
            $monthEnd = Carbon::parse($txnDate)->endOfMonth()->toDateString();
            $periods = ProfitLossPeriod::where('status', '!=', 'closed')
                ->where('start_date', '<=', $monthStart)
                ->where('end_date', '>=', $monthEnd)
                ->get();
        }

        // Fallback: periode non-closed terbaru
        if ($periods->isEmpty()) {
            $fallback = ProfitLossPeriod::where('status', '!=', 'closed')
                ->orderBy('end_date', 'desc')
                ->first();
            if ($fallback) {
                $periods = collect([$fallback]);
            }
        }

        foreach ($periods as $period) {
            $entry = ProfitLossEntry::createFromOtherIncome($otherIncome, $period->id, Auth::id());
            if ($entry) {
                $createdEntries++;
            }
        }

        if ($createdEntries > 0) {
            // Recalculate for affected periods only once at the end
            $periods->each->calculateTotals();
        }

        return $createdEntries;
    }
}
