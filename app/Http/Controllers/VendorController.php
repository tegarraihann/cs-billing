<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VendorController extends Controller
{
    /**
     * Display a listing of vendors
     */
    public function index(Request $request)
    {
        $query = Vendor::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_vendor', 'like', "%{$search}%")
                    ->orWhere('nomor_rekening', 'like', "%{$search}%")
                    ->orWhere('nama_rekening', 'like', "%{$search}%")
                    ->orWhere('nib', 'like', "%{$search}%");
            });
        }

        $vendors = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminCS/Vendors/Index', [
            'vendors' => $vendors,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new vendor
     */
    public function create()
    {
        return Inertia::render('Admin/AdminCS/Vendors/Create');
    }

    /**
     * Store a newly created vendor in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_vendor' => 'required|string|max:255',
            'nomor_rekening' => 'required|string|max:255',
            'nama_rekening' => 'required|string|max:255',
            'nib' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'nama_vendor.required' => 'Nama Vendor wajib diisi.',
            'nomor_rekening.required' => 'Nomor Rekening wajib diisi.',
            'nama_rekening.required' => 'Nama Rekening wajib diisi.',
            'nib.string' => 'NIB harus berupa teks.',
            'nib.max' => 'NIB maksimal 255 karakter.',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Foto harus berformat jpeg, png, jpg, atau gif.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
            'legal_document.file' => 'Dokumen legal harus berupa file.',
            'legal_document.mimes' => 'Dokumen legal harus berformat PDF.',
            'legal_document.max' => 'Ukuran dokumen legal maksimal 10MB.',
        ]);

        // Handle file uploads
        if ($request->hasFile('photo')) {
            $validated['photo_path'] = $request->file('photo')->store('vendors', 'public');
        }
        
        if ($request->hasFile('legal_document')) {
            $validated['legal_document_path'] = $request->file('legal_document')->store('vendors', 'public');
        }
        
        // Remove the uploaded files from validated array since we store the paths
        unset($validated['photo'], $validated['legal_document']);

        Vendor::create($validated);

        return redirect()
            ->route('admin-cs.vendors.index')
            ->with('success', 'Vendor berhasil ditambahkan.');
    }

    /**
     * Display the specified vendor.
     */
    public function show(Vendor $vendor)
    {
        return Inertia::render('Admin/AdminCS/Vendors/Show', [
            'vendor' => $vendor
        ]);
    }

    /**
     * Show the form for editing the vendor.
     */
    public function edit(Vendor $vendor)
    {
        return Inertia::render('Admin/AdminCS/Vendors/Edit', [
            'vendor' => $vendor
        ]);
    }

    /**
     * Update the specified vendor in storage.
     */
    public function update(Request $request, Vendor $vendor)
    {
        $validated = $request->validate([
            'nama_vendor' => 'required|string|max:255',
            'nomor_rekening' => 'required|string|max:255',
            'nama_rekening' => 'required|string|max:255',
            'nib' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'nama_vendor.required' => 'Nama Vendor wajib diisi.',
            'nomor_rekening.required' => 'Nomor Rekening wajib diisi.',
            'nama_rekening.required' => 'Nama Rekening wajib diisi.',
            'nib.string' => 'NIB harus berupa teks.',
            'nib.max' => 'NIB maksimal 255 karakter.',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Foto harus berformat jpeg, png, jpg, atau gif.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
            'legal_document.file' => 'Dokumen legal harus berupa file.',
            'legal_document.mimes' => 'Dokumen legal harus berformat PDF.',
            'legal_document.max' => 'Ukuran dokumen legal maksimal 10MB.',
        ]);

        // Handle file uploads
        if ($request->hasFile('photo')) {
            // Delete old photo if exists
            if ($vendor->photo_path) {
                \Storage::disk('public')->delete($vendor->photo_path);
            }
            $validated['photo_path'] = $request->file('photo')->store('vendors', 'public');
        }
        
        if ($request->hasFile('legal_document')) {
            // Delete old document if exists
            if ($vendor->legal_document_path) {
                \Storage::disk('public')->delete($vendor->legal_document_path);
            }
            $validated['legal_document_path'] = $request->file('legal_document')->store('vendors', 'public');
        }
        
        // Remove the uploaded files from validated array since we store the paths
        unset($validated['photo'], $validated['legal_document']);

        $vendor->update($validated);

        return redirect()
            ->route('admin-cs.vendors.index')
            ->with('success', 'Vendor berhasil diperbarui.');
    }

    /**
     * Remove the specified vendor from storage.
     */
    public function destroy(Vendor $vendor)
    {
        $vendor->delete();

        return redirect()
            ->route('admin-cs.vendors.index')
            ->with('success', 'Vendor berhasil dihapus.');
    }
}
