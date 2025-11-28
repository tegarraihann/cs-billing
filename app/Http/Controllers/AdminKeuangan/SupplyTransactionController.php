<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\SupplyTransaction;
use App\Models\BankAccount;
use App\Models\PettyCashCategory;
use App\Models\BankTransaction;
use App\Models\PettyCashTransaction;
use App\Models\PettyCashBalance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SupplyTransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = SupplyTransaction::with('creator', 'bankAccount')
            ->orderByDesc('transaction_date')
            ->orderByDesc('id');

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        if ($request->filled('transaction_type')) {
            $query->where('transaction_type', $request->transaction_type);
        }

        if ($request->filled('date_from')) {
            $query->whereDate('transaction_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->whereDate('transaction_date', '<=', $request->date_to);
        }

        $transactions = $query->paginate(15)->withQueryString();

        $topupTotal = SupplyTransaction::topups()->sum('amount');
        $usageTotal = SupplyTransaction::consumptions()->sum('amount');
        $balance = $topupTotal - $usageTotal;

        $categories = SupplyTransaction::select('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('Admin/AdminKeuangan/Supplies/Index', [
            'transactions' => $transactions,
            'summary' => [
                'total_topup' => $topupTotal,
                'total_usage' => $usageTotal,
                'balance' => max(0, $balance),
            ],
            'bankAccounts' => BankAccount::all(['id', 'bank_name', 'account_number', 'account_name']),
            'categories' => $categories,
            'pettyCashCategories' => PettyCashCategory::active()->ordered()->get(['id', 'name']),
            'filters' => $request->only(['category', 'transaction_type', 'date_from', 'date_to']),
        ]);
    }

    public function storeTopup(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => ['required', 'date'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'quantity' => ['nullable', 'numeric', 'min:0.01'],
            'source_type' => ['required', Rule::in(['bank', 'petty_cash', 'other'])],
            'bank_account_id' => ['nullable', 'required_if:source_type,bank', 'exists:bank_accounts,id'],
            'petty_cash_category_id' => ['nullable', 'required_if:source_type,petty_cash', 'exists:petty_cash_categories,id'],
            'reference_number' => ['nullable', 'string', 'max:100'],
            'notes' => ['nullable', 'string'],
        ]);

        $topup = SupplyTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'transaction_type' => 'topup',
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'] ?? null,
            'source_type' => $validated['source_type'],
            'bank_account_id' => $validated['bank_account_id'] ?? null,
            'reference_number' => $validated['reference_number'] ?? null,
            'petty_cash_category_id' => $validated['petty_cash_category_id'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        // Jika sumber petty cash, catat pengeluaran petty cash & perbarui saldo
        if ($validated['source_type'] === 'petty_cash' && !empty($validated['petty_cash_category_id'])) {
            $currentBalance = PettyCashBalance::calculateBalanceUpToDate($validated['transaction_date']);
            $balanceAfter = $currentBalance - $validated['amount'];

            $pettyCash = PettyCashTransaction::create([
                'transaction_date' => $validated['transaction_date'],
                'description' => 'Topup Supplies - ' . ($validated['category'] ?? 'Supplies'),
                'category_id' => $validated['petty_cash_category_id'],
                'amount' => $validated['amount'],
                'type' => 'expense',
                'balance_after' => $balanceAfter,
                'notes' => $validated['notes'] ?? null,
                'status' => 'approved',
                'user_id' => Auth::id(),
                'approved_by' => Auth::id(),
                'approved_at' => now(),
                'auto_generated' => true,
                'categorization_method' => 'manual',
            ]);

            $topup->update(['petty_cash_transaction_id' => $pettyCash->id]);

            PettyCashBalance::updateBalanceForDate($validated['transaction_date']);
        }

        // Jika sumber bank, catat pengeluaran bank
        if ($validated['source_type'] === 'bank' && !empty($validated['bank_account_id'])) {
            BankTransaction::recordVendorPayment(
                $validated['bank_account_id'],
                $validated['amount'],
                'Topup Supplies - ' . ($validated['category'] ?? 'Supplies'),
                $topup->id,
                $validated['transaction_date']
            );
        }

        return redirect()->route('admin-keuangan.supplies.index')
            ->with('success', 'Top-up supplies berhasil dicatat.');
    }

    public function storeUsage(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => ['required', 'date'],
            'category' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'quantity' => ['nullable', 'numeric', 'min:0.01'],
            'transaction_type' => ['required', Rule::in(['usage', 'depreciation'])],
            'notes' => ['nullable', 'string'],
        ]);

        SupplyTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'transaction_type' => $validated['transaction_type'],
            'category' => $validated['category'],
            'description' => $validated['description'] ?? null,
            'amount' => $validated['amount'],
            'quantity' => $validated['quantity'] ?? null,
            'source_type' => 'other',
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('admin-keuangan.supplies.index')
            ->with('success', 'Pemakaian supplies berhasil dicatat.');
    }
}
