<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\SalesOrder;
use App\Models\Customer;
use App\Models\ReimbursementItem;
use App\Models\AccountPayableComponent;
use App\Models\AccountPayable;
use App\Models\AccountReceivable;
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
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
{
    public function index(Request $request)
    {
        try {
            $search = trim((string) $request->input('search', ''));
            $status = $request->input('status');
            $invoiceType = $request->input('invoice_type');
            $dateFrom = $request->input('date_from');
            $dateTo = $request->input('date_to');

            // Base query + apply filters
            $query = Invoice::query()
                ->with(['salesOrder', 'customer', 'confirmedBy', 'items']);

            if (!empty($search)) {
                $query->where(function ($q) use ($search) {
                    $q->where('invoice_number', 'like', '%' . $search . '%')
                      ->orWhereHas('customer', function ($customerQuery) use ($search) {
                          $customerQuery->where('company_name', 'like', '%' . $search . '%')
                              ->orWhere('name', 'like', '%' . $search . '%');
                      })
                      ->orWhereHas('salesOrder', function ($salesOrderQuery) use ($search) {
                          $salesOrderQuery->where('order_number', 'like', '%' . $search . '%')
                              ->orWhere('customer_name', 'like', '%' . $search . '%')
                              ->orWhere('customer', 'like', '%' . $search . '%');
                      });
                });
            }

            if (!empty($status)) {
                $query->where('status', $status);
            }

            if (!empty($invoiceType)) {
                $query->where('invoice_type', $invoiceType);
            }

            if (!empty($dateFrom)) {
                $query->whereDate('invoice_date', '>=', Carbon::parse($dateFrom)->toDateString());
            }

            if (!empty($dateTo)) {
                $query->whereDate('invoice_date', '<=', Carbon::parse($dateTo)->toDateString());
            }

            $invoices = $query
                ->orderBy('created_at', 'desc')
                ->paginate(10)
                ->withQueryString();

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
        $isAdditional = $request->boolean('is_additional');

        // Check if coming from Sales Order detail page
        if ($request->has('sales_order_id') && ($request->has('invoice_type') || $isAdditional)) {
            $salesOrder = SalesOrder::with(['creator', 'releasedBy', 'approvedBy', 'reimbursementItems', 'vendorBreakdownItems', 'accountReceivables.components'])
                ->findOrFail($request->sales_order_id);
            $this->ensureVendorBreakdownPayload($salesOrder);
            $salesOrder->setAttribute('pre_invoice_receivable', $this->getPreInvoiceReceivable($salesOrder));

            // Verify SO is eligible for invoice creation - must be approved by finance
            if ($salesOrder->status !== 'approved' || !$salesOrder->released_at || !$salesOrder->approved_at) {
                return redirect()->route('admin-keuangan.invoices.index')
                    ->withErrors(['error' => 'Sales Order harus sudah disetujui finance untuk dibuat invoice.']);
            }

            if (!$isAdditional) {
                // Check if invoice type already exists
                $existingInvoice = Invoice::where('sales_order_id', $request->sales_order_id)
                    ->where('invoice_type', $request->invoice_type)
                    ->where('is_additional', false)
                    ->first();

                if ($existingInvoice) {
                    return redirect()->route('admin-keuangan.sales-orders.show', $salesOrder->id)
                        ->withErrors(['error' => 'Invoice ' . ucfirst($request->invoice_type) . ' sudah ada untuk Sales Order ini.']);
                }
            }

            $baseInvoice = $salesOrder->invoices()
                ->when($request->filled('base_invoice_id'), function ($query) use ($request) {
                    $query->where('id', (int) $request->input('base_invoice_id'));
                }, function ($query) {
                    $query->where('is_additional', false)->orderByDesc('invoice_date')->orderByDesc('id');
                })
                ->first();

            return Inertia::render('Admin/AdminKeuangan/Invoices/Create', [
                'salesOrders' => collect([$salesOrder]),
                'preselectedSalesOrder' => $salesOrder->id,
                'preselectedInvoiceType' => $request->invoice_type ?? 'combined',
                'preselectedIsAdditional' => $isAdditional,
                'preselectedBaseInvoiceId' => $baseInvoice?->id,
                'preselectedVendorBreakdown' => $salesOrder->vendor_breakdown,
                'preselectedOtherCosts' => $salesOrder->other_costs ?? [], // Send other_costs with vendor_id
                'preselectedReimbursementItems' => $salesOrder->reimbursementItems ?? [], // Send reimbursement items with vendor_id
                'operationalCostCategories' => OperationalCostCategory::active()->orderBy('name')->get(),
                'packageUnits' => \App\Models\MasterPackageUnit::getActiveUnits(),
                'vendors' => \App\Models\Vendor::orderBy('nama_vendor')->get(['id', 'nama_vendor', 'nomor_rekening'])
            ]);
        }

        // Get only approved SOs (already released and approved by finance)
        $allSalesOrders = SalesOrder::with(['invoices', 'creator', 'releasedBy', 'approvedBy', 'reimbursementItems', 'vendorBreakdownItems', 'accountReceivables.components'])
            ->select(['id', 'order_number', 'customer', 'customer_name', 'status', 'vendor_breakdown', 'other_costs', 'approved_at', 'released_at', 'shipper', 'vessel', 'bl_awb', 'awb_bl_number', 'pol', 'pod', 'pol_pod', 'eta', 'etd', 'net_weight', 'gross_weight', 'measurement', 'qty', 'package_unit', 'shipment_type', 'container_no', 'party_lcl'])
            ->where('status', 'approved')  // Only approved SOs, not just released
            ->whereNotNull('released_at')
            ->whereNotNull('approved_at')  // Must be approved by finance
            ->orderBy('approved_at', 'desc')  // Order by approval date
            ->get();
        $allSalesOrders->each(function ($salesOrder) {
            $this->ensureVendorBreakdownPayload($salesOrder);
            $salesOrder->setAttribute('pre_invoice_receivable', $this->getPreInvoiceReceivable($salesOrder));
        });

        // Filter SOs that can still have invoices created
        $salesOrders = $allSalesOrders->filter(function($salesOrder) {
            // Only show SOs that have NO invoices at all
            return $salesOrder->invoices->count() === 0;
        })->values();

        return Inertia::render('Admin/AdminKeuangan/Invoices/Create', [
            'salesOrders' => $salesOrders,
            'preselectedIsAdditional' => false,
            'preselectedBaseInvoiceId' => null,
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
            'is_additional' => 'nullable|boolean',
            'base_invoice_id' => 'nullable|integer|exists:invoices,id',
            'additional_reason' => [
                'nullable',
                'string',
                'max:1000',
                Rule::requiredIf(fn () => $request->boolean('is_additional')),
            ],
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
            'items.*.category_id' => 'nullable|integer|exists:operational_cost_categories,id',
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
            'vat_rate' => ['nullable', 'numeric', Rule::in([0, 11, 1.1, '0', '11', '1.1'])],
        ]);

        $salesOrder = SalesOrder::findOrFail($validated['sales_order_id']);
        $isAdditional = (bool) ($validated['is_additional'] ?? false);

        if ($isAdditional && !empty($validated['base_invoice_id'])) {
            $baseInvoice = Invoice::query()
                ->where('id', (int) $validated['base_invoice_id'])
                ->where('sales_order_id', $salesOrder->id)
                ->first();

            if (!$baseInvoice) {
                return back()->withErrors([
                    'base_invoice_id' => 'Base invoice tidak valid untuk SO yang dipilih.',
                ])->withInput();
            }
        }

        if (!$isAdditional) {
            // Filter items based on pre-invoice payment status (paid items should not be invoiced)
            $preInvoiceReceivable = AccountReceivable::with('components')
                ->where('sales_order_id', $salesOrder->id)
                ->whereNull('invoice_id')
                ->where('is_opening', false)
                ->first();

            $mainComponent = $preInvoiceReceivable?->components?->firstWhere('component_type', 'main');

            if (isset($validated['items']) && is_array($validated['items'])) {
                $validated['items'] = array_values(array_filter($validated['items'], function ($item) use ($mainComponent) {
                    $itemType = $item['item_type'] ?? null;

                    if ($itemType === 'billable' && $mainComponent && $mainComponent->status === 'paid') {
                        return false;
                    }

                    if ($itemType === 'reimbursement' && !empty($item['item_ref'])) {
                        if (preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $item['item_ref'], $matches)) {
                            $reimbId = (int) $matches[1];
                            if ($reimbId > 0) {
                                $reimb = ReimbursementItem::find($reimbId);
                                if ($reimb && $this->isReimbursementPaidByCustomer($reimb)) {
                                    return false;
                                }
                            }
                        }
                    }

                    return true;
                }));
            }

            // Check if invoice type already exists for this Sales Order
            $existingInvoice = Invoice::where('sales_order_id', $validated['sales_order_id'])
                ->where('invoice_type', $validated['invoice_type'])
                ->where('is_additional', false)
                ->first();

            if ($existingInvoice) {
                return back()->withErrors([
                    'invoice_type' => 'An invoice of type "' . ucfirst($validated['invoice_type']) . '" already exists for this Sales Order.'
                ]);
            }
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

        $vatRate = isset($validated['vat_rate']) ? (float) $validated['vat_rate'] : 0;
        [$generatedInvoiceNumber, $additionalSequence] = $this->generateInvoiceNumberByType(
            $salesOrder,
            $validated['invoice_type'],
            $isAdditional
        );

        $invoice = Invoice::create([
            'invoice_number' => $generatedInvoiceNumber,
            'invoice_type' => $validated['invoice_type'],
            'is_additional' => $isAdditional,
            'additional_sequence' => $additionalSequence,
            'base_invoice_id' => $isAdditional ? ($validated['base_invoice_id'] ?? null) : null,
            'additional_reason' => $isAdditional ? ($validated['additional_reason'] ?? null) : null,
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
            'vat_rate' => $vatRate > 0 ? $vatRate : null,
            'status' => 'draft'
        ]);

        $linkedReimbursementItemIds = [];

        // Create invoice items
        foreach ($this->sanitizeItemsForPersistence($validated['items']) as $item) {
            $itemType = $item['item_type'] ?? 'billable';

            if ($itemType === 'reimbursement') {
                $sourceReimbursement = $this->findReimbursementItemFromRef($item['item_ref'] ?? null);
                if ($sourceReimbursement) {
                    $sourceQuantity = is_numeric($sourceReimbursement->quantity) && (float) $sourceReimbursement->quantity > 0
                        ? (float) $sourceReimbursement->quantity
                        : 1;

                    $item['description'] = $item['description'] ?: $sourceReimbursement->description;
                    $item['quantity'] = $sourceQuantity;
                    $item['unit'] = $sourceReimbursement->unit ?: ($item['unit'] ?? 'SET');
                    $item['rate'] = (float) $sourceReimbursement->amount;
                }
            }

            $amount = $item['quantity'] * $item['rate'];

            // Determine item type and visibility based on input
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

        // Auto-generate / merge Account Receivable from invoice
        \App\Models\AccountReceivable::syncFromInvoice($invoice);

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

    private function ensureVendorBreakdownPayload(SalesOrder $salesOrder): void
    {
        $vendorBreakdown = $salesOrder->vendor_breakdown;
        $vendorItems = $salesOrder->relationLoaded('vendorBreakdownItems')
            ? $salesOrder->vendorBreakdownItems
            : $salesOrder->vendorBreakdownItems()->get();

        if ((!is_array($vendorBreakdown) || empty($vendorBreakdown)) && $vendorItems->isNotEmpty()) {
            $salesOrder->setAttribute(
                'vendor_breakdown',
                $vendorItems->map(fn ($item) => $item->toVendorBreakdownArray())->all()
            );
        }
    }

    public function show(Invoice $invoice, InvoiceCostSyncService $invoiceCostSyncService)
    {
        if ($invoice->is_additional) {
            $this->cleanupAdditionalInvoiceAutoSyncedItems($invoice);
        }

        $invoiceCostSyncService->syncInvoiceWithAccountPayables($invoice);

        $invoice->load(['salesOrder', 'customer', 'items', 'reimbursementRecords']);

        if ($invoice->salesOrder && !$invoice->is_additional) {
            $this->syncVendorItemsFromSalesOrder($invoice, $invoice->salesOrder);
        }


        // Get all invoices from the same Sales Order
        $relatedInvoices = collect();
        $mainInvoice = null;
        $reimbursementInvoice = null;

        if ($invoice->sales_order_id) {
            $relatedInvoices = Invoice::with(['items'])
                ->where('sales_order_id', $invoice->sales_order_id)
                ->orderBy('invoice_date')
                ->orderBy('id')
                ->get();

            if (!$invoice->is_additional) {
                $mainInvoice = $relatedInvoices
                    ->where('is_additional', false)
                    ->where('invoice_type', 'main')
                    ->first();
                $reimbursementInvoice = $relatedInvoices
                    ->where('is_additional', false)
                    ->where('invoice_type', 'reimbursement')
                    ->first();
            }
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
        } elseif (!$targetReimbursementInvoice && $invoice->is_additional) {
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
            'status' => ['required', Rule::in(['pending', 'linked', 'invoiced', 'paid', 'partial'])],
            'vendor_name' => ['nullable', 'string', 'max:255'],
            'paid_at' => ['nullable', 'date'],
            'notes' => ['nullable', 'string'],
            'payment_amount' => ['nullable', 'numeric', 'min:0.01'],
        ]);

        $options = [
            'notes' => $validated['notes'] ?? null,
        ];

        if ($validated['status'] === 'paid') {
            $options['vendor_name'] = $validated['vendor_name'] ?: 'Eshaka Wijaya Logistics';
            $options['paid_at'] = $validated['paid_at'] ?: now()->toDateString();
        }

        // Keep legacy status flow for vendor-side reimbursement tracking
        if (in_array($validated['status'], ['pending', 'linked', 'invoiced', 'paid'], true)) {
            $reimbursementItem->updatePaymentStatus($validated['status'], $options);
        }

        $paymentAmount = $validated['payment_amount'] ?? null;
        if ($paymentAmount !== null) {
            $reimbursementItem->updateCustomerPayment((float) $paymentAmount, $validated['paid_at'] ?? null, $validated['notes'] ?? null);
        } elseif ($validated['status'] === 'paid') {
            $lineTotal = $reimbursementItem->getLineTotal();
            $reimbursementItem->updateCustomerPayment($lineTotal, $validated['paid_at'] ?? null, $validated['notes'] ?? null);
        }

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
              'vat_rate' => ['nullable', 'numeric', Rule::in([0, 11, 1.1, '0', '11', '1.1'])],
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
              'vat_rate',
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
              'down_payment_notes' => $validated['down_payment_notes'],
              'vat_rate' => isset($validated['vat_rate']) && (float) $validated['vat_rate'] > 0
                  ? (float) $validated['vat_rate']
                  : null,
          ]);

        $existingReimbursementIds = $invoice->reimbursementRecords()->pluck('id')->all();
        $linkedReimbursementItemIds = [];

        // Delete existing items
        $invoice->items()->delete();

        // Create new items
        foreach ($this->sanitizeItemsForPersistence($validated['items']) as $item) {
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

        return redirect()->route('admin-keuangan.invoices.show', array_merge(
            ['invoice' => $invoice->id],
            $request->only([
                'search',
                'status',
                'invoice_type',
                'date_from',
                'date_to',
                'page',
            ])
        ))
            ->with('success', 'Invoice berhasil diperbarui.');
    }

    public function destroy(Request $request, Invoice $invoice)
    {
        try {
            \DB::transaction(function () use ($invoice) {
                $invoice->delete();
            });

            return redirect()->route('admin-keuangan.invoices.index', $request->only([
                'search',
                'status',
                'invoice_type',
                'date_from',
                'date_to',
                'page',
            ]))
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
                    $rate = (float) ($otherCost['amount'] ?? 0);
                    if ($rate > 0) {
                        $quantityInfo = $this->resolveItemQuantity($otherCost, 1);
                        $quantity = $quantityInfo['quantity'];
                        $hasQuantity = $quantityInfo['hasQuantity'];
                        $unit = $this->normalizeItemUnit($otherCost, 'pcs');
                        $amount = $hasQuantity ? $rate * $quantity : $rate;
                        InvoiceItem::create([
                            'invoice_id' => $invoice->id,
                            'description' => 'Other Cost - ' . ($otherCost['description'] ?? 'Additional Cost'),
                            'quantity' => $quantity,
                            'unit' => $unit,
                            'rate' => $rate,
                            'currency' => 'IDR',
                            'amount' => $amount,
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
                $rate = (float) $reimbursementItem->amount;
                $amount = $rate * $quantity;
                $invoiceItem = InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => 'Reimbursement - ' . $reimbursementItem->description,
                    'quantity' => $quantity,
                    'unit' => $unit,
                    'rate' => $rate,
                    'currency' => 'IDR',
                    'amount' => $amount,
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

        $customerVisibleItems = $this->filterCustomerVisibleMainInvoiceItems($invoice->items);

        // Calculate totals for customer-visible items only
        $subtotal = $customerVisibleItems->sum('amount');
        $vatRate = (float) ($invoice->vat_rate ?? 0);
        $vatBase = $customerVisibleItems->filter(function ($item) {
            $itemType = strtolower(trim($item->item_type ?? 'billable'));
            return $itemType === 'billable';
        })->sum('amount');
        $vatAmount = $vatRate > 0 ? round($vatBase * ($vatRate / 100), 2) : 0;
        if ($vatAmount <= 0 && (float) ($invoice->vat_amount ?? 0) > 0) {
            $vatAmount = (float) $invoice->vat_amount;
            $vatRate = (float) ($invoice->vat_rate ?? $vatRate);
        }
        $total = $subtotal + $vatAmount - ($invoice->down_payment_amount ?? 0);

        // Create a copy of invoice with only customer-visible items
        $mainInvoice = $invoice->replicate();
        $mainInvoice->setRelation('items', $customerVisibleItems);
        $mainInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $mainInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $mainInvoice->subtotal = $subtotal;
        $mainInvoice->vat_rate = $vatRate > 0 ? $vatRate : null;
        $mainInvoice->vat_amount = $vatAmount;
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

        $customerVisibleItems = $this->filterCustomerVisibleMainInvoiceItems($invoice->items);

        // Calculate totals for customer-visible items only
        $subtotal = $customerVisibleItems->sum('amount');
        $vatRate = (float) ($invoice->vat_rate ?? 0);
        $vatBase = $customerVisibleItems->filter(function ($item) {
            $itemType = strtolower(trim($item->item_type ?? 'billable'));
            return $itemType === 'billable';
        })->sum('amount');
        $vatAmount = $vatRate > 0 ? round($vatBase * ($vatRate / 100), 2) : 0;
        if ($vatAmount <= 0 && (float) ($invoice->vat_amount ?? 0) > 0) {
            $vatAmount = (float) $invoice->vat_amount;
            $vatRate = (float) ($invoice->vat_rate ?? $vatRate);
        }
        $total = $subtotal + $vatAmount - ($invoice->down_payment_amount ?? 0);

        // Create a copy of invoice with only customer-visible items
        $mainInvoice = $invoice->replicate();
        $mainInvoice->setRelation('items', $customerVisibleItems);
        $mainInvoice->setRelation('salesOrder', $invoice->salesOrder);
        $mainInvoice->setRelation('customer', $invoice->customer);

        // Override subtotal and total with calculated values
        $mainInvoice->subtotal = $subtotal;
        $mainInvoice->vat_rate = $vatRate > 0 ? $vatRate : null;
        $mainInvoice->vat_amount = $vatAmount;
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

        // VAT Payable dipost manual lewat tombol di detail piutang setelah status paid.

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

        $customerVisibleItems = $this->filterCustomerVisibleMainInvoiceItems($invoice->items);

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

        $customerVisibleItems = $this->filterCustomerVisibleMainInvoiceItems($invoice->items);

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

    private function filterCustomerVisibleMainInvoiceItems($items)
    {
        return $items->filter(function ($item) {
            $itemType = strtolower(trim($item->item_type ?? 'billable'));

            return $itemType !== 'operational_cost' &&
                ($item->include_in_customer_invoice ?? true) &&
                !($item->is_hidden_from_customer ?? false) &&
                !$this->isReimbursementInvoiceItem($item) &&
                !$this->isMainInvoiceVatLine($item);
        })->values();
    }

    private function isReimbursementInvoiceItem($item): bool
    {
        $itemRef = strtolower(trim($item->item_ref ?? ''));
        $itemType = strtolower(trim($item->item_type ?? 'billable'));

        return $itemType === 'reimbursement' ||
            in_array($itemRef, ['reimbursement', 'reimbur', 'r', '2'], true) ||
            strpos($itemRef, 'reimbur') !== false ||
            strpos($itemRef, 'reimb_') !== false;
    }

    private function isMainInvoiceVatLine($item): bool
    {
        $itemRef = strtolower(trim($item->item_ref ?? ''));
        $description = strtolower(trim($item->description ?? ''));

        if ($itemRef !== '' && (bool) preg_match('/(^|[_\\-\\s])(vat|ppn|tax)([_\\-\\s]|$)|^(vat|ppn|tax)\\d+/', $itemRef)) {
            return true;
        }

        if ($description === '') {
            return false;
        }

        return (bool) preg_match('/^(vat|ppn|tax)(\\s+[0-9]+(?:[\\.,][0-9]+)?%?)?$/', $description);
    }

    private function generateInvoiceNumberByType(SalesOrder $salesOrder, string $type, bool $isAdditional = false): array
    {
        if ($isAdditional) {
            $baseInvoiceNumber = $this->resolveInvoiceBaseNumberFromSO($salesOrder);
            $sequence = (int) Invoice::query()
                ->where('sales_order_id', $salesOrder->id)
                ->where('is_additional', true)
                ->max('additional_sequence');

            do {
                $sequence++;
                $invoiceNumber = $baseInvoiceNumber . '-ADD' . $sequence;
            } while (Invoice::where('invoice_number', $invoiceNumber)->exists());

            return [$invoiceNumber, $sequence];
        }

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

        return [$invoiceNumber, null];
    }

    private function sanitizeItemsForPersistence(array $items): array
    {
        $sanitized = [];
        $seenReimbursementRefs = [];

        foreach ($items as $item) {
            if (!is_array($item)) {
                continue;
            }

            $itemType = strtolower(trim((string) ($item['item_type'] ?? 'billable')));
            $item['item_ref'] = $this->normalizeInvoiceItemRef($item['item_ref'] ?? null);

            if ($itemType === 'reimbursement' && $item['item_ref']) {
                if (isset($seenReimbursementRefs[$item['item_ref']])) {
                    continue;
                }

                $seenReimbursementRefs[$item['item_ref']] = true;
            }

            $sanitized[] = $item;
        }

        return $sanitized;
    }

    private function normalizeInvoiceItemRef(?string $itemRef): ?string
    {
        $itemRef = trim((string) $itemRef);
        if ($itemRef === '') {
            return null;
        }

        if (preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $itemRef, $matches)) {
            return 'reimbursement_' . (int) $matches[1];
        }

        return $itemRef;
    }

    private function resolveInvoiceBaseNumberFromSO(SalesOrder $salesOrder): string
    {
        $soNumber = trim((string) $salesOrder->order_number);
        if (str_starts_with($soNumber, 'EWILOG')) {
            return 'EWL' . substr($soNumber, 6);
        }

        return 'EWL' . preg_replace('/[^A-Za-z0-9]/', '', $soNumber);
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
                $quantity = is_numeric($item->quantity) && (float) $item->quantity > 0
                    ? (float) $item->quantity
                    : (float) (data_get($receiptInfo, 'quantity') ?? 1);
                $unit = is_string($item->unit) && trim($item->unit) !== ''
                    ? trim($item->unit)
                    : (data_get($receiptInfo, 'unit') ?? 'UNIT');
                $rate = data_get($receiptInfo, 'unit_price');
                if (!is_numeric($rate)) {
                    $rate = (float) $item->amount;
                }
                $vendorName = data_get($receiptInfo, 'vendor_name')
                    ?? data_get($receiptInfo, 'vendor')
                    ?? data_get($receiptInfo, 'paid_to')
                    ?? 'Eshaka Wijaya Logistics';
                $amount = (float) $rate * $quantity;

                return [
                    'id' => $item->id,
                    'description' => $item->description,
                    'quantity' => (float) $quantity,
                    'unit' => $unit,
                    'rate' => (float) $rate,
                    'currency' => $currency,
                    'amount' => $amount,
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

            $component = null;
            if ($itemRef && preg_match('/ap_component_(\d+)/', $itemRef, $matches)) {
                $component = AccountPayableComponent::find((int) $matches[1]);
                $reimbursementId = data_get($component?->related_items, 'reimbursement_item_id');
                if ($reimbursementId) {
                    $reimbursement = ReimbursementItem::find((int) $reimbursementId);
                }

                if (!$reimbursement && $component) {
                    $reimbursement = ReimbursementItem::query()
                        ->where('sales_order_id', $invoice->sales_order_id)
                        ->where('receipt_info->component_id', $component->id)
                        ->first();
                }
            }

            if ($itemRef && preg_match('/reimb(?:ursement)?[_-]?(\d+)/', $itemRef, $matches)) {
                $reimbursement = ReimbursementItem::find((int) $matches[1]);
            }

            if (!$reimbursement) {
                $reimbursement = ReimbursementItem::firstOrNew([
                    'invoice_id' => $invoice->id,
                    'description' => $item->description,
                    'amount' => $item->rate ?? $item->amount,
                    'sales_order_id' => $invoice->sales_order_id,
                ]);
            }

            $isExistingReimbursement = $reimbursement->exists;

            if (!$isExistingReimbursement) {
                $reimbursement->fill([
                    'category' => $reimbursement->category ?? 'general',
                    'created_by' => $reimbursement->created_by ?? $defaultUserId,
                ]);
            }

            if ($component && $reimbursement) {
                $receiptInfo = $reimbursement->receipt_info ?? [];
                if (!is_array($receiptInfo)) {
                    $receiptInfo = json_decode($receiptInfo, true) ?: [];
                }

                if (empty($receiptInfo['component_id'])) {
                    $receiptInfo['component_id'] = $component->id;
                }
                if (empty($receiptInfo['source'])) {
                    $receiptInfo['source'] = 'account_payable_component';
                }

                $reimbursement->receipt_info = empty($receiptInfo) ? null : $receiptInfo;
            }

            $quantity = is_numeric($item->quantity) && (float) $item->quantity > 0 ? (float) $item->quantity : 1;
            $unit = is_string($item->unit) && trim($item->unit) !== '' ? trim($item->unit) : null;
            $rate = is_numeric($item->rate) ? (float) $item->rate : 0.0;
            if ($rate <= 0 && $quantity > 0) {
                $rate = (float) $item->amount / $quantity;
            }

            $receiptInfo = $reimbursement->receipt_info ?? [];
            if (!is_array($receiptInfo)) {
                $receiptInfo = json_decode($receiptInfo, true) ?: [];
            }
            $receiptInfo['quantity'] = $quantity;
            $receiptInfo['unit'] = $unit ?? ($receiptInfo['unit'] ?? null);
            $receiptInfo['unit_price'] = $rate;
            $receiptInfo['currency'] = $item->currency ?? ($receiptInfo['currency'] ?? 'IDR');

            $reimbursement->sales_order_id = $invoice->sales_order_id;
            $reimbursement->invoice_id = $invoice->id;

            if (!$isExistingReimbursement) {
                $reimbursement->quantity = $quantity;
                $reimbursement->unit = $unit;
                $reimbursement->amount = $rate;

                $lineTotal = $rate * $quantity;
                $paidAmount = min($lineTotal, max(0, (float) ($reimbursement->customer_paid_amount ?? 0)));
                $outstandingAmount = max(0, $lineTotal - $paidAmount);

                $reimbursement->customer_paid_amount = $paidAmount;
                $reimbursement->customer_outstanding_amount = $outstandingAmount;
                $reimbursement->customer_payment_status = $outstandingAmount <= 0.01
                    ? 'paid'
                    : ($paidAmount > 0 ? 'partial' : 'outstanding');
            } else {
                // Reimbursement yang sudah ada harus tetap menyimpan nilai gross aslinya.
                // Invoice hanya menempel sebagai dokumen, bukan mengganti basis nilai item.
                $reimbursement->quantity = $reimbursement->quantity ?: $quantity;
                $reimbursement->unit = $reimbursement->unit ?: $unit;
            }

            $reimbursement->receipt_info = empty($receiptInfo) ? null : $receiptInfo;
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
     * Examples: 2.500 -> 2500, 2.500,50 -> 2500.50, 2500,50 -> 2500.50, 45.67 -> 45.67
     */
    private function normalizeIndonesianNumber($value)
    {
        if ($value === null || $value === '') {
            return $value;
        }

        if (is_int($value) || is_float($value)) {
            return (string) $value;
        }

        $value = str_replace(' ', '', trim((string) $value));
        $hasDot = strpos($value, '.') !== false;
        $hasComma = strpos($value, ',') !== false;

        if ($hasDot && $hasComma) {
            $lastDot = strrpos($value, '.');
            $lastComma = strrpos($value, ',');

            // Indonesian style: 1.234,56
            if ($lastComma > $lastDot) {
                return str_replace(',', '.', str_replace('.', '', $value));
            } else {
                // International style: 1,234.56
                return str_replace(',', '', $value);
            }
        }

        if ($hasComma) {
            $parts = explode(',', $value);
            if (count($parts) === 2 && strlen($parts[1]) <= 2) {
                return str_replace(',', '.', $value);
            }

            return str_replace(',', '', $value);
        }

        if ($hasDot) {
            $parts = explode('.', $value);

            if (count($parts) === 2) {
                $leftPart = $parts[0];
                $rightPart = $parts[1];

                if (strlen($rightPart) <= 2) {
                    return $value;
                }

                if (strlen($rightPart) === 3 && strlen($leftPart) <= 3) {
                    return str_replace('.', '', $value);
                }

                return $value;
            }

            $isThousandGrouping = true;
            for ($i = 1; $i < count($parts); $i++) {
                if (strlen($parts[$i]) !== 3) {
                    $isThousandGrouping = false;
                    break;
                }
            }

            return $isThousandGrouping ? str_replace('.', '', $value) : $value;
        }

        return $value;
    }

    private function isReimbursementPaidByCustomer(ReimbursementItem $reimbursementItem): bool
    {
        $customerStatus = strtolower(trim((string) ($reimbursementItem->customer_payment_status ?? '')));
        if ($customerStatus === 'paid') {
            return true;
        }

        if (in_array($customerStatus, ['partial', 'outstanding'], true)) {
            return false;
        }

        $lineTotal = method_exists($reimbursementItem, 'getLineTotal')
            ? (float) $reimbursementItem->getLineTotal()
            : ((float) ($reimbursementItem->amount ?? 0) * ((float) ($reimbursementItem->quantity ?? 0) > 0 ? (float) $reimbursementItem->quantity : 1));

        $customerOutstanding = $reimbursementItem->customer_outstanding_amount;
        if ($customerOutstanding !== null) {
            return (float) $customerOutstanding <= 0.01;
        }

        $customerPaid = (float) ($reimbursementItem->customer_paid_amount ?? 0);
        return $lineTotal > 0 && $customerPaid >= ($lineTotal - 0.01);
    }

    private function findReimbursementItemFromRef(?string $itemRef): ?ReimbursementItem
    {
        $itemRef = strtolower(trim((string) $itemRef));
        if ($itemRef === '') {
            return null;
        }

        if (!preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $itemRef, $matches)) {
            return null;
        }

        $reimbursementId = (int) ($matches[1] ?? 0);
        if ($reimbursementId <= 0) {
            return null;
        }

        return ReimbursementItem::find($reimbursementId);
    }

    private function getPreInvoiceReceivable(SalesOrder $salesOrder): ?array
    {
        $receivable = $salesOrder->accountReceivables
            ? $salesOrder->accountReceivables
                ->first(function ($item) {
                    return $item->invoice_id === null && !$item->is_opening;
                })
            : null;

        if (!$receivable) {
            $receivable = AccountReceivable::with('components')
                ->where('sales_order_id', $salesOrder->id)
                ->whereNull('invoice_id')
                ->where('is_opening', false)
                ->first();
        }

        if (!$receivable) {
            return null;
        }

        $receivable->loadMissing('components');

        return [
            'id' => $receivable->id,
            'status' => $receivable->status,
            'invoice_amount' => (float) $receivable->invoice_amount,
            'paid_amount' => (float) $receivable->paid_amount,
            'outstanding_amount' => (float) $receivable->outstanding_amount,
            'components' => $receivable->components->map(function ($component) {
                return [
                    'id' => $component->id,
                    'component_type' => $component->component_type,
                    'description' => $component->description,
                    'amount' => (float) $component->amount,
                    'paid_amount' => (float) $component->paid_amount,
                    'outstanding_amount' => (float) $component->outstanding_amount,
                    'status' => $component->status,
                ];
            })->values(),
        ];
    }

    /**
     * Auto-generate operational debt per vendor from invoice operational costs and reimbursement
     */
    private function autoGenerateOperationalDebt(Invoice $invoice)
    {
        try {
            $invoice->loadMissing(['salesOrder.reimbursementItems', 'items', 'items.vendor']);
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
                    $this->syncInvoiceOperationalCostsToPayables($invoice);
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

    private function syncInvoiceOperationalCostsToPayables(Invoice $invoice): void
    {
        if (!$invoice->sales_order_id) {
            return;
        }

        $invoice->loadMissing(['items.vendor', 'salesOrder']);
        $salesOrder = $invoice->salesOrder;
        if (!$salesOrder) {
            return;
        }

        $eligibleItems = $invoice->items
            ->filter(function (InvoiceItem $item) {
                if (($item->item_type ?? null) !== 'operational_cost') {
                    return false;
                }

                if ((float) ($item->amount ?? 0) <= 0) {
                    return false;
                }

                $itemRef = strtolower(trim((string) ($item->item_ref ?? '')));
                if ($itemRef !== '') {
                    if (str_starts_with($itemRef, 'cogs_vendor_')) {
                        return false;
                    }
                    if (str_starts_with($itemRef, 'other_cost_')) {
                        return false;
                    }
                    if (str_starts_with($itemRef, 'ap_component_')) {
                        return false;
                    }
                }

                return true;
            })
            ->values();

        $activeItemIds = $eligibleItems
            ->map(fn (InvoiceItem $item) => (int) $item->id)
            ->values()
            ->all();

        DB::transaction(function () use ($invoice, $salesOrder, $eligibleItems, $activeItemIds): void {
            $payables = AccountPayable::query()
                ->with('components')
                ->where('sales_order_id', $salesOrder->id)
                ->get();
            $payablesToSync = $payables->keyBy('id');

            // Hapus komponen invoice-operational yang sudah tidak ada di invoice (hanya jika belum paid).
            foreach ($payables as $payable) {
                foreach ($payable->components as $component) {
                    $related = is_array($component->related_items) ? $component->related_items : [];
                    $source = (string) ($related['source'] ?? '');
                    $componentInvoiceId = (int) ($related['invoice_id'] ?? 0);
                    $componentInvoiceItemId = (int) ($related['invoice_item_id'] ?? 0);

                    if ($source !== 'invoice_operational_cost') {
                        continue;
                    }

                    if ($componentInvoiceId !== (int) $invoice->id) {
                        continue;
                    }

                    if ($componentInvoiceItemId > 0 && in_array($componentInvoiceItemId, $activeItemIds, true)) {
                        continue;
                    }

                    if (($component->status ?? null) === 'paid') {
                        continue;
                    }

                    $component->delete();
                }
            }

            if ($eligibleItems->isEmpty()) {
                // Tetap sync total AP setelah cleanup stale.
                foreach ($payables as $payable) {
                    $payable->syncComponents();
                }
                return;
            }

            foreach ($eligibleItems as $item) {
                $vendorId = is_numeric($item->vendor_id) ? (int) $item->vendor_id : null;
                $vendorName = $item->vendor?->nama_vendor
                    ?? ($vendorId ? null : 'Divisi Operational');

                $payableQuery = AccountPayable::query()
                    ->where('sales_order_id', $salesOrder->id);

                if ($vendorId !== null) {
                    $payableQuery->where('vendor_id', $vendorId);
                } else {
                    $payableQuery->whereNull('vendor_id')
                        ->where('vendor_name', $vendorName);
                }

                $payable = $payableQuery->first();

                if (!$payable) {
                    $payable = AccountPayable::create([
                        'sales_order_id' => $salesOrder->id,
                        'vendor_id' => $vendorId,
                        'vendor_name' => $vendorName ?? 'Divisi Operational',
                        'vendor_invoice_number' => 'INV-' . $invoice->invoice_number,
                        'vendor_invoice_date' => $invoice->invoice_date,
                        'service_description' => $item->description ?: 'Operational Cost',
                        'service_remarks' => 'Auto-synced from invoice operational costs',
                        'amount' => 0,
                        'paid_amount' => 0,
                        'outstanding_amount' => 0,
                        'status' => 'unpaid',
                        'payment_due_date' => $invoice->invoice_date ? Carbon::parse($invoice->invoice_date)->addDays(30) : null,
                        'vendor_bank_account' => $item->vendor?->nomor_rekening,
                        'vendor_account_name' => $item->vendor?->nama_rekening,
                        'created_by' => auth()->id() ?? $invoice->created_by ?? $salesOrder->created_by ?? 1,
                    ]);
                    $payable->load('components');
                    $payablesToSync->put($payable->id, $payable);
                } else {
                    if (!$payable->service_description) {
                        $payable->service_description = $item->description ?: $payable->service_description;
                    }
                    $payable->save();
                    $payable->load('components');
                }

                $itemId = (int) $item->id;
                $lookupRef = 'invoice_operational_item_' . $itemId;
                $existingComponent = $payable->components->first(function ($component) use ($itemId) {
                    $related = is_array($component->related_items) ? $component->related_items : [];
                    return ($related['source'] ?? null) === 'invoice_operational_cost'
                        && (int) ($related['invoice_item_id'] ?? 0) === $itemId;
                });

                $amount = (float) $item->amount;
                $relatedItems = [
                    'source' => 'invoice_operational_cost',
                    'invoice_id' => $invoice->id,
                    'invoice_number' => $invoice->invoice_number,
                    'invoice_item_id' => $item->id,
                    'item_ref' => $item->item_ref,
                    'lookup_ref' => $lookupRef,
                ];

                if ($existingComponent) {
                    $existingComponent->description = $item->description ?: $existingComponent->description;
                    $existingComponent->amount = $amount;
                    $existingComponent->recipient_name = $vendorName ?? $payable->vendor_name;
                    $existingComponent->vendor_id = $vendorId;
                    $existingComponent->related_items = $relatedItems;
                    $existingComponent->paid_amount = min((float) $existingComponent->paid_amount, $amount);
                    $existingComponent->outstanding_amount = max(0, $amount - (float) $existingComponent->paid_amount);
                    $existingComponent->status = $existingComponent->outstanding_amount <= 0.01
                        ? 'paid'
                        : ((float) $existingComponent->paid_amount > 0 ? 'partial' : 'unpaid');
                    $existingComponent->due_date = $payable->payment_due_date;
                    $existingComponent->save();
                } else {
                    $payable->components()->create([
                        'component_type' => 'operational_cost',
                        'description' => $item->description ?: 'Operational Cost',
                        'amount' => $amount,
                        'paid_amount' => 0,
                        'outstanding_amount' => $amount,
                        'status' => 'unpaid',
                        'due_date' => $payable->payment_due_date,
                        'recipient_name' => $vendorName ?? $payable->vendor_name,
                        'vendor_id' => $vendorId,
                        'related_items' => $relatedItems,
                    ]);
                }

            }

            // Pastikan semua payable yang terdampak cleanup juga ikut tersinkron.
            foreach ($payablesToSync as $payableToSync) {
                $payableToSync->refresh()->syncComponents();
            }
        });
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
                $buyingRate = floatval($vendor['buying_amount'] ?? 0);

                // Only create if buying amount > 0
                if ($buyingRate > 0) {
                    $description = ($vendor['description'] ?? 'Service') . ' - Buying Cost (COGS)';
                    $vendorId = !empty($vendor['vendor_id']) && is_numeric($vendor['vendor_id'])
                        ? (int)$vendor['vendor_id']
                        : null;
                    $quantityInfo = $this->resolveItemQuantity($vendor, 1);
                    $quantity = $quantityInfo['quantity'];
                    $hasQuantity = $quantityInfo['hasQuantity'];
                    $unit = $this->normalizeItemUnit($vendor, 'SET');
                    $buyingAmount = $hasQuantity ? $buyingRate * $quantity : $buyingRate;

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
            $quantityInfo = $this->resolveItemQuantity($vendor, 1);
            $quantity = $quantityInfo['quantity'];
            $hasQuantity = $quantityInfo['hasQuantity'];
            $unit = $this->normalizeItemUnit($vendor, 'SET');

            // Billable (selling)
            $sellingRate = floatval($vendor['selling_amount'] ?? 0);
            if ($sellingRate > 0) {
                $sellingAmount = $hasQuantity ? $sellingRate * $quantity : $sellingRate;
                $billRef = 'vendor_' . ($rawVendorId !== null ? $rawVendorId : $index);
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => $description,
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
            if ($buyingRate > 0) {
                $buyingAmount = $hasQuantity ? $buyingRate * $quantity : $buyingRate;
                $cogsRef = 'cogs_vendor_' . ($rawVendorId !== null ? $rawVendorId : $index);
                InvoiceItem::create([
                    'invoice_id' => $invoice->id,
                    'description' => $description . ' - Buying Cost (COGS)',
                    'quantity' => $quantity,
                    'unit' => $unit,
                    'rate' => $buyingRate,
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

    private function cleanupAdditionalInvoiceAutoSyncedItems(Invoice $invoice): void
    {
        $deletedCount = InvoiceItem::where('invoice_id', $invoice->id)
            ->where(function ($q) {
                $q->where('item_ref', 'like', 'vendor_%')
                    ->orWhere('item_ref', 'like', 'cogs_vendor_%');
            })
            ->delete();

        if ($deletedCount > 0) {
            // Recalculate totals after removing rows that should never exist on additional invoices.
            $invoice->load('items');
            $invoice->calculateTotals();
        }
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
