<?php

use App\Models\AccountPayable;
use App\Models\AccountPayableNote;
use App\Models\BankBalance;
use App\Models\BankTransaction;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

$targetTransactionId = 413;
$targetBankAccountId = 1; // Mandiri
$targetAmount = 350000.00;
$targetReferenceType = 'vendor_payment';
$bankAccountIdsToRecalculate = [1, 2];
$monthsToRecalculate = ['2026-01', '2026-02'];
$systemUserId = 1;

$resolveComponentStatus = static function (float $paid, float $outstanding): string {
    if ($outstanding <= 0.01) {
        return 'paid';
    }

    if ($paid > 0) {
        return 'partial';
    }

    return 'unpaid';
};

$recalculateMonthBalance = static function (int $bankAccountId, string $month) use ($systemUserId): void {
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
            'notes' => 'Auto created during correction script',
            'created_by' => $systemUserId,
        ]);
    }

    $net = (float) BankTransaction::query()
        ->where('bank_account_id', $bankAccountId)
        ->whereBetween('transaction_date', [$monthStart, $monthEnd])
        ->selectRaw("COALESCE(SUM(CASE WHEN transaction_type = 'credit' THEN amount ELSE -amount END), 0) AS net")
        ->value('net');

    $opening = (float) $balance->opening_balance;
    $balance->current_balance = round($opening + $net, 2);
    $balance->save();
};

DB::transaction(function () use (
    $targetTransactionId,
    $targetBankAccountId,
    $targetAmount,
    $targetReferenceType,
    $resolveComponentStatus,
    $recalculateMonthBalance,
    $bankAccountIdsToRecalculate,
    $monthsToRecalculate,
    $systemUserId
): void {
    $bankTransaction = BankTransaction::query()->lockForUpdate()->find($targetTransactionId);
    if (!$bankTransaction) {
        throw new RuntimeException("Bank transaction ID {$targetTransactionId} tidak ditemukan.");
    }

    if ((int) $bankTransaction->bank_account_id !== $targetBankAccountId) {
        throw new RuntimeException('Bank account transaksi target tidak sesuai.');
    }

    if (strtolower((string) $bankTransaction->transaction_type) !== 'debit') {
        throw new RuntimeException('Tipe transaksi target bukan debit.');
    }

    if (round((float) $bankTransaction->amount, 2) !== round($targetAmount, 2)) {
        throw new RuntimeException('Nominal transaksi target tidak sesuai.');
    }

    if ((string) $bankTransaction->reference_type !== $targetReferenceType) {
        throw new RuntimeException('reference_type transaksi target tidak sesuai.');
    }

    $accountPayable = AccountPayable::query()
        ->with('components')
        ->lockForUpdate()
        ->find($bankTransaction->reference_id);

    if (!$accountPayable) {
        throw new RuntimeException('Account payable untuk transaksi target tidak ditemukan.');
    }

    $component = null;
    if ($accountPayable->components->count() === 1) {
        $component = $accountPayable->components->first();
    } else {
        $component = $accountPayable->components
            ->filter(function ($item) use ($targetAmount) {
                return round((float) $item->paid_amount, 2) >= round($targetAmount, 2);
            })
            ->first();
    }

    if ($component) {
        $newPaid = max(0, round((float) $component->paid_amount - $targetAmount, 2));
        $newOutstanding = max(0, round((float) $component->amount - $newPaid, 2));

        $component->paid_amount = $newPaid;
        $component->outstanding_amount = $newOutstanding;
        $component->status = $resolveComponentStatus($newPaid, $newOutstanding);
        $component->save();

        AccountPayableNote::query()
            ->where('account_payable_id', $accountPayable->id)
            ->where('component_id', $component->id)
            ->where('source_type', 'payment')
            ->where('note', 'like', '%RIDWAN%')
            ->delete();

        $summary = $accountPayable->recalculateTotals(false);
        $accountPayable->fill($summary);
    } else {
        $newPaid = max(0, round((float) $accountPayable->paid_amount - $targetAmount, 2));
        $newOutstanding = max(0, round((float) $accountPayable->amount - $newPaid, 2));

        $accountPayable->paid_amount = $newPaid;
        $accountPayable->outstanding_amount = $newOutstanding;
        $accountPayable->status = $resolveComponentStatus($newPaid, $newOutstanding);
    }

    $remainingNotes = collect(preg_split('/\r?\n/', (string) $accountPayable->payment_notes))
        ->map(static fn ($line) => trim((string) $line))
        ->filter()
        ->reject(static function ($line) {
            return str_contains(strtoupper($line), 'RIDWAN')
                && str_contains($line, '350,000.00');
        })
        ->values()
        ->all();

    $accountPayable->payment_notes = empty($remainingNotes) ? null : implode("\n", $remainingNotes);

    if ($accountPayable->status !== 'paid') {
        $accountPayable->payment_date = null;
        $accountPayable->payment_method = null;
        $accountPayable->paid_by = null;
    }

    $accountPayable->save();

    $bankTransaction->delete();

    foreach ($bankAccountIdsToRecalculate as $bankAccountId) {
        foreach ($monthsToRecalculate as $month) {
            $recalculateMonthBalance($bankAccountId, $month);
        }
    }

    // Pastikan opening Februari mengikuti closing Januari.
    foreach ($bankAccountIdsToRecalculate as $bankAccountId) {
        $janCurrent = (float) BankBalance::query()
            ->where('bank_account_id', $bankAccountId)
            ->where('period_month', '2026-01')
            ->value('current_balance');

        $febBalance = BankBalance::query()
            ->firstOrNew([
                'bank_account_id' => $bankAccountId,
                'period_month' => '2026-02',
            ]);

        if (!$febBalance->exists) {
            $febBalance->created_by = $systemUserId;
            $febBalance->notes = 'Auto rollover correction from 2026-01';
        }

        $febBalance->opening_balance = $janCurrent;
        $febBalance->save();

        $recalculateMonthBalance($bankAccountId, '2026-02');
    }
});

$result = [];
foreach ([1 => 'Mandiri', 2 => 'BCA'] as $bankId => $bankName) {
    $result[$bankName] = [
        'jan_opening' => (float) BankBalance::query()
            ->where('bank_account_id', $bankId)
            ->where('period_month', '2026-01')
            ->value('opening_balance'),
        'jan_closing' => (float) BankBalance::query()
            ->where('bank_account_id', $bankId)
            ->where('period_month', '2026-01')
            ->value('current_balance'),
        'feb_opening' => (float) BankBalance::query()
            ->where('bank_account_id', $bankId)
            ->where('period_month', '2026-02')
            ->value('opening_balance'),
        'feb_current' => (float) BankBalance::query()
            ->where('bank_account_id', $bankId)
            ->where('period_month', '2026-02')
            ->value('current_balance'),
    ];
}

echo "DONE\n";
var_export($result);
echo "\n";
