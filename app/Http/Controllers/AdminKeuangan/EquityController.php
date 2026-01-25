<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\BankAccount;
use App\Models\BankTransaction;
use App\Models\AccountPayable;
use App\Models\AccountReceivable;
use App\Models\ChartOfAccount;
use App\Models\EquityEntry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EquityController extends Controller
{
    public function index(Request $request)
    {
        $filters = $request->only(['type', 'status', 'start_date', 'end_date', 'opening']);

        $entries = EquityEntry::query()
            ->with(['bankAccount', 'account', 'creator'])
            ->when($filters['type'] ?? null, function ($query, $type) {
                $query->where('entry_type', $type);
            })
            ->when($filters['status'] ?? null, function ($query, $status) {
                $query->where('status', $status);
            })
            ->when($filters['start_date'] ?? null, function ($query, $date) {
                $query->whereDate('entry_date', '>=', $date);
            })
            ->when($filters['end_date'] ?? null, function ($query, $date) {
                $query->whereDate('entry_date', '<=', $date);
            })
            ->when(isset($filters['opening']) && $filters['opening'] !== '', function ($query) use ($filters) {
                $query->where('is_opening', (bool) $filters['opening']);
            })
            ->orderByDesc('entry_date')
            ->orderByDesc('created_at')
            ->paginate(15)
            ->withQueryString();

        $summary = EquityEntry::query()
            ->select('entry_type', DB::raw('COUNT(*) as entries_count'), DB::raw('SUM(amount) as total_amount'))
            ->groupBy('entry_type')
            ->get();

        $openingReceivables = AccountReceivable::query()
            ->with('customer')
            ->where('is_opening', true)
            ->orderByDesc('invoice_date')
            ->limit(10)
            ->get();

        $openingPayables = AccountPayable::query()
            ->with('vendor')
            ->where('is_opening', true)
            ->orderByDesc('vendor_invoice_date')
            ->limit(10)
            ->get();

        $openingSummary = [
            'receivables_total' => (float) AccountReceivable::where('is_opening', true)->sum('outstanding_amount'),
            'payables_total' => (float) AccountPayable::where('is_opening', true)->sum('outstanding_amount'),
            'receivables_count' => (int) AccountReceivable::where('is_opening', true)->count(),
            'payables_count' => (int) AccountPayable::where('is_opening', true)->count(),
        ];

        return Inertia::render('Admin/AdminKeuangan/Equity/Index', [
            'entries' => $entries,
            'filters' => $filters,
            'typeOptions' => EquityEntry::typeOptions(),
            'summary' => $summary,
            'openingReceivables' => $openingReceivables,
            'openingPayables' => $openingPayables,
            'openingSummary' => $openingSummary,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/Equity/Create', [
            'typeOptions' => EquityEntry::typeOptions(),
            'bankAccounts' => BankAccount::active()->get(['id', 'bank_name', 'account_number', 'account_name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'entry_type' => 'required|string',
            'employee_name' => 'nullable|string|max:255',
            'entry_date' => 'required|date',
            'payment_date' => 'nullable|date',
            'amount' => 'required|numeric|min:0.01',
            'reference' => 'nullable|string|max:255',
            'notes' => 'nullable|string|max:2000',
            'is_opening' => 'boolean',
            'affects_bank' => 'boolean',
            'bank_account_id' => 'nullable|exists:bank_accounts,id',
        ]);

        $config = EquityEntry::resolveTypeConfig($validated['entry_type']);
        if (!$config) {
            return back()->withErrors(['entry_type' => 'Invalid equity type.'])->withInput();
        }

        if (in_array($validated['entry_type'], ['management_loan', 'management_loan_repayment'], true)
            && empty($validated['employee_name'])) {
            return back()->withErrors(['employee_name' => 'Employee name is required for this equity type.'])->withInput();
        }

        if ($validated['entry_type'] === 'management_loan_repayment' && empty($validated['payment_date'])) {
            return back()->withErrors(['payment_date' => 'Payment date is required for employee receivable payments.'])->withInput();
        }

        if (!$config['bank_allowed']) {
            $validated['affects_bank'] = false;
            $validated['bank_account_id'] = null;
        }

        $accountId = $config['account_code'] ? ChartOfAccount::idByCode($config['account_code']) : null;
        if ($config['account_code'] && !$accountId) {
            return back()->withErrors(['entry_type' => 'Chart of account is missing for this equity type.'])->withInput();
        }

        $direction = $config['direction'] ?? 'increase';

        if (!empty($validated['affects_bank']) && empty($validated['bank_account_id'])) {
            return back()->withErrors(['bank_account_id' => 'Bank account is required when affecting bank balance.'])->withInput();
        }

        try {
            DB::beginTransaction();

            if ($validated['entry_type'] === 'annual_closing') {
                $closingAmount = (float) $validated['amount'];
                $closingDate = $validated['entry_date'];
                $notes = trim((string) ($validated['notes'] ?? ''));

                $retainedAccountId = ChartOfAccount::idByCode('3200');
                $currentAccountId = ChartOfAccount::idByCode('3300');

                if (!$retainedAccountId || !$currentAccountId) {
                    DB::rollBack();
                    return back()->withErrors(['entry_type' => 'Retained earnings or current year profit account is missing.'])->withInput();
                }

                EquityEntry::create([
                    'entry_type' => 'retained_earnings',
                    'account_id' => $retainedAccountId,
                    'entry_date' => $closingDate,
                    'amount' => $closingAmount,
                    'direction' => 'increase',
                    'is_opening' => (bool) ($validated['is_opening'] ?? false),
                    'affects_bank' => false,
                    'status' => 'recorded',
                    'reference' => $validated['reference'] ?? null,
                    'notes' => $notes !== '' ? $notes : 'Annual closing transfer from current year profit.',
                    'created_by' => Auth::id(),
                ]);

                EquityEntry::create([
                    'entry_type' => 'current_year_profit',
                    'account_id' => $currentAccountId,
                    'entry_date' => $closingDate,
                    'amount' => $closingAmount,
                    'direction' => 'decrease',
                    'is_opening' => (bool) ($validated['is_opening'] ?? false),
                    'affects_bank' => false,
                    'status' => 'recorded',
                    'reference' => $validated['reference'] ?? null,
                    'notes' => $notes !== '' ? $notes : 'Annual closing transfer to retained earnings.',
                    'created_by' => Auth::id(),
                ]);

                DB::commit();

                return redirect()
                    ->route('admin-keuangan.equity.index')
                    ->with('success', 'Annual closing entries have been recorded.');
            }

            $entry = EquityEntry::create([
                'entry_type' => $validated['entry_type'],
                'employee_name' => $validated['employee_name'] ?? null,
                'account_id' => $accountId,
                'entry_date' => $validated['entry_date'],
                'payment_date' => $validated['payment_date'] ?? null,
                'amount' => (float) $validated['amount'],
                'direction' => $direction,
                'is_opening' => (bool) ($validated['is_opening'] ?? false),
                'affects_bank' => (bool) ($validated['affects_bank'] ?? false),
                'bank_account_id' => $validated['bank_account_id'] ?? null,
                'status' => 'recorded',
                'reference' => $validated['reference'] ?? null,
                'notes' => $validated['notes'] ?? null,
                'created_by' => Auth::id(),
            ]);

            if (!empty($validated['affects_bank'])) {
                $bankTransactionType = $config['bank_transaction_type'] ?? 'credit';
                $transactionDate = $validated['payment_date'] ?? $validated['entry_date'];
                $description = $this->buildBankDescription($validated['entry_type'], $validated['notes'] ?? null);

                $bankTransaction = BankTransaction::create([
                    'bank_account_id' => $validated['bank_account_id'],
                    'transaction_date' => $transactionDate,
                    'transaction_type' => $bankTransactionType,
                    'amount' => (float) $validated['amount'],
                    'description' => $description,
                    'reference_type' => 'equity_entry',
                    'reference_id' => $entry->id,
                    'created_by' => Auth::id(),
                ]);

                $entry->update([
                    'bank_transaction_id' => $bankTransaction->id,
                    'bank_transaction_type' => $bankTransactionType,
                    'status' => 'settled',
                    'settled_at' => $transactionDate,
                ]);
            }

            DB::commit();

            return redirect()
                ->route('admin-keuangan.equity.index')
                ->with('success', 'Equity entry has been recorded.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Failed to record equity entry: ' . $th->getMessage()])->withInput();
        }
    }

    public function show(EquityEntry $equityEntry)
    {
        $equityEntry->load(['bankAccount', 'account', 'creator', 'bankTransaction']);
        $config = EquityEntry::resolveTypeConfig($equityEntry->entry_type);

        $canSettle = !$equityEntry->affects_bank
            && ($config['bank_allowed'] ?? false)
            && $equityEntry->status !== 'settled';

        return Inertia::render('Admin/AdminKeuangan/Equity/Show', [
            'entry' => $equityEntry,
            'typeConfig' => $config,
            'bankAccounts' => BankAccount::active()->get(['id', 'bank_name', 'account_number', 'account_name']),
            'canSettle' => $canSettle,
        ]);
    }

    public function settle(Request $request, EquityEntry $equityEntry)
    {
        $config = EquityEntry::resolveTypeConfig($equityEntry->entry_type);
        if (!$config || empty($config['bank_allowed'])) {
            return back()->withErrors(['error' => 'This entry cannot be settled through bank.']);
        }

        if ($equityEntry->status === 'settled') {
            return back()->withErrors(['error' => 'This entry has already been settled.']);
        }

        $validated = $request->validate([
            'bank_account_id' => 'required|exists:bank_accounts,id',
            'settlement_date' => 'required|date|before_or_equal:today',
            'notes' => 'nullable|string|max:2000',
        ]);

        try {
            DB::beginTransaction();

            $bankTransactionType = $equityEntry->bank_transaction_type ?: ($config['bank_transaction_type'] ?? 'credit');
            $notes = trim((string) ($validated['notes'] ?? ''));
            $description = $this->buildBankDescription($equityEntry->entry_type, $notes !== '' ? $notes : $equityEntry->notes);

            $bankTransaction = BankTransaction::create([
                'bank_account_id' => $validated['bank_account_id'],
                'transaction_date' => $validated['settlement_date'],
                'transaction_type' => $bankTransactionType,
                'amount' => (float) $equityEntry->amount,
                'description' => $description,
                'reference_type' => 'equity_entry',
                'reference_id' => $equityEntry->id,
                'created_by' => Auth::id(),
            ]);

            $equityEntry->update([
                'affects_bank' => true,
                'bank_account_id' => $validated['bank_account_id'],
                'bank_transaction_id' => $bankTransaction->id,
                'bank_transaction_type' => $bankTransactionType,
                'status' => 'settled',
                'settled_at' => $validated['settlement_date'],
                'notes' => $notes !== '' ? $notes : $equityEntry->notes,
            ]);

            DB::commit();

            return redirect()
                ->route('admin-keuangan.equity.show', $equityEntry->id)
                ->with('success', 'Equity entry has been settled through bank.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Failed to settle equity entry: ' . $th->getMessage()]);
        }
    }

    private function buildBankDescription(string $entryType, ?string $notes): string
    {
        $label = EquityEntry::resolveTypeConfig($entryType)['label'] ?? 'Equity Entry';
        $description = 'Equity: ' . $label;
        $notes = trim((string) $notes);
        if ($notes !== '') {
            $description .= ' - ' . $notes;
        }

        return $description;
    }
}
