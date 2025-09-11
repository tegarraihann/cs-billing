<?php
// Simple script to check template content

$templatePath = 'storage/templates/invoice_template.docx';

if (!file_exists($templatePath)) {
    echo "Template not found!\n";
    exit;
}

// Try to extract XML content from DOCX
$zip = new ZipArchive();
if ($zip->open($templatePath) === TRUE) {
    echo "=== TEMPLATE CONTENT ANALYSIS ===\n\n";
    
    // Read document.xml (main content)
    $xmlString = $zip->getFromName('word/document.xml');
    
    if ($xmlString !== false) {
        // Clean up XML and extract text content
        $xml = new DOMDocument();
        $xml->loadXML($xmlString);
        
        // Get all text content
        $xpath = new DOMXPath($xml);
        $textNodes = $xpath->query('//w:t');
        
        $allText = '';
        foreach ($textNodes as $node) {
            $allText .= $node->nodeValue . ' ';
        }
        
        echo "📄 RAW TEXT CONTENT:\n";
        echo "---\n";
        echo substr($allText, 0, 1000) . "...\n"; // First 1000 chars
        echo "---\n\n";
        
        // Find potential placeholders
        preg_match_all('/\${[^}]+}/', $allText, $matches);
        $placeholders = array_unique($matches[0]);
        
        echo "🔍 PLACEHOLDERS FOUND:\n";
        if (empty($placeholders)) {
            echo "❌ No \${PLACEHOLDER} format found\n";
            
            // Check for other common placeholder patterns
            preg_match_all('/\[[^\]]+\]/', $allText, $brackets);
            preg_match_all('/\{[^}]+\}/', $allText, $braces);
            preg_match_all('/%[^%]+%/', $allText, $percents);
            
            if (!empty($brackets[0])) {
                echo "📋 Found [BRACKETS]: " . implode(', ', array_unique($brackets[0])) . "\n";
            }
            if (!empty($braces[0])) {
                echo "📋 Found {BRACES}: " . implode(', ', array_unique($braces[0])) . "\n";
            }
            if (!empty($percents[0])) {
                echo "📋 Found %PERCENTS%: " . implode(', ', array_unique($percents[0])) . "\n";
            }
            
        } else {
            foreach ($placeholders as $placeholder) {
                echo "   ✅ $placeholder\n";
            }
        }
        
        echo "\n";
        
    } else {
        echo "❌ Could not read document content\n";
    }
    
    $zip->close();
    
} else {
    echo "❌ Could not open template as ZIP file\n";
}

echo "\n=== INVOICE DATA STRUCTURE ===\n";
echo "Available data from invoice:\n";
echo "- invoice_number\n";
echo "- invoice_date\n";
echo "- customer->company_name\n";
echo "- customer->customer_code\n";
echo "- customer->company_address\n";
echo "- total\n";
echo "- subtotal\n";
echo "- term_days\n";
echo "- shipper\n";
echo "- consignee\n";
echo "- vessel\n";
echo "- awb_bl_no\n";
echo "- items->description\n";
echo "- items->quantity\n";
echo "- items->rate\n";
echo "- items->amount\n";
echo "- etc...\n";

echo "\n=== NEXT STEPS ===\n";
echo "1. Check template content above\n";
echo "2. Add placeholders to Word template\n";
echo "3. Update controller mapping\n";
echo "4. Test again\n";

?>