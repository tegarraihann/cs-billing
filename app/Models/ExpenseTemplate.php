<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'category_id',
        'typical_amount_min',
        'typical_amount_max',
        'is_active',
        'usage_count',
        'sort_order',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'typical_amount_min' => 'integer',
        'typical_amount_max' => 'integer',
        'usage_count' => 'integer',
        'sort_order' => 'integer',
    ];

    public function category()
    {
        return $this->belongsTo(PettyCashCategory::class, 'category_id');
    }

    public function transactions()
    {
        return $this->hasMany(PettyCashTransaction::class, 'template_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')
                    ->orderBy('usage_count', 'desc')
                    ->orderBy('name');
    }

    public function scopeByCategory($query, $categoryId)
    {
        return $query->where('category_id', $categoryId);
    }

    public function scopePopular($query)
    {
        return $query->where('usage_count', '>', 0)
                    ->orderBy('usage_count', 'desc');
    }

    // Helper methods
    public function getFormattedAmountRangeAttribute()
    {
        if ($this->typical_amount_min > 0 && $this->typical_amount_max > 0) {
            return 'Rp ' . number_format($this->typical_amount_min, 0, ',', '.') .
                   ' - Rp ' . number_format($this->typical_amount_max, 0, ',', '.');
        }
        return null;
    }

    public function incrementUsage()
    {
        $this->increment('usage_count');
    }

    public function isInAmountRange($amount)
    {
        if ($this->typical_amount_min <= 0 || $this->typical_amount_max <= 0) {
            return true; // No range specified
        }

        return $amount >= $this->typical_amount_min && $amount <= $this->typical_amount_max;
    }

    public function getAmountSuggestion()
    {
        if ($this->typical_amount_min > 0) {
            return $this->typical_amount_min;
        }
        return null;
    }
}