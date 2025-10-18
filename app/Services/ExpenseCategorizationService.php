<?php

namespace App\Services;

use App\Models\ExpenseTemplate;
use App\Models\SimpleCategoryRule;
use App\Models\PettyCashCategory;
use App\Models\PettyCashTransaction;

class ExpenseCategorizationService
{
    /**
     * Get all templates grouped by category for dropdown
     */
    public function getTemplatesByCategory(): array
    {
        return PettyCashCategory::with(['templates' => function($query) {
            $query->active()
                  ->ordered();
        }])
        ->whereHas('templates', function($query) {
            $query->active();
        })
        ->get()
        ->map(function($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'templates' => $category->templates->map(function($template) {
                    return [
                        'id' => $template->id,
                        'name' => $template->name,
                        'description' => $template->description,
                        'typical_amount_min' => $template->typical_amount_min,
                        'typical_amount_max' => $template->typical_amount_max,
                        'formatted_amount_range' => $template->formatted_amount_range,
                        'usage_count' => $template->usage_count,
                    ];
                })->toArray()
            ];
        })
        ->toArray();
    }

    /**
     * Process operational cost from invoice using template or manual input
     */
    public function processOperationalCost(array $costData): array
    {
        $result = [
            'description' => '',
            'category_id' => null,
            'category_name' => '',
            'template_id' => null,
            'amount' => $costData['amount'] ?? 0,
            'categorization_method' => 'manual',
            'auto_generated' => true,
            'confidence' => 'low'
        ];

        // Method 1: Template-based (highest priority)
        if (!empty($costData['template_id'])) {
            $templateResult = $this->processViaTemplate($costData['template_id'], $costData['amount']);
            if ($templateResult) {
                return array_merge($result, $templateResult);
            }
        }

        // Method 2: Manual input with keyword checking
        if (!empty($costData['description'])) {
            $result['description'] = $costData['description'];

            // Try keyword matching
            $keywordResult = $this->processViaKeywords($costData['description']);
            if ($keywordResult) {
                $result = array_merge($result, $keywordResult);
            } else {
                // Fallback to manual category selection
                $result['category_id'] = $costData['category_id'] ?? null;
                $result['categorization_method'] = 'manual';
            }
        }

        // Get category name if we have category_id
        if ($result['category_id']) {
            $category = PettyCashCategory::find($result['category_id']);
            if ($category) {
                $result['category_name'] = $category->name;
            }
        }

        return $result;
    }

    /**
     * Process using template
     */
    private function processViaTemplate(int $templateId, float $amount): ?array
    {
        $template = ExpenseTemplate::with('category')->find($templateId);

        if (!$template || !$template->is_active) {
            return null;
        }

        // Update usage count
        $template->incrementUsage();

        // Check if amount is within typical range
        $amountWarning = null;
        if (!$template->isInAmountRange($amount) && $template->typical_amount_min > 0) {
            $amountWarning = "Amount outside typical range ({$template->formatted_amount_range})";
        }

        return [
            'description' => $template->name,
            'category_id' => $template->category_id,
            'category_name' => $template->category->name,
            'template_id' => $template->id,
            'categorization_method' => 'template',
            'confidence' => 'high',
            'amount_warning' => $amountWarning
        ];
    }

    /**
     * Process using keyword matching
     */
    private function processViaKeywords(string $description): ?array
    {
        $keywordMatch = SimpleCategoryRule::checkKeywords($description);

        if (!$keywordMatch) {
            return null;
        }

        return [
            'category_id' => $keywordMatch['category_id'],
            'category_name' => $keywordMatch['category_name'],
            'categorization_method' => 'keyword',
            'confidence' => $keywordMatch['confidence'],
            'matched_keyword' => $keywordMatch['matched_keyword']
        ];
    }

    /**
     * Auto-generate petty cash transactions from invoice operational costs
     */
    public function autoGeneratePettyCashFromInvoice($invoice): array
    {
        $generatedTransactions = [];
        $errors = [];

        $operationalCosts = $invoice->operationalCosts();
        if (!$operationalCosts->exists()) {
            return [
                'success' => true,
                'message' => 'No operational costs to generate petty cash transactions',
                'transactions' => [],
                'errors' => []
            ];
        }

        foreach ($operationalCosts->get() as $cost) {
            try {
                // Process the operational cost
                $processedData = $this->processOperationalCost([
                    'template_id' => $cost->template_id ?? null,
                    'description' => $cost->description,
                    'category_id' => $cost->category_id ?? null,
                    'amount' => $cost->amount
                ]);

                // Create petty cash transaction
                $transaction = PettyCashTransaction::create([
                    'transaction_date' => $invoice->invoice_date,
                    'description' => $processedData['description'],
                    'category_id' => $processedData['category_id'],
                    'template_id' => $processedData['template_id'],
                    'categorization_method' => $processedData['categorization_method'],
                    'auto_generated' => true,
                    'invoice_id' => $invoice->id,
                    'invoice_item_id' => $cost->id,
                    'amount' => $processedData['amount'],
                    'type' => 'expense',
                    'so_number' => $invoice->salesOrder->order_number ?? null,
                    'balance_after' => 0, // Will be calculated by PettyCashBalance::updateBalanceForDate
                    'notes' => "Auto-generated from Invoice {$invoice->invoice_number}",
                    'status' => 'pending', // Require admin approval
                    'user_id' => auth()->id(),
                ]);

                $generatedTransactions[] = $transaction;

            } catch (\Exception $e) {
                $errors[] = [
                    'cost_id' => $cost->id,
                    'error' => $e->getMessage()
                ];
            }
        }

        // Update balances for all generated transactions
        if (!empty($generatedTransactions)) {
            $this->updatePettyCashBalances($invoice->invoice_date);
        }

        return [
            'success' => empty($errors),
            'message' => count($generatedTransactions) . ' petty cash transactions generated',
            'transactions' => $generatedTransactions,
            'errors' => $errors
        ];
    }

    /**
     * Check keywords for real-time suggestion (AJAX endpoint)
     */
    public function checkKeywordsAjax(string $description): array
    {
        if (strlen(trim($description)) < 3) {
            return [
                'found' => false,
                'message' => 'Description too short for keyword matching'
            ];
        }

        $keywordMatch = SimpleCategoryRule::checkKeywords($description);

        if (!$keywordMatch) {
            return [
                'found' => false,
                'message' => 'No keywords matched'
            ];
        }

        return [
            'found' => true,
            'category_id' => $keywordMatch['category_id'],
            'category_name' => $keywordMatch['category_name'],
            'matched_keyword' => $keywordMatch['matched_keyword'],
            'confidence' => $keywordMatch['confidence'],
            'message' => "Detected as {$keywordMatch['category_name']} (keyword: {$keywordMatch['matched_keyword']})"
        ];
    }

    /**
     * Get popular templates for quick selection
     */
    public function getPopularTemplates(int $limit = 10): array
    {
        return ExpenseTemplate::active()
                             ->popular()
                             ->with('category')
                             ->limit($limit)
                             ->get()
                             ->map(function($template) {
                                 return [
                                     'id' => $template->id,
                                     'name' => $template->name,
                                     'category_name' => $template->category->name,
                                     'usage_count' => $template->usage_count,
                                     'typical_amount_min' => $template->typical_amount_min,
                                     'typical_amount_max' => $template->typical_amount_max
                                 ];
                             })
                             ->toArray();
    }

    /**
     * Update petty cash balances (helper method)
     */
    private function updatePettyCashBalances(\Carbon\Carbon $date): void
    {
        // This would typically call PettyCashBalance::updateBalanceForDate
        // Implementation depends on existing balance calculation logic
        if (class_exists(\App\Models\PettyCashBalance::class)) {
            \App\Models\PettyCashBalance::updateBalanceForDate($date);
        }
    }

    /**
     * Get categorization statistics
     */
    public function getCategorizationStats(): array
    {
        $total = PettyCashTransaction::count();
        $autoGenerated = PettyCashTransaction::autoGenerated()->count();
        $templateBased = PettyCashTransaction::byCategorizationMethod('template')->count();
        $keywordBased = PettyCashTransaction::byCategorizationMethod('keyword')->count();
        $manual = PettyCashTransaction::byCategorizationMethod('manual')->count();

        return [
            'total_transactions' => $total,
            'auto_generated' => $autoGenerated,
            'auto_generated_percentage' => $total > 0 ? round(($autoGenerated / $total) * 100, 1) : 0,
            'template_based' => $templateBased,
            'keyword_based' => $keywordBased,
            'manual' => $manual,
            'method_breakdown' => [
                'template' => $templateBased,
                'keyword' => $keywordBased,
                'manual' => $manual
            ]
        ];
    }
}