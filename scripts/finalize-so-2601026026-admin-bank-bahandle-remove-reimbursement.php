<?php

declare(strict_types=1);

use App\Models\AccountPayableComponent;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\ReimbursementItem;
use App\Models\SalesOrder;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/finalize-so-2601026026-admin-bank-bahandle-remove-reimbursement.php          # dry-run
 *   php scripts/finalize-so-2601026026-admin-bank-bahandle-remove-reimbursement.php --apply  # eksekusi
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2601026026';
$targetDescription = 'ADMIN BANK BAHANDLE';
$targetAmount = 1250.00;
$targetCategory = 'BEBAN JASA';

$normalize = static function (?string $value): string {
    return strtolower(trim((string) $value));
};

$so = SalesOrder::query()->where('order_number', $targetSoNumber)->first();
if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$otherCosts = is_array($so->other_costs) ? $so->other_costs : [];
$matchedOtherCostIndex = null;

foreach ($otherCosts as $index => $entry) {
    if (!is_array($entry)) {
        continue;
    }

    $desc = $normalize($entry['description'] ?? null);
    $amount = round((float) ($entry['amount'] ?? 0), 2);
    $category = $normalize($entry['category'] ?? null);

    if (
        $desc === $normalize($targetDescription) &&
        $amount === round($targetAmount, 2) &&
        $category === $normalize($targetCategory)
    ) {
        $matchedOtherCostIndex = $index;
        break;
    }
}

if ($matchedOtherCostIndex === null) {
    $otherCosts[] = [
        'id' => null,
        'description' => $targetDescription,
        'amount' => (string) $targetAmount,
        'category' => $targetCategory,
        'vendor_id' => 'internal',
        'quantity' => 1,
        'unit' => 'SET',
    ];
    $matchedOtherCostIndex = count($otherCosts) - 1;
}

$targetReimbursementItems = ReimbursementItem::query()
    ->where('sales_order_id', $so->id)
    ->whereRaw('LOWER(description) = ?', [$normalize($targetDescription)])
    ->whereRaw('ROUND(amount, 2) = ?', [round($targetAmount, 2)])
    ->orderBy('id')
    ->get();

if ($targetReimbursementItems->count() !== 1) {
    throw new RuntimeException(
        'Reimbursement target harus tepat 1, ditemukan: ' . $targetReimbursementItems->count()
    );
}

$reimbursement = $targetReimbursementItems->first();

$invoiceItemRefs = InvoiceItem::query()
    ->where('item_ref', 'reimbursement_' . $reimbursement->id)
    ->get(['id', 'invoice_id', 'item_type', 'amount', 'item_ref']);

$payableComponentRefs = AccountPayableComponent::query()
    ->where('component_type', 'reimbursement')
    ->where('related_items', 'like', '%"reimbursement_item_id":' . $reimbursement->id . '%')
    ->get(['id', 'account_payable_id', 'component_type', 'description', 'amount', 'related_items']);

$invoices = Invoice::query()
    ->where('sales_order_id', $so->id)
    ->get(['id', 'invoice_number', 'invoice_type', 'is_additional', 'status']);

$before = [
    'so' => [
        'id' => $so->id,
        'order_number' => $so->order_number,
    ],
    'target_reimbursement' => [
        'id' => $reimbursement->id,
        'description' => $reimbursement->description,
        'amount' => (float) $reimbursement->amount,
        'quantity' => (float) ($reimbursement->quantity ?? 1),
        'status' => $reimbursement->status,
        'customer_payment_status' => $reimbursement->customer_payment_status,
        'invoice_id' => $reimbursement->invoice_id,
        'receipt_info' => $reimbursement->receipt_info,
    ],
    'other_cost_index' => $matchedOtherCostIndex,
    'other_cost_entry' => $otherCosts[$matchedOtherCostIndex] ?? null,
    'invoice_item_refs' => $invoiceItemRefs->toArray(),
    'payable_component_refs' => $payableComponentRefs->toArray(),
    'invoice_count' => $invoices->count(),
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export($before);
    echo PHP_EOL;
    exit(0);
}

if ($invoiceItemRefs->isNotEmpty()) {
    throw new RuntimeException(
        'Tidak bisa hapus reimbursement: masih direferensikan invoice_items (reimbursement_' . $reimbursement->id . ').'
    );
}

if ($payableComponentRefs->isNotEmpty()) {
    throw new RuntimeException(
        'Tidak bisa hapus reimbursement: masih ada AP component reimbursement yang mengacu ke item ini.'
    );
}

DB::transaction(function () use ($so, $otherCosts, $reimbursement): void {
    $so->other_costs = $otherCosts;
    $so->save();

    $reimbursement->delete();
});

$afterReimbursement = ReimbursementItem::query()->find($reimbursement->id);
$afterSo = SalesOrder::query()->find($so->id);
$afterOtherCosts = is_array($afterSo?->other_costs) ? $afterSo->other_costs : [];

echo "DONE - REIMBURSEMENT DIHAPUS, OTHER COST DIPERTAHANKAN\n";
var_export([
    'so' => $afterSo?->order_number,
    'deleted_reimbursement_id' => $reimbursement->id,
    'reimbursement_exists_after' => (bool) $afterReimbursement,
    'other_cost_count_after' => count($afterOtherCosts),
    'other_cost_entry_after' => $afterOtherCosts[$matchedOtherCostIndex] ?? null,
]);
echo PHP_EOL;
