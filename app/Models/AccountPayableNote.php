<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AccountPayableNote extends Model
{
    protected $fillable = [
        'sales_order_id',
        'account_payable_id',
        'component_id',
        'source_type',
        'note',
        'created_by',
    ];

    protected $casts = [
        'sales_order_id' => 'integer',
        'account_payable_id' => 'integer',
        'component_id' => 'integer',
        'created_by' => 'integer',
    ];

    public function accountPayable(): BelongsTo
    {
        return $this->belongsTo(AccountPayable::class);
    }

    public function component(): BelongsTo
    {
        return $this->belongsTo(AccountPayableComponent::class, 'component_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
