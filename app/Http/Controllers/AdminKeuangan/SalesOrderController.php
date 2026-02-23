<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\ReimbursementItem;
use App\Models\InvoiceItem;
use App\Models\Invoice;
use App\Models\AccountPayableComponent;
use App\Models\AccountReceivable;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Barryvdh\DomPDF\Facade\Pdf;

class SalesOrderController extends Controller
{
    public function index(Request $request)
    {
        // Force fresh query untuk memastikan data terbaru
        $query = SalesOrder::with(['creator', 'releasedBy', ])
            ->whereIn('status', ['released', 'approved', 'rejected'])
            ->whereNotNull('released_at')
            ->orderBy('order_number');

        if (!$request->filled('start_date') && !$request->filled('end_date')) {
            $request->merge([
                'start_date' => now()->startOfMonth()->toDateString(),
                'end_date' => now()->endOfMonth()->toDateString(),
            ]);
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $startDate = \Carbon\Carbon::parse($request->start_date)->startOfDay();
            $endDate = \Carbon\Carbon::parse($request->end_date)->endOfDay();
            $query->whereBetween('created_at', [$startDate, $endDate]);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                  ->orWhere('customer', 'like', "%{$search}%")
                  ->orWhere('invoice_number', 'like', "%{$search}%");
            });
        }

        $salesOrders = $query->paginate(5)->withQueryString();

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Index', [
            'salesOrders' => $salesOrders,
            'filters' => $request->only(['search', 'start_date', 'end_date']),
        ]);
    }

    public function show(SalesOrder $salesOrder)
    {
        // Fresh query to ensure we have the latest data from database
        $salesOrder = $salesOrder->fresh(['creator', 'releasedBy', 'invoices', 'reimbursementItems']);

        // EMERGENCY DEBUG: Print raw data for troubleshooting
        if (request()->has('debug')) {
            dd([
                'id' => $salesOrder->id,
                'status' => $salesOrder->status,
                'status_length' => strlen($salesOrder->status),
                'status_bytes' => unpack('C*', $salesOrder->status),
                'status_trimmed' => trim($salesOrder->status),
                'comparison' => $salesOrder->status === 'released',
                'comparison_trimmed' => trim($salesOrder->status) === 'released',
                'released_at' => $salesOrder->released_at,
                'raw_attributes' => $salesOrder->getRawOriginal('status'),
            ]);
        }

        // Debug: Log detailed status information
        \Log::debug('AdminKeuangan Sales Order Show Method Debug', [
            'sales_order_id' => $salesOrder->id,
            'order_number' => $salesOrder->order_number,
            'status_raw' => $salesOrder->status,
            'status_length' => strlen($salesOrder->status),
            'status_trimmed' => trim($salesOrder->status),
            'status_comparison' => $salesOrder->status === 'released' ? 'MATCH' : 'NO MATCH',
            'status_strict_comparison' => $salesOrder->status !== 'released' ? 'CONDITION TRUE' : 'CONDITION FALSE',
            'released_at' => $salesOrder->released_at,
            'user_id' => auth()->id(),
        ]);

        // More permissive check for status - handle potential whitespace/encoding issues
        $cleanStatus = trim(strtolower($salesOrder->status));
        if (!in_array($cleanStatus, ['released', 'approved', 'rejected']) && $salesOrder->released_at === null) {
            // Log access attempt for debugging
            \Log::warning('AdminKeuangan Sales Order Access Denied', [
                'sales_order_id' => $salesOrder->id,
                'order_number' => $salesOrder->order_number,
                'current_status' => $salesOrder->status,
                'status_trimmed' => trim($salesOrder->status),
                'released_at' => $salesOrder->released_at,
                'user_id' => auth()->id(),
            ]);

            return redirect()->route('admin-keuangan.sales-orders.index')
                ->withErrors(['error' => 'Sales order belum dirilis oleh CS.']);
        }

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Show', [
            'salesOrder' => $salesOrder,
        ]);
    }

    public function approve(SalesOrder $salesOrder)
    {
        // Fresh query to ensure we have the latest data from database
        $salesOrder = $salesOrder->fresh(['creator', 'releasedBy']);

        // Log current status for debugging
        \Log::info('AdminKeuangan Sales Order Approval Attempt', [
            'sales_order_id' => $salesOrder->id,
            'order_number' => $salesOrder->order_number,
            'current_status' => $salesOrder->status,
            'status_trimmed' => trim($salesOrder->status),
            'status_length' => strlen($salesOrder->status),
            'released_at' => $salesOrder->released_at,
            'released_by' => $salesOrder->released_by,
            'user_id' => auth()->id(),
        ]);

        // More permissive check for status - handle potential whitespace/encoding issues
        $cleanStatus = trim(strtolower($salesOrder->status));
        if ($cleanStatus === 'approved') {
            return redirect()->back()->withErrors(['error' => 'Sales order sudah disetujui sebelumnya.']);
        }

        if ($cleanStatus !== 'released' || $salesOrder->released_at === null) {
            $errorMessage = "Sales order tidak dapat disetujui. Status saat ini: '{$salesOrder->status}' (cleaned: '{$cleanStatus}')";

            // Provide more specific guidance based on current status
            switch ($cleanStatus) {
                case 'draft':
                    $errorMessage .= ". Sales order masih dalam status draft. CS perlu merilis sales order ini terlebih dahulu.";
                    break;
                case 'rejected':
                    $errorMessage .= ". Sales order sudah ditolak sebelumnya.";
                    break;
                default:
                    $errorMessage .= ". Harap pastikan CS sudah merilis sales order ini.";
            }

            // Add release information for debugging
            if ($salesOrder->released_at) {
                $errorMessage .= " (Dirilis pada: " . $salesOrder->released_at->format('d/m/Y H:i') .
                    " oleh: " . ($salesOrder->releasedBy->name ?? 'Unknown') . ")";
            } else {
                $errorMessage .= " (Belum pernah dirilis)";
            }

            return redirect()->back()->withErrors(['error' => $errorMessage]);
        }

        $salesOrder->update([
            'status' => 'approved',
            'approved_at' => now(),
            'approved_by' => auth()->id(),
        ]);

        // Auto-generate Account Payables from vendor breakdown
        \App\Models\AccountPayable::generateFromSalesOrder($salesOrder);

        // Auto-generate pre-invoice Account Receivable (main + reimbursement)
        \App\Models\AccountReceivable::createOrUpdatePreInvoiceFromSalesOrder($salesOrder);

        // Log successful approval
        \Log::info('AdminKeuangan Sales Order Approved Successfully', [
            'sales_order_id' => $salesOrder->id,
            'order_number' => $salesOrder->order_number,
            'approved_by' => auth()->id(),
            'approved_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Sales order berhasil disetujui.');
    }

    /**
     * Force refresh sales order data (for debugging cache issues)
     */
    public function forceRefresh(SalesOrder $salesOrder)
    {
        // Clear any potential cache
        if (function_exists('opcache_invalidate')) {
            opcache_invalidate(__FILE__, true);
        }

        // Force fresh data reload
        $freshSalesOrder = SalesOrder::where('id', $salesOrder->id)
            ->with(['creator', 'releasedBy', ])
            ->first();

        \Log::info('Force Refresh Sales Order Data', [
            'sales_order_id' => $salesOrder->id,
            'original_status' => $salesOrder->status,
            'fresh_status' => $freshSalesOrder->status,
            'user_id' => auth()->id(),
        ]);

        return redirect()->route('admin-keuangan.sales-orders.show', $salesOrder->id)
            ->with('success', 'Data berhasil di-refresh.');
    }

    public function reject(Request $request, SalesOrder $salesOrder)
    {
        $request->validate([
            'rejection_reason' => 'required|string|max:500'
        ]);

        if (!in_array($salesOrder->status, ['released', 'approved']) || $salesOrder->released_at === null) {
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

    public function recordReimbursementPayment(Request $request, SalesOrder $salesOrder, ReimbursementItem $reimbursementItem)
    {
        if ((int) $reimbursementItem->sales_order_id !== (int) $salesOrder->id) {
            return redirect()->back()->withErrors(['error' => 'Reimbursement tidak sesuai dengan Sales Order.']);
        }

        $validated = $request->validate([
            'payment_amount' => 'required|numeric|min:0.01',
            'payment_date' => 'nullable|date',
            'notes' => 'nullable|string|max:500',
        ]);

        $reimbursementItem->updateCustomerPayment(
            (float) $validated['payment_amount'],
            $validated['payment_date'] ?? null,
            $validated['notes'] ?? null
        );

        AccountReceivable::createOrUpdatePreInvoiceFromSalesOrder($salesOrder);

        return redirect()->back()->with('success', 'Pembayaran reimbursement berhasil dicatat.');
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

        $shipmentTypes = \App\Models\ShipmentType::active()
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

        // Generate order number automatically
        $orderNumber = SalesOrder::generateOrderNumber();

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Create', [
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
        try {
            $validated = $request->validate([
            // Required fields based on requirements only
            'order_number' => 'required|string|max:255',
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
            'other_costs.*.vendor_id' => 'required_with:other_costs|nullable', // Must be filled (internal/external)
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
            'reimbursement_items.*.id' => 'nullable|integer|exists:reimbursement_items,id',
            'reimbursement_items.*.description' => 'required_with:reimbursement_items|string|max:255',
            'reimbursement_items.*.amount' => 'required_with:reimbursement_items|numeric|min:0',
            'reimbursement_items.*.quantity' => 'nullable|numeric|min:0',
            'reimbursement_items.*.unit' => 'nullable|string|max:50',
            'reimbursement_items.*.category' => 'nullable|string|max:100',
            'reimbursement_items.*.notes' => 'nullable|string|max:500',
            'reimbursement_items.*.vendor_id' => 'nullable', // Can be vendor ID (integer), 'internal' (string), or empty


        ]);

        $validated['package_unit'] = !empty($validated['package_unit'])
            ? $validated['package_unit']
            : 'BAG';

        $validated['created_by'] = Auth::id();

        if (array_key_exists('container_no', $validated)) {
            $validated['container_no'] = $this->sanitizeContainerNumbers($validated['container_no']);
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
                $qty = 1;
                if (array_key_exists('quantity', $item) && $item['quantity'] !== '' && $item['quantity'] !== null && is_numeric($item['quantity'])) {
                    $qty = (float) $item['quantity'];
                }
                $totalBuying += floatval($item['buying_amount'] ?? 0) * $qty;
                $totalSelling += floatval($item['selling_amount'] ?? 0) * $qty;
            }
        }

        $validated['total_selling'] = $totalSelling;
        $validated['total_buying'] = $totalBuying;
        $validated['total_revenue'] = $totalSelling - $totalBuying;
        $validated['total_amount'] = $totalSelling;

        // Auto-release for Sales Order created by Admin Keuangan
        $validated['status'] = 'released';
        $validated['released_at'] = now();
        $validated['released_by'] = Auth::id();

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

        $validated['other_costs'] = $this->normalizeOtherCostEntries($validated['other_costs'] ?? []);
        $this->validateOtherCostDuplicates($validated['other_costs']);

        // Extract reimbursement items before creating sales order
        $reimbursementItems = $validated['reimbursement_items'] ?? [];
        unset($validated['reimbursement_items']);

        $salesOrder = SalesOrder::create($validated);

        // Create reimbursement items
        $this->createReimbursementItems($salesOrder, $reimbursementItems);

        // Sync vendor breakdown items to table
        $salesOrder->syncVendorBreakdownItems($validated['vendor_breakdown'] ?? [], auth()->id());

        return redirect()
            ->route('admin-keuangan.sales-orders.index')
            ->with('success', 'Sales Order berhasil dibuat.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            // Log validation errors for debugging
            \Log::error('AdminKeuangan Sales Order Validation Error', [
                'errors' => $e->errors(),
                'input' => $request->except(['password', 'password_confirmation']),
                'user_id' => auth()->id(),
            ]);

            // Return with detailed error messages
            return redirect()->back()
                ->withErrors($e->errors())
                ->withInput()
                ->with('error', 'Terdapat kesalahan pada form. Silakan periksa kembali data yang dimasukkan.');

        } catch (\Exception $e) {
            // Log general errors
            \Log::error('AdminKeuangan Sales Order Creation Error', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'user_id' => auth()->id(),
                'input' => $request->except(['password', 'password_confirmation']),
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat menyimpan sales order. Silakan coba lagi atau hubungi administrator.');
        }
    }

    /**
     * Show the form for editing the specified sales order
     */
    public function edit(SalesOrder $salesOrder)
    {
        $vendors = \App\Models\Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening', 'nib')
            ->orderBy('nama_vendor')
            ->get();

        $shipmentTypes = \App\Models\ShipmentType::active()
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

        // Load reimbursement items with vendor relationship for editing
        $salesOrder->load(['reimbursementItems.vendor']);
        $this->hydrateOtherCostsWithVendors($salesOrder);
        $this->hydrateVendorBreakdownFromInvoices($salesOrder);
        $this->enrichSalesOrderWithPaidComponentLocks($salesOrder);

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Edit', [
            'salesOrder' => $salesOrder,
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
        // Normalize Indonesian number format before validation
        $this->normalizeNumericFields($request);

        $validated = $request->validate([
            // Required fields based on requirements only
            'order_number' => 'required|string|max:255',
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
            'other_costs.*.id' => 'nullable|string|max:64',
            'other_costs.*.description' => 'required_with:other_costs|string|max:255',
            'other_costs.*.amount' => 'required_with:other_costs|numeric|min:0',
            'other_costs.*.category' => 'nullable|string|max:100',
            'other_costs.*.vendor_id' => 'required_with:other_costs|nullable', // Wajib vendor (internal/eksternal)
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
            'reimbursement_items.*.id' => 'nullable|integer|exists:reimbursement_items,id',
            'reimbursement_items.*.description' => 'required_with:reimbursement_items|string|max:255',
            'reimbursement_items.*.amount' => 'required_with:reimbursement_items|numeric|min:0',
            'reimbursement_items.*.quantity' => 'nullable|numeric|min:0',
            'reimbursement_items.*.unit' => 'nullable|string|max:50',
            'reimbursement_items.*.category' => 'nullable|string|max:100',
            'reimbursement_items.*.notes' => 'nullable|string|max:500',
            'reimbursement_items.*.vendor_id' => 'nullable', // Can be vendor ID (integer), 'internal' (string), or empty
        ]);

        // Ensure package unit always has a valid code (column is non-nullable)
        $validated['package_unit'] = !empty($validated['package_unit'])
            ? $validated['package_unit']
            : 'BAG';

        if (array_key_exists('container_no', $validated)) {
            $validated['container_no'] = $this->sanitizeContainerNumbers($validated['container_no']);
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
                $qty = 1;
                if (array_key_exists('quantity', $item) && $item['quantity'] !== '' && $item['quantity'] !== null && is_numeric($item['quantity'])) {
                    $qty = (float) $item['quantity'];
                }
                $totalBuying += floatval($item['buying_amount'] ?? 0) * $qty;
                $totalSelling += floatval($item['selling_amount'] ?? 0) * $qty;
            }
        }

        $validated['total_selling'] = $totalSelling;
        $validated['total_buying'] = $totalBuying;
        $validated['total_revenue'] = $totalSelling - $totalBuying;
        $validated['total_amount'] = $totalSelling;

        // Don't change status on update - preserve existing status
        // This prevents released Sales Orders from being reverted to draft when edited

        $existingOtherCosts = $this->normalizeOtherCostEntries(
            is_array($salesOrder->other_costs) ? $salesOrder->other_costs : []
        );
        $incomingOtherCosts = $this->normalizeOtherCostEntries($validated['other_costs'] ?? []);
        $paidLocks = $this->getPaidComponentLocks($salesOrder);
        $reimbursementItems = $validated['reimbursement_items'] ?? [];
        $this->assertLockedItemsNotRemoved(
            $incomingOtherCosts,
            $reimbursementItems,
            $existingOtherCosts,
            $paidLocks
        );
        $validated['other_costs'] = $this->enforcePaidOtherCostLocks($incomingOtherCosts, $existingOtherCosts, $paidLocks);
        $this->validateOtherCostDuplicates($validated['other_costs'], $existingOtherCosts);

        // Extract reimbursement items before updating sales order
        $reimbursementItems = $this->enforcePaidReimbursementLocks($reimbursementItems, $salesOrder, $paidLocks);
        unset($validated['reimbursement_items']);

        $salesOrder->update($validated);

        // Update reimbursement items
        $this->updateReimbursementItems($salesOrder, $reimbursementItems);

        // Sync vendor breakdown items to table
        $salesOrder->syncVendorBreakdownItems($validated['vendor_breakdown'] ?? [], auth()->id());

        // Re-sync vendor COGS items on related invoices and regenerate hutang vendor
        $salesOrder->refresh();
        $this->syncVendorBreakdownToInvoices($salesOrder);
        $this->syncOperationalAndReimbursementToInvoices($salesOrder);
        \App\Models\AccountPayable::generateFromSalesOrder($salesOrder);

        return redirect()
            ->route('admin-keuangan.sales-orders.index')
            ->with('success', 'Sales Order berhasil diperbarui.');
    }

    /**
     * Remove the specified sales order
     */
    public function destroy(SalesOrder $salesOrder)
    {

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

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        try {
            // Gunakan template CS tetapi dengan flag data live agar Finance melihat perubahan terbaru
            $pdf = Pdf::loadView('admin.admin-cs.sales-orders.pdf', [
                'salesOrder' => $salesOrder,
                'generatedAt' => $generatedAt,
                'useLiveData' => true,
            ])
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
                $pdf = $dompdf->loadView('admin.admin-cs.sales-orders.pdf', [
                        'salesOrder' => $salesOrder,
                        'generatedAt' => $generatedAt,
                        'useLiveData' => true,
                    ])
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
                $pdf = $pdfService->loadView('admin.admin-cs.sales-orders.pdf', [
                        'salesOrder' => $salesOrder,
                        'generatedAt' => $generatedAt,
                        'useLiveData' => true,
                    ])
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
     * Generate PDF for the specified voucher
     */
    /**
     * Hydrate other costs with vendor information from finance records
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
     * Isi kembali vendor_breakdown yang kosong dengan data dari invoice (billable & COGS).
     */
    private function hydrateVendorBreakdownFromInvoices(SalesOrder $salesOrder): void
    {
        $vendorBreakdown = $salesOrder->vendor_breakdown;
        if (!is_array($vendorBreakdown) || empty($vendorBreakdown)) {
            return;
        }

        $invoices = $salesOrder->invoices()->with('items')->get();
        if ($invoices->isEmpty()) {
            return;
        }

        $billableItems = $invoices->flatMap->items->filter(function ($item) {
            return is_string($item->item_ref) && str_starts_with($item->item_ref, 'vendor_');
        })->values();

        $cogsItems = $invoices->flatMap->items->filter(function ($item) {
            return is_string($item->item_ref) && str_starts_with($item->item_ref, 'cogs_vendor_');
        })->values();

        $extractKey = function ($itemRef, $prefix) {
            $trimmed = substr($itemRef, strlen($prefix));
            return trim((string) $trimmed);
        };

        foreach ($vendorBreakdown as $index => &$vendor) {
            $keyCandidates = [];
            if (!empty($vendor['vendor_id'])) {
                $keyCandidates[] = (string) $vendor['vendor_id'];
            }
            $keyCandidates[] = (string) $index;

            $matchedBillable = $billableItems->first(function ($item) use ($extractKey, $keyCandidates) {
                $key = $extractKey($item->item_ref, 'vendor_');
                return in_array($key, $keyCandidates, true);
            });

            $matchedCogs = $cogsItems->first(function ($item) use ($extractKey, $keyCandidates) {
                $key = $extractKey($item->item_ref, 'cogs_vendor_');
                return in_array($key, $keyCandidates, true);
            });

            // Isi selling/description dari item billable jika kosong
            if ($matchedBillable) {
                if (empty($vendor['description']) && !empty($matchedBillable->description)) {
                    $vendor['description'] = $matchedBillable->description;
                }
                if ((empty($vendor['selling_amount']) || $vendor['selling_amount'] == 0) && $matchedBillable->amount) {
                    $vendor['selling_amount'] = (float) $matchedBillable->amount;
                }
                if (empty($vendor['vendor_id']) && !empty($matchedBillable->vendor_id)) {
                    $vendor['vendor_id'] = (int) $matchedBillable->vendor_id;
                }
            }

            // Isi buying dari item COGS jika kosong
            if ($matchedCogs && (empty($vendor['buying_amount']) || $vendor['buying_amount'] == 0)) {
                $vendor['buying_amount'] = (float) $matchedCogs->amount;
            }

            // Lengkapi data vendor dari master
            if (!empty($vendor['vendor_id']) && empty($vendor['nama_vendor'])) {
                $v = Vendor::find($vendor['vendor_id']);
                if ($v) {
                    $vendor['nama_vendor'] = $v->nama_vendor;
                    $vendor['no_rekening'] = $vendor['no_rekening'] ?? $v->nomor_rekening;
                    $vendor['nama_rekening'] = $vendor['nama_rekening'] ?? $v->nama_rekening;
                }
            }

            // Default nama vendor internal jika ada nominal tapi identitas kosong
            if (empty($vendor['vendor_id']) && empty($vendor['nama_vendor']) && (!empty($vendor['buying_amount']) || !empty($vendor['selling_amount']))) {
                $vendor['nama_vendor'] = 'Divisi Operational';
            }
        }
        unset($vendor);

        $salesOrder->setAttribute('vendor_breakdown', $vendorBreakdown);
    }

    /**
     * Sinkronisasi item COGS vendor di invoice dengan vendor_breakdown terbaru.
     */
    private function syncVendorBreakdownToInvoices(SalesOrder $salesOrder): void
    {
        $salesOrder->loadMissing('invoices');

        if ($salesOrder->invoices->isEmpty()) {
            return;
        }

        $vendorBreakdown = $salesOrder->vendor_breakdown;
        $hasVendorData = is_array($vendorBreakdown) && !empty($vendorBreakdown);

        foreach ($salesOrder->invoices as $invoice) {
            // Hapus item billable & COGS lama berbasis vendor_breakdown
            InvoiceItem::where('invoice_id', $invoice->id)
                ->where('item_ref', 'like', 'vendor_%')
                ->delete();

            InvoiceItem::where('invoice_id', $invoice->id)
                ->where('item_ref', 'like', 'cogs_vendor_%')
                ->delete();

            if ($hasVendorData) {
                foreach ($vendorBreakdown as $index => $vendor) {
                    $rawVendorId = $vendor['vendor_id'] ?? null;
                    $vendorId = is_numeric($rawVendorId) ? (int) $rawVendorId : null;
                    $quantityInfo = $this->resolveItemQuantity($vendor, 1);
                    $quantity = $quantityInfo['quantity'];
                    $hasQuantity = $quantityInfo['hasQuantity'];
                    $unit = $this->normalizeItemUnit($vendor, 'SET');

                    // Billable line (selling)
                    $sellingRate = floatval($vendor['selling_amount'] ?? 0);
                    if ($sellingRate > 0) {
                        $sellingAmount = $hasQuantity ? $sellingRate * $quantity : $sellingRate;
                        $billRef = 'vendor_' . ($rawVendorId !== null ? $rawVendorId : $index);
                        InvoiceItem::create([
                            'invoice_id' => $invoice->id,
                            'description' => $vendor['description'] ?? 'Service',
                            'quantity' => $quantity,
                            'unit' => $unit,
                            'rate' => $sellingRate,
                            'currency' => 'IDR',
                            'amount' => $sellingAmount,
                            'item_ref' => $billRef,
                            'item_type' => 'billable',
                            'vendor_id' => $vendorId,
                            'include_in_customer_invoice' => true,
                            'is_hidden_from_customer' => false,
                        ]);
                    }

                    // COGS (buying)
                    $buyingRate = floatval($vendor['buying_amount'] ?? 0);
                    if ($buyingRate <= 0) {
                        continue;
                    }

                    $itemRef = 'cogs_vendor_' . ($rawVendorId !== null ? $rawVendorId : $index);
                    $buyingAmount = $hasQuantity ? $buyingRate * $quantity : $buyingRate;

                    InvoiceItem::create([
                        'invoice_id' => $invoice->id,
                        'description' => ($vendor['description'] ?? 'Service') . ' - Buying Cost (COGS)',
                        'quantity' => $quantity,
                        'unit' => $unit,
                        'rate' => $buyingRate,
                        'currency' => 'IDR',
                        'amount' => $buyingAmount,
                        'item_ref' => $itemRef,
                        'item_type' => 'operational_cost',
                        'vendor_id' => $vendorId,
                        'include_in_customer_invoice' => false,
                        'is_hidden_from_customer' => true,
                    ]);
                }
            }

            // COGS tidak mempengaruhi subtotal pelanggan tapi hitung ulang untuk konsistensi
            $invoice->calculateTotals();
        }
    }

    private function syncOperationalAndReimbursementToInvoices(SalesOrder $salesOrder): void
    {
        $salesOrder->loadMissing(['invoices', 'reimbursementItems']);

        if ($salesOrder->invoices->isEmpty()) {
            return;
        }

        $otherCosts = is_array($salesOrder->other_costs) ? $salesOrder->other_costs : [];
        $reimbursementItems = $salesOrder->reimbursementItems;
        $hasReimbursementInvoice = $salesOrder->invoices->contains(function (Invoice $invoice) {
            return $invoice->invoice_type === 'reimbursement';
        });

        foreach ($salesOrder->invoices as $invoice) {
            $shouldRecalculate = false;
            $syncOperational = $invoice->invoice_type !== 'reimbursement';
            $syncReimbursement = !$hasReimbursementInvoice || in_array($invoice->invoice_type, ['reimbursement', 'combined'], true);

            if ($syncOperational) {
                $expectedOperationalRefs = [];

                foreach ($otherCosts as $index => $otherCost) {
                    $rate = (float) ($otherCost['amount'] ?? 0);
                    if ($rate <= 0) {
                        continue;
                    }

                    $itemRef = 'other_cost_' . $index;
                    $expectedOperationalRefs[] = $itemRef;

                    $rawVendor = $otherCost['vendor_id'] ?? null;
                    $vendorId = $this->resolveVendorId($rawVendor);
                    $description = $otherCost['description'] ?? 'Additional Cost';
                    $quantityInfo = $this->resolveItemQuantity($otherCost, 1);
                    $quantity = $quantityInfo['quantity'];
                    $hasQuantity = $quantityInfo['hasQuantity'];
                    $unit = $this->normalizeItemUnit($otherCost, 'pcs');
                    $amount = $hasQuantity ? $rate * $quantity : $rate;

                    $itemData = [
                        'invoice_id' => $invoice->id,
                        'description' => 'Other Cost - ' . $description,
                        'quantity' => $quantity,
                        'unit' => $unit,
                        'rate' => $rate,
                        'currency' => 'IDR',
                        'amount' => $amount,
                        'item_ref' => $itemRef,
                        'item_type' => 'operational_cost',
                        'include_in_customer_invoice' => false,
                        'is_hidden_from_customer' => true,
                    ];

                    if ($vendorId) {
                        $itemData['vendor_id'] = $vendorId;
                    }

                    $existingItem = $invoice->items()
                        ->where('item_ref', $itemRef)
                        ->where('item_type', 'operational_cost')
                        ->first();

                    if ($existingItem) {
                        $existingItem->fill($itemData);
                        if ($existingItem->isDirty()) {
                            $existingItem->save();
                            $shouldRecalculate = true;
                        }
                    } else {
                        InvoiceItem::create($itemData);
                        $shouldRecalculate = true;
                    }
                }

                $deleteQuery = $invoice->items()
                    ->where('item_type', 'operational_cost')
                    ->where('item_ref', 'like', 'other_cost_%');

                if (!empty($expectedOperationalRefs)) {
                    $deleteQuery->whereNotIn('item_ref', $expectedOperationalRefs);
                }

                if ($deleteQuery->count() > 0) {
                    $deleteQuery->delete();
                    $shouldRecalculate = true;
                }
            }

            if ($syncReimbursement) {
                $expectedReimbursementRefs = [];

                foreach ($reimbursementItems as $reimbursementItem) {
                    if ($reimbursementItem->invoice_id && $reimbursementItem->invoice_id !== $invoice->id) {
                        continue;
                    }

                    $itemRef = 'reimbursement_' . $reimbursementItem->id;
                    $expectedReimbursementRefs[] = $itemRef;

                    $rate = (float) $reimbursementItem->amount;
                    $quantity = is_numeric($reimbursementItem->quantity) && (float) $reimbursementItem->quantity > 0
                        ? (float) $reimbursementItem->quantity
                        : null;
                    $unit = is_string($reimbursementItem->unit) && trim($reimbursementItem->unit) !== ''
                        ? trim($reimbursementItem->unit)
                        : null;
                    $receiptInfo = is_array($reimbursementItem->receipt_info)
                        ? $reimbursementItem->receipt_info
                        : [];
                    $quantity = $quantity ?? $this->normalizeReceiptQuantity($receiptInfo, 1);
                    $unit = $unit ?? $this->normalizeReceiptUnit($receiptInfo, 'SET');
                    $amount = $rate * $quantity;

                    $itemData = [
                        'invoice_id' => $invoice->id,
                        'description' => 'Reimbursement - ' . $reimbursementItem->description,
                        'quantity' => $quantity,
                        'unit' => $unit,
                        'rate' => $rate,
                        'currency' => 'IDR',
                        'amount' => $amount,
                        'item_ref' => $itemRef,
                        'item_type' => 'reimbursement',
                        'include_in_customer_invoice' => true,
                        'is_hidden_from_customer' => false,
                    ];

                    if ($reimbursementItem->vendor_id) {
                        $itemData['vendor_id'] = $reimbursementItem->vendor_id;
                    }

                    $existingItem = $invoice->items()
                        ->where('item_ref', $itemRef)
                        ->where('item_type', 'reimbursement')
                        ->first();

                    if ($existingItem) {
                        $existingItem->fill($itemData);
                        if ($existingItem->isDirty()) {
                            $existingItem->save();
                            $shouldRecalculate = true;
                        }
                    } else {
                        InvoiceItem::create($itemData);
                        $shouldRecalculate = true;
                    }

                    if (!$reimbursementItem->invoice_id) {
                        $reimbursementItem->markAsInvoiced($invoice->id);
                    }
                }

                $deleteQuery = $invoice->items()
                    ->where('item_type', 'reimbursement')
                    ->where('item_ref', 'like', 'reimbursement_%');

                if (!empty($expectedReimbursementRefs)) {
                    $deleteQuery->whereNotIn('item_ref', $expectedReimbursementRefs);
                }

                if ($deleteQuery->count() > 0) {
                    $deleteQuery->delete();
                    $shouldRecalculate = true;
                }
            }

            if ($shouldRecalculate) {
                $invoice->calculateTotals();
                \App\Models\AccountReceivable::syncFromInvoice($invoice->fresh());
            }
        }
    }

    /**
     * Attempt to find vendor id for an operational cost entry
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
     */
    /**
     * Create reimbursement items for a sales order
     */
    private function createReimbursementItems(SalesOrder $salesOrder, array $reimbursementItems)
    {
        foreach ($reimbursementItems as $item) {
            if (!empty($item['description']) && !empty($item['amount']) && $item['amount'] > 0) {
                $rawVendor = $item['vendor_id'] ?? null;
                $vendorId = $this->resolveVendorId($rawVendor);
                $quantity = (isset($item['quantity']) && is_numeric($item['quantity']) && (float) $item['quantity'] > 0)
                    ? (float) $item['quantity']
                    : 1;
                $lineTotal = (float) $item['amount'] * $quantity;

                \App\Models\ReimbursementItem::create([
                    'sales_order_id' => $salesOrder->id,
                    'description' => $item['description'],
                    'amount' => $item['amount'],
                    'quantity' => $quantity,
                    'unit' => isset($item['unit']) && is_string($item['unit']) && trim($item['unit']) !== ''
                        ? trim($item['unit'])
                        : null,
                    'vendor_id' => $vendorId,
                    'category' => $item['category'] ?? 'general',
                    'notes' => $item['notes'] ?? null,
                    'status' => 'pending',
                    'customer_paid_amount' => 0,
                    'customer_outstanding_amount' => $lineTotal,
                    'customer_payment_status' => 'outstanding',
                    'created_by' => Auth::id(),
                    'receipt_info' => $this->mergeVendorSelectionIntoReceiptInfo(null, $rawVendor),
                ]);
            }
        }
    }

    /**
     * Update reimbursement items for a sales order
     */
    private function updateReimbursementItems(SalesOrder $salesOrder, array $reimbursementItems)
    {
        $existingCollection = $salesOrder->reimbursementItems()->get();
        $existingItems = $existingCollection->keyBy('id');
        $processedIds = [];
        $invoicesToRecalculate = [];

        $matchExisting = function (array $attributes) use ($existingCollection) {
            return $existingCollection->first(function (ReimbursementItem $existing) use ($attributes) {
                $existingQty = is_numeric($existing->quantity) ? (float) $existing->quantity : 1;
                $incomingQty = is_numeric($attributes['quantity'] ?? null) ? (float) $attributes['quantity'] : 1;
                return strcasecmp($existing->description ?? '', $attributes['description'] ?? '') === 0
                    && abs((float) $existing->amount - (float) $attributes['amount']) < 0.01
                    && abs($existingQty - $incomingQty) < 0.01;
            });
        };

        foreach ($reimbursementItems as $item) {
            if (empty($item['description']) || empty($item['amount']) || $item['amount'] <= 0) {
                continue;
            }

            $rawVendor = $item['vendor_id'] ?? null;
            $vendorId = $this->resolveVendorId($rawVendor);

            $attributes = [
                'description' => $item['description'],
                'amount' => $item['amount'],
                'quantity' => (isset($item['quantity']) && is_numeric($item['quantity']) && (float) $item['quantity'] > 0)
                    ? (float) $item['quantity']
                    : 1,
                'unit' => isset($item['unit']) && is_string($item['unit']) && trim($item['unit']) !== ''
                    ? trim($item['unit'])
                    : null,
                'vendor_id' => $vendorId,
                'category' => $item['category'] ?? 'general',
                'notes' => $item['notes'] ?? null,
            ];

            $reimbursement = null;

            if (!empty($item['id']) && $existingItems->has($item['id'])) {
                $reimbursement = $existingItems->get($item['id']);
            } else {
                $matched = $matchExisting($attributes);
                if ($matched) {
                    $reimbursement = $matched;
                }
            }

            if ($reimbursement) {
                $attributes['receipt_info'] = $this->mergeVendorSelectionIntoReceiptInfo(
                    $reimbursement->receipt_info ?? null,
                    $rawVendor
                );

                $reimbursement->fill($attributes);

                $lineTotal = (float) $attributes['amount'] * (float) $attributes['quantity'];
                $paidAmount = (float) ($reimbursement->customer_paid_amount ?? 0);
                if ($paidAmount > $lineTotal) {
                    $paidAmount = $lineTotal;
                }
                $reimbursement->customer_paid_amount = $paidAmount;
                $reimbursement->customer_outstanding_amount = max(0, $lineTotal - $paidAmount);
                if ($reimbursement->customer_outstanding_amount <= 0.01) {
                    $reimbursement->customer_payment_status = 'paid';
                    $reimbursement->customer_outstanding_amount = 0;
                } elseif ($paidAmount > 0) {
                    $reimbursement->customer_payment_status = 'partial';
                } else {
                    $reimbursement->customer_payment_status = 'outstanding';
                }

                if ($reimbursement->isDirty()) {
                    $reimbursement->save();
                }

                if ($reimbursement->invoice_id) {
                    $invoice = $reimbursement->invoice;
                    if ($invoice) {
                        $quantity = is_numeric($reimbursement->quantity) && (float) $reimbursement->quantity > 0
                            ? (float) $reimbursement->quantity
                            : 1;
                        $unit = is_string($reimbursement->unit) && trim($reimbursement->unit) !== ''
                            ? trim($reimbursement->unit)
                            : 'SET';
                        $rate = (float) $reimbursement->amount;
                        $lineAmount = $rate * $quantity;
                        $invoice->items()
                            ->where('item_ref', 'reimbursement_' . $reimbursement->id)
                            ->update([
                                'description' => 'Reimbursement - ' . $reimbursement->description,
                                'quantity' => $quantity,
                                'unit' => $unit,
                                'rate' => $rate,
                                'amount' => $lineAmount,
                                'vendor_id' => $vendorId,
                            ]);
                        $invoicesToRecalculate[$invoice->id] = $invoice;
                    }
                }

                $processedIds[] = $reimbursement->id;
            } else {
                $lineTotal = (float) $attributes['amount'] * (float) $attributes['quantity'];
                $newItem = ReimbursementItem::create([
                    'sales_order_id' => $salesOrder->id,
                    'description' => $attributes['description'],
                    'amount' => $attributes['amount'],
                    'quantity' => $attributes['quantity'],
                    'unit' => $attributes['unit'],
                    'vendor_id' => $vendorId,
                    'category' => $attributes['category'],
                    'notes' => $attributes['notes'],
                    'status' => 'pending',
                    'customer_paid_amount' => 0,
                    'customer_outstanding_amount' => $lineTotal,
                    'customer_payment_status' => 'outstanding',
                    'created_by' => Auth::id(),
                    'receipt_info' => $this->mergeVendorSelectionIntoReceiptInfo(null, $rawVendor),
                ]);

                $processedIds[] = $newItem->id;
            }
        }

        $cleanupQuery = $salesOrder->reimbursementItems()->whereIn('status', ['pending', 'linked']);
        if (!empty($processedIds)) {
            $cleanupQuery->whereNotIn('id', $processedIds);
        }
        $cleanupQuery->delete();

        foreach ($invoicesToRecalculate as $invoice) {
            $invoice->calculateTotals();
        }
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

    private function resolveItemQuantity(array $payload, float $fallback = 1): array
    {
        $quantity = $payload['quantity'] ?? $payload['qty'] ?? null;
        $hasQuantity = is_numeric($quantity) && (float) $quantity > 0;

        return [
            'quantity' => $hasQuantity ? (float) $quantity : $fallback,
            'hasQuantity' => $hasQuantity,
        ];
    }

    private function normalizeItemQuantity(array $payload, float $fallback = 1): float
    {
        return $this->resolveItemQuantity($payload, $fallback)['quantity'];
    }

    private function normalizeItemUnit(array $payload, string $fallback): string
    {
        $unit = $payload['unit'] ?? $payload['package_unit'] ?? null;

        if (is_string($unit)) {
            $unit = trim($unit);
            if ($unit !== '') {
                return $unit;
            }
        }

        return $fallback;
    }

    private function normalizeReceiptQuantity(array $receiptInfo, float $fallback = 1): float
    {
        $quantity = $receiptInfo['quantity'] ?? null;

        if (is_numeric($quantity) && (float) $quantity > 0) {
            return (float) $quantity;
        }

        return $fallback;
    }

    private function normalizeReceiptUnit(array $receiptInfo, string $fallback): string
    {
        $unit = $receiptInfo['unit'] ?? null;

        if (is_string($unit)) {
            $unit = trim($unit);
            if ($unit !== '') {
                return $unit;
            }
        }

        return $fallback;
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

    private function enrichSalesOrderWithPaidComponentLocks(SalesOrder $salesOrder): void
    {
        $locks = $this->getPaidComponentLocks($salesOrder);
        $lockedOtherCostIds = $locks['other_cost_ids'];
        $lockedOtherCostIndexes = $locks['other_cost_indexes'];
        $lockedOtherCostLookupRefs = $locks['other_cost_lookup_refs'];
        $lockedReimbursementIds = $locks['reimbursement_ids'];

        $otherCosts = $this->normalizeOtherCostEntries(
            is_array($salesOrder->other_costs) ? $salesOrder->other_costs : []
        );

        foreach ($otherCosts as $index => &$cost) {
            $lookupRef = $this->buildOtherCostLookupRef($cost, $index);
            $cost['is_paid_locked'] =
                in_array((string) ($cost['id'] ?? ''), $lockedOtherCostIds, true)
                || in_array($index, $lockedOtherCostIndexes, true)
                || in_array($lookupRef, $lockedOtherCostLookupRefs, true);
        }
        unset($cost);

        $salesOrder->setAttribute('other_costs', $otherCosts);

        $salesOrder->loadMissing('reimbursementItems');
        $salesOrder->reimbursementItems->each(function (ReimbursementItem $item) use ($lockedReimbursementIds) {
            $item->setAttribute(
                'is_paid_locked',
                in_array((int) $item->id, $lockedReimbursementIds, true)
            );
        });
    }

    private function normalizeOtherCostEntries(array $otherCosts): array
    {
        $normalized = [];

        foreach ($otherCosts as $entry) {
            if (!is_array($entry)) {
                $entry = (array) $entry;
            }

            // Keep legacy rows without id as-is. Generating random ids per request
            // causes lock checks to think paid rows were removed.
            $entry['id'] = !empty($entry['id'])
                ? (string) $entry['id']
                : null;

            $normalized[] = $entry;
        }

        return $normalized;
    }

    private function validateOtherCostDuplicates(array $incomingOtherCosts, array $baselineOtherCosts = []): void
    {
        $baselineCounts = [];
        foreach ($baselineOtherCosts as $entry) {
            $key = $this->buildOtherCostDuplicateKey(is_array($entry) ? $entry : (array) $entry);
            if ($key === null) {
                continue;
            }

            $baselineCounts[$key] = ($baselineCounts[$key] ?? 0) + 1;
        }

        $incomingCounts = [];
        $incomingRows = [];
        $incomingLabels = [];

        foreach ($incomingOtherCosts as $index => $entry) {
            $entry = is_array($entry) ? $entry : (array) $entry;
            $key = $this->buildOtherCostDuplicateKey($entry);
            if ($key === null) {
                continue;
            }

            $incomingCounts[$key] = ($incomingCounts[$key] ?? 0) + 1;
            $incomingRows[$key][] = $index + 1;
            if (!isset($incomingLabels[$key])) {
                $incomingLabels[$key] = trim((string) ($entry['description'] ?? '-'));
            }
        }

        $errors = [];
        foreach ($incomingCounts as $key => $count) {
            $allowedCount = max(1, (int) ($baselineCounts[$key] ?? 0));
            if ($count <= $allowedCount) {
                continue;
            }

            $duplicateRows = array_slice($incomingRows[$key], $allowedCount);
            $errors[] = 'Baris ' . implode(', ', $duplicateRows)
                . ' duplikat untuk biaya "'
                . $incomingLabels[$key]
                . '" (kombinasi deskripsi + vendor + amount harus unik).';
        }

        if (!empty($errors)) {
            throw ValidationException::withMessages([
                'other_costs' => implode(' ', $errors),
            ]);
        }
    }

    private function buildOtherCostDuplicateKey(array $entry): ?string
    {
        $description = trim((string) ($entry['description'] ?? ''));
        if ($description === '') {
            return null;
        }

        $amount = (float) ($entry['amount'] ?? 0);
        if ($amount <= 0) {
            return null;
        }

        $vendorKey = $this->normalizeOtherCostVendorForDuplicate($entry['vendor_id'] ?? null);

        return strtolower($description)
            . '|'
            . $vendorKey
            . '|'
            . number_format(round($amount, 2), 2, '.', '');
    }

    private function normalizeOtherCostVendorForDuplicate($rawVendor): string
    {
        if (is_array($rawVendor)) {
            $rawVendor = $rawVendor['id'] ?? $rawVendor['value'] ?? null;
        }

        if ($rawVendor === null) {
            return 'internal';
        }

        if (is_string($rawVendor)) {
            $rawVendor = trim($rawVendor);
            if ($rawVendor === '' || strtolower($rawVendor) === 'internal') {
                return 'internal';
            }

            if (is_numeric($rawVendor)) {
                return 'vendor_' . (int) $rawVendor;
            }

            return 'vendor_' . strtolower($rawVendor);
        }

        if (is_numeric($rawVendor)) {
            return 'vendor_' . (int) $rawVendor;
        }

        return 'internal';
    }

    private function generateOtherCostId(): string
    {
        return 'oc_' . Str::uuid()->toString();
    }

    private function getPaidComponentLocks(SalesOrder $salesOrder): array
    {
        $salesOrder->loadMissing('accountPayables.components', 'reimbursementItems');

        $otherCostIds = [];
        $otherCostIndexes = [];
        $otherCostLookupRefs = [];
        $reimbursementIds = [];

        foreach ($salesOrder->accountPayables as $accountPayable) {
            foreach ($accountPayable->components as $component) {
                if (($component->status ?? null) !== 'paid') {
                    continue;
                }

                $relatedItems = is_array($component->related_items) ? $component->related_items : [];

                if ($component->component_type === 'operational_cost') {
                    if (isset($relatedItems['other_cost_id'])) {
                        $otherCostIds[] = (string) $relatedItems['other_cost_id'];
                    }

                    if (isset($relatedItems['other_cost_index']) && is_numeric($relatedItems['other_cost_index'])) {
                        $otherCostIndexes[] = (int) $relatedItems['other_cost_index'];
                    }

                    if (!empty($relatedItems['lookup_ref'])) {
                        $otherCostLookupRefs[] = (string) $relatedItems['lookup_ref'];
                    }
                }

                if ($component->component_type === 'reimbursement') {
                    if (isset($relatedItems['reimbursement_item_id']) && is_numeric($relatedItems['reimbursement_item_id'])) {
                        $reimbursementIds[] = (int) $relatedItems['reimbursement_item_id'];
                    }
                }
            }
        }

        foreach ($salesOrder->reimbursementItems as $item) {
            $vendorStatus = strtolower((string) ($item->status ?? ''));
            $customerStatus = strtolower((string) ($item->customer_payment_status ?? ''));

            if ($vendorStatus === 'paid' || $customerStatus === 'paid') {
                $reimbursementIds[] = (int) $item->id;
            }
        }

        return [
            'other_cost_ids' => array_values(array_unique($otherCostIds)),
            'other_cost_indexes' => array_values(array_unique($otherCostIndexes)),
            'other_cost_lookup_refs' => array_values(array_unique($otherCostLookupRefs)),
            'reimbursement_ids' => array_values(array_unique($reimbursementIds)),
        ];
    }

    private function assertLockedItemsNotRemoved(
        array $incomingOtherCosts,
        array $incomingReimbursements,
        array $existingOtherCosts,
        array $locks
    ): void {
        $errors = [];

        $incomingOtherCostIds = collect($incomingOtherCosts)
            ->map(fn ($entry) => isset($entry['id']) ? (string) $entry['id'] : null)
            ->filter()
            ->values()
            ->all();

        foreach ($existingOtherCosts as $index => $entry) {
            $entryId = (string) ($entry['id'] ?? '');
            $lookupRef = $this->buildOtherCostLookupRef($entry, $index);
            $isLocked =
                in_array($entryId, $locks['other_cost_ids'] ?? [], true)
                || in_array($index, $locks['other_cost_indexes'] ?? [], true)
                || in_array($lookupRef, $locks['other_cost_lookup_refs'] ?? [], true);

            if (!$isLocked) {
                continue;
            }

            if ($entryId !== '' && in_array($entryId, $incomingOtherCostIds, true)) {
                continue;
            }

            $stillExistsByLookup = false;
            foreach ($incomingOtherCosts as $incomingIndex => $incomingEntry) {
                if ($this->buildOtherCostLookupRef($incomingEntry, $incomingIndex) === $lookupRef) {
                    $stillExistsByLookup = true;
                    break;
                }
            }

            if (!$stillExistsByLookup) {
                // Legacy rows without stable id can be omitted by older frontend payloads.
                // They will be restored by enforcePaidOtherCostLocks(), so avoid false-positive rejection.
                if ($entryId === '') {
                    continue;
                }

                $errors['other_costs'] = 'Tidak bisa menghapus item Other Cost yang sudah Paid di AP/AR.';
                break;
            }
        }

        $lockedReimbursementIds = array_values(array_unique(array_map('intval', $locks['reimbursement_ids'] ?? [])));
        if (!empty($lockedReimbursementIds)) {
            $incomingReimbursementIds = collect($incomingReimbursements)
                ->filter(fn ($entry) => isset($entry['id']) && is_numeric($entry['id']))
                ->map(fn ($entry) => (int) $entry['id'])
                ->values()
                ->all();

            $missingLockedReimbursements = array_values(array_diff($lockedReimbursementIds, $incomingReimbursementIds));
            if (!empty($missingLockedReimbursements)) {
                $errors['reimbursement_items'] = 'Tidak bisa menghapus item Reimbursement yang sudah Paid di AP/AR.';
            }
        }

        if (!empty($errors)) {
            throw ValidationException::withMessages($errors);
        }
    }

    private function enforcePaidOtherCostLocks(array $incomingOtherCosts, array $existingOtherCosts, array $locks): array
    {
        $lockedEntries = [];
        $existingById = [];
        $incomingById = [];
        $incomingByLookupRef = [];

        foreach ($incomingOtherCosts as $index => $entry) {
            $lookupRef = $this->buildOtherCostLookupRef($entry, $index);
            $incomingByLookupRef[$lookupRef][] = $index;

            if (!empty($entry['id'])) {
                $incomingById[(string) $entry['id']] = $index;
            }
        }

        foreach ($existingOtherCosts as $index => $entry) {
            $entryId = (string) ($entry['id'] ?? '');
            if ($entryId === '') {
                continue;
            }

            $existingById[$entryId] = $entry;

            $lookupRef = $this->buildOtherCostLookupRef($entry, $index);
            $isLocked =
                in_array($entryId, $locks['other_cost_ids'] ?? [], true)
                || in_array($index, $locks['other_cost_indexes'] ?? [], true)
                || in_array($lookupRef, $locks['other_cost_lookup_refs'] ?? [], true);

            if ($isLocked) {
                $lockedEntries[] = [
                    'id' => $entryId,
                    'lookup_ref' => $lookupRef,
                ];
            }
        }

        foreach ($lockedEntries as $lockedEntry) {
            $lockedId = (string) ($lockedEntry['id'] ?? '');
            $lookupRef = (string) ($lockedEntry['lookup_ref'] ?? '');

            if (!isset($existingById[$lockedId])) {
                continue;
            }

            $lockedPayload = $existingById[$lockedId];
            if (isset($incomingById[$lockedId])) {
                $incomingOtherCosts[$incomingById[$lockedId]] = $lockedPayload;
                continue;
            }

            if ($lookupRef !== '' && !empty($incomingByLookupRef[$lookupRef])) {
                $matchedIndex = array_shift($incomingByLookupRef[$lookupRef]);
                if ($matchedIndex !== null) {
                    $incomingOtherCosts[$matchedIndex] = $lockedPayload;
                    continue;
                }
            }

            $incomingOtherCosts[] = $lockedPayload;
        }

        return array_values($incomingOtherCosts);
    }

    private function enforcePaidReimbursementLocks(array $incomingReimbursements, SalesOrder $salesOrder, array $locks): array
    {
        $lockedIds = array_values(array_unique(array_map('intval', $locks['reimbursement_ids'] ?? [])));
        if (empty($lockedIds)) {
            return $incomingReimbursements;
        }

        $salesOrder->loadMissing('reimbursementItems');
        $existingLockedItems = $salesOrder->reimbursementItems
            ->whereIn('id', $lockedIds)
            ->keyBy('id');

        $incomingById = [];
        foreach ($incomingReimbursements as $index => $entry) {
            if (isset($entry['id']) && is_numeric($entry['id'])) {
                $incomingById[(int) $entry['id']] = $index;
            }
        }

        foreach ($lockedIds as $lockedId) {
            /** @var ReimbursementItem|null $existing */
            $existing = $existingLockedItems->get($lockedId);
            if (!$existing) {
                continue;
            }

            $lockedPayload = $this->reimbursementItemToPayload($existing);
            if (isset($incomingById[$lockedId])) {
                $incomingReimbursements[$incomingById[$lockedId]] = $lockedPayload;
                continue;
            }

            $incomingReimbursements[] = $lockedPayload;
        }

        return array_values($incomingReimbursements);
    }

    private function reimbursementItemToPayload(ReimbursementItem $item): array
    {
        return [
            'id' => (int) $item->id,
            'description' => $item->description,
            'amount' => (float) $item->amount,
            'quantity' => (float) ($item->quantity ?? 1),
            'unit' => $item->unit,
            'category' => $item->category,
            'notes' => $item->notes,
            'vendor_id' => $item->vendor_id,
        ];
    }

    private function buildOtherCostLookupRef(array $entry, int $index): string
    {
        if (!empty($entry['id'])) {
            return 'other_cost_' . (string) $entry['id'];
        }

        $description = trim((string) ($entry['description'] ?? ''));
        $amount = (float) ($entry['amount'] ?? 0);
        $vendorId = $this->resolveVendorId($entry['vendor_id'] ?? null);
        $vendorName = $this->resolveOtherCostVendorName($entry);

        return 'other_cost_' . md5(json_encode([
            'description' => $description,
            'amount' => $amount,
            'vendor_id' => $vendorId,
            'vendor_name' => $vendorName,
            'category' => $entry['category'] ?? null,
        ]));
    }

    private function resolveOtherCostVendorName(array $entry): ?string
    {
        $vendorName = $entry['vendor_name'] ?? $entry['nama_vendor'] ?? null;
        if (!is_string($vendorName)) {
            return null;
        }

        $vendorName = trim($vendorName);
        return $vendorName !== '' ? $vendorName : null;
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
            // auto-set category refund jika deskripsi mengandung refund
            if (!empty($otherCosts[$index]['description']) && empty($otherCosts[$index]['category'])) {
                if (stripos($otherCosts[$index]['description'], 'refund') !== false) {
                    $otherCosts[$index]['category'] = 'refund';
                }
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
        if ($request->has('exchange_rate')) {
            $request->merge(['exchange_rate' => $this->normalizeIndonesianNumber($request->exchange_rate)]);
        }
        if ($request->has('net_weight')) {
            $request->merge(['net_weight' => $this->normalizeIndonesianNumber($request->net_weight)]);
        }
        if ($request->has('gross_weight')) {
            $request->merge(['gross_weight' => $this->normalizeIndonesianNumber($request->gross_weight)]);
        }
        if ($request->has('measurement')) {
            $request->merge(['measurement' => $this->normalizeIndonesianNumber($request->measurement)]);
        }
    }

    /**
     * Normalize Indonesian number format (1.000,50 -> 1000.50)
     * Also handles international format (1000.50 or 2)
     */
    private function normalizeIndonesianNumber($value)
    {
        if ($value === null || $value === '') {
            return null;
        }

        // Convert to string for processing
        $value = (string)$value;

        // Remove spaces
        $value = trim($value);

        // If already a valid number (no formatting), return as is
        if (is_numeric($value)) {
            return $value;
        }

        // Check if this is Indonesian format (has comma as decimal separator)
        // Indonesian: 1.000,50 or 1.000 or 1000,50
        // International: 1,000.50 or 1000.50

        if (strpos($value, ',') !== false) {
            // Has comma - check if it's Indonesian format (comma is decimal)
            // Indonesian format: comma appears after dots OR comma is the only separator
            $dotPos = strrpos($value, '.');
            $commaPos = strrpos($value, ',');

            if ($dotPos === false || $commaPos > $dotPos) {
                // Indonesian format: 1.000,50 or 1000,50
                // Remove thousand separators (dots)
                $value = str_replace('.', '', $value);
                // Replace decimal comma with dot
                $value = str_replace(',', '.', $value);
            } else {
                // International format with comma as thousand separator: 1,000.50
                // Remove thousand separators (commas)
                $value = str_replace(',', '', $value);
            }
        } else {
            // No comma - could be 1.000 (Indonesian thousand) or 1000.50 (international decimal)
            // Check if dot is used as thousand separator (appears before last 3 digits)
            if (strpos($value, '.') !== false) {
                $parts = explode('.', $value);
                // If last part has exactly 3 digits and there are multiple parts, it's thousand separator
                // Example: 1.000 or 10.000.000 (Indonesian)
                // But 1.5 or 1.50 is decimal (International)
                if (count($parts) > 1 && strlen($parts[count($parts) - 1]) === 3 && count($parts) > 2) {
                    // Multiple dots with 3-digit groups: definitely Indonesian thousand separator
                    $value = str_replace('.', '', $value);
                } elseif (count($parts) == 2 && strlen($parts[1]) === 3 && strlen($parts[0]) > 3) {
                    // Single dot with exactly 3 digits after and more than 3 before: likely Indonesian
                    // Example: 10000.000 but NOT 2.000 (ambiguous, keep as is)
                    $value = str_replace('.', '', $value);
                }
                // Otherwise keep dot as decimal separator (international format)
            }
        }

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
}
