<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\ShipmentType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShipmentTypeController extends Controller
{
    /**
     * Display a listing of shipment types
     */
    public function index(Request $request)
    {
        $query = ShipmentType::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            switch ($request->status) {
                case '0':
                case '1':
                    $query->where('is_active', $request->status === '1');
                    break;
            }
        }

        $shipmentTypes = $query
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/ShipmentTypes/Index', [
            'shipmentTypes' => $shipmentTypes,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new shipment type
     */
    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/ShipmentTypes/Create');
    }

    /**
     * Store a newly created shipment type
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:shipment_types,code',
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean'
        ], [
            'name.required' => 'Nama shipment type wajib diisi.',
            'code.required' => 'Kode shipment type wajib diisi.',
            'code.unique' => 'Kode shipment type sudah digunakan.',
        ]);

        ShipmentType::create($validated);

        return redirect()
            ->route('admin-keuangan.shipment-types.index')
            ->with('success', 'Shipment type berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified shipment type
     */
    public function edit(ShipmentType $shipmentType)
    {
        return Inertia::render('Admin/AdminKeuangan/ShipmentTypes/Edit', [
            'shipmentType' => $shipmentType
        ]);
    }

    /**
     * Update the specified shipment type
     */
    public function update(Request $request, ShipmentType $shipmentType)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:shipment_types,code,' . $shipmentType->id,
            'description' => 'nullable|string|max:1000',
            'is_active' => 'boolean'
        ], [
            'name.required' => 'Nama shipment type wajib diisi.',
            'code.required' => 'Kode shipment type wajib diisi.',
            'code.unique' => 'Kode shipment type sudah digunakan.',
        ]);

        $shipmentType->update($validated);

        return redirect()
            ->route('admin-keuangan.shipment-types.index')
            ->with('success', 'Shipment type berhasil diperbarui.');
    }

    /**
     * Remove the specified shipment type
     */
    public function destroy(ShipmentType $shipmentType)
    {
        $shipmentType->delete();

        return redirect()
            ->route('admin-keuangan.shipment-types.index')
            ->with('success', 'Shipment type berhasil dihapus.');
    }
}
