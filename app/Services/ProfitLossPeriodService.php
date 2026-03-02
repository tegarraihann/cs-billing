<?php

namespace App\Services;

use App\Models\EmployeeSalary;
use App\Models\GeneralExpense;
use App\Models\Invoice;
use App\Models\OtherIncome;
use App\Models\PrepaidRentTransaction;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use App\Models\SalesOrder;
use App\Models\SupplyTransaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProfitLossPeriodService
{
    public function generatePeriodCode(string $type, $startDate): string
    {
        $date = Carbon::parse($startDate);

        return match ($type) {
            'monthly' => 'PL-M-' . $date->format('Y-m'),
            'quarterly' => 'PL-Q-' . $date->format('Y') . '-Q' . $date->quarter,
            'yearly' => 'PL-Y-' . $date->format('Y'),
            default => 'PL-' . $date->format('Y-m-d'),
        };
    }

    public function generateEntries(ProfitLossPeriod $period, ?int $userId = null): array
    {
        $actingUserId = $userId ?: Auth::id() ?: 1;
        $startDate = $period->start_date;
        $endDate = $period->end_date;
        $summary = [
            'sales_orders' => 0,
            'petty_cash' => 0,
            'employee_salaries' => 0,
            'other_incomes' => 0,
            'prepaid_rent' => 0,
            'equipment' => 0,
        ];

        ProfitLossEntry::where('period_id', $period->id)
            ->whereIn('entry_type', ['auto_invoice', 'auto_so', 'auto_equipment_depreciation'])
            ->delete();

        $salesOrders = SalesOrder::query()
            ->whereBetween('created_at', [$startDate, $endDate])
            ->get()
            ->keyBy('id');

        $invoiceGroups = Invoice::with('items')
            ->where('posted_to_profit_loss', true)
            ->whereIn('sales_order_id', $salesOrders->keys())
            ->get()
            ->groupBy('sales_order_id');

        $validSalesOrderIds = [];

        foreach ($salesOrders as $salesOrderId => $salesOrder) {
            $invoices = $invoiceGroups->get($salesOrderId, collect());
            if (!$salesOrder || $invoices->isEmpty()) {
                continue;
            }

            $grossRevenue = $invoices->sum(function ($invoice) {
                return $invoice->calculateGrossRevenue();
            });
            $operationalCosts = $invoices->sum(function ($invoice) {
                return $invoice->calculateOperationalCosts();
            });

            if ($grossRevenue == 0 && $operationalCosts == 0) {
                continue;
            }

            $recognitionDate = $salesOrder->created_at?->format('Y-m-d')
                ?? $salesOrder->released_at?->format('Y-m-d')
                ?? $salesOrder->so_date?->format('Y-m-d')
                ?? now()->format('Y-m-d');

            $entry = ProfitLossEntry::createFromShipmentProfit($salesOrder, $period->id, $actingUserId, [
                'gross_revenue' => $grossRevenue,
                'operational_costs' => $operationalCosts,
                'profit' => $grossRevenue - $operationalCosts,
                'invoice_ids' => $invoices->pluck('id')->all(),
                'transaction_date' => $recognitionDate,
            ]);

            if ($entry?->wasRecentlyCreated) {
                $summary['sales_orders']++;
            }

            $validSalesOrderIds[] = $salesOrder->id;
        }

        $staleShipmentProfitEntries = ProfitLossEntry::where('period_id', $period->id)
            ->where('entry_type', 'auto_shipment_profit');

        if (!empty($validSalesOrderIds)) {
            $staleShipmentProfitEntries->whereNotIn('reference_id', $validSalesOrderIds);
        }

        $staleShipmentProfitEntries->delete();

        if (class_exists('App\Models\PettyCashTransaction')) {
            $pettyCashTransactions = app('App\Models\PettyCashTransaction')
                ->with('category')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->where('status', 'approved')
                ->get();

            foreach ($pettyCashTransactions as $pct) {
                $entry = ProfitLossEntry::createFromPettyCash($pct, $period->id, $actingUserId);
                if ($entry?->wasRecentlyCreated) {
                    $summary['petty_cash']++;
                }
            }
        }

        $employeeSalaries = EmployeeSalary::whereBetween('salary_date', [$startDate, $endDate])
            ->where('status', 'paid')
            ->get();

        foreach ($employeeSalaries as $salary) {
            $entry = ProfitLossEntry::createFromEmployeeSalary($salary, $period->id, $actingUserId);
            if ($entry?->wasRecentlyCreated) {
                $summary['employee_salaries']++;
            }
        }

        if (class_exists(PrepaidRentTransaction::class)) {
            $amortizations = PrepaidRentTransaction::where('transaction_type', 'amortization')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->get();

            foreach ($amortizations as $transaction) {
                $entry = ProfitLossEntry::createFromPrepaidRent($transaction, $period->id, $actingUserId);
                if ($entry?->wasRecentlyCreated) {
                    $summary['prepaid_rent']++;
                }
            }
        }

        if (class_exists(GeneralExpense::class)) {
            $generalExpenses = GeneralExpense::whereBetween('expense_date', [$startDate, $endDate])
                ->where('status', 'approved')
                ->get();

            foreach ($generalExpenses as $expense) {
                $entry = ProfitLossEntry::createFromGeneralExpense($expense, $period->id, $actingUserId);
                if ($entry?->wasRecentlyCreated) {
                    $summary['general_expense'] = ($summary['general_expense'] ?? 0) + 1;
                }
            }
        }

        if (class_exists(SupplyTransaction::class)) {
            $supplies = SupplyTransaction::whereIn('transaction_type', ['usage', 'depreciation'])
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->get();

            foreach ($supplies as $supply) {
                $entry = ProfitLossEntry::createFromSupplyTransaction($supply, $period->id, $actingUserId);
                if ($entry?->wasRecentlyCreated) {
                    $summary['supplies'] = ($summary['supplies'] ?? 0) + 1;
                }
            }
        }

        if (class_exists(SupplyTransaction::class)) {
            $supplyTopups = SupplyTransaction::where('transaction_type', 'topup')
                ->where('source_type', '!=', 'opening_balance')
                ->whereBetween('transaction_date', [$startDate, $endDate])
                ->get();

            foreach ($supplyTopups as $topup) {
                $entry = ProfitLossEntry::createFromSupplyTopup($topup, $period->id, $actingUserId);
                if ($entry?->wasRecentlyCreated) {
                    $summary['supplies_purchase'] = ($summary['supplies_purchase'] ?? 0) + 1;
                }
            }
        }

        if (class_exists(OtherIncome::class)) {
            $otherIncomes = OtherIncome::whereBetween('transaction_date', [$startDate, $endDate])
                ->where('posted_to_profit_loss', true)
                ->get();

            foreach ($otherIncomes as $income) {
                $entry = ProfitLossEntry::createFromOtherIncome($income, $period->id, $actingUserId);
                if ($entry?->wasRecentlyCreated) {
                    $summary['other_incomes']++;
                }
            }
        }

        $period->calculateTotals();
        $summary['total_new'] = array_sum($summary);

        return $summary;
    }

    public function ensureMonthlyPeriod(?Carbon $targetMonth = null, ?int $userId = null, bool $persist = true): array
    {
        $actingUserId = $userId ?: Auth::id() ?: 1;
        $month = ($targetMonth ?? now())->copy()->startOfMonth();
        $periodCode = $this->generatePeriodCode('monthly', $month);
        $periodName = 'INCOME STATEMENT ' . Str::upper($month->locale('id')->translatedFormat('F Y'));

        $existing = ProfitLossPeriod::query()
            ->where('period_type', 'monthly')
            ->where(function ($query) use ($periodCode, $month) {
                $query->where('period_code', $periodCode)
                    ->orWhereDate('start_date', $month->toDateString());
            })
            ->first();

        if ($existing) {
            return [
                'created' => false,
                'period' => $existing,
                'summary' => null,
                'message' => 'Periode bulanan sudah ada.',
            ];
        }

        $endOfMonth = $month->copy()->endOfMonth();

        if (!$persist) {
            return [
                'created' => false,
                'period' => new ProfitLossPeriod([
                    'period_code' => $periodCode,
                    'period_name' => $periodName,
                    'period_type' => 'monthly',
                    'start_date' => $month->toDateString(),
                    'end_date' => $endOfMonth->toDateString(),
                    'created_by' => $actingUserId,
                ]),
                'summary' => null,
                'message' => 'DRY-RUN: periode bulanan akan dibuat.',
            ];
        }

        $period = ProfitLossPeriod::create([
            'period_code' => $periodCode,
            'period_name' => $periodName,
            'period_type' => 'monthly',
            'start_date' => $month->toDateString(),
            'end_date' => $endOfMonth->toDateString(),
            'created_by' => $actingUserId,
        ]);

        $summary = $this->generateEntries($period, $actingUserId);

        return [
            'created' => true,
            'period' => $period->fresh(),
            'summary' => $summary,
            'message' => 'Periode bulanan berhasil dibuat.',
        ];
    }
}
