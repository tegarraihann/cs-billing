<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    protected $fillable = [
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
        'photo_path',
        'legal_document_path',
        'handled_by',
        'last_contact_at',
        // Partnership & Service Fields (Opsi 1)
        'partnership_start_date',
        'service_types_available',
        'service_types_used',
        'current_active_services',
        'main_goods_description'
    ];

    protected $casts = [
        'last_contact_at' => 'datetime',
        'partnership_start_date' => 'date',
        'service_types_available' => 'array',
        'service_types_used' => 'array',
        'current_active_services' => 'array',
    ];


    public function handler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }

    public function documents(): HasMany
    {
        return $this->hasMany(CustomerDocument::class);
    }

    public function legalDocuments(): HasMany
    {
        return $this->hasMany(CustomerDocument::class)->where('document_type', 'legal_document');
    }

    // Partnership & Service Helper Methods
    public function getAvailableServicesAttribute()
    {
        return $this->service_types_available ?? [
            'freight_forwarding',
            'customs_clearance',
            'warehousing',
            'transportation',
            'logistics_consultation'
        ];
    }

    public function getUsedServicesAttribute()
    {
        return $this->service_types_used ?? [];
    }

    public function getActiveServicesAttribute()
    {
        return $this->current_active_services ?? [];
    }

    public function getServiceUsageStatsAttribute()
    {
        $available = count($this->available_services);
        $used = count($this->used_services);
        $active = count($this->active_services);
        
        return [
            'available' => $available,
            'used' => $used,
            'active' => $active,
            'usage_percentage' => $available > 0 ? round(($used / $available) * 100, 1) : 0
        ];
    }

    public function hasService($serviceType)
    {
        return in_array($serviceType, $this->used_services);
    }

    public function isServiceActive($serviceType)
    {
        return in_array($serviceType, $this->active_services);
    }

    // Get formatted service names
    public static function getServiceNames()
    {
        return [
            'freight_forwarding' => 'Freight Forwarding',
            'customs_clearance' => 'Customs Clearance', 
            'warehousing' => 'Warehousing',
            'transportation' => 'Transportation',
            'logistics_consultation' => 'Logistics Consultation'
        ];
    }

}
