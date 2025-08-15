<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;

class SalesOrderController extends Controller
{
    /**
     * Display a listing of sales orders
     */
    public function index(Request $request)
    {
        $query = SalesOrder::with(['creator']);

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('customer', 'like', "%{$search}%")
                    ->orWhere('shipper', 'like', "%{$search}%");
            });
        }

        $salesOrders = $query->orderBy('created_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminCS/SalesOrders/Index', [
            'salesOrders' => $salesOrders,
            'filters' => $request->only(['search'])
        ]);
    }

    /**
     * Show the form for creating a new sales order
     */
    public function create(Request $request)
    {
        $customers = Customer::select('id', 'customer_code', 'consignee_shipper', 'awb_bl_number', 'pol_pod', 'eta')
            ->orderBy('customer_code')
            ->get();

        return Inertia::render('Admin/AdminCS/SalesOrders/Create', [
            'customers' => $customers
        ]);
    }

    /**
     * Store a newly created sales order
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // Required fields based on requirements only
            'order_number' => 'required|string|max:255',
            'customer' => 'required|string|max:255',
            'shipper' => 'nullable|string|max:255',
            'bl_awb' => 'nullable|string|max:255',
            'liner' => 'nullable|string|max:255',
            'vessel' => 'nullable|string|max:255',
            'eta' => 'nullable|date',
            'aju' => 'nullable|string|max:255',
            'sppb_date' => 'nullable|date',
            'shipment_type' => 'nullable|string|max:255',
            'pol' => 'nullable|string|max:255',
            'pod' => 'nullable|string|max:255',
            'gudang_utc' => 'nullable|string|max:255',
            'party_lcl' => 'nullable|string|max:255',
            'prepared_by' => 'nullable|string|max:255',
            'exchange_rate' => 'nullable|numeric|min:0',
            'jenis_biaya' => 'nullable|string|in:OF/AF,HANDLING,PIB EDI,ADMIN DOC,TRUCKING,D/O CHARGES,LOLO,STORAGE,REFUND,OTHER',
            'buying' => 'nullable|numeric|min:0',
            'selling' => 'nullable|numeric|min:0',
            'revenue' => 'nullable|numeric|min:0',
            'remarks' => 'nullable|string',
            'goods' => 'nullable|string',
            'container_no' => 'nullable|string|max:255',
            'invoice_number' => 'nullable|string|max:255',
            'invoice_date' => 'nullable|date',
            'top' => 'nullable|string|max:255',
        ]);

        $validated['created_by'] = Auth::id();
        
        // Set legacy fields for backward compatibility
        $validated['so_number'] = $validated['order_number'];
        $validated['so_date'] = now()->toDateString();
        $validated['customer_name'] = $validated['customer'];
        $validated['customer_address'] = 'N/A';
        $validated['consignee_shipper'] = $validated['shipper'] ?? 'N/A';
        $validated['shipping_address'] = 'N/A';
        $validated['service_description'] = 'Sales Order';
        $validated['total_amount'] = $validated['selling'] ?? 0;
        $validated['status'] = 'draft';

        SalesOrder::create($validated);

        return redirect()
            ->route('admin-cs.sales-orders.index')
            ->with('success', 'Sales Order berhasil dibuat.');
    }

    /**
     * Display the specified sales order
     */
    public function show(SalesOrder $salesOrder)
    {
        $salesOrder->load(['creator']);

        return Inertia::render('Admin/AdminCS/SalesOrders/Show', [
            'salesOrder' => $salesOrder
        ]);
    }

    /**
     * Show the form for editing the specified sales order
     */
    public function edit(SalesOrder $salesOrder)
    {
        return Inertia::render('Admin/AdminCS/SalesOrders/Edit', [
            'salesOrder' => $salesOrder
        ]);
    }

    /**
     * Update the specified sales order
     */
    public function update(Request $request, SalesOrder $salesOrder)
    {
        $validated = $request->validate([
            // Required fields based on requirements only
            'order_number' => 'required|string|max:255',
            'customer' => 'required|string|max:255',
            'shipper' => 'nullable|string|max:255',
            'bl_awb' => 'nullable|string|max:255',
            'liner' => 'nullable|string|max:255',
            'vessel' => 'nullable|string|max:255',
            'eta' => 'nullable|date',
            'aju' => 'nullable|string|max:255',
            'sppb_date' => 'nullable|date',
            'shipment_type' => 'nullable|string|max:255',
            'pol' => 'nullable|string|max:255',
            'pod' => 'nullable|string|max:255',
            'gudang_utc' => 'nullable|string|max:255',
            'party_lcl' => 'nullable|string|max:255',
            'prepared_by' => 'nullable|string|max:255',
            'exchange_rate' => 'nullable|numeric|min:0',
            'jenis_biaya' => 'nullable|string|in:OF/AF,HANDLING,PIB EDI,ADMIN DOC,TRUCKING,D/O CHARGES,LOLO,STORAGE,REFUND,OTHER',
            'buying' => 'nullable|numeric|min:0',
            'selling' => 'nullable|numeric|min:0',
            'revenue' => 'nullable|numeric|min:0',
            'remarks' => 'nullable|string',
            'goods' => 'nullable|string',
            'container_no' => 'nullable|string|max:255',
            'invoice_number' => 'nullable|string|max:255',
            'invoice_date' => 'nullable|date',
            'top' => 'nullable|string|max:255',
        ]);

        // Set legacy fields for backward compatibility
        $validated['so_number'] = $validated['order_number'];
        $validated['so_date'] = now()->toDateString();
        $validated['customer_name'] = $validated['customer'];
        $validated['customer_address'] = 'N/A';
        $validated['consignee_shipper'] = $validated['shipper'] ?? 'N/A';
        $validated['shipping_address'] = 'N/A';
        $validated['service_description'] = 'Sales Order';
        $validated['total_amount'] = $validated['selling'] ?? 0;
        $validated['status'] = 'draft';

        $salesOrder->update($validated);

        return redirect()
            ->route('admin-cs.sales-orders.index')
            ->with('success', 'Sales Order berhasil diperbarui.');
    }

    /**
     * Remove the specified sales order
     */
    public function destroy(SalesOrder $salesOrder)
    {
        $salesOrder->delete();

        return redirect()
            ->route('admin-cs.sales-orders.index')
            ->with('success', 'Sales Order berhasil dihapus.');
    }

    /**
     * Generate PDF for the specified sales order
     */
    public function print(SalesOrder $salesOrder)
    {
        // Load the creator relationship
        $salesOrder->load(['creator']);

        // Generate PDF using the blade template
        $pdf = Pdf::loadView('admin.admin-cs.sales-orders.pdf', compact('salesOrder'))
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

        // Set filename
        $filename = 'Sales_Order_' . $salesOrder->order_number . '_' . date('Y-m-d') . '.pdf';

        // Return the PDF as download
        return $pdf->download($filename);
    }

}
