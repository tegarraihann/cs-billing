<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\ProfitLossPeriod;
use App\Models\ChartOfAccount;
use App\Models\ProfitLossEntry;
use App\Models\EmployeeSalary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class ProfitLossController extends Controller
{
    public function index()
    {
        $periods = ProfitLossPeriod::with(['creator', 'approver'])
                                 ->orderBy('start_date', 'desc')
                                 ->paginate(10);

        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Index', [
            'periods' => $periods,
            'stats' => $this->getStats()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/ProfitLoss/Create');
    }

    public function store(Request $request)
    {
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
            
            $period = ProfitLossPeriod::create([
                'period_code' => $period_code,
                'period_name' => $request->period_name,
                'period_type' => $request->period_type,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'notes' => $request->notes,
                'created_by' => Auth::id(),
            ]);

            $this->autoGenerateEntries($period);
            
            DB::commit();
            
            return redirect()->route('admin-keuangan.profit-loss.show', $period)
                           ->with('success', 'Periode laporan laba rugi berhasil dibuat');
                           
        } catch (\Exception $e) {
            DB::rollback();
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
            'accounts' => ChartOfAccount::getAccountsByType()
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
            return response()->json(['error' => 'Periode sudah finalisasi'], 400);
        }

        $request->validate([
            'account_id' => 'required|exists:chart_of_accounts,id',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            ProfitLossEntry::create([
                'period_id' => $profitLoss->id,
                'account_id' => $request->account_id,
                'description' => $request->description,
                'amount' => $request->amount,
                'entry_type' => 'manual',
                'transaction_date' => $request->transaction_date,
                'notes' => $request->notes,
                'created_by' => Auth::id(),
            ]);

            $profitLoss->calculateTotals();
            
            DB::commit();
            
            return response()->json(['success' => 'Entry berhasil ditambahkan']);
            
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Gagal menambahkan entry: ' . $e->getMessage()], 500);
        }
    }

    public function updateEntry(Request $request, ProfitLossEntry $entry)
    {
        if ($entry->period->status === 'closed') {
            return response()->json(['error' => 'Periode sudah finalisasi'], 400);
        }

        $request->validate([
            'account_id' => 'required|exists:chart_of_accounts,id',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'transaction_date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        DB::beginTransaction();
        try {
            $entry->update([
                'account_id' => $request->account_id,
                'description' => $request->description,
                'amount' => $request->amount,
                'transaction_date' => $request->transaction_date,
                'notes' => $request->notes,
            ]);

            $entry->period->calculateTotals();
            
            DB::commit();
            
            return response()->json(['success' => 'Entry berhasil diperbarui']);
            
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Gagal memperbarui entry: ' . $e->getMessage()], 500);
        }
    }

    public function deleteEntry(ProfitLossEntry $entry)
    {
        if ($entry->period->status === 'closed') {
            return response()->json(['error' => 'Periode sudah finalisasi'], 400);
        }

        if ($entry->entry_type !== 'manual') {
            return response()->json(['error' => 'Hanya entry manual yang bisa dihapus'], 400);
        }

        DB::beginTransaction();
        try {
            $period = $entry->period;
            $entry->delete();
            
            $period->calculateTotals();
            
            DB::commit();
            
            return response()->json(['success' => 'Entry berhasil dihapus']);
            
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['error' => 'Gagal menghapus entry: ' . $e->getMessage()], 500);
        }
    }

    public function regenerateEntries(ProfitLossPeriod $profitLoss)
    {
        if ($profitLoss->status === 'closed') {
            return redirect()->back()->withErrors(['error' => 'Periode sudah finalisasi']);
        }

        DB::beginTransaction();
        try {
            $profitLoss->entries()->where('entry_type', '!=', 'manual')->delete();
            
            $this->autoGenerateEntries($profitLoss);
            
            DB::commit();
            
            return redirect()->back()->with('success', 'Entry otomatis berhasil di-regenerate');
            
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

    private function autoGenerateEntries(ProfitLossPeriod $period): void
    {
        $startDate = $period->start_date;
        $endDate = $period->end_date;

        if (class_exists('App\Models\SalesOrder')) {
            $salesOrders = app('App\Models\SalesOrder')
                ->whereBetween('created_at', [$startDate, $endDate])
                ->where('status', 'completed')
                ->get();
                
            foreach ($salesOrders as $so) {
                ProfitLossEntry::createFromSalesOrder($so, $period->id, Auth::id());
            }
        }

        if (class_exists('App\Models\PettyCashTransaction')) {
            $pettyCashTransactions = app('App\Models\PettyCashTransaction')
                ->with('category')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->where('status', 'approved')
                ->get();
                
            foreach ($pettyCashTransactions as $pct) {
                ProfitLossEntry::createFromPettyCash($pct, $period->id, Auth::id());
            }
        }

        $employeeSalaries = EmployeeSalary::whereBetween('salary_date', [$startDate, $endDate])
                                        ->where('status', 'paid')
                                        ->get();
                                        
        foreach ($employeeSalaries as $salary) {
            ProfitLossEntry::createFromEmployeeSalary($salary, $period->id, Auth::id());
        }

        $period->calculateTotals();
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

        $pdf = Pdf::loadView('admin.admin-keuangan.reports.profit-loss-pdf', [
            'period' => $period,
            'reportData' => $reportData,
            'financialInfo' => $financialInfo,
            'generatedAt' => now()
        ])
        ->setPaper('a4', 'portrait');

        $fileName = 'Laporan_Laba_Rugi_' . str_replace(' ', '_', $period->period_name) . '_' . now()->format('Y-m-d') . '.pdf';

        return $pdf->download($fileName);
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