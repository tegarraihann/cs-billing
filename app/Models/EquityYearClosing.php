<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquityYearClosing extends Model
{
    protected $fillable = [
        'year',
        'closing_date',
        'amount',
        'notes',
        'created_by',
    ];

    protected $casts = [
        'closing_date' => 'date',
        'amount' => 'decimal:2',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
