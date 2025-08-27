<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\CustomerDocument;
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
                $q->where('company_name', 'like', "%{$search}%")
                    ->orWhere('pic_name', 'like', "%{$search}%")
                    ->orWhere('pic_phone', 'like', "%{$search}%")
                    ->orWhere('pic_email', 'like', "%{$search}%")
                    ->orWhere('marketing_name', 'like', "%{$search}%");
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
        return Inertia::render('Admin/AdminCS/Customers/Create');
    }

    /**
     * Store a newly created customer
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
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
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_documents' => 'nullable|array',
            'legal_documents.*' => 'file|mimes:pdf|max:10240',
        ], [
            'company_name.required' => 'Nama perusahaan wajib diisi.',
            'company_type.required' => 'Jenis usaha wajib dipilih.',
            'company_address.required' => 'Alamat perusahaan wajib diisi.',
            'pic_name.required' => 'Nama PIC wajib diisi.',
            'pic_phone.required' => 'Nomor telepon PIC wajib diisi.',
            'pic_email.required' => 'Email PIC wajib diisi.',
            'pic_email.email' => 'Format email PIC tidak valid.',
            'marketing_email.email' => 'Format email marketing tidak valid.',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Foto harus berformat jpeg, png, jpg, atau gif.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
            'legal_documents.array' => 'Dokumen legal harus berupa array.',
            'legal_documents.*.file' => 'Dokumen legal harus berupa file.',
            'legal_documents.*.mimes' => 'Dokumen legal harus berformat PDF.',
            'legal_documents.*.max' => 'Ukuran dokumen legal maksimal 10MB.',
        ]);

        // Handle file uploads
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('customers/photos', 'public');
            $validated['photo_path'] = $photoPath;
        }

        // Store the customer first to get the ID
        $validated['handled_by'] = Auth::id();
        $validated['last_contact_at'] = now();
        
        $customer = Customer::create($validated);
        
        // Handle multiple legal documents
        if ($request->hasFile('legal_documents')) {
            foreach ($request->file('legal_documents') as $file) {
                $documentPath = $file->store('customers/documents', 'public');
                
                CustomerDocument::create([
                    'customer_id' => $customer->id,
                    'document_name' => $file->getClientOriginalName(),
                    'document_path' => $documentPath,
                    'document_type' => 'legal_document',
                    'file_size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ]);
            }
        }

        return redirect()
            ->route('admin-cs.customers.index')
            ->with('success', 'Data pelanggan berhasil ditambahkan.');
    }

    /**
     * Display the specified customer
     */
    public function show(Customer $customer)
    {
        $customer->load(['handler', 'legalDocuments']);

        return Inertia::render('Admin/AdminCS/Customers/Show', [
            'customer' => $customer
        ]);
    }

    /**
     * Show the form for editing the customer
     */
    public function edit(Customer $customer)
    {
        $customer->load(['handler', 'legalDocuments']);

        return Inertia::render('Admin/AdminCS/Customers/Edit', [
            'customer' => $customer
        ]);
    }

    /**
     * Update the specified customer
     */
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
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
            'photo' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'legal_documents' => 'nullable|array',
            'legal_documents.*' => 'file|mimes:pdf|max:10240',
        ], [
            'company_name.required' => 'Nama perusahaan wajib diisi.',
            'company_type.required' => 'Jenis usaha wajib dipilih.',
            'company_address.required' => 'Alamat perusahaan wajib diisi.',
            'pic_name.required' => 'Nama PIC wajib diisi.',
            'pic_phone.required' => 'Nomor telepon PIC wajib diisi.',
            'pic_email.required' => 'Email PIC wajib diisi.',
            'pic_email.email' => 'Format email PIC tidak valid.',
            'marketing_email.email' => 'Format email marketing tidak valid.',
            'photo.image' => 'File foto harus berupa gambar.',
            'photo.mimes' => 'Foto harus berformat jpeg, png, jpg, atau gif.',
            'photo.max' => 'Ukuran foto maksimal 2MB.',
            'legal_documents.array' => 'Dokumen legal harus berupa array.',
            'legal_documents.*.file' => 'Dokumen legal harus berupa file.',
            'legal_documents.*.mimes' => 'Dokumen legal harus berformat PDF.',
            'legal_documents.*.max' => 'Ukuran dokumen legal maksimal 10MB.',
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

        // Handle multiple legal documents
        if ($request->hasFile('legal_documents')) {
            foreach ($request->file('legal_documents') as $file) {
                $documentPath = $file->store('customers/documents', 'public');
                
                CustomerDocument::create([
                    'customer_id' => $customer->id,
                    'document_name' => $file->getClientOriginalName(),
                    'document_path' => $documentPath,
                    'document_type' => 'legal_document',
                    'file_size' => $file->getSize(),
                    'mime_type' => $file->getMimeType(),
                ]);
            }
        }

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

        // Delete multiple documents
        foreach ($customer->documents as $document) {
            Storage::disk('public')->delete($document->document_path);
        }

        $customer->delete();

        return redirect()
            ->route('admin-cs.customers.index')
            ->with('success', 'Data pelanggan berhasil dihapus.');
    }

    /**
     * Delete a specific document
     */
    public function deleteDocument(CustomerDocument $document)
    {
        // Delete the file from storage
        Storage::disk('public')->delete($document->document_path);
        
        // Delete the record
        $document->delete();

        return response()->json(['message' => 'Dokumen berhasil dihapus.']);
    }

    /**
     * Generate PDF for the specified customer
     */
    public function print(Customer $customer)
    {
        // Load the handler relationship
        $customer->load(['handler', 'legalDocuments']);

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
        $filename = 'Customer_Data_' . str_replace(' ', '_', $customer->company_name) . '_' . date('Y-m-d') . '.pdf';

        // Return the PDF as download
        return $pdf->download($filename);
    }
}