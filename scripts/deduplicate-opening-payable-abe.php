<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableNote;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

/**
 * Usage:
 *   php scripts/deduplicate-opening-payable-abe.php              # dry-run
 *   php scripts/deduplicate-opening-payable-abe.php --apply      # eksekusi hapus
 *   php scripts/deduplicate-opening-payable-abe.php --apply --keep-id=476
 *   php scripts/deduplicate-opening-payable-abe.php --apply --allow-unpaid-components
 */

$apply = in_array('--apply', $argv, true);
$allowUnpaidComponents = in_array('--allow-unpaid-components', $argv, true);
$keepId = null;

foreach ($argv as $arg) {
    if (str_starts_with($arg, '--keep-id=')) {
        $keepId = (int) substr($arg, strlen('--keep-id='));
    }
}

$targetVendorId = 18;
$targetSourceSo = '2511-260011';
$targetInvoiceLower = strtolower('1439/ATP-SBY/INV/IMP.2025.XII.1064');
$targetAmount = 2122850.00;

$rows = AccountPayable::query()
    ->where('is_opening', true)
    ->where('opening_type', 'main')
    ->where('vendor_id', $targetVendorId)
    ->where('source_so_number', $targetSourceSo)
    ->whereRaw('LOWER(vendor_invoice_number) = ?', [$targetInvoiceLower])
    ->where('amount', $targetAmount)
    ->orderBy('id')
    ->get();

echo "=== DUPLICATE CHECK: OPENING PAYABLE ABE ===\n";
echo "Found rows: {$rows->count()}\n\n";

if ($rows->isEmpty()) {
    echo "Tidak ada data target.\n";
    exit(0);
}

foreach ($rows as $row) {
    echo sprintf(
        "ID=%d | vendor=%s | invoice=%s | so=%s | amount=%.2f | status=%s | created_at=%s\n",
        $row->id,
        (string) $row->vendor_name,
        (string) $row->vendor_invoice_number,
        (string) $row->source_so_number,
        (float) $row->amount,
        (string) $row->status,
        (string) $row->created_at
    );
}

echo "\n";

if ($rows->count() <= 1) {
    echo "Tidak ada duplikat. Tidak ada aksi.\n";
    exit(0);
}

if ($keepId === null) {
    $keepId = (int) $rows->last()->id; // default: keep row terbaru
}

$keepRow = $rows->firstWhere('id', $keepId);
if (!$keepRow) {
    echo "ERROR: keep-id {$keepId} tidak termasuk di kandidat duplikat.\n";
    exit(1);
}

$deleteCandidates = $rows->filter(fn ($row) => (int) $row->id !== $keepId)->values();

echo "Keep ID: {$keepId}\n";
echo "Delete candidates: " . $deleteCandidates->pluck('id')->implode(', ') . "\n\n";

$safeDeleteIds = [];
$blocked = [];

foreach ($deleteCandidates as $row) {
    $components = $row->components()->get(['id', 'amount', 'paid_amount', 'outstanding_amount', 'status']);
    $hasComponents = $components->isNotEmpty();
    $hasNotes = AccountPayableNote::query()->where('account_payable_id', $row->id)->exists();
    $isUnpaid = $row->status === 'unpaid';

    if (!$isUnpaid) {
        $blocked[] = "ID {$row->id} BLOCKED: status={$row->status} (bukan unpaid)";
        continue;
    }

    if ($hasComponents) {
        $allComponentsUnpaid = $components->every(function ($component) {
            $paidAmount = (float) ($component->paid_amount ?? 0);
            $amount = (float) ($component->amount ?? 0);
            $outstanding = (float) ($component->outstanding_amount ?? 0);
            $status = strtolower((string) ($component->status ?? ''));

            return $paidAmount <= 0.0001
                && abs($outstanding - $amount) <= 0.01
                && in_array($status, ['unpaid', 'outstanding'], true);
        });

        if (!($allowUnpaidComponents && $allComponentsUnpaid)) {
            $componentInfo = $components->map(function ($component) {
                return sprintf(
                    '#%d(status=%s, paid=%.2f, outstanding=%.2f, amount=%.2f)',
                    $component->id,
                    (string) $component->status,
                    (float) $component->paid_amount,
                    (float) $component->outstanding_amount,
                    (float) $component->amount
                );
            })->implode(', ');
            $blocked[] = "ID {$row->id} BLOCKED: punya components [{$componentInfo}]";
            continue;
        }
    }

    if ($hasNotes) {
        $blocked[] = "ID {$row->id} BLOCKED: punya payable notes";
        continue;
    }

    $safeDeleteIds[] = (int) $row->id;
}

if (!empty($blocked)) {
    echo "Blocked rows:\n";
    foreach ($blocked as $line) {
        echo "- {$line}\n";
    }
    echo "\n";
}

if (empty($safeDeleteIds)) {
    echo "Tidak ada row yang aman untuk dihapus.\n";
    exit(0);
}

echo "Safe delete IDs: " . implode(', ', $safeDeleteIds) . "\n";

if (!$apply) {
    echo "DRY-RUN mode: tidak ada data yang dihapus.\n";
    echo "Untuk eksekusi nyata, jalankan: php scripts/deduplicate-opening-payable-abe.php --apply";
    echo "\n";
    exit(0);
}

DB::transaction(function () use ($safeDeleteIds): void {
    $rows = AccountPayable::query()->whereIn('id', $safeDeleteIds)->get();

    foreach ($rows as $row) {
        // Pastikan child components dibersihkan agar tidak ada orphan/residual.
        $row->components()->delete();
        $row->delete();
    }
});

echo "DONE: berhasil menghapus ID " . implode(', ', $safeDeleteIds) . "\n";
