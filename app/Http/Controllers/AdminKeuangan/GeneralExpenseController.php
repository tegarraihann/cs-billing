<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\GeneralExpense;
use App\Models\GeneralExpenseItem;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GeneralExpenseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = GeneralExpense::with(['items', 'creator', 'approver'])
            ->orderBy('expense_date', 'desc')
            ->orderBy('created_at', 'desc');

        // Filter by period
        if ($request->filled('month') && $request->filled('year')) {
            $query->byPeriod($request->month, $request->year);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->byCategory($request->category);
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $expenses = $query->paginate(15)->withQueryString();

        // Get summary data
        $currentMonth = now()->month;
        $currentYear = now()->year;

        // Calculate statistics for the component
        $stats = [
            'current_month_total' => GeneralExpense::byPeriod($currentMonth, $currentYear)->sum('total_amount'),
            'current_year_total' => GeneralExpense::where('period_year', $currentYear)->sum('total_amount'),
            'draft_count' => GeneralExpense::where('status', 'draft')->count(),
            'approved_count' => GeneralExpense::where('status', 'approved')->count(),
        ];

        $summary = GeneralExpense::byPeriod($currentMonth, $currentYear)
            ->selectRaw('category, SUM(total_amount) as total')
            ->groupBy('category')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Index', [
            'expenses' => $expenses,
            'stats' => $stats,
            'summary' => $summary,
            'filters' => $request->only(['month', 'year', 'category', 'status', 'period', 'expense_date']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'expense_date' => 'required|date',
            'category' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string|max:255',
            'items.*.amount' => 'required|numeric|min:0.01',
            'items.*.notes' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($request) {
                // Create general expense
                $expense = GeneralExpense::create([
                    'expense_date' => $request->expense_date,
                    'category' => $request->category,
                    'notes' => $request->notes,
                    'created_by' => auth()->id(),
                ]);

                // Create items
                foreach ($request->items as $itemData) {
                    GeneralExpenseItem::create([
                        'expense_id' => $expense->id,
                        'description' => $itemData['description'],
                        'amount' => $itemData['amount'],
                        'notes' => $itemData['notes'] ?? null,
                    ]);
                }
            });

            return redirect()->route('admin-keuangan.general-expenses.index')
                ->with('success', 'General expense berhasil dibuat.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal membuat general expense: ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(GeneralExpense $generalExpense)
    {
        $generalExpense->load(['items', 'creator', 'approver']);

        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Show', [
            'expense' => $generalExpense,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(GeneralExpense $generalExpense)
    {
        $generalExpense->load('items');

        return Inertia::render('Admin/AdminKeuangan/GeneralExpenses/Edit', [
            'expense' => $generalExpense,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, GeneralExpense $generalExpense)
    {
        // Only allow editing if still draft
        if ($generalExpense->isApproved()) {
            return back()->withErrors(['error' => 'Cannot edit approved expense.']);
        }

        $request->validate([
            'expense_date' => 'required|date',
            'category' => 'required|string|max:255',
            'notes' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string|max:255',
            'items.*.amount' => 'required|numeric|min:0.01',
            'items.*.notes' => 'nullable|string',
        ]);

        try {
            DB::transaction(function () use ($request, $generalExpense) {
                // Update general expense
                $generalExpense->update([
                    'expense_date' => $request->expense_date,
                    'category' => $request->category,
                    'notes' => $request->notes,
                ]);

                // Delete existing items
                $generalExpense->items()->delete();

                // Create new items
                foreach ($request->items as $itemData) {
                    GeneralExpenseItem::create([
                        'expense_id' => $generalExpense->id,
                        'description' => $itemData['description'],
                        'amount' => $itemData['amount'],
                        'notes' => $itemData['notes'] ?? null,
                    ]);
                }
            });

            return redirect()->route('admin-keuangan.general-expenses.index')
                ->with('success', 'General expense berhasil diupdate.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal mengupdate general expense: ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(GeneralExpense $generalExpense)
    {
        // Only allow deleting if still draft
        if ($generalExpense->isApproved()) {
            return back()->withErrors(['error' => 'Cannot delete approved expense.']);
        }

        try {
            $generalExpense->delete();

            return redirect()->route('admin-keuangan.general-expenses.index')
                ->with('success', 'General expense berhasil dihapus.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus general expense: ' . $e->getMessage()]);
        }
    }

    /**
     * Approve expense
     */
    public function approve(GeneralExpense $generalExpense)
    {
        if ($generalExpense->isApproved()) {
            return back()->withErrors(['error' => 'Expense already approved.']);
        }

        $generalExpense->approve();

        return back()->with('success', 'General expense berhasil disetujui.');
    }

    /**
     * Export to Excel
     */
    public function export(Request $request)
    {
        $month = $request->month ?? now()->month;
        $year = $request->year ?? now()->year;

        $expenses = GeneralExpense::with('items')
            ->byPeriod($month, $year)
            ->orderBy('category')
            ->orderBy('expense_date')
            ->get();

        // Generate Excel export logic here
        // For now, return JSON data
        return response()->json([
            'period' => Carbon::create($year, $month)->format('F Y'),
            'data' => $expenses
        ]);
    }
}
