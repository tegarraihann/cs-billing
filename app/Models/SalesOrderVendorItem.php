<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalesOrderVendorItem extends Model
{
    protected $fillable = [
        'sales_order_id',
        'vendor_id',
        'vendor_name',
        'vendor_bank_account',
        'vendor_account_name',
        'description',
        'buying_amount',
        'selling_amount',
        'rcvd_inv',
        'remarks',
        'sort_order',
        'created_by',
    ];

    protected $casts = [
        'buying_amount' => 'decimal:2',
        'selling_amount' => 'decimal:2',
        'sort_order' => 'integer',
    ];

    public function salesOrder(): BelongsTo
    {
        return $this->belongsTo(SalesOrder::class);
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class);
    }

    public function toVendorBreakdownArray(): array
    {
        return [
            'id' => $this->id,
            'vendor_id' => $this->vendor_id,
            'nama_vendor' => $this->vendor_name,
            'no_rekening' => $this->vendor_bank_account,
            'nama_rekening' => $this->vendor_account_name,
            'description' => $this->description,
            'buying_amount' => (float) $this->buying_amount,
            'selling_amount' => (float) $this->selling_amount,
            'rcvd_inv' => $this->rcvd_inv,
            'remarks' => $this->remarks,
        ];
    }
}
