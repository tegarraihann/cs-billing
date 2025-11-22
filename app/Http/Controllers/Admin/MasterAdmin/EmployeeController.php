<?php

namespace App\Http\Controllers\Admin\MasterAdmin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of employees.
     */
    public function index()
    {
        $employees = Employee::select('id', 'employee_id', 'nama', 'email', 'nomor_hp', 'posisi', 'status', 'is_active', 'tanggal_masuk', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/MasterAdmin/Employees/Index', [
            'employees' => $employees,
            'filters' => request()->only(['search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new employee.
     */
    public function create()
    {
        return Inertia::render('Admin/MasterAdmin/Employees/Create');
    }

    /**
     * Store a newly created employee in storage.
     */
    public function store(Request $request)
    {
        $documentRules = [
            'documents.ktp' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.kartu_keluarga' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.npwp' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.bpjs_kesehatan' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.bpjs_ketenagakerjaan' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.skck' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.cv' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.surat_lamaran' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
            'documents.surat_pengalaman_kerja' => 'nullable|file|mimes:pdf,jpg,jpeg,png|max:5120',
        ];

        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'agama' => 'required|string|max:255',
            'suku_bangsa' => 'required|string|max:255',
            'kewarganegaraan' => 'required|string|max:255',
            'alamat_ktp' => 'required|string',
            'rt_ktp' => 'required|string|max:10',
            'rw_ktp' => 'required|string|max:10',
            'kelurahan_ktp' => 'required|string|max:255',
            'kecamatan_ktp' => 'required|string|max:255',
            'kota_ktp' => 'required|string|max:255',
            'provinsi_ktp' => 'required|string|max:255',
            'nomor_telp_rumah' => 'nullable|string|max:20',
            'nomor_hp' => 'required|string|max:20',
            'email' => 'required|string|email|max:255|unique:employees',
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'nama_emergency' => 'nullable|string|max:255',
            'hubungan_emergency' => 'nullable|string|max:255',
            'alamat_emergency' => 'nullable|string',
            'nomor_telepon_emergency' => 'nullable|string|max:20',
            'alamat_orang_tua' => 'nullable|string',
            'rt_orang_tua' => 'nullable|string|max:10',
            'rw_orang_tua' => 'nullable|string|max:10',
            'kelurahan_orang_tua' => 'nullable|string|max:255',
            'kecamatan_orang_tua' => 'nullable|string|max:255',
            'kota_orang_tua' => 'nullable|string|max:255',
            'provinsi_orang_tua' => 'nullable|string|max:255',
            'nomor_telp_orang_tua' => 'nullable|string|max:20',
            'nomor_hp_orang_tua' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
            'tanggal_masuk' => 'nullable|date',
            'posisi' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ] + $documentRules);

        $validated['is_active'] = $validated['status'] === 'active';

        $employee = Employee::create($validated);

        // Handle Family Members
        if ($request->has('family_members')) {
            $familyMembers = $request->input('family_members');
            
            // Create Ayah record if data provided
            if (!empty($familyMembers['ayah']['nama_keluarga'])) {
                $employee->familyMembers()->create([
                    'hubungan_keluarga' => 'Ayah',
                    'nama_keluarga' => $familyMembers['ayah']['nama_keluarga'],
                    'jenis_kelamin_keluarga' => 'L',
                    'tempat_lahir_keluarga' => $familyMembers['ayah']['tempat_lahir_keluarga'],
                    'tanggal_lahir_keluarga' => $familyMembers['ayah']['tanggal_lahir_keluarga'],
                    'pendidikan_terakhir' => $familyMembers['ayah']['pendidikan_terakhir'],
                    'pekerjaan' => $familyMembers['ayah']['pekerjaan'],
                ]);
            }
            
            // Create Ibu record if data provided
            if (!empty($familyMembers['ibu']['nama_keluarga'])) {
                $employee->familyMembers()->create([
                    'hubungan_keluarga' => 'Ibu',
                    'nama_keluarga' => $familyMembers['ibu']['nama_keluarga'],
                    'jenis_kelamin_keluarga' => 'P',
                    'tempat_lahir_keluarga' => $familyMembers['ibu']['tempat_lahir_keluarga'],
                    'tanggal_lahir_keluarga' => $familyMembers['ibu']['tanggal_lahir_keluarga'],
                    'pendidikan_terakhir' => $familyMembers['ibu']['pendidikan_terakhir'],
                    'pekerjaan' => $familyMembers['ibu']['pekerjaan'],
                ]);
            }
        }

        // Handle Work Experiences
        if ($request->has('work_experiences') && is_array($request->input('work_experiences'))) {
            foreach ($request->input('work_experiences') as $workExp) {
                if (!empty($workExp['nama_perusahaan']) && !empty($workExp['jabatan'])) {
                    $employee->workExperiences()->create([
                        'nama_perusahaan' => $workExp['nama_perusahaan'],
                        'jabatan' => $workExp['jabatan'],
                        'tanggal_mulai' => $workExp['tanggal_mulai'],
                        'tanggal_berakhir' => $workExp['tanggal_berakhir'] ?: null,
                        'alasan_berhenti' => $workExp['alasan_berhenti'],
                        'gaji_terakhir' => $workExp['gaji_terakhir'] ?: null,
                    ]);
                }
            }
        }

        // Handle Document Status + uploads
        $documentStatusDefaults = [
            'surat_lamaran' => false,
            'cv' => false,
            'akte_kelahiran' => false,
            'kartu_keluarga' => false,
            'surat_pengalaman_kerja' => false,
            'ktp_sim' => false,
            'skck' => false,
            'pas_foto' => false,
            'ijazah' => false,
            'surat_sehat' => false,
            'npwp' => false,
            'bpjs_kesehatan' => false,
            'bpjs_ketenagakerjaan' => false,
        ];

        $documentStatus = array_merge(
            $documentStatusDefaults,
            $request->input('document_status', [])
        );

        $documentMap = [
            'ktp' => 'KTP',
            'kartu_keluarga' => 'Kartu Keluarga',
            'npwp' => 'NPWP',
            'bpjs_kesehatan' => 'BPJS Kesehatan',
            'bpjs_ketenagakerjaan' => 'BPJS Ketenagakerjaan',
            'skck' => 'SKCK',
            'cv' => 'CV',
            'surat_lamaran' => 'Surat Lamaran',
            'surat_pengalaman_kerja' => 'Surat Pengalaman Kerja',
        ];

        foreach ($documentMap as $key => $label) {
            if ($request->hasFile("documents.{$key}")) {
                $file = $request->file("documents.{$key}");
                $path = $file->store("employee-documents/{$employee->id}", 'public');

                $employee->documents()->create([
                    'type' => $key,
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getClientMimeType(),
                    'size' => $file->getSize(),
                    'uploaded_by' => $request->user()?->id,
                ]);

                $statusKey = match ($key) {
                    'ktp' => 'ktp_sim',
                    default => $key,
                };

                if (array_key_exists($statusKey, $documentStatus)) {
                    $documentStatus[$statusKey] = true;
                }
            }
        }

        $employee->documentStatuses()->create($documentStatus);

        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Karyawan berhasil ditambahkan.',
                'employee' => $employee
            ]);
        }

        return redirect()->route('masteradmin.employees.index')
            ->with('success', 'Karyawan berhasil ditambahkan.');
    }

    /**
     * Display the specified employee.
     */
    public function show(Employee $employee)
    {
        $employee->load([
            'familyMembers',
            'workExperiences',
            'healthRecords',
            'companyReferences',
            'documentStatuses',
            'documents'
        ]);

        return Inertia::render('Admin/MasterAdmin/Employees/Show', [
            'employee' => $employee
        ]);
    }

    /**
     * Show the form for editing the specified employee.
     */
    public function edit(Employee $employee)
    {
        $employee->load([
            'familyMembers',
            'workExperiences', 
            'healthRecords',
            'companyReferences',
            'documentStatuses',
            'documents'
        ]);

        return Inertia::render('Admin/MasterAdmin/Employees/Edit', [
            'employee' => $employee
        ]);
    }

    /**
     * Update the specified employee in storage.
     */
    public function update(Request $request, Employee $employee)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'tempat_lahir' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan',
            'agama' => 'required|string|max:255',
            'suku_bangsa' => 'required|string|max:255',
            'kewarganegaraan' => 'required|string|max:255',
            'alamat_ktp' => 'required|string',
            'rt_ktp' => 'required|string|max:10',
            'rw_ktp' => 'required|string|max:10',
            'kelurahan_ktp' => 'required|string|max:255',
            'kecamatan_ktp' => 'required|string|max:255',
            'kota_ktp' => 'required|string|max:255',
            'provinsi_ktp' => 'required|string|max:255',
            'nomor_telp_rumah' => 'nullable|string|max:20',
            'nomor_hp' => 'required|string|max:20',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('employees')->ignore($employee->id)],
            'instagram' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'nama_emergency' => 'nullable|string|max:255',
            'hubungan_emergency' => 'nullable|string|max:255',
            'alamat_emergency' => 'nullable|string',
            'nomor_telepon_emergency' => 'nullable|string|max:20',
            'alamat_orang_tua' => 'nullable|string',
            'rt_orang_tua' => 'nullable|string|max:10',
            'rw_orang_tua' => 'nullable|string|max:10',
            'kelurahan_orang_tua' => 'nullable|string|max:255',
            'kecamatan_orang_tua' => 'nullable|string|max:255',
            'kota_orang_tua' => 'nullable|string|max:255',
            'provinsi_orang_tua' => 'nullable|string|max:255',
            'nomor_telp_orang_tua' => 'nullable|string|max:20',
            'nomor_hp_orang_tua' => 'nullable|string|max:20',
            'status' => 'required|in:active,inactive',
            'tanggal_masuk' => 'nullable|date',
            'posisi' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
        ]);

        $validated['is_active'] = $validated['status'] === 'active';

        $employee->update($validated);

        if ($request->wantsJson() || $request->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Karyawan berhasil diperbarui.',
                'employee' => $employee->fresh()
            ]);
        }

        return redirect()->route('masteradmin.employees.index')
            ->with('success', 'Karyawan berhasil diperbarui.');
    }

    /**
     * Remove the specified employee from storage.
     */
    public function destroy(Employee $employee)
    {
        $employeeName = $employee->nama;
        $employee->delete();

        if (request()->wantsJson() || request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => "Karyawan {$employeeName} berhasil dihapus."
            ]);
        }

        return redirect()->route('masteradmin.employees.index')
            ->with('success', "Karyawan {$employeeName} berhasil dihapus.");
    }

    /**
     * Toggle employee status (active/inactive)
     */
    public function toggleStatus(Employee $employee)
    {
        $newStatus = $employee->status === 'active' ? 'inactive' : 'active';

        $employee->update([
            'status' => $newStatus,
            'is_active' => $newStatus === 'active',
        ]);

        if (request()->wantsJson() || request()->expectsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Status karyawan berhasil diubah.',
                'employee' => $employee->fresh()
            ]);
        }

        return redirect()->back()
            ->with('success', 'Status karyawan berhasil diubah.');
    }

    /**
     * Search employees
     */
    public function search(Request $request)
    {
        $query = Employee::query();

        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('nama', 'like', '%' . $request->search . '%')
                    ->orWhere('email', 'like', '%' . $request->search . '%')
                    ->orWhere('employee_id', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        $employees = $query->select('id', 'employee_id', 'nama', 'email', 'nomor_hp', 'posisi', 'status', 'is_active', 'tanggal_masuk', 'created_at')
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/MasterAdmin/Employees/Index', [
            'employees' => $employees,
            'filters' => $request->only(['search', 'status'])
        ]);
    }
}
