<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeWorkExperience extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'nama_perusahaan',
        'jabatan',
        'tanggal_mulai',
        'tanggal_berakhir',
        'alasan_berhenti',
        'gaji_terakhir',
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_berakhir' => 'date',
        'gaji_terakhir' => 'decimal:2',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function getDurationAttribute()
    {
        if (!$this->tanggal_mulai) return null;
        
        $endDate = $this->tanggal_berakhir ?: now();
        return $this->tanggal_mulai->diffInMonths($endDate);
    }

    public function getFormattedSalaryAttribute()
    {
        return $this->gaji_terakhir ? 'Rp ' . number_format($this->gaji_terakhir, 0, ',', '.') : null;
    }
}
