<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\EquipmentTransaction;
use App\Models\PettyCashCategory;
use App\Models\BankTransaction;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use App\Models\ChartOfAccount;
use App\Models\PettyCashTransaction;
use App\Models\PettyCashBalance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

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
            'expenseAccounts' => ChartOfAccount::where('account_type', 'expense')
                ->orderBy('account_code')
                ->get(['id', 'account_code', 'account_name']),
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
            'source_type' => ['required', Rule::in(['bank', 'petty_cash'])],
            'bank_account_id' => ['nullable', 'required_if:source_type,bank', 'exists:bank_accounts,id'],
            'petty_cash_category_id' => ['nullable', 'required_if:source_type,petty_cash', 'exists:petty_cash_categories,id'],
            'pl_account_id' => ['required', 'exists:chart_of_accounts,id'],
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
            'pl_account_id' => $validated['pl_account_id'],
            'useful_life_months' => $validated['useful_life_months'] ?? null,
            'depreciation_start_date' => $validated['depreciation_start_date'] ?? null,
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        // Generate depreciation schedule (if configured)
        $purchase->ensureDepreciationSchedules();

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

        // Jika sumber petty cash, catat pengeluaran petty cash dan perbarui saldo
        if ($validated['source_type'] === 'petty_cash' && !empty($validated['petty_cash_category_id'])) {
            $openingBalance = PettyCashBalance::calculateBalanceUpToDate($validated['transaction_date'], false);
            $closingBalance = $openingBalance - $validated['amount'];

            PettyCashTransaction::create([
                'transaction_date' => $validated['transaction_date'],
                'description' => 'Pembelian Equipment - ' . ($validated['asset_name'] ?? 'Aset'),
                'category_id' => $validated['petty_cash_category_id'],
                'amount' => $validated['amount'],
                'type' => 'expense',
                'status' => 'approved',
                'user_id' => Auth::id(),
                'auto_generated' => true,
                'notes' => $validated['notes'] ?? null,
                'balance_after' => $closingBalance,
            ]);

            PettyCashBalance::updateBalanceForDate($validated['transaction_date']);
        }

        // Catat entri laba rugi sesuai akun biaya yang dipilih
        $this->createProfitLossEntriesForPurchase($purchase);

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

        $depr = EquipmentTransaction::create([
            'transaction_date' => $validated['transaction_date'],
            'transaction_type' => 'depreciation',
            'asset_name' => $validated['asset_name'],
            'amount' => $validated['amount'],
            'description' => $validated['description'] ?? null,
            'source_type' => 'other',
            'notes' => $validated['notes'] ?? null,
            'created_by' => Auth::id(),
        ]);

        $this->createProfitLossEntriesForDepreciation($depr);

        return redirect()->route('admin-keuangan.equipment.index')
            ->with('success', 'Penyusutan equipment berhasil dicatat.');
    }

    private function createProfitLossEntriesForPurchase(EquipmentTransaction $transaction): void
    {
        $date = Carbon::parse($transaction->transaction_date)->toDateString();

        $periods = ProfitLossPeriod::where('status', '!=', 'closed')
            ->where('start_date', '<=', $date)
            ->where('end_date', '>=', $date)
            ->get();

        if ($periods->isEmpty()) {
            $monthStart = Carbon::parse($date)->startOfMonth()->toDateString();
            $monthEnd = Carbon::parse($date)->endOfMonth()->toDateString();
            $periods = ProfitLossPeriod::where('status', '!=', 'closed')
                ->where('start_date', '<=', $monthStart)
                ->where('end_date', '>=', $monthEnd)
                ->get();
        }

        foreach ($periods as $period) {
            $entry = ProfitLossEntry::createFromEquipmentPurchase($transaction, $period->id, Auth::id());
            if ($entry) {
                $period->calculateTotals();
            }
        }
    }

    private function createProfitLossEntriesForDepreciation(EquipmentTransaction $transaction): void
    {
        $date = Carbon::parse($transaction->transaction_date)->toDateString();

        $periods = ProfitLossPeriod::where('status', '!=', 'closed')
            ->where('start_date', '<=', $date)
            ->where('end_date', '>=', $date)
            ->get();

        // Fallback: periode yang mencakup bulan transaksi
        if ($periods->isEmpty()) {
            $monthStart = Carbon::parse($date)->startOfMonth()->toDateString();
            $monthEnd = Carbon::parse($date)->endOfMonth()->toDateString();
            $periods = ProfitLossPeriod::where('status', '!=', 'closed')
                ->where('start_date', '<=', $monthStart)
                ->where('end_date', '>=', $monthEnd)
                ->get();
        }

        // Buat entri untuk setiap periode yang valid
        foreach ($periods as $period) {
            $entry = ProfitLossEntry::createFromEquipmentDepreciation($transaction, $period->id, Auth::id());
            if ($entry) {
                $period->calculateTotals();
            }
        }
    }
}
