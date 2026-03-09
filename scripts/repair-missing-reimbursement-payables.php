<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableComponent;
use App\Models\AccountPayableNote;
use App\Models\ReimbursementItem;
use App\Models\SalesOrder;
use App\Models\Vendor;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/repair-missing-reimbursement-payables.php
 *   php scripts/repair-missing-reimbursement-payables.php --so=EWILOG2603049003
 *   php scripts/repair-missing-reimbursement-payables.php --so=EWILOG2603049003 --apply
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

$buildVendorKey = static function (?int $vendorId, ?string $vendorName): string {
    if ($vendorId !== null) {
        return 'id_' . $vendorId;
    }

    $name = trim(strtolower($vendorName ?? ''));
    if ($name === '') {
        $name = 'divisi operational';
    }

    return 'internal_' . $name;
};

$appendUniqueLine = static function (?string $existing, string $line): string {
    $line = trim($line);
    $existing = trim((string) $existing);

    if ($line === '') {
        return $existing;
    }

    if ($existing === '') {
        return $line;
    }

    $lines = preg_split('/\r\n|\r|\n/', $existing) ?: [];
    foreach ($lines as $existingLine) {
        if (trim($existingLine) === $line) {
            return $existing;
        }
    }

    return $existing . PHP_EOL . $line;
};

$extractPaidNote = static function (ReimbursementItem $item): ?string {
    $notes = trim((string) ($item->notes ?? ''));
    if ($notes !== '') {
        return $notes;
    }

    $receiptInfo = $item->receipt_info ?? [];
    if (!is_array($receiptInfo)) {
        $receiptInfo = json_decode((string) $receiptInfo, true) ?: [];
    }

    $history = $receiptInfo['payment_history'] ?? [];
    if (!is_array($history) || empty($history)) {
        return null;
    }

    $latest = end($history);
    $historyNotes = trim((string) ($latest['notes'] ?? ''));

    return $historyNotes !== '' ? $historyNotes : null;
};

$soCandidates = $normalizeSoCandidates($soFilter);

$salesOrder = SalesOrder::query()
    ->with(['reimbursementItems.vendor', 'accountPayables.components'])
    ->where(function ($query) use ($soCandidates, $soFilter) {
        foreach ($soCandidates as $candidate) {
            $query->orWhere('order_number', $candidate);
        }

        $query->orWhere('order_number', 'like', '%' . $soFilter . '%');
    })
    ->first();

echo "=== REPAIR MISSING REIMBURSEMENT PAYABLES ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";

if (!$salesOrder) {
    echo "Sales order tidak ditemukan untuk filter {$soFilter}.\n";
    exit(0);
}

$reimbursements = $salesOrder->reimbursementItems;
if ($reimbursements->isEmpty()) {
    echo "Tidak ada reimbursement item pada SO {$salesOrder->order_number}.\n";
    exit(0);
}

$existingPayables = $salesOrder->accountPayables->keyBy(function (AccountPayable $payable) use ($buildVendorKey) {
    return $buildVendorKey($payable->vendor_id ? (int) $payable->vendor_id : null, $payable->vendor_name);
});

$planned = [];

foreach ($reimbursements as $item) {
    $vendorId = is_numeric($item->vendor_id) ? (int) $item->vendor_id : null;
    $vendorName = $item->vendor?->nama_vendor;
    if (!$vendorName) {
        $receiptInfo = $item->receipt_info ?? [];
        if (!is_array($receiptInfo)) {
            $receiptInfo = json_decode((string) $receiptInfo, true) ?: [];
        }
        $vendorName = $receiptInfo['vendor_name'] ?? null;
    }
    $vendorName = trim((string) $vendorName);
    if ($vendorName === '') {
        $vendorName = 'Divisi Operational';
    }

    $lookupRef = 'reimbursement_' . $item->id;
    $vendorKey = $buildVendorKey($vendorId, $vendorName);
    $payable = $existingPayables->get($vendorKey);

    $componentExists = false;
    if ($payable) {
        $componentExists = $payable->components->contains(function (AccountPayableComponent $component) use ($lookupRef) {
            $relatedItems = is_array($component->related_items) ? $component->related_items : [];
            return ($relatedItems['lookup_ref'] ?? null) === $lookupRef;
        });
    }

    $receiptInfo = $item->receipt_info ?? [];
    if (!is_array($receiptInfo)) {
        $receiptInfo = json_decode((string) $receiptInfo, true) ?: [];
    }

    $referencedPayableExists = !empty($receiptInfo['account_payable_id'])
        ? AccountPayable::query()->whereKey((int) $receiptInfo['account_payable_id'])->exists()
        : false;

    $referencedComponentExists = !empty($receiptInfo['account_payable_component_id'])
        ? AccountPayableComponent::query()->whereKey((int) $receiptInfo['account_payable_component_id'])->exists()
        : false;

    if ($componentExists && ($referencedPayableExists || empty($receiptInfo['account_payable_id'])) && ($referencedComponentExists || empty($receiptInfo['account_payable_component_id']))) {
        continue;
    }

    $planned[] = [
        'reimbursement_id' => $item->id,
        'description' => $item->description,
        'vendor_key' => $vendorKey,
        'vendor_id' => $vendorId,
        'vendor_name' => $vendorName,
        'amount' => $item->getLineTotal(),
        'status' => $item->status,
        'customer_status' => $item->customer_payment_status,
        'existing_payable_id' => $payable?->id,
        'component_exists' => $componentExists,
        'referenced_payable_exists' => $referencedPayableExists,
        'referenced_component_exists' => $referencedComponentExists,
    ];
}

echo "SO: {$salesOrder->order_number}\n";
echo 'Target reimbursement to repair: ' . count($planned) . "\n";

foreach ($planned as $entry) {
    echo sprintf(
        "  - Reimbursement#%d | %s | vendor=%s | amount=%s | vendor_status=%s | current_payable=%s\n",
        $entry['reimbursement_id'],
        $entry['description'],
        $entry['vendor_name'],
        $formatAmount((float) $entry['amount']),
        $entry['status'],
        $entry['existing_payable_id'] ? ('AP#' . $entry['existing_payable_id']) : '-'
    );
}

if (!$apply) {
    echo "Mode DRY-RUN: tidak ada perubahan disimpan.\n";
    exit(0);
}

DB::transaction(function () use ($salesOrder, $planned, $existingPayables, $buildVendorKey, $appendUniqueLine, $extractPaidNote): void {
    foreach ($planned as $entry) {
        /** @var ReimbursementItem $item */
        $item = ReimbursementItem::query()->with('vendor')->findOrFail($entry['reimbursement_id']);
        $vendorId = $entry['vendor_id'];
        $vendorName = $entry['vendor_name'];
        $vendorKey = $buildVendorKey($vendorId, $vendorName);

        /** @var AccountPayable|null $payable */
        $payable = $existingPayables->get($vendorKey);
        $vendor = $vendorId ? Vendor::find($vendorId) : null;

        if (!$payable) {
            $lookup = [
                'sales_order_id' => $salesOrder->id,
                'vendor_id' => $vendorId,
            ];

            if ($vendorId === null) {
                $lookup['vendor_name'] = $vendorName;
            }

            $payable = new AccountPayable($lookup);
            $payable->vendor_name = $vendor?->nama_vendor ?? $vendorName;
            $payable->service_description = $item->description ?: 'Reimbursement';
            $payable->service_remarks = 'Rebuilt from reimbursement item history';
            $payable->amount = 0;
            $payable->paid_amount = 0;
            $payable->outstanding_amount = 0;
            $payable->status = 'unpaid';
            $payable->vendor_bank_account = $vendor?->nomor_rekening;
            $payable->vendor_account_name = $vendor?->nama_rekening;
            $payable->created_by = $item->created_by;
            $payable->save();
            $payable->load('components');

            $existingPayables->put($vendorKey, $payable);
        } else {
            $payable->loadMissing('components');
            if (!$payable->vendor_name) {
                $payable->vendor_name = $vendor?->nama_vendor ?? $vendorName;
            }
            if (!$payable->vendor_bank_account) {
                $payable->vendor_bank_account = $vendor?->nomor_rekening;
            }
            if (!$payable->vendor_account_name) {
                $payable->vendor_account_name = $vendor?->nama_rekening;
            }
            if (!$payable->service_description) {
                $payable->service_description = $item->description ?: 'Reimbursement';
            }
            $payable->save();
        }

        $lookupRef = 'reimbursement_' . $item->id;
        $component = $payable->components->first(function (AccountPayableComponent $existingComponent) use ($lookupRef) {
            $relatedItems = is_array($existingComponent->related_items) ? $existingComponent->related_items : [];
            return ($relatedItems['lookup_ref'] ?? null) === $lookupRef;
        });

        $lineTotal = $item->getLineTotal();
        $isPaid = $item->status === 'paid';
        $paidAmount = $isPaid ? $lineTotal : 0.0;
        $outstandingAmount = $isPaid ? 0.0 : $lineTotal;
        $status = $isPaid ? 'paid' : 'unpaid';

        $relatedItems = [
            'source' => 'reimbursement_items',
            'reimbursement_item_id' => $item->id,
            'lookup_ref' => $lookupRef,
            'quantity' => is_numeric($item->quantity) && (float) $item->quantity > 0 ? (float) $item->quantity : 1,
            'unit' => $item->unit,
            'unit_price' => (float) ($item->amount ?? 0),
            'category' => $item->category,
        ];

        if (!$component) {
            $component = $payable->components()->create([
                'component_type' => 'reimbursement',
                'description' => $item->description ?: 'Reimbursement',
                'amount' => $lineTotal,
                'paid_amount' => $paidAmount,
                'outstanding_amount' => $outstandingAmount,
                'status' => $status,
                'recipient_name' => $vendor?->nama_vendor ?? $vendorName,
                'vendor_id' => $vendorId,
                'related_items' => $relatedItems,
            ]);
        } else {
            $component->description = $item->description ?: $component->description;
            $component->amount = $lineTotal;
            $component->paid_amount = $paidAmount;
            $component->outstanding_amount = $outstandingAmount;
            $component->status = $status;
            $component->recipient_name = $vendor?->nama_vendor ?? $vendorName;
            $component->vendor_id = $vendorId;
            $component->related_items = $relatedItems;
            $component->save();
        }

        if ($isPaid) {
            $paymentNote = $extractPaidNote($item);
            $dateLabel = $item->paid_at ? $item->paid_at->format('d/m/Y') : now()->format('d/m/Y');
            $noteLine = sprintf(
                'Payment to Reimbursement - %s (Rp %s) - %s',
                $component->description,
                number_format($lineTotal, 2, '.', ','),
                $paymentNote ?: ('PAID ' . $dateLabel)
            );

            $payable->payment_notes = $appendUniqueLine($payable->payment_notes, $noteLine);
            $payable->save();

            $noteExists = AccountPayableNote::query()
                ->where('account_payable_id', $payable->id)
                ->where('component_id', $component->id)
                ->where('note', $noteLine)
                ->exists();

            if (!$noteExists) {
                AccountPayableNote::query()->create([
                    'sales_order_id' => $salesOrder->id,
                    'account_payable_id' => $payable->id,
                    'component_id' => $component->id,
                    'source_type' => 'repair_reimbursement_payable',
                    'note' => $noteLine,
                    'created_by' => $item->created_by,
                ]);
            }
        }

        $payable->recalculateTotals(true);

        $receiptInfo = $item->receipt_info ?? [];
        if (!is_array($receiptInfo)) {
            $receiptInfo = json_decode((string) $receiptInfo, true) ?: [];
        }
        $receiptInfo['account_payable_id'] = $payable->id;
        $receiptInfo['account_payable_component_id'] = $component->id;
        $receiptInfo['account_payable_vendor'] = $payable->vendor_name;
        $receiptInfo['account_payable_invoice_number'] = $payable->vendor_invoice_number;
        $item->receipt_info = $receiptInfo;
        $item->save();
    }
});

echo "Selesai. Repair AP reimbursement berhasil diterapkan.\n";
