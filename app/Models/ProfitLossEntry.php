<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProfitLossEntry extends Model
{
    use HasFactory;

    protected $fillable = [
        'period_id',
        'account_id',
        'description',
        'amount',
        'entry_type',
        'reference_type',
        'reference_id',
        'transaction_date',
        'notes',
        'additional_data',
        'created_by',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'transaction_date' => 'date',
        'additional_data' => 'array',
    ];

    public function period(): BelongsTo
    {
        return $this->belongsTo(ProfitLossPeriod::class, 'period_id');
    }

    public function account(): BelongsTo
    {
        return $this->belongsTo(ChartOfAccount::class, 'account_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function reference()
    {
        if (!$this->reference_type || !$this->reference_id) {
            return null;
        }

        switch ($this->reference_type) {
            case 'sales_order':
                return app('App\Models\SalesOrder')->find($this->reference_id);
            case 'petty_cash_transaction':
                return app('App\Models\PettyCashTransaction')->find($this->reference_id);
            case 'employee_salary':
                return app('App\Models\EmployeeSalary')->find($this->reference_id);
            case 'other_income':
                return app('App\Models\OtherIncome')->find($this->reference_id);
            default:
                return null;
        }
    }

    public function scopeByPeriod($query, $period_id)
    {
        return $query->where('period_id', $period_id);
    }

    public function scopeByAccount($query, $account_id)
    {
        return $query->where('account_id', $account_id);
    }

    public function scopeByEntryType($query, $type)
    {
        return $query->where('entry_type', $type);
    }

    public function scopeByReferenceType($query, $type)
    {
        return $query->where('reference_type', $type);
    }

    public function scopeManual($query)
    {
        return $query->where('entry_type', 'manual');
    }

    public function scopeAutomatic($query)
    {
        return $query->whereIn('entry_type', ['auto_so', 'auto_petty_cash', 'auto_salary']);
    }

    public function scopeByDateRange($query, $start, $end)
    {
        return $query->whereBetween('transaction_date', [$start, $end]);
    }

    public static function createFromSalesOrder($sales_order, $period_id, $created_by)
    {
        $revenue_account = ChartOfAccount::where('account_code', '4001')->first();
        
        if (!$revenue_account) {
            throw new \Exception('Revenue account (4001) not found');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'sales_order',
            'reference_id' => $sales_order->id,
        ]);

        $entry->account_id = $revenue_account->id;
        $entry->description = 'Pendapatan dari SO #' . $sales_order->so_number;
        $entry->amount = $sales_order->grand_total;
        $entry->entry_type = 'auto_so';
        $entry->transaction_date = $sales_order->created_at->format('Y-m-d');
        $entry->additional_data = [
            'so_number' => $sales_order->so_number,
            'customer' => $sales_order->customer_name ?? $sales_order->customer_company,
            'total_amount' => $sales_order->grand_total,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    public static function createFromPettyCash($petty_cash, $period_id, $created_by)
    {
        // Skip if category is null (data integrity issue)
        if (!$petty_cash->category) {
            \Log::warning('Petty Cash has no category - Skipping', [
                'petty_cash_id' => $petty_cash->id,
                'description' => $petty_cash->description ?? 'N/A',
                'amount' => $petty_cash->amount ?? 0
            ]);
            return null;
        }

        $expense_account = null;

        switch ($petty_cash->category->name) {
            // Old mapping (may not be used anymore)
            case 'Beban Listrik dan Air':
                $expense_account = ChartOfAccount::where('account_code', '5101')->first();
                break;
            case 'Beban Internet dan Telepon':
                $expense_account = ChartOfAccount::where('account_code', '5102')->first();
                break;
            case 'Beban Sewa':
                $expense_account = ChartOfAccount::where('account_code', '5201')->first();
                break;
            case 'Beban Perjalanan Dinas':
                $expense_account = ChartOfAccount::where('account_code', '5202')->first();
                break;
            case 'Beban Perlengkapan Kantor':
                $expense_account = ChartOfAccount::where('account_code', '5203')->first();
                break;
            case 'Beban Equipment dan Penyusutan':
                $expense_account = ChartOfAccount::where('account_code', '5204')->first();
                break;
            case 'Beban Entertaint':
                $expense_account = ChartOfAccount::where('account_code', '5205')->first();
                break;
            case 'Beban Bensin dan Toll':
                $expense_account = ChartOfAccount::where('account_code', '5206')->first();
                break;

            // New mapping (current categories)
            case 'Transportasi':
                $expense_account = ChartOfAccount::where('account_code', '5210')->first();
                break;
            case 'Konsumsi':
                $expense_account = ChartOfAccount::where('account_code', '5220')->first();
                break;
            case 'ATK & Supplies':
            case 'ATK':
            case 'Supplies':
                $expense_account = ChartOfAccount::where('account_code', '5230')->first();
                break;
            case 'Komunikasi':
                $expense_account = ChartOfAccount::where('account_code', '5240')->first();
                break;
            case 'Maintenance':
                $expense_account = ChartOfAccount::where('account_code', '5250')->first();
                break;
            case 'Listrik & Air':
            case 'Listrik dan Air':
                $expense_account = ChartOfAccount::where('account_code', '5310')->first();
                break;
            case 'Internet & Telepon':
            case 'Internet dan Telepon':
                $expense_account = ChartOfAccount::where('account_code', '5320')->first();
                break;
            case 'Sewa Kantor':
            case 'Sewa':
                $expense_account = ChartOfAccount::where('account_code', '5330')->first();
                break;
            case 'Promosi & Iklan':
            case 'Promosi':
            case 'Iklan':
                $expense_account = ChartOfAccount::where('account_code', '5410')->first();
                break;
            case 'Entertainment':
            case 'Entertaint':
                $expense_account = ChartOfAccount::where('account_code', '5420')->first();
                break;
            default:
                // Fallback: Try to find expense account by category name or use general expense account
                $expense_account = ChartOfAccount::where('account_type', 'expense')
                    ->where('account_category', 'expense_operational')
                    ->first();

                if (!$expense_account) {
                    // Last resort: use general expense account code 5303
                    $expense_account = ChartOfAccount::where('account_code', '5303')->first();
                }
        }

        if (!$expense_account) {
            \Log::error('Petty Cash to Profit Loss - Account Not Found', [
                'category_name' => $petty_cash->category->name,
                'petty_cash_id' => $petty_cash->id,
                'available_expense_accounts' => ChartOfAccount::where('account_type', 'expense')->pluck('account_name', 'account_code')->toArray()
            ]);

            throw new \Exception('Expense account not found for category: ' . $petty_cash->category->name . '. Please create expense account in Chart of Accounts first.');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'petty_cash_transaction',
            'reference_id' => $petty_cash->id,
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = 'Beban ' . $petty_cash->category->name . ' - ' . $petty_cash->description;
        $entry->amount = $petty_cash->amount;
        $entry->entry_type = 'auto_petty_cash';
        $entry->transaction_date = $petty_cash->transaction_date;
        $entry->additional_data = [
            'category' => $petty_cash->category->name,
            'description' => $petty_cash->description,
            'amount' => $petty_cash->amount,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    public static function createFromEmployeeSalary($employee_salary, $period_id, $created_by)
    {
        $salary_account = ChartOfAccount::where('account_code', '5001')->first();

        if (!$salary_account) {
            throw new \Exception('Salary expense account (5001) not found');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'employee_salary',
            'reference_id' => $employee_salary->id,
        ]);

        $entry->account_id = $salary_account->id;
        $entry->description = 'Gaji ' . $employee_salary->employee_name . ' - ' . $employee_salary->period_month;
        $entry->amount = $employee_salary->total_salary;
        $entry->entry_type = 'auto_salary';
        $entry->transaction_date = $employee_salary->salary_date;
        $entry->additional_data = [
            'employee_name' => $employee_salary->employee_name,
            'employee_id' => $employee_salary->employee_id,
            'division' => $employee_salary->division,
            'position' => $employee_salary->position,
            'basic_salary' => $employee_salary->basic_salary,
            'allowances' => $employee_salary->allowances,
            'deductions' => $employee_salary->deductions,
            'total_salary' => $employee_salary->total_salary,
            'period_month' => $employee_salary->period_month,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    /**
     * Create profit loss entry from Other Income (Pendapatan Lain-lain)
     *
     * This method maps Other Income categories to appropriate revenue accounts:
     * - Bunga Bank Mandiri -> Account 4002 (Pendapatan Bunga Bank Mandiri)
     * - Bunga Bank BCA -> Account 4003 (Pendapatan Bunga Bank BCA)
     * - Lainnya -> Account 4099 (Pendapatan Lain-lain)
     */
    public static function createFromOtherIncome($other_income, $period_id, $created_by)
    {
        // Map category to account code
        $account_code = match($other_income->category) {
            'Bunga Bank Mandiri' => '4002',
            'Bunga Bank BCA' => '4003',
            'Lainnya' => '4099',
            default => '4099'
        };

        $revenue_account = ChartOfAccount::where('account_code', $account_code)
                                        ->orWhere('account_name', 'like', '%' . $other_income->category . '%')
                                        ->first();

        // Fallback: use generic other revenue account if specific account not found
        if (!$revenue_account) {
            $revenue_account = ChartOfAccount::where('account_type', 'revenue')
                                            ->where('account_category', 'revenue_other')
                                            ->first();
        }

        if (!$revenue_account) {
            throw new \Exception('Revenue account not found for Other Income category: ' . $other_income->category);
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'other_income',
            'reference_id' => $other_income->id,
        ]);

        $entry->account_id = $revenue_account->id;
        $entry->description = 'Pendapatan Lain-lain (' . $other_income->category . ') - ' . $other_income->description;
        $entry->amount = $other_income->amount;
        $entry->entry_type = 'auto_other_income';
        $entry->transaction_date = $other_income->transaction_date;
        $entry->additional_data = [
            'category' => $other_income->category,
            'description' => $other_income->description,
            'amount' => $other_income->amount,
            'notes' => $other_income->notes,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }
}
