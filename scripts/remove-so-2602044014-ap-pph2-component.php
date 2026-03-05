<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
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
 *   php scripts/remove-so-2602044014-ap-pph2-component.php          # dry-run
 *   php scripts/remove-so-2602044014-ap-pph2-component.php --apply  # eksekusi
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2602044014';
$targetDescription = 'PPH 2%';
$targetAmount = 39000.00;
$targetCategory = 'BEBAN JASA';

$normalize = static fn (?string $value): string => strtolower(trim((string) $value));
$targetDescriptionNorm = $normalize($targetDescription);
$targetCategoryNorm = $normalize($targetCategory);
$targetAmountRounded = round($targetAmount, 2);

$so = SalesOrder::query()->where('order_number', $targetSoNumber)->first();
if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$targetComponents = AccountPayableComponent::query()
    ->whereHas('accountPayable', static function ($query) use ($so): void {
        $query->where('sales_order_id', $so->id);
    })
    ->whereRaw('LOWER(description) = ?', [$targetDescriptionNorm])
    ->whereRaw('ROUND(amount, 2) = ?', [$targetAmountRounded])
    ->orderBy('id')
    ->get();

if ($targetComponents->count() !== 1) {
    throw new RuntimeException(
        'Komponen target harus tepat 1, ditemukan: ' . $targetComponents->count()
    );
}

/** @var AccountPayableComponent $component */
$component = $targetComponents->first();
/** @var AccountPayable|null $payable */
$payable = AccountPayable::query()->find($component->account_payable_id);

if (!$payable) {
    throw new RuntimeException('Account payable parent tidak ditemukan.');
}

if ((float) $component->paid_amount > 0.0 || $component->status === 'paid') {
    throw new RuntimeException('Komponen target sudah terbayar. Script ini hanya aman untuk komponen unpaid.');
}

$otherCosts = is_array($so->other_costs) ? $so->other_costs : [];
$otherCostCountBefore = count($otherCosts);

$related = is_array($component->related_items) ? $component->related_items : [];
$otherCostIndex = null;
$otherCostEntry = null;

$candidateIndex = $related['other_cost_index'] ?? null;
if (is_numeric($candidateIndex)) {
    $candidateIndex = (int) $candidateIndex;
    if (array_key_exists($candidateIndex, $otherCosts) && is_array($otherCosts[$candidateIndex])) {
        $entry = $otherCosts[$candidateIndex];
        $descMatch = $normalize($entry['description'] ?? null) === $targetDescriptionNorm;
        $amountMatch = round((float) ($entry['amount'] ?? 0), 2) === $targetAmountRounded;
        $categoryMatch = $normalize($entry['category'] ?? null) === $targetCategoryNorm;

        if ($descMatch && $amountMatch && $categoryMatch) {
            $otherCostIndex = $candidateIndex;
            $otherCostEntry = $entry;
        }
    }
}

if ($otherCostIndex === null) {
    foreach ($otherCosts as $index => $entry) {
        if (!is_array($entry)) {
            continue;
        }

        $descMatch = $normalize($entry['description'] ?? null) === $targetDescriptionNorm;
        $amountMatch = round((float) ($entry['amount'] ?? 0), 2) === $targetAmountRounded;
        $categoryMatch = $normalize($entry['category'] ?? null) === $targetCategoryNorm;

        if ($descMatch && $amountMatch && $categoryMatch) {
            $otherCostIndex = $index;
            $otherCostEntry = $entry;
            break;
        }
    }
}

if ($otherCostIndex === null) {
    throw new RuntimeException(
        'Entry other_costs target tidak ditemukan. Penghapusan dibatalkan untuk mencegah komponen muncul kembali.'
    );
}

$invoiceItemRef = 'ap_component_' . $component->id;
$linkedInvoiceItems = InvoiceItem::query()
    ->where('item_ref', $invoiceItemRef)
    ->get(['id', 'invoice_id', 'item_type', 'description', 'amount', 'item_ref']);

$before = [
    'so' => [
        'id' => $so->id,
        'order_number' => $so->order_number,
    ],
    'payable_before' => [
        'id' => $payable->id,
        'vendor_name' => $payable->vendor_name,
        'amount' => (float) $payable->amount,
        'paid_amount' => (float) $payable->paid_amount,
        'outstanding_amount' => (float) $payable->outstanding_amount,
        'status' => $payable->status,
    ],
    'target_component' => [
        'id' => $component->id,
        'account_payable_id' => $component->account_payable_id,
        'component_type' => $component->component_type,
        'description' => $component->description,
        'amount' => (float) $component->amount,
        'paid_amount' => (float) $component->paid_amount,
        'outstanding_amount' => (float) $component->outstanding_amount,
        'status' => $component->status,
        'related_items' => $component->related_items,
    ],
    'other_cost_before' => [
        'index' => $otherCostIndex,
        'entry' => $otherCostEntry,
        'count' => $otherCostCountBefore,
    ],
    'linked_invoice_items_before' => $linkedInvoiceItems->toArray(),
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($before);
    echo PHP_EOL;
    exit(0);
}

DB::transaction(static function () use (
    $so,
    $otherCosts,
    $otherCostIndex,
    $payable
): void {
    unset($otherCosts[$otherCostIndex]);
    $so->other_costs = array_values($otherCosts);
    $so->save();

    $payable->refresh();
    $payable->syncComponents();
    $payable->recalculateTotals(true);
});

$soAfter = SalesOrder::query()->find($so->id);
$payableAfter = AccountPayable::query()->find($payable->id);
$componentAfter = AccountPayableComponent::query()->find($component->id);
$otherCostsAfter = is_array($soAfter?->other_costs) ? $soAfter->other_costs : [];

$soInvoices = Invoice::query()
    ->where('sales_order_id', $so->id)
    ->get(['id', 'invoice_number', 'invoice_type']);

$syncService = app(InvoiceCostSyncService::class);
foreach ($soInvoices as $invoice) {
    $syncService->syncInvoiceWithAccountPayables($invoice);
}

$linkedInvoiceItemsAfter = InvoiceItem::query()
    ->where('item_ref', $invoiceItemRef)
    ->get(['id', 'invoice_id', 'item_type', 'description', 'amount', 'item_ref']);

echo "DONE - KOMPONEN AP PPH 2% BERHASIL DIBERSIHKAN\n";
var_export([
    'so' => $soAfter?->order_number,
    'payable_after' => [
        'id' => $payableAfter?->id,
        'amount' => (float) ($payableAfter?->amount ?? 0),
        'paid_amount' => (float) ($payableAfter?->paid_amount ?? 0),
        'outstanding_amount' => (float) ($payableAfter?->outstanding_amount ?? 0),
        'status' => $payableAfter?->status,
    ],
    'deleted_component_id' => $component->id,
    'component_exists_after' => (bool) $componentAfter,
    'other_cost_count_after' => count($otherCostsAfter),
    'linked_invoice_items_after' => $linkedInvoiceItemsAfter->toArray(),
]);
echo PHP_EOL;
