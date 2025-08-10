<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'position',
        'photo_path',
        'phone_number', // Changed from 'quote' to 'phone_number'
        'order_index',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order_index' => 'integer',
    ];

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order_index', 'asc');
    }

    // Accessors
    public function getFormattedPhoneNumberAttribute()
    {
        if (!$this->phone_number) {
            return null;
        }

        $phone = preg_replace('/\D/', '', $this->phone_number);

        // Format Indonesian phone numbers
        if (str_starts_with($phone, '62')) {
            // International format: +62 xxx xxxx xxxx
            return '+' . substr($phone, 0, 2) . ' ' .
                substr($phone, 2, 3) . ' ' .
                substr($phone, 5, 4) . ' ' .
                substr($phone, 9);
        } elseif (str_starts_with($phone, '0')) {
            // Local format: 0xxx-xxxx-xxxx
            return substr($phone, 0, 4) . '-' .
                substr($phone, 4, 4) . '-' .
                substr($phone, 8);
        }

        return $this->phone_number;
    }

    public function getWhatsappUrlAttribute()
    {
        if (!$this->phone_number) {
            return null;
        }

        $phone = preg_replace('/\D/', '', $this->phone_number);

        // Ensure phone number starts with 62 for WhatsApp
        if (str_starts_with($phone, '0')) {
            $phone = '62' . substr($phone, 1);
        } elseif (!str_starts_with($phone, '62')) {
            $phone = '62' . $phone;
        }

        return "https://wa.me/{$phone}";
    }

    public function getTelUrlAttribute()
    {
        if (!$this->phone_number) {
            return null;
        }

        return "tel:{$this->phone_number}";
    }

    // Mutators
    public function setPhoneNumberAttribute($value)
    {
        // Clean and normalize phone number
        if ($value) {
            $this->attributes['phone_number'] = preg_replace('/[^\d+]/', '', $value);
        } else {
            $this->attributes['phone_number'] = null;
        }
    }
}
