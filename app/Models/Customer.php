<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    protected $fillable = [
        'so_number',
        'customer_code',
        'consignee_shipper',
        'awb_bl_number',
        'cust_doc_name',
        'type_qty',
        'no_kont_pallet',
        'pol_pod',
        'eta',
        'vendors',
        'handled_by',
        'last_contact_at'
    ];

    protected $casts = [
        'last_contact_at' => 'datetime',
        'eta' => 'date',
        'vendors' => 'array',
    ];

    public function handler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }

}
