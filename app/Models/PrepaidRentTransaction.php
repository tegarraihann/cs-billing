<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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
}
