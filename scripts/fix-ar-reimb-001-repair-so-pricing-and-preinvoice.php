<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\SalesOrder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;

if (!function_exists('base_path')) {
    require __DIR__ . '/../vendor/autoload.php';

    $app = require __DIR__ . '/../bootstrap/app.php';
    $kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
    $kernel->bootstrap();
}

/**
 * Usage:
 *   php scripts/fix-ar-reimb-001-repair-so-pricing-and-preinvoice.php --so=EWILOG2601002002
 *   php scripts/fix-ar-reimb-001-repair-so-pricing-and-preinvoice.php --so=2601002002 --apply
 *   php scripts/fix-ar-reimb-001-repair-so-pricing-and-preinvoice.php --from=2026-01-01 --to=2026-02-28
 *   php scripts/fix-ar-reimb-001-repair-so-pricing-and-preinvoice.php --from=2026-01-01 --to=2026-02-28 --apply
 *
 * Default = dry-run (tidak menyimpan perubahan).
 * Scope repair:
 * - Recompute total_buying, total_selling, total_revenue dari detail item x quantity
 * - Resync AR pre-invoice untuk SO yang belum punya invoice
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$soFilter = null;
$fromDateInput = null;
$toDateInput = null;

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--so=')) {
        $soFilter = trim((string) substr($arg, strlen('--so=')));
        continue;
    }

    if (str_starts_with($arg, '--from=')) {
        $fromDateInput = trim((string) substr($arg, strlen('--from=')));
        continue;
    }

    if (str_starts_with($arg, '--to=')) {
        $toDateInput = trim((string) substr($arg, strlen('--to=')));
    }
}

if ($soFilter === null && $fromDateInput === null && $toDateInput === null) {
    fwrite(STDERR, "Wajib beri filter --so=... atau range --from=... / --to=...\n");
    exit(1);
}

$parseDate = static function (?string $value, string $optionName): ?Carbon {
    if ($value === null || $value === '') {
        return null;
    }

    try {
        return Carbon::parse($value)->startOfDay();
    } catch (\Throwable $e) {
        fwrite(STDERR, "Format {$optionName} tidak valid: {$value}\n");
        exit(1);
    }
};

$fromDate = $parseDate($fromDateInput, '--from');
$toDate = $parseDate($toDateInput, '--to');
if ($fromDate && $toDate && $fromDate->gt($toDate)) {
    fwrite(STDERR, "--from tidak boleh lebih besar dari --to\n");
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

$computeTotals = static function (SalesOrder $salesOrder): array {
    $salesOrder->loadMissing(['vendorBreakdownItems', 'reimbursementItems', 'invoices']);

    $buying = 0.0;
    $selling = 0.0;
    $source = 'fallback';

    if ($salesOrder->vendorBreakdownItems->isNotEmpty()) {
        $source = 'vendor_breakdown_items';
        foreach ($salesOrder->vendorBreakdownItems as $item) {
            $quantity = is_numeric($item->quantity) && (float) $item->quantity > 0
                ? (float) $item->quantity
                : 1.0;

            $buying += (float) ($item->buying_amount ?? 0) * $quantity;
            $selling += (float) ($item->selling_amount ?? 0) * $quantity;
        }
    } elseif (is_array($salesOrder->vendor_breakdown) && !empty($salesOrder->vendor_breakdown)) {
        $source = 'vendor_breakdown_json';
        foreach ($salesOrder->vendor_breakdown as $item) {
            if (!is_array($item)) {
                continue;
            }

            $quantity = is_numeric($item['quantity'] ?? null) && (float) ($item['quantity'] ?? 0) > 0
                ? (float) $item['quantity']
                : 1.0;

            $buying += (float) ($item['buying_amount'] ?? 0) * $quantity;
            $selling += (float) ($item['selling_amount'] ?? 0) * $quantity;
        }
    } else {
        $buying = (float) ($salesOrder->total_buying ?? 0);
        $selling = (float) ($salesOrder->total_selling ?? 0);
    }

    $revenue = $selling - $buying;

    $reimbursementOutstanding = (float) $salesOrder->reimbursementItems->sum(function ($item) {
        $lineTotal = method_exists($item, 'getLineTotal')
            ? (float) $item->getLineTotal()
            : ((float) ($item->amount ?? 0) * ((float) ($item->quantity ?? 0) > 0 ? (float) $item->quantity : 1));

        if ($item->customer_outstanding_amount === null) {
            return $lineTotal;
        }

        return max(0, (float) $item->customer_outstanding_amount);
    });

    return [
        'source' => $source,
        'buying' => round($buying, 2),
        'selling' => round($selling, 2),
        'revenue' => round($revenue, 2),
        'reimbursement_outstanding' => round($reimbursementOutstanding, 2),
    ];
};

$snapshotPreInvoiceAr = static function (int $salesOrderId): array {
    $ar = AccountReceivable::query()
        ->with('components')
        ->where('sales_order_id', $salesOrderId)
        ->whereNull('invoice_id')
        ->where('is_opening', false)
        ->first();

    $main = $ar?->components?->firstWhere('component_type', 'main');
    $debit = $ar?->components?->firstWhere('component_type', 'debit_note');

    return [
        'id' => $ar?->id,
        'invoice_amount' => (float) ($ar?->invoice_amount ?? 0),
        'paid_amount' => (float) ($ar?->paid_amount ?? 0),
        'outstanding_amount' => (float) ($ar?->outstanding_amount ?? 0),
        'status' => $ar?->status,
        'main_amount' => (float) ($main?->amount ?? 0),
        'main_paid' => (float) ($main?->paid_amount ?? 0),
        'main_outstanding' => (float) ($main?->outstanding_amount ?? 0),
        'main_status' => $main?->status,
        'debit_amount' => (float) ($debit?->amount ?? 0),
        'debit_paid' => (float) ($debit?->paid_amount ?? 0),
        'debit_outstanding' => (float) ($debit?->outstanding_amount ?? 0),
        'debit_status' => $debit?->status,
    ];
};

$printArSnapshot = static function (string $label, array $snapshot) use ($formatAmount): void {
    if (empty($snapshot['id'])) {
        echo "    {$label}: tidak ada pre-invoice AR\n";
        return;
    }

    echo sprintf(
        "    %s: AR#%d | total=%s | paid=%s | outstanding=%s | status=%s\n",
        $label,
        (int) $snapshot['id'],
        $formatAmount((float) $snapshot['invoice_amount']),
        $formatAmount((float) $snapshot['paid_amount']),
        $formatAmount((float) $snapshot['outstanding_amount']),
        (string) ($snapshot['status'] ?? '-')
    );
    echo sprintf(
        "      main=%s (paid %s, outstanding %s, %s) | reimb=%s (paid %s, outstanding %s, %s)\n",
        $formatAmount((float) $snapshot['main_amount']),
        $formatAmount((float) $snapshot['main_paid']),
        $formatAmount((float) $snapshot['main_outstanding']),
        (string) ($snapshot['main_status'] ?? '-'),
        $formatAmount((float) $snapshot['debit_amount']),
        $formatAmount((float) $snapshot['debit_paid']),
        $formatAmount((float) $snapshot['debit_outstanding']),
        (string) ($snapshot['debit_status'] ?? '-')
    );
};

$query = SalesOrder::query()->orderBy('id');

if ($soFilter !== null && $soFilter !== '') {
    $candidates = $normalizeSoCandidates($soFilter);
    $query->where(function (Builder $builder) use ($soFilter, $candidates) {
        if (ctype_digit($soFilter)) {
            $builder->orWhere('id', (int) $soFilter);
        }

        if (!empty($candidates)) {
            $builder->orWhereIn('order_number', $candidates);
        }
    });
}

if ($fromDate) {
    $query->whereDate('approved_at', '>=', $fromDate->toDateString());
}

if ($toDate) {
    $query->whereDate('approved_at', '<=', $toDate->toDateString());
}

$salesOrders = $query->get();

if ($salesOrders->isEmpty()) {
    echo "Tidak ada sales order yang cocok dengan filter.\n";
    exit(0);
}

echo "=== FIX-AR-REIMB-001: REPAIR SO PRICING + PRE-INVOICE AR ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo 'Target SO: ' . $salesOrders->count() . "\n\n";

$changedCount = 0;

foreach ($salesOrders as $salesOrder) {
    $beforeTotals = [
        'buying' => round((float) ($salesOrder->total_buying ?? 0), 2),
        'selling' => round((float) ($salesOrder->total_selling ?? 0), 2),
        'revenue' => round((float) ($salesOrder->total_revenue ?? 0), 2),
    ];
    $beforeAr = $snapshotPreInvoiceAr($salesOrder->id);
    $invoiceCount = $salesOrder->invoices()->count();
    $computed = $computeTotals($salesOrder);

    $hasTotalChange =
        abs($beforeTotals['buying'] - $computed['buying']) > 0.01 ||
        abs($beforeTotals['selling'] - $computed['selling']) > 0.01 ||
        abs($beforeTotals['revenue'] - $computed['revenue']) > 0.01;

    $shouldSyncPreInvoiceAr = $invoiceCount === 0;

    $afterTotals = $beforeTotals;
    $afterAr = $beforeAr;

    $runner = static function () use (
        $salesOrder,
        $computed,
        $shouldSyncPreInvoiceAr,
        $snapshotPreInvoiceAr,
        &$afterTotals,
        &$afterAr
    ): void {
        SalesOrder::query()
            ->whereKey($salesOrder->id)
            ->update([
                'total_buying' => $computed['buying'],
                'total_selling' => $computed['selling'],
                'total_revenue' => $computed['revenue'],
                'updated_at' => now(),
            ]);

        if ($shouldSyncPreInvoiceAr) {
            AccountReceivable::createOrUpdatePreInvoiceFromSalesOrder($salesOrder->fresh());
        }

        $freshSo = SalesOrder::query()->findOrFail($salesOrder->id);
        $afterTotals = [
            'buying' => round((float) ($freshSo->total_buying ?? 0), 2),
            'selling' => round((float) ($freshSo->total_selling ?? 0), 2),
            'revenue' => round((float) ($freshSo->total_revenue ?? 0), 2),
        ];
        $afterAr = $snapshotPreInvoiceAr($salesOrder->id);
    };

    if ($apply) {
        try {
            DB::transaction($runner);
        } catch (\Throwable $e) {
            echo "SO {$salesOrder->order_number}: gagal apply - {$e->getMessage()}\n\n";
            continue;
        }
    } else {
        DB::beginTransaction();
        try {
            $runner();
            DB::rollBack();
        } catch (\Throwable $e) {
            DB::rollBack();
            echo "SO {$salesOrder->order_number}: gagal simulasi - {$e->getMessage()}\n\n";
            continue;
        }
    }

    $hasArChange =
        abs($beforeAr['invoice_amount'] - $afterAr['invoice_amount']) > 0.01 ||
        abs($beforeAr['main_amount'] - $afterAr['main_amount']) > 0.01 ||
        abs($beforeAr['debit_amount'] - $afterAr['debit_amount']) > 0.01 ||
        abs($beforeAr['outstanding_amount'] - $afterAr['outstanding_amount']) > 0.01;

    $isChanged = $hasTotalChange || $hasArChange;
    if ($isChanged) {
        $changedCount++;
    }

    echo sprintf(
        "[%s] SO %s (source=%s)\n",
        $isChanged ? 'CHANGED' : 'UNCHANGED',
        (string) $salesOrder->order_number,
        (string) $computed['source']
    );
    echo sprintf(
        "  Totals: buying %s -> %s | selling %s -> %s | revenue %s -> %s\n",
        $formatAmount($beforeTotals['buying']),
        $formatAmount($afterTotals['buying']),
        $formatAmount($beforeTotals['selling']),
        $formatAmount($afterTotals['selling']),
        $formatAmount($beforeTotals['revenue']),
        $formatAmount($afterTotals['revenue'])
    );
    echo sprintf(
        "  Reimbursement outstanding basis saat ini: %s\n",
        $formatAmount($computed['reimbursement_outstanding'])
    );

    $printArSnapshot('AR sebelum', $beforeAr);
    if ($shouldSyncPreInvoiceAr) {
        $printArSnapshot('AR sesudah', $afterAr);
    } else {
        echo "    AR sesudah: dilewati karena SO sudah punya invoice ({$invoiceCount} invoice)\n";
    }

    echo "\n";
}

echo sprintf(
    "Selesai. Diproses: %d | Berubah: %d | Tidak berubah: %d\n",
    $salesOrders->count(),
    $changedCount,
    $salesOrders->count() - $changedCount
);

if (!$apply) {
    echo "Mode DRY-RUN: tidak ada perubahan yang disimpan.\n";
}
