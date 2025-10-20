<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\BankBalance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class BankBalanceController extends Controller
{
    public function index()
    {
        $bankAccounts = BankAccount::with(['balances' => function($query) {
            $query->latest()->limit(3);
        }])->active()->get();

        // Get current balances for each bank
        $bankData = $bankAccounts->map(function($bank) {
            return [
                'id' => $bank->id,
                'bank_name' => $bank->bank_name,
                'account_number' => $bank->account_number,
                'account_name' => $bank->account_name,
                'current_balance' => $bank->getCurrentBalance(),
                'last_updated' => $bank->balances->first()?->updated_at,
                'recent_balances' => $bank->balances
            ];
        });

        return Inertia::render('Admin/AdminKeuangan/BankBalance/Index', [
            'bankData' => $bankData,
            'currentMonth' => Carbon::now()->format('Y-m'),
            'stats' => $this->getStats()
        ]);
    }

    public function create()
    {
        $bankAccounts = BankAccount::active()->get();
        $currentMonth = Carbon::now()->format('Y-m');

        // Check if opening balance already exists for current month
        $existingBalances = BankBalance::where('period_month', $currentMonth)
                                     ->with('bankAccount')
                                     ->get()
                                     ->keyBy('bank_account_id');

        return Inertia::render('Admin/AdminKeuangan/BankBalance/Create', [
            'bankAccounts' => $bankAccounts,
            'currentMonth' => $currentMonth,
            'existingBalances' => $existingBalances
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'period_month' => 'required|string|regex:/^\d{4}-\d{2}$/',
            'balances' => 'required|array|min:1',
            'balances.*.bank_account_id' => 'required|exists:bank_accounts,id',
            'balances.*.opening_balance' => 'required|numeric|min:0',
            'balances.*.notes' => 'nullable|string|max:500'
        ]);

        try {
            \DB::beginTransaction();

            foreach ($request->balances as $balanceData) {
                // Check if balance already exists for this bank and month
                $existing = BankBalance::where('bank_account_id', $balanceData['bank_account_id'])
                                     ->where('period_month', $request->period_month)
                                     ->first();

                if ($existing) {
                    // Update existing balance
                    $existing->update([
                        'opening_balance' => $balanceData['opening_balance'],
                        'notes' => $balanceData['notes'] ?? null,
                    ]);
                } else {
                    // Create new balance
                    BankBalance::create([
                        'bank_account_id' => $balanceData['bank_account_id'],
                        'period_month' => $request->period_month,
                        'opening_balance' => $balanceData['opening_balance'],
                        'current_balance' => $balanceData['opening_balance'], // Initial current balance
                        'notes' => $balanceData['notes'] ?? null,
                        'created_by' => Auth::id()
                    ]);
                }
            }

            \DB::commit();

            return redirect()->route('admin-keuangan.bank-balance.index')
                           ->with('success', 'Opening balance berhasil disimpan untuk periode ' . $request->period_month);

        } catch (\Exception $e) {
            \DB::rollback();

            return redirect()->back()
                           ->withErrors(['error' => 'Gagal menyimpan opening balance: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    public function show(BankAccount $bankBalance)
    {
        $bank = $bankBalance->load(['balances' => function($query) {
            $query->orderBy('period_month', 'desc');
        }, 'transactions' => function($query) {
            $query->orderBy('transaction_date', 'desc')->limit(50);
        }]);

        return Inertia::render('Admin/AdminKeuangan/BankBalance/Show', [
            'bank' => $bank,
            'currentBalance' => $bank->getCurrentBalance(),
            'stats' => $this->getBankStats($bank)
        ]);
    }

    public function history(BankAccount $bank)
    {
        $balances = $bank->balances()
                        ->orderBy('period_month', 'desc')
                        ->paginate(12);

        $transactions = $bank->transactions()
                            ->with('creator')
                            ->orderBy('transaction_date', 'desc')
                            ->paginate(20);

        return Inertia::render('Admin/AdminKeuangan/BankBalance/History', [
            'bank' => $bank,
            'balances' => $balances,
            'transactions' => $transactions,
            'currentBalance' => $bank->getCurrentBalance()
        ]);
    }

    private function getStats(): array
    {
        $mandiri = BankAccount::getMandiri();
        $bca = BankAccount::getBCA();

        $mandiriBalance = $mandiri ? $mandiri->getCurrentBalance() : 0;
        $bcaBalance = $bca ? $bca->getCurrentBalance() : 0;
        $totalBalance = $mandiriBalance + $bcaBalance;

        // Get current month transactions count
        $currentMonth = Carbon::now()->format('Y-m');
        $transactionsCount = \App\Models\BankTransaction::forMonth($currentMonth)->count();

        return [
            'mandiri_balance' => $mandiriBalance,
            'bca_balance' => $bcaBalance,
            'total_balance' => $totalBalance,
            'transactions_this_month' => $transactionsCount
        ];
    }

    private function getBankStats(BankAccount $bank): array
    {
        $currentMonth = Carbon::now()->format('Y-m');

        $creditThisMonth = $bank->transactions()
                               ->forMonth($currentMonth)
                               ->credit()
                               ->sum('amount');

        $debitThisMonth = $bank->transactions()
                              ->forMonth($currentMonth)
                              ->debit()
                              ->sum('amount');

        $transactionsCount = $bank->transactions()
                                 ->forMonth($currentMonth)
                                 ->count();

        return [
            'credit_this_month' => $creditThisMonth,
            'debit_this_month' => $debitThisMonth,
            'transactions_count' => $transactionsCount,
            'net_flow' => $creditThisMonth - $debitThisMonth
        ];
    }
}