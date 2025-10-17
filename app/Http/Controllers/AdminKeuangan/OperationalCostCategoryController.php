<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\OperationalCostCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class OperationalCostCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $operationalCostCategories = OperationalCostCategory::with(['creator', 'updater'])
            ->when($search, function ($query, $search) {
                return $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })
            ->when($status !== null, function ($query) use ($status) {
                return $query->where('is_active', $status === 'active');
            })
            ->orderBy('name')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/OperationalCostCategories/Index', [
            'operationalCostCategories' => $operationalCostCategories,
            'filters' => [
                'search' => $search,
                'status' => $status,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/OperationalCostCategories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:operational_cost_categories,name',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['created_by'] = Auth::id();

        OperationalCostCategory::create($validated);

        return redirect()->route('admin-keuangan.operational-cost-categories.index')
            ->with('success', 'Kategori biaya operasional berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(OperationalCostCategory $operationalCostCategory)
    {
        $operationalCostCategory->load(['creator', 'updater']);

        return Inertia::render('Admin/AdminKeuangan/OperationalCostCategories/Show', [
            'operationalCostCategory' => $operationalCostCategory,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(OperationalCostCategory $operationalCostCategory)
    {
        return Inertia::render('Admin/AdminKeuangan/OperationalCostCategories/Edit', [
            'operationalCostCategory' => $operationalCostCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, OperationalCostCategory $operationalCostCategory)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:operational_cost_categories,name,' . $operationalCostCategory->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['updated_by'] = Auth::id();

        $operationalCostCategory->update($validated);

        return redirect()->route('admin-keuangan.operational-cost-categories.index')
            ->with('success', 'Kategori biaya operasional berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(OperationalCostCategory $operationalCostCategory)
    {
        $operationalCostCategory->delete();

        return redirect()->route('admin-keuangan.operational-cost-categories.index')
            ->with('success', 'Kategori biaya operasional berhasil dihapus.');
    }
}
