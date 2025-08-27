<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PettyCashBalance;

class PettyCashBalanceSeeder extends Seeder
{
    public function run(): void
    {
        // Current balance record
        PettyCashBalance::create([
            'balance_date' => now()->toDateString(),
            'opening_balance' => 5000000.00,
            'total_in' => 10000000.00,        // topup + refund
            'total_out' => 2135000.00,        // expenses
            'closing_balance' => 12865000.00,
            'transaction_count' => 12,        // jumlah transaksi
            'notes' => 'Balance updated after recent transactions',
        ]);

        // Previous month balance
        PettyCashBalance::create([
            'balance_date' => now()->subMonth()->endOfMonth()->toDateString(),
            'opening_balance' => 3000000.00,
            'total_in' => 5000000.00,
            'total_out' => 3000000.00,
            'closing_balance' => 5000000.00,
            'transaction_count' => 8,
            'notes' => 'End of month balance - ' . now()->subMonth()->format('M Y'),
        ]);

        // 2 months ago balance
        PettyCashBalance::create([
            'balance_date' => now()->subMonths(2)->endOfMonth()->toDateString(),
            'opening_balance' => 2000000.00,
            'total_in' => 3000000.00,
            'total_out' => 2000000.00,
            'closing_balance' => 3000000.00,
            'transaction_count' => 6,
            'notes' => 'End of month balance - ' . now()->subMonths(2)->format('M Y'),
        ]);

        $this->command->info('Petty Cash Balance seeder completed successfully!');
    }
}
