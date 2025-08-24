<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    /**
     * Display a listing of customers
     */
    public function index(Request $request)
    {
        $query = Customer::with(['handler']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('customer_code', 'like', "%{$search}%")
                    ->orWhere('company_name', 'like', "%{$search}%")
                    ->orWhere('pic_name', 'like', "%{$search}%")
                    ->orWhere('pic_email', 'like', "%{$search}%");
            });
        }

        $customers = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminKeuangan/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new customer
     */
    public function create(Request $request)
    {
        return Inertia::render('Admin/AdminKeuangan/Customers/Create');
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
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'so_number.required' => 'SO Number wajib diisi.',
            'customer_code.required' => 'Customer Code wajib diisi.',
            'consignee_shipper.required' => 'Consignee/Shipper wajib diisi.',
            'awb_bl_number.required' => 'AWB/BL Number wajib diisi.',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Foto harus berformat jpeg, png, jpg, atau gif.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
            'legal_document.file' => 'Dokumen legal harus berupa file.',
            'legal_document.mimes' => 'Dokumen legal harus berformat PDF.',
            'legal_document.max' => 'Ukuran dokumen legal maksimal 10MB.',
        ]);

        // Generate auto number for customer
        $lastCustomer = Customer::orderBy('id', 'desc')->first();
        $nextNumber = $lastCustomer ? ($lastCustomer->id + 1) : 1;
        $validated['no'] = str_pad($nextNumber, 3, '0', STR_PAD_LEFT);

        // Handle file uploads
        if ($request->hasFile('photo')) {
            $validated['photo_path'] = $request->file('photo')->store('customers/photos', 'public');
        }

        if ($request->hasFile('legal_document')) {
            $validated['legal_document_path'] = $request->file('legal_document')->store('customers/documents', 'public');
        }

        $validated['handled_by'] = Auth::id();
        $validated['last_contact_at'] = now();

        Customer::create($validated);

        return redirect()
            ->route('admin-keuangan.customers.index')
            ->with('success', 'Data pelanggan berhasil ditambahkan.');
    }

    /**
     * Display the specified customer
     */
    public function show(Customer $customer)
    {
        $customer->load('handler');

        return Inertia::render('Admin/AdminKeuangan/Customers/Show', [
            'customer' => $customer
        ]);
    }

    /**
     * Show the form for editing the specified customer
     */
    public function edit(Customer $customer)
    {
        $customer->load('handler');

        return Inertia::render('Admin/AdminKeuangan/Customers/Edit', [
            'customer' => $customer
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
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'so_number.required' => 'SO Number wajib diisi.',
            'customer_code.required' => 'Customer Code wajib diisi.',
            'consignee_shipper.required' => 'Consignee/Shipper wajib diisi.',
            'awb_bl_number.required' => 'AWB/BL Number wajib diisi.',
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
            $validated['photo_path'] = $request->file('photo')->store('customers/photos', 'public');
        }

        if ($request->hasFile('legal_document')) {
            // Delete old document if exists
            if ($customer->legal_document_path) {
                Storage::disk('public')->delete($customer->legal_document_path);
            }
            $validated['legal_document_path'] = $request->file('legal_document')->store('customers/documents', 'public');
        }

        $customer->update($validated);

        return redirect()
            ->route('admin-keuangan.customers.index')
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
            ->route('admin-keuangan.customers.index')
            ->with('success', 'Data pelanggan berhasil dihapus.');
    }
}