<?php

/**
 * FILE 9: database/seeders/PettyCashTransactionSeeder.php
 * Petty Cash Transactions
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PettyCashTransaction;
use App\Models\PettyCashCategory;
use App\Models\User;

class PettyCashTransactionSeeder extends Seeder
{
    public function run(): void
    {
        $categories = PettyCashCategory::all();
        $users = User::all();

        if ($categories->isEmpty() || $users->isEmpty()) {
            $this->command->info('Please run PettyCashCategorySeeder and UserSeeder first.');
            return;
        }

        $balance = 5_000_000; // Starting balance 5 million

        // Top-up transaction
        $balance += 10_000_000; // Add 10 million
        PettyCashTransaction::create([
            'transaction_date' => now()->subDays(30)->toDateString(),
            'description' => 'Top up petty cash awal bulan',
            'category_id' => $categories->where('name', 'Top Up')->first()->id,
            'amount' => 10_000_000,
            'type' => 'topup',
            'balance_after' => $balance,
            'notes' => 'Top up rutin bulanan',
            'status' => 'approved',
            'user_id' => $users->first()->id,
            'approved_by' => $users->first()->id,
            'approved_at' => now()->subDays(30)
        ]);

        // Sample expense transactions
        $transactions = [
            [
                'date' => now()->subDays(25),
                'description' => 'Bensin motor untuk delivery dokumen',
                'category' => 'Transportasi',
                'amount' => 150_000,
                'notes' => 'Pengiriman dokumen ke customer',
                'so_number' => 'SO-2025-001'
            ],
            [
                'date' => now()->subDays(23),
                'description' => 'Makan siang rapat dengan customer',
                'category' => 'Konsumsi',
                'amount' => 350_000,
                'notes' => 'Business lunch dengan PT ABC',
                'so_number' => null
            ],
            [
                'date' => now()->subDays(20),
                'description' => 'Kertas A4 dan tinta printer',
                'category' => 'ATK & Supplies',
                'amount' => 275_000,
                'notes' => 'Kebutuhan operasional kantor',
                'so_number' => null
            ],
            [
                'date' => now()->subDays(18),
                'description' => 'Pulsa dan paket internet',
                'category' => 'Komunikasi',
                'amount' => 200_000,
                'notes' => 'Komunikasi dengan vendor dan customer',
                'so_number' => null
            ],
            [
                'date' => now()->subDays(15),
                'description' => 'Service AC kantor',
                'category' => 'Maintenance',
                'amount' => 450_000,
                'notes' => 'Perbaikan AC ruang meeting',
                'so_number' => null
            ],
            [
                'date' => now()->subDays(12),
                'description' => 'Taxi ke pelabuhan untuk survey',
                'category' => 'Transportasi',
                'amount' => 125_000,
                'notes' => 'Survey kondisi cargo di pelabuhan',
                'so_number' => 'SO-2025-002'
            ],
            [
                'date' => now()->subDays(8),
                'description' => 'Fotocopy dokumen ekspor-impor',
                'category' => 'ATK & Supplies',
                'amount' => 85_000,
                'notes' => 'Dokumen untuk clearance barang',
                'so_number' => 'SO-2025-003'
            ],
            [
                'date' => now()->subDays(5),
                'description' => 'Biaya parkir di bandara',
                'category' => 'Transportasi',
                'amount' => 25_000,
                'notes' => 'Koordinasi dengan cargo airline',
                'so_number' => 'SO-2025-002'
            ],
            [
                'date' => now()->subDays(3),
                'description' => 'Snack meeting mingguan',
                'category' => 'Konsumsi',
                'amount' => 180_000,
                'notes' => 'Meeting evaluasi operasional',
                'so_number' => null
            ],
            [
                'date' => now()->subDays(1),
                'description' => 'Beli kunci pas untuk maintenance',
                'category' => 'Emergency',
                'amount' => 95_000,
                'notes' => 'Perbaikan darurat pintu gudang',
                'so_number' => null
            ]
        ];

        foreach ($transactions as $transaction) {
            $balance -= $transaction['amount'];

            PettyCashTransaction::create([
                'transaction_date' => $transaction['date']->toDateString(),
                'description' => $transaction['description'],
                'category_id' => $categories->where('name', $transaction['category'])->first()->id,
                'amount' => $transaction['amount'],
                'type' => 'expense',
                'so_number' => $transaction['so_number'],
                'balance_after' => $balance,
                'notes' => $transaction['notes'],
                'status' => 'approved',
                'user_id' => $users->random()->id,
                'approved_by' => $users->first()->id,
                'approved_at' => $transaction['date']->copy()->addHours(2)
            ]);
        }

        $this->command->info('Petty Cash Transaction seeder completed successfully!');
    }
}
