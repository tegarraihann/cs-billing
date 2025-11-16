<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\PettyCashCategory;
use App\Models\PrepaidRentTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class PrepaidRentController extends Controller
{
    public function index(Request $request)
    {
        $query = PrepaidRentTransaction::with(['creator', 'bankAccount'])
            ->orderByDesc('transaction_date')
            ->orderByDesc('id');

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

        $totalTopup = PrepaidRentTransaction::topups()->sum('amount');
        $totalAmortization = PrepaidRentTransaction::amortizations()->sum('amount');

        return Inertia::render('Admin/AdminKeuangan/PrepaidRent/Index', [
            'transactions' => $transactions,
            'summary' => [
                'total_topup' => (float) $totalTopup,
                'total_amortization' => (float) $totalAmortization,
                'balance' => max(0, (float) $totalTopup - (float) $totalAmortization),
            ],
            'bankAccounts' => BankAccount::all(['id', 'bank_name', 'account_number', 'account_name']),
            'pettyCashCategories' => PettyCashCategory::active()->ordered()->get(['id', 'name']),
            'filters' => $request->only(['transaction_type', 'date_from', 'date_to']),
        ]);
    }

    public function storeTopup(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => ['required', 'date'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string'],
            'reference_number' => ['nullable', 'string', 'max:100'],
            'source_type' => ['required', Rule::in(['bank', 'petty_cash', 'other'])],
            'bank_account_id' => ['nullable', 'required_if:source_type,bank', 'exists:bank_accounts,id'],
            'petty_cash_category_id' => ['nullable', 'required_if:source_type,petty_cash', 'exists:petty_cash_categories,id'],
            'notes' => ['nullable', 'string'],
            'rental_start_date' => ['nullable', 'date'],
            'rental_end_date' => ['nullable', 'date', 'after_or_equal:rental_start_date'],
            'amortization_months' => ['nullable', 'integer', 'min:1', 'max:60'],
        ]);

        PrepaidRentTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'transaction_type' => 'topup',
            'amount' => $validated['amount'],
            'description' => $validated['description'] ?? null,
            'reference_number' => $validated['reference_number'] ?? null,
            'source_type' => $validated['source_type'],
            'bank_account_id' => $validated['bank_account_id'] ?? null,
            'petty_cash_category_id' => $validated['petty_cash_category_id'] ?? null,
            'rental_start_date' => $validated['rental_start_date'] ?? null,
            'rental_end_date' => $validated['rental_end_date'] ?? null,
            'amortization_months' => $validated['amortization_months'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('admin-keuangan.prepaid-rent.index')
            ->with('success', 'Pembayaran sewa berhasil dicatat.');
    }

    public function storeAmortization(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => ['required', 'date'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ]);

        PrepaidRentTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'transaction_type' => 'amortization',
            'amount' => $validated['amount'],
            'description' => $validated['description'] ?? null,
            'source_type' => 'other',
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('admin-keuangan.prepaid-rent.index')
            ->with('success', 'Penyusutan prepaid rent berhasil dicatat.');
    }
}
