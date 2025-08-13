<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebsiteSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_background_image',
        'company_name',
        'company_description',
        'hero_title',
        'hero_subtitle',
        'trust_badge_text',
        'contact_phone',
        'contact_email',
        'whatsapp_number',
        'meta_description',
        'meta_keywords',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public static function getSetting()
    {
        return self::first() ?? new self();
    }
}
