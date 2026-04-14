<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\MasterPackageUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MasterPackageUnitController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->get('search');

        $packageUnits = MasterPackageUnit::query()
            ->when($search, function ($query, $search) {
                $query->where('code', 'like', "%{$search}%")
                      ->orWhere('name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
            })
            ->orderBy('sort_order')
            ->orderBy('name')
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/MasterPackageUnits/Index', [
            'packageUnits' => $packageUnits,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/MasterPackageUnits/Create');
    }

    public function store(Request $request)
    {
        $request->validate(MasterPackageUnit::validationRules());

        MasterPackageUnit::create($request->all());

        return redirect()->route('admin-keuangan.master-package-units.index')
            ->with('success', 'Package unit berhasil ditambahkan.');
    }

    public function show(MasterPackageUnit $masterPackageUnit)
    {
        return Inertia::render('Admin/AdminKeuangan/MasterPackageUnits/Show', [
            'packageUnit' => $masterPackageUnit
        ]);
    }

    public function edit(Request $request, MasterPackageUnit $masterPackageUnit)
    {
        return Inertia::render('Admin/AdminKeuangan/MasterPackageUnits/Edit', [
            'packageUnit' => $masterPackageUnit,
            'filters' => $request->only(['search', 'page']),
        ]);
    }

    public function update(Request $request, MasterPackageUnit $masterPackageUnit)
    {
        $request->validate(MasterPackageUnit::updateValidationRules($masterPackageUnit->id));

        $masterPackageUnit->update($request->all());

        return redirect()->route('admin-keuangan.master-package-units.index', $request->only(['search', 'page']))
            ->with('success', 'Package unit berhasil diperbarui.');
    }

    public function destroy(Request $request, MasterPackageUnit $masterPackageUnit)
    {
        // Check if package unit is being used
        $usedInInvoices = \App\Models\Invoice::where('package_unit', $masterPackageUnit->code)->count();
        $usedInSalesOrders = \App\Models\SalesOrder::where('package_unit', $masterPackageUnit->code)->count();

        if ($usedInInvoices > 0 || $usedInSalesOrders > 0) {
            return redirect()->route('admin-keuangan.master-package-units.index', $request->only(['search', 'page']))
                ->with('error', "Package unit '{$masterPackageUnit->code}' tidak dapat dihapus karena sedang digunakan di {$usedInInvoices} invoice dan {$usedInSalesOrders} sales order.");
        }

        $masterPackageUnit->delete();

        return redirect()->route('admin-keuangan.master-package-units.index', $request->only(['search', 'page']))
            ->with('success', 'Package unit berhasil dihapus.');
    }

    public function toggleStatus(Request $request, MasterPackageUnit $masterPackageUnit)
    {
        $masterPackageUnit->update([
            'is_active' => !$masterPackageUnit->is_active
        ]);

        $status = $masterPackageUnit->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return redirect()->route('admin-keuangan.master-package-units.index', $request->only(['search', 'page']))
            ->with('success', "Package unit '{$masterPackageUnit->code}' berhasil {$status}.");
    }

    // API endpoint untuk mendapatkan package units aktif
    public function getActiveUnits()
    {
        return response()->json([
            'data' => MasterPackageUnit::getActiveUnits()
        ]);
    }
}
