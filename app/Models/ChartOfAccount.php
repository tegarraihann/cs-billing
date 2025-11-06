<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ChartOfAccount extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_code',
        'account_name',
        'account_type',
        'account_category',
        'parent_code',
        'is_active',
        'sort_order',
        'description',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    public function entries(): HasMany
    {
        return $this->hasMany(ProfitLossEntry::class, 'account_id');
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(ChartOfAccount::class, 'parent_code', 'account_code');
    }

    public function children(): HasMany
    {
        return $this->hasMany(ChartOfAccount::class, 'parent_code', 'account_code');
    }

    public function getFullNameAttribute(): string
    {
        return $this->account_code . ' - ' . $this->account_name;
    }

    public function getTotalAmountForPeriod($period_id): float
    {
        return $this->entries()
                   ->where('period_id', $period_id)
                   ->sum('amount');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByType($query, $type)
    {
        return $query->where('account_type', $type);
    }

    public function scopeByCategory($query, $category)
    {
        return $query->where('account_category', $category);
    }

    public function scopeRevenue($query)
    {
        return $query->where('account_type', 'revenue');
    }

    public function scopeExpense($query)
    {
        return $query->where('account_type', 'expense');
    }

    public function scopeAsset($query)
    {
        return $query->where('account_type', 'asset');
    }

    public function scopeLiability($query)
    {
        return $query->where('account_type', 'liability');
    }

    public function scopeEquity($query)
    {
        return $query->where('account_type', 'equity');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('account_code');
    }

    public static function getAccountsByType(): array
    {
        return [
            'revenue' => self::revenue()->active()->ordered()->get(),
            'expense' => self::expense()->active()->ordered()->get(),
            'asset' => self::asset()->active()->ordered()->get(),
            'liability' => self::liability()->active()->ordered()->get(),
            'equity' => self::equity()->active()->ordered()->get(),
        ];
    }

    public static function getAccountsByCategory($type): array
    {
        $accounts = self::byType($type)->active()->ordered()->get();
        
        return $accounts->groupBy('account_category')->toArray();
    }

    /**
     * Cache account lookups by code to avoid repeated queries.
     */
    public static function idByCode(string $code): ?int
    {
        static $cache = [];

        if (!array_key_exists($code, $cache)) {
            $cache[$code] = self::where('account_code', $code)->value('id');
        }

        return $cache[$code];
    }

    public static function findByCode(string $code): ?self
    {
        return self::where('account_code', $code)->first();
    }
}
