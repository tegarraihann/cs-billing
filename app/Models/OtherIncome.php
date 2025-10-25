<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

/**
 * Other Income Model
 *
 * For income that is NOT from main logistics services (not from SO).
 * Examples: Bank interest, asset sales, rent, etc.
 *
 * As per Excel "LABA RUGI" sheet, main categories are:
 * - Bunga Bank Mandiri
 * - Bunga Bank BCA
 * - Lainnya (Other)
 */
class OtherIncome extends Model
{
    protected $fillable = [
        'transaction_date',
        'category',
        'description',
        'amount',
        'notes',
        'receipt_file',
        'posted_to_profit_loss',
        'posted_at',
        'created_by',
        'approved_by',
        'approved_at',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2',
        'posted_to_profit_loss' => 'boolean',
        'posted_at' => 'datetime',
        'approved_at' => 'datetime',
    ];

    // Relationships
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Scopes
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    public function scopeByDateRange($query, $startDate, $endDate)
    {
        return $query->whereBetween('transaction_date', [$startDate, $endDate]);
    }

    public function scopeThisMonth($query)
    {
        return $query->whereMonth('transaction_date', Carbon::now()->month)
                    ->whereYear('transaction_date', Carbon::now()->year);
    }

    public function scopeThisYear($query)
    {
        return $query->whereYear('transaction_date', Carbon::now()->year);
    }

    public function scopePosted($query)
    {
        return $query->where('posted_to_profit_loss', true);
    }

    public function scopeNotPosted($query)
    {
        return $query->where('posted_to_profit_loss', false);
    }

    // Helper methods
    public function getFormattedAmountAttribute()
    {
        return 'Rp ' . number_format($this->amount, 0, ',', '.');
    }

    public function isPosted()
    {
        return $this->posted_to_profit_loss;
    }

    // Static method to get available categories
    public static function getCategories()
    {
        return [
            'Bunga Bank Mandiri',
            'Bunga Bank BCA',
            'Lainnya'
        ];
    }

    // Post to profit/loss
    public function postToProfitLoss($userId = null)
    {
        if ($this->posted_to_profit_loss) {
            throw new \Exception('Income already posted to profit/loss.');
        }

        $this->update([
            'posted_to_profit_loss' => true,
            'posted_at' => now(),
            'approved_by' => $userId ?? auth()->id(),
            'approved_at' => $this->approved_at ?? now(),
        ]);

        return true;
    }

    // Unpost from profit/loss
    public function unpostFromProfitLoss()
    {
        if (!$this->posted_to_profit_loss) {
            throw new \Exception('Income not yet posted to profit/loss.');
        }

        $this->update([
            'posted_to_profit_loss' => false,
            'posted_at' => null,
        ]);

        return true;
    }
}
