<?php
// Script untuk mengecek placeholder yang ada di template Word

require_once 'vendor/autoload.php';

use PhpOffice\PhpWord\IOFactory;

echo "=== CHECKING TEMPLATE PLACEHOLDERS ===\n\n";

$templatePath = 'storage/templates/invoice_template.docx';

if (!file_exists($templatePath)) {
    echo "❌ Template not found: $templatePath\n";
    exit;
}

try {
    // Load the document
    $phpWord = IOFactory::load($templatePath);
    
    echo "✅ Template loaded successfully\n";
    echo "📄 File: $templatePath\n";
    echo "📊 File size: " . filesize($templatePath) . " bytes\n\n";
    
    // Get all sections
    $sections = $phpWord->getSections();
    echo "📋 Found " . count($sections) . " section(s)\n\n";
    
    $allText = '';
    $placeholderPattern = '/\${[^}]+}/';
    
    foreach ($sections as $sectionIndex => $section) {
        echo "--- Section " . ($sectionIndex + 1) . " ---\n";
        
        // Get all elements in section
        $elements = $section->getElements();
        
        foreach ($elements as $element) {
            if (method_exists($element, 'getText')) {
                $text = $element->getText();
                if ($text) {
                    $allText .= $text . ' ';
                }
            }
            
            // Check for tables
            if ($element instanceof \PhpOffice\PhpWord\Element\Table) {
                echo "📋 Found table with " . count($element->getRows()) . " rows\n";
                
                foreach ($element->getRows() as $rowIndex => $row) {
                    foreach ($row->getCells() as $cellIndex => $cell) {
                        foreach ($cell->getElements() as $cellElement) {
                            if (method_exists($cellElement, 'getText')) {
                                $cellText = $cellElement->getText();
                                if ($cellText) {
                                    $allText .= $cellText . ' ';
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    // Find all placeholders
    preg_match_all($placeholderPattern, $allText, $matches);
    $placeholders = array_unique($matches[0]);
    
    echo "🔍 Found Placeholders:\n";
    if (empty($placeholders)) {
        echo "❌ No placeholders found in template!\n";
        echo "📝 Template might not be using \${PLACEHOLDER} format\n\n";
        
        // Show sample text to help debug
        $sampleText = substr($allText, 0, 500);
        echo "📄 Sample content (first 500 chars):\n";
        echo "---\n";
        echo $sampleText;
        echo "\n---\n\n";
        
    } else {
        foreach ($placeholders as $placeholder) {
            echo "   ✅ $placeholder\n";
        }
        echo "\n";
    }
    
    // Check for common placeholders
    $expectedPlaceholders = [
        '${INVOICE_NUMBER}',
        '${CUSTOMER_NAME}', 
        '${CUSTOMER_CODE}',
        '${INVOICE_DATE}',
        '${TOTAL}',
        '${ITEM_DESC}',
        '${ITEM_QTY}',
        '${ITEM_RATE}',
        '${ITEM_AMOUNT}'
    ];
    
    echo "📊 Expected vs Found:\n";
    foreach ($expectedPlaceholders as $expected) {
        $found = in_array($expected, $placeholders);
        $status = $found ? "✅" : "❌";
        echo "   $status $expected " . ($found ? "(FOUND)" : "(MISSING)") . "\n";
    }
    
    echo "\n";
    
    if (in_array('${ITEM_DESC}', $placeholders)) {
        echo "✅ Template supports dynamic table items\n";
    } else {
        echo "⚠️  Template doesn't support dynamic table (no \${ITEM_DESC} found)\n";
        echo "💡 Controller will use fallback mode\n";
    }
    
    echo "\n=== RECOMMENDATION ===\n";
    if (empty($placeholders)) {
        echo "🔧 Add placeholders to your Word template:\n";
        echo "   1. Open template in Word\n";
        echo "   2. Add placeholders like: \${INVOICE_NUMBER}, \${CUSTOMER_NAME}\n";
        echo "   3. For tables, add: \${ITEM_DESC}, \${ITEM_QTY}, etc.\n";
    } else {
        echo "✅ Template has placeholders and should work\n";
        echo "🚀 Ready for testing!\n";
    }
    
} catch (Exception $e) {
    echo "❌ Error reading template: " . $e->getMessage() . "\n";
}
?>