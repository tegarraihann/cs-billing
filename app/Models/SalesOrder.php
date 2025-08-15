<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SalesOrder extends Model
{
    protected $fillable = [
        // New required fields based on requirements
        'order_number',
        'customer',
        'shipper',
        'bl_awb',
        'liner',
        'vessel',
        'eta',
        'aju',
        'sppb_date',
        'shipment_type',
        'pol',
        'pod',
        'gudang_utc',
        'party_lcl',
        'prepared_by',
        'exchange_rate',
        'jenis_biaya',
        'buying',
        'selling',
        'revenue',
        'remarks',
        'goods',
        'container_no',
        'invoice_number',
        'invoice_date',
        'top',
        
        // Legacy fields for backward compatibility (now nullable)
        'so_number',
        'so_date',
        'customer_id',
        'customer_name',
        'customer_code',
        'customer_address',
        'customer_phone',
        'customer_email',
        'consignee_shipper',
        'shipping_address',
        'awb_bl_number',
        'vessel_flight',
        'etd',
        'pol_pod',
        'no_kont_pallet',
        'service_description',
        'commodity',
        'package_type',
        'qty',
        'weight_volume',
        'rate',
        'rate_unit',
        'total_amount',
        'currency',
        'additional_charges',
        'payment_terms',
        'special_instructions',
        'terms_conditions',
        'status',
        'sent_at',
        'confirmed_at',
        'last_modified_at',
        
        // System fields
        'created_by',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'so_date' => 'date',
        'eta' => 'date',
        'sppb_date' => 'date',
        'invoice_date' => 'date',
        'exchange_rate' => 'decimal:4',
        'buying' => 'decimal:2',
        'selling' => 'decimal:2',
        'revenue' => 'decimal:2',
    ];

    // Relationships
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }
}
