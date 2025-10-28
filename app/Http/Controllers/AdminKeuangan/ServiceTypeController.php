<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\MasterServiceType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = MasterServiceType::query();

        // Search
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status !== '') {
            $query->where('is_active', $request->status);
        }

        $serviceTypes = $query->ordered()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/ServiceTypes/Index', [
            'serviceTypes' => $serviceTypes,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/ServiceTypes/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:master_service_types,code',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        MasterServiceType::create($validated);

        return redirect()
            ->route('admin-keuangan.service-types.index')
            ->with('success', 'Service Type berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(MasterServiceType $serviceType)
    {
        return Inertia::render('Admin/AdminKeuangan/ServiceTypes/Show', [
            'serviceType' => $serviceType,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MasterServiceType $serviceType)
    {
        return Inertia::render('Admin/AdminKeuangan/ServiceTypes/Edit', [
            'serviceType' => $serviceType,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MasterServiceType $serviceType)
    {
        $validated = $request->validate([
            'code' => 'required|string|max:50|unique:master_service_types,code,' . $serviceType->id,
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $serviceType->update($validated);

        return redirect()
            ->route('admin-keuangan.service-types.index')
            ->with('success', 'Service Type berhasil diupdate.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MasterServiceType $serviceType)
    {
        $serviceType->delete();

        return redirect()
            ->route('admin-keuangan.service-types.index')
            ->with('success', 'Service Type berhasil dihapus.');
    }
}
