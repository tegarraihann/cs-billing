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
        // Force fresh query untuk memastikan data terbaru
        $query = SalesOrder::with(['creator', 'releasedBy', 'vouchers'])
            ->whereIn('status', ['released', 'approved', 'rejected'])
            ->whereNotNull('released_at')
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
        // Fresh query to ensure we have the latest data from database
        $salesOrder = $salesOrder->fresh(['creator', 'releasedBy', 'vouchers', 'invoices', 'reimbursementItems']);

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
            ->with(['creator', 'releasedBy', 'vouchers'])
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

    public function approveVoucher(Request $request, SalesOrder $salesOrder, Voucher $voucher)
    {
        if (!in_array($salesOrder->status, ['released', 'approved']) || $salesOrder->released_at === null) {
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

        if (!in_array($salesOrder->status, ['released', 'approved']) || $salesOrder->released_at === null) {
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
            'vendor_breakdown.*.vendor_id' => 'nullable|exists:vendors,id',
            'vendor_breakdown.*.nama_vendor' => 'nullable|string|max:255',
            'vendor_breakdown.*.no_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.nama_rekening' => 'nullable|string|max:255',
            'vendor_breakdown.*.description' => 'nullable|string|in:,OF/AF,HANDLING,PIB EDI,ADMIN DOC,TRUCKING,D/O CHARGES,LOLO,STORAGE,REFUND,OTHER',
            'vendor_breakdown.*.buying_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.selling_amount' => 'required_with:vendor_breakdown|numeric|min:0',
            'vendor_breakdown.*.rcvd_inv' => 'nullable|string|max:255',
            'vendor_breakdown.*.remarks' => 'nullable|string|max:500',
            'remarks' => 'nullable|string',
            'note' => 'nullable|string',
            'commodity' => 'nullable|string',
            'qty' => 'nullable|integer|min:0',
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

        // Convert container_no to array format
        if (isset($validated['container_no'])) {
            if (is_string($validated['container_no'])) {
                // Handle multiple containers separated by comma, space, or newline
                $containers = preg_split('/[,\s\n\r]+/', trim($validated['container_no']));
                $validated['container_no'] = array_filter($containers, 'strlen'); // Remove empty values
            } elseif (!is_array($validated['container_no'])) {
                $validated['container_no'] = [$validated['container_no']];
            }
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

        $operationalCostCategories = \App\Models\OperationalCostCategory::active()
            ->select('id', 'name', 'description')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/SalesOrders/Edit', [
            'salesOrder' => $salesOrder,
            'vendors' => $vendors,
            'shipmentTypes' => $shipmentTypes,
            'operationalCostCategories' => $operationalCostCategories,
            'packageUnits' => \App\Models\MasterPackageUnit::getActiveUnits()
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
            'remarks' => 'nullable|string',
            'note' => 'nullable|string',
            'commodity' => 'nullable|string',
            'qty' => 'nullable|integer|min:0',
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
        ]);

        // Convert container_no to array format
        if (isset($validated['container_no'])) {
            if (is_string($validated['container_no'])) {
                // Handle multiple containers separated by comma, space, or newline
                $containers = preg_split('/[,\s\n\r]+/', trim($validated['container_no']));
                $validated['container_no'] = array_filter($containers, 'strlen'); // Remove empty values
            } elseif (!is_array($validated['container_no'])) {
                $validated['container_no'] = [$validated['container_no']];
            }
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

        // Don't change status on update - preserve existing status
        // This prevents released Sales Orders from being reverted to draft when edited

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

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        try {
            // Try using the Facade first (using same template as Admin CS)
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
     * Generate PDF for the specified voucher
     */
    public function printVoucher(SalesOrder $salesOrder, Voucher $voucher)
    {
        // Check if voucher belongs to the sales order
        if ($voucher->sales_order_id !== $salesOrder->id) {
            return redirect()->back()->withErrors(['error' => 'Voucher tidak terkait dengan sales order ini.']);
        }

        // Check if voucher has been released
        if ($voucher->status === 'draft') {
            return redirect()->back()->withErrors(['error' => 'Voucher harus dirilis terlebih dahulu sebelum dapat dicetak.']);
        }

        // Load the sales order relationship
        $voucher->load(['salesOrder']);

        try {
            // Generate PDF using the voucher template
            $pdf = Pdf::loadView('admin.admin-cs.vouchers.pdf', compact('voucher', 'salesOrder'))
                ->setPaper('a4', 'portrait')
                ->setOptions([
                    'defaultFont' => 'Arial',
                    'isRemoteEnabled' => true,
                    'isHtml5ParserEnabled' => true,
                    'isPhpEnabled' => true,
                ]);

            return $pdf->download('voucher-' . $voucher->voucher_no . '.pdf');

        } catch (\Exception $e) {
            \Log::error('PDF Voucher Generation Error: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Gagal membuat PDF voucher: ' . $e->getMessage()]);
        }
    }

    /**
     * Preview voucher in browser (for editing/reviewing before print)
     */
    public function previewVoucher(SalesOrder $salesOrder, Voucher $voucher)
    {
        // Check if voucher belongs to the sales order
        if ($voucher->sales_order_id !== $salesOrder->id) {
            return redirect()->back()->withErrors(['error' => 'Voucher tidak terkait dengan sales order ini.']);
        }

        // Check if voucher has been released (allow draft for preview purposes)
        if ($voucher->status === 'draft') {
            // Show warning but allow preview
            session()->flash('warning', 'Voucher masih dalam status draft. Preview ini hanya untuk review sebelum release.');
        }

        // Load the sales order relationship
        $voucher->load(['salesOrder']);

        try {
            // Return the HTML view directly for browser preview (no PDF generation)
            return view('admin.admin-cs.vouchers.preview', compact('voucher', 'salesOrder'));

        } catch (\Exception $e) {
            \Log::error('Voucher Preview Error: ' . $e->getMessage());
            return redirect()->back()->withErrors(['error' => 'Gagal menampilkan preview voucher: ' . $e->getMessage()]);
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
