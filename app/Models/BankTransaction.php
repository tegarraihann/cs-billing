<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'bank_account_id',
        'transaction_date',
        'transaction_type',
        'amount',
        'description',
        'reference_type',
        'reference_id',
        'created_by'
    ];

    protected $casts = [
        'transaction_date' => 'date',
        'amount' => 'decimal:2'
    ];

    /**
     * Relationship: Belongs to bank account
     */
    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class);
    }

    /**
     * Relationship: Belongs to user (creator)
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Boot method to auto-update bank balance on save
     */
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($transaction) {
            $transaction->bankAccount->updateCurrentBalance();
        });

        static::deleted(function ($transaction) {
            $transaction->bankAccount->updateCurrentBalance();
        });
    }

    /**
     * Static method: Record customer payment
     */
    public static function recordCustomerPayment(
        int $bankAccountId,
        float $amount,
        string $description,
        int $referenceId,
        string $transactionDate = null
    ): self {
        return self::create([
            'bank_account_id' => $bankAccountId,
            'transaction_date' => $transactionDate ?? now()->toDateString(),
            'transaction_type' => 'credit',
            'amount' => $amount,
            'description' => $description,
            'reference_type' => 'customer_payment',
            'reference_id' => $referenceId,
            'created_by' => auth()->id()
        ]);
    }

    /**
     * Static method: Record vendor payment
     */
    public static function recordVendorPayment(
        int $bankAccountId,
        float $amount,
        string $description,
        int $referenceId,
        string $transactionDate = null
    ): self {
        return self::create([
            'bank_account_id' => $bankAccountId,
            'transaction_date' => $transactionDate ?? now()->toDateString(),
            'transaction_type' => 'debit',
            'amount' => $amount,
            'description' => $description,
            'reference_type' => 'vendor_payment',
            'reference_id' => $referenceId,
            'created_by' => auth()->id()
        ]);
    }

    /**
     * Scope: Credit transactions
     */
    public function scopeCredit($query)
    {
        return $query->where('transaction_type', 'credit');
    }

    /**
     * Scope: Debit transactions
     */
    public function scopeDebit($query)
    {
        return $query->where('transaction_type', 'debit');
    }

    /**
     * Scope: Customer payments
     */
    public function scopeCustomerPayments($query)
    {
        return $query->where('reference_type', 'customer_payment');
    }

    /**
     * Scope: Vendor payments
     */
    public function scopeVendorPayments($query)
    {
        return $query->where('reference_type', 'vendor_payment');
    }

    /**
     * Scope: For specific month
     */
    public function scopeForMonth($query, string $month)
    {
        $startDate = date('Y-m-01', strtotime($month . '-01'));
        $endDate = date('Y-m-t', strtotime($month . '-01'));

        return $query->whereBetween('transaction_date', [$startDate, $endDate]);
    }
}