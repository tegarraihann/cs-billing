<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PrepaidRentSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'prepaid_rent_transaction_id',
        'period_month',
        'period_year',
        'amount',
        'amortization_transaction_id',
        'posted_at',
    ];

    protected $casts = [
        'posted_at' => 'datetime',
        'amount' => 'decimal:2',
    ];

    public function topup(): BelongsTo
    {
        return $this->belongsTo(PrepaidRentTransaction::class, 'prepaid_rent_transaction_id');
    }

    public function amortization(): BelongsTo
    {
        return $this->belongsTo(PrepaidRentTransaction::class, 'amortization_transaction_id');
    }
}
