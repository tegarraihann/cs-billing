<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\ReimbursementItem;
use App\Models\ChartOfAccount;
use App\Models\FinancialPositionAdjustment;
use App\Models\OperationalCostCategory;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Services\ExpenseCategorizationService;
use App\Services\InvoiceCostSyncService;
use App\Services\InvoicePostingService;
use Illuminate\Support\Collection;
use Illuminate\Validation\Rule;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        try {
            // Basic query first - include items for profit margin calculations
            $invoices = Invoice::with(['salesOrder', 'customer', 'confirmedBy', 'items'])
                              ->orderBy('created_at', 'desc')
                              ->paginate(10);

            // Processing for each invoice to determine available types
            foreach ($invoices as $invoice) {
                if ($invoice->invoice_type === 'combined') {
                    $invoice->invoice_types = ['main', 'reimbursement'];
                } else {
                    $invoice->invoice_types = [$invoice->invoice_type ?? 'main'];
                }

                // Get all invoices for the same sales order to show related invoice types
                if ($invoice->sales_order_id) {
                    $relatedInvoices = Invoice::where('sales_order_id', $invoice->sales_order_id)
                                            ->pluck('invoice_type')
                                            ->unique()
                                            ->values()
                                            ->toArray();
                    $invoice->related_invoice_types = $relatedInvoices;
                } else {
                    $invoice->related_invoice_types = [$invoice->invoice_type ?? 'main'];
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
            $salesOrder = SalesOrder::with(['creator', 'releasedBy', 'approvedBy', 'reimbursementItems'])
                ->findOrFail($request->sales_order_id);

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
                'preselectedInvoiceType' => $request->invoice_type,
                'preselectedVendorBreakdown' => $salesOrder->vendor_breakdown,
                'preselectedOtherCosts' => $salesOrder->other_costs ?? [], // Send other_costs with vendor_id
                'preselectedReimbursementItems' => $salesOrder->reimbursementItems ?? [], // Send reimbursement items with vendor_id
                'operationalCostCategories' => OperationalCostCategory::active()->orderBy('name')->get(),
                'vendors' => \App\Models\Vendor::orderBy('nama_vendor')->get(['id', 'nama_vendor', 'nomor_rekening'])
            ]);
        }

        // Get only approved SOs (already released and approved by finance)
        $allSalesOrders = SalesOrder::with(['invoices', 'creator', 'releasedBy', 'approvedBy', 'reimbursementItems'])
            ->select(['id', 'order_number', 'customer', 'customer_name', 'status', 'vendor_breakdown', 'other_costs', 'approved_at', 'released_at', 'shipper', 'vessel', 'bl_awb', 'awb_bl_number', 'pol', 'pod', 'pol_pod', 'eta', 'etd', 'net_weight', 'gross_weight', 'measurement', 'qty', 'package_unit', 'shipment_type', 'container_no', 'party_lcl'])
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
            'salesOrders' => $salesOrders,
            'operationalCostCategories' => OperationalCostCategory::active()->orderBy('name')->get(),
            'packageUnits' => \App\Models\MasterPackageUnit::getActiveUnits(),
            'vendors' => \App\Models\Vendor::orderBy('nama_vendor')->get(['id', 'nama_vendor', 'nomor_rekening'])
        ]);
    }

    public function store(Request $request)
    {
        \Log::info('Invoice Store Request Started', [
            'request_data' => $request->all(),
            'user_id' => auth()->id()
        ]);
        try {
            // Normalize Indonesian number format before validation
            $downPaymentAmount = $request->input('down_payment_amount');
            if ($downPaymentAmount) {
                $downPaymentAmount = $this->normalizeIndonesianNumber($downPaymentAmount);
                $request->merge(['down_payment_amount' => $downPaymentAmount]);
            }

            // Normalize items rate and quantity (if needed)
            $items = $request->input('items', []);
            foreach ($items as $index => $item) {
                if (isset($item['rate'])) {
                    $items[$index]['rate'] = $this->normalizeIndonesianNumber($item['rate']);
                }
                if (isset($item['quantity'])) {
                    $items[$index]['quantity'] = $this->normalizeIndonesianNumber($item['quantity']);
                }

                // Clean up empty string values to null for optional fields
                $optionalFields = ['vendor_id', 'category_id', 'category_name', 'category', 'category_source', 'item_ref'];
                foreach ($optionalFields as $field) {
                    if (isset($item[$field]) && $item[$field] === '') {
                        $items[$index][$field] = null;
                    }
                }
            }
            $request->merge(['items' => $items]);

            \Log::info('Invoice Store Request - AFTER CLEANUP', [
                'cleaned_items' => $items,
                'items_count' => count($items),
                'user_id' => auth()->id()
            ]);

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
            'net_weight' => 'nullable|numeric',
            'volume' => 'nullable|string|max:255',
            'no_of_packages' => 'nullable|integer',
            'package_unit' => 'nullable|exists:master_package_units,code',
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
            'items.*.item_type' => 'nullable|string|in:billable,operational_cost,reimbursement',
            'items.*.include_in_customer_invoice' => 'nullable|boolean',
            'items.*.is_hidden_from_customer' => 'nullable|boolean',
            // Operational cost specific fields
            'items.*.category_id' => 'nullable|string',
            'items.*.category_name' => 'nullable|string|max:255',
            'items.*.category' => 'nullable|string|max:255',
            'items.*.category_source' => 'nullable|string|max:255',
            'items.*.vendor_id' => 'nullable|exists:vendors,id',
            'items.*.auto_generated' => 'nullable|boolean',
            'items.*.source' => 'nullable|string|max:100',
            // Down payment fields
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

        // Validate that we have items (including operational costs)
        if (!isset($validated['items']) || !is_array($validated['items']) || count($validated['items']) === 0) {
            \Log::warning('Invoice Store Failed: No items provided', [
                'validated_items' => $validated['items'] ?? null,
                'request_items' => $request->input('items'),
                'user_id' => auth()->id()
            ]);

            return back()->withErrors([
                'items' => 'Invoice harus memiliki minimal satu item. Silakan tambahkan Main Item, Reimbursement, atau Biaya Operasional.'
            ])->withInput();
        }

        \Log::info('Invoice Store: Items validation passed', [
            'items_count' => count($validated['items']),
            'items_types' => array_count_values(array_column($validated['items'], 'item_type')),
            'user_id' => auth()->id()
        ]);

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
            'gross_weight' => $validated['gross_weight'] ?? $salesOrder->gross_weight ?? $salesOrder->net_weight,
            'net_weight' => $validated['net_weight'] ?? $salesOrder->net_weight,
            'volume' => $validated['volume'] ?? $salesOrder->measurement,
            'no_of_packages' => $validated['no_of_packages'] ?? $salesOrder->qty,
            'package_unit' => $validated['package_unit'] ?? $salesOrder->package_unit ?? 'BAG',
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

        $linkedReimbursementItemIds = [];

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

            $invoiceItemData = [
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
            ];

            // Persist vendor information when provided
            if (isset($item['vendor_id']) && $item['vendor_id'] !== null && $item['vendor_id'] !== '') {
                $invoiceItemData['vendor_id'] = (int) $item['vendor_id'];
            }

            InvoiceItem::create($invoiceItemData);

            if ($itemType === 'reimbursement') {
                $itemRef = strtolower(trim($item['item_ref'] ?? ''));
                if ($itemRef && preg_match('/reimb(?:ursement)?[_-]?(\d+)/', $itemRef, $matches)) {
                    $linkedReimbursementItemIds[] = (int) $matches[1];
                }
            }
        }

        if (!empty($linkedReimbursementItemIds)) {
            $reimbursementItemsToLink = ReimbursementItem::whereIn('id', array_unique($linkedReimbursementItemIds))
                ->where(function ($query) use ($salesOrder) {
                    $query->whereNull('sales_order_id')
                          ->orWhere('sales_order_id', $salesOrder->id);
                })
                ->get();

            foreach ($reimbursementItemsToLink as $reimbursementItem) {
                $reimbursementItem->markAsInvoiced($invoice->id);
            }
        }

        // Auto-generate buying cost items from vendor_breakdown (COGS)
        // This is done in backend to keep form clean for finance users
        $this->autoGenerateBuyingCosts($invoice, $salesOrder);

        $invoice->calculateTotals();

        // Auto-generate operational debt to divisional operational
        $this->autoGenerateOperationalDebt($invoice);

        // Auto-generate Account Receivable
        \App\Models\AccountReceivable::createFromInvoice($invoice);

        $this->autoPostInvoice($invoice);

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Invoice berhasil dibuat.');

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Invoice Store Validation Error', [
                'validation_errors' => $e->errors(),
                'user_id' => auth()->id(),
                'request_items' => $request->input('items')
            ]);

            // Re-throw validation exception to show proper validation errors
            throw $e;

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

    public function show(Invoice $invoice, InvoiceCostSyncService $invoiceCostSyncService)
    {
        $invoiceCostSyncService->syncInvoiceWithAccountPayables($invoice);

        $invoice->load(['salesOrder', 'customer', 'items', 'reimbursementRecords']);

        if ($invoice->salesOrder) {
            $this->syncVendorItemsFromSalesOrder($invoice, $invoice->salesOrder);
        }


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

        $targetReimbursementInvoice = $reimbursementInvoice;
        if (!$targetReimbursementInvoice && $invoice->invoice_type === 'reimbursement') {
            $targetReimbursementInvoice = $invoice;
        } elseif ($targetReimbursementInvoice && $targetReimbursementInvoice->id === $invoice->id) {
            $targetReimbursementInvoice = $invoice;
        }

        $this->syncReimbursementRecordsFromInvoice($targetReimbursementInvoice ?? $invoice);
        $invoice->load('reimbursementRecords');

        $reimbursementEntries = $this->prepareReimbursementEntries($targetReimbursementInvoice ?? $invoice)
            ->map(function (array $entry) {
                return array_merge($entry, [
                    'paid_at' => $entry['paid_at'] ?? ($entry['paid_at_date'] ?? null),
                ]);
            })
            ->values()
            ->toArray();

        return Inertia::render('Admin/AdminKeuangan/Invoices/Show', [
            'invoice' => $invoice,
            'mainInvoice' => $mainInvoice,
            'reimbursementInvoice' => $reimbursementInvoice,
            'relatedInvoices' => $relatedInvoices,
            'profitBreakdown' => $profitBreakdown,
            'profitLossPeriods' => $profitLossPeriods,
            'accounts' => $accounts,
            'reimbursementEntries' => $reimbursementEntries,
        ]);
    }

    public function updateReimbursementPayment(Request $request, Invoice $invoice, ReimbursementItem $reimbursementItem)
    {
        if ($reimbursementItem->invoice_id !== $invoice->id) {
            abort(404);
        }

        $validated = $request->validate([
            'status' => ['required', Rule::in(['pending', 'linked', 'invoiced', 'paid'])],
            'vendor_name' => ['nullable', 'string', 'max:255'],
            'paid_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
        ]);

        $options = [
            'notes' => $validated['notes'] ?? null,
        ];

        if ($validated['status'] === 'paid') {
            $options['vendor_name'] = $validated['vendor_name'] ?: 'Eshaka Wijaya Logistics';
            $options['paid_at'] = $validated['paid_at'] ?: now()->toDateString();
        }

        $reimbursementItem->updatePaymentStatus($validated['status'], $options);

        return redirect()
            ->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Status pembayaran reimbursement berhasil diperbarui.');
    }

    public function edit(Invoice $invoice)
    {
        $invoice->load(['salesOrder.reimbursementItems', 'customer', 'items']);

        // Prefill vendor_id on reimbursement items from linked reimbursement records when missing
        $reimbursementMap = optional($invoice->salesOrder)->reimbursementItems
            ? $invoice->salesOrder->reimbursementItems->keyBy('id')
            : collect();

        if ($reimbursementMap->isNotEmpty()) {
            $invoice->items = $invoice->items->map(function (InvoiceItem $item) use ($reimbursementMap) {
                if (!$item->vendor_id && $item->item_type === 'reimbursement' && $item->item_ref) {
                    if (preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $item->item_ref, $matches)) {
                        $reimbId = (int) $matches[1];
                        $reimb = $reimbursementMap->get($reimbId);
                        if ($reimb && $reimb->vendor_id) {
                            $item->vendor_id = (int) $reimb->vendor_id;
                        }
                    }
                }
                return $item;
            });
        }

        $salesOrders = SalesOrder::with('customer')
            ->where('status', 'approved')
            ->where(function($query) use ($invoice) {
                $query->whereDoesntHave('invoices')
                      ->orWhere('id', $invoice->sales_order_id);
            })
            ->get();

        $vendors = Vendor::select('id', 'nama_vendor', 'nomor_rekening', 'nama_rekening')
            ->orderBy('nama_vendor')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/Invoices/Edit', [
            'invoice' => $invoice,
            'salesOrders' => $salesOrders,
            'packageUnits' => \App\Models\MasterPackageUnit::getActiveUnits(),
            'vendors' => $vendors,
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
            'net_weight' => 'nullable|numeric',
            'volume' => 'nullable|string|max:255',
            'no_of_packages' => 'nullable|integer',
            'package_unit' => 'nullable|exists:master_package_units,code',
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
              'items.*.vendor_id' => 'nullable|exists:vendors,id',
            'items.*.item_ref' => 'nullable|string|max:100',
            'down_payment_amount' => 'nullable|numeric|min:0',
            'down_payment_date' => 'nullable|date',
            'down_payment_notes' => 'nullable|string|max:1000',
        ]);

        $optionalFields = [
            'shipper',
            'consignee',
            'awb_bl_no',
            'mawb_obl_no',
            'gross_weight',
            'net_weight',
            'volume',
            'no_of_packages',
            'package_unit',
            'vessel',
            'flight_voy',
            'pol_pod',
            'origin',
            'destination',
            'etd',
            'eta',
            'container_no',
            'container_size',
            'remarks',
            'down_payment_amount',
            'down_payment_date',
            'down_payment_notes',
        ];

        foreach ($optionalFields as $field) {
            if (!array_key_exists($field, $validated)) {
                $validated[$field] = null;
            }
        }

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
            'net_weight' => $validated['net_weight'],
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

        $existingReimbursementIds = $invoice->reimbursementRecords()->pluck('id')->all();
        $linkedReimbursementItemIds = [];

        // Delete existing items
        $invoice->items()->delete();

        // Create new items
        foreach ($validated['items'] as $item) {
            $amount = $item['quantity'] * $item['rate'];
            $itemType = $item['item_type'] ?? 'billable';
            $includeInCustomerInvoice = $item['include_in_customer_invoice'] ?? true;
            $isHiddenFromCustomer = $item['is_hidden_from_customer'] ?? false;

            if ($itemType === 'operational_cost') {
                $includeInCustomerInvoice = false;
                $isHiddenFromCustomer = true;
            }

            $invoiceItemData = [
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
                'is_hidden_from_customer' => $isHiddenFromCustomer,
            ];

            if (isset($item['vendor_id']) && $item['vendor_id'] !== null && $item['vendor_id'] !== '') {
                $invoiceItemData['vendor_id'] = (int) $item['vendor_id'];
            }

            InvoiceItem::create($invoiceItemData);

            if ($itemType === 'reimbursement') {
                $itemRef = strtolower(trim($item['item_ref'] ?? ''));
                if ($itemRef && preg_match('/reimb(?:ursement)?[_-]?(\d+)/', $itemRef, $matches)) {
                    $linkedReimbursementItemIds[] = (int) $matches[1];
                }
            }
        }

        $linkedReimbursementItemIds = array_unique($linkedReimbursementItemIds);

        if (!empty($linkedReimbursementItemIds)) {
            $reimbursementItemsToLink = ReimbursementItem::whereIn('id', $linkedReimbursementItemIds)
                ->where(function ($query) use ($invoice) {
                    $query->whereNull('sales_order_id')
                          ->orWhere('sales_order_id', $invoice->sales_order_id);
                })
                ->get();

            foreach ($reimbursementItemsToLink as $reimbursementItem) {
                $reimbursementItem->markAsInvoiced($invoice->id);
            }
        }

        $reimbursementIdsToUnlink = array_diff($existingReimbursementIds, $linkedReimbursementItemIds);
        if (!empty($reimbursementIdsToUnlink)) {
            ReimbursementItem::whereIn('id', $reimbursementIdsToUnlink)->get()->each(function (ReimbursementItem $item) {
                $item->updatePaymentStatus('linked');
                $item->update([
                    'invoice_id' => null,
                    'invoiced_at' => null,
                ]);
            });
        }

        // Re-sync operational buying costs (COGS) and payable components after manual edits
        $invoice->load('salesOrder');
        if ($invoice->salesOrder) {
            $this->autoGenerateBuyingCosts($invoice, $invoice->salesOrder);
        }

        $this->autoGenerateOperationalDebt($invoice);

        $invoice->calculateTotals();

        // Sync Account Receivable after invoice update
        \App\Models\AccountReceivable::syncFromInvoice($invoice->refresh());

        $this->autoPostInvoice($invoice);

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Invoice berhasil diperbarui.');
    }

    public function destroy(Invoice $invoice)
    {
        try {
            \DB::transaction(function () use ($invoice) {
                $invoice->delete();
            });

            return redirect()->route('admin-keuangan.invoices.index')
                ->with('success', 'Invoice berhasil dihapus.');
        } catch (\Throwable $e) {
            \Log::error('Gagal menghapus invoice', [
                'invoice_id' => $invoice->id,
                'error' => $e->getMessage(),
            ]);

            return redirect()->back()
                ->withErrors(['error' => 'Gagal menghapus invoice. Silakan coba lagi.']);
        }
    }

    /**
     * Fix existing invoice by adding missing operational cost items from Sales Order
     */
    public function fixOperationalCosts(Invoice $invoice)
    {
        if (!$invoice->salesOrder) {
            return back()->withErrors(['error' => 'Sales Order tidak ditemukan.']);
        }

        $hasOperationalSources = is_array($invoice->salesOrder->other_costs) && count($invoice->salesOrder->other_costs) > 0;
        $hasReimbursementItems = $invoice->salesOrder->reimbursementItems()->where('status', 'pending')->exists();

        if (!$hasOperationalSources && !$hasReimbursementItems) {
            return back()->withErrors(['error' => 'Tidak ada data operational cost atau reimbursement yang bisa ditambahkan.']);
        }

        // Check if operational costs already exist
        $existingOperationalCosts = $invoice->items()->where('item_type', 'operational_cost')->count();
        if ($existingOperationalCosts > 0) {
            return back()->withErrors(['error' => 'Operational cost sudah ada untuk invoice ini.']);
        }

        try {
            \DB::beginTransaction();

            // Auto-generate operational cost items only from other costs
            if ($invoice->salesOrder->other_costs && is_array($invoice->salesOrder->other_costs)) {
                foreach ($invoice->salesOrder->other_costs as $index => $otherCost) {
                    if (isset($otherCost['amount']) && $otherCost['amount'] > 0) {
                        InvoiceItem::create([
                            'invoice_id' => $invoice->id,
                            'description' => 'Other Cost - ' . ($otherCost['description'] ?? 'Additional Cost'),
                            'quantity' => 1,
                            'unit' => 'SET',
                            'rate' => $otherCost['amount'],
                            'currency' => 'IDR',
                            'amount' => $otherCost['amount'],
                            'item_ref' => 'other_cost_' . $index,
                            'item_type' => 'operational_cost',
                            'include_in_customer_invoice' => false,
                            'is_hidden_from_customer' => true
                        ]);
                    }
                }
            }

            // Auto-transfer reimbursement items to invoice as reimbursement items
            $reimbursementItems = $invoice->salesOrder->reimbursementItems()->where('status', 'pending')->get();
            foreach ($reimbursementItems as $reimbursementItem) {
                $invoiceItem = InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => 'Reimbursement - ' . $reimbursementItem->description,
                    'quantity' => 1,
                    'unit' => 'SET',
                    'rate' => $reimbursementItem->amount,
                    'currency' => 'IDR',
                    'amount' => $reimbursementItem->amount,
                    'item_ref' => 'reimbursement_' . $reimbursementItem->id,
                    'item_type' => 'reimbursement',
                    'vendor_id' => vendor_id,
                    'include_in_customer_invoice' => true,
                    'is_hidden_from_customer' => false
                ]);

                // Mark reimbursement item as invoiced
                $reimbursementItem->markAsInvoiced($invoice->id);
            }

            // Recalculate totals
            $invoice->calculateTotals();

            \DB::commit();

            return back()->with('success', 'Operational cost berhasil ditambahkan dari Sales Order.');

        } catch (\Exception $e) {
            \DB::rollback();

            \Log::error('Fix Operational Cost Error', [
                'invoice_id' => $invoice->id,
                'error' => $e->getMessage()
            ]);

            return back()->withErrors(['error' => 'Gagal menambahkan operational cost: ' . $e->getMessage()]);
        }
    }

    public function generatePdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter customer-visible items (exclude operational costs and hidden items)
        $customerVisibleItems = $invoice->items->filter(function($item) {
            // Show only items that are:
            // 1. Not operational costs
            // 2. Included in customer invoice
            // 3. Not hidden from customer
            // 4. For main invoice: exclude only reimbursement items (item_ref containing 'reimbur', 'r', or '2')
            $itemRef = strtolower(trim($item->item_ref ?? ''));
            $isReimbursementItem = in_array($itemRef, ['reimbursement', 'reimbur', 'r', '2']) ||
                                  strpos($itemRef, 'reimbur') !== false ||
                                  strpos($itemRef, 'reimb_') !== false;

            return ($item->item_type ?? 'billable') !== 'operational_cost' &&
                   ($item->include_in_customer_invoice ?? true) &&
                   !($item->is_hidden_from_customer ?? false) &&
                   !$isReimbursementItem; // Exclude reimbursement items from main invoice
        });

        // Calculate totals for customer-visible items only
        $subtotal = $customerVisibleItems->sum('amount');
        $total = $subtotal - ($invoice->down_payment_amount ?? 0);

        // Create a copy of invoice with only customer-visible items
        $mainInvoice = $invoice->replicate();
        $mainInvoice->setRelation('items', $customerVisibleItems);
        $mainInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $mainInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $mainInvoice->subtotal = $subtotal;
        $mainInvoice->total = $total;

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using main invoice template
        $pdf = PDF::loadView('invoices.main-pdf', [
            'invoice' => $mainInvoice,
            'generatedAt' => $generatedAt,
            'calculatedSubtotal' => $subtotal,
            'calculatedTotal' => $total
        ])->setPaper('A4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);

        // Main invoice filename - only invoice number
        $filename = $invoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    public function generateReimbursementPdf(Invoice $invoice)
    {
        $payload = $this->prepareReimbursementInvoicePayload($invoice);

        $reimbursementInvoice = $payload['invoice'];
        $reimbursementEntries = $payload['entries'];

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using old DEBIT NOTE template
        $pdf = PDF::loadView('invoices.pdf', [
            'invoice' => $reimbursementInvoice,
            'generatedAt' => $generatedAt,
            'reimbursementEntries' => $reimbursementEntries
        ])->setPaper('A4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);

        // DEBIT NOTE reimbursement filename - invoice number already has -R suffix
        $filename = 'DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    public function previewPdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter customer-visible items (exclude operational costs and hidden items)
        $customerVisibleItems = $invoice->items->filter(function($item) {
            // Show only items that are:
            // 1. Not operational costs
            // 2. Included in customer invoice
            // 3. Not hidden from customer
            // 4. For main invoice: exclude only reimbursement items (item_ref containing 'reimbur', 'r', or '2')
            $itemRef = strtolower(trim($item->item_ref ?? ''));
            $isReimbursementItem = in_array($itemRef, ['reimbursement', 'reimbur', 'r', '2']) ||
                                  strpos($itemRef, 'reimbur') !== false ||
                                  strpos($itemRef, 'reimb_') !== false;

            return ($item->item_type ?? 'billable') !== 'operational_cost' &&
                   ($item->include_in_customer_invoice ?? true) &&
                   !($item->is_hidden_from_customer ?? false) &&
                   !$isReimbursementItem; // Exclude reimbursement items from main invoice
        });

        // Calculate totals for customer-visible items only
        $subtotal = $customerVisibleItems->sum('amount');
        $total = $subtotal - ($invoice->down_payment_amount ?? 0);

        // Create a copy of invoice with only customer-visible items
        $mainInvoice = $invoice->replicate();
        $mainInvoice->setRelation('items', $customerVisibleItems);
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

        $pdf = PDF::loadView($template, [
            'invoice' => $mainInvoice,
            'generatedAt' => $generatedAt,
            'calculatedSubtotal' => $subtotal,
            'calculatedTotal' => $total
        ])->setPaper('A4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);

        // Return inline view instead of download
        return $pdf->stream($mainInvoice->invoice_number . '.pdf');
    }

    public function previewReimbursementPdf(Invoice $invoice)
    {
        // Load relationships
        $invoice->load(['salesOrder', 'customer', 'items']);

        // Filter only reimbursement items
        $reimbursementItems = $invoice->items->filter(function($item) {
            $itemRef = strtolower(trim($item->item_ref ?? ''));
            return in_array($itemRef, ['reimbursement', 'reimbur', 'r', '2']) ||
                   strpos($itemRef, 'reimbur') !== false ||
                   strpos($itemRef, 'reimb_') !== false;
        });

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
        $pdf->setPaper('A4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);

        // Return inline view instead of download
        return $pdf->stream('DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf');
    }

    public function confirmPayment(Request $request, Invoice $invoice)
    {
        // Normalize Indonesian number format before validation
        $paidAmount = $request->input('paid_amount');
        if ($paidAmount) {
            $paidAmount = $this->normalizeIndonesianNumber($paidAmount);
            $request->merge(['paid_amount' => $paidAmount]);
        }

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

        // Jika pembayaran kurang dari total, catat selisih sebagai adjustment VAT Payable (2110)
        $difference = round(max(0, ($invoice->total ?? 0) - $validated['paid_amount']), 2);
        if ($difference > 0) {
            $this->recordVatPayableAdjustment($difference, $validated['paid_date'], $invoice);
        }

        return redirect()->route('admin-keuangan.invoices.show', $invoice)
            ->with('success', 'Pembayaran berhasil dikonfirmasi.');
    }

    public function markSent(Invoice $invoice)
    {
        try {
            $invoice->update(['status' => 'sent']);

            // Auto-generate or sync Account Receivable when marking as sent
            \App\Models\AccountReceivable::syncFromInvoice($invoice);

            $this->autoPostInvoice($invoice);

            return redirect()->route('admin-keuangan.invoices.show', $invoice)
                ->with('success', 'Invoice berhasil ditandai sebagai terkirim dan piutang telah dibuat.');
        } catch (\Exception $e) {
            \Log::error('Mark Invoice as Sent Error', [
                'invoice_id' => $invoice->id,
                'error_message' => $e->getMessage(),
                'error_line' => $e->getLine(),
                'user_id' => auth()->id()
            ]);

            return redirect()->back()
                ->with('error', 'Terjadi kesalahan saat menandai invoice sebagai terkirim.');
        }
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

        // Filter customer-visible items (exclude operational costs and hidden items)
        $customerVisibleItems = $invoice->items->filter(function($item) {
            // Show only items that are:
            // 1. Not operational costs
            // 2. Included in customer invoice
            // 3. Not hidden from customer
            // 4. For main invoice: exclude only reimbursement items (item_ref containing 'reimbur', 'r', or '2')
            $itemRef = strtolower(trim($item->item_ref ?? ''));
            $isReimbursementItem = in_array($itemRef, ['reimbursement', 'reimbur', 'r', '2']) ||
                                  strpos($itemRef, 'reimbur') !== false ||
                                  strpos($itemRef, 'reimb_') !== false;

            return ($item->item_type ?? 'billable') !== 'operational_cost' &&
                   ($item->include_in_customer_invoice ?? true) &&
                   !($item->is_hidden_from_customer ?? false) &&
                   !$isReimbursementItem; // Exclude reimbursement items from main invoice
        });

        // Create a copy of invoice with only customer-visible items
        $filteredInvoice = $invoice->replicate();
        $filteredInvoice->setRelation('items', $customerVisibleItems);
        $filteredInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $filteredInvoice->setRelation('customer', $invoice->customer);

        return view('invoices.preview', [
            'invoice' => $filteredInvoice
        ]);
    }

    public function printView(Invoice $invoice)
    {
        $invoice->load(['customer', 'salesOrder', 'items']);

        // Filter customer-visible items (exclude operational costs and hidden items)
        $customerVisibleItems = $invoice->items->filter(function($item) {
            // Show only items that are:
            // 1. Not operational costs
            // 2. Included in customer invoice
            // 3. Not hidden from customer
            // 4. For main invoice: exclude only reimbursement items (item_ref containing 'reimbur', 'r', or '2')
            $itemRef = strtolower(trim($item->item_ref ?? ''));
            $isReimbursementItem = in_array($itemRef, ['reimbursement', 'reimbur', 'r', '2']) ||
                                  strpos($itemRef, 'reimbur') !== false ||
                                  strpos($itemRef, 'reimb_') !== false;

            return ($item->item_type ?? 'billable') !== 'operational_cost' &&
                   ($item->include_in_customer_invoice ?? true) &&
                   !($item->is_hidden_from_customer ?? false) &&
                   !$isReimbursementItem; // Exclude reimbursement items from main invoice
        });

        // Create a copy of invoice with only customer-visible items
        $filteredInvoice = $invoice->replicate();
        $filteredInvoice->setRelation('items', $customerVisibleItems);
        $filteredInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $filteredInvoice->setRelation('customer', $invoice->customer);

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        return view('invoices.print', [
            'invoice' => $filteredInvoice,
            'generatedAt' => $generatedAt
        ]);
    }

    protected function autoPostInvoice(Invoice $invoice): void
    {
        try {
            app(InvoicePostingService::class)->sync($invoice->fresh());
        } catch (\Throwable $th) {
            \Log::error('Invoice auto posting failed', [
                'invoice_id' => $invoice->id,
                'error_message' => $th->getMessage(),
            ]);
        }
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
     * Generate reimbursement PDF using old DEBIT NOTE template
     */
    public function generateReimbursementNotaPdf(Invoice $invoice)
    {
        $payload = $this->prepareReimbursementInvoicePayload($invoice);
        $reimbursementInvoice = $payload['invoice'];
        $reimbursementEntries = $payload['entries'];

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using old DEBIT NOTE template
        $pdf = PDF::loadView('invoices.pdf', [
            'invoice' => $reimbursementInvoice,
            'generatedAt' => $generatedAt,
            'reimbursementEntries' => $reimbursementEntries
        ])->setPaper('A4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);

        // DEBIT NOTE filename - invoice number already has -R suffix
        $filename = 'DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Preview reimbursement PDF using old DEBIT NOTE template
     */
    public function previewReimbursementNotaPdf(Invoice $invoice)
    {
        $payload = $this->prepareReimbursementInvoicePayload($invoice);
        $reimbursementInvoice = $payload['invoice'];
        $reimbursementEntries = $payload['entries'];

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using old DEBIT NOTE template
        $pdf = PDF::loadView('invoices.pdf', [
            'invoice' => $reimbursementInvoice,
            'generatedAt' => $generatedAt,
            'reimbursementEntries' => $reimbursementEntries
        ])->setPaper('A4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);

        // Return inline view instead of download
        return $pdf->stream('DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf');
    }

    /**
     * Generate reimbursement PDF using old DEBIT NOTE template (alternative method)
     */
    public function generateReimbursementDebitNotePdf(Invoice $invoice)
    {
        $payload = $this->prepareReimbursementInvoicePayload($invoice);
        $reimbursementInvoice = $payload['invoice'];
        $reimbursementEntries = $payload['entries'];

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using old DEBIT NOTE template
        $pdf = PDF::loadView('invoices.pdf', [
            'invoice' => $reimbursementInvoice,
            'generatedAt' => $generatedAt,
            'reimbursementEntries' => $reimbursementEntries
        ])->setPaper('A4', 'portrait')->setOptions([
            'defaultFont' => 'Courier',
            'isHtml5ParserEnabled' => true,
            'isRemoteEnabled' => true,
        ]);

        // DEBIT NOTE filename - invoice number already has -R suffix
        $filename = 'DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf';

        return $pdf->download($filename);
    }

    /**
     * Preview reimbursement PDF using old DEBIT NOTE template (backup)
     */
    public function previewReimbursementDebitNotePdf(Invoice $invoice)
    {
        $payload = $this->prepareReimbursementInvoicePayload($invoice);
        $reimbursementInvoice = $payload['invoice'];
        $reimbursementEntries = $payload['entries'];

        // Set current timestamp for print time
        $generatedAt = \Carbon\Carbon::now();

        // Generate PDF using old DEBIT NOTE template
        $pdf = PDF::loadView('invoices.pdf', [
            'invoice' => $reimbursementInvoice,
            'generatedAt' => $generatedAt,
            'reimbursementEntries' => $reimbursementEntries
        ]);
        $pdf->setPaper('A4', 'portrait');

        // Return inline view instead of download
        return $pdf->stream('DEBIT-NOTE-' . $reimbursementInvoice->invoice_number . '.pdf');
    }

    private function filterReimbursementInvoiceItems(Invoice $invoice): Collection
    {
        $invoice->loadMissing(['items']);

        return $invoice->items
            ->filter(function ($item) {
                $itemRef = strtolower(trim($item->item_ref ?? ''));
                $isReimbursementRef = in_array($itemRef, ['reimbursement', 'reimbur', 'r', '2']) ||
                    str_contains($itemRef, 'reimbur') ||
                    str_contains($itemRef, 'reimb_');

                return $isReimbursementRef || ($item->item_type === 'reimbursement');
            })
            ->values();
    }

    private function prepareReimbursementEntries(Invoice $invoice): Collection
    {
        $this->syncReimbursementRecordsFromInvoice($invoice);
        $invoice->loadMissing(['reimbursementRecords']);

        $records = $invoice->reimbursementRecords()
            ->orderBy('created_at')
            ->get()
            ->map(function (ReimbursementItem $item) {
                $receiptInfo = $item->receipt_info ?? [];

                $currency = data_get($receiptInfo, 'currency') ?? 'IDR';
                $quantity = data_get($receiptInfo, 'quantity') ?? 1;
                $unit = data_get($receiptInfo, 'unit') ?? 'UNIT';
                $rate = data_get($receiptInfo, 'unit_price') ?? (float) $item->amount;
                $vendorName = data_get($receiptInfo, 'vendor_name')
                    ?? data_get($receiptInfo, 'vendor')
                    ?? data_get($receiptInfo, 'paid_to')
                    ?? 'Eshaka Wijaya Logistics';

                return [
                    'id' => $item->id,
                    'description' => $item->description,
                    'quantity' => (float) $quantity,
                    'unit' => $unit,
                    'rate' => (float) $rate,
                    'currency' => $currency,
                    'amount' => (float) $item->amount,
                    'status' => $item->status,
                    'category' => $item->category,
                    'notes' => $item->notes,
                    'paid_at' => optional($item->paid_at)->toDateTimeString(),
                    'paid_at_date' => optional($item->paid_at)->toDateString(),
                    'vendor_name' => $vendorName,
                    'payment_history' => data_get($receiptInfo, 'payment_history', []),
                    'can_update' => true,
                ];
            })
            ->values();

        if ($records->isNotEmpty()) {
            return $records;
        }

        return $this->filterReimbursementInvoiceItems($invoice)
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'description' => $item->description,
                    'quantity' => (float) ($item->quantity ?? 1),
                    'unit' => $item->unit ?? 'SET',
                    'rate' => (float) ($item->rate ?? 0),
                    'currency' => $item->currency ?? 'IDR',
                    'amount' => (float) ($item->amount ?? 0),
                    'status' => null,
                    'category' => $item->item_type,
                    'notes' => $item->item_ref,
                    'paid_at' => null,
                    'paid_at_date' => null,
                    'vendor_name' => 'Eshaka Wijaya Logistics',
                    'can_update' => false,
                ];
            })
            ->values();
    }

    private function prepareReimbursementInvoicePayload(Invoice $invoice): array
    {
        $this->syncReimbursementRecordsFromInvoice($invoice);
        $invoice->load(['salesOrder', 'customer', 'items']);

        $reimbursementItems = $this->filterReimbursementInvoiceItems($invoice);
        $reimbursementEntries = $this->prepareReimbursementEntries($invoice);

        $subtotal = $reimbursementEntries->sum('amount');
        if ($subtotal <= 0) {
            $subtotal = $reimbursementItems->sum('amount');
        }

        $reimbursementInvoice = $invoice->replicate();
        $reimbursementInvoice->setRelation('items', $reimbursementItems);
        $reimbursementInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $reimbursementInvoice->setRelation('customer', $invoice->customer);

        $reimbursementInvoice->subtotal = $subtotal;
        $reimbursementInvoice->total = $subtotal;
        $reimbursementInvoice->invoice_number = $invoice->invoice_number . '-R';

        return [
            'invoice' => $reimbursementInvoice,
            'entries' => $reimbursementEntries,
            'subtotal' => $subtotal,
            'total' => $subtotal,
        ];
    }

    private function syncReimbursementRecordsFromInvoice(?Invoice $invoice): void
    {
        if (!$invoice) {
            return;
        }

        $invoice->loadMissing(['items', 'salesOrder']);

        $defaultUserId = auth()->id()
            ?? optional($invoice->salesOrder)->created_by
            ?? optional($invoice->salesOrder?->creator)->id
            ?? 1;

        foreach ($invoice->items ?? [] as $item) {
            if (($item->item_type ?? 'billable') !== 'reimbursement') {
                continue;
            }

            $reimbursement = null;
            $itemRef = strtolower(trim($item->item_ref ?? ''));

            if ($itemRef && preg_match('/reimb(?:ursement)?[_-]?(\d+)/', $itemRef, $matches)) {
                $reimbursement = ReimbursementItem::find((int) $matches[1]);
            }

            if (!$reimbursement) {
                $reimbursement = ReimbursementItem::firstOrNew([
                    'invoice_id' => $invoice->id,
                    'description' => $item->description,
                    'amount' => $item->amount,
                    'sales_order_id' => $invoice->sales_order_id,
                ]);
            }

            if (!$reimbursement->exists) {
                $reimbursement->fill([
                    'category' => $reimbursement->category ?? 'general',
                    'created_by' => $reimbursement->created_by ?? $defaultUserId,
                ]);
            }

            $reimbursement->sales_order_id = $invoice->sales_order_id;
            $reimbursement->invoice_id = $invoice->id;
            $reimbursement->linked_at = $reimbursement->linked_at ?? now();
            if ($reimbursement->status !== 'paid') {
                $reimbursement->status = 'invoiced';
                $reimbursement->invoiced_at = now();
            }
            $reimbursement->save();
        }
    }

    /**
     * Normalize Indonesian number format to standard format
     * Examples: 2.500 -> 2500, 2.500,50 -> 2500.50, 2500,50 -> 2500.50
     */
    private function normalizeIndonesianNumber($value)
    {
        if (!$value) {
            return $value;
        }

        $value = trim($value);

        // Handle Indonesian format
        if (strpos($value, '.') !== false && strpos($value, ',') !== false) {
            // Format: 2.500,50 (dot = thousand separator, comma = decimal)
            $value = str_replace('.', '', $value);
            $value = str_replace(',', '.', $value);
        } elseif (strpos($value, '.') !== false && strpos($value, ',') === false) {
            // Could be: 2.500 (thousand) or 2500.50 (decimal)
            $parts = explode('.', $value);
            if (count($parts) === 2) {
                $decimalPart = $parts[1];
                // If decimal part has 3+ digits or is > 99, treat as thousand separator
                if (strlen($decimalPart) >= 3 || intval($decimalPart) >= 100 || strlen($parts[0]) >= 2) {
                    // Likely thousand separator: 2.500 or 12.500
                    $value = str_replace('.', '', $value);
                }
                // Otherwise keep as decimal: 25.50
            } else {
                // Multiple dots, treat as thousand separators: 1.000.500
                $value = str_replace('.', '', $value);
            }
        } elseif (strpos($value, ',') !== false) {
            // Format: 2500,50 (comma as decimal)
            $value = str_replace(',', '.', $value);
        }

        return $value;
    }

    /**
     * Auto-generate operational debt per vendor from invoice operational costs and reimbursement
     */
    private function autoGenerateOperationalDebt(Invoice $invoice)
    {
        try {
            $invoice->loadMissing(['salesOrder.reimbursementItems']);
            $salesOrder = $invoice->salesOrder;

            if ($salesOrder) {
                $hasVendorBreakdown = is_array($salesOrder->vendor_breakdown)
                    && collect($salesOrder->vendor_breakdown)->filter(function ($item) {
                        return is_array($item) && (float) ($item['buying_amount'] ?? 0) > 0;
                    })->isNotEmpty();
                $hasOtherCosts = is_array($salesOrder->other_costs)
                    && collect($salesOrder->other_costs)->filter(function ($item) {
                        return is_array($item) && (float) ($item['amount'] ?? 0) > 0;
                    })->isNotEmpty();
                $hasReimbursements = $salesOrder->reimbursementItems()->exists();

                if ($hasVendorBreakdown || $hasOtherCosts || $hasReimbursements) {
                    $this->cleanupInvoiceGeneratedPayables($invoice);
                    return;
                }
            }

            // Get operational costs and reimbursement items from invoice
            $allItems = $invoice->items()
                ->whereIn('item_type', ['operational_cost', 'reimbursement'])
                ->where(function ($query) {
                    $query->whereNull('item_ref')
                          ->orWhere('item_ref', 'not like', 'cogs_vendor_%');
                })
                ->with('vendor')
                ->get();

            // If no items, return
            if ($allItems->isEmpty()) {
                return;
            }

            // Group items by vendor_id (null = Divisi Operational / Internal)
            $groupedByVendor = $allItems->groupBy('vendor_id');

            foreach ($groupedByVendor as $vendorId => $items) {
                $totalAmount = (float) $items->sum('amount');

                if ($totalAmount <= 0) {
                    continue;
                }

                // Get vendor info
                $vendor = $vendorId ? \App\Models\Vendor::find($vendorId) : null;
                $vendorName = $vendor ? $vendor->nama_vendor : 'Divisi Operational';

                // Check if account payable already exists for this SO and vendor
                // Clean vendor_id to ensure it's null or valid integer
                $cleanCheckVendorId = $vendorId && is_numeric($vendorId) && (int)$vendorId > 0 ? (int)$vendorId : null;

                $existingPayable = \App\Models\AccountPayable::where('sales_order_id', $invoice->sales_order_id)
                    ->where(function ($q) use ($cleanCheckVendorId, $vendorName) {
                        if ($cleanCheckVendorId) {
                            $q->where('vendor_id', $cleanCheckVendorId);
                        } else {
                            $q->where('vendor_name', $vendorName)
                              ->whereNull('vendor_id');
                        }
                    })
                    ->first();

                if ($existingPayable) {
                    $existingPayable->fill([
                        'service_description' => $this->buildServiceDescription($items, $invoice),
                        'vendor_invoice_number' => $existingPayable->vendor_invoice_number ?? (($vendor ? 'V-' : 'OP-') . $invoice->invoice_number),
                        'vendor_invoice_date' => $existingPayable->vendor_invoice_date ?? $invoice->invoice_date,
                    ]);
                    $existingPayable->save();

                    $existingPayable->syncComponents();

                    \Log::info('Payable updated with components', [
                        'account_payable_id' => $existingPayable->id,
                        'invoice_id' => $invoice->id,
                        'vendor' => $vendorName,
                        'amount' => $existingPayable->amount,
                    ]);
                } else {
                    // Create new account payable
                    // Ensure vendor_id is either null or a valid integer (not empty string)
                    $cleanVendorId = $vendorId && is_numeric($vendorId) && (int)$vendorId > 0 ? (int)$vendorId : null;

                    $payable = \App\Models\AccountPayable::create([
                        'sales_order_id' => $invoice->sales_order_id,
                        'vendor_id' => $cleanVendorId,
                        'vendor_name' => $vendorName,
                        'vendor_invoice_number' => ($vendor ? 'V-' : 'OP-') . $invoice->invoice_number,
                        'vendor_invoice_date' => $invoice->invoice_date,
                        'service_description' => $this->buildServiceDescription($items, $invoice),
                        'service_remarks' => 'Auto-generated from invoice items',
                        'amount' => $totalAmount,
                        'paid_amount' => 0,
                        'outstanding_amount' => $totalAmount,
                        'status' => 'unpaid',
                        'payment_due_date' => $invoice->invoice_date->addDays(30),
                        'vendor_bank_account' => $vendor?->nomor_rekening,
                        'vendor_account_name' => $vendor?->nama_rekening,
                        'created_by' => auth()->id(),
                    ]);

                    // Sync components to split operational and reimbursement
                    $payable->syncComponents();

                    \Log::info('Payable created with components', [
                        'account_payable_id' => $payable->id,
                        'invoice_id' => $invoice->id,
                        'vendor' => $vendorName,
                        'amount' => $totalAmount,
                        'sales_order' => $invoice->salesOrder->order_number ?? null
                    ]);
                }
            }

        } catch (\Exception $e) {
            \Log::error('Failed to create operational debt', [
                'invoice_id' => $invoice->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            // Don't throw exception to prevent blocking invoice creation
        }
    }

    private function cleanupInvoiceGeneratedPayables(Invoice $invoice): void
    {
        if (!$invoice->sales_order_id) {
            return;
        }

        $payables = \App\Models\AccountPayable::query()
            ->where('sales_order_id', $invoice->sales_order_id)
            ->where('service_remarks', 'Auto-generated from invoice items')
            ->get();

        foreach ($payables as $payable) {
            $payable->components()->delete();
            $payable->delete();
        }
    }

    /**
     * Auto-generate buying cost operational items from vendor_breakdown
     * This ensures COGS is recorded without cluttering the form UI
     */
    private function autoGenerateBuyingCosts(Invoice $invoice, SalesOrder $salesOrder): void
    {
        try {
            // Check if SO has vendor_breakdown
            if (!$salesOrder->vendor_breakdown || !is_array($salesOrder->vendor_breakdown)) {
                return;
            }

            // For each vendor in breakdown, create buying cost item
            foreach ($salesOrder->vendor_breakdown as $index => $vendor) {
                $buyingAmount = floatval($vendor['buying_amount'] ?? 0);

                // Only create if buying amount > 0
                if ($buyingAmount > 0) {
                    $description = ($vendor['description'] ?? 'Service') . ' - Buying Cost (COGS)';
                    $vendorId = !empty($vendor['vendor_id']) && is_numeric($vendor['vendor_id'])
                        ? (int)$vendor['vendor_id']
                        : null;

                    $itemRef = 'cogs_vendor_' . ($vendor['vendor_id'] ?? $index);

                    $alreadyExists = InvoiceItem::query()
                        ->where('invoice_id', $invoice->id)
                        ->where('item_ref', $itemRef)
                        ->exists();

                    if ($alreadyExists) {
                        continue;
                    }

                    InvoiceItem::create([
                        'invoice_id' => $invoice->id,
                        'description' => $description,
                        'quantity' => 1,
                        'unit' => 'SET',
                        'rate' => $buyingAmount,
                        'currency' => 'IDR',
                        'amount' => $buyingAmount,
                        'item_ref' => $itemRef,
                        'item_type' => 'operational_cost',
                        'vendor_id' => $vendorId,
                        'include_in_customer_invoice' => false,
                        'is_hidden_from_customer' => true,
                    ]);

                    \Log::info('Auto-generated buying cost (COGS)', [
                        'invoice_id' => $invoice->id,
                        'description' => $description,
                        'amount' => $buyingAmount,
                        'vendor_id' => $vendorId,
                    ]);
                }
            }

        } catch (\Exception $e) {
            \Log::error('Failed to auto-generate buying costs', [
                'invoice_id' => $invoice->id,
                'error' => $e->getMessage(),
            ]);
            // Don't throw exception to prevent blocking invoice creation
        }
    }

    /**
     * Sinkronisasi item vendor (billable & COGS) pada invoice berdasarkan vendor_breakdown SO.
     */
    private function syncVendorItemsFromSalesOrder(Invoice $invoice, SalesOrder $salesOrder): void
    {
        $vendorBreakdown = $salesOrder->vendor_breakdown;
        if (!is_array($vendorBreakdown) || empty($vendorBreakdown)) {
            return;
        }

        // Hapus entri lama yang berasal dari vendor_breakdown
        InvoiceItem::where('invoice_id', $invoice->id)
            ->where(function ($q) {
                $q->where('item_ref', 'like', 'vendor_%')
                  ->orWhere('item_ref', 'like', 'cogs_vendor_%');
            })
            ->delete();

        foreach ($vendorBreakdown as $index => $vendor) {
            $rawVendorId = $vendor['vendor_id'] ?? null;
            $vendorId = is_numeric($rawVendorId) ? (int) $rawVendorId : null;
            $description = $vendor['description'] ?? 'Service';

            // Billable (selling)
            $sellingAmount = floatval($vendor['selling_amount'] ?? 0);
            if ($sellingAmount > 0) {
                $billRef = 'vendor_' . ($rawVendorId !== null ? $rawVendorId : $index);
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => $description,
                    'quantity' => 1,
                    'unit' => 'SET',
                    'rate' => $sellingAmount,
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
            $buyingAmount = floatval($vendor['buying_amount'] ?? 0);
            if ($buyingAmount > 0) {
                $cogsRef = 'cogs_vendor_' . ($rawVendorId !== null ? $rawVendorId : $index);
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => $description . ' - Buying Cost (COGS)',
                    'quantity' => 1,
                    'unit' => 'SET',
                    'rate' => $buyingAmount,
                    'currency' => 'IDR',
                    'amount' => $buyingAmount,
                    'item_ref' => $cogsRef,
                    'item_type' => 'operational_cost',
                    'vendor_id' => $vendorId,
                    'include_in_customer_invoice' => false,
                    'is_hidden_from_customer' => true,
                ]);
            }
        }

        // Recalculate customer-facing totals (COGS tidak mempengaruhi subtotal)
        $invoice->calculateTotals();
    }

    /**
     * Build service description from items
     */
    private function buildServiceDescription($items, $invoice): string
    {
        $types = $items->pluck('item_type')->unique();
        $labels = [];

        if ($types->contains('operational_cost')) {
            $labels[] = 'Biaya Operational';
        }
        if ($types->contains('reimbursement')) {
            $labels[] = 'Reimbursement';
        }

        $description = implode(' & ', $labels);
        $soNumber = $invoice->salesOrder->order_number ?? '';

        return "{$description} untuk Shipment {$soNumber}";
    }
}
