<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;

class EquipmentTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_date',
        'transaction_type',
        'asset_name',
        'category',
        'reference_number',
        'description',
        'amount',
        'pl_account_id',
        'source_type',
        'bank_account_id',
        'petty_cash_category_id',
        'petty_cash_transaction_id',
        'useful_life_months',
        'depreciation_start_date',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2',
        'depreciation_start_date' => 'date',
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

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function depreciationSchedules(): HasMany
    {
        return $this->hasMany(EquipmentDepreciationSchedule::class);
    }

    public function scopePurchases($query)
    {
        return $query->where('transaction_type', 'purchase');
    }

    public function scopeDepreciations($query)
    {
        return $query->where('transaction_type', 'depreciation');
    }

    /**
     * Generate (or ensure) depreciation schedules for a purchase.
     */
    public function ensureDepreciationSchedules(): \Illuminate\Support\Collection
    {
        if ($this->transaction_type !== 'purchase') {
            return collect();
        }

        if (!$this->useful_life_months || $this->useful_life_months < 1) {
            return $this->depreciationSchedules()->get();
        }

        $months = (int) $this->useful_life_months;
        $startDate = Carbon::parse($this->depreciation_start_date ?? $this->transaction_date);

        if ($this->depreciationSchedules()->count() >= $months) {
            return $this->depreciationSchedules()->get();
        }

        $baseAmount = round((float) $this->amount / $months, 2);
        $totalAllocated = 0;

        for ($i = 0; $i < $months; $i++) {
            $scheduleDate = $startDate->copy()->addMonthsNoOverflow($i);
            $amount = ($i === $months - 1)
                ? round((float) $this->amount - $totalAllocated, 2)
                : $baseAmount;

            $totalAllocated += $amount;

            $this->depreciationSchedules()->firstOrCreate(
                [
                    'schedule_date' => $scheduleDate->toDateString(),
                ],
                [
                    'amount' => $amount,
                ]
            );
        }

        return $this->depreciationSchedules()->get();
    }
}
