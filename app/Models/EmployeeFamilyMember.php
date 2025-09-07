<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeFamilyMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'hubungan_keluarga',
        'nama_keluarga',
        'jenis_kelamin_keluarga',
        'tempat_lahir_keluarga',
        'tanggal_lahir_keluarga',
        'pendidikan_terakhir',
        'pekerjaan',
    ];

    protected $casts = [
        'tanggal_lahir_keluarga' => 'date',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function getAgeAttribute()
    {
        return $this->tanggal_lahir_keluarga ? $this->tanggal_lahir_keluarga->age : null;
    }
}
