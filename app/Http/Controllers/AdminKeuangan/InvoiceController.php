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
        $query = Invoice::with(['salesOrder', 'customer', 'confirmedBy']);

        // Filter by status
        if ($request->filled('status')) {
            if ($request->status === 'overdue') {
                $query->overdue();
            } else {
                $query->where('status', $request->status);
            }
        }

        // Filter by invoice type
        if ($request->filled('invoice_type')) {
            $query->where('invoice_type', $request->invoice_type);
        }

        // Filter by date range
        if ($request->filled('date_from')) {
            $query->where('invoice_date', '>=', $request->date_from);
        }

        if ($request->filled('date_to')) {
            $query->where('invoice_date', '<=', $request->date_to);
        }

        // Search by invoice number or customer
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('invoice_number', 'like', "%{$search}%")
                  ->orWhereHas('customer', function($customerQuery) use ($search) {
                      $customerQuery->where('company_name', 'like', "%{$search}%")
                                  ;
                  })
                  ->orWhereHas('salesOrder', function($orderQuery) use ($search) {
                      $orderQuery->where('order_number', 'like', "%{$search}%")
                               ->orWhere('customer', 'like', "%{$search}%");
                  });
            });
        }

        $invoices = $query->orderBy('created_at', 'desc')->paginate(10);

        // Tambahkan statistik untuk dashboard
        $stats = [
            'total_invoices' => Invoice::count(),
            'paid_invoices' => Invoice::where('status', 'paid')->count(),
            'overdue_invoices' => Invoice::overdue()->count(),
            'pending_invoices' => Invoice::pendingPayment()->count(),
            'total_amount' => Invoice::sum('total'),
            'paid_amount' => Invoice::where('status', 'paid')->sum('paid_amount'),
            'outstanding_amount' => Invoice::where('status', '!=', 'paid')->sum('total')
        ];

        return Inertia::render('Admin/AdminKeuangan/Invoices/Index', [
            'invoices' => $invoices,
            'filters' => $request->only(['status', 'invoice_type', 'search', 'date_from', 'date_to']),
            'stats' => $stats
        ]);
    }

    public function create(Request $request)
    {
        // Check if coming from Sales Order detail page
        if ($request->has('sales_order_id') && $request->has('invoice_type')) {
            $salesOrder = SalesOrder::findOrFail($request->sales_order_id);

            // Verify SO is eligible for invoice creation
            if (!in_array($salesOrder->status, ['released', 'approved']) || !$salesOrder->released_at) {
                return redirect()->route('admin-keuangan.invoices.index')
                    ->withErrors(['error' => 'Sales Order belum eligible untuk dibuat invoice.']);
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

        // Get SOs that can have invoices created - like the original logic
        $salesOrders = SalesOrder::whereIn('status', ['released', 'approved'])
            ->whereNotNull('released_at')
            ->whereDoesntHave('invoices')  // Only show SOs with NO invoices at all
            ->orderBy('released_at', 'desc')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/Invoices/Create', [
            'salesOrders' => $salesOrders
        ]);
    }

    public function store(Request $request)
    {
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
            'items.*.type' => 'nullable|string|in:main,reimbursement',
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
                $customer = Customer::create([
                    'company_name' => $salesOrder->customer ?? $salesOrder->customer_name ?? 'Unknown Customer',
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
            'remarks' => $validated['remarks'] ?? $salesOrder->remarks,
            'status' => 'draft'
        ]);

        // Create invoice items
        foreach ($validated['items'] as $item) {
            $amount = $item['quantity'] * $item['rate'];
            
            InvoiceItem::create([
                'invoice_id' => $invoice->id,
                'description' => $item['description'],
                'quantity' => $item['quantity'],
                'unit' => $item['unit'],
                'rate' => $item['rate'],
                'currency' => $item['currency'],
                'amount' => $amount
            ]);
        }

        $invoice->calculateTotals();

        // Auto-generate Account Receivable
        \App\Models\AccountReceivable::createFromInvoice($invoice);

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Invoice berhasil dibuat.');
    }

    public function show(Invoice $invoice)
    {
        $invoice->load(['salesOrder', 'customer', 'items']);

        return Inertia::render('Admin/AdminKeuangan/Invoices/Show', [
            'invoice' => $invoice
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
            'remarks' => $validated['remarks']
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
                'amount' => $amount
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
        
        // Generate PDF using Blade template
        $pdf = PDF::loadView('invoices.pdf', compact('invoice'));
        $pdf->setPaper('A4', 'portrait');
        
        $status = $invoice->status === 'draft' ? 'DRAFT' : strtoupper($invoice->status);
        $filename = $invoice->invoice_number . '_' . $status . '.pdf';
        
        return $pdf->download($filename);
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

        return view('invoices.print', [
            'invoice' => $invoice
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
}