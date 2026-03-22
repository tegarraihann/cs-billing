<?php

declare(strict_types=1);

use App\Models\AccountPayable;
use App\Models\AccountPayableNote;
use App\Models\BankTransaction;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

/**
 * Usage:
 *   php scripts/deduplicate-opening-payable-shenzhen-sml25101357.php
 *   php scripts/deduplicate-opening-payable-shenzhen-sml25101357.php --apply
 *
 * Tujuan:
 * - Menghapus duplikasi opening AP Shenzhen invoice SML25101357
 * - Keep AP lama #341
 * - Delete AP duplikat #552
 */

$apply = in_array('--apply', $argv, true);

$keepId = 341;
$deleteId = 552;
$expectedVendor = 'SHENZHEN MAXSPEED LOGISTICS CO., LTD';
$expectedInvoice = 'SML25101357';
$expectedAmount = 13733360.00;

$keepRow = AccountPayable::query()->with('components')->find($keepId);
$deleteRow = AccountPayable::query()->with('components')->find($deleteId);

echo "=== DEDUP OPENING AP SHENZHEN SML25101357 ===\n";
echo "Mode: " . ($apply ? 'APPLY' : 'DRY-RUN') . "\n\n";

if (!$keepRow || !$deleteRow) {
    throw new RuntimeException('Target AP keep/delete tidak ditemukan.');
}

$formatRow = static function (AccountPayable $row): array {
    return [
        'id' => $row->id,
        'vendor_name' => $row->vendor_name,
        'source_so_number' => $row->source_so_number,
        'vendor_invoice_number' => $row->vendor_invoice_number,
        'amount' => (float) $row->amount,
        'paid_amount' => (float) $row->paid_amount,
        'outstanding_amount' => (float) $row->outstanding_amount,
        'status' => $row->status,
        'is_opening' => (bool) $row->is_opening,
        'opening_type' => $row->opening_type,
        'components' => $row->components->map(static function ($component) {
            return [
                'id' => $component->id,
                'amount' => (float) $component->amount,
                'paid_amount' => (float) $component->paid_amount,
                'outstanding_amount' => (float) $component->outstanding_amount,
                'status' => $component->status,
            ];
        })->values()->all(),
        'note_count' => AccountPayableNote::query()->where('account_payable_id', $row->id)->count(),
        'bank_tx_count' => BankTransaction::query()
            ->where('reference_type', 'vendor_payment')
            ->where('reference_id', $row->id)
            ->count(),
    ];
};

$validateRow = static function (AccountPayable $row) use ($expectedVendor, $expectedInvoice, $expectedAmount): void {
    if ((string) $row->vendor_name !== $expectedVendor) {
        throw new RuntimeException("Vendor AP {$row->id} tidak sesuai.");
    }

    if ((string) $row->vendor_invoice_number !== $expectedInvoice) {
        throw new RuntimeException("Vendor invoice AP {$row->id} tidak sesuai.");
    }

    if (round((float) $row->amount, 2) !== round($expectedAmount, 2)) {
        throw new RuntimeException("Amount AP {$row->id} tidak sesuai.");
    }

    if (!(bool) $row->is_opening) {
        throw new RuntimeException("AP {$row->id} bukan opening payable.");
    }
};

$validateRow($keepRow);
$validateRow($deleteRow);

if ((float) $deleteRow->paid_amount > 0.01 || (float) $deleteRow->outstanding_amount <= 0.01 || $deleteRow->status !== 'unpaid') {
    throw new RuntimeException("AP {$deleteId} tidak dalam kondisi aman untuk dihapus.");
}

if (AccountPayableNote::query()->where('account_payable_id', $deleteId)->exists()) {
    throw new RuntimeException("AP {$deleteId} masih punya note.");
}

if (BankTransaction::query()->where('reference_type', 'vendor_payment')->where('reference_id', $deleteId)->exists()) {
    throw new RuntimeException("AP {$deleteId} masih punya bank transaction.");
}

echo "Keep row:\n";
var_export($formatRow($keepRow));
echo "\n\nDelete row:\n";
var_export($formatRow($deleteRow));
echo "\n\n";

if (!$apply) {
    echo "DRY-RUN selesai. Tidak ada perubahan data.\n";
    exit(0);
}

DB::transaction(function () use ($deleteId): void {
    $deleteRow = AccountPayable::query()->with('components')->lockForUpdate()->find($deleteId);

    if (!$deleteRow) {
        throw new RuntimeException("AP {$deleteId} tidak ditemukan saat apply.");
    }

    $deleteRow->components()->delete();
    $deleteRow->delete();
});

echo "DONE: AP duplikat {$deleteId} berhasil dihapus.\n";
