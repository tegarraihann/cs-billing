<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableNote;
use App\Models\BankTransaction;
use App\Models\SalesOrder;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/repair-orphan-ap-notes-and-bank-links.php
 *   php scripts/repair-orphan-ap-notes-and-bank-links.php --so=EWILOG2603049003
 *   php scripts/repair-orphan-ap-notes-and-bank-links.php --so=EWILOG2603049003 --apply
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$soFilter = 'EWILOG2603049003';

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--so=')) {
        $soFilter = trim((string) substr($arg, strlen('--so=')));
    }
}

$formatAmount = static fn (float $value): string => number_format($value, 2, '.', ',');

$normalizeSoCandidates = static function (string $value): array {
    $raw = strtoupper(trim($value));
    $compact = preg_replace('/[^A-Z0-9]/', '', $raw) ?: $raw;
    $withoutPrefix = preg_replace('/^EWILOG/', '', $compact);
    $withoutPrefix = preg_replace('/^EWL/', '', $withoutPrefix);

    return array_values(array_unique(array_filter([
        $raw,
        $compact,
        $withoutPrefix,
        $withoutPrefix !== '' ? 'EWILOG' . $withoutPrefix : null,
        $withoutPrefix !== '' ? 'EWL' . $withoutPrefix : null,
    ])));
};

$salesOrder = SalesOrder::query()
    ->with(['accountPayables.components'])
    ->where(function ($query) use ($soFilter, $normalizeSoCandidates) {
        foreach ($normalizeSoCandidates($soFilter) as $candidate) {
            $query->orWhere('order_number', $candidate);
        }

        $query->orWhere('order_number', 'like', '%' . $soFilter . '%');
    })
    ->first();

echo "=== REPAIR ORPHAN AP NOTES + BANK LINKS ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";

if (!$salesOrder) {
    echo "Sales order tidak ditemukan untuk filter {$soFilter}.\n";
    exit(0);
}

/** @var Collection<int, AccountPayable> $activePayables */
$activePayables = $salesOrder->accountPayables;
$activePayableIds = $activePayables->pluck('id')->filter()->values();
$activeComponentIds = $activePayables
    ->flatMap(fn (AccountPayable $payable) => $payable->components->pluck('id'))
    ->filter()
    ->values();

$orphanNotes = AccountPayableNote::query()
    ->where('sales_order_id', $salesOrder->id)
    ->where(function ($query) use ($activePayableIds, $activeComponentIds) {
        if ($activePayableIds->isNotEmpty()) {
            $query->whereNotIn('account_payable_id', $activePayableIds);
        }

        if ($activeComponentIds->isNotEmpty()) {
            $query->orWhereNotIn('component_id', $activeComponentIds);
        }
    })
    ->orderBy('id')
    ->get();

$orphanPayableIds = $orphanNotes
    ->pluck('account_payable_id')
    ->filter()
    ->map(fn ($id) => (int) $id)
    ->unique()
    ->values();

$candidateBankTransactions = BankTransaction::query()
    ->with('bankAccount')
    ->where('reference_type', 'vendor_payment')
    ->whereIn('reference_id', $orphanPayableIds)
    ->orderBy('transaction_date')
    ->orderBy('id')
    ->get();

$findBestTargetPayable = static function (BankTransaction $transaction, Collection $payables): ?AccountPayable {
    $description = strtolower(trim((string) $transaction->description));
    $amount = (float) $transaction->amount;

    $scored = $payables->map(function (AccountPayable $payable) use ($description, $amount) {
        $score = 0;
        $vendorName = strtolower(trim((string) $payable->vendor_name));

        if ($vendorName !== '' && str_contains($description, $vendorName)) {
            $score += 5;
        }

        foreach ($payable->components as $component) {
            $componentDescription = strtolower(trim((string) $component->description));
            if ($componentDescription !== '' && str_contains($description, $componentDescription)) {
                $score += 5;
            }

            if (abs((float) $component->amount - $amount) < 0.01) {
                $score += 10;
            }
        }

        if (abs((float) $payable->amount - $amount) < 0.01) {
            $score += 3;
        }

        if (abs((float) $payable->paid_amount - $amount) < 0.01) {
            $score += 3;
        }

        return [
            'payable' => $payable,
            'score' => $score,
        ];
    })->sortByDesc('score')->values();

    $best = $scored->first();
    if (!$best || ($best['score'] ?? 0) <= 0) {
        return null;
    }

    return $best['payable'];
};

$plannedBankRelinks = [];
foreach ($candidateBankTransactions as $transaction) {
    $targetPayable = $findBestTargetPayable($transaction, $activePayables);
    if (!$targetPayable) {
        continue;
    }

    $plannedBankRelinks[] = [
        'bank_tx_id' => $transaction->id,
        'old_reference_id' => (int) $transaction->reference_id,
        'new_reference_id' => $targetPayable->id,
        'amount' => (float) $transaction->amount,
        'description' => $transaction->description,
        'bank_name' => $transaction->bankAccount?->bank_name,
    ];
}

echo "SO: {$salesOrder->order_number}\n";
echo 'Orphan notes: ' . $orphanNotes->count() . "\n";
foreach ($orphanNotes as $note) {
    echo sprintf(
        "  - Note#%d | AP old=%s | Component old=%s | %s\n",
        $note->id,
        $note->account_payable_id ?? '-',
        $note->component_id ?? '-',
        $note->note
    );
}

echo 'Bank transactions to relink: ' . count($plannedBankRelinks) . "\n";
foreach ($plannedBankRelinks as $entry) {
    echo sprintf(
        "  - BankTx#%d | %s | %s | %s -> AP#%d\n",
        $entry['bank_tx_id'],
        $entry['bank_name'] ?? '-',
        $formatAmount($entry['amount']),
        $entry['description'],
        $entry['new_reference_id']
    );
}

if (!$apply) {
    echo "Mode DRY-RUN: tidak ada perubahan disimpan.\n";
    exit(0);
}

DB::transaction(function () use ($orphanNotes, $plannedBankRelinks): void {
    foreach ($orphanNotes as $note) {
        $lockedNote = AccountPayableNote::query()->lockForUpdate()->find($note->id);
        if ($lockedNote) {
            $lockedNote->delete();
        }
    }

    foreach ($plannedBankRelinks as $entry) {
        $bankTx = BankTransaction::query()->lockForUpdate()->find($entry['bank_tx_id']);
        if (!$bankTx) {
            continue;
        }

        $bankTx->reference_id = $entry['new_reference_id'];
        $bankTx->save();
    }
});

echo "Selesai. Note orphan dibersihkan dan referensi bank transaction dipindahkan ke AP aktif.\n";
