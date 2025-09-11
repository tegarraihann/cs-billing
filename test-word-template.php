<?php
// Simple test script untuk Word to PDF

require_once 'vendor/autoload.php';

use PhpOffice\PhpWord\TemplateProcessor;

echo "=== TESTING WORD TO PDF SYSTEM ===\n\n";

// 1. Check if PhpWord is loaded
echo "✅ PhpOffice\\PhpWord loaded\n";

// 2. Check template directory
$templateDir = 'storage/templates/';
echo "📁 Template directory: " . $templateDir . "\n";

if (!is_dir($templateDir)) {
    mkdir($templateDir, 0755, true);
    echo "✅ Created template directory\n";
}

// 3. Check if template exists
$templatePath = $templateDir . 'invoice_template.docx';
echo "📄 Looking for template: " . $templatePath . "\n";

if (file_exists($templatePath)) {
    echo "✅ Template found!\n";
    
    // 4. Try to load template
    try {
        $templateProcessor = new TemplateProcessor($templatePath);
        echo "✅ Template loaded successfully\n";
        
        // 5. Test simple replacement
        $templateProcessor->setValue('INVOICE_NUMBER', 'TEST-001');
        $templateProcessor->setValue('CUSTOMER_NAME', 'PT TEST CUSTOMER');
        $templateProcessor->setValue('TOTAL', '1,000,000.00');
        
        // 6. Save test file
        $testOutput = 'storage/temp/test-output.docx';
        if (!is_dir('storage/temp')) {
            mkdir('storage/temp', 0755, true);
        }
        
        $templateProcessor->saveAs($testOutput);
        echo "✅ Test file saved: " . $testOutput . "\n";
        
        if (file_exists($testOutput)) {
            echo "✅ Test SUCCESSFUL! File size: " . filesize($testOutput) . " bytes\n";
        }
        
    } catch (Exception $e) {
        echo "❌ Error: " . $e->getMessage() . "\n";
    }
    
} else {
    echo "❌ Template not found!\n";
    echo "📋 Please create template with these placeholders:\n";
    echo "   - \${INVOICE_NUMBER}\n";
    echo "   - \${CUSTOMER_NAME}\n";
    echo "   - \${TOTAL}\n";
    echo "   - \${ITEM_DESC} (for table rows)\n";
}

echo "\n=== ACCESS TEST PAGE ===\n";
echo "🌐 URL: http://your-domain/admin-keuangan/invoices-word-test\n";
echo "👤 Login as: admin_keuangan role\n";
echo "📤 Upload your .docx template\n";
echo "🧪 Test with existing invoice\n";

echo "\n=== TEMPLATE EXAMPLE ===\n";
echo "Create Word document with:\n";
echo "---\n";
echo "INVOICE: \${INVOICE_NUMBER}\n";
echo "CUSTOMER: \${CUSTOMER_NAME}\n";
echo "DATE: \${INVOICE_DATE}\n";
echo "TOTAL: \${TOTAL}\n";
echo "\n";
echo "Items Table:\n";
echo "| Description | Qty | Rate | Amount |\n";
echo "| \${ITEM_DESC} | \${ITEM_QTY} | \${ITEM_RATE} | \${ITEM_AMOUNT} |\n";
echo "---\n";
?>