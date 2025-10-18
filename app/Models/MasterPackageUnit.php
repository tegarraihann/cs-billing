<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class MasterPackageUnit extends Model
{
    protected $fillable = [
        'code',
        'name',
        'description',
        'is_active',
        'sort_order'
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'sort_order' => 'integer'
    ];

    // Scopes
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('name');
    }

    // Helper methods
    public static function getActiveOptions(): array
    {
        return static::active()
            ->ordered()
            ->pluck('name', 'code')
            ->toArray();
    }

    public static function getActiveUnits()
    {
        return static::active()
            ->ordered()
            ->select('code', 'name', 'description')
            ->get();
    }

    // Validation rules
    public static function validationRules(): array
    {
        return [
            'code' => 'required|string|max:10|unique:master_package_units,code',
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ];
    }

    public static function updateValidationRules($id): array
    {
        return [
            'code' => "required|string|max:10|unique:master_package_units,code,{$id}",
            'name' => 'required|string|max:50',
            'description' => 'nullable|string|max:255',
            'is_active' => 'boolean',
            'sort_order' => 'integer|min:0'
        ];
    }
}