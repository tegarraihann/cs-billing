<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\BankAccount;
use App\Models\User;

class OtherIncomePayment extends Model
{
    use HasFactory;

    protected $fillable = [
        'other_income_id',
        'payment_date',
        'payment_method',
        'bank_account_id',
        'amount',
        'adjustment_amount',
        'adjustment_type',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'payment_date' => 'date',
        'amount' => 'decimal:2',
        'adjustment_amount' => 'decimal:2',
    ];

    public function otherIncome(): BelongsTo
    {
        return $this->belongsTo(OtherIncome::class);
    }

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
