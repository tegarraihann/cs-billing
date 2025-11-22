<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\EquipmentTransaction;
use App\Models\PettyCashCategory;
use App\Models\BankTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EquipmentTransactionController extends Controller
{
    public function index(Request $request)
    {
        $query = EquipmentTransaction::with(['bankAccount', 'creator'])
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

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $transactions = $query->paginate(15)->withQueryString();

        $totalPurchase = EquipmentTransaction::purchases()->sum('amount');
        $totalDepreciation = EquipmentTransaction::depreciations()->sum('amount');

        $categories = EquipmentTransaction::select('category')
            ->whereNotNull('category')
            ->distinct()
            ->orderBy('category')
            ->pluck('category');

        return Inertia::render('Admin/AdminKeuangan/Equipment/Index', [
            'transactions' => $transactions,
            'summary' => [
                'total_purchase' => (float) $totalPurchase,
                'total_depreciation' => (float) $totalDepreciation,
                'net_book_value' => max(0, (float) $totalPurchase - (float) $totalDepreciation),
            ],
            'bankAccounts' => BankAccount::all(['id', 'bank_name', 'account_number', 'account_name']),
            'pettyCashCategories' => PettyCashCategory::active()->ordered()->get(['id', 'name']),
            'categories' => $categories,
            'filters' => $request->only(['transaction_type', 'date_from', 'date_to', 'category']),
        ]);
    }

    public function storePurchase(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => ['required', 'date'],
            'asset_name' => ['required', 'string', 'max:255'],
            'category' => ['nullable', 'string', 'max:100'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string'],
            'reference_number' => ['nullable', 'string', 'max:100'],
            'source_type' => ['required', Rule::in(['bank', 'petty_cash', 'other'])],
            'bank_account_id' => ['nullable', 'required_if:source_type,bank', 'exists:bank_accounts,id'],
            'petty_cash_category_id' => ['nullable', 'required_if:source_type,petty_cash', 'exists:petty_cash_categories,id'],
            'useful_life_months' => ['nullable', 'integer', 'min:1', 'max:240'],
            'depreciation_start_date' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $purchase = EquipmentTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'transaction_type' => 'purchase',
            'asset_name' => $validated['asset_name'],
            'category' => $validated['category'] ?? null,
            'amount' => $validated['amount'],
            'description' => $validated['description'] ?? null,
            'reference_number' => $validated['reference_number'] ?? null,
            'source_type' => $validated['source_type'],
            'bank_account_id' => $validated['bank_account_id'] ?? null,
            'petty_cash_category_id' => $validated['petty_cash_category_id'] ?? null,
            'useful_life_months' => $validated['useful_life_months'] ?? null,
            'depreciation_start_date' => $validated['depreciation_start_date'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        // Jika sumber bank, catat pengeluaran bank
        if ($validated['source_type'] === 'bank' && !empty($validated['bank_account_id'])) {
            BankTransaction::recordVendorPayment(
                $validated['bank_account_id'],
                $validated['amount'],
                'Pembelian Equipment - ' . ($validated['asset_name'] ?? 'Aset'),
                $purchase->id,
                $validated['transaction_date']
            );
        }

        return redirect()->route('admin-keuangan.equipment.index')
            ->with('success', 'Pembelian equipment berhasil dicatat.');
    }

    public function storeDepreciation(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => ['required', 'date'],
            'asset_name' => ['required', 'string', 'max:255'],
            'amount' => ['required', 'numeric', 'min:0.01'],
            'description' => ['nullable', 'string'],
            'notes' => ['nullable', 'string'],
        ]);

        EquipmentTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'transaction_type' => 'depreciation',
            'asset_name' => $validated['asset_name'],
            'amount' => $validated['amount'],
            'description' => $validated['description'] ?? null,
            'source_type' => 'other',
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('admin-keuangan.equipment.index')
            ->with('success', 'Penyusutan equipment berhasil dicatat.');
    }
}
