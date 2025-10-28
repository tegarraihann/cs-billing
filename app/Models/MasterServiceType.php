<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MasterServiceType extends Model
{
    use SoftDeletes;

    protected $table = 'master_service_types';

    protected $fillable = [
        'code',
        'description',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Scope untuk mendapatkan service type yang aktif
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope untuk mengurutkan berdasarkan ID (auto-increment)
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('id', 'asc');
    }
}
