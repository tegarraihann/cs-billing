<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EmployeeSalary extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_name',
        'employee_id',
        'division',
        'position',
        'basic_salary',
        'allowances',
        'deductions',
        'total_salary',
        'salary_date',
        'period_month',
        'status',
        'notes',
        'details',
        'is_active',
        'created_by',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'basic_salary' => 'decimal:2',
        'allowances' => 'decimal:2',
        'deductions' => 'decimal:2',
        'total_salary' => 'decimal:2',
        'salary_date' => 'date',
        'details' => 'array',
        'is_active' => 'boolean',
        'approved_at' => 'datetime',
    ];

    protected $appends = [
        'formatted_period',
        'status_badge',
        'division_label'
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function profitLossEntries(): HasMany
    {
        return $this->hasMany(ProfitLossEntry::class, 'reference_id')
                   ->where('reference_type', 'employee_salary');
    }

    public function calculateTotalSalary(): void
    {
        $this->total_salary = $this->basic_salary + $this->allowances - $this->deductions;
        $this->save();
    }

    public function approve($approved_by): bool
    {
        if ($this->status !== 'draft') {
            return false;
        }

        $this->update([
            'status' => 'paid',
            'approved_by' => $approved_by,
            'approved_at' => now(),
        ]);

        return true;
    }

    public function cancel($reason = null): bool
    {
        if ($this->status === 'paid') {
            return false;
        }

        $this->update([
            'status' => 'cancelled',
            'notes' => $this->notes . ($reason ? "\nCancelled: " . $reason : ''),
        ]);

        return true;
    }

    public function getFormattedPeriodAttribute(): string
    {
        $months = [
            '01' => 'Januari', '02' => 'Februari', '03' => 'Maret',
            '04' => 'April', '05' => 'Mei', '06' => 'Juni',
            '07' => 'Juli', '08' => 'Agustus', '09' => 'September',
            '10' => 'Oktober', '11' => 'November', '12' => 'Desember'
        ];

        [$year, $month] = explode('-', $this->period_month);
        return $months[$month] . ' ' . $year;
    }

    public function getStatusBadgeAttribute(): array
    {
        return match($this->status) {
            'draft' => ['class' => 'bg-yellow-100 text-yellow-800', 'text' => 'Draft'],
            'paid' => ['class' => 'bg-green-100 text-green-800', 'text' => 'Dibayar'],
            'cancelled' => ['class' => 'bg-red-100 text-red-800', 'text' => 'Dibatalkan'],
            default => ['class' => 'bg-gray-100 text-gray-800', 'text' => 'Unknown']
        };
    }

    public function getDivisionLabelAttribute(): string
    {
        return match($this->division) {
            'customer_support' => 'Customer Support',
            'marketing' => 'Marketing',
            'finance' => 'Finance',
            'operations' => 'Operations',
            'management' => 'Management',
            default => ucfirst($this->division)
        };
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByDivision($query, $division)
    {
        return $query->where('division', $division);
    }

    public function scopeByPeriod($query, $period)
    {
        return $query->where('period_month', $period);
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    public function scopePaid($query)
    {
        return $query->where('status', 'paid');
    }

    public function scopeCancelled($query)
    {
        return $query->where('status', 'cancelled');
    }

    public static function getTotalByPeriod($period): array
    {
        $salaries = self::byPeriod($period)->paid()->get();
        
        return [
            'total_employees' => $salaries->count(),
            'total_basic_salary' => $salaries->sum('basic_salary'),
            'total_allowances' => $salaries->sum('allowances'),
            'total_deductions' => $salaries->sum('deductions'),
            'total_salary' => $salaries->sum('total_salary'),
            'by_division' => $salaries->groupBy('division')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total' => $group->sum('total_salary')
                ];
            })
        ];
    }

    public static function getMonthlyReport($year, $month = null): array
    {
        $query = self::active()->paid();
        
        if ($month) {
            $period = sprintf('%04d-%02d', $year, $month);
            $query->byPeriod($period);
        } else {
            $query->where('period_month', 'like', $year . '-%');
        }

        $salaries = $query->with(['creator', 'approver'])->get();
        
        return [
            'period' => $month ? sprintf('%04d-%02d', $year, $month) : $year,
            'total_employees' => $salaries->count(),
            'total_amount' => $salaries->sum('total_salary'),
            'salaries' => $salaries,
            'summary_by_division' => $salaries->groupBy('division')->map(function ($group) {
                return [
                    'count' => $group->count(),
                    'total_salary' => $group->sum('total_salary'),
                    'avg_salary' => $group->avg('total_salary'),
                ];
            })
        ];
    }
}