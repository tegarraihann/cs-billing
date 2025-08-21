<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Barryvdh\DomPDF\Facade\Pdf;

class CustomerController extends Controller
{

    /**
     * Display a listing of customers
     */
    public function index(Request $request)
    {
        $query = Customer::with('handler');

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('no', 'like', "%{$search}%")
                    ->orWhere('so_number', 'like', "%{$search}%")
                    ->orWhere('customer_code', 'like', "%{$search}%")
                    ->orWhere('consignee_shipper', 'like', "%{$search}%")
                    ->orWhere('awb_bl_number', 'like', "%{$search}%")
                    ->orWhere('cust_doc_name', 'like', "%{$search}%");
            });
        }

        $customers = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminCS/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new customer
     */
    public function create()
    {
        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        return Inertia::render('Admin/AdminCS/Customers/Create', [
            'vendors' => $vendors
        ]);
    }

    /**
     * Store a newly created customer
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'so_number' => 'required|string|max:255',
            'customer_code' => 'required|string|max:255',
            // Informasi Perusahaan/Perorangan
            'company_name' => 'required|string|max:255',
            'company_type' => 'required|in:PT,CV,Perorangan,Yayasan,Koperasi,Lainnya',
            'company_address' => 'required|string|max:1000',
            'invoice_address' => 'nullable|string|max:1000',
            // Data Legalitas
            'nib' => 'nullable|string|max:255',
            'npwp' => 'nullable|string|max:255',
            'ktp_number' => 'nullable|string|max:255',
            // Data PIC
            'pic_name' => 'required|string|max:255',
            'pic_phone' => 'required|string|max:255',
            'pic_email' => 'required|email|max:255',
            // Data Marketing
            'marketing_name' => 'nullable|string|max:255',
            'marketing_phone' => 'nullable|string|max:255',
            'marketing_email' => 'nullable|email|max:255',
            // Data Pengiriman
            'consignee_shipper' => 'required|string|max:255',
            'awb_bl_number' => 'required|string|max:255',
            'cust_doc_name' => 'nullable|string|max:255',
            'type_qty' => 'nullable|string|max:255',
            'no_kont_pallet' => 'nullable|string|max:255',
            'pol_pod' => 'nullable|string|max:255',
            'eta' => 'nullable|date',
            'vendor' => 'required|array',
            'vendor.vendor_id' => 'required|exists:vendors,id',
            'vendor.deskripsi' => 'required|string|max:500',
            'vendor.nominal' => 'nullable|numeric|min:0',
            'vendor.no_rekening' => 'required|string|max:255',
            'vendor.company_name' => 'required|string|max:255',
            'vendor.nama_rekening' => 'required|string|max:255',
            'vendor.rcvd_inv' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'so_number.required' => 'SO Number wajib diisi.',
            'customer_code.required' => 'Customer Code wajib diisi.',
            'consignee_shipper.required' => 'Consignee/Shipper wajib diisi.',
            'awb_bl_number.required' => 'AWB/BL Number wajib diisi.',
            'vendor.required' => 'Data vendor harus diisi.',
            'vendor.vendor_id.required' => 'Vendor wajib dipilih.',
            'vendor.vendor_id.exists' => 'Vendor yang dipilih tidak valid.',
            'vendor.deskripsi.required' => 'Deskripsi vendor wajib diisi.',
            'vendor.nominal.numeric' => 'Nominal harus berupa angka.',
            'vendor.no_rekening.required' => 'No Rekening vendor wajib diisi.',
            'vendor.company_name.required' => 'Company Name vendor wajib diisi.',
            'vendor.nama_rekening.required' => 'Nama Rekening vendor wajib diisi',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Foto harus berformat jpeg, png, jpg, atau gif.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
            'legal_document.file' => 'Dokumen legal harus berupa file.',
            'legal_document.mimes' => 'Dokumen legal harus berformat PDF.',
            'legal_document.max' => 'Ukuran dokumen legal maksimal 10MB.',
        ]);

        // Handle file uploads
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('customers/photos', 'public');
            $validated['photo_path'] = $photoPath;
        }

        if ($request->hasFile('legal_document')) {
            $legalDocPath = $request->file('legal_document')->store('customers/documents', 'public');
            $validated['legal_document_path'] = $legalDocPath;
        }

        // Auto increment no
        $lastCustomer = Customer::orderBy('no', 'desc')->first();
        $validated['no'] = $lastCustomer ? $lastCustomer->no + 1 : 1;

        $validated['handled_by'] = Auth::id();
        $validated['last_contact_at'] = now();

        // Prepare vendor data for storage
        $vendorInfo = $validated['vendor'];
        unset($validated['vendor']); // Remove vendor from main validated data
        $validated['vendors'] = $vendorInfo; // Store vendor data in vendors field

        Customer::create($validated);

        return redirect()
            ->route('admin-cs.customers.index')
            ->with('success', 'Data pelanggan berhasil ditambahkan.');
    }

    /**
     * Display the specified customer
     */
    public function show(Customer $customer)
    {
        $customer->load('handler');

        return Inertia::render('Admin/AdminCS/Customers/Show', [
            'customer' => $customer
        ]);
    }

    /**
     * Show the form for editing the customer
     */
    public function edit(Customer $customer)
    {
        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        // Load customer dengan data vendor yang sudah ada
        $customer->load('handler');

        return Inertia::render('Admin/AdminCS/Customers/Edit', [
            'customer' => $customer,
            'vendors' => $vendors
        ]);
    }

    /**
     * Update the specified customer
     */
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'so_number' => 'required|string|max:255',
            'customer_code' => 'required|string|max:255',
            'consignee_shipper' => 'required|string|max:255',
            'awb_bl_number' => 'required|string|max:255',
            'cust_doc_name' => 'nullable|string|max:255',
            'type_qty' => 'nullable|string|max:255',
            'no_kont_pallet' => 'nullable|string|max:255',
            'pol_pod' => 'nullable|string|max:255',
            'eta' => 'nullable|date',
            'vendor' => 'required|array',
            'vendor.vendor_id' => 'required|exists:vendors,id',
            'vendor.deskripsi' => 'required|string|max:500',
            'vendor.nominal' => 'nullable|numeric|min:0',
            'vendor.no_rekening' => 'required|string|max:255',
            'vendor.company_name' => 'required|string|max:255',
            'vendor.nama_rekening' => 'required|string|max:255',
            'vendor.rcvd_inv' => 'nullable|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'so_number.required' => 'SO Number wajib diisi.',
            'customer_code.required' => 'Customer Code wajib diisi.',
            'consignee_shipper.required' => 'Consignee/Shipper wajib diisi.',
            'awb_bl_number.required' => 'AWB/BL Number wajib diisi.',
            'vendor.required' => 'Data vendor harus diisi.',
            'vendor.vendor_id.required' => 'Vendor wajib dipilih.',
            'vendor.vendor_id.exists' => 'Vendor yang dipilih tidak valid.',
            'vendor.deskripsi.required' => 'Deskripsi vendor wajib diisi.',
            'vendor.nominal.numeric' => 'Nominal harus berupa angka.',
            'vendor.no_rekening.required' => 'No Rekening vendor wajib diisi.',
            'vendor.company_name.required' => 'Company Name vendor wajib diisi.',
            'vendor.nama_rekening.required' => 'Nama Rekening vendor wajib diisi',
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
            if ($customer->photo_path) {
                Storage::disk('public')->delete($customer->photo_path);
            }
            $photoPath = $request->file('photo')->store('customers/photos', 'public');
            $validated['photo_path'] = $photoPath;
        }

        if ($request->hasFile('legal_document')) {
            // Delete old document if exists
            if ($customer->legal_document_path) {
                Storage::disk('public')->delete($customer->legal_document_path);
            }
            $legalDocPath = $request->file('legal_document')->store('customers/documents', 'public');
            $validated['legal_document_path'] = $legalDocPath;
        }

        // Prepare vendor data for storage
        $vendorInfo = $validated['vendor'];
        unset($validated['vendor']); // Remove vendor from main validated data
        $validated['vendors'] = $vendorInfo; // Store vendor data in vendors field

        $customer->update($validated);

        return redirect()
            ->route('admin-cs.customers.index')
            ->with('success', 'Data pelanggan berhasil diperbarui.');
    }

    /**
     * Remove the specified customer
     */
    public function destroy(Customer $customer)
    {
        // Delete associated files
        if ($customer->photo_path) {
            Storage::disk('public')->delete($customer->photo_path);
        }

        if ($customer->legal_document_path) {
            Storage::disk('public')->delete($customer->legal_document_path);
        }

        $customer->delete();

        return redirect()
            ->route('admin-cs.customers.index')
            ->with('success', 'Data pelanggan berhasil dihapus.');
    }

    /**
     * Generate PDF for the specified customer
     */
    public function print(Customer $customer)
    {
        // Load the handler relationship
        $customer->load(['handler']);

        try {
            // Generate PDF using dompdf facade
            $pdf = Pdf::loadView('admin.admin-cs.customers.pdf', compact('customer'))
                ->setPaper('a4', 'portrait')
                ->setOptions([
                    'defaultFont' => 'Arial',
                    'isRemoteEnabled' => true,
                    'isHtml5ParserEnabled' => true,
                    'isPhpEnabled' => true,
                    'debugPng' => false,
                    'debugKeepTemp' => false,
                    'debugCss' => false,
                    'debugLayout' => false,
                    'debugLayoutLines' => false,
                    'debugLayoutBlocks' => false,
                    'debugLayoutInline' => false,
                    'debugLayoutPaddingBox' => false,
                ]);
        } catch (\Exception $e) {
            // Fallback: Use dependency injection if facade fails
            try {
                $dompdf = app('dompdf.wrapper');
                $pdf = $dompdf->loadView('admin.admin-cs.customers.pdf', compact('customer'))
                    ->setPaper('a4', 'portrait')
                    ->setOptions([
                        'defaultFont' => 'Arial',
                        'isRemoteEnabled' => true,
                        'isHtml5ParserEnabled' => true,
                        'isPhpEnabled' => true,
                    ]);
            } catch (\Exception $e2) {
                // Final fallback: Use service container resolution
                $pdfService = app(\Barryvdh\DomPDF\PDF::class);
                $pdf = $pdfService->loadView('admin.admin-cs.customers.pdf', compact('customer'))
                    ->setPaper('a4', 'portrait')
                    ->setOptions([
                        'defaultFont' => 'Arial',
                        'isRemoteEnabled' => true,
                        'isHtml5ParserEnabled' => true,
                        'isPhpEnabled' => true,
                    ]);
            }
        }

        // Set filename
        $filename = 'Customer_Data_' . $customer->customer_code . '_' . date('Y-m-d') . '.pdf';

        // Return the PDF as download
        return $pdf->download($filename);
    }
}
