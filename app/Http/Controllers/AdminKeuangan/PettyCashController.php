<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PettyCashTransaction;
use App\Models\PettyCashCategory;
use App\Models\PettyCashBalance;
use App\Models\BankAccount;
use App\Models\BankTransaction;
use App\Models\ChartOfAccount;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class PettyCashController extends Controller
{
    /**
     * PETTY CASH CONCEPT:
     *
     * Petty Cash is ONLY for daily cash expenses that are:
     * 1. Paid with CASH (not bank transfer)
     * 2. For general office/operational needs (NOT tied to specific shipments/SOs)
     * 3. Usually small amounts (office supplies, utilities, courier, etc.)
     *
     * Examples of CORRECT Petty Cash usage:
     * - Office supplies (stationery, paper, etc.)
     * - Daily office needs (water, snacks, cleaning supplies)
     * - Small courier fees for documents (not related to SO)
     * - Office utilities (electricity, internet - if paid cash)
     * - Transportation for office errands
     *
     * Examples of INCORRECT Petty Cash usage:
     * - Operational costs tied to specific SOs (trucking, customs, etc.)
     * - Vendor payments for shipments
     * - Reimbursements for customer shipments
     * - Large payments that should go through bank transfer
     *
     * For shipment-related costs, use:
     * - Invoice operational_cost items
     * - Account Payables
     * - Profit/Loss tracking
     */

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PettyCashTransaction::with(['category', 'user'])
            ->orderBy('transaction_date', 'desc')
            ->orderBy('created_at', 'desc');

        // Filter by date range
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('transaction_date', [
                $request->start_date,
                $request->end_date
            ]);
        }

        // Filter by category
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by type
        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $transactions = $query->paginate(5)->withQueryString();
        $categories = PettyCashCategory::active()->ordered()->get();
        $currentBalance = PettyCashBalance::getCurrentBalance();

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Index', [
            'transactions' => $transactions,
            'categories' => $categories,
            'currentBalance' => $currentBalance,
            'filters' => $request->only(['start_date', 'end_date', 'category_id', 'type', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $categories = PettyCashCategory::active()->ordered()->get();
        $currentBalance = PettyCashBalance::calculateBalanceUpToDate(now()->toDateString(), true);
        $bankAccounts = BankAccount::active()->orderBy('bank_name')->get(['id', 'bank_name', 'account_number', 'account_name']);
        $expenseAccounts = ChartOfAccount::where('account_type', 'expense')
            ->orderBy('account_code')
            ->get(['id', 'account_code', 'account_name']);

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Create', [
            'categories' => $categories,
            'currentBalance' => $currentBalance,
            'bankAccounts' => $bankAccounts,
            'expenseAccounts' => $expenseAccounts,
            'initialType' => $request->query('type'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'transaction_date' => 'required|date',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'type' => ['required', Rule::in(['expense', 'topup', 'refund', 'opening'])],
            'so_number' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];

        // Category is only required for expense transactions
        if ($request->type === 'expense') {
            $rules['category_id'] = 'required|exists:petty_cash_categories,id';
            $rules['pl_account_id'] = 'required|exists:chart_of_accounts,id';
        } else {
            $rules['category_id'] = 'nullable|exists:petty_cash_categories,id';
            $rules['pl_account_id'] = 'nullable|exists:chart_of_accounts,id';
        }

        // Bank account is required for topup/refund
        $rules['bank_account_id'] = [
            Rule::requiredIf(in_array($request->type, ['topup', 'refund'])),
            'nullable',
            'exists:bank_accounts,id'
        ];

        $request->validate($rules);

        $pettyCash = null;
        DB::transaction(function () use ($request, &$pettyCash) {
            // Calculate balance after transaction using the date
            $balanceBeforeTransaction = $this->calculateBalanceBeforeTransaction($request->transaction_date);

            if ($request->type === 'expense') {
                $balanceAfter = $balanceBeforeTransaction - $request->amount;
            } else { // topup, refund, or opening
                $balanceAfter = $balanceBeforeTransaction + $request->amount;
            }

            // Handle file upload
            $receiptFile = null;
            if ($request->hasFile('receipt_file')) {
                $receiptFile = $request->file('receipt_file')->store('petty-cash-receipts', 'public');
            }

            // Create transaction
            $pettyCash = PettyCashTransaction::create([
                'transaction_date' => $request->transaction_date,
                'description' => $request->description,
                'category_id' => $request->type === 'expense' ? $request->category_id : null,
                'pl_account_id' => $request->type === 'expense' ? $request->pl_account_id : null,
                'amount' => $request->amount,
                'type' => $request->type,
                'so_number' => $request->so_number,
                'balance_after' => $balanceAfter,
                'notes' => $request->notes,
                'receipt_file' => $receiptFile,
                'status' => 'approved', // Auto approve for admin keuangan
                'user_id' => Auth::id(),
                'approved_by' => Auth::id(),
                'approved_at' => now(),
            ]);

            // Jika topup/refund, catat transaksi bank (debit)
            if (in_array($request->type, ['topup', 'refund']) && $request->filled('bank_account_id')) {
                BankTransaction::create([
                    'bank_account_id' => $request->bank_account_id,
                    'transaction_date' => $request->transaction_date,
                    'transaction_type' => 'debit',
                    'amount' => $request->amount,
                    'description' => 'Top up petty cash: ' . $request->description,
                    'reference_type' => 'petty_cash_' . $request->type,
                    'reference_id' => $pettyCash->id,
                    'created_by' => Auth::id(),
                ]);
            }

            // Update balance records for this date and future dates
            PettyCashBalance::updateBalanceForDate($request->transaction_date);

            // Update subsequent balance records if this is a historical transaction
            $futureBalances = PettyCashBalance::where('balance_date', '>', $request->transaction_date)->get();
            foreach ($futureBalances as $futureBalance) {
                PettyCashBalance::updateBalanceForDate($futureBalance->balance_date);
            }
        });

        $this->syncProfitLossEntry($pettyCash);

        return redirect()->route('admin-keuangan.petty-cash.index')
            ->with('success', 'Transaksi petty cash berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, PettyCashTransaction $pettyCash)
    {
        $pettyCash->load(['category', 'user', 'approver']);

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Show', [
            'transaction' => $pettyCash,
            'returnQuery' => $this->resolveIndexQuery($request),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, PettyCashTransaction $pettyCash)
    {
        $categories = PettyCashCategory::active()->ordered()->get();
        $currentBalance = PettyCashBalance::getCurrentBalance();
        $bankAccounts = BankAccount::active()->orderBy('bank_name')->get(['id', 'bank_name', 'account_number', 'account_name']);
        $expenseAccounts = ChartOfAccount::where('account_type', 'expense')
            ->orderBy('account_code')
            ->get(['id', 'account_code', 'account_name']);
        $linkedBankAccountId = BankTransaction::where('reference_id', $pettyCash->id)
            ->whereIn('reference_type', ['petty_cash_topup', 'petty_cash_refund'])
            ->value('bank_account_id');

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Edit', [
            'transaction' => $pettyCash,
            'categories' => $categories,
            'currentBalance' => $currentBalance,
            'bankAccounts' => $bankAccounts,
            'expenseAccounts' => $expenseAccounts,
            'linkedBankAccountId' => $linkedBankAccountId,
            'returnQuery' => $this->resolveIndexQuery($request),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PettyCashTransaction $pettyCash)
    {
        $rules = [
            'transaction_date' => 'required|date',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0.01',
            'type' => ['required', Rule::in(['expense', 'topup', 'refund', 'opening'])],
            'so_number' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];

        // Category is only required for expense transactions
        if ($request->type === 'expense') {
            $rules['category_id'] = 'required|exists:petty_cash_categories,id';
            $rules['pl_account_id'] = 'required|exists:chart_of_accounts,id';
        } else {
            $rules['category_id'] = 'nullable|exists:petty_cash_categories,id';
            $rules['pl_account_id'] = 'nullable|exists:chart_of_accounts,id';
        }

        $rules['bank_account_id'] = [
            Rule::requiredIf(in_array($request->type, ['topup', 'refund'])),
            'nullable',
            'exists:bank_accounts,id'
        ];

        $request->validate($rules);

        DB::transaction(function () use ($request, $pettyCash) {
            $oldTransactionDate = $pettyCash->transaction_date;
            $newTransactionDate = $request->transaction_date;

            // Calculate new balance after the transaction
            $balanceBeforeTransaction = $this->calculateBalanceBeforeTransaction($newTransactionDate);

            if ($request->type === 'expense') {
                $balanceAfter = $balanceBeforeTransaction - $request->amount;
            } else { // topup, refund, or opening
                $balanceAfter = $balanceBeforeTransaction + $request->amount;
            }

            // Handle file upload
            $receiptFile = $pettyCash->receipt_file;
            if ($request->hasFile('receipt_file')) {
                $receiptFile = $request->file('receipt_file')->store('petty-cash-receipts', 'public');
            }

            // Update transaction
            $pettyCash->update([
                'transaction_date' => $request->transaction_date,
                'description' => $request->description,
                'category_id' => $request->type === 'expense' ? $request->category_id : null,
                'pl_account_id' => $request->type === 'expense' ? $request->pl_account_id : null,
                'amount' => $request->amount,
                'type' => $request->type,
                'so_number' => $request->so_number,
                'balance_after' => $balanceAfter,
                'notes' => $request->notes,
                'receipt_file' => $receiptFile,
            ]);

            // Sinkronisasi transaksi bank terkait
            $bankTx = BankTransaction::where('reference_id', $pettyCash->id)
                ->whereIn('reference_type', ['petty_cash_topup', 'petty_cash_refund'])
                ->first();

            if (in_array($request->type, ['topup', 'refund'])) {
                $referenceType = 'petty_cash_' . $request->type;

                if ($bankTx) {
                    $bankTx->update([
                        'bank_account_id' => $request->bank_account_id,
                        'transaction_date' => $request->transaction_date,
                        'transaction_type' => 'debit',
                        'amount' => $request->amount,
                        'description' => 'Top up petty cash: ' . $request->description,
                        'reference_type' => $referenceType,
                    ]);
                } else {
                    BankTransaction::create([
                        'bank_account_id' => $request->bank_account_id,
                        'transaction_date' => $request->transaction_date,
                        'transaction_type' => 'debit',
                        'amount' => $request->amount,
                        'description' => 'Top up petty cash: ' . $request->description,
                        'reference_type' => $referenceType,
                        'reference_id' => $pettyCash->id,
                        'created_by' => Auth::id(),
                    ]);
                }
            } elseif ($bankTx) {
                $bankTx->delete();
            }

            // Get all dates that need to be recalculated
            $datesToUpdate = collect([$oldTransactionDate, $newTransactionDate])
                ->unique()
                ->filter()
                ->sort();

            // Update balance records for affected dates and subsequent dates
            foreach ($datesToUpdate as $date) {
                PettyCashBalance::updateBalanceForDate($date);

                // Update all future dates as well
                $futureBalances = PettyCashBalance::where('balance_date', '>', $date)->get();
                foreach ($futureBalances as $futureBalance) {
                    PettyCashBalance::updateBalanceForDate($futureBalance->balance_date);
                }
            }
        });

        $pettyCash->refresh();
        $pettyCash->loadMissing('category');
        $this->syncProfitLossEntry($pettyCash);

        return redirect()->route('admin-keuangan.petty-cash.index', $this->resolveIndexQuery($request))
            ->with('success', 'Transaksi petty cash berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, PettyCashTransaction $pettyCash)
    {
        DB::transaction(function () use ($pettyCash) {
            $transactionDate = $pettyCash->transaction_date;
            // Hapus transaksi bank yang terhubung (jika ada)
            BankTransaction::where('reference_id', $pettyCash->id)
                ->whereIn('reference_type', ['petty_cash_topup', 'petty_cash_refund'])
                ->delete();

            $pettyCash->delete();

            // Update balance records for this date and future dates
            PettyCashBalance::updateBalanceForDate($transactionDate);

            // Update subsequent balance records
            $futureBalances = PettyCashBalance::where('balance_date', '>', $transactionDate)->get();
            foreach ($futureBalances as $futureBalance) {
                PettyCashBalance::updateBalanceForDate($futureBalance->balance_date);
            }

            ProfitLossEntry::where('reference_type', 'petty_cash_transaction')
                ->where('reference_id', $pettyCash->id)
                ->delete();
        });

        return redirect()->route('admin-keuangan.petty-cash.index', $this->resolveIndexQuery($request))
            ->with('success', 'Transaksi petty cash berhasil dihapus.');
    }

    private function resolveIndexQuery(Request $request): array
    {
        return array_filter(
            $request->only(['start_date', 'end_date', 'category_id', 'type', 'status', 'page']),
            function ($value) {
                return $value !== null && $value !== '';
            }
        );
    }

    /**
     * Dashboard with summary data
     */
    public function dashboard()
    {
        $currentBalance = PettyCashBalance::getCurrentBalance();
        $todayTransactions = PettyCashTransaction::today()->with('category')->get();
        $monthlyBalance = PettyCashBalance::thisMonth()->get();
        
        // Monthly summary
        $monthlyExpenses = PettyCashTransaction::thisMonth()
            ->where('type', 'expense')
            ->sum('amount');
        $monthlyTopups = PettyCashTransaction::thisMonth()
            ->whereIn('type', ['topup', 'refund'])
            ->sum('amount');

        // Category breakdown this month
        $categoryBreakdown = PettyCashTransaction::thisMonth()
            ->where('type', 'expense')
            ->with('category')
            ->get()
            ->groupBy('category.name')
            ->map(function ($transactions) {
                return [
                    'name' => $transactions->first()->category->name,
                    'total' => $transactions->sum('amount'),
                    'count' => $transactions->count(),
                ];
            })
            ->values();

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Dashboard', [
            'currentBalance' => $currentBalance,
            'todayTransactions' => $todayTransactions,
            'monthlyBalance' => $monthlyBalance,
            'monthlyExpenses' => $monthlyExpenses,
            'monthlyTopups' => $monthlyTopups,
            'categoryBreakdown' => $categoryBreakdown,
        ]);
    }

    public function balanceForDate(Request $request)
    {
        $date = $request->query('date') ?? now()->toDateString();
        $balance = PettyCashBalance::calculateBalanceUpToDate($date, true);

        return response()->json([
            'balance' => (float) $balance,
        ]);
    }

    /**
     * Export transactions to Excel
     */
    public function export(Request $request)
    {
        // This will be implemented with export functionality
        return response()->json(['message' => 'Export functionality will be implemented']);
    }

    /**
     * Sync all balance records
     */
    public function syncBalances()
    {
        try {
            PettyCashBalance::syncAllBalances();

            return redirect()->back()
                ->with('success', 'Saldo petty cash berhasil disinkronkan.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Gagal menyinkronkan saldo: ' . $e->getMessage());
        }
    }

    /**
     * Sync all transaction balances with correct cumulative calculation
     */
    public function syncTransactionBalances()
    {
        try {
            $finalBalance = PettyCashBalance::syncAllTransactionBalances();

            return redirect()->back()
                ->with('success', "Saldo kolom tabel berhasil disinkronkan. Saldo akhir: Rp " . number_format($finalBalance, 0, ',', '.'));
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Gagal menyinkronkan saldo kolom tabel: ' . $e->getMessage());
        }
    }

    /**
     * Show auto-generated transactions awaiting approval
     */
    public function pendingApproval(Request $request)
    {
        $query = PettyCashTransaction::with(['category', 'user', 'invoice', 'template'])
            ->where('auto_generated', true)
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc');

        // Filter by date range
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('transaction_date', [
                $request->start_date,
                $request->end_date
            ]);
        }

        // Filter by categorization method
        if ($request->filled('categorization_method')) {
            $query->where('categorization_method', $request->categorization_method);
        }

        // Filter by invoice
        if ($request->filled('invoice_id')) {
            $query->where('invoice_id', $request->invoice_id);
        }

        $pendingTransactions = $query->paginate(15)->withQueryString();
        $categories = PettyCashCategory::active()->ordered()->get();

        // Get summary stats
        $stats = [
            'total_pending' => PettyCashTransaction::where('auto_generated', true)->where('status', 'pending')->count(),
            'total_amount' => PettyCashTransaction::where('auto_generated', true)->where('status', 'pending')->sum('amount'),
            'by_method' => PettyCashTransaction::where('auto_generated', true)
                ->where('status', 'pending')
                ->select('categorization_method', DB::raw('count(*) as count'), DB::raw('sum(amount) as total'))
                ->groupBy('categorization_method')
                ->get()
        ];

        return Inertia::render('Admin/AdminKeuangan/PettyCash/PendingApproval', [
            'pendingTransactions' => $pendingTransactions,
            'categories' => $categories,
            'stats' => $stats,
            'filters' => $request->only(['start_date', 'end_date', 'categorization_method', 'invoice_id'])
        ]);
    }

    /**
     * Bulk approve selected transactions
     */
    public function bulkApprove(Request $request)
    {
        $request->validate([
            'transaction_ids' => 'required|array',
            'transaction_ids.*' => 'exists:petty_cash_transactions,id'
        ]);

        DB::transaction(function () use ($request) {
            $transactions = PettyCashTransaction::whereIn('id', $request->transaction_ids)
                ->where('auto_generated', true)
                ->where('status', 'pending')
                ->get();

            foreach ($transactions as $transaction) {
                $transaction->update([
                    'status' => 'approved',
                    'approved_by' => Auth::id(),
                    'approved_at' => now()
                ]);

                // Recalculate balance for this transaction's date
                PettyCashBalance::updateBalanceForDate($transaction->transaction_date);
            }

            // Update subsequent balance records
            $earliestDate = $transactions->min('transaction_date');
            if ($earliestDate) {
                $futureBalances = PettyCashBalance::where('balance_date', '>', $earliestDate)->get();
                foreach ($futureBalances as $futureBalance) {
                    PettyCashBalance::updateBalanceForDate($futureBalance->balance_date);
                }
            }
        });

        $approvedTransactions = PettyCashTransaction::with('category')
            ->whereIn('id', $request->transaction_ids)
            ->where('status', 'approved')
            ->get();

        foreach ($approvedTransactions as $transaction) {
            $this->syncProfitLossEntry($transaction);
        }

        return redirect()->back()
            ->with('success', count($request->transaction_ids) . ' transaksi berhasil disetujui.');
    }

    /**
     * Bulk reject selected transactions
     */
    public function bulkReject(Request $request)
    {
        $request->validate([
            'transaction_ids' => 'required|array',
            'transaction_ids.*' => 'exists:petty_cash_transactions,id',
            'rejection_reason' => 'nullable|string|max:500'
        ]);

        DB::transaction(function () use ($request) {
            PettyCashTransaction::whereIn('id', $request->transaction_ids)
                ->where('auto_generated', true)
                ->where('status', 'pending')
                ->update([
                    'status' => 'rejected',
                    'approved_by' => Auth::id(),
                    'approved_at' => now(),
                    'notes' => ($request->rejection_reason ? 'Rejection reason: ' . $request->rejection_reason : null)
                ]);
        });

        return redirect()->back()
            ->with('success', count($request->transaction_ids) . ' transaksi berhasil ditolak.');
    }

    /**
     * Edit auto-generated transaction before approval
     */
    public function editPending(PettyCashTransaction $pettyCash)
    {
        if (!$pettyCash->auto_generated || $pettyCash->status !== 'pending') {
            return redirect()->route('admin-keuangan.petty-cash.pending-approval')
                ->with('error', 'Transaksi ini tidak dapat diedit.');
        }

        $categories = PettyCashCategory::active()->ordered()->get();
        $currentBalance = PettyCashBalance::getCurrentBalance();

        return Inertia::render('Admin/AdminKeuangan/PettyCash/EditPending', [
            'transaction' => $pettyCash->load(['category', 'invoice', 'template']),
            'categories' => $categories,
            'currentBalance' => $currentBalance
        ]);
    }

    /**
     * Update auto-generated transaction before approval
     */
    public function updatePending(Request $request, PettyCashTransaction $pettyCash)
    {
        if (!$pettyCash->auto_generated || $pettyCash->status !== 'pending') {
            return redirect()->route('admin-keuangan.petty-cash.pending-approval')
                ->with('error', 'Transaksi ini tidak dapat diedit.');
        }

        $request->validate([
            'transaction_date' => 'required|date',
            'description' => 'required|string|max:255',
            'category_id' => 'required|exists:petty_cash_categories,id',
            'amount' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string'
        ]);

        $pettyCash->update([
            'transaction_date' => $request->transaction_date,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'amount' => $request->amount,
            'notes' => $request->notes,
            'categorization_method' => 'manual' // Mark as manually adjusted
        ]);

        return redirect()->route('admin-keuangan.petty-cash.pending-approval')
            ->with('success', 'Transaksi berhasil diperbarui.');
    }

    private function calculateBalanceBeforeTransaction($transactionDate): float
    {
        $baseBalance = PettyCashBalance::calculateBalanceUpToDate($transactionDate, false);
        $openingToday = PettyCashTransaction::whereDate('transaction_date', $transactionDate)
            ->where('type', 'opening')
            ->sum('amount');

        return (float) $baseBalance + (float) $openingToday;
    }

    private function syncProfitLossEntry(?PettyCashTransaction $transaction): void
    {
        if (!$transaction) {
            return;
        }

        if ($transaction->type !== 'expense' || $transaction->status !== 'approved') {
            ProfitLossEntry::where('reference_type', 'petty_cash_transaction')
                ->where('reference_id', $transaction->id)
                ->delete();
            return;
        }

        if (!$transaction->transaction_date) {
            return;
        }

        $period = ProfitLossPeriod::active()
            ->whereDate('start_date', '<=', $transaction->transaction_date)
            ->whereDate('end_date', '>=', $transaction->transaction_date)
            ->where('status', '!=', 'closed')
            ->orderByDesc('start_date')
            ->first();

        if (!$period) {
            \Log::warning('Petty cash P&L sync skipped: no active period', [
                'petty_cash_id' => $transaction->id,
                'transaction_date' => $transaction->transaction_date,
            ]);
            return;
        }

        ProfitLossEntry::where('reference_type', 'petty_cash_transaction')
            ->where('reference_id', $transaction->id)
            ->where('period_id', '!=', $period->id)
            ->delete();

        try {
            $creatorId = Auth::id() ?? $transaction->approved_by ?? $transaction->user_id;
            $entry = ProfitLossEntry::createFromPettyCash($transaction, $period->id, $creatorId);
            if ($entry) {
                $period->calculateTotals();
            }
        } catch (\Throwable $e) {
            \Log::error('Petty cash P&L sync failed', [
                'petty_cash_id' => $transaction->id,
                'error' => $e->getMessage(),
            ]);
        }
    }
}
