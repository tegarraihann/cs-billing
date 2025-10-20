<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GeneralExpenseItem extends Model
{
    protected $fillable = [
        'expense_id',
        'description',
        'amount',
        'notes'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];

    // Relationships
    public function expense(): BelongsTo
    {
        return $this->belongsTo(GeneralExpense::class, 'expense_id');
    }

    // Auto-update parent total when item is saved/deleted
    protected static function boot()
    {
        parent::boot();

        static::saved(function ($item) {
            $item->expense->calculateTotal();
        });

        static::deleted(function ($item) {
            $item->expense->calculateTotal();
        });
    }
}
