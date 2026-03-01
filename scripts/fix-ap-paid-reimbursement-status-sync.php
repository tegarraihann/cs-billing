<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\BankTransaction;
use App\Models\ReimbursementItem;
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
 *   php scripts/fix-ap-paid-reimbursement-status-sync.php --so=EWILOG2601002002
 *   php scripts/fix-ap-paid-reimbursement-status-sync.php --so=EWILOG2601002002 --apply
 *
 * Default = DRY-RUN.
 *
 * Scope:
 * - Cari komponen AP reimbursement yang sudah status paid
 * - Ambil reimbursement item sumber dari related_items.reimbursement_item_id
 * - Selaraskan status vendor reimbursement item menjadi paid
 * - Tambahkan metadata linkage ke receipt_info
 *
 * Tidak menyentuh:
 * - BankTransaction
 * - AR / customer payment
 * - nominal amount reimbursement
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$soFilter = null;

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--so=')) {
        $soFilter = trim((string) substr($arg, strlen('--so=')));
    }
}

if ($soFilter === null || $soFilter === '') {
    fwrite(STDERR, "Wajib beri filter --so=...\n");
    exit(1);
}

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

$formatAmount = static function (float $amount): string {
    return number_format($amount, 2, '.', ',');
};

$candidates = $normalizeSoCandidates($soFilter);

$salesOrder = SalesOrder::query()
    ->where(function ($query) use ($candidates) {
        foreach ($candidates as $candidate) {
            $query->orWhere('order_number', $candidate);
        }
    })
    ->first();

if (!$salesOrder) {
    echo "Sales Order tidak ditemukan untuk filter {$soFilter}.\n";
    exit(0);
}

$payables = AccountPayable::query()
    ->with('components')
    ->where('sales_order_id', $salesOrder->id)
    ->get();

$paidReimbursementComponents = $payables
    ->flatMap(function (AccountPayable $payable) {
        return $payable->components->map(function ($component) use ($payable) {
            $component->setRelation('accountPayable', $payable);
            return $component;
        });
    })
    ->filter(function ($component) {
        return $component->component_type === 'reimbursement'
            && ($component->status ?? null) === 'paid';
    })
    ->values();

echo "=== FIX AP REIMBURSEMENT PAID STATUS SYNC ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo "SO: {$salesOrder->order_number} (ID {$salesOrder->id})\n";
echo 'Komponen reimbursement paid terdeteksi: ' . $paidReimbursementComponents->count() . "\n\n";

if ($paidReimbursementComponents->isEmpty()) {
    echo "Tidak ada komponen reimbursement paid yang perlu diselaraskan.\n";
    exit(0);
}

$changes = [];
$skipped = [];

foreach ($paidReimbursementComponents as $component) {
    /** @var \App\Models\AccountPayableComponent $component */
    $payable = $component->accountPayable;
    $relatedItems = is_array($component->related_items) ? $component->related_items : [];
    $reimbursementItemId = data_get($relatedItems, 'reimbursement_item_id');

    if (!is_numeric($reimbursementItemId)) {
        $skipped[] = [
            'component_id' => $component->id,
            'reason' => 'related_items.reimbursement_item_id tidak ditemukan',
        ];
        continue;
    }

    $reimbursementItem = ReimbursementItem::query()->find((int) $reimbursementItemId);

    if (!$reimbursementItem) {
        $skipped[] = [
            'component_id' => $component->id,
            'reimbursement_item_id' => (int) $reimbursementItemId,
            'reason' => 'reimbursement item tidak ditemukan',
        ];
        continue;
    }

    $vendorBankTransactions = BankTransaction::query()
        ->where('reference_type', 'vendor_payment')
        ->where('reference_id', $payable->id)
        ->orderBy('transaction_date')
        ->orderBy('id')
        ->get();

    $effectivePaidAt = $payable->payment_date
        ? Carbon::parse($payable->payment_date)
        : ($vendorBankTransactions->last()?->transaction_date
            ? Carbon::parse($vendorBankTransactions->last()->transaction_date)
            : now());

    $receiptInfoBefore = is_array($reimbursementItem->receipt_info)
        ? $reimbursementItem->receipt_info
        : (json_decode((string) $reimbursementItem->receipt_info, true) ?: []);

    $receiptInfoAfter = $receiptInfoBefore;
    $history = $receiptInfoAfter['payment_history'] ?? [];
    if (!is_array($history)) {
        $history = [];
    }

    $componentId = (int) $component->id;
    $alreadyLogged = collect($history)->contains(function ($entry) use ($componentId) {
        return (int) data_get($entry, 'account_payable_component_id', 0) === $componentId
            && (string) data_get($entry, 'status', '') === 'paid';
    });

    if (!$alreadyLogged) {
        $history[] = [
            'status' => 'paid',
            'vendor_name' => $payable->vendor_name,
            'notes' => 'Synced from paid AP reimbursement component',
            'timestamp' => now()->toDateTimeString(),
            'user' => [
                'id' => null,
                'name' => 'system-script',
            ],
            'account_payable_id' => (int) $payable->id,
            'account_payable_component_id' => $componentId,
        ];
    }

    $receiptInfoAfter['payment_history'] = $history;
    $receiptInfoAfter['vendor_name'] = $payable->vendor_name;
    $receiptInfoAfter['marked_paid_by'] = [
        'id' => null,
        'name' => 'system-script',
    ];
    $receiptInfoAfter['marked_paid_at'] = now()->toDateTimeString();
    $receiptInfoAfter['account_payable_id'] = (int) $payable->id;
    $receiptInfoAfter['account_payable_component_id'] = $componentId;
    $receiptInfoAfter['component_id'] = $componentId;
    $receiptInfoAfter['account_payable_vendor'] = $payable->vendor_name;
    $receiptInfoAfter['sync_source'] = 'fix-ap-paid-reimbursement-status-sync';

    $before = [
        'reimbursement_item_id' => $reimbursementItem->id,
        'description' => $reimbursementItem->description,
        'status' => $reimbursementItem->status,
        'paid_at' => $reimbursementItem->paid_at?->toDateTimeString(),
        'account_payable_component_id' => data_get($receiptInfoBefore, 'account_payable_component_id'),
        'component_id' => data_get($receiptInfoBefore, 'component_id'),
    ];

    $after = [
        'status' => 'paid',
        'paid_at' => $effectivePaidAt->toDateTimeString(),
        'account_payable_component_id' => $componentId,
        'component_id' => $componentId,
    ];

    $requiresUpdate =
        $before['status'] !== 'paid' ||
        $before['paid_at'] !== $after['paid_at'] ||
        (int) ($before['account_payable_component_id'] ?? 0) !== $componentId ||
        (int) ($before['component_id'] ?? 0) !== $componentId;

    $changes[] = [
        'payable_id' => (int) $payable->id,
        'component_id' => $componentId,
        'component_description' => $component->description,
        'component_amount' => (float) $component->amount,
        'payable_bank_transaction_count' => $vendorBankTransactions->count(),
        'payable_bank_transaction_total' => (float) $vendorBankTransactions->sum('amount'),
        'before' => $before,
        'after' => $after,
        'requires_update' => $requiresUpdate,
        'apply' => function () use ($reimbursementItem, $effectivePaidAt, $receiptInfoAfter) {
            $reimbursementItem->status = 'paid';
            $reimbursementItem->paid_at = $effectivePaidAt;
            $reimbursementItem->receipt_info = $receiptInfoAfter;
            $reimbursementItem->save();
        },
    ];
}

foreach ($changes as $change) {
    echo '[CHECK] ';
    echo 'AP#' . $change['payable_id'];
    echo ' | Component#' . $change['component_id'];
    echo ' | ' . $change['component_description'];
    echo ' | amount=' . $formatAmount($change['component_amount']);
    if ($change['payable_bank_transaction_count'] > 0) {
        echo ' | payable_bank_tx=' . $change['payable_bank_transaction_count']
            . ' total=' . $formatAmount((float) $change['payable_bank_transaction_total']);
    }
    echo "\n";

    echo '  Reimbursement item #' . $change['before']['reimbursement_item_id']
        . ' (' . $change['before']['description'] . ')' . "\n";
    echo '  Before: status=' . ($change['before']['status'] ?? '-')
        . ' | paid_at=' . ($change['before']['paid_at'] ?? '-')
        . ' | component_id=' . ($change['before']['component_id'] ?? '-') . "\n";
    echo '  After : status=' . $change['after']['status']
        . ' | paid_at=' . ($change['after']['paid_at'] ?? '-')
        . ' | component_id=' . ($change['after']['component_id'] ?? '-') . "\n";
    echo '  Action: ' . ($change['requires_update'] ? 'SYNC NEEDED' : 'UNCHANGED') . "\n\n";
}

if (!empty($skipped)) {
    echo "Skipped:\n";
    foreach ($skipped as $skip) {
        echo '- Component#' . ($skip['component_id'] ?? '-') . ' | ' . $skip['reason'] . "\n";
    }
    echo "\n";
}

$changeCount = collect($changes)->where('requires_update', true)->count();

if (!$apply) {
    echo "Selesai DRY-RUN. Kandidat berubah: {$changeCount}\n";
    exit(0);
}

DB::transaction(function () use ($changes) {
    foreach ($changes as $change) {
        if (!$change['requires_update']) {
            continue;
        }

        $applyUpdate = $change['apply'];
        $applyUpdate();
    }
});

echo "Selesai APPLY. Berubah: {$changeCount}\n";
