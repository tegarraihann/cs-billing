<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

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
                    ->orWhere('pic', 'like', "%{$search}%")
                    ->orWhere('no_hp', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('no_kantor', 'like', "%{$search}%")
                    ->orWhere('nomor_rekening', 'like', "%{$search}%")
                    ->orWhere('nama_rekening', 'like', "%{$search}%")
                    ->orWhere('nib', 'like', "%{$search}%");
            });
        }

        $vendors = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminKeuangan/Vendors/Index', [
            'vendors' => $vendors,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new vendor
     */
    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/Vendors/Create');
    }

    /**
     * Store a newly created vendor in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_vendor' => 'required|string|max:255',
            'pic' => 'nullable|string|max:255',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'no_kantor' => 'nullable|string|max:20',
            'nomor_rekening' => 'required|string|max:255',
            'nama_rekening' => 'required|string|max:255',
            'nib' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'nama_vendor.required' => 'Nama Vendor wajib diisi.',
            'pic.string' => 'PIC harus berupa teks.',
            'pic.max' => 'PIC maksimal 255 karakter.',
            'no_hp.string' => 'No HP harus berupa teks.',
            'no_hp.max' => 'No HP maksimal 20 karakter.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'no_kantor.string' => 'No Kantor harus berupa teks.',
            'no_kantor.max' => 'No Kantor maksimal 20 karakter.',
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
            ->route('admin-keuangan.vendors.index')
            ->with('success', 'Vendor berhasil ditambahkan.');
    }

    /**
     * Display the specified vendor.
     */
    public function show(Vendor $vendor)
    {
        return Inertia::render('Admin/AdminKeuangan/Vendors/Show', [
            'vendor' => $vendor
        ]);
    }

    /**
     * Show the form for editing the vendor.
     */
    public function edit(Vendor $vendor)
    {
        return Inertia::render('Admin/AdminKeuangan/Vendors/Edit', [
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
            'pic' => 'nullable|string|max:255',
            'no_hp' => 'nullable|string|max:20',
            'email' => 'nullable|email|max:255',
            'no_kantor' => 'nullable|string|max:20',
            'nomor_rekening' => 'required|string|max:255',
            'nama_rekening' => 'required|string|max:255',
            'nib' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'nama_vendor.required' => 'Nama Vendor wajib diisi.',
            'pic.string' => 'PIC harus berupa teks.',
            'pic.max' => 'PIC maksimal 255 karakter.',
            'no_hp.string' => 'No HP harus berupa teks.',
            'no_hp.max' => 'No HP maksimal 20 karakter.',
            'email.email' => 'Format email tidak valid.',
            'email.max' => 'Email maksimal 255 karakter.',
            'no_kantor.string' => 'No Kantor harus berupa teks.',
            'no_kantor.max' => 'No Kantor maksimal 20 karakter.',
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
                Storage::disk('public')->delete($vendor->photo_path);
            }
            $validated['photo_path'] = $request->file('photo')->store('vendors', 'public');
        }
        
        if ($request->hasFile('legal_document')) {
            // Delete old document if exists
            if ($vendor->legal_document_path) {
                Storage::disk('public')->delete($vendor->legal_document_path);
            }
            $validated['legal_document_path'] = $request->file('legal_document')->store('vendors', 'public');
        }
        
        // Remove the uploaded files from validated array since we store the paths
        unset($validated['photo'], $validated['legal_document']);

        $vendor->update($validated);

        return redirect()
            ->route('admin-keuangan.vendors.index')
            ->with('success', 'Vendor berhasil diperbarui.');
    }

    /**
     * Remove the specified vendor from storage.
     */
    public function destroy(Vendor $vendor)
    {
        // Delete associated files
        if ($vendor->photo_path) {
            Storage::disk('public')->delete($vendor->photo_path);
        }
        
        if ($vendor->legal_document_path) {
            Storage::disk('public')->delete($vendor->legal_document_path);
        }

        $vendor->delete();

        return redirect()
            ->route('admin-keuangan.vendors.index')
            ->with('success', 'Vendor berhasil dihapus.');
    }

    /**
     * Generate PDF for individual vendor
     */
    public function generatePdf(Vendor $vendor)
    {
        try {
            $pdf = Pdf::loadView('admin.admin-keuangan.vendors.pdf', [
                'vendor' => $vendor,
                'type' => 'individual'
            ]);
            
            $pdf->setPaper('A4', 'portrait');
            
            $fileName = 'vendor-' . str_replace([' ', '/'], '-', $vendor->nama_vendor) . '-' . date('Y-m-d') . '.pdf';
            return $pdf->download($fileName);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Export all vendors to PDF
     */
    public function exportAllPdf(Request $request)
    {
        try {
            $query = Vendor::query();

            // Apply search if provided
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('nama_vendor', 'like', "%{$search}%")
                        ->orWhere('pic', 'like', "%{$search}%")
                        ->orWhere('no_hp', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('no_kantor', 'like', "%{$search}%")
                        ->orWhere('nomor_rekening', 'like', "%{$search}%")
                        ->orWhere('nama_rekening', 'like', "%{$search}%")
                        ->orWhere('nib', 'like', "%{$search}%");
                });
            }

            $vendors = $query->orderBy('nama_vendor', 'asc')->get();
            
            $pdf = Pdf::loadView('admin.admin-keuangan.vendors.pdf', [
                'vendors' => $vendors,
                'type' => 'all',
                'search' => $request->search
            ]);
            
            $pdf->setPaper('A4', 'portrait');
            
            return $pdf->download('daftar-vendor-' . date('Y-m-d') . '.pdf');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}