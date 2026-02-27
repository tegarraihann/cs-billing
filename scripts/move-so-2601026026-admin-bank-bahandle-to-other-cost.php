<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
use App\Models\ReimbursementItem;
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
 *   php scripts/move-so-2601026026-admin-bank-bahandle-to-other-cost.php           # dry-run
 *   php scripts/move-so-2601026026-admin-bank-bahandle-to-other-cost.php --apply   # eksekusi pindah ke other cost
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true) || getenv('MOVE_TO_OTHER_COST_APPLY') === '1';

$targetSoSuffix = '2601026026';
$targetVendorName = 'BEBAN JASA';
$targetDescription = 'ADMIN BANK BAHANDLE';
$targetAmount = 1250.00;
$targetCategory = 'BEBAN JASA';
$dryRun = !$apply;

$so = SalesOrder::query()
    ->where('order_number', 'like', '%' . $targetSoSuffix)
    ->first();

if (!$so) {
    throw new RuntimeException("SO dengan suffix {$targetSoSuffix} tidak ditemukan.");
}

$targetPayables = AccountPayable::query()
    ->where('sales_order_id', $so->id)
    ->whereRaw('LOWER(vendor_name) = ?', [strtolower($targetVendorName)])
    ->pluck('id');

if ($targetPayables->isEmpty()) {
    throw new RuntimeException("AP vendor {$targetVendorName} pada SO {$so->order_number} tidak ditemukan.");
}

$component = AccountPayableComponent::query()
    ->whereIn('account_payable_id', $targetPayables)
    ->where('component_type', 'reimbursement')
    ->whereRaw('LOWER(description) = ?', [strtolower($targetDescription)])
    ->whereRaw('ROUND(amount, 2) = ?', [round($targetAmount, 2)])
    ->first();

if (!$component) {
    throw new RuntimeException('Komponen reimbursement target tidak ditemukan.');
}

$related = is_array($component->related_items) ? $component->related_items : [];
$reimbursementItemId = $related['reimbursement_item_id'] ?? null;

if (!$reimbursementItemId) {
    throw new RuntimeException('Komponen target tidak memiliki reimbursement_item_id.');
}

$reimbursementItem = ReimbursementItem::query()->find($reimbursementItemId);
if (!$reimbursementItem) {
    throw new RuntimeException("Reimbursement item ID {$reimbursementItemId} tidak ditemukan.");
}

$otherCosts = is_array($so->other_costs) ? $so->other_costs : [];
$existingOtherCostIndex = null;

foreach ($otherCosts as $index => $entry) {
    if (!is_array($entry)) {
        continue;
    }

    $desc = strtolower(trim((string) ($entry['description'] ?? '')));
    $amount = round((float) ($entry['amount'] ?? 0), 2);
    $category = strtolower(trim((string) ($entry['category'] ?? '')));

    if (
        $desc === strtolower($targetDescription) &&
        $amount === round($targetAmount, 2) &&
        $category === strtolower($targetCategory)
    ) {
        $existingOtherCostIndex = $index;
        break;
    }
}

$otherCostIndex = $existingOtherCostIndex;
if ($otherCostIndex === null) {
    $otherCosts[] = [
        'id' => null,
        'description' => $targetDescription,
        'amount' => (string) $targetAmount,
        'category' => $targetCategory,
        'vendor_id' => 'internal',
        'quantity' => 1,
        'unit' => 'SET',
    ];
    $otherCostIndex = count($otherCosts) - 1;
}

$lookupRef = 'other_cost_' . md5(json_encode([
    'description' => $targetDescription,
    'amount' => $targetAmount,
    'vendor_id' => null,
    'vendor_name' => $targetCategory,
    'category' => $targetCategory,
]));

$before = [
    'so' => $so->order_number,
    'component' => [
        'id' => $component->id,
        'account_payable_id' => $component->account_payable_id,
        'component_type' => $component->component_type,
        'description' => $component->description,
        'amount' => (float) $component->amount,
        'paid_amount' => (float) $component->paid_amount,
        'outstanding_amount' => (float) $component->outstanding_amount,
        'related_items' => $component->related_items,
    ],
    'reimbursement_item' => [
        'id' => $reimbursementItem->id,
        'status' => $reimbursementItem->status,
        'description' => $reimbursementItem->description,
        'amount' => (float) $reimbursementItem->amount,
        'quantity' => (float) $reimbursementItem->quantity,
        'invoice_id' => $reimbursementItem->invoice_id,
        'paid_at' => $reimbursementItem->paid_at,
        'receipt_info' => $reimbursementItem->receipt_info,
    ],
    'other_cost_index' => $otherCostIndex,
    'other_cost_entry' => $otherCosts[$otherCostIndex] ?? null,
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($before);
    echo "\n";
    exit(0);
}

DB::transaction(function () use (
    $so,
    $otherCosts,
    $component,
    $reimbursementItem,
    $otherCostIndex,
    $targetCategory,
    $lookupRef
): void {
    $so->other_costs = $otherCosts;
    $so->save();

    $component->component_type = 'operational_cost';
    $component->related_items = [
        'source' => 'other_costs',
        'other_cost_index' => $otherCostIndex,
        'category' => $targetCategory,
        'lookup_ref' => $lookupRef,
    ];
    $component->save();

    $receiptInfo = is_array($reimbursementItem->receipt_info) ? $reimbursementItem->receipt_info : [];
    $receiptInfo['source'] = 'account_payable_component';
    $receiptInfo['component_id'] = $component->id;
    $receiptInfo['moved_to'] = 'other_cost';
    $receiptInfo['moved_at'] = now()->toDateTimeString();

    $reimbursementItem->status = 'paid';
    $reimbursementItem->paid_at = $reimbursementItem->paid_at ?: now();
    $reimbursementItem->receipt_info = $receiptInfo;
    $reimbursementItem->save();

    app(InvoiceCostSyncService::class)->syncFromAccountPayableComponent($component);
});

$afterComponent = AccountPayableComponent::query()->find($component->id);
$afterReimbursement = ReimbursementItem::query()->find($reimbursementItem->id);
$afterSo = SalesOrder::query()->find($so->id);

echo "DONE - ITEM BERHASIL DIPINDAHKAN KE OTHER COST\n";
var_export([
    'so' => $afterSo?->order_number,
    'component' => [
        'id' => $afterComponent?->id,
        'component_type' => $afterComponent?->component_type,
        'description' => $afterComponent?->description,
        'amount' => (float) ($afterComponent?->amount ?? 0),
        'related_items' => $afterComponent?->related_items,
    ],
    'reimbursement_item' => [
        'id' => $afterReimbursement?->id,
        'status' => $afterReimbursement?->status,
        'paid_at' => $afterReimbursement?->paid_at,
        'receipt_info' => $afterReimbursement?->receipt_info,
    ],
]);
echo "\n";
