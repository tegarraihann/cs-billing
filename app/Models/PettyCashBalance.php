<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
        'account_id',
    ];

    protected $casts = [
        'balance_date' => 'date',
        'opening_balance' => 'decimal:2',
        'total_in' => 'decimal:2',
        'total_out' => 'decimal:2',
        'closing_balance' => 'decimal:2',
        'account_id' => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (self $balance) {
            $balance->account_id = $balance->account_id ?: ChartOfAccount::idByCode('1110');
        });

        static::updating(function (self $balance) {
            if (!$balance->account_id) {
                $balance->account_id = ChartOfAccount::idByCode('1110');
            }
        });
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(ChartOfAccount::class);
    }

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
        // Calculate balance from actual transactions
        $totalTopups = PettyCashTransaction::where('type', 'topup')->sum('amount');
        $totalRefunds = PettyCashTransaction::where('type', 'refund')->sum('amount');
        $totalExpenses = PettyCashTransaction::where('type', 'expense')->sum('amount');

        return $totalTopups + $totalRefunds - $totalExpenses;
    }

    /**
     * Get current balance from balance records (legacy method)
     */
    public static function getCurrentBalanceFromRecords()
    {
        $latestBalance = self::orderBy('balance_date', 'desc')->first();
        return $latestBalance ? $latestBalance->closing_balance : 0;
    }

    /**
     * Update or create balance record for a specific date
     */
    public static function updateBalanceForDate($date = null)
    {
        if (!$date) {
            $date = now()->toDateString();
        }

        $dateObj = \Carbon\Carbon::parse($date);
        $startOfDay = $dateObj->copy()->startOfDay();
        $endOfDay = $dateObj->copy()->endOfDay();

        // Get transactions for this date
        $dailyTransactions = PettyCashTransaction::whereBetween('transaction_date', [$startOfDay, $endOfDay])->get();

        $totalIn = $dailyTransactions->whereIn('type', ['topup', 'refund', 'opening'])->sum('amount');
        $totalOut = $dailyTransactions->where('type', 'expense')->sum('amount');

        // Get opening balance (closing balance from previous day)
        $previousBalance = self::where('balance_date', '<', $date)
            ->orderBy('balance_date', 'desc')
            ->first();

        $openingBalance = $previousBalance ? $previousBalance->closing_balance : self::calculateBalanceUpToDate($date, false);
        $closingBalance = $openingBalance + $totalIn - $totalOut;

        // Update or create balance record
        return self::updateOrCreate(
            ['balance_date' => $date],
            [
                'opening_balance' => $openingBalance,
                'total_in' => $totalIn,
                'total_out' => $totalOut,
                'closing_balance' => $closingBalance,
                'transaction_count' => $dailyTransactions->count(),
                'notes' => 'Auto-calculated from transactions',
                'account_id' => ChartOfAccount::idByCode('1110'),
            ]
        );
    }

    /**
     * Calculate balance up to a specific date
     */
    public static function calculateBalanceUpToDate($date, $inclusive = true)
    {
        $query = PettyCashTransaction::query();

        if ($inclusive) {
            $query->where('transaction_date', '<=', $date);
        } else {
            $query->where('transaction_date', '<', $date);
        }

        $totalTopups = $query->clone()->where('type', 'topup')->sum('amount');
        $totalRefunds = $query->clone()->where('type', 'refund')->sum('amount');
        $totalOpenings = $query->clone()->where('type', 'opening')->sum('amount');
        $totalExpenses = $query->clone()->where('type', 'expense')->sum('amount');

        return $totalTopups + $totalRefunds + $totalOpenings - $totalExpenses;
    }

    /**
     * Sync all balance records with actual transactions
     */
    public static function syncAllBalances()
    {
        // Get all unique transaction dates
        $transactionDates = PettyCashTransaction::selectRaw('DATE(transaction_date) as date')
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('date');

        foreach ($transactionDates as $date) {
            self::updateBalanceForDate($date);
        }

        // Also update today if no transactions
        if (!$transactionDates->contains(now()->toDateString())) {
            self::updateBalanceForDate(now()->toDateString());
        }
    }

    /**
     * Sync all transaction balance_after fields with correct cumulative calculation
     */
    public static function syncAllTransactionBalances()
    {
        // Get all transactions ordered by date and time
        $transactions = PettyCashTransaction::orderBy('transaction_date')
            ->orderBy('created_at')
            ->get();

        $runningBalance = 0;

        foreach ($transactions as $transaction) {
            // Calculate new balance after this transaction
            if ($transaction->type === 'expense') {
                $runningBalance -= $transaction->amount;
            } else { // topup, refund, or opening
                $runningBalance += $transaction->amount;
            }

            // Update the balance_after field
            $transaction->update(['balance_after' => $runningBalance]);
        }

        // Also sync the balance records
        self::syncAllBalances();

        return $runningBalance; // Return final balance
    }
}
