<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\Voucher;
use App\Models\ShipmentType;
use App\Models\ReimbursementItem;
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
        $customers = Customer::select('id', 'company_name', 'pic_name', 'pic_email', 'marketing_name')
            ->orderBy('company_name')
            ->get();

        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        $shipmentTypes = ShipmentType::active()
            ->select('id', 'name', 'code', 'description')
            ->orderBy('name')
            ->get();

        // Generate order number automatically
        $orderNumber = SalesOrder::generateOrderNumber();

        return Inertia::render('Admin/AdminCS/SalesOrders/Create', [
            'customers' => $customers,
            'vendors' => $vendors,
            'shipmentTypes' => $shipmentTypes,
            'orderNumber' => $orderNumber
        ]);
    }

    /**
     * Store a newly created sales order
     */
    public function store(Request $request)
    {

        try {
            $validated = $request->validate([
            // Required fields based on requirements only
            'order_number' => 'required|string|regex:/^EWILOG\d{10}$/|unique:sales_orders,order_number',
            'ref_no' => 'nullable|string|max:255',
            'so_date' => 'nullable|date',
            'customer' => 'required|string|max:255',
            'shipper' => 'nullable|string|max:255',
            'bl_awb' => 'nullable|string|max:255',
            'liner' => 'nullable|string|max:255',
            'vessel' => 'nullable|string|max:255',
            'eta' => 'nullable|date',
            'etd' => 'nullable|date',
            'aju' => 'nullable|string|max:255',
            'sppb_date' => 'nullable|date',
            'shipment_type' => 'nullable|string|max:255',
            'pol' => 'nullable|string|max:255',
            'pod' => 'nullable|string|max:255',
            'gudang_utc' => 'nullable|string|max:255',
            'party_lcl' => 'nullable|string|max:255',
            'prepared_by' => 'nullable|string|max:255',
            'exchange_rate' => 'nullable|numeric|min:0',
            'vendor_breakdown' => 'nullable|array',
            'vendor_breakdown.*.vendor_id' => 'nullable|exists:vendors,id',
            'vendor_breakdown.*.nama_vendor' => 'nullable|string|max:255',
            'vendor_breakdown.*.no_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.nama_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.description' => 'nullable|string|in:,OF/AF,HANDLING,PIB EDI,ADMIN DOC,TRUCKING,D/O CHARGES,LOLO,STORAGE,REFUND,OTHER',
            'vendor_breakdown.*.buying_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.selling_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.rcvd_inv' => 'nullable|string|max:255',
            'vendor_breakdown.*.remarks' => 'nullable|string|max:500',

            // Other costs validation
            'other_costs' => 'nullable|array',
            'other_costs.*.description' => 'required_with:other_costs|string|max:255',
            'other_costs.*.amount' => 'required_with:other_costs|numeric|min:0',
            'other_costs.*.category' => 'nullable|string|max:100',
            'remarks' => 'nullable|string',
            'note' => 'nullable|string',
            'commodity' => 'nullable|string',
            'qty' => 'nullable|integer|min:0',
            'net_weight' => 'nullable|numeric|min:0',
            'measurement' => 'nullable|numeric|min:0',
            'container_no' => 'nullable',
            'invoice_number' => 'nullable|string|max:255',
            'invoice_date' => 'nullable|date',
            'top' => 'nullable|string|max:255',
            
            // Vendor details (multiple vendors support) - now optional
            'vendor_details' => 'nullable|array',
            'vendor_details.*.vendor_id' => 'required_with:vendor_details|exists:vendors,id',
            'vendor_details.*.deskripsi' => 'required_with:vendor_details|string|max:500',
            'vendor_details.*.nominal' => 'required_with:vendor_details|numeric|min:0',
            'vendor_details.*.no_rekening' => 'required_with:vendor_details|string|max:255',
            'vendor_details.*.nama_vendor' => 'required_with:vendor_details|string|max:255',
            'vendor_details.*.nama_rekening' => 'required_with:vendor_details|string|max:255',
            'vendor_details.*.rcvd_inv' => 'nullable|string|max:255',
            
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

            // Reimbursement items validation
            'reimbursement_items' => 'nullable|array',
            'reimbursement_items.*.description' => 'required_with:reimbursement_items|string|max:255',
            'reimbursement_items.*.amount' => 'required_with:reimbursement_items|numeric|min:0',
            'reimbursement_items.*.category' => 'nullable|string|max:100',
            'reimbursement_items.*.notes' => 'nullable|string|max:500',
        ]);

        $validated['created_by'] = Auth::id();

        // Convert container_no string to array if needed
        if (isset($validated['container_no']) && is_string($validated['container_no'])) {
            $validated['container_no'] = [$validated['container_no']];
        }

        // Set legacy fields for backward compatibility
        $validated['so_number'] = $validated['order_number'];
        $validated['so_date'] = $validated['so_date'] ?? now()->toDateString();
        $validated['customer_name'] = $validated['customer'];
        $validated['customer_address'] = 'N/A';
        $validated['consignee_shipper'] = $validated['shipper'] ?? 'N/A';
        $validated['shipping_address'] = 'N/A';
        $validated['service_description'] = 'Sales Order';
        // Calculate totals from vendor breakdown
        $totalSelling = 0;
        $totalBuying = 0;
        
        if (isset($validated['vendor_breakdown']) && is_array($validated['vendor_breakdown'])) {
            foreach ($validated['vendor_breakdown'] as $item) {
                $totalBuying += floatval($item['buying_amount'] ?? 0);
                $totalSelling += floatval($item['selling_amount'] ?? 0);
            }
        }
        
        $validated['total_selling'] = $totalSelling;
        $validated['total_buying'] = $totalBuying;
        $validated['total_revenue'] = $totalSelling - $totalBuying;
        $validated['total_amount'] = $totalSelling;
        $validated['status'] = 'draft';

        // Prepare multiple vendors data for storage
        $vendorDetails = $validated['vendor_details'] ?? [];
        unset($validated['vendor_details']); // Remove vendor_details from main validated data
        $validated['vendors'] = $vendorDetails; // Store multiple vendors data in vendors field

        // Auto-generate order number if empty or not provided
        if (empty($validated['order_number'])) {
            $validated['order_number'] = SalesOrder::generateOrderNumber();
        }

        // Remove voucher data and reimbursement items from sales order data
        $paymentVouchers = $validated['payment_vouchers'] ?? [];
        $receiptVouchers = $validated['receipt_vouchers'] ?? [];
        $reimbursementItems = $validated['reimbursement_items'] ?? [];
        unset($validated['payment_vouchers'], $validated['receipt_vouchers'], $validated['reimbursement_items']);


        $salesOrder = SalesOrder::create($validated);


        // Create vouchers
        $this->createVouchers($salesOrder, $paymentVouchers, Voucher::TYPE_PAYMENT);
        $this->createVouchers($salesOrder, $receiptVouchers, Voucher::TYPE_RECEIPT);

        // Create reimbursement items
        $this->createReimbursementItems($salesOrder, $reimbursementItems);


        return redirect()
            ->route('admin-cs.sales-orders.index')
            ->with('success', 'Sales Order berhasil dibuat.');
            
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput()
                ->with('error', 'Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan.');
                
        } catch (\Exception $e) {
            
            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat menyimpan sales order. Silakan coba lagi atau hubungi administrator.');
        }
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

        $shipmentTypes = ShipmentType::active()
            ->select('id', 'name', 'code', 'description')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/AdminCS/SalesOrders/Edit', [
            'salesOrder' => $salesOrder,
            'vendors' => $vendors,
            'shipmentTypes' => $shipmentTypes
        ]);
    }

    /**
     * Update the specified sales order
     */
    public function update(Request $request, SalesOrder $salesOrder)
    {
        $validated = $request->validate([
            // Required fields based on requirements only
            'order_number' => 'required|string|regex:/^EWILOG\d{10}$/|unique:sales_orders,order_number,' . $salesOrder->id,
            'ref_no' => 'nullable|string|max:255',
            'so_date' => 'nullable|date',
            'customer' => 'required|string|max:255',
            'shipper' => 'nullable|string|max:255',
            'bl_awb' => 'nullable|string|max:255',
            'liner' => 'nullable|string|max:255',
            'vessel' => 'nullable|string|max:255',
            'eta' => 'nullable|date',
            'etd' => 'nullable|date',
            'aju' => 'nullable|string|max:255',
            'sppb_date' => 'nullable|date',
            'shipment_type' => 'nullable|string|max:255',
            'pol' => 'nullable|string|max:255',
            'pod' => 'nullable|string|max:255',
            'gudang_utc' => 'nullable|string|max:255',
            'party_lcl' => 'nullable|string|max:255',
            'prepared_by' => 'nullable|string|max:255',
            'exchange_rate' => 'nullable|numeric|min:0',
            'vendor_breakdown' => 'nullable|array',
            'vendor_breakdown.*.vendor_id' => 'nullable|exists:vendors,id',
            'vendor_breakdown.*.nama_vendor' => 'nullable|string|max:255',
            'vendor_breakdown.*.no_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.nama_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.description' => 'nullable|string|in:,OF/AF,HANDLING,PIB EDI,ADMIN DOC,TRUCKING,D/O CHARGES,LOLO,STORAGE,REFUND,OTHER',
            'vendor_breakdown.*.buying_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.selling_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.rcvd_inv' => 'nullable|string|max:255',
            'vendor_breakdown.*.remarks' => 'nullable|string|max:500',

            // Other costs validation
            'other_costs' => 'nullable|array',
            'other_costs.*.description' => 'required_with:other_costs|string|max:255',
            'other_costs.*.amount' => 'required_with:other_costs|numeric|min:0',
            'other_costs.*.category' => 'nullable|string|max:100',
            'remarks' => 'nullable|string',
            'note' => 'nullable|string',
            'commodity' => 'nullable|string',
            'qty' => 'nullable|integer|min:0',
            'net_weight' => 'nullable|numeric|min:0',
            'measurement' => 'nullable|numeric|min:0',
            'container_no' => 'nullable',
            'invoice_number' => 'nullable|string|max:255',
            'invoice_date' => 'nullable|date',
            'top' => 'nullable|string|max:255',
            
            // Vendor details (multiple vendors support) - now optional
            'vendor_details' => 'nullable|array',
            'vendor_details.*.vendor_id' => 'required_with:vendor_details|exists:vendors,id',
            'vendor_details.*.deskripsi' => 'required_with:vendor_details|string|max:500',
            'vendor_details.*.nominal' => 'required_with:vendor_details|numeric|min:0',
            'vendor_details.*.no_rekening' => 'required_with:vendor_details|string|max:255',
            'vendor_details.*.nama_vendor' => 'required_with:vendor_details|string|max:255',
            'vendor_details.*.nama_rekening' => 'required_with:vendor_details|string|max:255',
            'vendor_details.*.rcvd_inv' => 'nullable|string|max:255',
        ]);

        // Convert container_no string to array if needed
        if (isset($validated['container_no']) && is_string($validated['container_no'])) {
            $validated['container_no'] = [$validated['container_no']];
        }

        // Prepare multiple vendors data for storage
        $vendorDetails = $validated['vendor_details'] ?? [];
        unset($validated['vendor_details']); // Remove vendor_details from main validated data
        $validated['vendors'] = $vendorDetails; // Store multiple vendors data in vendors field

        // Set legacy fields for backward compatibility
        $validated['so_number'] = $validated['order_number'];
        $validated['so_date'] = $validated['so_date'] ?? now()->toDateString();
        $validated['customer_name'] = $validated['customer'];
        $validated['customer_address'] = 'N/A';
        $validated['consignee_shipper'] = $validated['shipper'] ?? 'N/A';
        $validated['shipping_address'] = 'N/A';
        $validated['service_description'] = 'Sales Order';
        // Calculate totals from vendor breakdown
        $totalSelling = 0;
        $totalBuying = 0;
        
        if (isset($validated['vendor_breakdown']) && is_array($validated['vendor_breakdown'])) {
            foreach ($validated['vendor_breakdown'] as $item) {
                $totalBuying += floatval($item['buying_amount'] ?? 0);
                $totalSelling += floatval($item['selling_amount'] ?? 0);
            }
        }
        
        $validated['total_selling'] = $totalSelling;
        $validated['total_buying'] = $totalBuying;
        $validated['total_revenue'] = $totalSelling - $totalBuying;
        $validated['total_amount'] = $totalSelling;
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
        
        // Release all vouchers associated with this sales order
        $unreleasedVouchers = $salesOrder->vouchers()->where('status', \App\Models\Voucher::STATUS_DRAFT)->get();
        foreach ($unreleasedVouchers as $voucher) {
            $voucher->update([
                'status' => \App\Models\Voucher::STATUS_RELEASED,
                'released_at' => now(),
            ]);
        }
        
        // Log successful release for debugging
        \Log::info('CS Sales Order Released Successfully', [
            'sales_order_id' => $salesOrder->id,
            'order_number' => $salesOrder->order_number,
            'released_by' => Auth::id(),
            'released_at' => now(),
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

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        try {
            // Try using the Facade first
            $pdf = Pdf::loadView('admin.admin-cs.sales-orders.pdf', compact('salesOrder', 'generatedAt'))
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
                $pdf = $dompdf->loadView('admin.admin-cs.sales-orders.pdf', compact('salesOrder', 'generatedAt'))
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
                $pdf = $pdfService->loadView('admin.admin-cs.sales-orders.pdf', compact('salesOrder', 'generatedAt'))
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

    /**
     * Create reimbursement items for sales order
     */
    private function createReimbursementItems(SalesOrder $salesOrder, array $reimbursementItems)
    {
        foreach ($reimbursementItems as $item) {
            if (!empty($item['description']) && !empty($item['amount']) && $item['amount'] > 0) {
                ReimbursementItem::create([
                    'sales_order_id' => $salesOrder->id,
                    'description' => $item['description'],
                    'amount' => $item['amount'],
                    'category' => $item['category'] ?? 'general',
                    'notes' => $item['notes'] ?? null,
                    'status' => 'pending',
                    'created_by' => Auth::id(),
                ]);
            }
        }
    }

}
