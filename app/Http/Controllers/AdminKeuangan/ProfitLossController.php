<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\ProfitLossPeriod;
use App\Models\ChartOfAccount;
use App\Models\ProfitLossEntry;
use App\Models\EmployeeSalary;
use App\Models\EquipmentTransaction;
use App\Models\PrepaidRentTransaction;
use App\Models\SupplyTransaction;
use App\Models\GeneralExpense;
use App\Models\SalesOrder;
use App\Models\Invoice;
use App\Models\BankAccount;
use App\Models\BankTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class ProfitLossController extends Controller
{
    public function index(Request $request)
    {
        $query = ProfitLossPeriod::with(['creator', 'approver'])
            ->orderBy('start_date', 'desc');

        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        if (!$startDate && !$endDate) {
            $startDate = now()->startOfMonth()->toDateString();
            $endDate = now()->endOfMonth()->toDateString();
        }

        if ($startDate && $endDate) {
            $query->whereDate('start_date', '>=', $startDate)
                ->whereDate('end_date', '<=', $endDate);
        }

        $periods = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Index', [
            'periods' => $periods,
            'stats' => $this->getStats(),
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
                'page' => $request->query('page'),
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Create');
    }

    public function store(Request $request)
    {
        \Log::info('Profit Loss Period Store - Request Started', [
            'request_data' => $request->all(),
            'user_id' => Auth::id()
        ]);

        $request->validate([
            'period_name' => 'required|string|max:255',
            'period_type' => 'required|in:monthly,quarterly,yearly',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $period_code = $this->generatePeriodCode($request->period_type, $request->start_date);

            \Log::info('Profit Loss Period Store - Creating Period', [
                'period_code' => $period_code,
                'period_name' => $request->period_name
            ]);

            $period = ProfitLossPeriod::create([
                'period_code' => $period_code,
                'period_name' => $request->period_name,
                'period_type' => $request->period_type,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'notes' => $request->notes,
                'created_by' => Auth::id(),
            ]);

            \Log::info('Profit Loss Period Store - Period Created', [
                'period_id' => $period->id,
                'period_code' => $period->period_code
            ]);

            \Log::info('Profit Loss Period Store - Starting Auto Generate Entries');
            $this->autoGenerateEntries($period);
            \Log::info('Profit Loss Period Store - Auto Generate Entries Completed');

            DB::commit();

            \Log::info('Profit Loss Period Store - Success', [
                'period_id' => $period->id,
                'redirect_to' => route('admin-keuangan.profit-loss.show', $period)
            ]);

            return redirect()->route('admin-keuangan.profit-loss.show', $period)
                           ->with('success', 'Periode laporan laba rugi berhasil dibuat');

        } catch (\Exception $e) {
            DB::rollback();

            \Log::error('Profit Loss Period Store - Error', [
                'error_message' => $e->getMessage(),
                'error_line' => $e->getLine(),
                'error_file' => $e->getFile(),
                'stack_trace' => $e->getTraceAsString(),
                'user_id' => Auth::id()
            ]);

            return redirect()->back()
                           ->withErrors(['error' => 'Gagal membuat periode: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    public function show(Request $request, ProfitLossPeriod $profitLoss)
    {
        $period = $profitLoss->load(['creator', 'approver']);
        $reportData = $period->getReportData();
        
        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Show', [
            'period' => $period,
            'reportData' => $reportData,
            'accounts' => ChartOfAccount::getAccountsByType(),
            'bankAccounts' => BankAccount::all(['id', 'bank_name', 'account_number', 'account_name']),
            'returnQuery' => $this->resolveIndexQuery($request),
        ]);
    }

    public function edit(Request $request, ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode yang sudah ditutup tidak dapat diedit']);
        }

        $period = $profitLoss->load(['entries.account']);
        $accounts = ChartOfAccount::active()->ordered()->get();
        
        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Edit', [
            'period' => $period,
            'accounts' => $accounts,
            'returnQuery' => $this->resolveIndexQuery($request),
        ]);
    }

    public function update(Request $request, ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode yang sudah ditutup tidak dapat diedit']);
        }

        $request->validate([
            'period_name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $profitLoss->update([
                'period_name' => $request->period_name,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'notes' => $request->notes,
            ]);

            $profitLoss->calculateTotals();
            
            DB::commit();
            
            return redirect()->route('admin-keuangan.profit-loss.show', [
                'profitLoss' => $profitLoss->id,
                ...$this->resolveIndexQuery($request),
            ])
                           ->with('success', 'Periode berhasil diperbarui');
                           
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()
                           ->withErrors(['error' => 'Gagal memperbarui periode: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    public function destroy(Request $request, ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode yang sudah finalisasi tidak dapat dihapus']);
        }

        DB::beginTransaction();
        try {
            $profitLoss->entries()->delete();
            $profitLoss->delete();
            
            DB::commit();
            
            return redirect()->route('admin-keuangan.profit-loss.index', $this->resolveIndexQuery($request))
                           ->with('success', 'Periode berhasil dihapus');
                           
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Gagal menghapus periode: ' . $e->getMessage()]);
        }
    }

    public function finalize(ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode sudah finalisasi']);
        }

        DB::beginTransaction();
        try {
            // Blokir jika masih ada SO di periode ini yang belum diinvoice atau belum diposting ke P&L
            $start = $profitLoss->start_date->startOfDay();
            $end = $profitLoss->end_date->endOfDay();

            $blockingOrders = SalesOrder::whereBetween('so_date', [$start, $end])
                ->where(function ($q) {
                    $q->doesntHave('invoices')
                        ->orWhereHas('invoices', function ($iq) {
                            $iq->where(function ($qq) {
                                $qq->whereNull('posted_to_profit_loss')
                                    ->orWhere('posted_to_profit_loss', false);
                            });
                        });
                })
                ->pluck('order_number')
                ->toArray();

            if (!empty($blockingOrders)) {
                return redirect()->back()->withErrors([
                    'error' => 'Periode tidak bisa di-close. SO berikut belum di-invoice/posted ke P&L: ' . implode(', ', $blockingOrders)
                ]);
            }

            $profitLoss->calculateTotals();
            
            $profitLoss->update([
                'status' => 'closed',
                'approved_by' => Auth::id(),
                'approved_at' => now(),
            ]);
            
            DB::commit();
            
            return redirect()->back()->with('success', 'Periode berhasil difinalisasi');
            
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Gagal finalisasi periode: ' . $e->getMessage()]);
        }
    }

    private function resolveIndexQuery(Request $request): array
    {
        return collect([
            'start_date' => $request->query('start_date'),
            'end_date' => $request->query('end_date'),
            'page' => $request->query('page'),
        ])->filter(fn ($value) => $value !== null && $value !== '')
            ->toArray();
    }

    public function addEntry(Request $request, ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode sudah finalisasi']);
        }

        $request->validate([
            'account_id' => 'required|exists:chart_of_accounts,id',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'transaction_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($profitLoss) {
                    if (!$this->isDateWithinPeriod($profitLoss, (string) $value)) {
                        $fail(sprintf(
                            'Tanggal transaksi harus berada dalam periode %s (%s s/d %s).',
                            $profitLoss->period_name,
                            $profitLoss->start_date?->format('d/m/Y'),
                            $profitLoss->end_date?->format('d/m/Y')
                        ));
                    }
                },
            ],
            'notes' => 'nullable|string',
            'bank_account_id' => 'nullable|exists:bank_accounts,id',
            'bank_transaction_type' => 'nullable|in:credit,debit',
        ]);

        DB::beginTransaction();
        try {
            $account = ChartOfAccount::find($request->account_id);
            if (!$account || !in_array($account->account_type, ['revenue', 'expense'], true)) {
                return redirect()->back()->withErrors(['error' => 'Akun penyesuaian harus bertipe revenue atau expense.']);
            }

            if ($request->filled('bank_account_id') && !$request->filled('bank_transaction_type')) {
                return redirect()->back()->withErrors(['error' => 'Tipe transaksi bank wajib dipilih']);
            }

            $entry = ProfitLossEntry::create([
                'period_id' => $profitLoss->id,
                'account_id' => $request->account_id,
                'description' => $request->description,
                'amount' => $request->amount,
                'entry_type' => 'manual',
                'transaction_date' => $request->transaction_date,
                'notes' => $request->notes,
                'created_by' => Auth::id(),
            ]);

            if ($request->filled('bank_account_id') && $request->filled('bank_transaction_type')) {
                $bankTransaction = BankTransaction::create([
                    'bank_account_id' => $request->bank_account_id,
                    'transaction_date' => $request->transaction_date,
                    'transaction_type' => $request->bank_transaction_type,
                    'amount' => $request->amount,
                    'description' => 'Income Statement Adjustment - ' . $request->description,
                    'reference_type' => 'profit_loss_adjustment',
                    'reference_id' => $entry->id,
                    'created_by' => Auth::id(),
                ]);

                $entry->update([
                    'additional_data' => array_merge($entry->additional_data ?? [], [
                        'bank_transaction_id' => $bankTransaction->id,
                        'bank_account_id' => $bankTransaction->bank_account_id,
                        'bank_transaction_type' => $bankTransaction->transaction_type,
                    ]),
                ]);
            }

            $profitLoss->calculateTotals();
            
            DB::commit();

            Log::info('ProfitLoss manual entry created', [
                'period_id' => $profitLoss->id,
                'entry_id' => $entry->id,
                'user_id' => Auth::id(),
                'bank_account_id' => $request->bank_account_id,
                'bank_transaction_type' => $request->bank_transaction_type,
            ]);
            return redirect()->back()->with('success', 'Entry berhasil ditambahkan');
            
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Gagal menambahkan entry: ' . $e->getMessage()]);
        }
    }

    public function updateEntry(Request $request, ProfitLossEntry $entry)
    {
        if ($entry->period->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode sudah finalisasi']);
        }

        $request->validate([
            'account_id' => 'required|exists:chart_of_accounts,id',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'transaction_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($entry) {
                    if (!$this->isDateWithinPeriod($entry->period, (string) $value)) {
                        $fail(sprintf(
                            'Tanggal transaksi harus berada dalam periode %s (%s s/d %s).',
                            $entry->period->period_name,
                            $entry->period->start_date?->format('d/m/Y'),
                            $entry->period->end_date?->format('d/m/Y')
                        ));
                    }
                },
            ],
            'notes' => 'nullable|string',
            'bank_account_id' => 'nullable|exists:bank_accounts,id',
            'bank_transaction_type' => 'nullable|in:credit,debit',
        ]);

        DB::beginTransaction();
        try {
            $account = ChartOfAccount::find($request->account_id);
            if (!$account || !in_array($account->account_type, ['revenue', 'expense'], true)) {
                return redirect()->back()->withErrors(['error' => 'Akun penyesuaian harus bertipe revenue atau expense.']);
            }

            if ($request->filled('bank_account_id') && !$request->filled('bank_transaction_type')) {
                return redirect()->back()->withErrors(['error' => 'Tipe transaksi bank wajib dipilih']);
            }

            $entry->update([
                'account_id' => $request->account_id,
                'description' => $request->description,
                'amount' => $request->amount,
                'transaction_date' => $request->transaction_date,
                'notes' => $request->notes,
            ]);

            $additional = $entry->additional_data ?? [];
            $existingBankId = $additional['bank_transaction_id'] ?? null;

            if ($request->filled('bank_account_id') && $request->filled('bank_transaction_type')) {
                if ($existingBankId) {
                    $bankTransaction = BankTransaction::find($existingBankId);
                    if ($bankTransaction) {
                        $bankTransaction->update([
                            'bank_account_id' => $request->bank_account_id,
                            'transaction_date' => $request->transaction_date,
                            'transaction_type' => $request->bank_transaction_type,
                            'amount' => $request->amount,
                            'description' => 'Income Statement Adjustment - ' . $request->description,
                        ]);
                    }
                } else {
                    $bankTransaction = BankTransaction::create([
                        'bank_account_id' => $request->bank_account_id,
                        'transaction_date' => $request->transaction_date,
                        'transaction_type' => $request->bank_transaction_type,
                        'amount' => $request->amount,
                        'description' => 'Income Statement Adjustment - ' . $request->description,
                        'reference_type' => 'profit_loss_adjustment',
                        'reference_id' => $entry->id,
                        'created_by' => Auth::id(),
                    ]);
                    $additional['bank_transaction_id'] = $bankTransaction->id;
                }

                $additional['bank_account_id'] = $request->bank_account_id;
                $additional['bank_transaction_type'] = $request->bank_transaction_type;
                $entry->update(['additional_data' => $additional]);
            } elseif ($existingBankId) {
                BankTransaction::where('id', $existingBankId)->delete();
                unset($additional['bank_transaction_id'], $additional['bank_account_id'], $additional['bank_transaction_type']);
                $entry->update(['additional_data' => $additional]);
            }

            $entry->period->calculateTotals();
            
            DB::commit();

            Log::info('ProfitLoss manual entry updated', [
                'entry_id' => $entry->id,
                'user_id' => Auth::id(),
                'bank_account_id' => $request->bank_account_id,
                'bank_transaction_type' => $request->bank_transaction_type,
            ]);
            return redirect()->back()->with('success', 'Entry berhasil diperbarui');
            
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Gagal memperbarui entry: ' . $e->getMessage()]);
        }
    }

    public function deleteEntry(ProfitLossEntry $entry)
    {
        if ($entry->period->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode sudah finalisasi']);
        }

        if ($entry->entry_type !== 'manual') {
            return redirect()->back()->withErrors(['error' => 'Hanya entry manual yang bisa dihapus']);
        }

        DB::beginTransaction();
        try {
            $period = $entry->period;
            $bankTransactionId = data_get($entry->additional_data, 'bank_transaction_id');
            if ($bankTransactionId) {
                BankTransaction::where('id', $bankTransactionId)->delete();
            }
            $entry->delete();
            
            $period->calculateTotals();
            
            DB::commit();

            Log::info('ProfitLoss manual entry deleted', [
                'entry_id' => $entry->id,
                'user_id' => Auth::id(),
                'bank_transaction_id' => $bankTransactionId,
            ]);
            return redirect()->back()->with('success', 'Entry berhasil dihapus');
            
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Gagal menghapus entry: ' . $e->getMessage()]);
        }
    }

    public function regenerateEntries(ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode sudah finalisasi']);
        }

        DB::beginTransaction();
        try {
            $summary = $this->autoGenerateEntries($profitLoss);

            // Recalculate totals to ensure manual entries are included
            $profitLoss->calculateTotals();

            // Warn if there are manual entries with non revenue/expense accounts
            $invalidManualEntries = $profitLoss->entries()
                ->with('account')
                ->where('entry_type', 'manual')
                ->get()
                ->filter(function ($entry) {
                    return !$entry->account || !in_array($entry->account->account_type, ['revenue', 'expense'], true);
                });

            if ($invalidManualEntries->isNotEmpty()) {
                \Log::warning('ProfitLoss manual entries with non revenue/expense accounts', [
                    'period_id' => $profitLoss->id,
                    'entry_ids' => $invalidManualEntries->pluck('id')->values()->all(),
                ]);
            }
            
            DB::commit();
            
            $totalCreated = $summary['total_new'] ?? 0;
            $message = $totalCreated > 0
                ? "Sinkronisasi selesai. {$totalCreated} entry baru ditambahkan atau diperbarui."
                : 'Sinkronisasi selesai. Tidak ada entry baru yang perlu ditambahkan.';

            if (isset($invalidManualEntries) && $invalidManualEntries->isNotEmpty()) {
                $message .= ' Perhatian: ada penyesuaian manual yang tidak terhitung karena akun bukan revenue/expense.';
            }
            
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Gagal regenerate entries: ' . $e->getMessage()]);
        }
    }

    private function generatePeriodCode($type, $startDate): string
    {
        return app(\App\Services\ProfitLossPeriodService::class)
            ->generatePeriodCode((string) $type, $startDate);
    }

    private function autoGenerateEntries(ProfitLossPeriod $period): array
    {
        return app(\App\Services\ProfitLossPeriodService::class)
            ->generateEntries($period, Auth::id());
    }

    private function isDateWithinPeriod(ProfitLossPeriod $period, string $date): bool
    {
        $transactionDate = Carbon::parse($date)->startOfDay();
        $periodStart = $period->start_date?->copy()->startOfDay();
        $periodEnd = $period->end_date?->copy()->endOfDay();

        if (!$periodStart || !$periodEnd) {
            return false;
        }

        return $transactionDate->betweenIncluded($periodStart, $periodEnd);
    }

    /**
     * Export profit loss report to PDF
     */
    public function exportPdf(ProfitLossPeriod $profitLoss)
    {
        $period = $profitLoss->load(['creator', 'approver']);
        $reportData = $period->getReportData();

        // Get additional financial information
        $financialInfo = $this->getFinancialInfo();

        $isPreview = request()->boolean('preview');

        $pdf = Pdf::loadView('admin.admin-keuangan.reports.profit-loss-pdf', [
            'period' => $period,
            'reportData' => $reportData,
            'financialInfo' => $financialInfo,
            'generatedAt' => now()
        ])
        ->setPaper('a4', 'portrait');

        $fileName = 'Laporan_Laba_Rugi_' . str_replace(' ', '_', $period->period_name) . '_' . now()->format('Y-m-d') . '.pdf';

        return $isPreview
            ? $pdf->stream($fileName)
            : $pdf->download($fileName);
    }

    private function getStats(): array
    {
        $currentMonth = now()->format('Y-m');
        $lastMonth = now()->subMonth()->format('Y-m');

        $currentPeriod = ProfitLossPeriod::where('period_code', 'like', 'PL-M-' . $currentMonth . '%')->first();
        $lastPeriod = ProfitLossPeriod::where('period_code', 'like', 'PL-M-' . $lastMonth . '%')->first();

        return [
            'total_periods' => ProfitLossPeriod::count(),
            'closed_periods' => ProfitLossPeriod::where('status', 'closed')->count(),
            'current_revenue' => $currentPeriod?->total_revenue ?? 0,
            'current_profit' => $currentPeriod?->net_profit ?? 0,
            'last_revenue' => $lastPeriod?->total_revenue ?? 0,
            'last_profit' => $lastPeriod?->net_profit ?? 0,
        ];
    }

    private function getFinancialInfo(): array
    {
        // Get bank balances breakdown
        $mandiriBank = \App\Models\BankAccount::getMandiri();
        $bcaBank = \App\Models\BankAccount::getBCA();

        $mandiriBalance = $mandiriBank ? $mandiriBank->getCurrentBalance() : 0;
        $bcaBalance = $bcaBank ? $bcaBank->getCurrentBalance() : 0;
        $totalBankBalance = $mandiriBalance + $bcaBalance;

        // Get latest petty cash balance (keep for backward compatibility)
        $latestPettyCashBalance = \App\Models\PettyCashBalance::latest('balance_date')->first();

        // Get total outstanding receivables
        $totalReceivables = \App\Models\AccountReceivable::where('status', '!=', 'paid')
                                                        ->sum('outstanding_amount');

        // Get total outstanding payables
        $totalPayables = \App\Models\AccountPayable::where('status', '!=', 'paid')
                                                   ->sum('outstanding_amount');

        return [
            // Legacy field for backward compatibility
            'bank_balance' => $latestPettyCashBalance?->closing_balance ?? 0,

            // New bank balance breakdown
            'bank_mandiri_balance' => $mandiriBalance,
            'bank_bca_balance' => $bcaBalance,
            'total_bank_balance' => $totalBankBalance,

            // Existing fields
            'total_receivables' => $totalReceivables ?? 0,
            'total_payables' => $totalPayables ?? 0,
        ];
    }
}
