<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class SalesOrderController extends Controller
{
    public function index(Request $request)
    {
        $query = SalesOrder::with(['creator', 'releasedBy', 'vouchers'])
            ->where('status', 'released')
            ->orderBy('released_at', 'desc');

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('customer', 'like', "%{$search}%")
                  ->orWhere('invoice_number', 'like', "%{$search}%");
            });
        }

        $salesOrders = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Index', [
            'salesOrders' => $salesOrders,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show(SalesOrder $salesOrder)
    {
        if ($salesOrder->status !== 'released') {
            return redirect()->route('admin-keuangan.sales-orders.index')
                ->withErrors(['error' => 'Sales order belum dirilis oleh CS.']);
        }

        $salesOrder->load(['creator', 'releasedBy', 'vouchers']);

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Show', [
            'salesOrder' => $salesOrder,
        ]);
    }

    public function approve(SalesOrder $salesOrder)
    {
        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis atau sudah diproses.']);
        }

        $salesOrder->update([
            'status' => 'approved',
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Sales order berhasil disetujui.');
    }

    public function reject(Request $request, SalesOrder $salesOrder)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500'
        ]);

        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis atau sudah diproses.']);
        }

        $salesOrder->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'rejected_by' => auth()->id(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', 'Sales order berhasil ditolak.');
    }

    public function approveVoucher(Request $request, SalesOrder $salesOrder, Voucher $voucher)
    {
        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis.']);
        }

        if ($voucher->sales_order_id !== $salesOrder->id) {
            return redirect()->back()->withErrors(['error' => 'Voucher tidak terkait dengan sales order ini.']);
        }

        if ($voucher->status !== Voucher::STATUS_RELEASED) {
            return redirect()->back()->withErrors(['error' => 'Voucher belum dirilis atau sudah diproses.']);
        }

        $voucher->update([
            'status' => Voucher::STATUS_APPROVED,
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Voucher berhasil disetujui.');
    }

    public function rejectVoucher(Request $request, SalesOrder $salesOrder, Voucher $voucher)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500'
        ]);

        if ($salesOrder->status !== 'released') {
            return redirect()->back()->withErrors(['error' => 'Sales order belum dirilis.']);
        }

        if ($voucher->sales_order_id !== $salesOrder->id) {
            return redirect()->back()->withErrors(['error' => 'Voucher tidak terkait dengan sales order ini.']);
        }

        if ($voucher->status !== Voucher::STATUS_RELEASED) {
            return redirect()->back()->withErrors(['error' => 'Voucher belum dirilis atau sudah diproses.']);
        }

        $voucher->update([
            'status' => 'rejected',
            'rejected_at' => now(),
            'rejected_by' => auth()->id(),
            'rejection_reason' => $request->rejection_reason,
        ]);

        return redirect()->back()->with('success', 'Voucher berhasil ditolak.');
    }

    /**
     * Show the form for creating a new sales order
     */
    public function create(Request $request)
    {
        $customers = Customer::select('id', 'customer_code', 'consignee_shipper', 'awb_bl_number', 'pol_pod', 'eta')
            ->orderBy('customer_code')
            ->get();

        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Create', [
            'customers' => $customers,
            'vendors' => $vendors
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
            'commodity' => 'nullable|string',
            'qty' => 'nullable|integer|min:0',
            'net_weight' => 'nullable|numeric|min:0',
            'container_no' => 'nullable|string|max:255',
            'invoice_number' => 'nullable|string|max:255',
            'invoice_date' => 'nullable|date',
            'top' => 'nullable|string|max:255',
            
            // Vendor data
            'vendor' => 'required|array',
            'vendor.vendor_id' => 'required|exists:vendors,id',
            'vendor.deskripsi' => 'required|string|max:500',
            'vendor.nominal' => 'nullable|numeric|min:0',
            'vendor.no_rekening' => 'required|string|max:255',
            'vendor.company_name' => 'required|string|max:255',
            'vendor.nama_rekening' => 'required|string|max:255',
            'vendor.rcvd_inv' => 'nullable|string|max:255',
            
            // Voucher data
            'payment_vouchers' => 'nullable|array',
            'payment_vouchers.*.voucher_no' => 'required_with:payment_vouchers|string|max:255',
            'payment_vouchers.*.date' => 'required_with:payment_vouchers|date',
            'payment_vouchers.*.description' => 'required_with:payment_vouchers|string',
            'payment_vouchers.*.amount' => 'required_with:payment_vouchers|numeric|min:0',
            'payment_vouchers.*.prepared_by' => 'nullable|string|max:255',
            'payment_vouchers.*.authorized_by' => 'nullable|string|max:255',
            'payment_vouchers.*.finance_by' => 'nullable|string|max:255',
            'payment_vouchers.*.receipt_by' => 'nullable|string|max:255',
            
            'receipt_vouchers' => 'nullable|array',
            'receipt_vouchers.*.voucher_no' => 'required_with:receipt_vouchers|string|max:255',
            'receipt_vouchers.*.date' => 'required_with:receipt_vouchers|date',
            'receipt_vouchers.*.description' => 'required_with:receipt_vouchers|string',
            'receipt_vouchers.*.amount' => 'required_with:receipt_vouchers|numeric|min:0',
            'receipt_vouchers.*.prepared_by' => 'nullable|string|max:255',
            'receipt_vouchers.*.authorized_by' => 'nullable|string|max:255',
            'receipt_vouchers.*.finance_by' => 'nullable|string|max:255',
            'receipt_vouchers.*.receipt_by' => 'nullable|string|max:255',
        ]);

        $validated['created_by'] = Auth::id();
        
        // Prepare vendor data for storage
        $vendorInfo = $validated['vendor'];
        unset($validated['vendor']); // Remove vendor from main validated data
        $validated['vendors'] = $vendorInfo; // Store vendor data in vendors field

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

        // Remove voucher data from sales order data
        $paymentVouchers = $validated['payment_vouchers'] ?? [];
        $receiptVouchers = $validated['receipt_vouchers'] ?? [];
        unset($validated['payment_vouchers'], $validated['receipt_vouchers']);

        $salesOrder = SalesOrder::create($validated);

        // Create vouchers
        $this->createVouchers($salesOrder, $paymentVouchers, Voucher::TYPE_PAYMENT);
        $this->createVouchers($salesOrder, $receiptVouchers, Voucher::TYPE_RECEIPT);

        return redirect()
            ->route('admin-keuangan.sales-orders.index')
            ->with('success', 'Sales Order berhasil dibuat.');
    }

    /**
     * Show the form for editing the specified sales order
     */
    public function edit(SalesOrder $salesOrder)
    {
        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Edit', [
            'salesOrder' => $salesOrder,
            'vendors' => $vendors
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
            'commodity' => 'nullable|string',
            'qty' => 'nullable|integer|min:0',
            'net_weight' => 'nullable|numeric|min:0',
            'container_no' => 'nullable|string|max:255',
            'invoice_number' => 'nullable|string|max:255',
            'invoice_date' => 'nullable|date',
            'top' => 'nullable|string|max:255',
            
            // Vendor data
            'vendor' => 'required|array',
            'vendor.vendor_id' => 'required|exists:vendors,id',
            'vendor.deskripsi' => 'required|string|max:500',
            'vendor.nominal' => 'nullable|numeric|min:0',
            'vendor.no_rekening' => 'required|string|max:255',
            'vendor.company_name' => 'required|string|max:255',
            'vendor.nama_rekening' => 'required|string|max:255',
            'vendor.rcvd_inv' => 'nullable|string|max:255',
        ]);

        // Prepare vendor data for storage
        $vendorInfo = $validated['vendor'];
        unset($validated['vendor']); // Remove vendor from main validated data
        $validated['vendors'] = $vendorInfo; // Store vendor data in vendors field

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
            ->route('admin-keuangan.sales-orders.index')
            ->with('success', 'Sales Order berhasil diperbarui.');
    }

    /**
     * Remove the specified sales order
     */
    public function destroy(SalesOrder $salesOrder)
    {
        // Delete related vouchers
        $salesOrder->vouchers()->delete();
        
        $salesOrder->delete();

        return redirect()
            ->route('admin-keuangan.sales-orders.index')
            ->with('success', 'Sales Order berhasil dihapus.');
    }

    /**
     * Generate PDF for the specified sales order
     */
    public function print(SalesOrder $salesOrder)
    {
        // Check if sales order has been released
        if ($salesOrder->status !== 'released' && $salesOrder->status !== 'confirmed' && $salesOrder->status !== 'approved') {
            return redirect()->back()->withErrors(['error' => 'Sales order harus dirilis terlebih dahulu sebelum dapat dicetak.']);
        }

        // Load the creator relationship
        $salesOrder->load(['creator']);

        try {
            // Try using the Facade first
            $pdf = Pdf::loadView('admin.admin-cs.sales-orders.pdf', compact('salesOrder'))
                ->setPaper('a4', 'portrait')
                ->setOptions([
                    'defaultFont' => 'Arial',
                    'isRemoteEnabled' => true,
                    'isHtml5ParserEnabled' => true,
                    'isPhpEnabled' => true,
                ]);

            return $pdf->download('sales-order-' . $salesOrder->order_number . '.pdf');

        } catch (\Exception $e) {
            \Log::error('PDF Generation Error: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Gagal membuat PDF: ' . $e->getMessage()]);
        }
    }

    /**
     * Helper method to create vouchers
     */
    private function createVouchers(SalesOrder $salesOrder, array $vouchers, string $type)
    {
        foreach ($vouchers as $voucherData) {
            if (!empty($voucherData['voucher_no'])) {
                Voucher::create([
                    'sales_order_id' => $salesOrder->id,
                    'voucher_no' => $voucherData['voucher_no'],
                    'type' => $type,
                    'date' => $voucherData['date'],
                    'description' => $voucherData['description'],
                    'amount' => $voucherData['amount'],
                    'prepared_by' => $voucherData['prepared_by'],
                    'authorized_by' => $voucherData['authorized_by'],
                    'finance_by' => $voucherData['finance_by'],
                    'receipt_by' => $voucherData['receipt_by'],
                    'status' => Voucher::STATUS_DRAFT,
                    'created_by' => Auth::id(),
                ]);
            }
        }
    }
}