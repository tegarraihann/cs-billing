<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    protected $fillable = [
        'no',
        'so_number',
        'customer_code',
        'company_name',
        'company_type',
        'company_address',
        'invoice_address',
        'nib',
        'npwp',
        'ktp_number',
        'pic_name',
        'pic_phone',
        'pic_email',
        'marketing_name',
        'marketing_phone',
        'marketing_email',
        'consignee_shipper',
        'awb_bl_number',
        'cust_doc_name',
        'type_qty',
        'no_kont_pallet',
        'pol_pod',
        'eta',
        'vendors',
        'photo_path',
        'legal_document_path',
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
