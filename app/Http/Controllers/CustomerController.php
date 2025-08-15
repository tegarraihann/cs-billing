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
        return Inertia::render('Admin/AdminCS/Customers/Create');
    }

    /**
     * Store a newly created customer
     */
    public function store(Request $request)
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
            'vendors' => 'required|array',
            'vendors.*.deskripsi' => 'required|string|max:500',
            'vendors.*.nominal' => 'required|numeric|min:0',
            'vendors.*.no_rekening' => 'required|string|max:255',
            'vendors.*.company_name' => 'required|string|max:255',
            'vendors.*.rcvd_inv' => 'nullable|string|max:255',
        ], [
            'so_number.required' => 'SO Number wajib diisi.',
            'customer_code.required' => 'Customer Code wajib diisi.',
            'consignee_shipper.required' => 'Consignee/Shipper wajib diisi.',
            'awb_bl_number.required' => 'AWB/BL Number wajib diisi.',
            'vendors.required' => 'Minimal satu vendor harus diisi.',
            'vendors.*.deskripsi.required' => 'Deskripsi vendor wajib diisi.',
            'vendors.*.nominal.required' => 'Nominal vendor wajib diisi.',
            'vendors.*.nominal.numeric' => 'Nominal harus berupa angka.',
            'vendors.*.no_rekening.required' => 'No Rekening vendor wajib diisi.',
            'vendors.*.company_name.required' => 'Company Name vendor wajib diisi.',
        ]);

        // Auto increment no
        $lastCustomer = Customer::orderBy('no', 'desc')->first();
        $validated['no'] = $lastCustomer ? $lastCustomer->no + 1 : 1;
        
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
            'so_number' => 'required|string|max:255',
            'customer_code' => 'required|string|max:255',
            'consignee_shipper' => 'required|string|max:255',
            'awb_bl_number' => 'required|string|max:255',
            'cust_doc_name' => 'nullable|string|max:255',
            'type_qty' => 'nullable|string|max:255',
            'no_kont_pallet' => 'nullable|string|max:255',
            'pol_pod' => 'nullable|string|max:255',
            'eta' => 'nullable|date',
            'vendors' => 'required|array',
            'vendors.*.deskripsi' => 'required|string|max:500',
            'vendors.*.nominal' => 'required|numeric|min:0',
            'vendors.*.no_rekening' => 'required|string|max:255',
            'vendors.*.company_name' => 'required|string|max:255',
            'vendors.*.rcvd_inv' => 'nullable|string|max:255',
        ], [
            'so_number.required' => 'SO Number wajib diisi.',
            'customer_code.required' => 'Customer Code wajib diisi.',
            'consignee_shipper.required' => 'Consignee/Shipper wajib diisi.',
            'awb_bl_number.required' => 'AWB/BL Number wajib diisi.',
            'vendors.required' => 'Minimal satu vendor harus diisi.',
            'vendors.*.deskripsi.required' => 'Deskripsi vendor wajib diisi.',
            'vendors.*.nominal.required' => 'Nominal vendor wajib diisi.',
            'vendors.*.nominal.numeric' => 'Nominal harus berupa angka.',
            'vendors.*.no_rekening.required' => 'No Rekening vendor wajib diisi.',
            'vendors.*.company_name.required' => 'Company Name vendor wajib diisi.',
        ]);


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
