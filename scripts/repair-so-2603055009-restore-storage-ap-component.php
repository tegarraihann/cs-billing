<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
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
 *   php scripts/repair-so-2603055009-restore-storage-ap-component.php
 *   php scripts/repair-so-2603055009-restore-storage-ap-component.php --apply
 */
$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$dryRun = !$apply;

$targetSoNumber = 'EWILOG2603055009';
$storageDesc = 'STORAGE';
$storage2Desc = 'STORAGE 2';
$targetVendorId = 9;

$formatAmount = static fn (float $value): string => number_format($value, 2, '.', ',');

$so = SalesOrder::query()->where('order_number', $targetSoNumber)->first();
if (!$so) {
    throw new RuntimeException("SO {$targetSoNumber} tidak ditemukan.");
}

$storage = ReimbursementItem::query()
    ->where('sales_order_id', $so->id)
    ->where('description', $storageDesc)
    ->where('vendor_id', $targetVendorId)
    ->first();

$storage2 = ReimbursementItem::query()
    ->where('sales_order_id', $so->id)
    ->where('description', $storage2Desc)
    ->where('vendor_id', $targetVendorId)
    ->first();

if (!$storage || !$storage2) {
    throw new RuntimeException('Reimbursement STORAGE / STORAGE 2 tidak lengkap.');
}

$payable = AccountPayable::query()
    ->with('components')
    ->where('sales_order_id', $so->id)
    ->where('vendor_id', $targetVendorId)
    ->first();

if (!$payable) {
    throw new RuntimeException('AP vendor JICT untuk SO target tidak ditemukan.');
}

$storageLookupRef = 'reimbursement_' . $storage->id;
$storage2LookupRef = 'reimbursement_' . $storage2->id;

$existingStorageComponent = $payable->components->first(function (AccountPayableComponent $component) use ($storageLookupRef) {
    return data_get($component->related_items, 'lookup_ref') === $storageLookupRef;
});

$storage2Component = $payable->components->first(function (AccountPayableComponent $component) use ($storage2LookupRef) {
    return data_get($component->related_items, 'lookup_ref') === $storage2LookupRef;
});

if (!$storage2Component) {
    throw new RuntimeException('Komponen STORAGE 2 tidak ditemukan pada AP target.');
}

$before = [
    'so' => [
        'id' => $so->id,
        'order_number' => $so->order_number,
    ],
    'storage' => [
        'id' => $storage->id,
        'description' => $storage->description,
        'amount' => (float) $storage->amount,
        'status' => $storage->status,
        'paid_at' => (string) $storage->paid_at,
        'receipt_info' => $storage->receipt_info,
    ],
    'storage_2' => [
        'id' => $storage2->id,
        'description' => $storage2->description,
        'amount' => (float) $storage2->amount,
        'status' => $storage2->status,
        'paid_at' => (string) $storage2->paid_at,
        'receipt_info' => $storage2->receipt_info,
    ],
    'payable' => [
        'id' => $payable->id,
        'vendor_name' => $payable->vendor_name,
        'amount' => (float) $payable->amount,
        'paid_amount' => (float) $payable->paid_amount,
        'outstanding_amount' => (float) $payable->outstanding_amount,
        'status' => $payable->status,
    ],
    'existing_storage_component' => $existingStorageComponent ? [
        'id' => $existingStorageComponent->id,
        'amount' => (float) $existingStorageComponent->amount,
        'paid_amount' => (float) $existingStorageComponent->paid_amount,
        'outstanding_amount' => (float) $existingStorageComponent->outstanding_amount,
        'status' => $existingStorageComponent->status,
        'related_items' => $existingStorageComponent->related_items,
    ] : null,
    'storage_2_component' => [
        'id' => $storage2Component->id,
        'description' => $storage2Component->description,
        'amount' => (float) $storage2Component->amount,
        'paid_amount' => (float) $storage2Component->paid_amount,
        'outstanding_amount' => (float) $storage2Component->outstanding_amount,
        'status' => $storage2Component->status,
        'related_items' => $storage2Component->related_items,
    ],
];

$plan = [
    'create_or_update_storage_component' => [
        'description' => $storage->description,
        'amount' => (float) $storage->amount,
        'paid_amount' => (float) $storage->amount,
        'outstanding_amount' => 0.0,
        'status' => 'paid',
        'lookup_ref' => $storageLookupRef,
    ],
    'reset_storage_2_component_payment' => [
        'component_id' => $storage2Component->id,
        'description' => $storage2Component->description,
        'new_paid_amount' => 0.0,
        'new_outstanding_amount' => (float) $storage2Component->amount,
        'new_status' => 'unpaid',
    ],
    'relink_storage_receipt_info' => [
        'reimbursement_item_id' => $storage->id,
        'account_payable_id' => $payable->id,
        'new_lookup_ref' => $storageLookupRef,
    ],
];

if ($dryRun) {
    echo "DRY RUN - TIDAK ADA PERUBAHAN\n";
    var_export([
        'before' => $before,
        'plan' => $plan,
    ]);
    echo PHP_EOL;
    exit(0);
}

DB::transaction(function () use (
    $payable,
    $storage,
    $storage2Component,
    $existingStorageComponent,
    $storageLookupRef
): void {
    $lockedPayable = AccountPayable::query()->lockForUpdate()->find($payable->id);
    if (!$lockedPayable) {
        throw new RuntimeException('AP target hilang saat apply.');
    }

    $lockedStorage = ReimbursementItem::query()->lockForUpdate()->find($storage->id);
    if (!$lockedStorage) {
        throw new RuntimeException('Reimbursement STORAGE hilang saat apply.');
    }

    $lockedStorage2Component = AccountPayableComponent::query()->lockForUpdate()->find($storage2Component->id);
    if (!$lockedStorage2Component) {
        throw new RuntimeException('Komponen STORAGE 2 hilang saat apply.');
    }

    $storageComponent = $existingStorageComponent
        ? AccountPayableComponent::query()->lockForUpdate()->find($existingStorageComponent->id)
        : null;

    $storageRelatedItems = [
        'source' => 'reimbursement_items',
        'reimbursement_item_id' => $lockedStorage->id,
        'category' => $lockedStorage->category,
        'quantity' => is_numeric($lockedStorage->quantity) && (float) $lockedStorage->quantity > 0 ? (float) $lockedStorage->quantity : 1,
        'unit' => is_string($lockedStorage->unit) && trim($lockedStorage->unit) !== '' ? trim($lockedStorage->unit) : 'SET',
        'unit_price' => (float) $lockedStorage->amount,
        'lookup_ref' => $storageLookupRef,
    ];

    if (!$storageComponent) {
        $storageComponent = new AccountPayableComponent([
            'account_payable_id' => $lockedPayable->id,
            'component_type' => 'reimbursement',
        ]);
    }

    $storageComponent->description = $lockedStorage->description;
    $storageComponent->amount = (float) $lockedStorage->amount;
    $storageComponent->paid_amount = (float) $lockedStorage->amount;
    $storageComponent->outstanding_amount = 0.0;
    $storageComponent->status = 'paid';
    $storageComponent->due_date = $lockedPayable->payment_due_date;
    $storageComponent->recipient_name = $lockedPayable->vendor_name;
    $storageComponent->vendor_id = $lockedPayable->vendor_id;
    $storageComponent->related_items = $storageRelatedItems;
    $storageComponent->save();

    $lockedStorage2Component->paid_amount = 0.0;
    $lockedStorage2Component->outstanding_amount = (float) $lockedStorage2Component->amount;
    $lockedStorage2Component->status = 'unpaid';
    $lockedStorage2Component->save();

    $receiptInfo = $lockedStorage->receipt_info ?? [];
    if (!is_array($receiptInfo)) {
        $receiptInfo = json_decode((string) $receiptInfo, true) ?: [];
    }

    $receiptInfo['account_payable_id'] = $lockedPayable->id;
    $receiptInfo['account_payable_component_id'] = $storageComponent->id;
    $receiptInfo['component_id'] = $storageComponent->id;
    $receiptInfo['account_payable_vendor'] = $lockedPayable->vendor_name;
    $receiptInfo['account_payable_invoice_number'] = $lockedPayable->vendor_invoice_number;

    $lockedStorage->receipt_info = $receiptInfo;
    $lockedStorage->save();

    $lockedPayable->recalculateTotals();
});

$afterPayable = AccountPayable::query()->with('components')->find($payable->id);
$afterStorage = ReimbursementItem::query()->find($storage->id);

echo "DONE - KOMPONEN STORAGE BERHASIL DIPULIHKAN\n";
var_export([
    'payable_after' => [
        'id' => $afterPayable?->id,
        'amount' => (float) ($afterPayable?->amount ?? 0),
        'paid_amount' => (float) ($afterPayable?->paid_amount ?? 0),
        'outstanding_amount' => (float) ($afterPayable?->outstanding_amount ?? 0),
        'status' => $afterPayable?->status,
        'components' => $afterPayable?->components
            ->sortBy('id')
            ->values()
            ->map(fn ($component) => [
                'id' => $component->id,
                'description' => $component->description,
                'component_type' => $component->component_type,
                'amount' => (float) $component->amount,
                'paid_amount' => (float) $component->paid_amount,
                'outstanding_amount' => (float) $component->outstanding_amount,
                'status' => $component->status,
                'lookup_ref' => data_get($component->related_items, 'lookup_ref'),
            ])
            ->all(),
    ],
    'storage_receipt_info_after' => $afterStorage?->receipt_info,
]);
echo PHP_EOL;
