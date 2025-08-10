<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

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
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Filter by source
        if ($request->has('source') && $request->source) {
            $query->where('inquiry_source', $request->source);
        }

        $customers = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminCS/Customers/Index', [
            'customers' => $customers,
            'filters' => $request->only(['search', 'status', 'source']),
            'statuses' => [
                'new' => 'Baru',
                'contacted' => 'Dihubungi',
                'quoted' => 'Dikutip',
                'converted' => 'Konversi',
                'closed' => 'Ditutup'
            ],
            'sources' => [
                'whatsapp' => 'WhatsApp',
                'email' => 'Email',
                'phone' => 'Telepon',
                'website' => 'Website'
            ]
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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'phone' => 'required|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:1000',
            'inquiry_source' => 'required|in:whatsapp,email,phone,website',
            'status' => 'required|in:new,contacted,quoted,converted,closed',
            'notes' => 'nullable|string|max:2000'
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'name.max' => 'Nama lengkap maksimal 255 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar dalam sistem.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',
            'company.max' => 'Nama perusahaan maksimal 255 karakter.',
            'address.max' => 'Alamat maksimal 1000 karakter.',
            'inquiry_source.required' => 'Sumber inquiry wajib dipilih.',
            'inquiry_source.in' => 'Sumber inquiry tidak valid.',
            'status.required' => 'Status wajib dipilih.',
            'status.in' => 'Status tidak valid.',
            'notes.max' => 'Catatan maksimal 2000 karakter.'
        ]);

        $validated['handled_by'] = Auth::id();
        $validated['last_contact_at'] = now();

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
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email,' . $customer->id,
            'phone' => 'required|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:1000',
            'inquiry_source' => 'required|in:whatsapp,email,phone,website',
            'status' => 'required|in:new,contacted,quoted,converted,closed',
            'notes' => 'nullable|string|max:2000'
        ], [
            'name.required' => 'Nama lengkap wajib diisi.',
            'name.max' => 'Nama lengkap maksimal 255 karakter.',
            'email.required' => 'Email wajib diisi.',
            'email.email' => 'Format email tidak valid.',
            'email.unique' => 'Email sudah terdaftar dalam sistem.',
            'phone.required' => 'Nomor telepon wajib diisi.',
            'phone.max' => 'Nomor telepon maksimal 20 karakter.',
            'company.max' => 'Nama perusahaan maksimal 255 karakter.',
            'address.max' => 'Alamat maksimal 1000 karakter.',
            'inquiry_source.required' => 'Sumber inquiry wajib dipilih.',
            'inquiry_source.in' => 'Sumber inquiry tidak valid.',
            'status.required' => 'Status wajib dipilih.',
            'status.in' => 'Status tidak valid.',
            'notes.max' => 'Catatan maksimal 2000 karakter.'
        ]);

        // Update last_contact_at if status changed to contacted, quoted, or converted
        if (
            in_array($validated['status'], ['contacted', 'quoted', 'converted']) &&
            $customer->status !== $validated['status']
        ) {
            $validated['last_contact_at'] = now();
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
        $customer->delete();

        return redirect()
            ->route('admin-cs.customers.index')
            ->with('success', 'Data pelanggan berhasil dihapus.');
    }
}
