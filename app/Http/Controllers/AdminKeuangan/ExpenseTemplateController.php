<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\ExpenseTemplate;
use App\Models\PettyCashCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseTemplateController extends Controller
{
    public function index(Request $request)
    {
        $query = ExpenseTemplate::with('category')
            ->orderBy('usage_count', 'desc')
            ->orderBy('name');

        // Filter by category
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Filter by active status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->is_active);
        }

        // Search by name
        if ($request->search) {
            $query->where('name', 'like', '%' . $request->search . '%');
        }

        $templates = $query->paginate(15);

        return Inertia::render('Admin/AdminKeuangan/ExpenseTemplates/Index', [
            'templates' => $templates,
            'categories' => PettyCashCategory::active()->ordered()->get(),
            'filters' => $request->only(['category_id', 'is_active', 'search'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/ExpenseTemplates/Create', [
            'categories' => PettyCashCategory::active()->ordered()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:petty_cash_categories,id',
            'description' => 'nullable|string|max:1000',
            'typical_amount_min' => 'required|numeric|min:0',
            'typical_amount_max' => 'required|numeric|gte:typical_amount_min',
            'is_active' => 'boolean'
        ]);

        ExpenseTemplate::create([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'typical_amount_min' => $request->typical_amount_min,
            'typical_amount_max' => $request->typical_amount_max,
            'is_active' => $request->is_active ?? true,
            'usage_count' => 0
        ]);

        return redirect()->route('admin-keuangan.expense-templates.index')
            ->with('success', 'Template biaya berhasil dibuat.');
    }

    public function show(ExpenseTemplate $expenseTemplate)
    {
        return Inertia::render('Admin/AdminKeuangan/ExpenseTemplates/Show', [
            'template' => $expenseTemplate->load('category'),
            'relatedTransactions' => $expenseTemplate->transactions()
                ->with(['user', 'invoice'])
                ->latest()
                ->take(10)
                ->get()
        ]);
    }

    public function edit(ExpenseTemplate $expenseTemplate)
    {
        return Inertia::render('Admin/AdminKeuangan/ExpenseTemplates/Edit', [
            'template' => $expenseTemplate,
            'categories' => PettyCashCategory::active()->ordered()->get()
        ]);
    }

    public function update(Request $request, ExpenseTemplate $expenseTemplate)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:petty_cash_categories,id',
            'description' => 'nullable|string|max:1000',
            'typical_amount_min' => 'required|numeric|min:0',
            'typical_amount_max' => 'required|numeric|gte:typical_amount_min',
            'is_active' => 'boolean'
        ]);

        $expenseTemplate->update([
            'name' => $request->name,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'typical_amount_min' => $request->typical_amount_min,
            'typical_amount_max' => $request->typical_amount_max,
            'is_active' => $request->is_active ?? true
        ]);

        return redirect()->route('admin-keuangan.expense-templates.index')
            ->with('success', 'Template biaya berhasil diperbarui.');
    }

    public function destroy(ExpenseTemplate $expenseTemplate)
    {
        // Check if template is being used
        if ($expenseTemplate->transactions()->count() > 0) {
            return back()->withErrors([
                'error' => 'Template tidak dapat dihapus karena masih digunakan dalam transaksi.'
            ]);
        }

        $expenseTemplate->delete();

        return redirect()->route('admin-keuangan.expense-templates.index')
            ->with('success', 'Template biaya berhasil dihapus.');
    }

    public function toggleStatus(ExpenseTemplate $expenseTemplate)
    {
        $expenseTemplate->update([
            'is_active' => !$expenseTemplate->is_active
        ]);

        $status = $expenseTemplate->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Template biaya berhasil {$status}.");
    }
}