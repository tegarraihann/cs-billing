<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\BankTransaction;
use Illuminate\Database\Eloquent\Builder;
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
 *   php scripts/fix-ar-duplicate-orphan-cleanup.php --so=EWILOG2602043013
 *   php scripts/fix-ar-duplicate-orphan-cleanup.php --invoice-number=EWL2602043013
 *   php scripts/fix-ar-duplicate-orphan-cleanup.php --ar-id=139
 *   php scripts/fix-ar-duplicate-orphan-cleanup.php --scan-all
 *   php scripts/fix-ar-duplicate-orphan-cleanup.php --so=EWILOG2602043013 --apply
 *
 * Default = DRY-RUN.
 *
 * Cleanup rule (safe case only):
 * - Dalam 1 SO terdapat tepat 1 AR yang linked ke invoice (invoice_id != null)
 * - Ada 1+ AR orphan (invoice_id = null)
 * - AR orphan tidak punya bank transaction customer_payment
 * - AR orphan tidak punya paid_amount
 * - Komponen AR orphan juga tidak punya paid_amount
 *
 * Jika syarat di atas terpenuhi, orphan akan dihapus beserta komponennya.
 * Jika ada kondisi meragukan, script hanya melaporkan dan skip.
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$scanAll = in_array('--scan-all', $argvValues, true);
$soFilter = null;
$invoiceNumberFilter = null;
$arIdFilter = null;

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--so=')) {
        $soFilter = trim((string) substr($arg, strlen('--so=')));
        continue;
    }

    if (str_starts_with($arg, '--invoice-number=')) {
        $invoiceNumberFilter = trim((string) substr($arg, strlen('--invoice-number=')));
        continue;
    }

    if (str_starts_with($arg, '--ar-id=')) {
        $arIdFilter = trim((string) substr($arg, strlen('--ar-id=')));
    }
}

if (!$scanAll && $soFilter === null && $invoiceNumberFilter === null && $arIdFilter === null) {
    fwrite(STDERR, "Wajib beri filter (--so, --invoice-number, --ar-id) atau gunakan --scan-all.\n");
    exit(1);
}

$formatAmount = static function (float $amount): string {
    return number_format($amount, 2, '.', ',');
};

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

$normalizeInvoiceCandidates = static function (string $value): array {
    $raw = strtoupper(trim($value));
    $compact = preg_replace('/[^A-Z0-9]/', '', $raw) ?: $raw;
    $withoutPrefix = preg_replace('/^EWL/', '', $compact);

    return array_values(array_unique(array_filter([
        $raw,
        $compact,
        $withoutPrefix,
        $withoutPrefix !== '' ? 'EWL' . $withoutPrefix : null,
    ])));
};

$query = AccountReceivable::query()
    ->with(['components', 'salesOrder', 'invoice'])
    ->where('is_opening', false);

if ($arIdFilter !== null && $arIdFilter !== '') {
    if (!ctype_digit($arIdFilter)) {
        fwrite(STDERR, "--ar-id harus numerik.\n");
        exit(1);
    }

    $target = AccountReceivable::query()->find((int) $arIdFilter);
    if (!$target) {
        echo "AR dengan id {$arIdFilter} tidak ditemukan.\n";
        exit(0);
    }

    $query->where('sales_order_id', $target->sales_order_id);
}

if ($soFilter !== null && $soFilter !== '') {
    $candidates = $normalizeSoCandidates($soFilter);
    $query->where(function (Builder $builder) use ($candidates, $soFilter) {
        if (ctype_digit($soFilter)) {
            $builder->orWhere('sales_order_id', (int) $soFilter);
        }

        $builder->orWhereHas('salesOrder', function (Builder $salesOrderQuery) use ($candidates, $soFilter) {
            $salesOrderQuery->where(function (Builder $nested) use ($candidates, $soFilter) {
                foreach ($candidates as $candidate) {
                    $nested->orWhere('order_number', $candidate);
                }

                $nested->orWhere('order_number', 'like', '%' . $soFilter . '%');
            });
        });
    });
}

if ($invoiceNumberFilter !== null && $invoiceNumberFilter !== '') {
    $candidates = $normalizeInvoiceCandidates($invoiceNumberFilter);
    $query->where(function (Builder $builder) use ($candidates, $invoiceNumberFilter) {
        foreach ($candidates as $candidate) {
            $builder->orWhere('invoice_number', $candidate);
        }

        $builder->orWhere('invoice_number', 'like', '%' . $invoiceNumberFilter . '%');
    });
}

/** @var Collection<int, AccountReceivable> $rows */
$rows = $query->orderBy('sales_order_id')->orderBy('id')->get();

if ($rows->isEmpty()) {
    echo "Tidak ada AR yang cocok dengan filter.\n";
    exit(0);
}

$groups = $rows->groupBy(fn (AccountReceivable $ar) => (string) ($ar->sales_order_id ?? 0));

echo "=== FIX-AR-DUP-001: CLEANUP ORPHAN DUPLICATE AR ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo 'Group SO diperiksa: ' . $groups->count() . "\n\n";

$processedGroups = 0;
$changedGroups = 0;
$skippedGroups = 0;
$deletedArCount = 0;

foreach ($groups as $salesOrderId => $group) {
    ++$processedGroups;

    /** @var Collection<int, AccountReceivable> $linked */
    $linked = $group->filter(fn (AccountReceivable $ar) => !empty($ar->invoice_id))->values();
    /** @var Collection<int, AccountReceivable> $orphans */
    $orphans = $group->filter(fn (AccountReceivable $ar) => empty($ar->invoice_id))->values();

    $soNumber = (string) ($group->first()?->salesOrder?->order_number ?? '-');
    $invoiceNumbers = $group->pluck('invoice_number')->filter()->unique()->values()->all();

    echo sprintf(
        "SO %s (#%s) | AR count=%d | linked=%d | orphan=%d | invoice_numbers=%s\n",
        $soNumber,
        $salesOrderId,
        $group->count(),
        $linked->count(),
        $orphans->count(),
        empty($invoiceNumbers) ? '-' : implode(', ', $invoiceNumbers)
    );

    if ($group->count() < 2) {
        echo "  Skip: tidak ada duplikasi.\n\n";
        ++$skippedGroups;
        continue;
    }

    if ($linked->count() !== 1) {
        echo "  Skip: butuh tepat 1 AR invoice-linked sebagai anchor. Kasus ini perlu review manual.\n\n";
        ++$skippedGroups;
        continue;
    }

    if ($orphans->isEmpty()) {
        echo "  Skip: tidak ada orphan AR.\n\n";
        ++$skippedGroups;
        continue;
    }

    /** @var AccountReceivable $keeper */
    $keeper = $linked->first();

    $safeToDelete = collect();
    $unsafeReasons = [];

    foreach ($orphans as $orphan) {
        $bankTxCount = BankTransaction::query()
            ->where('reference_type', 'customer_payment')
            ->where('reference_id', $orphan->id)
            ->count();

        $orphanPaid = (float) ($orphan->paid_amount ?? 0);
        $componentPaid = (float) $orphan->components->sum('paid_amount');
        $componentIds = $orphan->components->pluck('id')->values()->all();

        $reasons = [];
        if ($bankTxCount > 0) {
            $reasons[] = "punya {$bankTxCount} bank transaction";
        }
        if ($orphanPaid > 0.01) {
            $reasons[] = 'paid_amount > 0';
        }
        if ($componentPaid > 0.01) {
            $reasons[] = 'component paid_amount > 0';
        }

        echo sprintf(
            "  Orphan AR#%d | total=%s | paid=%s | outstanding=%s | status=%s | components=%s\n",
            $orphan->id,
            $formatAmount((float) $orphan->invoice_amount),
            $formatAmount($orphanPaid),
            $formatAmount((float) $orphan->outstanding_amount),
            $orphan->status,
            empty($componentIds) ? '-' : implode(', ', $componentIds)
        );

        if (!empty($reasons)) {
            $unsafeReasons[] = sprintf(
                "AR#%d tidak aman dihapus: %s",
                $orphan->id,
                implode(', ', $reasons)
            );
            continue;
        }

        $safeToDelete->push($orphan);
    }

    echo sprintf(
        "  Keeper AR#%d | invoice_id=%s | total=%s | paid=%s | outstanding=%s | status=%s\n",
        $keeper->id,
        (string) $keeper->invoice_id,
        $formatAmount((float) $keeper->invoice_amount),
        $formatAmount((float) $keeper->paid_amount),
        $formatAmount((float) $keeper->outstanding_amount),
        $keeper->status
    );

    if (!empty($unsafeReasons)) {
        foreach ($unsafeReasons as $reason) {
            echo "  Skip: {$reason}\n";
        }
    }

    if ($safeToDelete->isEmpty()) {
        echo "  Tidak ada orphan yang lolos kriteria safe cleanup.\n\n";
        ++$skippedGroups;
        continue;
    }

    $deleteIds = $safeToDelete->pluck('id')->values()->all();
    $deleteComponentIds = $safeToDelete
        ->flatMap(fn (AccountReceivable $ar) => $ar->components->pluck('id'))
        ->values()
        ->all();

    echo sprintf(
        "  Candidate delete: AR %s | Components %s\n",
        implode(', ', $deleteIds),
        empty($deleteComponentIds) ? '-' : implode(', ', $deleteComponentIds)
    );

    if ($apply) {
        DB::transaction(function () use ($deleteIds): void {
            AccountReceivable::query()
                ->whereIn('id', $deleteIds)
                ->each(function (AccountReceivable $ar): void {
                    $ar->components()->delete();
                    $ar->delete();
                });
        });
    }

    ++$changedGroups;
    $deletedArCount += count($deleteIds);
    echo $apply
        ? "  Cleanup applied.\n\n"
        : "  DRY-RUN: belum ada perubahan yang disimpan.\n\n";
}

echo sprintf(
    "Selesai. Group diperiksa: %d | Group berubah: %d | Group skip: %d | AR candidate delete: %d\n",
    $processedGroups,
    $changedGroups,
    $skippedGroups,
    $deletedArCount
);

if (!$apply) {
    echo "Mode DRY-RUN: tidak ada perubahan yang disimpan.\n";
}
