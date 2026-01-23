<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquityEntry extends Model
{
    use HasFactory;

    public const TYPES = [
        'paid_in_capital' => [
            'label' => 'Paid-in Capital',
            'account_code' => '3100',
            'direction' => 'increase',
            'bank_transaction_type' => 'credit',
            'bank_allowed' => true,
        ],
        'retained_earnings' => [
            'label' => 'Retained Earnings',
            'account_code' => '3200',
            'direction' => 'increase',
            'bank_transaction_type' => null,
            'bank_allowed' => false,
        ],
        'current_year_profit' => [
            'label' => 'Current Year Profit',
            'account_code' => '3300',
            'direction' => 'increase',
            'bank_transaction_type' => null,
            'bank_allowed' => false,
        ],
        'dividend_prive' => [
            'label' => 'Dividend / Prive',
            'account_code' => '3400',
            'direction' => 'decrease',
            'bank_transaction_type' => 'debit',
            'bank_allowed' => true,
        ],
        'management_loan' => [
            'label' => 'Management Loan',
            'account_code' => '3500',
            'direction' => 'increase',
            'bank_transaction_type' => 'credit',
            'bank_allowed' => true,
        ],
        'deferred_liability' => [
            'label' => 'Deferred Liabilities',
            'account_code' => '3600',
            'direction' => 'increase',
            'bank_transaction_type' => 'credit',
            'bank_allowed' => true,
        ],
        'annual_closing' => [
            'label' => 'Annual Closing',
            'account_code' => null,
            'direction' => 'neutral',
            'bank_transaction_type' => null,
            'bank_allowed' => false,
        ],
    ];

    protected $fillable = [
        'entry_type',
        'account_id',
        'entry_date',
        'amount',
        'direction',
        'is_opening',
        'affects_bank',
        'bank_account_id',
        'bank_transaction_id',
        'bank_transaction_type',
        'status',
        'settled_at',
        'reference',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'entry_date' => 'date',
        'amount' => 'decimal:2',
        'is_opening' => 'boolean',
        'affects_bank' => 'boolean',
        'settled_at' => 'date',
    ];

    public function account(): BelongsTo
    {
        return $this->belongsTo(ChartOfAccount::class, 'account_id');
    }

    public function bankAccount(): BelongsTo
    {
        return $this->belongsTo(BankAccount::class, 'bank_account_id');
    }

    public function bankTransaction(): BelongsTo
    {
        return $this->belongsTo(BankTransaction::class, 'bank_transaction_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public static function typeOptions(): array
    {
        return collect(self::TYPES)
            ->map(fn (array $config, string $key) => [
                'value' => $key,
                'label' => $config['label'],
                'bank_allowed' => $config['bank_allowed'],
            ])
            ->values()
            ->all();
    }

    public static function resolveTypeConfig(string $type): array
    {
        return self::TYPES[$type] ?? [];
    }
}
