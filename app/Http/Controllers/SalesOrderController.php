<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Barryvdh\DomPDF\Facade\Pdf;
use Barryvdh\DomPDF\PDF as DomPDF;

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

        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        return Inertia::render('Admin/AdminCS/SalesOrders/Create', [
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

        // Prepare vendor data for storage
        $vendorInfo = $validated['vendor'];
        unset($validated['vendor']); // Remove vendor from main validated data
        $validated['vendors'] = $vendorInfo; // Store vendor data in vendors field

        // Remove voucher data from sales order data
        $paymentVouchers = $validated['payment_vouchers'] ?? [];
        $receiptVouchers = $validated['receipt_vouchers'] ?? [];
        unset($validated['payment_vouchers'], $validated['receipt_vouchers']);

        $salesOrder = SalesOrder::create($validated);

        // Create vouchers
        $this->createVouchers($salesOrder, $paymentVouchers, Voucher::TYPE_PAYMENT);
        $this->createVouchers($salesOrder, $receiptVouchers, Voucher::TYPE_RECEIPT);

        return redirect()
            ->route('admin-cs.sales-orders.index')
            ->with('success', 'Sales Order berhasil dibuat.');
    }

    /**
     * Display the specified sales order
     */
    public function show(SalesOrder $salesOrder)
    {
        $salesOrder->load(['creator', 'vouchers']);

        return Inertia::render('Admin/AdminCS/SalesOrders/Show', [
            'salesOrder' => $salesOrder,
            'paymentVouchers' => $salesOrder->paymentVouchers,
            'receiptVouchers' => $salesOrder->receiptVouchers,
        ]);
    }

    /**
     * Show the form for editing the specified sales order
     */
    public function edit(SalesOrder $salesOrder)
    {
        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        return Inertia::render('Admin/AdminCS/SalesOrders/Edit', [
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
     * Release the specified sales order
     */
    public function release(SalesOrder $salesOrder)
    {
        // Check if sales order can be released
        if ($salesOrder->status === 'released' || $salesOrder->status === 'confirmed' || $salesOrder->status === 'approved' || $salesOrder->status === 'rejected') {
            return redirect()->back()->withErrors(['error' => 'Sales order sudah diproses sebelumnya.']);
        }

        // Validate required fields before release
        $requiredFields = ['order_number', 'customer'];
        $missingFields = [];
        
        foreach ($requiredFields as $field) {
            if (empty($salesOrder->$field)) {
                $missingFields[] = $field;
            }
        }

        if (!empty($missingFields)) {
            return redirect()->back()->withErrors(['error' => 'Field berikut harus diisi sebelum merilis: ' . implode(', ', $missingFields)]);
        }

        // Update status to released and set release timestamp
        $salesOrder->update([
            'status' => 'released',
            'released_at' => now(),
            'released_by' => Auth::id(),
        ]);

        // TODO: Send notification to admin keuangan (implement later)
        // $this->notifyFinanceAdmin($salesOrder);

        return redirect()->back()->with('success', 'Sales order berhasil dirilis dan dikirim ke admin keuangan.');
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
                $pdf = $dompdf->loadView('admin.admin-cs.sales-orders.pdf', compact('salesOrder'))
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
                $pdf = $pdfService->loadView('admin.admin-cs.sales-orders.pdf', compact('salesOrder'))
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
        $filename = 'Sales_Order_' . $salesOrder->order_number . '_' . date('Y-m-d') . '.pdf';

        // Return the PDF as download
        return $pdf->download($filename);
    }

    /**
     * Create vouchers for a sales order
     */
    private function createVouchers(SalesOrder $salesOrder, array $vouchers, string $type)
    {
        foreach ($vouchers as $voucherData) {
            if (empty($voucherData['voucher_no']) || empty($voucherData['description']) || empty($voucherData['amount'])) {
                continue; // Skip empty vouchers
            }

            $salesOrder->vouchers()->create([
                'type' => $type,
                'voucher_no' => $voucherData['voucher_no'],
                'date' => $voucherData['date'],
                'description' => $voucherData['description'],
                'amount' => $voucherData['amount'],
                'total' => $voucherData['amount'], // For now, total = amount (will be calculated later if needed)
                'status' => Voucher::STATUS_DRAFT,
                'prepared_by' => $voucherData['prepared_by'] ?? Auth::user()->name,
                'authorized_by' => $voucherData['authorized_by'] ?? null,
                'finance_by' => $voucherData['finance_by'] ?? null,
                'receipt_by' => $voucherData['receipt_by'] ?? null,
            ]);
        }
    }

    /**
     * Release vouchers for a sales order
     */
    public function releaseVouchers(SalesOrder $salesOrder)
    {
        $unreleasedVouchers = $salesOrder->vouchers()->where('status', Voucher::STATUS_DRAFT)->get();
        
        foreach ($unreleasedVouchers as $voucher) {
            $voucher->update([
                'status' => Voucher::STATUS_RELEASED,
                'released_at' => now(),
            ]);
        }

        return redirect()->back()->with('success', 'Vouchers berhasil dirilis.');
    }

    /**
     * Update voucher status (for Admin Finance)
     */
    public function approveVoucher(Voucher $voucher)
    {
        if (!$voucher->canBeApproved()) {
            return redirect()->back()->withErrors(['error' => 'Voucher tidak dapat disetujui pada status saat ini.']);
        }

        $voucher->update([
            'status' => Voucher::STATUS_APPROVED,
            'approved_at' => now(),
            'finance_by' => Auth::user()->name,
        ]);

        return redirect()->back()->with('success', 'Voucher berhasil disetujui.');
    }

}
