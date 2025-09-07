<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeDocumentStatus extends Model
{
    use HasFactory;

    protected $table = 'employee_document_status';

    protected $fillable = [
        'employee_id',
        'surat_lamaran',
        'cv',
        'akte_kelahiran',
        'kartu_keluarga',
        'surat_pengalaman_kerja',
        'ktp_sim',
        'skck',
        'pas_foto',
        'ijazah',
        'surat_sehat',
        'npwp',
    ];

    protected $casts = [
        'surat_lamaran' => 'boolean',
        'cv' => 'boolean',
        'akte_kelahiran' => 'boolean',
        'kartu_keluarga' => 'boolean',
        'surat_pengalaman_kerja' => 'boolean',
        'ktp_sim' => 'boolean',
        'skck' => 'boolean',
        'pas_foto' => 'boolean',
        'ijazah' => 'boolean',
        'surat_sehat' => 'boolean',
        'npwp' => 'boolean',
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function getCompletionPercentageAttribute()
    {
        $totalDocuments = 11;
        $completedDocuments = 0;

        $documents = [
            'surat_lamaran', 'cv', 'akte_kelahiran', 'kartu_keluarga',
            'surat_pengalaman_kerja', 'ktp_sim', 'skck', 'pas_foto',
            'ijazah', 'surat_sehat', 'npwp'
        ];

        foreach ($documents as $document) {
            if ($this->{$document}) {
                $completedDocuments++;
            }
        }

        return round(($completedDocuments / $totalDocuments) * 100, 1);
    }

    public function getMissingDocumentsAttribute()
    {
        $documents = [
            'surat_lamaran' => 'Surat Lamaran',
            'cv' => 'CV',
            'akte_kelahiran' => 'Akte Kelahiran',
            'kartu_keluarga' => 'Kartu Keluarga',
            'surat_pengalaman_kerja' => 'Surat Pengalaman Kerja',
            'ktp_sim' => 'KTP/SIM',
            'skck' => 'SKCK',
            'pas_foto' => 'Pas Foto',
            'ijazah' => 'Ijazah',
            'surat_sehat' => 'Surat Sehat',
            'npwp' => 'NPWP'
        ];

        $missing = [];
        foreach ($documents as $key => $label) {
            if (!$this->{$key}) {
                $missing[] = $label;
            }
        }

        return $missing;
    }
}
