<?php

namespace App\Http\Controllers;

use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\ShipmentType;
use App\Models\MasterServiceType;
use App\Models\ReimbursementItem;
use App\Models\InvoiceItem;
use App\Models\AccountPayableComponent;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Illuminate\Support\Arr;
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

        if (!$request->filled('start_date') && !$request->filled('end_date')) {
            $request->merge([
                'start_date' => now()->startOfMonth()->toDateString(),
                'end_date' => now()->endOfMonth()->toDateString(),
            ]);
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('created_at', [
                $request->start_date,
                $request->end_date,
            ]);
        }

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('customer', 'like', "%{$search}%")
                    ->orWhere('shipper', 'like', "%{$search}%");
            });
        }

        $salesOrders = $query->orderBy('order_number')->paginate(5);
        $salesOrders->through(function (SalesOrder $salesOrder) {
            return $this->prepareSalesOrderForCsView($salesOrder, true);
        });

        return Inertia::render('Admin/AdminCS/SalesOrders/Index', [
            'salesOrders' => $salesOrders,
            'filters' => $request->only(['search', 'start_date', 'end_date'])
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

        $serviceTypes = MasterServiceType::active()
            ->select('id', 'code', 'description')
            ->ordered()
            ->get();

        $operationalCostCategories = \App\Models\OperationalCostCategory::active()
            ->select('id', 'name', 'description')
            ->orderBy('name')
            ->get();

        // Generate order number automatically
        $orderNumber = SalesOrder::generateOrderNumber();

        return Inertia::render('Admin/AdminCS/SalesOrders/Create', [
            'customers' => $customers,
            'vendors' => $vendors,
            'shipmentTypes' => $shipmentTypes,
            'serviceTypes' => $serviceTypes,
            'operationalCostCategories' => $operationalCostCategories,
            'packageUnits' => \App\Models\MasterPackageUnit::getActiveUnits(),
            'orderNumber' => $orderNumber
        ]);
    }

    /**
     * Store a newly created sales order
     */
    public function store(Request $request)
    {
        // Debug request data
        \Log::info('CS Sales Order Store Request:', [
            'order_number' => $request->input('order_number'),
            'order_number_length' => strlen($request->input('order_number') ?? ''),
            'all_data' => $request->all()
        ]);

        try {
            // Normalize Indonesian number format before validation
            $this->normalizeNumericFields($request);

            $validated = $request->validate([
                // Required fields based on requirements only
                'order_number' => 'required|string|regex:/^EWILOG\d+$/|unique:sales_orders,order_number',
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
                'vendor_breakdown.*.id' => 'nullable|integer|exists:sales_order_vendor_items,id',
                'vendor_breakdown.*.vendor_id' => 'nullable|exists:vendors,id',
                'vendor_breakdown.*.nama_vendor' => 'nullable|string|max:255',
                'vendor_breakdown.*.no_rekening' => 'nullable|string|max:255',
                'vendor_breakdown.*.nama_rekening' => 'nullable|string|max:255',
                'vendor_breakdown.*.description' => 'nullable|string|max:255',
                'vendor_breakdown.*.buying_amount' => 'required_with:vendor_breakdown|numeric|min:0',
                'vendor_breakdown.*.selling_amount' => 'required_with:vendor_breakdown|numeric|min:0',
                'vendor_breakdown.*.quantity' => 'nullable|numeric|min:0',
                'vendor_breakdown.*.unit' => 'nullable|string|max:50',
                'vendor_breakdown.*.rcvd_inv' => 'nullable|string|max:255',
                'vendor_breakdown.*.remarks' => 'nullable|string|max:500',

                // Other costs validation
                'other_costs' => 'nullable|array',
                'other_costs.*.description' => 'required_with:other_costs|string|max:255',
                'other_costs.*.amount' => 'required_with:other_costs|numeric|min:0',
                'other_costs.*.category' => 'nullable|string|max:100',
                'other_costs.*.vendor_id' => 'nullable', // Can be vendor ID (integer), 'internal' (string), or empty
                'other_costs.*.quantity' => 'nullable|numeric|min:0',
                'other_costs.*.unit' => 'nullable|string|max:50',
                'remarks' => 'nullable|string',
                'note' => 'nullable|string',
                'commodity' => 'nullable|string',
                'qty' => 'nullable|integer|min:0',
                'package_unit' => 'nullable|exists:master_package_units,code',
                'net_weight' => 'nullable|numeric|min:0',
                'gross_weight' => 'nullable|numeric|min:0',
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

                // Reimbursement items validation
                'reimbursement_items' => 'nullable|array',
                'reimbursement_items.*.description' => 'required_with:reimbursement_items|string|max:255',
                'reimbursement_items.*.amount' => 'required_with:reimbursement_items|numeric|min:0',
                'reimbursement_items.*.quantity' => 'nullable|numeric|min:0',
                'reimbursement_items.*.unit' => 'nullable|string|max:50',
                'reimbursement_items.*.category' => 'nullable|string|max:100',
                'reimbursement_items.*.notes' => 'nullable|string|max:500',
                'reimbursement_items.*.vendor_id' => 'nullable', // Can be vendor ID (integer), 'internal' (string), or empty
            ]);

            $validated['created_by'] = Auth::id();

            // Convert container_no string to array if needed
            $validated['container_no'] = $this->sanitizeContainerNumbers($validated['container_no'] ?? null);

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

            // Auto-fill invoice number if empty (berdasarkan SO)
            if (empty($validated['invoice_number'])) {
                $tempSO = new SalesOrder($validated);
                $validated['invoice_number'] = Invoice::generateInvoiceNumberFromSO($tempSO);
            }

            // Remove voucher data and reimbursement items from sales order data
            $reimbursementItems = $validated['reimbursement_items'] ?? [];
            unset($validated['reimbursement_items']);


            $salesOrder = SalesOrder::create($validated);


            // Create vouchers
            // Create reimbursement items
            $this->createReimbursementItems($salesOrder, $reimbursementItems);

            // Sync vendor breakdown items to table
            $salesOrder->syncVendorBreakdownItems($validated['vendor_breakdown'] ?? [], auth()->id());


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
        $salesOrder->load(['creator', 'reimbursementItems']);

        return Inertia::render('Admin/AdminCS/SalesOrders/Show', [
            'salesOrder' => $this->prepareSalesOrderForCsView($salesOrder),
        ]);
    }

    /**
     * Show the form for editing the specified sales order
     */
    public function edit(SalesOrder $salesOrder)
    {
        if (!$this->canCsEdit($salesOrder)) {
            return redirect()
                ->route('admin-cs.sales-orders.show', $salesOrder->id)
                ->withErrors(['error' => 'Sales order tidak dapat diedit setelah disetujui finance atau dibuat oleh finance.']);
        }

        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        $shipmentTypes = ShipmentType::active()
            ->select('id', 'name', 'code', 'description')
            ->orderBy('name')
            ->get();

        $serviceTypes = \App\Models\MasterServiceType::active()
            ->select('id', 'code', 'description')
            ->ordered()
            ->get();

        $operationalCostCategories = \App\Models\OperationalCostCategory::active()
            ->select('id', 'name', 'description')
            ->orderBy('name')
            ->get();

        // Load reimbursement items for editing
        $salesOrder->load(['reimbursementItems']);
        $this->hydrateOtherCostsWithVendors($salesOrder);
        $salesOrderPayload = $this->prepareSalesOrderForCsView($salesOrder);

        return Inertia::render('Admin/AdminCS/SalesOrders/Edit', [
            'salesOrder' => $salesOrderPayload,
            'vendors' => $vendors,
            'shipmentTypes' => $shipmentTypes,
            'serviceTypes' => $serviceTypes,
            'operationalCostCategories' => $operationalCostCategories,
            'packageUnits' => \App\Models\MasterPackageUnit::getActiveUnits()
        ]);
    }

    /**
     * Update the specified sales order
     */
    public function update(Request $request, SalesOrder $salesOrder)
    {
        if (!$this->canCsEdit($salesOrder)) {
            return redirect()
                ->route('admin-cs.sales-orders.show', $salesOrder->id)
                ->withErrors(['error' => 'Sales order tidak dapat diperbarui setelah disetujui finance atau dibuat oleh finance.']);
        }

        // Normalize Indonesian number format before validation
        $this->normalizeNumericFields($request);

        $validated = $request->validate([
            // Required fields based on requirements only
            'order_number' => 'required|string|regex:/^EWILOG\d+$/|unique:sales_orders,order_number,' . $salesOrder->id,
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
            'vendor_breakdown.*.id' => 'nullable|integer|exists:sales_order_vendor_items,id',
            'vendor_breakdown.*.vendor_id' => 'nullable|exists:vendors,id',
            'vendor_breakdown.*.nama_vendor' => 'nullable|string|max:255',
            'vendor_breakdown.*.no_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.nama_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.description' => 'nullable|string|max:255',
            'vendor_breakdown.*.buying_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.selling_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.quantity' => 'nullable|numeric|min:0',
            'vendor_breakdown.*.unit' => 'nullable|string|max:50',
            'vendor_breakdown.*.rcvd_inv' => 'nullable|string|max:255',
            'vendor_breakdown.*.remarks' => 'nullable|string|max:500',

            // Other costs validation
            'other_costs' => 'nullable|array',
            'other_costs.*.description' => 'required_with:other_costs|string|max:255',
            'other_costs.*.amount' => 'required_with:other_costs|numeric|min:0',
            'other_costs.*.category' => 'nullable|string|max:100',
            'other_costs.*.vendor_id' => 'nullable', // Can be vendor ID (integer), 'internal' (string), or empty
            'other_costs.*.quantity' => 'nullable|numeric|min:0',
            'other_costs.*.unit' => 'nullable|string|max:50',
            'remarks' => 'nullable|string',
            'note' => 'nullable|string',
            'commodity' => 'nullable|string',
            'qty' => 'nullable|integer|min:0',
            'package_unit' => 'nullable|exists:master_package_units,code',
            'net_weight' => 'nullable|numeric|min:0',
            'gross_weight' => 'nullable|numeric|min:0',
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

            // Reimbursement items validation
            'reimbursement_items' => 'nullable|array',
            'reimbursement_items.*.description' => 'required_with:reimbursement_items|string|max:255',
            'reimbursement_items.*.amount' => 'required_with:reimbursement_items|numeric|min:0',
            'reimbursement_items.*.quantity' => 'nullable|numeric|min:0',
            'reimbursement_items.*.unit' => 'nullable|string|max:50',
            'reimbursement_items.*.category' => 'nullable|string|max:100',
            'reimbursement_items.*.notes' => 'nullable|string|max:500',
            'reimbursement_items.*.vendor_id' => 'nullable', // Can be vendor ID (integer), 'internal' (string), or empty
        ]);

        // Convert container_no string to array if needed
        $validated['container_no'] = $this->sanitizeContainerNumbers($validated['container_no'] ?? null);

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

        // Extract reimbursement items before updating sales order
        $reimbursementItems = $validated['reimbursement_items'] ?? [];
        unset($validated['reimbursement_items']);

        $salesOrder->update($validated);

        // Update reimbursement items
        $this->updateReimbursementItems($salesOrder, $reimbursementItems);

        // Sync vendor breakdown items to table
        $salesOrder->syncVendorBreakdownItems($validated['vendor_breakdown'] ?? [], auth()->id());

        return redirect()
            ->route('admin-cs.sales-orders.index')
            ->with('success', 'Sales Order berhasil diperbarui.');
    }

    /**
     * Remove the specified sales order
     */
    public function destroy(SalesOrder $salesOrder)
    {
        if (!$this->canCsEdit($salesOrder)) {
            return redirect()
                ->route('admin-cs.sales-orders.index')
                ->withErrors(['error' => 'Sales order tidak dapat dihapus setelah disetujui finance atau dibuat oleh finance.']);
        }

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
        if ($this->isFinanceCreated($salesOrder)) {
            return redirect()->back()->withErrors(['error' => 'Sales order yang dibuat finance tidak dapat dirilis oleh CS.']);
        }

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
        $salesOrder->captureCsSnapshot();

        $salesOrder->update([
            'status' => 'released',
            'released_at' => now(),
            'released_by' => Auth::id(),
        ]);

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

        // Load relationships needed for PDF rendering
        $salesOrder->load(['creator', 'packageUnit', 'reimbursementItems']);

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
        $filename = $salesOrder->order_number . '.pdf';

        // Return the PDF as download
        return $pdf->download($filename);
    }

    /**
     * Create vouchers for a sales order
     */
    /**
     * Release vouchers for a sales order
     */
    /**
     * Create reimbursement items for sales order
     */
    private function createReimbursementItems(SalesOrder $salesOrder, array $reimbursementItems)
    {
        foreach ($reimbursementItems as $item) {
            if (!empty($item['description']) && !empty($item['amount']) && $item['amount'] > 0) {
                $rawVendor = $item['vendor_id'] ?? null;
                $vendorId = $this->resolveVendorId($rawVendor);

                ReimbursementItem::create([
                    'sales_order_id' => $salesOrder->id,
                    'description' => $item['description'],
                    'amount' => $item['amount'],
                    'quantity' => (isset($item['quantity']) && is_numeric($item['quantity']) && (float) $item['quantity'] > 0)
                        ? (float) $item['quantity']
                        : null,
                    'unit' => isset($item['unit']) && is_string($item['unit']) && trim($item['unit']) !== ''
                        ? trim($item['unit'])
                        : null,
                    'vendor_id' => $vendorId,
                    'category' => $item['category'] ?? 'general',
                    'notes' => $item['notes'] ?? null,
                    'status' => 'pending',
                    'created_by' => Auth::id(),
                    'receipt_info' => $this->mergeVendorSelectionIntoReceiptInfo(null, $rawVendor),
                ]);
            }
        }
    }

    /**
     * Update reimbursement items for sales order
     */
    private function updateReimbursementItems(SalesOrder $salesOrder, array $reimbursementItems)
    {
        // Delete existing reimbursement items that are still pending (not yet processed)
        $salesOrder->reimbursementItems()
            ->where('status', 'pending')
            ->delete();

        // Create new reimbursement items
        foreach ($reimbursementItems as $item) {
            if (!empty($item['description']) && !empty($item['amount']) && $item['amount'] > 0) {
                $rawVendor = $item['vendor_id'] ?? null;
                $vendorId = $this->resolveVendorId($rawVendor);

                ReimbursementItem::create([
                    'sales_order_id' => $salesOrder->id,
                    'description' => $item['description'],
                    'amount' => $item['amount'],
                    'quantity' => (isset($item['quantity']) && is_numeric($item['quantity']) && (float) $item['quantity'] > 0)
                        ? (float) $item['quantity']
                        : null,
                    'unit' => isset($item['unit']) && is_string($item['unit']) && trim($item['unit']) !== ''
                        ? trim($item['unit'])
                        : null,
                    'vendor_id' => $vendorId,
                    'category' => $item['category'] ?? 'general',
                    'notes' => $item['notes'] ?? null,
                    'status' => 'pending',
                    'created_by' => Auth::id(),
                    'receipt_info' => $this->mergeVendorSelectionIntoReceiptInfo(null, $rawVendor),
                ]);
            }
        }
    }

    /**
     * Hydrate other costs with vendor information from related finance records
     */
    private function hydrateOtherCostsWithVendors(SalesOrder $salesOrder): void
    {
        $otherCosts = $salesOrder->other_costs;

        if (empty($otherCosts) || !is_array($otherCosts)) {
            return;
        }

        $normalizedCosts = array_map(function ($cost) {
            return is_array($cost) ? $cost : (array) $cost;
        }, $otherCosts);

        $operationalInvoiceItems = InvoiceItem::query()
            ->where('item_type', 'operational_cost')
            ->whereHas('invoice', function ($query) use ($salesOrder) {
                $query->where('sales_order_id', $salesOrder->id);
            })
            ->get(['id', 'description', 'amount', 'vendor_id']);

        $operationalPayableComponents = AccountPayableComponent::query()
            ->where('component_type', 'operational_cost')
            ->whereHas('accountPayable', function ($query) use ($salesOrder) {
                $query->where('sales_order_id', $salesOrder->id);
            })
            ->get(['id', 'description', 'recipient_name', 'amount', 'vendor_id']);

        foreach ($normalizedCosts as $index => $cost) {
            if (!empty($cost['vendor_id'])) {
                continue;
            }

            $matchedVendorId = $this->matchVendorForCost(
                $cost,
                $operationalInvoiceItems
            );

            if (!$matchedVendorId) {
                $matchedVendorId = $this->matchVendorForCost(
                    $cost,
                    $operationalPayableComponents,
                    'description',
                    'recipient_name'
                );
            }

            if ($matchedVendorId) {
                $normalizedCosts[$index]['vendor_id'] = $matchedVendorId;
            }
        }

        $salesOrder->setAttribute('other_costs', $normalizedCosts);
    }

    /**
     * Attempt to find vendor id for a specific operational cost entry
     */
    private function matchVendorForCost(
        array $cost,
        Collection $items,
        string $primaryDescriptionKey = 'description',
        ?string $alternateDescriptionKey = null
    ): ?int {
        if ($items->isEmpty()) {
            return null;
        }

        $items = $items->filter(fn ($item) => !empty($item->vendor_id));

        if ($items->isEmpty()) {
            return null;
        }

        $amount = $cost['amount'] ?? null;
        $description = $cost['description'] ?? null;

        $amountCandidates = $items->filter(function ($item) use ($amount) {
            return $this->amountMatches($amount, $item->amount ?? null);
        });

        if ($amountCandidates->isEmpty()) {
            return null;
        }

        if ($description) {
            $descriptionMatch = $amountCandidates->first(function ($item) use ($description, $primaryDescriptionKey, $alternateDescriptionKey) {
                $primary = $item->{$primaryDescriptionKey} ?? null;
                if ($this->descriptionMatches($description, $primary)) {
                    return true;
                }

                if ($alternateDescriptionKey) {
                    $alternate = $item->{$alternateDescriptionKey} ?? null;
                    return $this->descriptionMatches($description, $alternate);
                }

                return false;
            });

            if ($descriptionMatch) {
                return (int) $descriptionMatch->vendor_id;
            }
        }

        if ($amountCandidates->count() === 1) {
            return (int) $amountCandidates->first()->vendor_id;
        }

        return null;
    }

    private function descriptionMatches(?string $expected, ?string $actual): bool
    {
        if ($expected === null || $expected === '') {
            return false;
        }

        if ($actual === null || $actual === '') {
            return false;
        }

        return strcasecmp(trim($expected), trim($actual)) === 0;
    }

    private function amountMatches($expected, $actual): bool
    {
        if ($expected === null || $actual === null) {
            return false;
        }

        return abs((float) $expected - (float) $actual) < 0.01;
    }

    /**
     * Normalize vendor identifier from form input
     */
    private function resolveVendorId($rawVendor): ?int
    {
        if ($rawVendor === null) {
            return null;
        }

        if (is_array($rawVendor)) {
            $rawVendor = $rawVendor['id'] ?? $rawVendor['value'] ?? null;
        }

        if ($rawVendor === null) {
            return null;
        }

        if (is_string($rawVendor)) {
            $rawVendor = trim($rawVendor);
            if ($rawVendor === '' || strtolower($rawVendor) === 'internal') {
                return null;
            }
        }

        if (is_numeric($rawVendor)) {
            return (int) $rawVendor;
        }

        return null;
    }

    private function determineVendorSelection($rawVendor): ?string
    {
        if ($rawVendor === null || $rawVendor === '') {
            return null;
        }

        if (is_array($rawVendor)) {
            $rawVendor = $rawVendor['id'] ?? $rawVendor['value'] ?? null;
        }

        if ($rawVendor === null || $rawVendor === '') {
            return null;
        }

        return strtolower((string) $rawVendor) === 'internal' ? 'internal' : null;
    }

    private function mergeVendorSelectionIntoReceiptInfo($existingReceiptInfo, $rawVendor): ?array
    {
        $selection = $this->determineVendorSelection($rawVendor);

        if (is_string($existingReceiptInfo)) {
            $decoded = json_decode($existingReceiptInfo, true);
            $existingReceiptInfo = is_array($decoded) ? $decoded : [];
        } elseif (!is_array($existingReceiptInfo)) {
            $existingReceiptInfo = $existingReceiptInfo ? (array) $existingReceiptInfo : [];
        }

        if ($selection) {
            $existingReceiptInfo['vendor_selection'] = $selection;
        } else {
            unset($existingReceiptInfo['vendor_selection']);
        }

        return empty($existingReceiptInfo) ? null : $existingReceiptInfo;
    }

    /**
     * Normalize Indonesian number format in request data
     */
    private function normalizeNumericFields(Request $request)
    {
        // Normalize vendor breakdown amounts
        $vendorBreakdown = $request->input('vendor_breakdown', []);
        foreach ($vendorBreakdown as $index => $vendor) {
            if (isset($vendor['buying_amount'])) {
                $vendorBreakdown[$index]['buying_amount'] = $this->normalizeIndonesianNumber($vendor['buying_amount']);
            }
            if (isset($vendor['selling_amount'])) {
                $vendorBreakdown[$index]['selling_amount'] = $this->normalizeIndonesianNumber($vendor['selling_amount']);
            }
        }
        $request->merge(['vendor_breakdown' => $vendorBreakdown]);

        // Normalize other costs amounts
        $otherCosts = $request->input('other_costs', []);
        foreach ($otherCosts as $index => $cost) {
            if (isset($cost['amount'])) {
                $otherCosts[$index]['amount'] = $this->normalizeIndonesianNumber($cost['amount']);
            }
        }
        $otherCosts = $this->dedupeOtherCosts($otherCosts);
        $request->merge(['other_costs' => $otherCosts]);

        // Normalize reimbursement items amounts
        $reimbursementItems = $request->input('reimbursement_items', []);
        foreach ($reimbursementItems as $index => $item) {
            if (isset($item['amount'])) {
                $reimbursementItems[$index]['amount'] = $this->normalizeIndonesianNumber($item['amount']);
            }
            if (isset($item['quantity'])) {
                $reimbursementItems[$index]['quantity'] = $this->normalizeIndonesianNumber($item['quantity']);
            }
        }
        $request->merge(['reimbursement_items' => $reimbursementItems]);

        // Normalize other numeric fields
        $numericFields = ['exchange_rate', 'qty', 'net_weight', 'gross_weight', 'measurement'];
        foreach ($numericFields as $field) {
            $value = $request->input($field);
            if ($value) {
                $request->merge([$field => $this->normalizeIndonesianNumber($value)]);
            }
        }
    }

    /**
     * Normalize Indonesian number format to standard format
     * Examples: 2.500 -> 2500, 2.500,50 -> 2500.50, 2500,50 -> 2500.50
     */
    private function normalizeIndonesianNumber($value)
    {
        if ($value === null || $value === '') {
            return $value;
        }

        // Sudah numeric -> kembalikan apa adanya (menghindari "2.0000" jadi 20000)
        if (is_numeric($value)) {
            return $value;
        }

        $value = trim((string) $value);

        $hasDot = strpos($value, '.') !== false;
        $hasComma = strpos($value, ',') !== false;

        if ($hasDot && $hasComma) {
            // "2.500,50" -> "2500.50"
            $value = str_replace('.', '', $value);
            $value = str_replace(',', '.', $value);
            return $value;
        }

        if (!$hasDot && $hasComma) {
            // "2500,50" -> "2500.50"
            return str_replace(',', '.', $value);
        }

        if ($hasDot && !$hasComma) {
            // HANYA titik -> anggap TITIK = DESIMAL (JANGAN dihapus)
            // "2.0000" harus tetap "2.0000"
            return $value;
        }

        // Tidak ada titik/koma
        return $value;
    }

    private function dedupeOtherCosts(array $otherCosts): array
    {
        $seen = [];
        $deduped = [];

        foreach ($otherCosts as $cost) {
            if (!is_array($cost)) {
                continue;
            }

            $description = strtolower(trim((string) ($cost['description'] ?? '')));
            $amount = isset($cost['amount']) ? (string) ((float) $cost['amount']) : '0';
            $category = strtolower(trim((string) ($cost['category'] ?? '')));
            $vendorId = $cost['vendor_id'] ?? null;

            if (is_string($vendorId)) {
                $vendorId = strtolower(trim($vendorId));
            }

            $key = implode('|', [
                $description,
                $amount,
                $category,
                $vendorId ?? 'null',
            ]);

            if (isset($seen[$key])) {
                continue;
            }

            $seen[$key] = true;
            $deduped[] = $cost;
        }

        return $deduped;
    }

    private function sanitizeContainerNumbers($value): array
    {
        if ($value === null) {
            return [];
        }

        if (is_string($value)) {
            $value = [$value];
        }

        if (!is_array($value)) {
            return [];
        }

        $results = [];
        foreach ($value as $entry) {
            if ($entry === null) {
                continue;
            }

            $entry = is_string($entry) ? $entry : (string) $entry;

            $parts = preg_split('/[\r\n,;]+/', $entry);
            foreach ($parts as $part) {
                $clean = trim($part);
                if ($clean !== '') {
                    $results[] = $clean;
                }
            }
        }

        return array_values(array_unique($results));
    }

    private function prepareSalesOrderForCsView(SalesOrder $salesOrder, bool $forList = false): array
    {
        // Ensure related data needed for CS view is available
        if (!$forList) {
            $salesOrder->loadMissing(['packageUnit', 'reimbursementItems']);
        }
        $salesOrder->loadMissing(['creator']);

        $data = $salesOrder->toArray();

        $isFinanceCreated = $this->isFinanceCreated($salesOrder);
        $canEdit = $this->canCsEdit($salesOrder);
        $canRelease = !$isFinanceCreated && !in_array($salesOrder->status, ['released', 'confirmed', 'approved', 'rejected'], true);
        $canDelete = $canEdit;

        $snapshot = $salesOrder->cs_snapshot ?? null;
        if ($snapshot && !$isFinanceCreated) {
            $overrideKeys = [
                'order_number',
                'ref_no',
                'so_date',
                'customer',
                'shipper',
                'bl_awb',
                'liner',
                'vessel',
                'eta',
                'etd',
                'aju',
                'sppb_date',
                'shipment_type',
                'pol',
                'pod',
                'gudang_utc',
                'party_lcl',
                'prepared_by',
                'exchange_rate',
                'vendor_breakdown',
                'other_costs',
                'remarks',
                'note',
                'commodity',
                'qty',
                'package_unit',
                'net_weight',
                'gross_weight',
                'measurement',
                'container_no',
                'invoice_number',
                'invoice_date',
                'top',
                'vendors',
                'vendor_details',
                'total_buying',
                'total_selling',
                'total_revenue',
                'total_amount',
                'buying_breakdown',
                'selling_breakdown',
            ];

            foreach ($overrideKeys as $key) {
                if (array_key_exists($key, $snapshot)) {
                    $data[$key] = $snapshot[$key];
                }
            }

            if (!$forList) {
                $data['reimbursement_items'] = $snapshot['reimbursement_items'] ?? [];
            }
        } elseif (!$isFinanceCreated && !$forList) {
            $data['reimbursement_items'] = $salesOrder->reimbursementItems
                ? $salesOrder->reimbursementItems->toArray()
                : [];
        }

        $packageUnitName = $salesOrder->relationLoaded('packageUnit') ? optional($salesOrder->packageUnit)->name : null;
        $data['package_unit_label'] = $packageUnitName ?? ($data['package_unit'] ?? null);

        $data['is_finance_created'] = $isFinanceCreated;
        $data['cs_can_edit'] = $canEdit;
        $data['cs_can_release'] = $canRelease;
        $data['cs_can_delete'] = $canDelete;

        if ($isFinanceCreated) {
            $data = array_merge(
                Arr::only($data, [
                    'id',
                    'order_number',
                    'so_number',
                    'status',
                    'so_date',
                    'created_at',
                    'updated_at',
                    'is_finance_created',
                    'cs_can_edit',
                    'cs_can_release',
                    'cs_can_delete',
                ]),
                [
                    'customer' => '-',
                    'shipper' => '-',
                    'shipment_type' => '-',
                    'commodity' => '-',
                    'qty' => null,
                    'container_no' => [],
                    'vendor_breakdown' => [],
                    'other_costs' => [],
                    'reimbursement_items' => [],
                ]
            );
        }

        return $data;
    }

    private function isFinanceCreated(SalesOrder $salesOrder): bool
    {
        $salesOrder->loadMissing(['creator']);
        return $salesOrder->creator && $salesOrder->creator->role === 'admin_keuangan';
    }

    private function canCsEdit(SalesOrder $salesOrder): bool
    {
        if ($this->isFinanceCreated($salesOrder)) {
            return false;
        }

        if ($salesOrder->approved_at) {
            return false;
        }

        return $salesOrder->status === 'draft';
    }
}
