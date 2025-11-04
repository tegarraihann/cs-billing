<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\OtherIncome;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\OperationalCostCategory;

class OtherIncomeController extends Controller
{
    /**
     * Display a listing of other incomes
     */
    public function index(Request $request)
    {
        $query = OtherIncome::with(['creator', 'approver'])
            ->orderBy('transaction_date', 'desc')
            ->orderBy('created_at', 'desc');

        // Filter by date range
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('transaction_date', [
                $request->start_date,
                $request->end_date
            ]);
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        // Filter by posted status
        if ($request->filled('posted')) {
            if ($request->posted === 'yes') {
                $query->where('posted_to_profit_loss', true);
            } elseif ($request->posted === 'no') {
                $query->where('posted_to_profit_loss', false);
            }
        }

        $otherIncomes = $query->paginate(15)->withQueryString();

        // Calculate summary
        $summary = [
            'total_amount' => OtherIncome::sum('amount'),
            'total_this_month' => OtherIncome::thisMonth()->sum('amount'),
            'total_this_year' => OtherIncome::thisYear()->sum('amount'),
            'total_posted' => OtherIncome::posted()->sum('amount'),
            'total_not_posted' => OtherIncome::notPosted()->sum('amount'),
        ];

        $masterCategories = OperationalCostCategory::orderBy('name')->pluck('name');
        $existingCategories = OtherIncome::select('category')->distinct()->pluck('category');
        $categories = $masterCategories
            ->merge($existingCategories)
            ->filter()
            ->unique()
            ->sort()
            ->values();

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Index', [
            'otherIncomes' => $otherIncomes,
            'summary' => $summary,
            'categories' => $categories,
            'filters' => $request->only(['start_date', 'end_date', 'category', 'posted']),
        ]);
    }

    /**
     * Show the form for creating a new other income
     */
    public function create()
    {
        $categories = OperationalCostCategory::orderBy('name')
            ->pluck('name')
            ->values();

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Create', [
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created other income
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_date' => 'required|date',
            'category' => [
                'required',
                'string',
                'max:255',
                Rule::exists('operational_cost_categories', 'name')->where('is_active', true),
            ],
            'description' => 'required|string|max:500',
            'amount' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string|max:1000',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        DB::transaction(function () use ($request, $validated) {
            // Handle file upload
            $receiptFile = null;
            if ($request->hasFile('receipt_file')) {
                $receiptFile = $request->file('receipt_file')->store('other-income-receipts', 'public');
            }

            OtherIncome::create([
                'transaction_date' => $validated['transaction_date'],
                'category' => $validated['category'],
                'description' => $validated['description'],
                'amount' => $validated['amount'],
                'notes' => $validated['notes'] ?? null,
                'receipt_file' => $receiptFile,
                'created_by' => Auth::id(),
            ]);
        });

        return redirect()->route('admin-keuangan.other-incomes.index')
            ->with('success', 'Pendapatan lain-lain berhasil ditambahkan.');
    }

    /**
     * Display the specified other income
     */
    public function show(OtherIncome $otherIncome)
    {
        $otherIncome->load(['creator', 'approver']);

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Show', [
            'otherIncome' => $otherIncome,
        ]);
    }

    /**
     * Show the form for editing the specified other income
     */
    public function edit(OtherIncome $otherIncome)
    {
        $categories = OperationalCostCategory::orderBy('name')
            ->pluck('name')
            ->unique()
            ->values();

        if ($otherIncome->category && !$categories->contains($otherIncome->category)) {
            $categories = $categories->push($otherIncome->category)->unique()->sort()->values();
        }

        return Inertia::render('Admin/AdminKeuangan/OtherIncomes/Edit', [
            'otherIncome' => $otherIncome,
            'categories' => $categories,
        ]);
    }

    /**
     * Update the specified other income
     */
    public function update(Request $request, OtherIncome $otherIncome)
    {
        // Prevent editing if already posted to profit/loss
        if ($otherIncome->posted_to_profit_loss) {
            return redirect()->back()
                ->withErrors(['error' => 'Tidak dapat mengedit pendapatan yang sudah diposting ke laba rugi.']);
        }

        $validated = $request->validate([
            'transaction_date' => 'required|date',
            'category' => [
                'required',
                'string',
                'max:255',
                Rule::exists('operational_cost_categories', 'name')->where(function ($query) use ($otherIncome) {
                    $query->where('is_active', true)
                        ->orWhere('name', $otherIncome->category);
                }),
            ],
            'description' => 'required|string|max:500',
            'amount' => 'required|numeric|min:0.01',
            'notes' => 'nullable|string|max:1000',
            'receipt_file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ]);

        DB::transaction(function () use ($request, $validated, $otherIncome) {
            // Handle file upload
            $receiptFile = $otherIncome->receipt_file;
            if ($request->hasFile('receipt_file')) {
                $receiptFile = $request->file('receipt_file')->store('other-income-receipts', 'public');
            }

            $otherIncome->update([
                'transaction_date' => $validated['transaction_date'],
                'category' => $validated['category'],
                'description' => $validated['description'],
                'amount' => $validated['amount'],
                'notes' => $validated['notes'] ?? null,
                'receipt_file' => $receiptFile,
            ]);
        });

        return redirect()->route('admin-keuangan.other-incomes.index')
            ->with('success', 'Pendapatan lain-lain berhasil diperbarui.');
    }

    /**
     * Remove the specified other income
     */
    public function destroy(OtherIncome $otherIncome)
    {
        // Prevent deleting if already posted to profit/loss
        if ($otherIncome->posted_to_profit_loss) {
            return redirect()->back()
                ->withErrors(['error' => 'Tidak dapat menghapus pendapatan yang sudah diposting ke laba rugi.']);
        }

        $otherIncome->delete();

        return redirect()->route('admin-keuangan.other-incomes.index')
            ->with('success', 'Pendapatan lain-lain berhasil dihapus.');
    }

    /**
     * Post income to profit/loss
     */
    public function postToProfitLoss(OtherIncome $otherIncome)
    {
        try {
            $otherIncome->postToProfitLoss(Auth::id());

            return redirect()->back()
                ->with('success', 'Pendapatan berhasil diposting ke laba rugi.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Unpost income from profit/loss
     */
    public function unpostFromProfitLoss(OtherIncome $otherIncome)
    {
        try {
            $otherIncome->unpostFromProfitLoss();

            return redirect()->back()
                ->with('success', 'Pendapatan berhasil di-unpost dari laba rugi.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get summary by category
     */
    public function summaryByCategory(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());

        $summary = OtherIncome::selectRaw('category, SUM(amount) as total, COUNT(*) as count')
            ->whereBetween('transaction_date', [$startDate, $endDate])
            ->groupBy('category')
            ->get();

        return response()->json([
            'summary' => $summary,
            'date_range' => [
                'start' => $startDate,
                'end' => $endDate
            ]
        ]);
    }
}
