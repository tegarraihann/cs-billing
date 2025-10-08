<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ExpenseCategorizationService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class ExpenseTemplateController extends Controller
{
    protected $categorizationService;

    public function __construct(ExpenseCategorizationService $categorizationService)
    {
        $this->categorizationService = $categorizationService;
    }

    /**
     * Get all templates grouped by category
     */
    public function getTemplatesByCategory(): JsonResponse
    {
        try {
            $templates = $this->categorizationService->getTemplatesByCategory();

            return response()->json([
                'success' => true,
                'data' => $templates
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load templates',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Check keywords for categorization suggestion
     */
    public function checkKeywords(Request $request): JsonResponse
    {
        $request->validate([
            'description' => 'required|string|min:3|max:255'
        ]);

        try {
            $result = $this->categorizationService->checkKeywordsAjax($request->description);

            return response()->json([
                'success' => true,
                'data' => $result
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check keywords',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get popular templates for quick selection
     */
    public function getPopularTemplates(Request $request): JsonResponse
    {
        try {
            $limit = $request->get('limit', 10);
            $templates = $this->categorizationService->getPopularTemplates($limit);

            return response()->json([
                'success' => true,
                'data' => $templates
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load popular templates',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Process operational cost (for preview)
     */
    public function processOperationalCost(Request $request): JsonResponse
    {
        $request->validate([
            'template_id' => 'nullable|exists:expense_templates,id',
            'description' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:petty_cash_categories,id',
            'amount' => 'required|numeric|min:0'
        ]);

        try {
            $result = $this->categorizationService->processOperationalCost($request->all());

            return response()->json([
                'success' => true,
                'data' => $result
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to process operational cost',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get categorization statistics
     */
    public function getStats(): JsonResponse
    {
        try {
            $stats = $this->categorizationService->getCategorizationStats();

            return response()->json([
                'success' => true,
                'data' => $stats
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to load statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}