<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\PettyCashCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PettyCashCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PettyCashCategory::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('is_active', $request->status === '1');
        }

        $categories = $query
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/PettyCashCategories/Index', [
            'categories' => $categories,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/PettyCashCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:petty_cash_categories,name',
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        PettyCashCategory::create($validated);

        return redirect()
            ->route('admin-keuangan.petty-cash-categories.index')
            ->with('success', 'Petty cash category created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PettyCashCategory $pettyCashCategory)
    {
        return Inertia::render('Admin/AdminKeuangan/PettyCashCategories/Edit', [
            'category' => $pettyCashCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PettyCashCategory $pettyCashCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:petty_cash_categories,name,' . $pettyCashCategory->id,
            'description' => 'nullable|string',
            'sort_order' => 'nullable|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $pettyCashCategory->update($validated);

        return redirect()
            ->route('admin-keuangan.petty-cash-categories.index')
            ->with('success', 'Petty cash category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PettyCashCategory $pettyCashCategory)
    {
        $pettyCashCategory->delete();

        return redirect()
            ->route('admin-keuangan.petty-cash-categories.index')
            ->with('success', 'Petty cash category deleted successfully.');
    }
}
