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

    public function show(ProfitLossPeriod $profitLoss)
    {
        $period = $profitLoss->load(['creator', 'approver']);
        $reportData = $period->getReportData();
        
        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Show', [
            'period' => $period,
            'reportData' => $reportData,
            'accounts' => ChartOfAccount::getAccountsByType(),
            'bankAccounts' => BankAccount::all(['id', 'bank_name', 'account_number', 'account_name']),
        ]);
    }

    public function edit(ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode yang sudah ditutup tidak dapat diedit']);
        }

        $period = $profitLoss->load(['entries.account']);
        $accounts = ChartOfAccount::active()->ordered()->get();
        
        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Edit', [
            'period' => $period,
            'accounts' => $accounts
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
            
            return redirect()->route('admin-keuangan.profit-loss.show', $profitLoss)
                           ->with('success', 'Periode berhasil diperbarui');
                           
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()
                           ->withErrors(['error' => 'Gagal memperbarui periode: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    public function destroy(ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode yang sudah finalisasi tidak dapat dihapus']);
        }

        DB::beginTransaction();
        try {
            $profitLoss->entries()->delete();
            $profitLoss->delete();
            
            DB::commit();
            
            return redirect()->route('admin-keuangan.profit-loss.index')
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

    public function addEntry(Request $request, ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode sudah finalisasi']);
        }

        $request->validate([
            'account_id' => 'required|exists:chart_of_accounts,id',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'notes' => 'nullable|string',
            'bank_account_id' => 'nullable|exists:bank_accounts,id',
            'bank_transaction_type' => 'nullable|in:credit,debit',
        ]);

        DB::beginTransaction();
        try {
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
            'transaction_date' => 'required|date',
            'notes' => 'nullable|string',
            'bank_account_id' => 'nullable|exists:bank_accounts,id',
            'bank_transaction_type' => 'nullable|in:credit,debit',
        ]);

        DB::beginTransaction();
        try {
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
            
            DB::commit();
            
            $totalCreated = $summary['total_new'] ?? 0;
            $message = $totalCreated > 0
                ? "Sinkronisasi selesai. {$totalCreated} entry baru ditambahkan atau diperbarui."
                : 'Sinkronisasi selesai. Tidak ada entry baru yang perlu ditambahkan.';
            
            return redirect()->back()->with('success', $message);
            
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()->withErrors(['error' => 'Gagal regenerate entries: ' . $e->getMessage()]);
        }
    }

    private function generatePeriodCode($type, $startDate): string
    {
        $date = Carbon::parse($startDate);
        
        return match($type) {
            'monthly' => 'PL-M-' . $date->format('Y-m'),
            'quarterly' => 'PL-Q-' . $date->format('Y') . '-Q' . $date->quarter,
            'yearly' => 'PL-Y-' . $date->format('Y'),
            default => 'PL-' . $date->format('Y-m-d')
        };
    }

    private function autoGenerateEntries(ProfitLossPeriod $period): array
    {
        $startDate = $period->start_date;
        $endDate = $period->end_date;
        $summary = [
            'sales_orders' => 0,
            'petty_cash' => 0,
            'employee_salaries' => 0,
            'other_incomes' => 0,
            'prepaid_rent' => 0,
            'equipment' => 0,
        ];

        // Revenue: gunakan profit shipment (gross revenue - operational costs) dari invoice yang posted ke P&L
        ProfitLossEntry::where('period_id', $period->id)
            ->whereIn('entry_type', ['auto_invoice', 'auto_so'])
            ->delete();

        $invoiceGroups = Invoice::with('items')
            ->whereBetween('invoice_date', [$startDate, $endDate])
            ->where('posted_to_profit_loss', true)
            ->get()
            ->groupBy('sales_order_id');

        $salesOrders = SalesOrder::whereIn('id', $invoiceGroups->keys())
            ->get()
            ->keyBy('id');

        $validSalesOrderIds = [];

        foreach ($invoiceGroups as $salesOrderId => $invoices) {
            $salesOrder = $salesOrders->get($salesOrderId);
            if (!$salesOrder) {
                continue;
            }

            $grossRevenue = $invoices->sum(function ($invoice) {
                return $invoice->calculateGrossRevenue();
            });
            $operationalCosts = $invoices->sum(function ($invoice) {
                return $invoice->calculateOperationalCosts();
            });

            if ($grossRevenue == 0 && $operationalCosts == 0) {
                continue;
            }

            $latestInvoiceDate = $invoices->max(function ($invoice) {
                return $invoice->invoice_date?->format('Y-m-d') ?? $invoice->created_at->format('Y-m-d');
            });

            $entry = ProfitLossEntry::createFromShipmentProfit($salesOrder, $period->id, Auth::id(), [
                'gross_revenue' => $grossRevenue,
                'operational_costs' => $operationalCosts,
                'profit' => $grossRevenue - $operationalCosts,
                'invoice_ids' => $invoices->pluck('id')->all(),
                'transaction_date' => $latestInvoiceDate,
            ]);

            if ($entry?->wasRecentlyCreated) {
                $summary['sales_orders']++;
            }

            $validSalesOrderIds[] = $salesOrder->id;
        }

        if (!empty($validSalesOrderIds)) {
            ProfitLossEntry::where('period_id', $period->id)
                ->where('entry_type', 'auto_shipment_profit')
                ->whereNotIn('reference_id', $validSalesOrderIds)
                ->delete();
        }

        if (class_exists('App\Models\PettyCashTransaction')) {
            $pettyCashTransactions = app('App\Models\PettyCashTransaction')
                ->with('category')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->where('status', 'approved')
                ->get();

            \Log::info('Auto Generate - Processing Petty Cash Transactions', [
                'count' => $pettyCashTransactions->count()
            ]);

            foreach ($pettyCashTransactions as $pct) {
                $entry = ProfitLossEntry::createFromPettyCash($pct, $period->id, Auth::id());
                if (!$entry) {
                    \Log::warning('Petty Cash entry skipped (no category)', [
                        'petty_cash_id' => $pct->id
                    ]);
                    continue;
                }

                if ($entry->wasRecentlyCreated) {
                    $summary['petty_cash']++;
                }
            }
        }

        $employeeSalaries = EmployeeSalary::whereBetween('salary_date', [$startDate, $endDate])
                                        ->where('status', 'paid')
                                        ->get();

        foreach ($employeeSalaries as $salary) {
            $entry = ProfitLossEntry::createFromEmployeeSalary($salary, $period->id, Auth::id());
            if ($entry?->wasRecentlyCreated) {
                $summary['employee_salaries']++;
            }
        }

        if (class_exists(PrepaidRentTransaction::class)) {
            $amortizations = PrepaidRentTransaction::where('transaction_type', 'amortization')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->get();

            foreach ($amortizations as $transaction) {
                $entry = ProfitLossEntry::createFromPrepaidRent($transaction, $period->id, Auth::id());
                if ($entry?->wasRecentlyCreated) {
                    $summary['prepaid_rent']++;
                }
            }
        }

        // Equipment depreciation does not flow into Profit & Loss (handled in Financial Position)

        // General Expenses (approved)
        if (class_exists(GeneralExpense::class)) {
            $generalExpenses = GeneralExpense::whereBetween('expense_date', [$startDate, $endDate])
                ->where('status', 'approved')
                ->get();

            foreach ($generalExpenses as $expense) {
                $entry = ProfitLossEntry::createFromGeneralExpense($expense, $period->id, Auth::id());
                if ($entry?->wasRecentlyCreated) {
                    $summary['general_expense'] = ($summary['general_expense'] ?? 0) + 1;
                }
            }
        }

        // Supplies usage/depreciation -> expense
        if (class_exists(SupplyTransaction::class)) {
            $supplies = SupplyTransaction::whereIn('transaction_type', ['usage', 'depreciation'])
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->get();

            foreach ($supplies as $supply) {
                $entry = ProfitLossEntry::createFromSupplyTransaction($supply, $period->id, Auth::id());
                if ($entry?->wasRecentlyCreated) {
                    $summary['supplies'] = ($summary['supplies'] ?? 0) + 1;
                }
            }
        }

        // Supplies topup/purchase -> expense
        if (class_exists(SupplyTransaction::class)) {
            $supplyTopups = SupplyTransaction::where('transaction_type', 'topup')
                ->where('source_type', '!=', 'opening_balance')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->get();

            foreach ($supplyTopups as $topup) {
                $entry = ProfitLossEntry::createFromSupplyTopup($topup, $period->id, Auth::id());
                if ($entry?->wasRecentlyCreated) {
                    $summary['supplies_purchase'] = ($summary['supplies_purchase'] ?? 0) + 1;
                }
            }
        }

        // Generate entries from Other Income (Pendapatan Lain-lain)
        if (class_exists('App\Models\OtherIncome')) {
            $otherIncomes = app('App\Models\OtherIncome')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->where('posted_to_profit_loss', true)
                ->get();

            foreach ($otherIncomes as $income) {
                $entry = ProfitLossEntry::createFromOtherIncome($income, $period->id, Auth::id());
                if ($entry?->wasRecentlyCreated) {
                    $summary['other_incomes']++;
                }
            }
        }

        $period->calculateTotals();

        $summary['total_new'] = array_sum($summary);

        return $summary;
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
