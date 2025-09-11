<?php
// Test dengan invoice real dari database

require_once 'vendor/autoload.php';
require_once 'bootstrap/app.php';

use PhpOffice\PhpWord\TemplateProcessor;
use App\Models\Invoice;

echo "=== TESTING WITH REAL INVOICE DATA ===\n\n";

// Load Laravel app
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);

try {
    // Get first invoice
    $invoice = Invoice::with(['customer', 'salesOrder', 'items'])->first();
    
    if (!$invoice) {
        echo "❌ No invoice found in database\n";
        echo "📋 Please create an invoice first in the admin panel\n";
        exit;
    }
    
    echo "✅ Found Invoice: " . $invoice->invoice_number . "\n";
    echo "📊 Customer: " . ($invoice->customer->company_name ?? 'N/A') . "\n";
    echo "🛍️  Items: " . $invoice->items->count() . "\n";
    echo "💰 Total: " . number_format($invoice->total ?? 0, 2) . "\n\n";
    
    // Load template
    $templatePath = 'storage/templates/invoice_template.docx';
    $templateProcessor = new TemplateProcessor($templatePath);
    
    // Replace basic placeholders
    $templateProcessor->setValue('INVOICE_NUMBER', $invoice->invoice_number);
    $templateProcessor->setValue('CUSTOMER_NAME', strtoupper($invoice->customer->company_name ?? 'N/A'));
    $templateProcessor->setValue('CUSTOMER_CODE', $invoice->customer->customer_code ?? 'N/A');
    $templateProcessor->setValue('INVOICE_DATE', $invoice->invoice_date->format('d-n-y'));
    $templateProcessor->setValue('TERM_DAYS', $invoice->term_days . ' DAYS');
    $templateProcessor->setValue('TOTAL', number_format($invoice->total ?? 0, 2));
    
    echo "✅ Basic placeholders replaced\n";
    
    // Handle items table
    if ($invoice->items && $invoice->items->count() > 0) {
        // Try to clone row for items
        try {
            $templateProcessor->cloneRow('ITEM_DESC', $invoice->items->count());
            
            foreach ($invoice->items as $index => $item) {
                $rowNum = $index + 1;
                $templateProcessor->setValue("ITEM_DESC#$rowNum", strtoupper($item->description));
                $templateProcessor->setValue("ITEM_QTY#$rowNum", number_format($item->quantity, 0));
                $templateProcessor->setValue("ITEM_RATE#$rowNum", number_format($item->rate, 2));
                $templateProcessor->setValue("ITEM_AMOUNT#$rowNum", number_format($item->amount, 2));
            }
            
            echo "✅ Items table cloned and populated\n";
        } catch (Exception $e) {
            echo "⚠️  Items table clone failed (might not have table in template): " . $e->getMessage() . "\n";
        }
    }
    
    // Save result
    $outputPath = 'storage/temp/real-invoice-test.docx';
    $templateProcessor->saveAs($outputPath);
    
    echo "✅ Real invoice test saved: " . $outputPath . "\n";
    echo "📄 File size: " . filesize($outputPath) . " bytes\n\n";
    
    echo "=== NEXT STEPS ===\n";
    echo "1. ✅ Template working with real data\n";
    echo "2. 🌐 Access web interface: http://localhost:8000/admin-keuangan/invoices-word-test\n";
    echo "3. 🧪 Test via browser with invoice ID: " . $invoice->id . "\n";
    echo "4. 📄 Direct test URL: http://localhost:8000/admin-keuangan/invoices-word-test/" . $invoice->id . "/word-pdf\n";
    
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
    echo "📋 Make sure database is connected and has invoice data\n";
}
?>