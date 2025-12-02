<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\BankAccount;
use App\Models\BankBalance;
use Carbon\Carbon;

class RolloverBankOpening extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'bank:rollover-opening';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Buat opening balance bulan berjalan dari closing bulan sebelumnya untuk setiap bank';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $now = Carbon::now();
        $currentMonth = $now->format('Y-m');
        $previousMonth = $now->copy()->subMonth()->format('Y-m');

        $banks = BankAccount::all();

        foreach ($banks as $bank) {
            $hasOpening = $bank->balances()->where('period_month', $currentMonth)->exists();
            if ($hasOpening) {
                $this->line("{$bank->bank_name} - {$bank->account_number}: opening {$currentMonth} sudah ada, skip.");
                continue;
            }

            // Rumus: closing bulan sebelumnya = total credit - total debit bulan sebelumnya
            $prevStart = $now->copy()->subMonth()->startOfMonth();
            $prevEnd = $now->copy()->subMonth()->endOfMonth();

            $credit = $bank->transactions()
                ->whereBetween('transaction_date', [$prevStart, $prevEnd])
                ->where('transaction_type', 'credit')
                ->sum('amount');

            $debit = $bank->transactions()
                ->whereBetween('transaction_date', [$prevStart, $prevEnd])
                ->where('transaction_type', 'debit')
                ->sum('amount');

            $closingPrevMonth = $credit - $debit;

            BankBalance::create([
                'bank_account_id' => $bank->id,
                'period_month' => $currentMonth,
                'opening_balance' => $closingPrevMonth,
                'current_balance' => $closingPrevMonth,
                'created_by' => 1, // default system/admin user
                'notes' => "Auto rollover from {$previousMonth}",
            ]);

            $this->info("{$bank->bank_name} - {$bank->account_number}: opening {$currentMonth} dibuat = {$closingPrevMonth}");
        }

        return self::SUCCESS;
    }
}
