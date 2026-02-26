<?php

use App\Models\BankAccount;
use App\Models\BankBalance;
use App\Models\BankTransaction;
use App\Models\ProfitLossEntry;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

$bankAccountId = 1; // Mandiri
$january = '2026-01';
$february = '2026-02';

$targets = [
    505 => [
        'transaction_type' => 'debit',
        'amount' => 12500.00,
        'transaction_date' => '2026-01-31',
    ],
    506 => [
        'transaction_type' => 'debit',
        'amount' => 89684.78,
        'transaction_date' => '2026-01-31',
    ],
    507 => [
        'transaction_type' => 'credit',
        'amount' => 448423.89,
        'transaction_date' => '2026-01-31',
    ],
];

$targetJanuaryOpening = 1059995370.99;

$monthBalance = static function (int $bankId, string $month): array {
    $start = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
    $end = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

    $opening = (float) BankBalance::query()
        ->where('bank_account_id', $bankId)
        ->where('period_month', $month)
        ->value('opening_balance');

    $credits = (float) BankTransaction::query()
        ->where('bank_account_id', $bankId)
        ->whereBetween('transaction_date', [$start, $end])
        ->where('transaction_type', 'credit')
        ->sum('amount');

    $debits = (float) BankTransaction::query()
        ->where('bank_account_id', $bankId)
        ->whereBetween('transaction_date', [$start, $end])
        ->where('transaction_type', 'debit')
        ->sum('amount');

    return [
        'opening' => $opening,
        'credits' => $credits,
        'debits' => $debits,
        'closing' => round($opening + $credits - $debits, 2),
    ];
};

$recalculateMonth = static function (int $bankId, string $month): void {
    $start = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
    $end = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

    $balance = BankBalance::query()
        ->where('bank_account_id', $bankId)
        ->where('period_month', $month)
        ->first();

    if (!$balance) {
        throw new RuntimeException("Bank balance {$bankId} {$month} tidak ditemukan.");
    }

    $opening = (float) $balance->opening_balance;
    $net = (float) BankTransaction::query()
        ->where('bank_account_id', $bankId)
        ->whereBetween('transaction_date', [$start, $end])
        ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
        ->value('net');

    $balance->current_balance = round($opening + $net, 2);
    $balance->save();
};

$beforeJanuary = $monthBalance($bankAccountId, $january);
$beforeFebruary = $monthBalance($bankAccountId, $february);

DB::transaction(function () use (
    $bankAccountId,
    $targets,
    $targetJanuaryOpening,
    $january,
    $february,
    $recalculateMonth
): void {
    foreach ($targets as $id => $target) {
        $tx = BankTransaction::query()->lockForUpdate()->find($id);
        if (!$tx) {
            throw new RuntimeException("Transaksi ID {$id} tidak ditemukan.");
        }

        if ((int) $tx->bank_account_id !== $bankAccountId) {
            throw new RuntimeException("Transaksi ID {$id} bukan milik Mandiri.");
        }

        if ((string) $tx->transaction_type !== $target['transaction_type']) {
            throw new RuntimeException("Tipe transaksi ID {$id} tidak sesuai.");
        }

        $tx->amount = $target['amount'];
        $tx->transaction_date = $target['transaction_date'];
        $tx->save();

        if ((string) $tx->reference_type === 'profit_loss_adjustment' && !empty($tx->reference_id)) {
            ProfitLossEntry::query()
                ->where('id', $tx->reference_id)
                ->update([
                    'amount' => $target['amount'],
                    'transaction_date' => $target['transaction_date'],
                ]);
        }
    }

    $janBalance = BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $january)
        ->lockForUpdate()
        ->first();

    if (!$janBalance) {
        throw new RuntimeException('Opening balance Januari Mandiri tidak ditemukan.');
    }

    $janBalance->opening_balance = $targetJanuaryOpening;
    $janBalance->save();

    $recalculateMonth($bankAccountId, $january);

    $janClosing = (float) BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $january)
        ->value('current_balance');

    $febBalance = BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $february)
        ->lockForUpdate()
        ->first();

    if ($febBalance) {
        $febBalance->opening_balance = $janClosing;
        $febBalance->save();
        $recalculateMonth($bankAccountId, $february);
    }
});

$afterJanuary = $monthBalance($bankAccountId, $january);
$afterFebruary = $monthBalance($bankAccountId, $february);

$txSnapshot = BankTransaction::query()
    ->whereIn('id', array_keys($targets))
    ->orderBy('id')
    ->get(['id', 'transaction_type', 'amount', 'transaction_date', 'description'])
    ->map(function (BankTransaction $tx) {
        return [
            'id' => $tx->id,
            'transaction_type' => $tx->transaction_type,
            'amount' => (float) $tx->amount,
            'transaction_date' => optional($tx->transaction_date)->toDateString(),
            'description' => $tx->description,
        ];
    })
    ->all();

$bank = BankAccount::query()->find($bankAccountId);
if ($bank) {
    $bank->updateCurrentBalanceQuietly();
}

echo "MANDIRI JANUARY ADJUSTMENT COMPLETE\n";
var_export([
    'before_january' => $beforeJanuary,
    'after_january' => $afterJanuary,
    'before_february' => $beforeFebruary,
    'after_february' => $afterFebruary,
    'target_transactions' => $txSnapshot,
]);
echo "\n";
