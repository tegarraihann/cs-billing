<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Models\Customer;
use App\Models\User;
use App\Models\ProfitLossPeriod;
use App\Models\ProfitLossEntry;
use Illuminate\Support\Facades\Auth;

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
    public const STATUS_OUTSTANDING = 'outstanding';
    public const STATUS_PARTIAL = 'partial';
    public const STATUS_PAID = 'paid';

    protected $fillable = [
        'reference_number',
        'customer_id',
        'customer_name',
        'transaction_date',
        'category',
        'description',
        'amount',
        'due_date',
        'status',
        'pl_account_id',
        'paid_amount',
        'outstanding_amount',
        'tax_adjustment_amount',
        'other_adjustment_amount',
        'last_payment_date',
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
        'due_date' => 'date',
        'paid_amount' => 'decimal:2',
        'outstanding_amount' => 'decimal:2',
        'tax_adjustment_amount' => 'decimal:2',
        'other_adjustment_amount' => 'decimal:2',
        'last_payment_date' => 'date',
        'posted_to_profit_loss' => 'boolean',
        'posted_at' => 'datetime',
        'approved_at' => 'datetime',
    ];

    // Relationships
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(OtherIncomePayment::class);
    }

    protected static function booted(): void
    {
        static::creating(function (self $income) {
            $income->status = $income->status ?: self::STATUS_OUTSTANDING;
            $income->paid_amount = $income->paid_amount ?? 0;
            $income->tax_adjustment_amount = $income->tax_adjustment_amount ?? 0;
            $income->other_adjustment_amount = $income->other_adjustment_amount ?? 0;
            $income->outstanding_amount = $income->amount;
        });

        static::saving(function (self $income) {
            $income->recalculateStatus(false);
        });
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

        $actorId = $userId ?? auth()->id();
        $this->update([
            'posted_to_profit_loss' => true,
            'posted_at' => now(),
            'approved_by' => $actorId,
            'approved_at' => $this->approved_at ?? now(),
        ]);

        // Buat entri laba rugi untuk periode aktif yang mencakup tanggal transaksi
        $txnDate = Carbon::parse($this->transaction_date)->toDateString();
        $periods = ProfitLossPeriod::where('status', '!=', 'closed')
            ->where('start_date', '<=', $txnDate)
            ->where('end_date', '>=', $txnDate)
            ->get();

        // Fallback: gunakan periode yang mencakup bulan transaksi bila tidak ada yang presisi
        if ($periods->isEmpty()) {
            $monthStart = Carbon::parse($txnDate)->startOfMonth()->toDateString();
            $monthEnd = Carbon::parse($txnDate)->endOfMonth()->toDateString();
            $periods = ProfitLossPeriod::where('status', '!=', 'closed')
                ->where('start_date', '<=', $monthStart)
                ->where('end_date', '>=', $monthEnd)
                ->get();
        }

        // Fallback terakhir: periode non-closed terbaru
        if ($periods->isEmpty()) {
            $fallback = ProfitLossPeriod::where('status', '!=', 'closed')
                ->orderBy('end_date', 'desc')
                ->first();
            if ($fallback) {
                $periods = collect([$fallback]);
            }
        }

        foreach ($periods as $period) {
            ProfitLossEntry::createFromOtherIncome($this, $period->id, $actorId);
        }

        if ($periods->isNotEmpty()) {
            $periods->each->calculateTotals();
        }

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

        // Hapus entri laba rugi terkait
        ProfitLossEntry::where('reference_type', 'other_income')
            ->where('reference_id', $this->id)
            ->delete();

        return true;
    }
    public function recordPayment(array $payload): OtherIncomePayment
    {
        return DB::transaction(function () use ($payload) {
            $payment = $this->payments()->create([
                'payment_date' => $payload['payment_date'],
                'payment_method' => $payload['payment_method'],
                'bank_account_id' => $payload['bank_account_id'] ?? null,
                'amount' => $payload['amount'],
                'adjustment_amount' => $payload['adjustment_amount'] ?? 0,
                'adjustment_type' => $payload['adjustment_type'] ?? null,
                'notes' => $payload['notes'] ?? null,
                'created_by' => $payload['created_by'] ?? auth()->id(),
            ]);

            $this->paid_amount = ($this->paid_amount ?? 0) + $payment->amount;

            if ($payment->adjustment_type === 'tax_expense') {
                $this->tax_adjustment_amount += $payment->adjustment_amount;
            } elseif ($payment->adjustment_type === 'other_expense') {
                $this->other_adjustment_amount += $payment->adjustment_amount;
            }

            $this->last_payment_date = $payment->payment_date;
            $this->recalculateStatus();

            if ($this->status === self::STATUS_PAID && !$this->posted_to_profit_loss) {
                $this->postToProfitLoss($payment->created_by);
            }

            return $payment;
        });
    }

    public function recalculateStatus(bool $save = true): void
    {
        $totalAdjustments = ($this->tax_adjustment_amount ?? 0) + ($this->other_adjustment_amount ?? 0);
        $outstanding = max(0, (float) $this->amount - (float) $this->paid_amount - $totalAdjustments);
        $this->outstanding_amount = $outstanding;

        if ($outstanding <= 0.01) {
            $this->status = self::STATUS_PAID;
            $this->outstanding_amount = 0;
        } elseif ($this->paid_amount > 0 || $totalAdjustments > 0) {
            $this->status = self::STATUS_PARTIAL;
        } else {
            $this->status = self::STATUS_OUTSTANDING;
        }

        if ($save) {
            $this->saveQuietly();
        }
    }
}
