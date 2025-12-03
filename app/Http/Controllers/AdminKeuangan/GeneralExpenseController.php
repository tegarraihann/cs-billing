<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GeneralExpense;
use App\Models\GeneralExpenseItem;
use App\Models\OperationalCostCategory;
use App\Models\BankAccount;
use App\Models\BankTransaction;
use Illuminate\Support\Facades\DB;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use Carbon\Carbon;
use Illuminate\Validation\Rule;
use App\Models\ChartOfAccount;

class GeneralExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = GeneralExpense::with(['items', 'creator', 'approver'])
            ->orderBy('expense_date', 'desc')
            ->orderBy('created_at', 'desc');

        // Normalise requested period (accepts month-year string or separate month/year params)
        $filterMonth = null;
        $filterYear = null;
        if ($request->filled('period')) {
            try {
                $period = Carbon::createFromFormat('Y-m', $request->period);
                $filterMonth = $period->month;
                $filterYear = $period->year;
            } catch (\Exception $e) {
                // ignore invalid period, fall back to other filters
            }
        }
        if ($request->filled('month') && $request->filled('year')) {
            $filterMonth = $request->month;
            $filterYear = $request->year;
        }

        // Filter by period
        if ($filterMonth && $filterYear) {
            $query->byPeriod($filterMonth, $filterYear);
        }

        // Filter by exact expense date
        if ($request->filled('expense_date')) {
            $query->whereDate('expense_date', $request->expense_date);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $expenses = $query->paginate(15)->withQueryString();

        // Get summary data
        $currentMonth = now()->month;
        $currentYear = now()->year;

        // Calculate statistics for the component
        $stats = [
            'current_month_total' => GeneralExpense::byPeriod($currentMonth, $currentYear)->sum('total_amount'),
            'current_year_total' => GeneralExpense::where('period_year', $currentYear)->sum('total_amount'),
            'draft_count' => GeneralExpense::where('status', 'draft')->count(),
            'approved_count' => GeneralExpense::where('status', 'approved')->count(),
        ];

        $summary = GeneralExpense::byPeriod($currentMonth, $currentYear)
            ->selectRaw('category, SUM(total_amount) as total')
            ->groupBy('category')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Index', [
            'expenses' => $expenses,
            'stats' => $stats,
            'summary' => $summary,
            'filters' => $request->only(['month', 'year', 'category', 'status', 'period', 'expense_date']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = OperationalCostCategory::active()
            ->orderBy('name')
            ->pluck('name')
            ->values();
        $expenseAccounts = ChartOfAccount::where('account_type', 'expense')
            ->orderBy('account_code')
            ->get(['id', 'account_code', 'account_name']);

        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Create', [
            'categories' => $categories,
            'bankAccounts' => BankAccount::active()->orderBy('bank_name')->get(['id', 'bank_name', 'account_number', 'account_name']),
            'expenseAccounts' => $expenseAccounts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'expense_date' => 'required|date',
            'category' => [
                'required',
                'string',
                'max:255',
                Rule::exists('operational_cost_categories', 'name')->where('is_active', true),
            ],
            'status' => 'required|in:draft,approved',
            'notes' => 'nullable|string',
            'bank_account_id' => ['nullable', 'required_if:status,approved', 'exists:bank_accounts,id'],
            'pl_account_id' => ['required', 'exists:chart_of_accounts,id'],
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string|max:255',
            'items.*.amount' => 'required|numeric|min:0.01',
            'items.*.notes' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($validated) {
                $totalAmount = collect($validated['items'])->sum(function ($item) {
                    return (float) $item['amount'];
                });

                $approverData = [];
                if ($validated['status'] === 'approved') {
                    $approverData = [
                        'approved_by' => auth()->id(),
                        'approved_at' => now(),
                    ];
                }

                // Create general expense
                $expense = GeneralExpense::create([
                    'expense_date' => $validated['expense_date'],
                    'category' => $validated['category'],
                    'status' => $validated['status'],
                    'notes' => $validated['notes'] ?? null,
                    'total_amount' => $totalAmount,
                    'pl_account_id' => $validated['pl_account_id'],
                    'created_by' => auth()->id(),
                ] + $approverData);

                // Create items
                foreach ($validated['items'] as $itemData) {
                    GeneralExpenseItem::create([
                        'expense_id' => $expense->id,
                        'description' => $itemData['description'],
                        'amount' => $itemData['amount'],
                        'notes' => $itemData['notes'] ?? null,
                    ]);
                }

                // Ensure persisted total amount reflects latest item sum
                $expense->update(['total_amount' => $totalAmount]);

                // Jika approved, catat transaksi bank (debit)
                if ($validated['status'] === 'approved' && !empty($validated['bank_account_id'])) {
                    BankTransaction::create([
                        'bank_account_id' => $validated['bank_account_id'],
                        'transaction_date' => $validated['expense_date'],
                        'transaction_type' => 'debit',
                        'amount' => $totalAmount,
                        'description' => 'General expense: ' . $validated['category'],
                        'reference_type' => 'general_expense',
                        'reference_id' => $expense->id,
                        'created_by' => auth()->id(),
                    ]);
                }

                // Buat entri laba rugi untuk general expense (approved)
                if ($validated['status'] === 'approved') {
                    $this->createProfitLossEntries($expense);
                }
            });

            return redirect()->route('admin-keuangan.general-expenses.index')
                ->with('success', 'General expense berhasil dibuat.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal membuat general expense: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GeneralExpense $generalExpense)
    {
        $generalExpense->load(['items', 'creator', 'approver']);

        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Show', [
            'generalExpense' => $generalExpense,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeneralExpense $generalExpense)
    {
        $generalExpense->load('items');

        $categories = OperationalCostCategory::orderBy('name')
            ->pluck('name')
            ->unique()
            ->values();

        if ($generalExpense->category && !$categories->contains($generalExpense->category)) {
            $categories = $categories->push($generalExpense->category)->unique()->sort()->values();
        }

        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Edit', [
            'expense' => $generalExpense,
            'generalExpense' => $generalExpense,
            'categories' => $categories,
            'bankAccounts' => BankAccount::active()->orderBy('bank_name')->get(['id', 'bank_name', 'account_number', 'account_name']),
            'expenseAccounts' => ChartOfAccount::where('account_type', 'expense')
                ->orderBy('account_code')
                ->get(['id', 'account_code', 'account_name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GeneralExpense $generalExpense)
    {
        // Only allow editing if still draft
        if ($generalExpense->isApproved()) {
            return back()->withErrors(['error' => 'Cannot edit approved expense.']);
        }

        $validated = $request->validate([
            'expense_date' => 'required|date',
            'category' => [
                'required',
                'string',
                'max:255',
                Rule::exists('operational_cost_categories', 'name')->where(function ($query) use ($generalExpense) {
                    $query->where('is_active', true)
                        ->orWhere('name', $generalExpense->category);
                }),
            ],
            'status' => 'required|in:draft,approved',
            'notes' => 'nullable|string',
            'bank_account_id' => ['nullable', 'required_if:status,approved', 'exists:bank_accounts,id'],
            'pl_account_id' => ['required', 'exists:chart_of_accounts,id'],
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string|max:255',
            'items.*.amount' => 'required|numeric|min:0.01',
            'items.*.notes' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($validated, $generalExpense) {
                // Update general expense
                $generalExpense->update([
                    'expense_date' => $validated['expense_date'],
                    'category' => $validated['category'],
                    'status' => $validated['status'],
                    'notes' => $validated['notes'] ?? null,
                    'pl_account_id' => $validated['pl_account_id'],
                    'approved_by' => $validated['status'] === 'approved' ? auth()->id() : null,
                    'approved_at' => $validated['status'] === 'approved' ? now() : null,
                ]);

                // Delete existing items
                $generalExpense->items()->delete();

                // Create new items
                foreach ($validated['items'] as $itemData) {
                    GeneralExpenseItem::create([
                        'expense_id' => $generalExpense->id,
                        'description' => $itemData['description'],
                        'amount' => $itemData['amount'],
                        'notes' => $itemData['notes'] ?? null,
                    ]);
                }

                $totalAmount = collect($validated['items'])->sum(function ($item) {
                    return (float) $item['amount'];
                });
                $generalExpense->update(['total_amount' => $totalAmount]);

                // Sinkron transaksi bank
                $bankTx = BankTransaction::where('reference_type', 'general_expense')
                    ->where('reference_id', $generalExpense->id)
                    ->first();

                if ($validated['status'] === 'approved') {
                    if ($bankTx) {
                        $bankTx->update([
                            'bank_account_id' => $validated['bank_account_id'],
                            'transaction_date' => $validated['expense_date'],
                            'transaction_type' => 'debit',
                            'amount' => $totalAmount,
                            'description' => 'General expense: ' . $validated['category'],
                        ]);
                    } else {
                        BankTransaction::create([
                            'bank_account_id' => $validated['bank_account_id'],
                            'transaction_date' => $validated['expense_date'],
                            'transaction_type' => 'debit',
                            'amount' => $totalAmount,
                            'description' => 'General expense: ' . $validated['category'],
                            'reference_type' => 'general_expense',
                            'reference_id' => $generalExpense->id,
                            'created_by' => auth()->id(),
                        ]);
                    }
                } elseif ($bankTx) {
                    $bankTx->delete();
                }

                // Buat entri laba rugi jika approved
                if ($validated['status'] === 'approved') {
                    $this->createProfitLossEntries($generalExpense);
                }
            });

            return redirect()->route('admin-keuangan.general-expenses.index')
                ->with('success', 'General expense berhasil diupdate.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengupdate general expense: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeneralExpense $generalExpense)
    {
        // Only allow deleting if still draft
        if ($generalExpense->isApproved()) {
            return back()->withErrors(['error' => 'Cannot delete approved expense.']);
        }

        try {
            // Hapus transaksi bank jika ada (harusnya tidak ada untuk draft)
            BankTransaction::where('reference_type', 'general_expense')
                ->where('reference_id', $generalExpense->id)
                ->delete();

            $generalExpense->delete();

            return redirect()->route('admin-keuangan.general-expenses.index')
                ->with('success', 'General expense berhasil dihapus.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus general expense: ' . $e->getMessage()]);
        }
    }

    /**
     * Approve expense
     */
    public function approve(GeneralExpense $generalExpense)
    {
        if ($generalExpense->isApproved()) {
            return back()->withErrors(['error' => 'Expense already approved.']);
        }

        $generalExpense->approve();

        // Catat entri laba rugi saat approve
        $this->createProfitLossEntries($generalExpense);

        // Catat transaksi bank saat approve jika belum ada
        $bankTx = BankTransaction::where('reference_type', 'general_expense')
            ->where('reference_id', $generalExpense->id)
            ->first();

        if (!$bankTx) {
            // Default ke bank aktif pertama jika tidak disediakan, untuk menghindari gagal; bisa diedit setelahnya
            $bankAccountId = BankAccount::active()->orderBy('bank_name')->value('id');
            if ($bankAccountId) {
                BankTransaction::create([
                    'bank_account_id' => $bankAccountId,
                    'transaction_date' => $generalExpense->expense_date,
                    'transaction_type' => 'debit',
                    'amount' => $generalExpense->total_amount,
                    'description' => 'General expense: ' . $generalExpense->category,
                    'reference_type' => 'general_expense',
                    'reference_id' => $generalExpense->id,
                    'created_by' => auth()->id(),
                ]);
            }
        }

        return back()->with('success', 'General expense berhasil disetujui.');
    }

    /**
     * Export to Excel
     */
    public function export(Request $request)
    {
        $month = null;
        $year = null;

        if ($request->filled('period')) {
            try {
                $period = Carbon::createFromFormat('Y-m', $request->period);
                $month = $period->month;
                $year = $period->year;
            } catch (\Exception $e) {
                // ignore invalid input, fall back to month/year params
            }
        }

        $month = $month ?? $request->month ?? now()->month;
        $year = $year ?? $request->year ?? now()->year;

        $expenses = GeneralExpense::with('items')
            ->byPeriod($month, $year)
            ->orderBy('category')
            ->orderBy('expense_date')
            ->get();

        // Generate Excel export logic here
        // For now, return JSON data
        return response()->json([
            'period' => Carbon::create($year, $month)->format('F Y'),
            'data' => $expenses
        ]);
    }

    /**
     * Create P&L entries for general expense on active periods
     */
    private function createProfitLossEntries(GeneralExpense $expense): void
    {
        $txnDate = Carbon::parse($expense->expense_date)->toDateString();

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

        foreach ($periods as $period) {
            $entry = ProfitLossEntry::createFromGeneralExpense($expense, $period->id, auth()->id());
            if ($entry) {
                $period->calculateTotals();
            }
        }
    }
}
