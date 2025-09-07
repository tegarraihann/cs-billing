<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeCompanyReference extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'nama_referensi',
        'jabatan_referensi',
        'nomor_telepon_referensi',
        'email_referensi',
        'hubungan',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
