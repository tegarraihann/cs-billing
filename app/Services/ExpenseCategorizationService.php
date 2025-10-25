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
     * DEPRECATED: Auto-generate petty cash from invoice is NOT the correct concept
     *
     * Petty Cash should ONLY be for daily cash expenses (office supplies, utilities, etc.)
     * that are NOT related to any Sales Order or shipment.
     *
     * Operational costs from invoices should be tracked through:
     * - Account Payables (for vendor payments)
     * - Invoice operational_cost items
     * - Profit/Loss reports
     *
     * They should NOT go into Petty Cash because:
     * 1. They are tied to specific SOs/shipments
     * 2. They are usually larger amounts paid via bank transfer, not cash
     * 3. Mixing them with petty cash makes cash management confusing
     *
     * @deprecated This method should not be used
     */
    public function autoGeneratePettyCashFromInvoice($invoice): array
    {
        // Return error to prevent misuse
        return [
            'success' => false,
            'message' => 'DEPRECATED: Petty Cash should not be auto-generated from invoices. Operational costs should be tracked through Account Payables and Profit/Loss reports.',
            'transactions' => [],
            'errors' => [[
                'error' => 'This feature has been disabled because it violates the Petty Cash concept. Petty Cash is only for daily cash expenses not related to any SO/shipment.'
            ]]
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