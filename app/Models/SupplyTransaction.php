<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SupplyTransaction extends Model
{
    use HasFactory;

    protected $table = 'supplies_transactions';

    protected $fillable = [
        'transaction_date',
        'transaction_type',
        'category',
        'reference_number',
        'description',
        'amount',
        'quantity',
        'source_type',
        'bank_account_id',
        'petty_cash_transaction_id',
        'petty_cash_category_id',
        'depreciation_months',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2',
        'quantity' => 'decimal:2',
    ];

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class);
    }

    public function pettyCashTransaction(): BelongsTo
    {
        return $this->belongsTo(PettyCashTransaction::class);
    }

    public function pettyCashCategory(): BelongsTo
    {
        return $this->belongsTo(PettyCashCategory::class);
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function scopeTopups($query)
    {
        return $query->where('transaction_type', 'topup');
    }

    public function scopeConsumptions($query)
    {
        return $query->whereIn('transaction_type', ['usage', 'depreciation']);
    }
}
