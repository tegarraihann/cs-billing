<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\SalesOrder;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Basic query first - include items for profit margin calculations
            $invoices = Invoice::with(['salesOrder', 'customer', 'confirmedBy', 'items'])
                              ->orderBy('created_at', 'desc')
                              ->paginate(10);

            // Simple processing for combined invoices
            foreach ($invoices as $invoice) {
                if ($invoice->invoice_type === 'combined') {
                    $invoice->invoice_types = ['main', 'reimbursement'];
                } else {
                    $invoice->invoice_types = [$invoice->invoice_type ?? 'main'];
                }
            }

            // Basic stats
            $stats = [
                'total_invoices' => Invoice::count(),
                'paid_invoices' => Invoice::where('status', 'paid')->count(),
                'overdue_invoices' => 0, // Simplified temporarily
                'pending_invoices' => 0, // Simplified temporarily
                'total_amount' => Invoice::sum('total') ?? 0,
                'paid_amount' => Invoice::where('status', 'paid')->sum('paid_amount') ?? 0,
                'outstanding_amount' => 0 // Simplified temporarily
            ];

            return Inertia::render('Admin/AdminKeuangan/Invoices/Index', [
                'invoices' => $invoices,
                'filters' => $request->only(['status', 'invoice_type', 'search', 'date_from', 'date_to']),
                'stats' => $stats
            ]);

        } catch (\Exception $e) {
            \Log::error('Invoice index error: ' . $e->getMessage(), [
                'line' => $e->getLine(),
                'file' => $e->getFile(),
                'trace' => $e->getTraceAsString()
            ]);

            // Return simple error response for debugging
            return response()->json([
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile()
            ], 500);
        }
    }

    public function create(Request $request)
    {
        // Check if coming from Sales Order detail page
        if ($request->has('sales_order_id') && $request->has('invoice_type')) {
            $salesOrder = SalesOrder::findOrFail($request->sales_order_id);

            // Verify SO is eligible for invoice creation - must be approved by finance
            if ($salesOrder->status !== 'approved' || !$salesOrder->released_at || !$salesOrder->approved_at) {
                return redirect()->route('admin-keuangan.invoices.index')
                    ->withErrors(['error' => 'Sales Order harus sudah disetujui finance untuk dibuat invoice.']);
            }

            // Check if invoice type already exists
            $existingInvoice = Invoice::where('sales_order_id', $request->sales_order_id)
                ->where('invoice_type', $request->invoice_type)
                ->first();

            if ($existingInvoice) {
                return redirect()->route('admin-keuangan.sales-orders.show', $salesOrder->id)
                    ->withErrors(['error' => 'Invoice ' . ucfirst($request->invoice_type) . ' sudah ada untuk Sales Order ini.']);
            }

            return Inertia::render('Admin/AdminKeuangan/Invoices/Create', [
                'salesOrders' => collect([$salesOrder]),
                'preselectedSalesOrder' => $salesOrder->id,
                'preselectedInvoiceType' => $request->invoice_type
            ]);
        }

        // Get only approved SOs (already released and approved by finance)
        $allSalesOrders = SalesOrder::with('invoices')
            ->where('status', 'approved')  // Only approved SOs, not just released
            ->whereNotNull('released_at')
            ->whereNotNull('approved_at')  // Must be approved by finance
            ->orderBy('approved_at', 'desc')  // Order by approval date
            ->get();

        // Filter SOs that can still have invoices created
        $salesOrders = $allSalesOrders->filter(function($salesOrder) {
            // Only show SOs that have NO invoices at all
            return $salesOrder->invoices->count() === 0;
        });

        return Inertia::render('Admin/AdminKeuangan/Invoices/Create', [
            'salesOrders' => $salesOrders
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
            'sales_order_id' => 'required|exists:sales_orders,id',
            'invoice_type' => 'required|in:main,reimbursement,combined',
            'invoice_date' => 'required|date',
            'term_days' => 'required|integer|min:1',
            'shipper' => 'nullable|string|max:255',
            'consignee' => 'nullable|string|max:255',
            'awb_bl_no' => 'nullable|string|max:255',
            'mawb_obl_no' => 'nullable|string|max:255',
            'gross_weight' => 'nullable|numeric',
            'volume' => 'nullable|string|max:255',
            'no_of_packages' => 'nullable|integer',
            'vessel' => 'nullable|string|max:255',
            'flight_voy' => 'nullable|string|max:255',
            'pol_pod' => 'nullable|string|max:255',
            'origin' => 'nullable|string|max:255',
            'destination' => 'nullable|string|max:255',
            'etd' => 'nullable|date',
            'eta' => 'nullable|date',
            'container_no' => 'nullable|string|max:255',
            'container_size' => 'nullable|string|max:255',
            'remarks' => 'nullable|string',
            'items' => 'nullable|array',
            'items.*.description' => 'required_with:items|string|max:255',
            'items.*.quantity' => 'required_with:items|numeric|min:0.01',
            'items.*.unit' => 'required_with:items|string|max:50',
            'items.*.rate' => 'required_with:items|numeric|min:0',
            'items.*.currency' => 'required_with:items|string|max:3',
            'items.*.item_ref' => 'nullable|string|max:255',
            'items.*.type' => 'nullable|string|in:main,reimbursement,operational',
            'items.*.item_type' => 'nullable|string|in:billable,operational_cost',
            'items.*.include_in_customer_invoice' => 'nullable|boolean',
            'items.*.is_hidden_from_customer' => 'nullable|boolean',
            'down_payment_amount' => 'nullable|numeric|min:0',
            'down_payment_date' => 'nullable|date',
            'down_payment_notes' => 'nullable|string|max:1000',
        ]);

        $salesOrder = SalesOrder::findOrFail($validated['sales_order_id']);

        // Check if invoice type already exists for this Sales Order
        $existingInvoice = Invoice::where('sales_order_id', $validated['sales_order_id'])
            ->where('invoice_type', $validated['invoice_type'])
            ->first();

        if ($existingInvoice) {
            return back()->withErrors([
                'invoice_type' => 'An invoice of type "' . ucfirst($validated['invoice_type']) . '" already exists for this Sales Order.'
            ]);
        }

        $invoiceDate = Carbon::parse($validated['invoice_date']);
        $dueDate = $invoiceDate->copy()->addDays($validated['term_days']);

        // Auto-populate items from SO vendor breakdown if no items provided
        if (empty($validated['items']) && $salesOrder->hasVendorBreakdownForInvoice()) {
            $validated['items'] = $salesOrder->getInvoiceItemsFromVendorBreakdown();
        }

        // Validate that we have items either from input or auto-generated
        if (empty($validated['items'])) {
            return back()->withErrors([
                'items' => 'Invoice items are required. Either provide items manually or ensure the Sales Order has vendor breakdown with selling amounts.'
            ]);
        }

        // Cari customer berdasarkan customer_id jika ada, atau buat dummy customer
        $customerId = $salesOrder->customer_id;
        if (!$customerId) {
            // Jika tidak ada customer_id, cari berdasarkan customer name atau buat dummy
            $customer = Customer::where('company_name', $salesOrder->customer)
                              ->orWhere('company_name', $salesOrder->customer_name)
                              ->first();
            if (!$customer) {
                // Buat dummy customer jika tidak ditemukan
                $customerName = $salesOrder->customer ?? $salesOrder->customer_name ?? 'Unknown Customer';
                $customer = Customer::create([
                    'name' => $customerName, // Field name yang diperlukan
                    'email' => 'unknown@example.com', // Field email yang diperlukan
                    'phone' => 'N/A', // Field phone yang diperlukan
                    'company_name' => $customerName,
                    'company_address' => $salesOrder->customer_address ?? 'N/A',
                    'pic_phone' => 'N/A',
                    'pic_email' => 'unknown@example.com',
                    'handled_by' => auth()->id()
                ]);
            }
            $customerId = $customer->id;
        }

        $invoice = Invoice::create([
            'invoice_number' => $this->generateInvoiceNumberByType($salesOrder, $validated['invoice_type']),
            'invoice_type' => $validated['invoice_type'],
            'sales_order_id' => $salesOrder->id,
            'customer_id' => $customerId,
            'invoice_date' => $invoiceDate,
            'term_days' => $validated['term_days'],
            'due_date' => $dueDate,
            // Auto-populate from Sales Order if not provided
            'shipper' => $validated['shipper'] ?? $salesOrder->shipper,
            'consignee' => $validated['consignee'] ?? $salesOrder->customer,
            'awb_bl_no' => $validated['awb_bl_no'] ?? $salesOrder->bl_awb,
            'mawb_obl_no' => $validated['mawb_obl_no'],
            'gross_weight' => $validated['gross_weight'] ?? $salesOrder->net_weight,
            'volume' => $validated['volume'] ?? $salesOrder->measurement,
            'no_of_packages' => $validated['no_of_packages'] ?? $salesOrder->qty,
            'vessel' => $validated['vessel'] ?? $salesOrder->vessel,
            'flight_voy' => $validated['flight_voy'],
            'pol_pod' => $validated['pol_pod'] ?? (($salesOrder->pol && $salesOrder->pod) ? $salesOrder->pol . '/' . $salesOrder->pod : null),
            'origin' => $validated['origin'] ?? $salesOrder->pol,
            'destination' => $validated['destination'] ?? $salesOrder->pod,
            'etd' => $validated['etd'] ?? $salesOrder->etd,
            'eta' => $validated['eta'] ?? $salesOrder->eta,
            'container_no' => $validated['container_no'] ?? (is_array($salesOrder->container_no) ? implode(', ', $salesOrder->container_no) : $salesOrder->container_no),
            'container_size' => $validated['container_size'] ?? $salesOrder->shipment_type,
            'remarks' => $validated['remarks'],
            'down_payment_amount' => $validated['down_payment_amount'] ?? 0,
            'down_payment_date' => $validated['down_payment_date'],
            'down_payment_notes' => $validated['down_payment_notes'],
            'status' => 'draft'
        ]);

        // Create invoice items
        foreach ($validated['items'] as $item) {
            $amount = $item['quantity'] * $item['rate'];

            // Determine item type and visibility based on input
            $itemType = $item['item_type'] ?? 'billable';
            $includeInCustomerInvoice = $item['include_in_customer_invoice'] ?? true;
            $isHiddenFromCustomer = $item['is_hidden_from_customer'] ?? false;

            // If item is operational_cost, automatically hide from customer
            if ($itemType === 'operational_cost') {
                $includeInCustomerInvoice = false;
                $isHiddenFromCustomer = true;
            }

            InvoiceItem::create([
                'invoice_id' => $invoice->id,
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'rate' => $item['rate'],
                'currency' => $item['currency'],
                'amount' => $amount,
                'item_ref' => $item['item_ref'] ?? null,
                'item_type' => $itemType,
                'include_in_customer_invoice' => $includeInCustomerInvoice,
                'is_hidden_from_customer' => $isHiddenFromCustomer
            ]);
        }

        $invoice->calculateTotals();

        // Auto-generate Account Receivable
        \App\Models\AccountReceivable::createFromInvoice($invoice);

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Invoice berhasil dibuat.');

        } catch (\Exception $e) {
            \Log::error('Invoice Store Error', [
                'error_message' => $e->getMessage(),
                'error_line' => $e->getLine(),
                'error_file' => $e->getFile(),
                'user_id' => auth()->id(),
                'request_data' => $request->all()
            ]);

            return back()->withErrors([
                'general' => 'Terjadi kesalahan saat membuat invoice: ' . $e->getMessage()
            ])->withInput();
        }
    }

    public function show(Invoice $invoice)
    {
        $invoice->load(['salesOrder', 'customer', 'items']);


        // Get all invoices from the same Sales Order
        $relatedInvoices = collect();
        $mainInvoice = null;
        $reimbursementInvoice = null;

        if ($invoice->sales_order_id) {
            $relatedInvoices = Invoice::with(['items'])
                ->where('sales_order_id', $invoice->sales_order_id)
                ->get();

            $mainInvoice = $relatedInvoices->where('invoice_type', 'main')->first();
            $reimbursementInvoice = $relatedInvoices->where('invoice_type', 'reimbursement')->first();
        }

        // Fallback: if no related invoices found, use current invoice
        if ($relatedInvoices->isEmpty()) {
            $relatedInvoices = collect([$invoice]);

            if ($invoice->invoice_type === 'main') {
                $mainInvoice = $invoice;
            } elseif ($invoice->invoice_type === 'reimbursement') {
                $reimbursementInvoice = $invoice;
            } elseif ($invoice->invoice_type === 'combined') {
                // For combined invoice, show as both main and reimbursement
                $mainInvoice = $invoice;
                $reimbursementInvoice = $invoice;
            }
        }


        // Calculate profit breakdown for display
        $profitBreakdown = [
            'gross_revenue' => $invoice->gross_revenue,
            'operational_costs' => $invoice->operational_costs,
            'net_profit' => $invoice->net_profit,
            'customer_total' => $invoice->customer_total,
            'profit_margin' => $invoice->profit_margin,
            'billable_items_count' => $invoice->billableItems()->count(),
            'operational_costs_count' => $invoice->operationalCosts()->count()
        ];

        // Get data untuk profit loss posting
        $profitLossPeriods = \App\Models\ProfitLossPeriod::where('status', '!=', 'closed')
            ->orderBy('start_date', 'desc')
            ->get();

        $accounts = \App\Models\ChartOfAccount::where('is_active', true)
            ->whereIn('account_category', ['revenue_main', 'expense_operational'])
            ->orderBy('account_code')
            ->get()
            ->groupBy('account_category');

        return Inertia::render('Admin/AdminKeuangan/Invoices/Show', [
            'invoice' => $invoice,
            'mainInvoice' => $mainInvoice,
            'reimbursementInvoice' => $reimbursementInvoice,
            'relatedInvoices' => $relatedInvoices,
            'profitBreakdown' => $profitBreakdown,
            'profitLossPeriods' => $profitLossPeriods,
            'accounts' => $accounts
        ]);
    }

    public function edit(Invoice $invoice)
    {
        $invoice->load(['salesOrder', 'customer', 'items']);

        $salesOrders = SalesOrder::with('customer')
            ->where('status', 'approved')
            ->where(function($query) use ($invoice) {
                $query->whereDoesntHave('invoices')
                      ->orWhere('id', $invoice->sales_order_id);
            })
            ->get();

        return Inertia::render('Admin/AdminKeuangan/Invoices/Edit', [
            'invoice' => $invoice,
            'salesOrders' => $salesOrders
        ]);
    }

    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'invoice_date' => 'required|date',
            'term_days' => 'required|integer|min:1',
            'shipper' => 'nullable|string|max:255',
            'consignee' => 'nullable|string|max:255',
            'awb_bl_no' => 'nullable|string|max:255',
            'mawb_obl_no' => 'nullable|string|max:255',
            'gross_weight' => 'nullable|numeric',
            'volume' => 'nullable|string|max:255',
            'no_of_packages' => 'nullable|integer',
            'vessel' => 'nullable|string|max:255',
            'flight_voy' => 'nullable|string|max:255',
            'pol_pod' => 'nullable|string|max:255',
            'origin' => 'nullable|string|max:255',
            'destination' => 'nullable|string|max:255',
            'etd' => 'nullable|date',
            'eta' => 'nullable|date',
            'container_no' => 'nullable|string|max:255',
            'container_size' => 'nullable|string|max:255',
            'remarks' => 'nullable|string',
            'items' => 'required|array|min:1',
            'items.*.description' => 'required|string|max:255',
            'items.*.quantity' => 'required|numeric|min:0.01',
            'items.*.unit' => 'required|string|max:50',
            'items.*.rate' => 'required|numeric|min:0',
            'items.*.currency' => 'required|string|max:3',
            'items.*.item_ref' => 'nullable|string|max:100',
            'down_payment_amount' => 'nullable|numeric|min:0',
            'down_payment_date' => 'nullable|date',
            'down_payment_notes' => 'nullable|string|max:1000',
        ]);

        $invoiceDate = Carbon::parse($validated['invoice_date']);
        $dueDate = $invoiceDate->copy()->addDays($validated['term_days']);

        $invoice->update([
            'invoice_date' => $invoiceDate,
            'term_days' => $validated['term_days'],
            'due_date' => $dueDate,
            'shipper' => $validated['shipper'],
            'consignee' => $validated['consignee'],
            'awb_bl_no' => $validated['awb_bl_no'],
            'mawb_obl_no' => $validated['mawb_obl_no'],
            'gross_weight' => $validated['gross_weight'],
            'volume' => $validated['volume'],
            'no_of_packages' => $validated['no_of_packages'],
            'vessel' => $validated['vessel'],
            'flight_voy' => $validated['flight_voy'],
            'pol_pod' => $validated['pol_pod'],
            'origin' => $validated['origin'],
            'destination' => $validated['destination'],
            'etd' => $validated['etd'],
            'eta' => $validated['eta'],
            'container_no' => $validated['container_no'],
            'container_size' => $validated['container_size'],
            'remarks' => $validated['remarks'],
            'down_payment_amount' => $validated['down_payment_amount'] ?? 0,
            'down_payment_date' => $validated['down_payment_date'],
            'down_payment_notes' => $validated['down_payment_notes']
        ]);

        // Delete existing items
        $invoice->items()->delete();

        // Create new items
        foreach ($validated['items'] as $item) {
            $amount = $item['quantity'] * $item['rate'];

            InvoiceItem::create([
                'invoice_id' => $invoice->id,
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'rate' => $item['rate'],
                'currency' => $item['currency'],
                'amount' => $amount,
                'item_ref' => $item['item_ref'] ?? null
            ]);
        }

        $invoice->calculateTotals();

        // Sync Account Receivable after invoice update
        \App\Models\AccountReceivable::syncFromInvoice($invoice);

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Invoice berhasil diperbarui.');
    }

    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return redirect()->route('admin-keuangan.invoices.index')
            ->with('success', 'Invoice berhasil dihapus.');
    }

    public function generatePdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only main items (where item_ref is null or 'main')
        $mainItems = $invoice->items->whereIn('item_ref', [null, 'main']);

        // Calculate totals for main items only
        $subtotal = $mainItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only main items
        $mainInvoice = $invoice->replicate();
        $mainInvoice->setRelation('items', $mainItems);
        $mainInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $mainInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $mainInvoice->subtotal = $subtotal;
        $mainInvoice->total = $total;

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using main invoice template
        $pdf = PDF::loadView('invoices.main-pdf', ['invoice' => $mainInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // Main invoice filename - only invoice number
        $filename = $invoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    public function generateReimbursementPdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only reimbursement items
        $reimbursementItems = $invoice->items->where('item_ref', 'reimbursement');

        // Calculate totals for reimbursement items only
        $subtotal = $reimbursementItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only reimbursement items
        $reimbursementInvoice = $invoice->replicate();
        $reimbursementInvoice->setRelation('items', $reimbursementItems);
        $reimbursementInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $reimbursementInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $reimbursementInvoice->subtotal = $subtotal;
        $reimbursementInvoice->total = $total;

        // Add -R suffix to invoice number for reimbursement
        $reimbursementInvoice->invoice_number = $invoice->invoice_number . '-R';

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using new NOTA template
        $pdf = PDF::loadView('invoices.reimbursement-nota-pdf', ['invoice' => $reimbursementInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // NOTA reimbursement filename - invoice number already has -R suffix
        $filename = 'NOTA-' . $reimbursementInvoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    public function previewPdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only main items (where item_ref is null or 'main')
        $mainItems = $invoice->items->whereIn('item_ref', [null, 'main']);

        // Calculate totals for main items only
        $subtotal = $mainItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only main items
        $mainInvoice = $invoice->replicate();
        $mainInvoice->setRelation('items', $mainItems);
        $mainInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $mainInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $mainInvoice->subtotal = $subtotal;
        $mainInvoice->total = $total;

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using main invoice template (check if main-pdf exists, fallback to pdf)
        $templatePath = resource_path('views/invoices/main-pdf.blade.php');
        $template = file_exists($templatePath) ? 'invoices.main-pdf' : 'invoices.pdf';

        $pdf = PDF::loadView($template, ['invoice' => $mainInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // Return inline view instead of download
        return $pdf->stream($mainInvoice->invoice_number . '.pdf');
    }

    public function previewReimbursementPdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only reimbursement items
        $reimbursementItems = $invoice->items->where('item_ref', 'reimbursement');

        // Calculate totals for reimbursement items only
        $subtotal = $reimbursementItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only reimbursement items
        $reimbursementInvoice = $invoice->replicate();
        $reimbursementInvoice->setRelation('items', $reimbursementItems);
        $reimbursementInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $reimbursementInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $reimbursementInvoice->subtotal = $subtotal;
        $reimbursementInvoice->total = $total;

        // Add -R suffix to invoice number for reimbursement
        $reimbursementInvoice->invoice_number = $invoice->invoice_number . '-R';

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using new NOTA template
        $pdf = PDF::loadView('invoices.reimbursement-nota-pdf', ['invoice' => $reimbursementInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // Return inline view instead of download
        return $pdf->stream('NOTA-' . $reimbursementInvoice->invoice_number . '.pdf');
    }

    public function confirmPayment(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'paid_amount' => 'required|numeric|min:0',
            'paid_date' => 'required|date|before_or_equal:today',
            'payment_method' => 'nullable|string|max:255',
            'payment_notes' => 'nullable|string|max:1000'
        ]);

        $invoice->confirmPayment(
            $validated['paid_amount'],
            $validated['paid_date'],
            $validated['payment_method'],
            $validated['payment_notes']
        );

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Pembayaran berhasil dikonfirmasi.');
    }

    public function markSent(Invoice $invoice)
    {
        $invoice->update(['status' => 'sent']);

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Invoice berhasil ditandai sebagai terkirim.');
    }

    public function paymentHistory(Request $request)
    {
        $query = Invoice::with(['salesOrder', 'customer', 'confirmedBy'])
            ->where('status', 'paid');

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->where('paid_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('paid_date', '<=', $request->date_to);
        }

        // Search
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhereHas('customer', function($customerQuery) use ($search) {
                      $customerQuery->where('company_name', 'like', "%{$search}%")
                                  ;
                  });
            });
        }

        $payments = $query->orderBy('payment_confirmed_at', 'desc')->paginate(15);

        return Inertia::render('Admin/AdminKeuangan/Invoices/PaymentHistory', [
            'payments' => $payments,
            'filters' => $request->only(['search', 'date_from', 'date_to'])
        ]);
    }

    public function overdueReport()
    {
        $overdueInvoices = Invoice::with(['salesOrder', 'customer'])
            ->overdue()
            ->orderBy('due_date', 'asc')
            ->paginate(20);

        $totalOverdue = Invoice::overdue()->sum('total');
        $averageDaysOverdue = Invoice::overdue()->get()->avg(function($invoice) {
            return now()->diffInDays($invoice->due_date);
        });

        return Inertia::render('Admin/AdminKeuangan/Invoices/OverdueReport', [
            'overdueInvoices' => $overdueInvoices,
            'totalOverdue' => $totalOverdue,
            'averageDaysOverdue' => round($averageDaysOverdue, 1)
        ]);
    }

    /**
     * Preview invoice in browser (HTML format like PDF)
     */
    public function preview(Invoice $invoice)
    {
        $invoice->load(['customer', 'salesOrder', 'items']);

        return view('invoices.preview', [
            'invoice' => $invoice
        ]);
    }

    public function printView(Invoice $invoice)
    {
        $invoice->load(['customer', 'salesOrder', 'items']);

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        return view('invoices.print', [
            'invoice' => $invoice,
            'generatedAt' => $generatedAt
        ]);
    }

    private function generateInvoiceNumberByType(SalesOrder $salesOrder, string $type): string
    {
        $baseInvoiceNumber = Invoice::generateInvoiceNumberFromSO($salesOrder);

        // Add suffix based on type
        if ($type === 'reimbursement') {
            $baseInvoiceNumber .= '-R';
        }

        // Check for duplicates and add counter if needed
        $counter = 1;
        $invoiceNumber = $baseInvoiceNumber;

        while (Invoice::where('invoice_number', $invoiceNumber)->exists()) {
            if ($type === 'reimbursement') {
                $invoiceNumber = $baseInvoiceNumber . str_pad($counter, 2, '0', STR_PAD_LEFT);
            } else {
                $invoiceNumber = $baseInvoiceNumber . '-' . str_pad($counter, 2, '0', STR_PAD_LEFT);
            }
            $counter++;
        }

        return $invoiceNumber;
    }

    public function postToProfitLoss(Request $request, Invoice $invoice)
    {
        try {
            $validated = $request->validate([
                'period_id' => 'required|exists:profit_loss_periods,id',
            ]);

            $result = $invoice->postToProfitLoss($validated['period_id']);

            return response()->json([
                'success' => true,
                'message' => $result['message'],
                'data' => $result
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function unpostFromProfitLoss(Invoice $invoice)
    {
        try {
            $invoice->unpostFromProfitLoss();

            return response()->json([
                'success' => true,
                'message' => 'Invoice berhasil di-unpost dari laba rugi.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 422);
        }
    }

    public function getProfitLossPeriods()
    {
        $periods = \App\Models\ProfitLossPeriod::where('status', '!=', 'closed')
            ->orderBy('start_date', 'desc')
            ->get();

        return response()->json($periods);
    }

    public function getAvailableAccounts()
    {
        $accounts = \App\Models\ChartOfAccount::where('is_active', true)
            ->whereIn('account_category', ['revenue_main', 'expense_operational'])
            ->orderBy('account_code')
            ->get()
            ->groupBy('account_category');

        return response()->json($accounts);
    }

    /**
     * Generate reimbursement PDF using new NOTA template
     */
    public function generateReimbursementNotaPdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only reimbursement items
        $reimbursementItems = $invoice->items->where('item_ref', 'reimbursement');

        // Calculate totals for reimbursement items only
        $subtotal = $reimbursementItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only reimbursement items
        $reimbursementInvoice = $invoice->replicate();
        $reimbursementInvoice->setRelation('items', $reimbursementItems);
        $reimbursementInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $reimbursementInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $reimbursementInvoice->subtotal = $subtotal;
        $reimbursementInvoice->total = $total;

        // Add -R suffix to invoice number for reimbursement
        $reimbursementInvoice->invoice_number = $invoice->invoice_number . '-R';

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using new NOTA template
        $pdf = PDF::loadView('invoices.reimbursement-nota-pdf', ['invoice' => $reimbursementInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // NOTA filename - invoice number already has -R suffix
        $filename = 'NOTA-' . $reimbursementInvoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Preview reimbursement PDF using new NOTA template
     */
    public function previewReimbursementNotaPdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only reimbursement items
        $reimbursementItems = $invoice->items->where('item_ref', 'reimbursement');

        // Calculate totals for reimbursement items only
        $subtotal = $reimbursementItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only reimbursement items
        $reimbursementInvoice = $invoice->replicate();
        $reimbursementInvoice->setRelation('items', $reimbursementItems);
        $reimbursementInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $reimbursementInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $reimbursementInvoice->subtotal = $subtotal;
        $reimbursementInvoice->total = $total;

        // Add -R suffix to invoice number for reimbursement
        $reimbursementInvoice->invoice_number = $invoice->invoice_number . '-R';

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using new NOTA template
        $pdf = PDF::loadView('invoices.reimbursement-nota-pdf', ['invoice' => $reimbursementInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // Return inline view instead of download
        return $pdf->stream('NOTA-' . $reimbursementInvoice->invoice_number . '.pdf');
    }

    /**
     * Generate reimbursement PDF using old DEBIT NOTE template (backup)
     */
    public function generateReimbursementDebitNotePdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only reimbursement items
        $reimbursementItems = $invoice->items->where('item_ref', 'reimbursement');

        // Calculate totals for reimbursement items only
        $subtotal = $reimbursementItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only reimbursement items
        $reimbursementInvoice = $invoice->replicate();
        $reimbursementInvoice->setRelation('items', $reimbursementItems);
        $reimbursementInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $reimbursementInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $reimbursementInvoice->subtotal = $subtotal;
        $reimbursementInvoice->total = $total;

        // Add -R suffix to invoice number for reimbursement
        $reimbursementInvoice->invoice_number = $invoice->invoice_number . '-R';

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using old DEBIT NOTE template
        $pdf = PDF::loadView('invoices.pdf', ['invoice' => $reimbursementInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // DEBIT NOTE filename - invoice number already has -R suffix
        $filename = 'DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Preview reimbursement PDF using old DEBIT NOTE template (backup)
     */
    public function previewReimbursementDebitNotePdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only reimbursement items
        $reimbursementItems = $invoice->items->where('item_ref', 'reimbursement');

        // Calculate totals for reimbursement items only
        $subtotal = $reimbursementItems->sum('amount');
        $total = $subtotal; // Assuming no additional charges

        // Create a copy of invoice with only reimbursement items
        $reimbursementInvoice = $invoice->replicate();
        $reimbursementInvoice->setRelation('items', $reimbursementItems);
        $reimbursementInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $reimbursementInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $reimbursementInvoice->subtotal = $subtotal;
        $reimbursementInvoice->total = $total;

        // Add -R suffix to invoice number for reimbursement
        $reimbursementInvoice->invoice_number = $invoice->invoice_number . '-R';

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using old DEBIT NOTE template
        $pdf = PDF::loadView('invoices.pdf', ['invoice' => $reimbursementInvoice, 'generatedAt' => $generatedAt]);
        $pdf->setPaper('A4', 'portrait');

        // Return inline view instead of download
        return $pdf->stream('DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf');
    }
}
