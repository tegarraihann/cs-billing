<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\PettyCashTransaction;
use App\Models\PettyCashCategory;
use App\Models\PettyCashBalance;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Validation\Rule;

class PettyCashController extends Controller
{
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

        $transactions = $query->paginate(15)->withQueryString();
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
    public function create()
    {
        $categories = PettyCashCategory::active()->ordered()->get();
        $currentBalance = PettyCashBalance::getCurrentBalance();

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Create', [
            'categories' => $categories,
            'currentBalance' => $currentBalance,
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
            'type' => ['required', Rule::in(['expense', 'topup', 'refund'])],
            'so_number' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];

        // Category is only required for expense transactions
        if ($request->type === 'expense') {
            $rules['category_id'] = 'required|exists:petty_cash_categories,id';
        } else {
            $rules['category_id'] = 'nullable|exists:petty_cash_categories,id';
        }

        $request->validate($rules);

        DB::transaction(function () use ($request) {
            $currentBalance = PettyCashBalance::getCurrentBalance();
            
            // Calculate new balance
            if ($request->type === 'expense') {
                $newBalance = $currentBalance - $request->amount;
            } else { // topup or refund
                $newBalance = $currentBalance + $request->amount;
            }

            // Handle file upload
            $receiptFile = null;
            if ($request->hasFile('receipt_file')) {
                $receiptFile = $request->file('receipt_file')->store('petty-cash-receipts', 'public');
            }

            // Create transaction
            PettyCashTransaction::create([
                'transaction_date' => $request->transaction_date,
                'description' => $request->description,
                'category_id' => $request->type === 'expense' ? $request->category_id : null,
                'amount' => $request->amount,
                'type' => $request->type,
                'so_number' => $request->so_number,
                'balance_after' => $newBalance,
                'notes' => $request->notes,
                'receipt_file' => $receiptFile,
                'status' => 'approved', // Auto approve for admin keuangan
                'user_id' => Auth::id(),
                'approved_by' => Auth::id(),
                'approved_at' => now(),
            ]);

            // Update daily balance
            $this->updateDailyBalance($request->transaction_date);
        });

        return redirect()->route('admin-keuangan.petty-cash.index')
            ->with('success', 'Transaksi petty cash berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PettyCashTransaction $pettyCash)
    {
        $pettyCash->load(['category', 'user', 'approver']);

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Show', [
            'transaction' => $pettyCash,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PettyCashTransaction $pettyCash)
    {
        $categories = PettyCashCategory::active()->ordered()->get();
        $currentBalance = PettyCashBalance::getCurrentBalance();

        return Inertia::render('Admin/AdminKeuangan/PettyCash/Edit', [
            'transaction' => $pettyCash,
            'categories' => $categories,
            'currentBalance' => $currentBalance,
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
            'type' => ['required', Rule::in(['expense', 'topup', 'refund'])],
            'so_number' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];

        // Category is only required for expense transactions
        if ($request->type === 'expense') {
            $rules['category_id'] = 'required|exists:petty_cash_categories,id';
        } else {
            $rules['category_id'] = 'nullable|exists:petty_cash_categories,id';
        }

        $request->validate($rules);

        DB::transaction(function () use ($request, $pettyCash) {
            $oldAmount = $pettyCash->amount;
            $oldType = $pettyCash->type;
            
            // Reverse old transaction impact on balance
            $currentBalance = PettyCashBalance::getCurrentBalance();
            if ($oldType === 'expense') {
                $adjustedBalance = $currentBalance + $oldAmount;
            } else {
                $adjustedBalance = $currentBalance - $oldAmount;
            }

            // Apply new transaction
            if ($request->type === 'expense') {
                $newBalance = $adjustedBalance - $request->amount;
            } else {
                $newBalance = $adjustedBalance + $request->amount;
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
                'amount' => $request->amount,
                'type' => $request->type,
                'so_number' => $request->so_number,
                'balance_after' => $newBalance,
                'notes' => $request->notes,
                'receipt_file' => $receiptFile,
            ]);

            // Update daily balance for both old and new dates
            $this->updateDailyBalance($pettyCash->getOriginal('transaction_date'));
            if ($request->transaction_date !== $pettyCash->getOriginal('transaction_date')) {
                $this->updateDailyBalance($request->transaction_date);
            }
        });

        return redirect()->route('admin-keuangan.petty-cash.index')
            ->with('success', 'Transaksi petty cash berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PettyCashTransaction $pettyCash)
    {
        DB::transaction(function () use ($pettyCash) {
            $transactionDate = $pettyCash->transaction_date;
            $pettyCash->delete();
            
            // Update daily balance after deletion
            $this->updateDailyBalance($transactionDate);
        });

        return redirect()->route('admin-keuangan.petty-cash.index')
            ->with('success', 'Transaksi petty cash berhasil dihapus.');
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

    /**
     * Export transactions to Excel
     */
    public function export(Request $request)
    {
        // This will be implemented with export functionality
        return response()->json(['message' => 'Export functionality will be implemented']);
    }

    /**
     * Update daily balance calculation
     */
    private function updateDailyBalance($date)
    {
        $carbonDate = Carbon::parse($date);
        
        // Get all transactions for this date
        $transactions = PettyCashTransaction::whereDate('transaction_date', $carbonDate)
            ->where('status', 'approved')
            ->orderBy('created_at')
            ->get();

        $totalIn = $transactions->whereIn('type', ['topup', 'refund'])->sum('amount');
        $totalOut = $transactions->where('type', 'expense')->sum('amount');
        
        // Get opening balance (closing balance from previous day)
        $previousDay = $carbonDate->copy()->subDay();
        $previousBalance = PettyCashBalance::where('balance_date', $previousDay)->first();
        $openingBalance = $previousBalance ? $previousBalance->closing_balance : 0;
        
        $closingBalance = $openingBalance + $totalIn - $totalOut;

        // Update or create daily balance record
        PettyCashBalance::updateOrCreate(
            ['balance_date' => $carbonDate->format('Y-m-d')],
            [
                'opening_balance' => $openingBalance,
                'total_in' => $totalIn,
                'total_out' => $totalOut,
                'closing_balance' => $closingBalance,
                'transaction_count' => $transactions->count(),
            ]
        );
    }
}
