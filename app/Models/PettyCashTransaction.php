<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PettyCashTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_date',
        'description',
        'category_id',
        'amount',
        'type',
        'so_number',
        'balance_after',
        'notes',
        'receipt_file',
        'status',
        'user_id',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2',
        'balance_after' => 'decimal:2',
        'approved_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(PettyCashCategory::class, 'category_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeByStatus($query, $status)
    {
        return $query->where('status', $status);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('transaction_date', [$startDate, $endDate]);
    }

    public function scopeToday($query)
    {
        return $query->whereDate('transaction_date', Carbon::today());
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('transaction_date', Carbon::now()->month)
                    ->whereYear('transaction_date', Carbon::now()->year);
    }

    public function getFormattedAmountAttribute()
    {
        return 'Rp ' . number_format($this->amount, 0, ',', '.');
    }

    public function getFormattedBalanceAfterAttribute()
    {
        return 'Rp ' . number_format($this->balance_after, 0, ',', '.');
    }

    public function isExpense()
    {
        return $this->type === 'expense';
    }

    public function isTopup()
    {
        return $this->type === 'topup';
    }

    public function isRefund()
    {
        return $this->type === 'refund';
    }
}
