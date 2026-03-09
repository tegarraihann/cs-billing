<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\InvoiceItem;
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
 *   php scripts/repair-so-ewilog2602044014-ar-detail-items.php
 *   php scripts/repair-so-ewilog2602044014-ar-detail-items.php --apply
 *
 * Scope:
 * - Cleanup duplicate reimbursement invoice items pada SO EWILOG2602044014
 * - Sinkronkan invoice operational cost items (other_cost_*) dengan data SO terbaru
 * - Normalisasi paid/outstanding/status item invoice lama yang nilainya tidak valid
 * - Sync ulang AR dari invoice setelah cleanup
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2602044014';

$formatAmount = static fn (float $amount): string => number_format($amount, 2, '.', ',');

$normalizeReimbursementKey = static function (?string $itemRef, ?int $itemId = null): string {
    $value = strtolower(trim((string) $itemRef));
    if ($value !== '' && preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $value, $matches)) {
        return 'reimbursement_' . (int) $matches[1];
    }

    if ($value !== '') {
        return $value;
    }

    return 'invoice_item_' . (int) $itemId;
};

$selectCanonicalReimbursementItem = static function (Collection $items): InvoiceItem {
    /** @var InvoiceItem $item */
    $item = $items->sort(function (InvoiceItem $left, InvoiceItem $right) {
        $leftRef = strtolower((string) ($left->item_ref ?? ''));
        $rightRef = strtolower((string) ($right->item_ref ?? ''));

        $leftPreferred = str_starts_with($leftRef, 'reimbursement_') ? 1 : 0;
        $rightPreferred = str_starts_with($rightRef, 'reimbursement_') ? 1 : 0;

        if ($leftPreferred !== $rightPreferred) {
            return $rightPreferred <=> $leftPreferred;
        }

        return $right->id <=> $left->id;
    })->first();

    return $item;
};

$normalizePaymentFields = static function (float $lineTotal, float $paidAmount): array {
    $lineTotal = max(0, $lineTotal);
    $paidAmount = min($lineTotal, max(0, $paidAmount));
    $outstandingAmount = max(0, $lineTotal - $paidAmount);

    $status = 'outstanding';
    if ($outstandingAmount <= 0.01) {
        $status = 'paid';
        $outstandingAmount = 0.0;
    } elseif ($paidAmount > 0.01) {
        $status = 'partial';
    }

    return [
        'paid_amount' => $paidAmount,
        'outstanding_amount' => $outstandingAmount,
        'payment_status' => $status,
    ];
};

$so = SalesOrder::query()
    ->with([
        'invoices.items',
        'reimbursementItems.vendor',
    ])
    ->where('order_number', $targetSoNumber)
    ->first();

if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$expectedOtherCosts = collect(is_array($so->other_costs) ? $so->other_costs : [])
    ->mapWithKeys(function (array $item, int $index) use ($normalizePaymentFields): array {
        $quantity = is_numeric($item['quantity'] ?? null) && (float) $item['quantity'] > 0
            ? (float) $item['quantity']
            : 1.0;
        $rate = (float) ($item['amount'] ?? 0);
        $lineTotal = $quantity * $rate;
        $paidAmount = 0.0;
        $paymentStatus = $lineTotal > 0 ? 'outstanding' : 'paid';

        return [
            'other_cost_' . $index => [
                'description' => 'Other Cost - ' . ($item['description'] ?? 'Additional Cost'),
                'quantity' => $quantity,
                'unit' => is_string($item['unit'] ?? null) && trim((string) $item['unit']) !== ''
                    ? trim((string) $item['unit'])
                    : 'pcs',
                'rate' => $rate,
                'amount' => $lineTotal,
                'vendor_id' => is_numeric($item['vendor_id'] ?? null) ? (int) $item['vendor_id'] : null,
                'payment' => $normalizePaymentFields($lineTotal, $paidAmount),
                'include_in_customer_invoice' => false,
                'is_hidden_from_customer' => true,
            ],
        ];
    });

$reimbursementMap = $so->reimbursementItems->keyBy('id');

$plans = [];

foreach ($so->invoices as $invoice) {
    if ($invoice->invoice_type === 'reimbursement') {
        continue;
    }

    $invoice->loadMissing('items');

    $duplicateReimbursementDeleteIds = [];
    $duplicateGroups = [];
    $reimbursementKeeperUpdates = [];

    $reimbursementItems = $invoice->items
        ->filter(fn (InvoiceItem $item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
        ->values();

    foreach ($reimbursementItems->groupBy(fn (InvoiceItem $item) => $normalizeReimbursementKey($item->item_ref, $item->id)) as $sourceKey => $group) {
        /** @var Collection<int, InvoiceItem> $group */
        $sortedGroup = $group->values();
        $keeper = $selectCanonicalReimbursementItem($sortedGroup);
        $duplicates = $sortedGroup->reject(fn (InvoiceItem $item) => $item->id === $keeper->id)->values();

        $reimbursementId = null;
        if (preg_match('/reimbursement_(\d+)/', (string) $sourceKey, $matches)) {
            $reimbursementId = (int) $matches[1];
        }

        $reimbursement = $reimbursementId ? $reimbursementMap->get($reimbursementId) : null;
        if ($reimbursement) {
            $quantity = is_numeric($reimbursement->quantity) && (float) $reimbursement->quantity > 0
                ? (float) $reimbursement->quantity
                : 1.0;
            $lineTotal = $reimbursement->getLineTotal();
            $payment = $normalizePaymentFields($lineTotal, (float) ($reimbursement->customer_paid_amount ?? 0));

            $reimbursementKeeperUpdates[] = [
                'id' => $keeper->id,
                'before' => [
                    'description' => $keeper->description,
                    'quantity' => (float) ($keeper->quantity ?? 0),
                    'unit' => $keeper->unit,
                    'rate' => (float) ($keeper->rate ?? 0),
                    'amount' => (float) ($keeper->amount ?? 0),
                    'paid_amount' => (float) ($keeper->paid_amount ?? 0),
                    'outstanding_amount' => (float) ($keeper->outstanding_amount ?? 0),
                    'payment_status' => (string) ($keeper->payment_status ?? ''),
                ],
                'after' => [
                    'description' => $reimbursement->description,
                    'quantity' => $quantity,
                    'unit' => $reimbursement->unit,
                    'rate' => (float) ($reimbursement->amount ?? 0),
                    'amount' => $lineTotal,
                    'vendor_id' => $reimbursement->vendor_id,
                    'paid_amount' => $payment['paid_amount'],
                    'outstanding_amount' => $payment['outstanding_amount'],
                    'payment_status' => $payment['payment_status'],
                ],
            ];
        }

        if ($duplicates->isNotEmpty()) {
            $duplicateGroups[] = [
                'source_key' => $sourceKey,
                'keeper_id' => $keeper->id,
                'duplicate_ids' => $duplicates->pluck('id')->all(),
            ];
            $duplicateReimbursementDeleteIds = array_merge($duplicateReimbursementDeleteIds, $duplicates->pluck('id')->all());
        }
    }

    $otherCostUpdates = [];
    $staleOtherCostDeleteIds = [];
    $otherCostItems = $invoice->items
        ->filter(function (InvoiceItem $item): bool {
            return strtolower((string) ($item->item_type ?? '')) === 'operational_cost'
                && str_starts_with((string) ($item->item_ref ?? ''), 'other_cost_');
        })
        ->values();

    foreach ($otherCostItems as $item) {
        $expected = $expectedOtherCosts->get((string) $item->item_ref);
        if (!$expected) {
            $staleOtherCostDeleteIds[] = $item->id;
            continue;
        }

        $paidAmount = (float) ($item->paid_amount ?? 0);
        $payment = $normalizePaymentFields((float) $expected['amount'], $paidAmount);
        $otherCostUpdates[] = [
            'id' => $item->id,
            'before' => [
                'description' => $item->description,
                'quantity' => (float) ($item->quantity ?? 0),
                'unit' => $item->unit,
                'rate' => (float) ($item->rate ?? 0),
                'amount' => (float) ($item->amount ?? 0),
                'paid_amount' => (float) ($item->paid_amount ?? 0),
                'outstanding_amount' => (float) ($item->outstanding_amount ?? 0),
                'payment_status' => (string) ($item->payment_status ?? ''),
            ],
            'after' => [
                'description' => $expected['description'],
                'quantity' => $expected['quantity'],
                'unit' => $expected['unit'],
                'rate' => $expected['rate'],
                'amount' => $expected['amount'],
                'vendor_id' => $expected['vendor_id'],
                'paid_amount' => $payment['paid_amount'],
                'outstanding_amount' => $payment['outstanding_amount'],
                'payment_status' => $payment['payment_status'],
                'include_in_customer_invoice' => $expected['include_in_customer_invoice'],
                'is_hidden_from_customer' => $expected['is_hidden_from_customer'],
            ],
        ];
    }

    $plans[] = [
        'invoice_id' => $invoice->id,
        'invoice_number' => $invoice->invoice_number,
        'duplicate_groups' => $duplicateGroups,
        'delete_duplicate_reimbursement_ids' => array_values(array_unique($duplicateReimbursementDeleteIds)),
        'delete_stale_other_cost_ids' => array_values(array_unique($staleOtherCostDeleteIds)),
        'reimbursement_keeper_updates' => $reimbursementKeeperUpdates,
        'other_cost_updates' => $otherCostUpdates,
    ];
}

echo "=== REPAIR SO EWILOG2602044014 AR DETAIL ITEMS ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo 'SO: ' . $so->order_number . "\n\n";

foreach ($plans as $plan) {
    echo sprintf(
        "Invoice %s (#%d)\n",
        (string) $plan['invoice_number'],
        (int) $plan['invoice_id']
    );

    echo '  Duplicate reimbursement groups: ' . count($plan['duplicate_groups']) . "\n";
    foreach ($plan['duplicate_groups'] as $group) {
        echo sprintf(
            "    %s | keeper=%d | delete=%s\n",
            (string) $group['source_key'],
            (int) $group['keeper_id'],
            empty($group['duplicate_ids']) ? '-' : implode(', ', $group['duplicate_ids'])
        );
    }

    echo '  Reimbursement keeper updates: ' . count($plan['reimbursement_keeper_updates']) . "\n";
    foreach ($plan['reimbursement_keeper_updates'] as $update) {
        echo sprintf(
            "    item #%d | amount %s -> %s | paid %s -> %s | outstanding %s -> %s\n",
            (int) $update['id'],
            $formatAmount((float) $update['before']['amount']),
            $formatAmount((float) $update['after']['amount']),
            $formatAmount((float) $update['before']['paid_amount']),
            $formatAmount((float) $update['after']['paid_amount']),
            $formatAmount((float) $update['before']['outstanding_amount']),
            $formatAmount((float) $update['after']['outstanding_amount'])
        );
    }

    echo '  Other cost updates: ' . count($plan['other_cost_updates']) . "\n";
    foreach ($plan['other_cost_updates'] as $update) {
        echo sprintf(
            "    item #%d | amount %s -> %s | paid %s -> %s | outstanding %s -> %s\n",
            (int) $update['id'],
            $formatAmount((float) $update['before']['amount']),
            $formatAmount((float) $update['after']['amount']),
            $formatAmount((float) $update['before']['paid_amount']),
            $formatAmount((float) $update['after']['paid_amount']),
            $formatAmount((float) $update['before']['outstanding_amount']),
            $formatAmount((float) $update['after']['outstanding_amount'])
        );
    }

    echo '  Stale other cost deletes: ' . (empty($plan['delete_stale_other_cost_ids']) ? '-' : implode(', ', $plan['delete_stale_other_cost_ids'])) . "\n\n";
}

if ($dryRun) {
    echo "Mode DRY-RUN: tidak ada perubahan yang disimpan.\n";
    exit(0);
}

DB::transaction(function () use ($plans): void {
    foreach ($plans as $plan) {
        foreach ($plan['reimbursement_keeper_updates'] as $update) {
            InvoiceItem::query()
                ->whereKey($update['id'])
                ->update($update['after']);
        }

        foreach ($plan['other_cost_updates'] as $update) {
            InvoiceItem::query()
                ->whereKey($update['id'])
                ->update($update['after']);
        }

        if (!empty($plan['delete_duplicate_reimbursement_ids'])) {
            InvoiceItem::query()
                ->whereIn('id', $plan['delete_duplicate_reimbursement_ids'])
                ->delete();
        }

        if (!empty($plan['delete_stale_other_cost_ids'])) {
            InvoiceItem::query()
                ->whereIn('id', $plan['delete_stale_other_cost_ids'])
                ->delete();
        }
    }
});

foreach ($so->fresh(['invoices.items'])->invoices as $invoice) {
    if ($invoice->invoice_type === 'reimbursement') {
        continue;
    }

    $invoice->calculateTotals();
    AccountReceivable::syncFromInvoice($invoice->fresh());
}

echo "DONE - cleanup AR detail source selesai.\n";
