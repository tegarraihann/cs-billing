<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Customer extends Model
{
    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'address',
        'inquiry_source',
        'status',
        'notes',
        'handled_by',
        'last_contact_at'
    ];

    protected $casts = [
        'last_contact_at' => 'datetime',
    ];

    public function handler(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }

    public function getInquirySourceLabelAttribute(): string
    {
        return match($this->inquiry_source) {
            'whatsapp' => 'WhatsApp',
            'email' => 'Email',
            'phone' => 'Telepon',
            'website' => 'Website',
            default => ucfirst($this->inquiry_source)
        };
    }

    public function getStatusLabelAttribute(): string
    {
        return match($this->status) {
            'new' => 'Baru',
            'contacted' => 'Dihubungi',
            'quoted' => 'Dikutip',
            'converted' => 'Konversi',
            'closed' => 'Ditutup',
            default => ucfirst($this->status)
        };
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'new' => 'bg-blue-100 text-blue-800',
            'contacted' => 'bg-yellow-100 text-yellow-800',
            'quoted' => 'bg-purple-100 text-purple-800',
            'converted' => 'bg-green-100 text-green-800',
            'closed' => 'bg-gray-100 text-gray-800',
            default => 'bg-gray-100 text-gray-800'
        };
    }
}
