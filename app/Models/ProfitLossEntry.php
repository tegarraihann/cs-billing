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
            case 'shipment_profit':
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

    public static function createFromInvoice($invoice, $period_id, $created_by)
    {
        $revenue_account = ChartOfAccount::where('account_code', '4001')->first();
        
        if (!$revenue_account) {
            throw new \Exception('Revenue account (4001) not found');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'invoice',
            'reference_id' => $invoice->id,
        ]);

        $entry->account_id = $revenue_account->id;
        $entry->description = 'Revenue from INV #' . $invoice->invoice_number;
        $entry->amount = $invoice->total;
        $entry->entry_type = 'auto_invoice';
        $entry->transaction_date = $invoice->invoice_date?->format('Y-m-d') ?? now()->format('Y-m-d');
        $entry->additional_data = [
            'invoice_number' => $invoice->invoice_number,
            'customer' => $invoice->customer->company_name ?? $invoice->customer_name ?? '',
            'total_amount' => $invoice->total,
            'sales_order_id' => $invoice->sales_order_id,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    /**
     * Create profit loss entry from shipment profit (gross revenue - operational costs).
     */
    public static function createFromShipmentProfit(SalesOrder $sales_order, int $period_id, int $created_by, array $payload = []): ProfitLossEntry
    {
        $revenue_account = ChartOfAccount::where('account_type', 'revenue')
            ->where('account_category', 'revenue_main')
            ->orderBy('sort_order')
            ->first();

        if (!$revenue_account) {
            $revenue_account = ChartOfAccount::where('account_type', 'revenue')
                ->orderBy('account_code')
                ->first();
        }

        if (!$revenue_account) {
            throw new \Exception('Revenue account not found for shipment profit.');
        }

        $orderNumber = $sales_order->order_number ?? $sales_order->so_number ?? ('SO-' . $sales_order->id);

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'shipment_profit',
            'reference_id' => $sales_order->id,
        ]);

        $entry->account_id = $revenue_account->id;
        $entry->description = 'Profit Shipment - ' . $orderNumber;
        $entry->amount = (float) ($payload['profit'] ?? 0);
        $entry->entry_type = 'auto_shipment_profit';
        $entry->transaction_date = $payload['transaction_date'] ?? ($sales_order->so_date?->format('Y-m-d') ?? now()->format('Y-m-d'));
        $entry->additional_data = [
            'so_number' => $orderNumber,
            'gross_revenue' => (float) ($payload['gross_revenue'] ?? 0),
            'operational_costs' => (float) ($payload['operational_costs'] ?? 0),
            'invoice_ids' => $payload['invoice_ids'] ?? [],
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    public static function createFromPettyCash($petty_cash, $period_id, $created_by)
    {
        $expense_account = null;

        if (!empty($petty_cash->pl_account_id)) {
            $expense_account = ChartOfAccount::where('id', $petty_cash->pl_account_id)
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account && !$petty_cash->category) {
            \Log::warning('Petty Cash has no category - Skipping', [
                'petty_cash_id' => $petty_cash->id,
                'description' => $petty_cash->description ?? 'N/A',
                'amount' => $petty_cash->amount ?? 0
            ]);
            return null;
        }

        if (!$expense_account) {
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
        }

        if (!$expense_account) {
            \Log::error('Petty Cash to Profit Loss - Account Not Found', [
                'category_name' => $petty_cash->category?->name,
                'petty_cash_id' => $petty_cash->id,
                'available_expense_accounts' => ChartOfAccount::where('account_type', 'expense')->pluck('account_name', 'account_code')->toArray()
            ]);

            throw new \Exception('Expense account not found for category: ' . ($petty_cash->category?->name ?? 'Unknown') . '. Please create expense account in Chart of Accounts first.');
        }

        $categoryName = $petty_cash->category?->name ?? 'Petty Cash';

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'petty_cash_transaction',
            'reference_id' => $petty_cash->id,
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = 'Beban ' . $categoryName . ' - ' . $petty_cash->description;
        $entry->amount = $petty_cash->amount;
        $entry->entry_type = 'auto_petty_cash';
        $entry->transaction_date = $petty_cash->transaction_date;
        $entry->additional_data = [
            'category' => $categoryName,
            'description' => $petty_cash->description,
            'amount' => $petty_cash->amount,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    public static function createFromEmployeeSalary($employee_salary, $period_id, $created_by, $accountId = null)
    {
        $salary_account = null;

        if (!empty($accountId)) {
            $salary_account = ChartOfAccount::where('id', $accountId)
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$salary_account) {
            $detailsAccountId = data_get($employee_salary->details, 'pl_account_id');
            if (!empty($detailsAccountId)) {
                $salary_account = ChartOfAccount::where('id', $detailsAccountId)
                    ->where('account_type', 'expense')
                    ->first();
            }
        }

        if (!$salary_account) {
            $salary_account = ChartOfAccount::where('account_code', '5001')->first();
        }

        if (!$salary_account) {
            $salary_account = ChartOfAccount::where('account_type', 'expense')
                ->where('account_category', 'expense_salary')
                ->orderBy('account_code')
                ->first();
        }

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

        // Jika pl_account_id diberikan dan valid, gunakan itu
        $revenue_account = null;
        if (!empty($other_income->pl_account_id)) {
            $revenue_account = ChartOfAccount::where('id', $other_income->pl_account_id)
                ->where('account_type', 'revenue')
                ->first();
        }

        if (!$revenue_account) {
            $revenue_account = ChartOfAccount::where('account_code', $account_code)
                ->orWhere('account_name', 'like', '%' . $other_income->category . '%')
                ->first();
        }

        // Fallback: generic other revenue
        if (!$revenue_account) {
            $revenue_account = ChartOfAccount::where('account_type', 'revenue')
                ->where(function ($q) {
                    $q->where('account_category', 'revenue_other')
                      ->orWhereNull('account_category');
                })
                ->orderBy('account_code')
                ->first();
        }

        // Fallback terakhir: buat akun pendapatan lain-lain jika belum ada
        if (!$revenue_account) {
            $revenue_account = ChartOfAccount::firstOrCreate(
                ['account_code' => '4099'],
                [
                    'account_name' => 'Pendapatan Lain-lain',
                    'account_type' => 'revenue',
                    'account_category' => 'revenue_other',
                    'is_active' => true,
                    'sort_order' => 999,
                ]
            );
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

    /**
     * Create entry from prepaid rent amortization transaction.
     */
    public static function createFromPrepaidRent(PrepaidRentTransaction $transaction, $period_id, $created_by)
    {
        $expense_account = ChartOfAccount::where('account_code', '5330')->first()
            ?? ChartOfAccount::where('account_type', 'expense')
                ->where('account_category', 'expense_operational')
                ->first();

        if (!$expense_account) {
            throw new \Exception('Expense account for prepaid rent not found (expected account code 5330).');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'prepaid_rent_transaction',
            'reference_id' => $transaction->id,
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = $transaction->description
            ? 'Penyusutan Prepaid Rent - ' . $transaction->description
            : 'Penyusutan Prepaid Rent';
        $entry->amount = $transaction->amount;
        $entry->entry_type = 'auto_prepaid_rent';
        $entry->transaction_date = $transaction->transaction_date;
        $entry->additional_data = [
            'reference_number' => $transaction->reference_number,
            'notes' => $transaction->notes,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    /**
     * Create entry from equipment depreciation transaction.
     */
    public static function createFromEquipmentDepreciation(EquipmentTransaction $transaction, $period_id, $created_by)
    {
        // Gunakan akun khusus depresiasi equipment (5260), buat jika belum ada
        $expense_account = ChartOfAccount::where('account_code', '5260')->first();

        if (!$expense_account) {
            $expense_account = ChartOfAccount::firstOrCreate(
                ['account_code' => '5260'],
                [
                    'account_name' => 'Depreciation Expense - Equipment',
                    'account_type' => 'expense',
                    'account_category' => 'expense_operational',
                    'parent_code' => '5000',
                    'sort_order' => 5260,
                    'is_active' => true,
                    'description' => 'Beban penyusutan equipment',
                ]
            );
        }

        if (!$expense_account) {
            throw new \Exception('Expense account for equipment depreciation not found (expected account code 5260).');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'equipment_transaction',
            'reference_id' => $transaction->id,
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = $transaction->description
            ? 'Depresiasi Equipment - ' . $transaction->description
            : 'Depresiasi Equipment';
        $entry->amount = $transaction->amount;
        $entry->entry_type = 'auto_equipment_depreciation';
        $entry->transaction_date = $transaction->transaction_date;
        $entry->additional_data = [
            'asset_name' => $transaction->asset_name,
            'category' => $transaction->category,
            'reference_number' => $transaction->reference_number,
            'notes' => $transaction->notes,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    /**
     * Create entry from equipment purchase transaction.
     */
    public static function createFromEquipmentPurchase(EquipmentTransaction $transaction, $period_id, $created_by)
    {
        if ($transaction->transaction_type !== 'purchase') {
            return null;
        }

        // Pakai akun biaya yang dipilih jika ada, fallback ke Equipment Expense (5204)
        $expense_account = null;
        if (!empty($transaction->pl_account_id)) {
            $expense_account = ChartOfAccount::where('id', $transaction->pl_account_id)
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::where('account_code', '5204')
                ->orWhere('account_name', 'like', '%Equipment%')
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::firstOrCreate(
                ['account_code' => '5204'],
                [
                    'account_name' => 'Equipment Expense',
                    'account_type' => 'expense',
                    'account_category' => 'expense_operational',
                    'sort_order' => 5204,
                    'is_active' => true,
                ]
            );
        }

        if (!$expense_account) {
            throw new \Exception('Expense account for equipment purchase not found (expected 5204 or selected account).');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'equipment_transaction',
            'reference_id' => $transaction->id,
            'entry_type' => 'auto_equipment_purchase',
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = $transaction->description
            ? 'Pembelian Equipment - ' . $transaction->description
            : 'Pembelian Equipment';
        $entry->amount = $transaction->amount;
        $entry->transaction_date = $transaction->transaction_date;
        $entry->additional_data = [
            'asset_name' => $transaction->asset_name,
            'category' => $transaction->category,
            'reference_number' => $transaction->reference_number,
            'notes' => $transaction->notes,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    /**
     * Create profit loss entry from Supply Transaction (usage/depreciation)
     */
    public static function createFromSupplyTransaction($supply, $period_id, $created_by)
    {
        if (!in_array($supply->transaction_type, ['usage', 'depreciation'])) {
            return null;
        }

        // Find or create Supplies Expense account (prioritize pl_account_id if provided)
        $expense_account = null;
        if (!empty($supply->pl_account_id)) {
            $expense_account = ChartOfAccount::where('id', $supply->pl_account_id)
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::where('account_code', '5230')
                ->orWhere('account_name', 'like', '%Supplies%')
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::firstOrCreate(
                ['account_code' => '5230'],
                [
                    'account_name' => 'ATK & Supplies',
                    'account_type' => 'expense',
                    'account_category' => 'expense_operational',
                    'is_active' => true,
                    'sort_order' => 5230,
                ]
            );
        }

        if (!$expense_account) {
            throw new \Exception('Expense account not found for supplies.');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'supply_transaction',
            'reference_id' => $supply->id,
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = 'Supplies ' . ($supply->transaction_type === 'depreciation' ? 'Depreciation' : 'Usage') . ' - ' . ($supply->description ?? $supply->category ?? 'Supplies');
        $entry->amount = $supply->amount;
        $entry->entry_type = 'auto_supplies';
        $entry->transaction_date = $supply->transaction_date;
        $entry->additional_data = [
            'category' => $supply->category,
            'transaction_type' => $supply->transaction_type,
            'reference_number' => $supply->reference_number,
            'notes' => $supply->notes,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    /**
     * Create profit loss entry from Supply Transaction (topup/purchase)
     */
    public static function createFromSupplyTopup($supply, $period_id, $created_by)
    {
        if ($supply->transaction_type !== 'topup') {
            return null;
        }

        // Find or create Supplies Expense account (prioritize pl_account_id if provided)
        $expense_account = null;
        if (!empty($supply->pl_account_id)) {
            $expense_account = ChartOfAccount::where('id', $supply->pl_account_id)
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::where('account_code', '5230')
                ->orWhere('account_name', 'like', '%Supplies%')
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::firstOrCreate(
                ['account_code' => '5230'],
                [
                    'account_name' => 'ATK & Supplies',
                    'account_type' => 'expense',
                    'account_category' => 'expense_operational',
                    'is_active' => true,
                    'sort_order' => 5230,
                ]
            );
        }

        if (!$expense_account) {
            throw new \Exception('Expense account not found for supplies.');
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'supply_transaction',
            'reference_id' => $supply->id,
            'entry_type' => 'auto_supplies_purchase',
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = 'Supplies Purchase - ' . ($supply->description ?? $supply->category ?? 'Supplies');
        $entry->amount = $supply->amount;
        $entry->transaction_date = $supply->transaction_date;
        $entry->additional_data = [
            'category' => $supply->category,
            'transaction_type' => $supply->transaction_type,
            'reference_number' => $supply->reference_number,
            'notes' => $supply->notes,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }

    /**
     * Create profit loss entry from General Expense (approved)
     */
    public static function createFromGeneralExpense($expense, $period_id, $created_by)
    {
        if ($expense->status !== 'approved') {
            return null;
        }

        // Gunakan akun biaya operasional umum
        // Jika pl_account_id tersedia di model, gunakan akun itu
        $expense_account = null;
        if (!empty($expense->pl_account_id)) {
            $expense_account = ChartOfAccount::where('id', $expense->pl_account_id)
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::where('account_code', '5299')
                ->orWhere('account_name', 'like', '%General Expense%')
                ->where('account_type', 'expense')
                ->first();
        }

        if (!$expense_account) {
            $expense_account = ChartOfAccount::firstOrCreate(
                ['account_code' => '5299'],
                [
                    'account_name' => 'General Expense',
                    'account_type' => 'expense',
                    'account_category' => 'expense_operational',
                    'is_active' => true,
                    'sort_order' => 5299,
                ]
            );
        }

        $entry = self::firstOrNew([
            'period_id' => $period_id,
            'reference_type' => 'general_expense',
            'reference_id' => $expense->id,
        ]);

        $entry->account_id = $expense_account->id;
        $entry->description = 'General Expense - ' . ($expense->category ?? 'Biaya Operasional');
        $entry->amount = $expense->total_amount;
        $entry->entry_type = 'auto_general_expense';
        $entry->transaction_date = $expense->expense_date;
        $entry->additional_data = [
            'category' => $expense->category,
            'notes' => $expense->notes,
        ];

        if (!$entry->exists) {
            $entry->created_by = $created_by;
        }

        $entry->save();

        return $entry;
    }
}
