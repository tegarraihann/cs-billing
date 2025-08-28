<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $fillable = [
        'nama_vendor',
        'pic',
        'no_hp',
        'email',
        'no_kantor',
        'nomor_rekening',
        'nama_rekening',
        'nib',
        'photo_path',
        'legal_document_path',
    ];
}
