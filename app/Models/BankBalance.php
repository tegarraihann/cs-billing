<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankBalance extends Model
{
    use HasFactory;

    protected $fillable = [
        'bank_account_id',
        'period_month',
        'opening_balance',
        'current_balance',
        'notes',
        'created_by'
    ];

    protected $casts = [
        'opening_balance' => 'decimal:2',
        'current_balance' => 'decimal:2'
    ];

    /**
     * Relationship: Belongs to bank account
     */
    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class);
    }

    /**
     * Relationship: Belongs to user (creator)
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Boot method to auto-update current balance on save
     */
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($balance) {
            $balance->bankAccount->updateCurrentBalance();
        });
    }

    /**
     * Scope: For specific month
     */
    public function scopeForMonth($query, string $month)
    {
        return $query->where('period_month', $month);
    }

    /**
     * Scope: Latest balance by month
     */
    public function scopeLatest($query)
    {
        return $query->orderBy('period_month', 'desc');
    }
}