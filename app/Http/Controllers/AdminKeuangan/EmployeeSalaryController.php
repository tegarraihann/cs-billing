<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\EmployeeSalary;
use App\Models\BankTransaction;
use App\Models\BankAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EmployeeSalaryController extends Controller
{
    public function index(Request $request)
    {
        $query = EmployeeSalary::with(['creator', 'approver']);

        if ($request->period) {
            $query->byPeriod($request->period);
        }

        if ($request->division) {
            $query->byDivision($request->division);
        }

        if ($request->status) {
            $query->byStatus($request->status);
        }

        $salaries = $query->orderBy('salary_date', 'desc')->paginate(15);
        
        $stats = [
            'total_employees' => EmployeeSalary::active()->count(),
            'current_month_total' => EmployeeSalary::byPeriod(now()->format('Y-m'))->paid()->sum('total_salary'),
            'draft_count' => EmployeeSalary::draft()->count(),
            'paid_count' => EmployeeSalary::paid()->count(),
        ];

        return Inertia::render('Admin/AdminKeuangan/EmployeeSalary/Index', [
            'salaries' => $salaries,
            'stats' => $stats,
            'filters' => $request->only(['period', 'division', 'status']),
            'divisions' => $this->getDivisions(),
            'periods' => $this->getAvailablePeriods()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/AdminKeuangan/EmployeeSalary/Create', [
            'divisions' => $this->getDivisions()
        ]);
    }

    public function store(Request $request)
    {
        $request->merge([
            'allowances' => $this->normalizeAmount($request->allowances),
            'deductions' => $this->normalizeAmount($request->deductions),
        ]);

        $request->validate([
            'employee_name' => 'required|string|max:255',
            'employee_id' => 'nullable|string|max:50',
            'division' => 'required|in:customer_support,marketing,finance,operations,management',
            'position' => 'required|string|max:255',
            'basic_salary' => 'required|numeric|min:0',
            'allowances' => 'nullable|numeric|min:0',
            'deductions' => 'nullable|numeric|min:0',
            'salary_date' => 'required|date',
            'period_month' => 'required|string|size:7', // YYYY-MM
            'notes' => 'nullable|string',
            'details' => 'nullable|array',
        ]);

        DB::beginTransaction();
        try {
            $totalSalary = ($request->basic_salary + $request->allowances) - $request->deductions;

            $salary = EmployeeSalary::create([
                'employee_name' => $request->employee_name,
                'employee_id' => $request->employee_id,
                'division' => $request->division,
                'position' => $request->position,
                'basic_salary' => $request->basic_salary,
                'allowances' => $request->allowances ?? 0,
                'deductions' => $request->deductions ?? 0,
                'total_salary' => $totalSalary,
                'salary_date' => $request->salary_date,
                'period_month' => $request->period_month,
                'notes' => $request->notes,
                'details' => $request->details,
                'created_by' => Auth::id(),
            ]);

            // Ensure aggregate fields are consistent
            $salary->refresh();
            
            DB::commit();
            
            return redirect()->route('admin-keuangan.employee-salary.index')
                           ->with('success', 'Data gaji karyawan berhasil ditambahkan');
                           
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()
                           ->withErrors(['error' => 'Gagal menambahkan data gaji: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    public function show(EmployeeSalary $employeeSalary)
    {
        $salary = $employeeSalary->load(['creator', 'approver', 'profitLossEntries.period']);
        
        return Inertia::render('Admin/AdminKeuangan/EmployeeSalary/Show', [
            'salary' => $salary
        ]);
    }

    public function edit(EmployeeSalary $employeeSalary)
    {
        if ($employeeSalary->status === 'paid') {
            return redirect()->back()->withErrors(['error' => 'Gaji yang sudah dibayar tidak dapat diedit']);
        }

        return Inertia::render('Admin/AdminKeuangan/EmployeeSalary/Edit', [
            'salary' => $employeeSalary,
            'divisions' => $this->getDivisions()
        ]);
    }

    public function update(Request $request, EmployeeSalary $employeeSalary)
    {
        if ($employeeSalary->status === 'paid') {
            return redirect()->back()->withErrors(['error' => 'Gaji yang sudah dibayar tidak dapat diedit']);
        }

        $request->merge([
            'allowances' => $this->normalizeAmount($request->allowances),
            'deductions' => $this->normalizeAmount($request->deductions),
        ]);

        $request->validate([
            'employee_name' => 'required|string|max:255',
            'employee_id' => 'nullable|string|max:50',
            'division' => 'required|in:customer_support,marketing,finance,operations,management',
            'position' => 'required|string|max:255',
            'basic_salary' => 'required|numeric|min:0',
            'allowances' => 'nullable|numeric|min:0',
            'deductions' => 'nullable|numeric|min:0',
            'salary_date' => 'required|date',
            'period_month' => 'required|string|size:7',
            'notes' => 'nullable|string',
            'details' => 'nullable|array',
        ]);

        DB::beginTransaction();
        try {
            $totalSalary = ($request->basic_salary + $request->allowances) - $request->deductions;

            $employeeSalary->update([
                'employee_name' => $request->employee_name,
                'employee_id' => $request->employee_id,
                'division' => $request->division,
                'position' => $request->position,
                'basic_salary' => $request->basic_salary,
                'allowances' => $request->allowances ?? 0,
                'deductions' => $request->deductions ?? 0,
                'total_salary' => $totalSalary,
                'salary_date' => $request->salary_date,
                'period_month' => $request->period_month,
                'notes' => $request->notes,
                'details' => $request->details,
            ]);

            DB::commit();
            
            return redirect()->route('admin-keuangan.employee-salary.index')
                           ->with('success', 'Data gaji karyawan berhasil diperbarui');
                           
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()
                           ->withErrors(['error' => 'Gagal memperbarui data gaji: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    public function destroy(EmployeeSalary $employeeSalary)
    {
        if ($employeeSalary->status === 'paid') {
            return redirect()->back()->withErrors(['error' => 'Gaji yang sudah dibayar tidak dapat dihapus']);
        }

        try {
            $employeeSalary->delete();
            
            return redirect()->route('admin-keuangan.employee-salary.index')
                           ->with('success', 'Data gaji karyawan berhasil dihapus');
                           
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Gagal menghapus data gaji: ' . $e->getMessage()]);
        }
    }

    public function approve(EmployeeSalary $employeeSalary)
    {
        if ($employeeSalary->status !== 'draft') {
            return redirect()->back()->withErrors(['error' => 'Gaji hanya bisa disetujui jika statusnya draft']);
        }

        try {
            // Approve salary (mark as paid)
            $employeeSalary->approve(Auth::id());

            // Catat transaksi bank (debit) jika ada akun bank yang tersedia
            $bankAccountId = request('bank_account_id');
            if (!$bankAccountId) {
                $bankAccountId = BankAccount::value('id'); // default ke akun pertama jika tidak dipilih
            }

            if ($bankAccountId) {
                BankTransaction::create([
                    'bank_account_id' => $bankAccountId,
                    'transaction_date' => $employeeSalary->salary_date ?? now()->toDateString(),
                    'transaction_type' => 'debit',
                    'amount' => $employeeSalary->total_salary,
                    'description' => 'Pembayaran gaji ' . $employeeSalary->employee_name,
                    'reference_type' => 'salary_payment',
                    'reference_id' => $employeeSalary->id,
                    'created_by' => Auth::id(),
                ]);
            }
            
            return redirect()->back()->with('success', 'Gaji karyawan berhasil disetujui dan dibayar');
            
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Gagal menyetujui gaji: ' . $e->getMessage()]);
        }
    }

    public function cancel(Request $request, EmployeeSalary $employeeSalary)
    {
        if ($employeeSalary->status === 'paid') {
            return redirect()->back()->withErrors(['error' => 'Gaji yang sudah dibayar tidak dapat dibatalkan']);
        }

        try {
            $employeeSalary->cancel($request->reason);
            
            return redirect()->back()->with('success', 'Gaji karyawan berhasil dibatalkan');
            
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['error' => 'Gagal membatalkan gaji: ' . $e->getMessage()]);
        }
    }

    public function monthlyReport(Request $request)
    {
        $year = $request->year ?? now()->year;
        $month = $request->month;

        $report = EmployeeSalary::getMonthlyReport($year, $month);
        
        return Inertia::render('Admin/AdminKeuangan/EmployeeSalary/MonthlyReport', [
            'report' => $report,
            'year' => $year,
            'month' => $month,
            'divisions' => $this->getDivisions()
        ]);
    }

    public function bulkCreate()
    {
        return Inertia::render('Admin/AdminKeuangan/EmployeeSalary/BulkCreate', [
            'divisions' => $this->getDivisions()
        ]);
    }

    public function allInCreate()
    {
        return Inertia::render('Admin/AdminKeuangan/EmployeeSalary/AllInCreate', [
            'divisions' => $this->getDivisions(),
            'previewStats' => $this->getAllInPreviewStats()
        ]);
    }

    public function bulkStore(Request $request)
    {
        $normalizedEmployees = collect($request->input('employees', []))->map(function ($employee) {
            $employee['allowances'] = $this->normalizeAmount($employee['allowances'] ?? null);
            $employee['deductions'] = $this->normalizeAmount($employee['deductions'] ?? null);
            return $employee;
        })->toArray();

        $request->merge(['employees' => $normalizedEmployees]);

        $request->validate([
            'period_month' => 'required|string|size:7',
            'salary_date' => 'required|date',
            'employees' => 'required|array|min:1',
            'employees.*.employee_name' => 'required|string|max:255',
            'employees.*.employee_id' => 'nullable|string|max:50',
            'employees.*.division' => 'required|in:customer_support,marketing,finance,operations,management',
            'employees.*.position' => 'required|string|max:255',
            'employees.*.basic_salary' => 'required|numeric|min:0',
            'employees.*.allowances' => 'nullable|numeric|min:0',
            'employees.*.deductions' => 'nullable|numeric|min:0',
        ]);

        DB::beginTransaction();
        try {
            $created_count = 0;
            
            foreach ($request->employees as $employeeData) {
                $basicSalary = $employeeData['basic_salary'];
                $allowances = $employeeData['allowances'] ?? 0;
                $deductions = $employeeData['deductions'] ?? 0;
                $totalSalary = ($basicSalary + $allowances) - $deductions;

                $salary = EmployeeSalary::create([
                    'employee_name' => $employeeData['employee_name'],
                    'employee_id' => $employeeData['employee_id'] ?? null,
                    'division' => $employeeData['division'],
                    'position' => $employeeData['position'],
                    'basic_salary' => $basicSalary,
                    'allowances' => $allowances,
                    'deductions' => $deductions,
                    'total_salary' => $totalSalary,
                    'salary_date' => $request->salary_date,
                    'period_month' => $request->period_month,
                    'created_by' => Auth::id(),
                ]);

                $created_count++;
            }
            
            DB::commit();
            
            return redirect()->route('admin-keuangan.employee-salary.index')
                           ->with('success', "Berhasil menambahkan {$created_count} data gaji karyawan");
                           
        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()
                           ->withErrors(['error' => 'Gagal menambahkan data gaji: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    public function allInStore(Request $request)
    {
        $request->merge([
            'allowances' => $this->normalizeAmount($request->allowances),
            'deductions' => $this->normalizeAmount($request->deductions),
        ]);

        $request->validate([
            'target_type' => 'required|in:all_staff,all_division,all_position',
            'target_value' => 'nullable|string|max:255',
            'period_month' => 'required|string|size:7',
            'salary_date' => 'required|date',
            'basic_salary' => 'required|numeric|min:0',
            'allowances' => 'nullable|numeric|min:0',
            'deductions' => 'nullable|numeric|min:0',
            'notes' => 'nullable|string|max:1000',
        ]);

        DB::beginTransaction();
        try {
            // Get target employees based on criteria
            $targetEmployees = $this->getTargetEmployees($request->target_type, $request->target_value);

            if ($targetEmployees->isEmpty()) {
                return redirect()->back()->withErrors(['target' => 'Tidak ada karyawan yang memenuhi kriteria']);
            }

            // Check for existing salary records in the same period
            $existingCount = EmployeeSalary::where('period_month', $request->period_month)
                ->whereIn('employee_name', $targetEmployees->pluck('name'))
                ->count();

            if ($existingCount > 0) {
                return redirect()->back()->withErrors([
                    'period_month' => "Ada {$existingCount} karyawan yang sudah memiliki data gaji di periode ini"
                ]);
            }

            $created_count = 0;
            $allowances = $this->normalizeAmount($request->allowances);
            $deductions = $this->normalizeAmount($request->deductions);
            $total_salary = $request->basic_salary + $allowances - $deductions;

            foreach ($targetEmployees as $employee) {
                EmployeeSalary::create([
                    'employee_name' => $employee->name,
                    'employee_id' => $employee->employee_id ?? null,
                    'division' => $employee->division,
                    'position' => $employee->position,
                    'basic_salary' => $request->basic_salary,
                    'allowances' => $allowances,
                    'deductions' => $deductions,
                    'total_salary' => $total_salary,
                    'salary_date' => $request->salary_date,
                    'period_month' => $request->period_month,
                    'notes' => $request->notes . " (All-In: {$request->target_type})",
                    'status' => 'draft',
                    'is_active' => true,
                    'created_by' => Auth::id(),
                ]);
                $created_count++;
            }

            DB::commit();

            return redirect()->route('admin-keuangan.employee-salary.index')
                           ->with('success', "Berhasil menambahkan gaji untuk {$created_count} karyawan ({$request->target_type})");

        } catch (\Exception $e) {
            DB::rollback();
            return redirect()->back()
                           ->withErrors(['error' => 'Gagal menambahkan data gaji: ' . $e->getMessage()])
                           ->withInput();
        }
    }

    private function getDivisions(): array
    {
        return [
            'customer_support' => 'Customer Support',
            'marketing' => 'Marketing', 
            'finance' => 'Finance',
            'operations' => 'Operations',
            'management' => 'Management'
        ];
    }

    private function getAvailablePeriods(): array
    {
        return EmployeeSalary::select('period_month')
                            ->distinct()
                            ->orderBy('period_month', 'desc')
                            ->pluck('period_month')
                            ->toArray();
    }

    private function getTargetEmployees($targetType, $targetValue = null)
    {
        // Since we don't have an Employee model, we'll get from existing salary records
        // For a real implementation, you would query from employees table
        $query = EmployeeSalary::select('employee_name as name', 'employee_id', 'division', 'position')
                              ->distinct();

        switch ($targetType) {
            case 'all_staff':
                // Get all unique employees
                break;
            case 'all_division':
                if ($targetValue) {
                    $query->where('division', $targetValue);
                }
                break;
            case 'all_position':
                if ($targetValue) {
                    $query->where('position', 'LIKE', "%{$targetValue}%");
                }
                break;
        }

        return $query->get();
    }

    private function getAllInPreviewStats()
    {
        $allStaff = EmployeeSalary::distinct()->count('employee_name');

        $divisionStats = [];
        foreach ($this->getDivisions() as $key => $label) {
            $count = EmployeeSalary::where('division', $key)->distinct()->count('employee_name');
            if ($count > 0) {
                $divisionStats[$key] = ['label' => $label, 'count' => $count];
            }
        }

        $positionStats = EmployeeSalary::select('position')
                                     ->selectRaw('COUNT(DISTINCT employee_name) as count')
                                     ->groupBy('position')
                                     ->having('count', '>', 0)
                                     ->orderBy('count', 'desc')
                                     ->get()
                                     ->mapWithKeys(function($item) {
                                         return [$item->position => $item->count];
                                     });

        return [
            'total_staff' => $allStaff,
            'divisions' => $divisionStats,
            'positions' => $positionStats->toArray()
        ];
    }

    private function normalizeAmount($value, $default = 0)
    {
        return ($value === null || $value === '') ? $default : $value;
    }
}
