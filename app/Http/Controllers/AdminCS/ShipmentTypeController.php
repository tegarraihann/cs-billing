<?php

namespace App\Http\Controllers\AdminCS;

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

        $shipmentTypes = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminCS/ShipmentTypes/Index', [
            'shipmentTypes' => $shipmentTypes,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new shipment type
     */
    public function create()
    {
        return Inertia::render('Admin/AdminCS/ShipmentTypes/Create');
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
            ->route('admin-cs.shipment-types.index')
            ->with('success', 'Shipment type berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified shipment type
     */
    public function edit(ShipmentType $shipmentType)
    {
        return Inertia::render('Admin/AdminCS/ShipmentTypes/Edit', [
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
            ->route('admin-cs.shipment-types.index')
            ->with('success', 'Shipment type berhasil diperbarui.');
    }

    /**
     * Remove the specified shipment type
     */
    public function destroy(ShipmentType $shipmentType)
    {
        $shipmentType->delete();

        return redirect()
            ->route('admin-cs.shipment-types.index')
            ->with('success', 'Shipment type berhasil dihapus.');
    }
}
