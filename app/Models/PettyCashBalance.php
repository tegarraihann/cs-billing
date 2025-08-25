<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PettyCashBalance extends Model
{
    use HasFactory;

    protected $fillable = [
        'balance_date',
        'opening_balance',
        'total_in',
        'total_out',
        'closing_balance',
        'transaction_count',
        'notes',
    ];

    protected $casts = [
        'balance_date' => 'date',
        'opening_balance' => 'decimal:2',
        'total_in' => 'decimal:2',
        'total_out' => 'decimal:2',
        'closing_balance' => 'decimal:2',
    ];

    public function scopeByDate($query, $date)
    {
        return $query->where('balance_date', $date);
    }

    public function scopeToday($query)
    {
        return $query->where('balance_date', Carbon::today());
    }

    public function scopeThisMonth($query)
    {
        $start = Carbon::now()->startOfMonth();
        $end = Carbon::now()->endOfMonth();
        return $query->whereBetween('balance_date', [$start, $end]);
    }

    public function getFormattedOpeningBalanceAttribute()
    {
        return 'Rp ' . number_format($this->opening_balance, 0, ',', '.');
    }

    public function getFormattedTotalInAttribute()
    {
        return 'Rp ' . number_format($this->total_in, 0, ',', '.');
    }

    public function getFormattedTotalOutAttribute()
    {
        return 'Rp ' . number_format($this->total_out, 0, ',', '.');
    }

    public function getFormattedClosingBalanceAttribute()
    {
        return 'Rp ' . number_format($this->closing_balance, 0, ',', '.');
    }

    public static function getCurrentBalance()
    {
        $latestBalance = self::orderBy('balance_date', 'desc')->first();
        return $latestBalance ? $latestBalance->closing_balance : 0;
    }
}
