<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\PrepaidRentSchedule;
use Carbon\Carbon;

class PrepaidRentTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_date',
        'transaction_type',
        'reference_number',
        'description',
        'amount',
        'source_type',
        'bank_account_id',
        'petty_cash_category_id',
        'petty_cash_transaction_id',
        'rental_start_date',
        'rental_end_date',
        'amortization_months',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'rental_start_date' => 'date',
        'rental_end_date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class);
    }

    public function pettyCashCategory(): BelongsTo
    {
        return $this->belongsTo(PettyCashCategory::class);
    }

    public function pettyCashTransaction(): BelongsTo
    {
        return $this->belongsTo(PettyCashTransaction::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(PrepaidRentSchedule::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeTopups($query)
    {
        return $query->where('transaction_type', 'topup');
    }

    public function scopeAmortizations($query)
    {
        return $query->where('transaction_type', 'amortization');
    }

    /**
     * Generate (or ensure) amortization schedules for this top-up.
     * Returns the schedule collection.
     */
    public function ensureSchedules(): \Illuminate\Support\Collection
    {
        if ($this->transaction_type !== 'topup') {
            return collect();
        }

        if (!$this->amortization_months || $this->amortization_months < 1) {
            return $this->schedules()->get();
        }

        $startDate = Carbon::parse($this->rental_start_date ?? $this->transaction_date)->startOfMonth();
        $months = (int) $this->amortization_months;

        // Avoid regenerating if already complete
        if ($this->schedules()->count() >= $months) {
            return $this->schedules()->get();
        }

        $baseAmount = round((float) $this->amount / $months, 2);
        $totalAllocated = 0;

        for ($i = 0; $i < $months; $i++) {
            $period = $startDate->copy()->addMonthsNoOverflow($i);
            $amount = ($i === $months - 1)
                ? round((float) $this->amount - $totalAllocated, 2)
                : $baseAmount;

            $totalAllocated += $amount;

            $this->schedules()->firstOrCreate(
                [
                    'period_month' => $period->month,
                    'period_year' => $period->year,
                ],
                [
                    'amount' => $amount,
                ]
            );
        }

        return $this->schedules()->get();
    }
}
