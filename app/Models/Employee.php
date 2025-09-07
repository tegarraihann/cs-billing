<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $fillable = [
        'employee_id',
        'nama',
        'tempat_lahir',
        'tanggal_lahir',
        'jenis_kelamin',
        'agama',
        'suku_bangsa',
        'kewarganegaraan',
        'alamat_ktp',
        'rt_ktp',
        'rw_ktp',
        'kelurahan_ktp',
        'kecamatan_ktp',
        'kota_ktp',
        'provinsi_ktp',
        'nomor_telp_rumah',
        'nomor_hp',
        'email',
        'instagram',
        'linkedin',
        'nama_emergency',
        'hubungan_emergency',
        'alamat_emergency',
        'nomor_telepon_emergency',
        'alamat_orang_tua',
        'rt_orang_tua',
        'rw_orang_tua',
        'kelurahan_orang_tua',
        'kecamatan_orang_tua',
        'kota_orang_tua',
        'provinsi_orang_tua',
        'nomor_telp_orang_tua',
        'nomor_hp_orang_tua',
        'status',
        'is_active',
        'tanggal_masuk',
        'posisi',
        'keterangan',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
        'tanggal_masuk' => 'date',
        'is_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($employee) {
            if (empty($employee->employee_id)) {
                $employee->employee_id = self::generateEmployeeId();
            }
        });
    }

    private static function generateEmployeeId()
    {
        $lastEmployee = self::orderBy('id', 'desc')->first();
        $lastId = $lastEmployee ? intval(substr($lastEmployee->employee_id, 3)) : 0;
        $newId = $lastId + 1;
        
        return 'EMP' . str_pad($newId, 4, '0', STR_PAD_LEFT);
    }

    public function getFullNameAttribute()
    {
        return $this->nama;
    }

    public function getAgeAttribute()
    {
        return $this->tanggal_lahir ? $this->tanggal_lahir->age : null;
    }

    public function getStatusLabelAttribute()
    {
        return $this->status === 'active' ? 'Aktif' : 'Tidak Aktif';
    }

    public function scopeActive($query)
    {
        return $query->where('status', 'active')->where('is_active', true);
    }

    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive')->orWhere('is_active', false);
    }

    public function familyMembers()
    {
        return $this->hasMany(EmployeeFamilyMember::class);
    }

    public function workExperiences()
    {
        return $this->hasMany(EmployeeWorkExperience::class);
    }

    public function healthRecords()
    {
        return $this->hasMany(EmployeeHealthRecord::class);
    }

    public function companyReferences()
    {
        return $this->hasMany(EmployeeCompanyReference::class);
    }

    public function documentStatuses()
    {
        return $this->hasMany(EmployeeDocumentStatus::class);
    }
}
