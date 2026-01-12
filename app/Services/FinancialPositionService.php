<?php

namespace App\Services;

use App\Models\AccountPayable;
use App\Models\AccountReceivable;
use App\Models\BankAccount;
use App\Models\ChartOfAccount;
use App\Models\EquipmentTransaction;
use App\Models\FinancialPositionAdjustment;
use App\Models\OtherIncome;
use App\Models\PettyCashBalance;
use App\Models\PrepaidRentTransaction;
use App\Models\ProfitLossPeriod;
use App\Models\SupplyTransaction;
use App\Models\ProfitLossEntry;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class FinancialPositionService
{
    /**
     * Account grouping configuration for Statement of Financial Position.
     */
    private array $structure = [
        'assets' => [
            'title' => 'ASSETS',
            'groups' => [
                [
                    'title' => 'CURRENT ASSET',
                    'account_codes' => ['1120', '1130', '1140', '1110', '1200', '1210', '1220', '1221', '1230', '1231', '1300', '1400'],
                ],
                [
                    'title' => 'FIXED ASSET',
                    'account_codes' => ['1510', '1515'],
                ],
            ],
        ],
        'liabilities' => [
            'title' => 'LIABILITIES',
            'groups' => [
                [
                    'title' => 'CURRENT LIABILITIES',
                    'account_codes' => ['2100', '2110', '2111', '2114', '2115', '5450', '5451'],
                ],
            ],
        ],
        'equity' => [
            'title' => 'EQUITY',
            'groups' => [
                [
                    'title' => 'EQUITY',
                    'account_codes' => ['3100', '3200', '3300'],
                ],
            ],
        ],
    ];

    /**
     * Generate Statement of Financial Position data for the given cutoff date.
     */
    public function getStatement($cutoffDate): array
    {
        $cutoff = $cutoffDate instanceof Carbon
            ? $cutoffDate->copy()->endOfDay()
            : Carbon::parse($cutoffDate)->endOfDay();

        $accounts = $this->loadAccounts();

        $sections = [];
        $assetsTotal = 0;
        $liabilitiesTotal = 0;
        $equityTotal = 0;

        foreach ($this->structure as $key => $sectionConfig) {
            $sectionTotal = 0;
            $groups = [];

            foreach ($sectionConfig['groups'] as $groupConfig) {
                $rows = $this->buildRows(
                    $groupConfig['account_codes'],
                    $accounts,
                    $cutoff
                );

                $groupTotal = collect($rows)->sum('amount');

                $groups[] = [
                    'title' => $groupConfig['title'],
                    'rows' => $rows,
                    'total' => round($groupTotal, 2),
                ];

                $sectionTotal += $groupTotal;
            }

            $sectionData = [
                'title' => $sectionConfig['title'],
                'groups' => $groups,
                'total' => round($sectionTotal, 2),
            ];

            $sections[$key] = $sectionData;

            match ($key) {
                'assets' => $assetsTotal = $sectionTotal,
                'liabilities' => $liabilitiesTotal = $sectionTotal,
                'equity' => $equityTotal = $sectionTotal,
                default => null,
            };
        }

        $liabilitiesEquityTotal = $liabilitiesTotal + $equityTotal;

        return [
            'generated_at' => Carbon::now()->toDateTimeString(),
            'cutoff_date' => $cutoff->toDateString(),
            'sections' => $sections,
            'balance_check' => [
                'assets_total' => round($assetsTotal, 2),
                'liabilities_equity_total' => round($liabilitiesEquityTotal, 2),
                'difference' => round($assetsTotal - $liabilitiesEquityTotal, 2),
            ],
        ];
    }

    /**
     * Build data rows for each account in a group.
     */
    private function buildRows(array $accountCodes, Collection $accounts, Carbon $cutoff): array
    {
        $rows = [];

        foreach ($accountCodes as $code) {
            $account = $accounts->get($code);

            $calculation = $this->calculateBalanceForAccount($code, $cutoff);
            $manualOverride = $this->getManualOverride($code, $cutoff);

            $amount = $manualOverride['amount'] ?? $calculation['amount'];
            $source = $manualOverride ? 'manual' : $calculation['source'];

            $rows[] = [
                'account_code' => $code,
                'account_name' => $account?->account_name ?? 'Tidak ditemukan',
                'amount' => round($amount, 2),
                'source' => $source,
                'details' => [
                    'calculated' => $calculation,
                    'manual_override' => $manualOverride,
                ],
            ];
        }

        return $rows;
    }

    /**
     * Load all accounts required for the statement keyed by account code.
     */
    private function loadAccounts(): Collection
    {
        $codes = collect($this->structure)
            ->pluck('groups')
            ->flatten(1)
            ->pluck('account_codes')
            ->flatten()
            ->unique()
            ->values();

        return ChartOfAccount::whereIn('account_code', $codes)
            ->get()
            ->keyBy('account_code');
    }

    /**
     * Calculate balance for a specific account code using available data sources.
     */
    private function calculateBalanceForAccount(string $accountCode, Carbon $cutoff): array
    {
        return match ($accountCode) {
            '1120', '1130', '1140' => $this->calculateBankBalance($accountCode, $cutoff),
            '1110' => $this->calculatePettyCashBalance($cutoff),
            '1200' => $this->calculateAccountsReceivableBalance($cutoff),
            '1210' => $this->calculateOtherIncomeReceivablesBalance($cutoff),
            '1220', '1221' => $this->calculatePph23ReceivableBalance($accountCode, $cutoff),
            '1230', '1231' => $this->calculateVatReceivableBalance($accountCode, $cutoff),
            '1300' => $this->calculateSuppliesBalance($cutoff),
            '1510' => $this->calculateEquipmentBalance($cutoff),
            '1515' => $this->calculateEquipmentAccumulatedBalance($cutoff),
            '1400' => $this->calculatePrepaidRentBalance($cutoff),
            '2110', '2111' => $this->calculateVatPayableBalance($accountCode, $cutoff),
            '2114', '2115' => $this->calculatePph23PayableBalance($accountCode, $cutoff),
            '5450', '5451' => $this->calculateTaxExpensePayableBalance($accountCode, $cutoff),
            '2100' => $this->calculateAccountsPayableBalance($cutoff),
            '3100' => $this->calculatePaidInCapitalBalance($accountCode, $cutoff),
            '3200' => $this->calculateRetainedEarningsBalance($cutoff),
            '3300' => $this->calculateCurrentYearEarnings($cutoff),
            default => [
                'amount' => $this->getManualValue($accountCode, $cutoff) ?? 0.0,
                'source' => 'manual',
                'meta' => null,
            ],
        };
    }

    /**
     * Calculate balance for bank-related accounts.
     */
    private function calculateBankBalance(string $accountCode, Carbon $cutoff): array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);

        if (!$accountId) {
            return ['amount' => 0.0, 'source' => 'auto', 'meta' => null];
        }

        $banks = BankAccount::where('account_id', $accountId)->get();

        $balance = $banks->sum(fn (BankAccount $bank) => $bank->getBalanceUntil($cutoff));

        return [
            'amount' => $balance,
            'source' => 'auto',
            'meta' => [
                'banks_count' => $banks->count(),
            ],
        ];
    }

    /**
     * Calculate petty cash balance.
     */
    private function calculatePettyCashBalance(Carbon $cutoff): array
    {
        $amount = PettyCashBalance::calculateBalanceUpToDate($cutoff->toDateString(), true);

        return [
            'amount' => $amount,
            'source' => 'auto',
            'meta' => null,
        ];
    }

    /**
     * Calculate outstanding accounts receivable balance.
     */
    private function calculateAccountsReceivableBalance(Carbon $cutoff): array
    {
        $amount = AccountReceivable::whereIn('status', ['outstanding', 'partial', 'overdue'])
            ->whereDate('invoice_date', '<=', $cutoff->toDateString())
            ->sum('outstanding_amount');

        return [
            'amount' => $amount,
            'source' => 'auto',
            'meta' => [
                'records' => AccountReceivable::whereIn('status', ['outstanding', 'partial', 'overdue'])
                    ->whereDate('invoice_date', '<=', $cutoff->toDateString())
                    ->count(),
            ],
        ];
    }

    /**
     * Calculate outstanding accounts payable balance.
     */
    private function calculateAccountsPayableBalance(Carbon $cutoff): array
    {
        $query = AccountPayable::whereIn('status', ['unpaid', 'partial'])
            ->where(function ($q) use ($cutoff) {
                $q->whereNull('vendor_invoice_date')
                    ->orWhereDate('vendor_invoice_date', '<=', $cutoff->toDateString());
            });

        $amount = $query->sum('outstanding_amount');

        return [
            'amount' => $amount,
            'source' => 'auto',
            'meta' => [
                'records' => (clone $query)->count(),
            ],
        ];
    }

    /**
     * Calculate VAT Payable (PPN Keluaran) balance from adjustments (akun 2110/2111).
     * Prioritas: manual override bila ada, otherwise sum FinancialPositionAdjustment s/d cutoff.
     */
    private function calculateVatPayableBalance(string $accountCode, Carbon $cutoff): array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return ['amount' => 0.0, 'source' => 'auto', 'meta' => null];
        }

        $query = FinancialPositionAdjustment::where('account_id', $accountId)
            ->whereDate('effective_date', '<=', $cutoff->toDateString());

        $amount = (float) $query->sum('amount');
        $records = $query->count();

        return [
            'amount' => round($amount, 2),
            'source' => 'auto',
            'meta' => [
                'records' => $records,
            ],
        ];
    }

    /**
     * Calculate VAT Receivable (PPN Masukan) balance from adjustments (akun 1230/1231).
     */
    private function calculateVatReceivableBalance(string $accountCode, Carbon $cutoff): array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return ['amount' => 0.0, 'source' => 'auto', 'meta' => null];
        }

        $query = FinancialPositionAdjustment::where('account_id', $accountId)
            ->whereDate('effective_date', '<=', $cutoff->toDateString());

        $amount = (float) $query->sum('amount');
        $records = $query->count();

        return [
            'amount' => round($amount, 2),
            'source' => 'auto',
            'meta' => [
                'records' => $records,
            ],
        ];
    }

    /**
     * Calculate VAT Receivable PPh23 balance from adjustments (akun 1220/1221).
     */
    private function calculatePph23ReceivableBalance(string $accountCode, Carbon $cutoff): array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return ['amount' => 0.0, 'source' => 'auto', 'meta' => null];
        }

        $query = FinancialPositionAdjustment::where('account_id', $accountId)
            ->whereDate('effective_date', '<=', $cutoff->toDateString());

        $amount = (float) $query->sum('amount');
        $records = $query->count();

        return [
            'amount' => round($amount, 2),
            'source' => 'auto',
            'meta' => [
                'records' => $records,
            ],
        ];
    }

    /**
     * Calculate VAT Payable PPh23 balance from adjustments (akun 2114/2115).
     */
    private function calculatePph23PayableBalance(string $accountCode, Carbon $cutoff): array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return ['amount' => 0.0, 'source' => 'auto', 'meta' => null];
        }

        $query = FinancialPositionAdjustment::where('account_id', $accountId)
            ->whereDate('effective_date', '<=', $cutoff->toDateString());

        $amount = (float) $query->sum('amount');
        $records = $query->count();

        return [
            'amount' => round($amount, 2),
            'source' => 'auto',
            'meta' => [
                'records' => $records,
            ],
        ];
    }

    /**
     * Calculate tax expense payable balance (0.5% / 2%) from P&L entries.
     */
    private function calculateTaxExpensePayableBalance(string $accountCode, Carbon $cutoff): array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return ['amount' => 0.0, 'source' => 'auto', 'meta' => null];
        }

        $query = ProfitLossEntry::where('account_id', $accountId)
            ->whereDate('transaction_date', '<=', $cutoff->toDateString());

        $amount = (float) $query->sum('amount');
        $records = $query->count();

        return [
            'amount' => round($amount, 2),
            'source' => 'auto',
            'meta' => [
                'records' => $records,
            ],
        ];
    }

    private function calculateOtherIncomeReceivablesBalance(Carbon $cutoff): array
    {
        $query = OtherIncome::query()
            ->whereDate('transaction_date', '<=', $cutoff->toDateString())
            ->whereIn('status', [
                OtherIncome::STATUS_OUTSTANDING,
                OtherIncome::STATUS_PARTIAL,
            ]);

        $amount = (float) $query->sum('outstanding_amount');

        return [
            'amount' => $amount,
            'source' => 'auto',
            'meta' => [
                'records' => (clone $query)->count(),
                'overdue' => (clone $query)->whereNotNull('due_date')
                    ->where('due_date', '<', $cutoff->toDateString())
                    ->count(),
            ],
        ];
    }

    private function calculateSuppliesBalance(Carbon $cutoff): array
    {
        $topups = SupplyTransaction::where('transaction_type', 'topup')
            ->whereDate('transaction_date', '<=', $cutoff->toDateString())
            ->sum('amount');

        $consumptions = SupplyTransaction::whereIn('transaction_type', ['usage', 'depreciation'])
            ->whereDate('transaction_date', '<=', $cutoff->toDateString())
            ->sum('amount');

        $balance = (float) $topups - (float) $consumptions;

        return [
            'amount' => max(0, $balance),
            'source' => 'auto',
            'meta' => [
                'topups' => (float) $topups,
                'consumptions' => (float) $consumptions,
            ],
        ];
    }

    private function calculatePrepaidRentBalance(Carbon $cutoff): array
    {
        $topups = PrepaidRentTransaction::where('transaction_type', 'topup')
            ->whereDate('transaction_date', '<=', $cutoff->toDateString())
            ->sum('amount');

        $amortizations = PrepaidRentTransaction::where('transaction_type', 'amortization')
            ->whereDate('transaction_date', '<=', $cutoff->toDateString())
            ->sum('amount');

        $balance = (float) $topups - (float) $amortizations;

        return [
            'amount' => max(0, $balance),
            'source' => 'auto',
            'meta' => [
                'topups' => (float) $topups,
                'amortizations' => (float) $amortizations,
            ],
        ];
    }

    private function calculateEquipmentBalance(Carbon $cutoff): array
    {
        $purchases = EquipmentTransaction::where('transaction_type', 'purchase')
            ->whereDate('transaction_date', '<=', $cutoff->toDateString())
            ->sum('amount');

        return [
            'amount' => (float) $purchases,
            'source' => 'auto',
            'meta' => [
                'purchases' => (float) $purchases,
            ],
        ];
    }

    private function calculateEquipmentAccumulatedBalance(Carbon $cutoff): array
    {
        $depreciations = EquipmentTransaction::where('transaction_type', 'depreciation')
            ->whereDate('transaction_date', '<=', $cutoff->toDateString())
            ->sum('amount');

        return [
            'amount' => -(float) $depreciations,
            'source' => 'auto',
            'meta' => [
                'depreciations' => (float) $depreciations,
            ],
        ];
    }

    /**
     * Calculate Paid-in Capital (Modal Disetor) balance from adjustments (contoh akun 3200).
     * Prioritas: manual override bila ada, otherwise sum FinancialPositionAdjustment s/d cutoff.
     */
    private function calculatePaidInCapitalBalance(string $accountCode, Carbon $cutoff): array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);
        if (!$accountId) {
            return ['amount' => 0.0, 'source' => 'auto', 'meta' => null];
        }

        $query = FinancialPositionAdjustment::where('account_id', $accountId)
            ->whereDate('effective_date', '<=', $cutoff->toDateString());

        $amount = (float) $query->sum('amount');
        $records = $query->count();

        return [
            'amount' => round($amount, 2),
            'source' => 'auto',
            'meta' => [
                'records' => $records,
            ],
        ];
    }

    /**
     * Calculate current year earnings using published profit & loss periods.
     */
    private function calculateCurrentYearEarnings(Carbon $cutoff): array
    {
        $year = $cutoff->year;

        $yearlyPeriod = ProfitLossPeriod::where('period_type', 'yearly')
            ->whereYear('start_date', $year)
            ->whereYear('end_date', $year)
            ->whereIn('status', ['published', 'closed'])
            ->orderByDesc('end_date')
            ->first();

        if ($yearlyPeriod) {
            return [
                'amount' => (float) $yearlyPeriod->net_profit,
                'source' => 'auto',
                'meta' => [
                    'period_id' => $yearlyPeriod->id,
                    'period_type' => 'yearly',
                ],
            ];
        }

        $monthlySum = ProfitLossPeriod::where('period_type', 'monthly')
            ->whereYear('start_date', $year)
            ->whereIn('status', ['published', 'closed'])
            ->whereDate('end_date', '<=', $cutoff->toDateString())
            ->sum('net_profit');

        return [
            'amount' => (float) $monthlySum,
            'source' => 'auto',
            'meta' => [
                'period_type' => 'monthly_aggregate',
            ],
        ];
    }

    /**
     * Calculate Retained Earnings (Laba Ditahan, ex: 3200) sampai cut-off dari periode P&L published/closed.
     */
    private function calculateRetainedEarningsBalance(Carbon $cutoff): array
    {
        $query = ProfitLossPeriod::whereIn('status', ['published', 'closed'])
            ->whereDate('end_date', '<=', $cutoff->toDateString());

        $amount = (float) $query->sum('net_profit');
        $records = $query->count();

        return [
            'amount' => $amount,
            'source' => 'auto',
            'meta' => [
                'periods_count' => $records,
            ],
        ];
    }

    /**
     * Retrieve manual override if available for account code.
     */
    private function getManualOverride(string $accountCode, Carbon $cutoff): ?array
    {
        $accountId = ChartOfAccount::idByCode($accountCode);

        if (!$accountId) {
            return null;
        }

        $record = FinancialPositionAdjustment::where('account_id', $accountId)
            ->whereNotNull('notes')
            ->whereRaw('LOWER(notes) LIKE ?', ['manual%'])
            ->whereDate('effective_date', '<=', $cutoff->toDateString())
            ->orderByDesc('effective_date')
            ->orderByDesc('created_at')
            ->first();

        if (!$record) {
            return null;
        }

        return [
            'amount' => (float) $record->amount,
            'effective_date' => $record->effective_date->toDateString(),
            'notes' => $record->notes,
        ];
    }

    /**
     * Fetch manual balance value for accounts without automatic linkage.
     */
    private function getManualValue(string $accountCode, Carbon $cutoff): ?float
    {
        $override = $this->getManualOverride($accountCode, $cutoff);

        return $override['amount'] ?? null;
    }
}
