<?php

namespace App\Http\Controllers\AdminKeuangan;

use App\Http\Controllers\Controller;
use App\Models\EmployeeSalary;
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
            $salary = EmployeeSalary::create([
                'employee_name' => $request->employee_name,
                'employee_id' => $request->employee_id,
                'division' => $request->division,
                'position' => $request->position,
                'basic_salary' => $request->basic_salary,
                'allowances' => $request->allowances ?? 0,
                'deductions' => $request->deductions ?? 0,
                'salary_date' => $request->salary_date,
                'period_month' => $request->period_month,
                'notes' => $request->notes,
                'details' => $request->details,
                'created_by' => Auth::id(),
            ]);

            $salary->calculateTotalSalary();
            
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
            $employeeSalary->update([
                'employee_name' => $request->employee_name,
                'employee_id' => $request->employee_id,
                'division' => $request->division,
                'position' => $request->position,
                'basic_salary' => $request->basic_salary,
                'allowances' => $request->allowances ?? 0,
                'deductions' => $request->deductions ?? 0,
                'salary_date' => $request->salary_date,
                'period_month' => $request->period_month,
                'notes' => $request->notes,
                'details' => $request->details,
            ]);

            $employeeSalary->calculateTotalSalary();
            
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
            $employeeSalary->approve(Auth::id());
            
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

    public function bulkStore(Request $request)
    {
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
                $salary = EmployeeSalary::create([
                    'employee_name' => $employeeData['employee_name'],
                    'employee_id' => $employeeData['employee_id'] ?? null,
                    'division' => $employeeData['division'],
                    'position' => $employeeData['position'],
                    'basic_salary' => $employeeData['basic_salary'],
                    'allowances' => $employeeData['allowances'] ?? 0,
                    'deductions' => $employeeData['deductions'] ?? 0,
                    'salary_date' => $request->salary_date,
                    'period_month' => $request->period_month,
                    'created_by' => Auth::id(),
                ]);

                $salary->calculateTotalSalary();
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
}