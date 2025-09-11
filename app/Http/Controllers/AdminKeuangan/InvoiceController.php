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
use PhpOffice\PhpWord\TemplateProcessor;

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
            'filters' => $request->only(['status', 'search', 'date_from', 'date_to']),
            'stats' => $stats
        ]);
    }

    public function create()
    {
        $salesOrders = SalesOrder::where('status', 'approved')
            ->whereDoesntHave('invoices')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/Invoices/Create', [
            'salesOrders' => $salesOrders
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sales_order_id' => 'required|exists:sales_orders,id',
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

        $salesOrder = SalesOrder::findOrFail($validated['sales_order_id']);
        
        $invoiceDate = Carbon::parse($validated['invoice_date']);
        $dueDate = $invoiceDate->copy()->addDays($validated['term_days']);

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
            'invoice_number' => Invoice::generateInvoiceNumber(),
            'sales_order_id' => $salesOrder->id,
            'customer_id' => $customerId,
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
        try {
            // Load relationships
            $invoice->load(['salesOrder', 'customer', 'items']);
            
            // Check if template exists
            $templatePath = storage_path('templates/invoice_template.docx');
            
            if (!file_exists($templatePath)) {
                // Fallback to old DomPDF system if template not found
                $pdf = PDF::loadView('invoices.pdf', compact('invoice'));
                return $pdf->download($invoice->invoice_number . '.pdf');
            }

            // Load template
            $templateProcessor = new TemplateProcessor($templatePath);

            // Replace placeholders
            $this->replaceWordPlaceholders($templateProcessor, $invoice);

            // Handle table items
            $this->processTableItems($templateProcessor, $invoice);

            // Generate unique filename
            $filename = 'invoice_' . $invoice->invoice_number . '_' . time() . '.docx';
            $tempPath = storage_path('temp/generated-invoices/' . $filename);

            // Ensure temp directory exists
            if (!is_dir(dirname($tempPath))) {
                mkdir(dirname($tempPath), 0755, true);
            }

            // Save processed document
            $templateProcessor->saveAs($tempPath);

            // Return Word document directly
            return response()->download($tempPath, $invoice->invoice_number . '.docx')
                ->deleteFileAfterSend(true);

        } catch (\Exception $e) {
            // Fallback to old DomPDF system on error
            \Log::error('Word to PDF generation failed: ' . $e->getMessage());
            
            $pdf = PDF::loadView('invoices.pdf', compact('invoice'));
            return $pdf->download($invoice->invoice_number . '.pdf');
        }
    }

    private function replaceWordPlaceholders(TemplateProcessor $templateProcessor, Invoice $invoice)
    {
        // Replace static data with dynamic values based on template content
        
        // Customer codes and names - match existing template content
        $templateProcessor->setValue('CPP-MRS79', $invoice->customer->customer_code ?? 'CPP-MRS79');
        $templateProcessor->setValue('PT CITRA PERDANA PUTRA', strtoupper($invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'PT CITRA PERDANA PUTRA'));
        
        // Try both placeholder formats
        $templateProcessor->setValue('CUSTOMER_CODE', $invoice->customer->customer_code ?? 'N/A');
        $templateProcessor->setValue('CUSTOMER_NAME', strtoupper($invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'N/A'));
        $templateProcessor->setValue('CUSTOMER_ADDRESS', strtoupper($invoice->customer->company_address ?? $invoice->customer->invoice_address ?? 'N/A'));
        $templateProcessor->setValue('CUSTOMER_CITY', strtoupper($invoice->customer->city ?? 'N/A'));
        $templateProcessor->setValue('POSTAL_CODE', $invoice->customer->postal_code ?? 'N/A');

        // Invoice details - match template static values
        $templateProcessor->setValue('EWL2503069011-R', $invoice->invoice_number);
        $templateProcessor->setValue('14-3-25', $invoice->invoice_date->format('d-n-y'));
        $templateProcessor->setValue('30 DAYS', $invoice->term_days . ' DAYS');
        $templateProcessor->setValue('0173', $invoice->salesOrder->aju ?? '0173');
        
        // Also try placeholder format
        $templateProcessor->setValue('INVOICE_NUMBER', $invoice->invoice_number);
        $templateProcessor->setValue('INVOICE_DATE', $invoice->invoice_date->format('d-n-y'));
        $templateProcessor->setValue('TERM_DAYS', $invoice->term_days . ' DAYS');
        $templateProcessor->setValue('AJU_NO', $invoice->salesOrder->aju ?? 'N/A');

        // Shipment details - match template static values
        $templateProcessor->setValue('INNER MONGOLIA EPPEN BIOTECH', strtoupper($invoice->shipper ?? $invoice->salesOrder->shipper ?? 'INNER MONGOLIA EPPEN BIOTECH'));
        $templateProcessor->setValue('285517558', $invoice->awb_bl_no ?? $invoice->salesOrder->bl_awb ?? '285517558');
        $templateProcessor->setValue('69276,0000KGS', $invoice->gross_weight ? number_format($invoice->gross_weight, 4, ',', ',') . 'KGS' : '69276,0000KGS');
        $templateProcessor->setValue('2760 BAG', $invoice->no_of_packages ? $invoice->no_of_packages . ' BAG' : '2760 BAG');
        $templateProcessor->setValue('3X20', $invoice->container_size ?? '3X20');
        $templateProcessor->setValue('HOLSATIA', strtoupper($invoice->vessel ?? $invoice->salesOrder->vessel ?? 'HOLSATIA'));
        $templateProcessor->setValue('507S', $invoice->flight_voy ?? '507S');
        $templateProcessor->setValue('XINGANG / SEMARANG', strtoupper($invoice->pol_pod ?? ($invoice->salesOrder->pol ?? 'XINGANG') . ' / ' . ($invoice->salesOrder->pod ?? 'SEMARANG')));
        $templateProcessor->setValue('XINGANG , CHINA', strtoupper($invoice->origin ?? ($invoice->salesOrder->pol ?? 'XINGANG') . ' , CHINA'));
        $templateProcessor->setValue('SEMARANG', strtoupper($invoice->destination ?? $invoice->salesOrder->pod ?? 'SEMARANG'));
        
        // Also try placeholder format
        $templateProcessor->setValue('SHIPPER', strtoupper($invoice->shipper ?? $invoice->salesOrder->shipper ?? 'N/A'));
        $templateProcessor->setValue('CONSIGNEE', strtoupper($invoice->consignee ?? $invoice->customer->company_name ?? $invoice->salesOrder->customer ?? 'N/A'));
        $templateProcessor->setValue('AWB_BL_NO', $invoice->awb_bl_no ?? $invoice->salesOrder->bl_awb ?? 'N/A');
        $templateProcessor->setValue('VESSEL', strtoupper($invoice->vessel ?? $invoice->salesOrder->vessel ?? 'N/A'));

        // Dates - match template static values
        $etd = isset($invoice->etd) ? $invoice->etd->format('d-m-y') : '14-02-25';
        $eta = isset($invoice->eta) ? $invoice->eta->format('d-m-y') : ($invoice->salesOrder->eta ? $invoice->salesOrder->eta->format('d-m-y') : '06-05-25');
        $templateProcessor->setValue('14-02-25 / 06-05-25', $etd . ' / ' . $eta);
        $templateProcessor->setValue('ETD_ETA', $etd . ' / ' . $eta);

        // Container numbers - match template static values
        $containerNo = $invoice->salesOrder->container_no ?? $invoice->container_no ?? 'MSKU2934199';
        if ($containerNo && $containerNo != 'N/A') {
            $containers = explode("\n", $containerNo);
            $templateProcessor->setValue('MSKU2934199', trim($containers[0] ?? 'MSKU2934199'));
            $templateProcessor->setValue('MSKU5012720', trim($containers[1] ?? 'MSKU5012720'));
            $templateProcessor->setValue('MSKU3839977', trim($containers[2] ?? 'MSKU3839977'));
        }

        // Totals - match template static values  
        $subtotal = number_format($invoice->subtotal ?? $invoice->total ?? 2289828, 2);
        $total = number_format($invoice->total ?? 2289828, 2);
        $templateProcessor->setValue('2.289.828,00', $subtotal);
        $templateProcessor->setValue('SUBTOTAL', $subtotal);
        $templateProcessor->setValue('TOTAL', $total);
    }

    private function processTableItems(TemplateProcessor $templateProcessor, Invoice $invoice)
    {
        $items = $invoice->items;

        if ($items && $items->count() > 0) {
            // Try to clone the table row for each item (handle if placeholder doesn't exist)
            try {
                $templateProcessor->cloneRow('ITEM_DESC', $items->count());
                
                foreach ($items as $index => $item) {
                    $rowNum = $index + 1;
                    $templateProcessor->setValue("ITEM_DESC#$rowNum", strtoupper($item->description));
                    $templateProcessor->setValue("ITEM_QTY#$rowNum", number_format($item->quantity, 0));
                    $templateProcessor->setValue("ITEM_UNIT#$rowNum", strtoupper($item->unit));
                    $templateProcessor->setValue("ITEM_RATE#$rowNum", number_format($item->rate, 2));
                    $templateProcessor->setValue("ITEM_CURRENCY#$rowNum", $item->currency);
                    $templateProcessor->setValue("ITEM_AMOUNT#$rowNum", $item->amount == 0 ? '-' : number_format($item->amount, 2));
                }
            } catch (\Exception $e) {
                // If cloneRow fails, replace static data in template with real data
                $firstItem = $items->first();
                if ($firstItem) {
                    // Replace static table data with dynamic data
                    $templateProcessor->setValue('DO CHARGES', strtoupper($firstItem->description));
                    $templateProcessor->setValue('LOLO', strtoupper($items->skip(1)->first()->description ?? 'LOLO'));
                    
                    // Also try placeholder format
                    $templateProcessor->setValue('ITEM_DESC', strtoupper($firstItem->description));
                    $templateProcessor->setValue('ITEM_QTY', number_format($firstItem->quantity, 0));
                    $templateProcessor->setValue('ITEM_UNIT', strtoupper($firstItem->unit ?? 'SET'));
                    $templateProcessor->setValue('ITEM_RATE', number_format($firstItem->rate, 2));
                    $templateProcessor->setValue('ITEM_CURRENCY', $firstItem->currency ?? 'IDR');
                    $templateProcessor->setValue('ITEM_AMOUNT', $firstItem->amount == 0 ? '-' : number_format($firstItem->amount, 2));
                }
            }
        }
    }

    private function convertToPdf($docxPath)
    {
        try {
            // Check if LibreOffice is available
            $libreOfficePath = $this->getLibreOfficePath();
            
            if (!$libreOfficePath) {
                return null; // LibreOffice not found
            }

            $outputDir = dirname($docxPath);
            $pdfPath = str_replace('.docx', '.pdf', $docxPath);

            // Convert using LibreOffice headless
            $command = sprintf(
                '"%s" --headless --convert-to pdf --outdir "%s" "%s"',
                $libreOfficePath,
                $outputDir,
                $docxPath
            );

            exec($command, $output, $returnVar);

            if ($returnVar === 0 && file_exists($pdfPath)) {
                return $pdfPath;
            }

            return null;
        } catch (\Exception $e) {
            \Log::error('PDF Conversion Error: ' . $e->getMessage());
            return null;
        }
    }

    private function getLibreOfficePath()
    {
        // Common LibreOffice paths
        $possiblePaths = [
            'C:\Program Files\LibreOffice\program\soffice.exe',  // Windows
            'C:\Program Files (x86)\LibreOffice\program\soffice.exe',  // Windows x86
            '/usr/bin/libreoffice',  // Linux
            '/Applications/LibreOffice.app/Contents/MacOS/soffice',  // macOS
            'soffice',  // If in PATH
        ];

        foreach ($possiblePaths as $path) {
            if (file_exists($path)) {
                return $path;
            }
        }

        // Try to find in PATH
        exec('where soffice', $output, $returnVar);
        if ($returnVar === 0 && !empty($output)) {
            return trim($output[0]);
        }

        exec('which libreoffice', $output, $returnVar);
        if ($returnVar === 0 && !empty($output)) {
            return trim($output[0]);
        }

        return null;
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
}