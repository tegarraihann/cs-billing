<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EquipmentDepreciationSchedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_transaction_id',
        'schedule_date',
        'amount',
        'posted_at',
        'posted_transaction_id',
    ];

    protected $casts = [
        'schedule_date' => 'date',
        'amount' => 'decimal:2',
        'posted_at' => 'datetime',
    ];

    public function equipmentTransaction(): BelongsTo
    {
        return $this->belongsTo(EquipmentTransaction::class);
    }

    public function postedTransaction(): BelongsTo
    {
        return $this->belongsTo(EquipmentTransaction::class, 'posted_transaction_id');
    }
}
