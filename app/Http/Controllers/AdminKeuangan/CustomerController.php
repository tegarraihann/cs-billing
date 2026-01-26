<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
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

        $trimmedName = "TRIM(customers.company_name)";
        $upperTrimmedName = "UPPER(TRIM(customers.company_name))";
        $sortKey = "TRIM(CASE " .
            "WHEN {$upperTrimmedName} LIKE 'PT.%' THEN SUBSTRING({$trimmedName}, 4) " .
            "WHEN {$upperTrimmedName} LIKE 'PT %' THEN SUBSTRING({$trimmedName}, 4) " .
            "WHEN {$upperTrimmedName} LIKE 'PT%' THEN SUBSTRING({$trimmedName}, 3) " .
            "WHEN {$upperTrimmedName} LIKE 'CV.%' THEN SUBSTRING({$trimmedName}, 4) " .
            "WHEN {$upperTrimmedName} LIKE 'CV %' THEN SUBSTRING({$trimmedName}, 4) " .
            "WHEN {$upperTrimmedName} LIKE 'CV%' THEN SUBSTRING({$trimmedName}, 3) " .
            "WHEN {$upperTrimmedName} LIKE 'UD.%' THEN SUBSTRING({$trimmedName}, 4) " .
            "WHEN {$upperTrimmedName} LIKE 'UD %' THEN SUBSTRING({$trimmedName}, 4) " .
            "WHEN {$upperTrimmedName} LIKE 'UD%' THEN SUBSTRING({$trimmedName}, 3) " .
            "WHEN {$upperTrimmedName} LIKE 'YAYASAN %' THEN SUBSTRING({$trimmedName}, 9) " .
            "WHEN {$upperTrimmedName} LIKE 'KOPERASI %' THEN SUBSTRING({$trimmedName}, 10) " .
            "WHEN {$upperTrimmedName} LIKE 'FIRMA %' THEN SUBSTRING({$trimmedName}, 7) " .
            "ELSE {$trimmedName} END)";

        $customers = $query
            ->select('customers.*')
            ->selectRaw("{$sortKey} as sort_name")
            ->orderByRaw('sort_name asc')
            ->orderByRaw("{$trimmedName} asc")
            ->orderBy('created_at', 'desc')
            ->paginate(15);

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
            // Customer Code (auto-generated if not provided)
            'customer_code' => 'nullable|string|max:255|unique:customers,customer_code',
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
            // File uploads
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Foto harus berformat jpeg, png, jpg, atau gif.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
            'legal_document.file' => 'Dokumen legal harus berupa file.',
            'legal_document.mimes' => 'Dokumen legal harus berformat PDF.',
            'legal_document.max' => 'Ukuran dokumen legal maksimal 10MB.',
        ]);

        // Generate customer_code if not provided
        if (empty($validated['customer_code'])) {
            $lastCustomer = Customer::orderBy('id', 'desc')->first();
            $nextNumber = $lastCustomer ? ($lastCustomer->id + 1) : 1;
            $validated['customer_code'] = 'CUST' . str_pad($nextNumber, 4, '0', STR_PAD_LEFT);
        }

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

        // Map PIC data to legacy fields for compatibility
        $validated['name'] = $validated['pic_name'];
        $validated['email'] = $validated['pic_email'];
        $validated['phone'] = $validated['pic_phone'];

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
            // Customer Code (auto-generated if not provided)
            'customer_code' => 'nullable|string|max:255|unique:customers,customer_code,' . $customer->id,
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
            // File uploads
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_document' => 'nullable|file|mimes:pdf|max:10240',
        ], [
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

        // Map PIC data to legacy fields for compatibility
        $validated['name'] = $validated['pic_name'];
        $validated['email'] = $validated['pic_email'];
        $validated['phone'] = $validated['pic_phone'];

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

    /**
     * Generate PDF for individual customer
     */
    public function generatePdf(Customer $customer)
    {
        try {
            $pdf = Pdf::loadView('admin.admin-keuangan.customers.pdf', [
                'customer' => $customer,
                'type' => 'individual'
            ]);
            
            $pdf->setPaper('A4', 'landscape');
            
            $fileName = 'customer-' . str_replace([' ', '/'], '-', $customer->company_name) . '-' . date('Y-m-d') . '.pdf';
            return $pdf->stream($fileName);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Export all customers to PDF
     */
    public function exportAllPdf(Request $request)
    {
        try {
            $query = Customer::query();

            // Apply search if provided
            if ($request->has('search') && $request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('company_name', 'like', "%{$search}%")
                        ->orWhere('contact_person', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('address', 'like', "%{$search}%");
                });
            }

            $customers = $query->orderBy('company_name', 'asc')->get();
            
            $pdf = Pdf::loadView('admin.admin-keuangan.customers.pdf', [
                'customers' => $customers,
                'type' => 'all',
                'search' => $request->search
            ]);
            
            $pdf->setPaper('A4', 'landscape');
            
            return $pdf->stream('daftar-customer-' . date('Y-m-d') . '.pdf');
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
