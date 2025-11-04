<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\SalesOrder;
use App\Models\AccountReceivable;
use App\Models\AccountPayable;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProfitReportController extends Controller
{
    /**
     * Display profit shipment report
     */
    public function index(Request $request)
    {
        $filters = $this->resolveFilterParameters($request);
        [$rangeStart, $rangeEnd] = $filters['range'];
        $customerId = $request->input('customer_id');
        
        // Base query for sales orders
        $query = SalesOrder::query()
            ->with(['customer', 'invoices.items', 'accountReceivables', 'accountPayables', 'reimbursementItems'])
            ->whereBetween('created_at', [$rangeStart, $rangeEnd])
            ->where('status', 'approved');

        if ($customerId) {
            $query->where('customer_id', $customerId);
        }

        $salesOrders = $query->get();

        // Calculate profit for each sales order
        $profitData = $salesOrders->map(function ($salesOrder) {
            // Use invoice data for accurate profit calculation
            $revenue = $this->calculateTotalRevenue($salesOrder);
            $costs = $this->calculateTotalCosts($salesOrder);

            $profit = $revenue - $costs;
            $profitMargin = $revenue > 0 ? ($profit / $revenue) * 100 : 0;
            
            // Get payment status
            $invoiceTotal = $salesOrder->invoices->sum('total');
            $receivablesPaid = $salesOrder->accountReceivables->sum('paid_amount');
            $payablesPaid = $salesOrder->accountPayables->sum('paid_amount');
            
            return [
                'sales_order' => $salesOrder,
                'revenue' => $revenue,
                'costs' => $costs,
                'profit' => $profit,
                'profit_margin' => $profitMargin,
                'invoice_total' => $invoiceTotal,
                'receivables_paid' => $receivablesPaid,
                'payables_paid' => $payablesPaid,
                'profit_status' => $this->getProfitStatus($profit, $profitMargin)
            ];
        });

        // Calculate summary
        $summary = [
            'total_revenue' => $profitData->sum('revenue'),
            'total_costs' => $profitData->sum('costs'),
            'total_profit' => $profitData->sum('profit'),
            'total_receivables_paid' => $profitData->sum('receivables_paid'),
            'total_payables_paid' => $profitData->sum('payables_paid'),
            'average_profit_margin' => $profitData->avg('profit_margin'),
            'profitable_shipments' => $profitData->where('profit', '>', 0)->count(),
            'loss_shipments' => $profitData->where('profit', '<', 0)->count(),
            'breakeven_shipments' => $profitData->where('profit', '=', 0)->count(),
        ];

        // Get customers for filter
        $customers = \App\Models\Customer::select('id', 'company_name')
            ->orderBy('company_name')
            ->get();

        return Inertia::render('Admin/AdminKeuangan/Reports/ProfitShipment', [
            'profitData' => $profitData->values(),
            'summary' => $summary,
            'filters' => [
                'dateFrom' => $filters['dateFrom'],
                'dateTo' => $filters['dateTo'],
                'period' => $filters['period'],
                'month' => $filters['month'],
                'quarter' => $filters['quarter'],
                'year' => $filters['year'],
                'customerId' => $customerId
            ],
            'customers' => $customers
        ]);
    }

    /**
     * Export profit report to PDF
     */
    public function exportPdf(Request $request)
    {
        $filters = $this->resolveFilterParameters($request);
        [$rangeStart, $rangeEnd] = $filters['range'];
        $customerId = $request->input('customer_id');
        
        // Get the same data as index
        $query = SalesOrder::query()
            ->with(['customer', 'invoices.items', 'accountReceivables', 'accountPayables', 'reimbursementItems'])
            ->whereBetween('created_at', [$rangeStart, $rangeEnd])
            ->where('status', 'approved');

        if ($customerId) {
            $query->where('customer_id', $customerId);
        }

        $salesOrders = $query->get();

        $profitData = $salesOrders->map(function ($salesOrder) {
            $revenue = $this->calculateTotalRevenue($salesOrder);
            $costs = $this->calculateTotalCosts($salesOrder);
            $profit = $revenue - $costs;
            $profitMargin = $revenue > 0 ? ($profit / $revenue) * 100 : 0;
            
            return [
                'sales_order' => $salesOrder,
                'revenue' => $revenue,
                'costs' => $costs,
                'profit' => $profit,
                'profit_margin' => $profitMargin,
                'profit_status' => $this->getProfitStatus($profit, $profitMargin)
            ];
        });

        $summary = [
            'total_revenue' => $profitData->sum('revenue'),
            'total_costs' => $profitData->sum('costs'),
            'total_profit' => $profitData->sum('profit'),
            'average_profit_margin' => $profitData->avg('profit_margin'),
            'profitable_shipments' => $profitData->where('profit', '>', 0)->count(),
            'loss_shipments' => $profitData->where('profit', '<', 0)->count(),
        ];

        $pdf = \Barryvdh\DomPDF\Facade\Pdf::loadView('admin.admin-keuangan.reports.profit-shipment-pdf', [
            'profitData' => $profitData,
            'summary' => $summary,
            'dateFrom' => $dateFrom,
            'dateTo' => $dateTo,
            'generatedAt' => now()
        ])
        ->setPaper('a4', 'landscape')
        ->setOptions([
            'defaultFont' => 'Arial',
            'isRemoteEnabled' => true,
            'isHtml5ParserEnabled' => true
        ]);

        $fileName = 'Profit_Shipment_Report_' . Carbon::parse($dateFrom)->format('Y-m-d') . '_to_' . Carbon::parse($dateTo)->format('Y-m-d') . '.pdf';

        return $pdf->download($fileName);
    }

    /**
     * Get detailed profit analysis for a specific sales order
     */
    public function salesOrderDetail(SalesOrder $salesOrder)
    {
        $salesOrder->load([
            'customer', 
            'invoices.items', 
            'accountReceivables', 
            'accountPayables.vendor'
        ]);

        // Calculate detailed breakdown using invoice data
        $revenue = $this->calculateTotalRevenue($salesOrder);
        $costs = $this->calculateTotalCosts($salesOrder);
        $profit = $revenue - $costs;
        $profitMargin = $revenue > 0 ? ($profit / $revenue) * 100 : 0;

        // Cost breakdown by vendor
        $costBreakdown = $salesOrder->accountPayables->groupBy('vendor_name')->map(function ($payables, $vendorName) {
            return [
                'vendor_name' => $vendorName,
                'total_cost' => $payables->sum('amount'),
                'paid_amount' => $payables->sum('paid_amount'),
                'outstanding_amount' => $payables->sum('outstanding_amount'),
                'services' => $payables->map(function ($payable) {
                    return [
                        'description' => $payable->service_description,
                        'amount' => $payable->amount,
                        'status' => $payable->status
                    ];
                })
            ];
        })->values();

        // Revenue breakdown - only billable items
        $revenueBreakdown = $salesOrder->invoices->map(function ($invoice) {
            return [
                'invoice_number' => $invoice->invoice_number,
                'gross_revenue' => $invoice->calculateGrossRevenue(),
                'total' => $invoice->total,
                'paid_amount' => $invoice->paid_amount ?? 0,
                'status' => $invoice->status,
                'items' => $invoice->items->where('item_type', 'billable')->map(function ($item) {
                    return [
                        'description' => $item->description,
                        'quantity' => $item->quantity,
                        'rate' => $item->rate,
                        'amount' => $item->amount
                    ];
                })
            ];
        });

        return Inertia::render('Admin/AdminKeuangan/Reports/ProfitShipmentDetail', [
            'salesOrder' => $salesOrder,
            'profitAnalysis' => [
                'revenue' => $revenue,
                'costs' => $costs,
                'profit' => $profit,
                'profit_margin' => $profitMargin,
                'profit_status' => $this->getProfitStatus($profit, $profitMargin)
            ],
            'costBreakdown' => $costBreakdown,
            'revenueBreakdown' => $revenueBreakdown
        ]);
    }

    /**
     * Get profit summary dashboard data
     */
    public function dashboard()
    {
        $currentMonth = now()->startOfMonth();
        $lastMonth = now()->subMonth()->startOfMonth();

        // Current month data
        $currentMonthData = $this->getPeriodProfitData($currentMonth, now());
        
        // Last month data
        $lastMonthData = $this->getPeriodProfitData($lastMonth, $lastMonth->copy()->endOfMonth());

        // Year to date
        $ytdData = $this->getPeriodProfitData(now()->startOfYear(), now());

        // Top performing customers
        $topCustomers = $this->getTopProfitableCustomers();

        // Monthly trend (last 12 months)
        $monthlyTrend = $this->getMonthlyProfitTrend();

        return response()->json([
            'current_month' => $currentMonthData,
            'last_month' => $lastMonthData,
            'year_to_date' => $ytdData,
            'top_customers' => $topCustomers,
            'monthly_trend' => $monthlyTrend
        ]);
    }

    private function resolveFilterParameters(Request $request): array
    {
        $now = now();
        $allowedPeriods = ['monthly', 'quarterly', 'yearly', 'custom'];
        $period = $request->input('period');

        if (!in_array($period, $allowedPeriods, true)) {
            $period = 'monthly';
        }

        $year = (int) $request->input('year', $now->year);

        $monthInput = $request->input('month');
        $monthInt = (int) $monthInput;
        if ($monthInt < 1 || $monthInt > 12) {
            $monthInt = $now->month;
        }
        $month = str_pad((string) $monthInt, 2, '0', STR_PAD_LEFT);

        $allowedQuarters = ['Q1', 'Q2', 'Q3', 'Q4'];
        $quarterInput = strtoupper((string) $request->input('quarter', ''));
        if (!in_array($quarterInput, $allowedQuarters, true)) {
            $quarterInput = 'Q' . (int) ceil($monthInt / 3);
        }
        $quarter = $quarterInput;

        switch ($period) {
            case 'monthly':
                $start = Carbon::create($year, $monthInt, 1)->startOfDay();
                $end = (clone $start)->endOfMonth()->endOfDay();
                break;
            case 'quarterly':
                $quarterStartMonthMap = [
                    'Q1' => 1,
                    'Q2' => 4,
                    'Q3' => 7,
                    'Q4' => 10,
                ];
                $startMonth = $quarterStartMonthMap[$quarter] ?? 1;
                $start = Carbon::create($year, $startMonth, 1)->startOfDay();
                $end = (clone $start)->addMonths(3)->subDay()->endOfDay();
                break;
            case 'yearly':
                $start = Carbon::create($year, 1, 1)->startOfDay();
                $end = Carbon::create($year, 12, 31)->endOfDay();
                break;
            case 'custom':
            default:
                $dateFromInput = $request->input('date_from');
                $dateToInput = $request->input('date_to');
                $start = $dateFromInput
                    ? Carbon::parse($dateFromInput)->startOfDay()
                    : $now->copy()->startOfMonth();
                $end = $dateToInput
                    ? Carbon::parse($dateToInput)->endOfDay()
                    : $now->copy()->endOfMonth();
                break;
        }

        if ($start->gt($end)) {
            [$start, $end] = [$end->copy(), $start->copy()];
        }

        return [
            'range' => [$start, $end],
            'dateFrom' => $start->toDateString(),
            'dateTo' => $end->toDateString(),
            'period' => $period,
            'month' => $month,
            'quarter' => $quarter,
            'year' => (string) $year,
        ];
    }

    private function getProfitStatus($profit, $profitMargin)
    {
        if ($profit > 0) {
            if ($profitMargin >= 20) return 'excellent';
            if ($profitMargin >= 10) return 'good';
            return 'low';
        } elseif ($profit < 0) {
            return 'loss';
        } else {
            return 'breakeven';
        }
    }

    private function getPeriodProfitData($dateFrom, $dateTo)
    {
        $salesOrders = SalesOrder::query()
            ->with(['accountPayables', 'accountReceivables', 'invoices.items', 'reimbursementItems'])
            ->whereBetween('created_at', [$dateFrom, $dateTo])
            ->where('status', 'approved')
            ->get();

        $totalRevenue = $salesOrders->sum('total_selling');
        $totalCosts = $salesOrders->sum(function ($so) {
            return $this->calculateTotalCosts($so);
        });
        $totalProfit = $totalRevenue - $totalCosts;
        $averageMargin = $totalRevenue > 0 ? ($totalProfit / $totalRevenue) * 100 : 0;

        return [
            'total_revenue' => $totalRevenue,
            'total_costs' => $totalCosts,
            'total_profit' => $totalProfit,
            'average_margin' => $averageMargin,
            'shipment_count' => $salesOrders->count(),
            'profitable_count' => $salesOrders->filter(function ($so) {
                $revenue = $so->total_selling ?? 0;
                $costs = $this->calculateTotalCosts($so);
                return ($revenue - $costs) > 0;
            })->count()
        ];
    }

    private function getTopProfitableCustomers($limit = 10)
    {
        return SalesOrder::query()
            ->select('customer_id')
            ->selectRaw('SUM(total_selling) as total_revenue')
            ->selectRaw('COUNT(*) as shipment_count')
            ->with(['customer', 'accountPayables'])
            ->where('status', 'approved')
            ->whereNotNull('customer_id')
            ->groupBy('customer_id')
            ->orderByRaw('SUM(total_selling) DESC')
            ->limit($limit)
            ->get()
            ->map(function ($item) {
                // Calculate comprehensive costs for all sales orders of this customer
                $customerSalesOrders = SalesOrder::with(['invoices.items', 'accountPayables', 'reimbursementItems'])
                    ->where('customer_id', $item->customer_id)
                    ->where('status', 'approved')
                    ->get();

                $costs = $customerSalesOrders->sum(function ($so) {
                    return $this->calculateTotalCosts($so);
                });
                
                $profit = $item->total_revenue - $costs;
                $margin = $item->total_revenue > 0 ? ($profit / $item->total_revenue) * 100 : 0;
                
                return [
                    'customer' => $item->customer,
                    'total_revenue' => $item->total_revenue,
                    'total_costs' => $costs,
                    'total_profit' => $profit,
                    'profit_margin' => $margin,
                    'shipment_count' => $item->shipment_count
                ];
            });
    }

    private function getMonthlyProfitTrend($months = 12)
    {
        $data = [];
        
        for ($i = $months - 1; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $monthStart = $date->copy()->startOfMonth();
            $monthEnd = $date->copy()->endOfMonth();
            
            $monthData = $this->getPeriodProfitData($monthStart, $monthEnd);
            
            $data[] = [
                'month' => $date->format('Y-m'),
                'month_name' => $date->format('M Y'),
                'revenue' => $monthData['total_revenue'],
                'costs' => $monthData['total_costs'],
                'profit' => $monthData['total_profit'],
                'margin' => $monthData['average_margin'],
                'shipments' => $monthData['shipment_count']
            ];
        }
        
        return $data;
    }

    /**
     * Calculate total revenue from invoices (billable items only)
     * This matches the Invoice Show calculation: gross revenue from billable items
     */
    private function calculateTotalRevenue(SalesOrder $salesOrder): float
    {
        $totalRevenue = 0;
        foreach ($salesOrder->invoices as $invoice) {
            $totalRevenue += $invoice->calculateGrossRevenue();
        }
        return $totalRevenue;
    }

    /**
     * Calculate operational costs for a sales order
     * Only includes operational costs from invoices (consistent with Invoice Show)
     */
    private function calculateTotalCosts(SalesOrder $salesOrder): float
    {
        $totalCosts = 0;
        foreach ($salesOrder->invoices as $invoice) {
            $totalCosts += $invoice->calculateOperationalCosts();
        }
        return $totalCosts;
    }
}
