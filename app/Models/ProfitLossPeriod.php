<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
                   in_array($entry->account->account_category, ['expense_operational', 'expense_utilities', 'expense_travel', 'expense_equipment']);
        })->sum('amount');

        $admin_expense = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'expense' && 
                   $entry->account->account_category === 'expense_admin';
        })->sum('amount');

        $other_expense = $entries->filter(function ($entry) {
            return $entry->account->account_type === 'expense' && 
                   $entry->account->account_category === 'expense_other';
        })->sum('amount');

        $this->total_expenses = $salary_expense + $operational_expense + $admin_expense + $other_expense;
        $this->net_profit = $this->total_revenue - $this->total_expenses;
        
        // Store breakdown in summary_data
        $this->summary_data = [
            'total_salary_expense' => $salary_expense,
            'total_operational_expense' => $operational_expense,
            'total_admin_expense' => $admin_expense,
            'total_other_expense' => $other_expense,
        ];
        
        $this->save();
    }

    public function getReportData(): array
    {
        $entries = $this->entries()->with('account')->get()->groupBy('account.account_type');

        $revenue_entries = $entries->get('revenue', collect())->groupBy('account.account_category');
        $expense_entries = $entries->get('expense', collect())->groupBy('account.account_category');

        // Separate other income by category for detailed reporting
        $other_income_entries = $revenue_entries->get('revenue_other', collect());
        $other_income_breakdown = [
            'bunga_mandiri' => $other_income_entries->filter(function($entry) {
                return isset($entry->additional_data['category']) &&
                       $entry->additional_data['category'] === 'Bunga Bank Mandiri';
            }),
            'bunga_bca' => $other_income_entries->filter(function($entry) {
                return isset($entry->additional_data['category']) &&
                       $entry->additional_data['category'] === 'Bunga Bank BCA';
            }),
            'lainnya' => $other_income_entries->filter(function($entry) {
                return isset($entry->additional_data['category']) &&
                       $entry->additional_data['category'] === 'Lainnya';
            }),
        ];

        $summary = $this->summary_data ?? [];

        return [
            'period' => $this,
            'revenues' => [
                'main' => $revenue_entries->get('revenue_main', collect()),
                'other' => $other_income_entries,
                'other_income_breakdown' => [
                    'bunga_mandiri' => [
                        'entries' => $other_income_breakdown['bunga_mandiri'],
                        'total' => $other_income_breakdown['bunga_mandiri']->sum('amount')
                    ],
                    'bunga_bca' => [
                        'entries' => $other_income_breakdown['bunga_bca'],
                        'total' => $other_income_breakdown['bunga_bca']->sum('amount')
                    ],
                    'lainnya' => [
                        'entries' => $other_income_breakdown['lainnya'],
                        'total' => $other_income_breakdown['lainnya']->sum('amount')
                    ],
                ],
                'total' => $this->total_revenue
            ],
            'expenses' => [
                'salary' => $expense_entries->get('expense_salary', collect()),
                'operational' => $expense_entries->get('expense_operational', collect())->merge(
                    $expense_entries->get('expense_utilities', collect())
                )->merge(
                    $expense_entries->get('expense_travel', collect())
                )->merge(
                    $expense_entries->get('expense_equipment', collect())
                ),
                'admin' => $expense_entries->get('expense_admin', collect()),
                'other' => $expense_entries->get('expense_other', collect()),
                'total' => $this->total_expenses
            ],
            'summary' => [
                'total_salary_expense' => $summary['total_salary_expense'] ?? 0,
                'total_operational_expense' => $summary['total_operational_expense'] ?? 0,
                'total_admin_expense' => $summary['total_admin_expense'] ?? 0,
                'total_other_expense' => $summary['total_other_expense'] ?? 0,
            ],
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