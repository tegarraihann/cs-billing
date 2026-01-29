<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\BankBalance;
use App\Models\BankTransaction;
use App\Models\ChartOfAccount;
use App\Models\EquityEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

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
            'stats' => $this->getBankStats($bank),
            'transactions' => $bank->transactions,
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
                            ->orderBy('created_at', 'desc')
                            ->paginate(20);

        return Inertia::render('Admin/AdminKeuangan/BankBalance/History', [
            'bank' => $bank,
            'balances' => $balances,
            'transactions' => $transactions,
            'currentBalance' => $bank->getCurrentBalance()
        ]);
    }

    public function transfer(Request $request)
    {
        $validated = $request->validate([
            'from_bank_id' => 'required|exists:bank_accounts,id|different:to_bank_id',
            'to_bank_id' => 'required|exists:bank_accounts,id',
            'transfer_date' => 'required|date',
            'amount' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string|max:500',
        ]);

        $fromBank = BankAccount::find($validated['from_bank_id']);
        $toBank = BankAccount::find($validated['to_bank_id']);

        if (!$fromBank || !$toBank) {
            return back()->withErrors(['error' => 'Bank account not found.'])->withInput();
        }

        try {
            \DB::beginTransaction();

            $notes = trim((string) ($validated['notes'] ?? ''));
            $outDescription = 'Bank transfer to ' . $toBank->bank_name;
            $inDescription = 'Bank transfer from ' . $fromBank->bank_name;
            if ($notes !== '') {
                $outDescription .= ' - ' . $notes;
                $inDescription .= ' - ' . $notes;
            }

            BankTransaction::create([
                'bank_account_id' => $fromBank->id,
                'transaction_date' => $validated['transfer_date'],
                'transaction_type' => 'debit',
                'amount' => $validated['amount'],
                'description' => $outDescription,
                'reference_type' => 'bank_transfer',
                'reference_id' => null,
                'created_by' => Auth::id(),
            ]);

            BankTransaction::create([
                'bank_account_id' => $toBank->id,
                'transaction_date' => $validated['transfer_date'],
                'transaction_type' => 'credit',
                'amount' => $validated['amount'],
                'description' => $inDescription,
                'reference_type' => 'bank_transfer',
                'reference_id' => null,
                'created_by' => Auth::id(),
            ]);

            \DB::commit();

            return redirect()
                ->route('admin-keuangan.bank-balance.index')
                ->with('success', 'Bank transfer has been recorded.');
        } catch (\Throwable $th) {
            \DB::rollBack();

            return back()
                ->withErrors(['error' => 'Failed to record bank transfer: ' . $th->getMessage()])
                ->withInput();
        }
    }

    /**
     * Export bank transactions to PDF (simple Courier template).
     */
    public function exportPdf(BankAccount $bank)
    {
        $bank->load(['balances' => function ($query) {
            $query->orderBy('period_month', 'asc');
        }]);

        $transactions = $bank->transactions()
            ->orderBy('transaction_date', 'asc')
            ->orderBy('created_at', 'asc')
            ->get();

        $openingBalance = (float) ($bank->balances->first()->opening_balance ?? 0);
        $generatedAt = now();

        $pdf = Pdf::loadView('admin.admin-keuangan.bank-balance.pdf', [
            'bank' => $bank,
            'transactions' => $transactions,
            'openingBalance' => $openingBalance,
            'generatedAt' => $generatedAt,
        ])->setPaper('a4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isPhpEnabled' => true,
        ]);

        $filename = 'BankStatement_' . preg_replace('/\s+/', '_', $bank->bank_name) . '_' . $bank->account_number . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Catat setoran modal: tambah transaksi kredit bank dan adjustment modal disetor (3200).
     */
    public function capitalDeposit(Request $request, BankAccount $bank)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:0.01',
            'transaction_date' => 'required|date|before_or_equal:today',
            'notes' => 'nullable|string|max:500',
        ]);

        $modalAccountId = ChartOfAccount::idByCode('3100');
        if (!$modalAccountId) {
            return back()->withErrors(['error' => 'Paid-in capital account (3100) was not found. Please configure Chart of Accounts.']);
        }

        try {
            \DB::beginTransaction();

            $bankTransaction = BankTransaction::create([
                'bank_account_id' => $bank->id,
                'transaction_date' => $validated['transaction_date'],
                'transaction_type' => 'credit',
                'amount' => $validated['amount'],
                'description' => 'Setor Modal: ' . ($validated['notes'] ?? 'Modal disetor'),
                'reference_type' => 'capital_deposit',
                'reference_id' => null,
                'created_by' => Auth::id(),
            ]);
            EquityEntry::create([
                'entry_type' => 'paid_in_capital',
                'account_id' => $modalAccountId,
                'entry_date' => $validated['transaction_date'],
                'amount' => $validated['amount'],
                'direction' => 'increase',
                'is_opening' => false,
                'affects_bank' => true,
                'bank_account_id' => $bank->id,
                'bank_transaction_id' => $bankTransaction->id,
                'bank_transaction_type' => $bankTransaction->transaction_type,
                'status' => 'settled',
                'settled_at' => $validated['transaction_date'],
                'reference' => null,
                'notes' => 'Capital deposit via bank ' . $bank->bank_name . ' - ' . ($validated['notes'] ?? 'Paid-in capital'),
                'created_by' => Auth::id(),
            ]);

            \DB::commit();

            return redirect()
                ->route('admin-keuangan.bank-balance.show', $bank->id)
                ->with('success', 'Paid-in capital deposit has been recorded.');
        } catch (\Throwable $th) {
            \DB::rollBack();

            return back()->withErrors(['error' => 'Failed to record paid-in capital deposit: ' . $th->getMessage()]);
        }
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
