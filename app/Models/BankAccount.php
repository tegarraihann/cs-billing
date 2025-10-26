<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class BankAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'bank_name',
        'account_number',
        'account_name',
        'swift_code',
        'branch',
        'currency',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean'
    ];

    /**
     * Relationship: Bank has many balances
     */
    public function balances()
    {
        return $this->hasMany(BankBalance::class);
    }

    /**
     * Relationship: Bank has many transactions
     */
    public function transactions()
    {
        return $this->hasMany(BankTransaction::class);
    }

    /**
     * Get current balance for this bank account
     */
    public function getCurrentBalance(): float
    {
        $currentMonth = Carbon::now()->format('Y-m');

        // Get opening balance for current month
        $balance = $this->balances()
                       ->where('period_month', $currentMonth)
                       ->first();

        $openingBalance = $balance ? $balance->opening_balance : 0;

        // Get all transactions for current month
        $monthStart = Carbon::now()->startOfMonth();
        $transactions = $this->transactions()
                            ->where('transaction_date', '>=', $monthStart)
                            ->get();

        $transactionTotal = 0;
        foreach ($transactions as $transaction) {
            if ($transaction->transaction_type === 'credit') {
                $transactionTotal += $transaction->amount;
            } else {
                $transactionTotal -= $transaction->amount;
            }
        }

        return $openingBalance + $transactionTotal;
    }

    /**
     * Get balance for specific month
     */
    public function getBalanceForMonth(string $month): float
    {
        // Get opening balance for the month
        $balance = $this->balances()
                       ->where('period_month', $month)
                       ->first();

        $openingBalance = $balance ? $balance->opening_balance : 0;

        // Get all transactions for the month
        $monthStart = Carbon::createFromFormat('Y-m', $month)->startOfMonth();
        $monthEnd = Carbon::createFromFormat('Y-m', $month)->endOfMonth();

        $transactions = $this->transactions()
                            ->whereBetween('transaction_date', [$monthStart, $monthEnd])
                            ->get();

        $transactionTotal = 0;
        foreach ($transactions as $transaction) {
            if ($transaction->transaction_type === 'credit') {
                $transactionTotal += $transaction->amount;
            } else {
                $transactionTotal -= $transaction->amount;
            }
        }

        return $openingBalance + $transactionTotal;
    }

    /**
     * Update current balance in bank_balances table
     */
    public function updateCurrentBalance(): void
    {
        $currentMonth = Carbon::now()->format('Y-m');
        $currentBalance = $this->getCurrentBalance();

        $balance = $this->balances()
                       ->where('period_month', $currentMonth)
                       ->first();

        if ($balance) {
            $balance->update(['current_balance' => $currentBalance]);
        }
    }

    /**
     * Update current balance WITHOUT triggering events (prevents infinite loop)
     */
    public function updateCurrentBalanceQuietly(): void
    {
        $currentMonth = Carbon::now()->format('Y-m');
        $currentBalance = $this->getCurrentBalance();

        $balance = $this->balances()
                       ->where('period_month', $currentMonth)
                       ->first();

        if ($balance) {
            // Use saveQuietly() to prevent triggering the saved() event
            $balance->current_balance = $currentBalance;
            $balance->saveQuietly();
        }
    }

    /**
     * Scope: Only active banks
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Static method: Get Mandiri bank
     */
    public static function getMandiri()
    {
        return self::where('bank_name', 'Mandiri')->where('is_active', true)->first();
    }

    /**
     * Static method: Get BCA bank
     */
    public static function getBCA()
    {
        return self::where('bank_name', 'BCA')->where('is_active', true)->first();
    }
}