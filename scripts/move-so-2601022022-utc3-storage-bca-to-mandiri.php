<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\BankAccount;
use App\Models\BankBalance;
use App\Models\BankTransaction;
use App\Models\SalesOrder;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/move-so-2601022022-utc3-storage-bca-to-mandiri.php           # dry-run
 *   php scripts/move-so-2601022022-utc3-storage-bca-to-mandiri.php --apply   # eksekusi pindah bank
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true) || getenv('MOVE_TX_APPLY') === '1';

$targetSoSuffix = '2601022022';
$targetVendorName = 'UTC 3 / TPK KOJA';
$targetDescriptionKeyword = 'STORAGE';
$targetAmount = 569430.00;
$fromBankName = 'BCA';
$toBankName = 'Mandiri';
$dryRun = !$apply;
$systemUserId = 1;

$resolveMonthBalance = static function (int $bankAccountId, string $month): array {
    $monthStart = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
    $monthEnd = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

    $opening = (float) BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $month)
        ->value('opening_balance');

    $net = (float) BankTransaction::query()
        ->where('bank_account_id', $bankAccountId)
        ->whereBetween('transaction_date', [$monthStart, $monthEnd])
        ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
        ->value('net');

    return [
        'opening' => round($opening, 2),
        'net' => round($net, 2),
        'closing' => round($opening + $net, 2),
    ];
};

$recalculateMonthBalance = static function (int $bankAccountId, string $month, int $systemUserId): void {
    $monthStart = Carbon::createFromFormat('Y-m', $month)->startOfMonth()->toDateString();
    $monthEnd = Carbon::createFromFormat('Y-m', $month)->endOfMonth()->toDateString();

    $balance = BankBalance::query()
        ->where('bank_account_id', $bankAccountId)
        ->where('period_month', $month)
        ->first();

    if (!$balance) {
        $previousMonth = Carbon::createFromFormat('Y-m', $month)->subMonth()->format('Y-m');
        $previousCurrent = (float) BankBalance::query()
            ->where('bank_account_id', $bankAccountId)
            ->where('period_month', $previousMonth)
            ->value('current_balance');

        $balance = BankBalance::query()->create([
            'bank_account_id' => $bankAccountId,
            'period_month' => $month,
            'opening_balance' => $previousCurrent,
            'current_balance' => $previousCurrent,
            'notes' => 'Auto created during bank move correction',
            'created_by' => $systemUserId,
        ]);
    }

    $opening = (float) $balance->opening_balance;
    $net = (float) BankTransaction::query()
        ->where('bank_account_id', $bankAccountId)
        ->whereBetween('transaction_date', [$monthStart, $monthEnd])
        ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
        ->value('net');

    $balance->current_balance = round($opening + $net, 2);
    $balance->save();
};

$so = SalesOrder::query()
    ->where('order_number', 'like', '%' . $targetSoSuffix)
    ->first();

if (!$so) {
    throw new RuntimeException("Sales Order dengan suffix {$targetSoSuffix} tidak ditemukan.");
}

$fromBank = BankAccount::query()
    ->where('bank_name', $fromBankName)
    ->first();
if (!$fromBank) {
    throw new RuntimeException("Bank asal {$fromBankName} tidak ditemukan.");
}

$toBank = BankAccount::query()
    ->where('bank_name', $toBankName)
    ->first();
if (!$toBank) {
    throw new RuntimeException("Bank tujuan {$toBankName} tidak ditemukan.");
}

$targetPayables = AccountPayable::query()
    ->where('sales_order_id', $so->id)
    ->whereRaw('LOWER(vendor_name) = ?', [strtolower($targetVendorName)])
    ->pluck('id');

if ($targetPayables->isEmpty()) {
    throw new RuntimeException("AP vendor {$targetVendorName} pada SO {$so->order_number} tidak ditemukan.");
}

$targetTransactions = BankTransaction::query()
    ->where('reference_type', 'vendor_payment')
    ->whereIn('reference_id', $targetPayables)
    ->where('transaction_type', 'debit')
    ->where('bank_account_id', $fromBank->id)
    ->whereRaw('ROUND(amount, 2) = ?', [round($targetAmount, 2)])
    ->where('description', 'like', '%' . $targetVendorName . '%')
    ->where('description', 'like', '%' . $targetDescriptionKeyword . '%')
    ->orderBy('id')
    ->get();

if ($targetTransactions->count() !== 1) {
    throw new RuntimeException(
        'Transaksi target harus tepat 1, ditemukan: ' . $targetTransactions->count()
    );
}

$targetTransaction = $targetTransactions->first();
$targetMonth = Carbon::parse($targetTransaction->transaction_date)->format('Y-m');
$fromBefore = $resolveMonthBalance($fromBank->id, $targetMonth);
$toBefore = $resolveMonthBalance($toBank->id, $targetMonth);

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA UPDATE\n";
    var_export([
        'so' => $so->order_number,
        'target_transaction' => [
            'id' => $targetTransaction->id,
            'reference_id' => $targetTransaction->reference_id,
            'transaction_date' => Carbon::parse($targetTransaction->transaction_date)->toDateString(),
            'amount' => (float) $targetTransaction->amount,
            'description' => $targetTransaction->description,
            'from_bank' => $fromBank->bank_name,
            'to_bank' => $toBank->bank_name,
        ],
        'balance_before' => [
            $fromBank->bank_name => $fromBefore,
            $toBank->bank_name => $toBefore,
        ],
    ]);
    echo "\n";
    exit(0);
}

DB::transaction(function () use (
    $targetTransaction,
    $toBank,
    $targetMonth,
    $fromBank,
    $recalculateMonthBalance,
    $systemUserId
): void {
    $lockedTx = BankTransaction::query()->lockForUpdate()->find($targetTransaction->id);
    if (!$lockedTx) {
        throw new RuntimeException('Transaksi target tidak ditemukan saat lock.');
    }

    $lockedTx->bank_account_id = $toBank->id;
    $lockedTx->save();

    $recalculateMonthBalance($fromBank->id, $targetMonth, $systemUserId);
    $recalculateMonthBalance($toBank->id, $targetMonth, $systemUserId);
});

$fromAfter = $resolveMonthBalance($fromBank->id, $targetMonth);
$toAfter = $resolveMonthBalance($toBank->id, $targetMonth);

echo "DONE - TRANSAKSI BERHASIL DIPINDAHKAN\n";
var_export([
    'so' => $so->order_number,
    'transaction_id' => $targetTransaction->id,
    'from_bank' => $fromBank->bank_name,
    'to_bank' => $toBank->bank_name,
    'amount' => $targetAmount,
    'month' => $targetMonth,
    'balance_before' => [
        $fromBank->bank_name => $fromBefore,
        $toBank->bank_name => $toBefore,
    ],
    'balance_after' => [
        $fromBank->bank_name => $fromAfter,
        $toBank->bank_name => $toAfter,
    ],
]);
echo "\n";
