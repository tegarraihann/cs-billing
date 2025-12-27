<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\SalesOrder;

class ProfitLossPeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_code',
        'period_name',
        'period_type',
        'start_date',
        'end_date',
        'total_revenue',
        'total_expenses',
        'net_profit',
        'summary_data',
        'status',
        'notes',
        'created_by',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'total_revenue' => 'decimal:2',
        'total_expenses' => 'decimal:2',
        'net_profit' => 'decimal:2',
        'summary_data' => 'array',
        'approved_at' => 'datetime',
    ];

    public function entries(): HasMany
    {
        return $this->hasMany(ProfitLossEntry::class, 'period_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function calculateTotals(): void
    {
        $entries = $this->entries()->with('account')->get();

        $this->total_revenue = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'revenue';
        })->sum('amount');

        $salary_expense = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'expense' &&
                   $entry->account->account_category === 'expense_salary';
        })->sum('amount');

        $operational_expense = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'expense' &&
                   in_array($entry->account->account_category, ['expense_operational', 'expense_utilities', 'expense_travel', 'expense_equipment', 'expense_marketing']);
        })->sum('amount');

        $admin_expense = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'expense' &&
                   $entry->account->account_category === 'expense_admin';
        })->sum('amount');

        $tax_expense = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'expense' &&
                   $entry->account->account_category === 'expense_tax';
        })->sum('amount');

        $other_expense = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'expense' &&
                   $entry->account->account_category === 'expense_other';
        })->sum('amount');

        $this->total_expenses = $salary_expense + $operational_expense + $admin_expense + $tax_expense + $other_expense;
        $this->net_profit = $this->total_revenue - $this->total_expenses;

        // Store breakdown in summary_data
        $this->summary_data = [
            'total_salary_expense' => $salary_expense,
            'total_operational_expense' => $operational_expense,
            'total_admin_expense' => $admin_expense,
            'total_tax_expense' => $tax_expense,
            'total_other_expense' => $other_expense,
        ];

        $this->save();
    }

    public function getReportData(): array
    {
        $entries = $this->entries()->with('account')->get()->groupBy('account.account_type');

        $revenue_entries = collect(($entries->get('revenue', collect()))->all())->groupBy(function ($entry) {
            if ($entry->reference_type === 'other_income') {
                return 'revenue_other';
            }

            return $entry->account?->account_category ?? 'revenue_main';
        });
        $expense_entries = collect(($entries->get('expense', collect()))->all())->groupBy('account.account_category');

        $serializeEntries = function ($collection) {
            return $collection->map(function ($entry) {
                $data = $entry->toArray();
                if ($entry->relationLoaded('account') && $entry->account) {
                    $data['account'] = $entry->account->toArray();
                }
                return $data;
            })->values()->all();
        };

        $operationalEntries = $expense_entries
            ->only([
                'expense_operational',
                'expense_utilities',
                'expense_travel',
                'expense_equipment',
                'expense_marketing',
            ])
            ->flatten();

        $operationalByCategory = $operationalEntries->groupBy(function ($entry) {
            $categoryId = data_get($entry->additional_data, 'category_id');
            $categoryName = data_get($entry->additional_data, 'category_name') ?? $entry->account?->account_name ?? 'Lainnya';

            return $categoryId
                ? "{$categoryId}|{$categoryName}"
                : "uncategorized|{$categoryName}";
        })->map(function ($group, $key) use ($serializeEntries) {
            [$categoryId, $categoryName] = explode('|', $key, 2);

            return [
                'category_id' => $categoryId === 'uncategorized' ? null : $categoryId,
                'category_name' => $categoryName,
                'entries' => $serializeEntries($group),
                'total' => $group->sum('amount'),
            ];
        })->values()->map(function ($category) {
            $category['entries'] = array_values($category['entries']);
            return $category;
        })->values()->all();

        // Separate other income by category for detailed reporting
        $other_income_entries = $revenue_entries->get('revenue_other', collect());
        $other_income_breakdown = [
            'bunga_mandiri' => $other_income_entries->filter(function ($entry) {
                return data_get($entry->additional_data, 'category') === 'Bunga Bank Mandiri';
            }),
            'bunga_bca' => $other_income_entries->filter(function ($entry) {
                return data_get($entry->additional_data, 'category') === 'Bunga Bank BCA';
            }),
        ];
        $other_income_breakdown['lainnya'] = $other_income_entries->reject(function ($entry) {
            return in_array(data_get($entry->additional_data, 'category'), [
                'Bunga Bank Mandiri',
                'Bunga Bank BCA',
            ], true);
        });

        $summary = $this->summary_data ?? [];
        $taxExpenseEntries = $expense_entries->get('expense_tax', collect());
        $taxRateMatches = function ($entry, float $rate, string $entryType, string $accountCode) {
            if ($entry->entry_type === $entryType) {
                return true;
            }

            $entryRate = data_get($entry->additional_data, 'tax_rate');
            if ($entryRate !== null && abs(((float) $entryRate) - $rate) < 0.0001) {
                return true;
            }

            return (string) ($entry->account?->account_code) === $accountCode;
        };

        $tax05Entries = $taxExpenseEntries->filter(function ($entry) use ($taxRateMatches) {
            return $taxRateMatches($entry, 0.5, 'manual_tax_0_5', '5450');
        });

        $tax2Entries = $taxExpenseEntries->filter(function ($entry) use ($taxRateMatches) {
            return $taxRateMatches($entry, 2.0, 'manual_tax_2', '5451');
        });

        $tax05Total = $tax05Entries->sum('amount');
        $tax2Total = $tax2Entries->sum('amount');
        $taxTotal = $tax05Total + $tax2Total;

        $shipmentSummary = [
            'total_revenue' => 0,
            'total_costs' => 0,
            'total_profit' => 0,
            'average_margin' => 0,
            'shipment_count' => 0,
        ];

        if ($this->start_date && $this->end_date) {
            $rangeStart = $this->start_date->toDateString();
            $rangeEnd = $this->end_date->toDateString();

            $salesOrders = SalesOrder::query()
                ->with([
                    'invoices' => function ($query) use ($rangeStart, $rangeEnd) {
                        $query->whereBetween('invoice_date', [$rangeStart, $rangeEnd])
                            ->with('items');
                    },
                    'accountReceivables',
                ])
                ->whereHas('invoices', function ($query) use ($rangeStart, $rangeEnd) {
                    $query->whereBetween('invoice_date', [$rangeStart, $rangeEnd]);
                })
                ->where('status', 'approved')
                ->get();

            $totalMargins = 0;

            foreach ($salesOrders as $salesOrder) {
                $revenue = 0;
                $operationalCosts = 0;

                foreach ($salesOrder->invoices as $invoice) {
                    $revenue += $invoice->calculateGrossRevenue();
                    $operationalCosts += $invoice->calculateOperationalCosts();
                }

                $profit = $revenue - $operationalCosts;
                $margin = $revenue > 0 ? ($profit / $revenue) * 100 : 0;

                $shipmentSummary['total_revenue'] += $revenue;
                $shipmentSummary['total_costs'] += $operationalCosts;
                $shipmentSummary['total_profit'] += $profit;
                $totalMargins += $margin;
            }

            $shipmentSummary['shipment_count'] = $salesOrders->count();
            $shipmentSummary['average_margin'] = $shipmentSummary['shipment_count'] > 0
                ? $totalMargins / $shipmentSummary['shipment_count']
                : 0;
        }

        return [
            'period' => $this,
            'revenues' => [
                'main' => $serializeEntries($revenue_entries->get('revenue_main', collect())),
                'other' => $serializeEntries($other_income_entries),
                'other_income_breakdown' => [
                    'bunga_mandiri' => [
                        'entries' => $serializeEntries($other_income_breakdown['bunga_mandiri']),
                        'total' => $other_income_breakdown['bunga_mandiri']->sum('amount')
                    ],
                    'bunga_bca' => [
                        'entries' => $serializeEntries($other_income_breakdown['bunga_bca']),
                        'total' => $other_income_breakdown['bunga_bca']->sum('amount')
                    ],
                    'lainnya' => [
                        'entries' => $serializeEntries($other_income_breakdown['lainnya']),
                        'total' => $other_income_breakdown['lainnya']->sum('amount')
                    ],
                ],
                'total' => $this->total_revenue
            ],
            'expenses' => [
                'salary' => $serializeEntries($expense_entries->get('expense_salary', collect())),
                'operational' => [
                    'grouped' => $operationalByCategory,
                    'total' => collect($operationalByCategory)->sum('total'),
                ],
                'admin' => $serializeEntries($expense_entries->get('expense_admin', collect())),
                'tax' => $serializeEntries($expense_entries->get('expense_tax', collect())),
                'other' => $serializeEntries($expense_entries->get('expense_other', collect())),
                'total' => $this->total_expenses
            ],
            'taxes' => [
                'e05' => [
                    'entries' => $serializeEntries($tax05Entries),
                    'total' => $tax05Total,
                ],
                'two_percent' => [
                    'entries' => $serializeEntries($tax2Entries),
                    'total' => $tax2Total,
                ],
                'total' => $taxTotal,
            ],
            'summary' => [
                'total_salary_expense' => $summary['total_salary_expense'] ?? 0,
                'total_operational_expense' => $summary['total_operational_expense'] ?? 0,
                'total_admin_expense' => $summary['total_admin_expense'] ?? 0,
                'total_tax_expense' => $summary['total_tax_expense'] ?? 0,
                'total_other_expense' => $summary['total_other_expense'] ?? 0,
            ],
            'shipment_profit' => $shipmentSummary,
            'net_profit' => $this->net_profit
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('status', '!=', 'cancelled');
    }

    public function scopeByPeriodType($query, $type)
    {
        return $query->where('period_type', $type);
    }

    public function scopeByDateRange($query, $start, $end)
    {
        return $query->where('start_date', '>=', $start)
                    ->where('end_date', '<=', $end);
    }
}
