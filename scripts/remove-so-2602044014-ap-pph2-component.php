<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
use App\Models\AccountReceivable;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\SalesOrder;
use App\Services\InvoiceCostSyncService;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/remove-so-2602044014-ap-pph2-component.php                                        # dry-run (default target)
 *   php scripts/remove-so-2602044014-ap-pph2-component.php --apply                                # apply delete + cleanup UI
 *   php scripts/remove-so-2602044014-ap-pph2-component.php --so=2602-044014 --apply
 *   php scripts/remove-so-2602044014-ap-pph2-component.php --so=EWILOG2602044014 --component-id=2939 --apply
 *   php scripts/remove-so-2602044014-ap-pph2-component.php --so=2602-044014 --ui-only --apply    # hanya cleanup invoice/AR UI
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;
$uiOnly = in_array('--ui-only', $argvValues, true);
$allowPaid = in_array('--allow-paid', $argvValues, true);

$targetSoInput = 'EWILOG2602044014';
$targetDescription = 'PPH 2%';
$targetAmount = 39000.00;
$targetComponentId = null;
$targetOtherCostIndex = null;

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--so=')) {
        $targetSoInput = (string) substr($arg, strlen('--so='));
        continue;
    }

    if (str_starts_with($arg, '--desc=')) {
        $targetDescription = (string) substr($arg, strlen('--desc='));
        continue;
    }

    if (str_starts_with($arg, '--amount=')) {
        $rawAmount = (string) substr($arg, strlen('--amount='));
        $targetAmount = (float) str_replace([',', ' '], '', $rawAmount);
        continue;
    }

    if (str_starts_with($arg, '--component-id=')) {
        $raw = (string) substr($arg, strlen('--component-id='));
        $targetComponentId = ctype_digit($raw) ? (int) $raw : null;
        continue;
    }

    if (str_starts_with($arg, '--other-cost-index=')) {
        $raw = (string) substr($arg, strlen('--other-cost-index='));
        $targetOtherCostIndex = ctype_digit($raw) ? (int) $raw : null;
    }
}

$normalize = static fn (?string $value): string => strtolower(trim((string) $value));
$normalizeToken = static function (?string $value): string {
    $lower = strtolower(trim((string) $value));
    return preg_replace('/[^a-z0-9]/', '', $lower) ?? '';
};

$buildSoCandidates = static function (string $value): array {
    $value = strtoupper(trim($value));
    $compact = preg_replace('/[^A-Z0-9]/', '', $value) ?: $value;
    $numeric = preg_replace('/[^0-9]/', '', $compact) ?: '';

    $candidates = [$value, $compact];

    if ($numeric !== '') {
        $candidates[] = $numeric;
        $candidates[] = 'EWILOG' . $numeric;
        $candidates[] = 'EWL' . $numeric;
        if (strlen($numeric) > 4) {
            $candidates[] = 'EWILOG' . substr($numeric, 0, 4) . '-' . substr($numeric, 4);
            $candidates[] = 'EWL' . substr($numeric, 0, 4) . '-' . substr($numeric, 4);
        }
    }

    return array_values(array_unique(array_filter($candidates)));
};

$targetDescriptionNorm = $normalize($targetDescription);
$targetDescriptionToken = $normalizeToken($targetDescription);
$targetAmountRounded = round($targetAmount, 2);

$soCandidates = $buildSoCandidates($targetSoInput);
$soQuery = SalesOrder::query()->whereIn('order_number', $soCandidates);
if (ctype_digit((string) $targetSoInput)) {
    $soQuery->orWhere('id', (int) $targetSoInput);
}
$so = $soQuery->first();

if (!$so) {
    throw new RuntimeException(
        "SO tidak ditemukan untuk input `{$targetSoInput}`. Candidates: " . implode(', ', $soCandidates)
    );
}

$buildUiPlan = static function (SalesOrder $salesOrder): array {
    $otherCosts = is_array($salesOrder->other_costs) ? $salesOrder->other_costs : [];
    $invoices = Invoice::query()
        ->where('sales_order_id', $salesOrder->id)
        ->where('invoice_type', '!=', 'reimbursement')
        ->orderBy('id')
        ->get();

    $plans = [];

    foreach ($invoices as $invoice) {
        $expectedRefs = [];
        $upserts = [];

        foreach ($otherCosts as $index => $otherCost) {
            $rate = (float) ($otherCost['amount'] ?? 0);
            if ($rate <= 0) {
                continue;
            }

            $quantity = is_numeric($otherCost['quantity'] ?? null) && (float) $otherCost['quantity'] > 0
                ? (float) $otherCost['quantity']
                : 1.0;
            $unit = is_string($otherCost['unit'] ?? null) && trim((string) $otherCost['unit']) !== ''
                ? trim((string) $otherCost['unit'])
                : 'pcs';
            $amount = $rate * $quantity;
            $itemRef = 'other_cost_' . $index;
            $vendorId = is_numeric($otherCost['vendor_id'] ?? null) ? (int) $otherCost['vendor_id'] : null;

            $expectedRefs[] = $itemRef;

            $payload = [
                'invoice_id' => $invoice->id,
                'description' => 'Other Cost - ' . ($otherCost['description'] ?? 'Additional Cost'),
                'quantity' => $quantity,
                'unit' => $unit,
                'rate' => $rate,
                'currency' => 'IDR',
                'amount' => $amount,
                'item_ref' => $itemRef,
                'item_type' => 'operational_cost',
                'include_in_customer_invoice' => false,
                'is_hidden_from_customer' => true,
            ];

            if ($vendorId) {
                $payload['vendor_id'] = $vendorId;
            }

            $upserts[] = $payload;
        }

        $staleQuery = InvoiceItem::query()
            ->where('invoice_id', $invoice->id)
            ->where('item_type', 'operational_cost')
            ->where('item_ref', 'like', 'other_cost_%');

        if (!empty($expectedRefs)) {
            $staleQuery->whereNotIn('item_ref', $expectedRefs);
        }

        $staleItems = $staleQuery->get(['id', 'description', 'amount', 'item_ref'])->toArray();

        $plans[] = [
            'invoice_id' => $invoice->id,
            'invoice_number' => $invoice->invoice_number,
            'invoice_type' => $invoice->invoice_type,
            'expected_refs' => $expectedRefs,
            'upserts' => $upserts,
            'stale_items' => $staleItems,
        ];
    }

    return $plans;
};

$applyUiPlan = static function (array $uiPlan): void {
    foreach ($uiPlan as $plan) {
        foreach ($plan['upserts'] as $payload) {
            InvoiceItem::updateOrCreate(
                [
                    'invoice_id' => $plan['invoice_id'],
                    'item_ref' => $payload['item_ref'],
                    'item_type' => 'operational_cost',
                ],
                $payload
            );
        }

        $deleteQuery = InvoiceItem::query()
            ->where('invoice_id', $plan['invoice_id'])
            ->where('item_type', 'operational_cost')
            ->where('item_ref', 'like', 'other_cost_%');

        if (!empty($plan['expected_refs'])) {
            $deleteQuery->whereNotIn('item_ref', $plan['expected_refs']);
        }

        $deleteQuery->delete();
    }
};

$uiPlanBefore = $buildUiPlan($so);

$before = [
    'so' => [
        'id' => $so->id,
        'order_number' => $so->order_number,
    ],
    'mode' => [
        'ui_only' => $uiOnly,
        'apply' => $apply,
    ],
    'ui_cleanup_plan' => $uiPlanBefore,
];

$component = null;
$payable = null;
$otherCostIndex = null;
$otherCostEntry = null;
$linkedInvoiceItems = collect();
$otherCosts = is_array($so->other_costs) ? $so->other_costs : [];

if (!$uiOnly) {
    $componentsInSo = AccountPayableComponent::query()
        ->with('accountPayable')
        ->whereHas('accountPayable', static function ($query) use ($so): void {
            $query->where('sales_order_id', $so->id);
        })
        ->orderBy('id')
        ->get();

    $targetComponents = $componentsInSo->filter(function (AccountPayableComponent $candidate) use (
        $targetComponentId,
        $targetAmountRounded,
        $targetDescriptionNorm,
        $targetDescriptionToken,
        $normalize,
        $normalizeToken
    ): bool {
        if ($targetComponentId !== null) {
            return (int) $candidate->id === $targetComponentId;
        }

        if (round((float) $candidate->amount, 2) !== $targetAmountRounded) {
            return false;
        }

        $desc = $normalize((string) $candidate->description);
        $token = $normalizeToken((string) $candidate->description);
        if ($targetDescriptionNorm === '') {
            return true;
        }

        return $desc === $targetDescriptionNorm
            || ($targetDescriptionToken !== '' && str_contains($token, $targetDescriptionToken))
            || str_contains($desc, $targetDescriptionNorm);
    })->values();

    if ($targetComponents->isEmpty()) {
        throw new RuntimeException(
            'Komponen target tidak ditemukan. Komponen di SO ini: ' . json_encode(
                $componentsInSo->map(static fn ($c) => [
                    'id' => $c->id,
                    'account_payable_id' => $c->account_payable_id,
                    'description' => $c->description,
                    'amount' => (float) $c->amount,
                    'status' => $c->status,
                ])->values()->all(),
                JSON_UNESCAPED_UNICODE
            )
        );
    }

    if ($targetComponents->count() > 1 && $targetComponentId === null) {
        throw new RuntimeException(
            'Komponen target lebih dari 1. Jalankan ulang dengan --component-id=. Kandidat: ' . json_encode(
                $targetComponents->map(static fn ($c) => [
                    'id' => $c->id,
                    'account_payable_id' => $c->account_payable_id,
                    'description' => $c->description,
                    'amount' => (float) $c->amount,
                    'status' => $c->status,
                ])->values()->all(),
                JSON_UNESCAPED_UNICODE
            )
        );
    }

    $component = $targetComponents->first();
    $payable = AccountPayable::query()->find($component->account_payable_id);

    if (!$payable) {
        throw new RuntimeException('Account payable parent tidak ditemukan.');
    }

    if (
        !$allowPaid
        && ((float) $component->paid_amount > 0.0 || in_array($component->status, ['paid', 'partial'], true))
    ) {
        throw new RuntimeException('Komponen target sudah terbayar. Gunakan --allow-paid jika memang mau dipaksa.');
    }

    $related = is_array($component->related_items) ? $component->related_items : [];
    $candidateIndex = $targetOtherCostIndex ?? ($related['other_cost_index'] ?? null);

    if (is_numeric($candidateIndex) && array_key_exists((int) $candidateIndex, $otherCosts)) {
        $otherCostIndex = (int) $candidateIndex;
        $otherCostEntry = is_array($otherCosts[$otherCostIndex]) ? $otherCosts[$otherCostIndex] : null;
    }

    if ($otherCostIndex === null) {
        foreach ($otherCosts as $index => $entry) {
            if (!is_array($entry)) {
                continue;
            }

            $desc = $normalize((string) ($entry['description'] ?? ''));
            $token = $normalizeToken((string) ($entry['description'] ?? ''));
            $descMatch = $desc === $targetDescriptionNorm
                || ($targetDescriptionToken !== '' && str_contains($token, $targetDescriptionToken))
                || str_contains($desc, $targetDescriptionNorm);
            $amountMatch = round((float) ($entry['amount'] ?? 0), 2) === $targetAmountRounded;

            if ($descMatch && $amountMatch) {
                $otherCostIndex = $index;
                $otherCostEntry = $entry;
                break;
            }
        }
    }

    if ($otherCostIndex === null) {
        throw new RuntimeException(
            'Entry other_costs target tidak ditemukan. Gunakan --other-cost-index untuk override jika perlu.'
        );
    }

    $invoiceItemRef = 'ap_component_' . $component->id;
    $linkedInvoiceItems = InvoiceItem::query()
        ->where('item_ref', $invoiceItemRef)
        ->get(['id', 'invoice_id', 'item_type', 'description', 'amount', 'item_ref']);

    $before['target_component'] = [
        'id' => $component->id,
        'account_payable_id' => $component->account_payable_id,
        'component_type' => $component->component_type,
        'description' => $component->description,
        'amount' => (float) $component->amount,
        'paid_amount' => (float) $component->paid_amount,
        'outstanding_amount' => (float) $component->outstanding_amount,
        'status' => $component->status,
        'related_items' => $component->related_items,
    ];
    $before['payable_before'] = [
        'id' => $payable->id,
        'vendor_name' => $payable->vendor_name,
        'amount' => (float) $payable->amount,
        'paid_amount' => (float) $payable->paid_amount,
        'outstanding_amount' => (float) $payable->outstanding_amount,
        'status' => $payable->status,
    ];
    $before['other_cost_before'] = [
        'index' => $otherCostIndex,
        'entry' => $otherCostEntry,
        'count' => count($otherCosts),
    ];
    $before['linked_invoice_items_before'] = $linkedInvoiceItems->toArray();
}

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($before);
    echo PHP_EOL;
    exit(0);
}

if (!$uiOnly) {
    DB::transaction(static function () use ($so, $otherCosts, $otherCostIndex, $payable): void {
        unset($otherCosts[$otherCostIndex]);
        $so->other_costs = array_values($otherCosts);
        $so->save();

        $payable->refresh();
        $payable->syncComponents();
        $payable->recalculateTotals(true);
    });
}

$soAfter = SalesOrder::query()->find($so->id);
if (!$soAfter) {
    throw new RuntimeException('SO tidak ditemukan setelah proses update.');
}

$soInvoices = Invoice::query()
    ->where('sales_order_id', $soAfter->id)
    ->get(['id', 'invoice_number', 'invoice_type']);

$syncService = app(InvoiceCostSyncService::class);
foreach ($soInvoices as $invoice) {
    $syncService->syncInvoiceWithAccountPayables($invoice);
}

$uiPlanAfter = $buildUiPlan($soAfter);
$applyUiPlan($uiPlanAfter);

foreach ($soInvoices as $invoice) {
    $freshInvoice = Invoice::query()->find($invoice->id);
    if (!$freshInvoice) {
        continue;
    }
    $freshInvoice->calculateTotals();
    AccountReceivable::syncFromInvoice($freshInvoice->fresh());
}

$componentAfter = $component ? AccountPayableComponent::query()->find($component->id) : null;
$payableAfter = $payable ? AccountPayable::query()->find($payable->id) : null;
$otherCostsAfter = is_array($soAfter->other_costs) ? $soAfter->other_costs : [];

$invoiceOtherCostAfter = [];
foreach ($soInvoices as $invoice) {
    $rows = InvoiceItem::query()
        ->where('invoice_id', $invoice->id)
        ->where('item_type', 'operational_cost')
        ->where('item_ref', 'like', 'other_cost_%')
        ->get(['id', 'description', 'amount', 'item_ref']);

    $invoiceOtherCostAfter[] = [
        'invoice_id' => $invoice->id,
        'invoice_number' => $invoice->invoice_number,
        'invoice_type' => $invoice->invoice_type,
        'other_cost_items_after' => $rows->toArray(),
    ];
}

echo "DONE - CLEANUP DATA + UI BERHASIL\n";
var_export([
    'so' => $soAfter->order_number,
    'mode' => [
        'ui_only' => $uiOnly,
    ],
    'payable_after' => $payableAfter ? [
        'id' => $payableAfter->id,
        'amount' => (float) $payableAfter->amount,
        'paid_amount' => (float) $payableAfter->paid_amount,
        'outstanding_amount' => (float) $payableAfter->outstanding_amount,
        'status' => $payableAfter->status,
    ] : null,
    'deleted_component_id' => $component?->id,
    'component_exists_after' => (bool) $componentAfter,
    'other_cost_count_after' => count($otherCostsAfter),
    'invoice_other_cost_after' => $invoiceOtherCostAfter,
]);
echo PHP_EOL;
