<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeHealthRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'jenis_penyakit',
        'periode_sakit',
        'tindakan_medis',
        'keterangan',
    ];

    protected $casts = [
        'periode_sakit' => 'date',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
