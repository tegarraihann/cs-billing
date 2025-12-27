<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class GeneralExpense extends Model
{
    protected $fillable = [
        'expense_date',
        'category',
        'total_amount',
        'period_month',
        'period_year',
        'status',
        'notes',
        'pl_account_id',
        'created_by',
        'approved_by',
        'approved_at'
    ];

    protected $casts = [
        'expense_date' => 'date',
        'total_amount' => 'decimal:2',
        'approved_at' => 'datetime'
    ];

    // Relationships
    public function items(): HasMany
    {
        return $this->hasMany(GeneralExpenseItem::class, 'expense_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Scopes
    public function scopeByPeriod($query, $month, $year)
    {
        return $query->where('period_month', $month)->where('period_year', $year);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('category', 'like', '%' . $category . '%');
    }

    public function scopeApproved($query)
    {
        return $query->where('status', 'approved');
    }

    public function scopeDraft($query)
    {
        return $query->where('status', 'draft');
    }

    // Methods
    public function calculateTotal()
    {
        $this->total_amount = $this->items()->sum('amount');
        $this->save();
        return $this->total_amount;
    }

    public function approve($userId = null)
    {
        $this->status = 'approved';
        $this->approved_by = $userId ?? auth()->id();
        $this->approved_at = now();
        $this->save();
    }

    public function isDraft()
    {
        return $this->status === 'draft';
    }

    public function isApproved()
    {
        return $this->status === 'approved';
    }

    // Auto-calculate period when expense_date is set
    protected static function boot()
    {
        parent::boot();

        static::saving(function ($expense) {
            if ($expense->expense_date) {
                $date = Carbon::parse($expense->expense_date);
                $expense->period_month = $date->month;
                $expense->period_year = $date->year;
            }
        });
    }
}
