<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\AccountReceivableComponent;
use App\Models\Invoice;
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
 *   php scripts/fix-ar-reimb-003-repair-invoice-scoped-component-paid.php --so=EWILOG2601001001
 *   php scripts/fix-ar-reimb-003-repair-invoice-scoped-component-paid.php --so=EWILOG2601001001 --apply
 *   php scripts/fix-ar-reimb-003-repair-invoice-scoped-component-paid.php --invoice-number=EWL2601001001
 *
 * Default = DRY-RUN.
 *
 * Scope:
 * - Recalculate AR component paid/outstanding strictly from invoice items (invoice-scoped).
 * - Prevent reimbursement paid leakage from unrelated SO reimbursement items.
 * - No new bank transactions.
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
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
        $raw = trim((string) substr($arg, strlen('--ar-id=')));
        if (ctype_digit($raw)) {
            $arIdFilter = (int) $raw;
        }
    }
}

if ($soFilter === null && $invoiceNumberFilter === null && $arIdFilter === null) {
    fwrite(STDERR, "Wajib isi salah satu filter: --so=... atau --invoice-number=... atau --ar-id=...\n");
    exit(1);
}

$formatAmount = static fn (float $amount): string => number_format($amount, 2, '.', ',');
$approxEqual = static fn (float $left, float $right, float $tol = 0.01): bool => abs($left - $right) <= $tol;

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

$parseReimbursementIdFromItemRef = static function (?string $itemRef): ?int {
    $value = strtolower(trim((string) $itemRef));
    if ($value === '') {
        return null;
    }

    if (preg_match('/reimb(?:ursement)?[_-]?(\d+)/i', $value, $matches)) {
        return (int) $matches[1];
    }

    return null;
};

$resolveReimbursementSourceKey = static function ($item) use ($parseReimbursementIdFromItemRef): string {
    $reimbursementId = $parseReimbursementIdFromItemRef($item->item_ref);
    if ($reimbursementId) {
        return 'reimbursement_' . $reimbursementId;
    }

    return 'invoice_item_' . (int) $item->id;
};

$determineStatus = static function (float $amount, float $paid, ?Carbon $dueDate = null) use ($approxEqual): string {
    $amount = max(0, $amount);
    $paid = max(0, min($amount, $paid));
    $outstanding = max(0, $amount - $paid);

    if ($approxEqual($outstanding, 0.0)) {
        return 'paid';
    }

    if ($paid > 0.01) {
        return 'partial';
    }

    if ($dueDate && Carbon::now()->gt($dueDate)) {
        return 'overdue';
    }

    return 'outstanding';
};

$snapshot = static function (AccountReceivable $receivable): array {
    $receivable->loadMissing(['invoice.items', 'components', 'salesOrder']);
    $invoice = $receivable->invoice;

    return [
        'ar_id' => (int) $receivable->id,
        'so' => (string) ($receivable->salesOrder?->order_number ?? '-'),
        'invoice' => (string) ($invoice?->invoice_number ?? $receivable->invoice_number ?? '-'),
        'invoice_amount' => (float) ($receivable->invoice_amount ?? 0),
        'paid_amount' => (float) ($receivable->paid_amount ?? 0),
        'outstanding_amount' => (float) ($receivable->outstanding_amount ?? 0),
        'status' => (string) ($receivable->status ?? '-'),
        'components' => $receivable->components
            ->sortBy('id')
            ->map(static fn ($component) => [
                'id' => (int) $component->id,
                'type' => (string) $component->component_type,
                'amount' => (float) $component->amount,
                'paid' => (float) $component->paid_amount,
                'outstanding' => (float) $component->outstanding_amount,
                'status' => (string) $component->status,
            ])->values()->all(),
    ];
};

$printSnapshot = static function (string $label, array $data) use ($formatAmount): void {
    echo sprintf(
        "  %s AR#%d | SO %s | Invoice %s | total=%s | paid=%s | outstanding=%s | status=%s\n",
        $label,
        $data['ar_id'],
        $data['so'],
        $data['invoice'],
        $formatAmount((float) $data['invoice_amount']),
        $formatAmount((float) $data['paid_amount']),
        $formatAmount((float) $data['outstanding_amount']),
        $data['status']
    );
    foreach ($data['components'] as $component) {
        echo sprintf(
            "    - %s (id=%d): amount=%s | paid=%s | outstanding=%s | status=%s\n",
            $component['type'],
            $component['id'],
            $formatAmount((float) $component['amount']),
            $formatAmount((float) $component['paid']),
            $formatAmount((float) $component['outstanding']),
            $component['status']
        );
    }
};

$query = AccountReceivable::query()
    ->with(['invoice.items', 'components', 'salesOrder'])
    ->whereNotNull('invoice_id')
    ->orderBy('id');

if ($arIdFilter !== null) {
    $query->where('id', $arIdFilter);
}

if ($soFilter !== null && $soFilter !== '') {
    $soCandidates = $normalizeSoCandidates($soFilter);
    $query->where(function (Builder $builder) use ($soCandidates, $soFilter): void {
        if (ctype_digit($soFilter)) {
            $builder->orWhere('sales_order_id', (int) $soFilter);
        }

        $builder->orWhereHas('salesOrder', function (Builder $salesOrderQuery) use ($soCandidates, $soFilter): void {
            $salesOrderQuery->where(function (Builder $nested) use ($soCandidates, $soFilter): void {
                foreach ($soCandidates as $candidate) {
                    $nested->orWhere('order_number', $candidate);
                }

                if ($soFilter !== '') {
                    $nested->orWhere('order_number', 'like', '%' . $soFilter . '%');
                }
            });
        });
    });
}

if ($invoiceNumberFilter !== null && $invoiceNumberFilter !== '') {
    $invoiceCandidates = $normalizeInvoiceCandidates($invoiceNumberFilter);
    $query->where(function (Builder $builder) use ($invoiceCandidates, $invoiceNumberFilter): void {
        foreach ($invoiceCandidates as $candidate) {
            $builder->orWhere('invoice_number', $candidate);
        }

        $builder->orWhereHas('invoice', function (Builder $invoiceQuery) use ($invoiceCandidates, $invoiceNumberFilter): void {
            $invoiceQuery->where(function (Builder $nested) use ($invoiceCandidates, $invoiceNumberFilter): void {
                foreach ($invoiceCandidates as $candidate) {
                    $nested->orWhere('invoice_number', $candidate);
                }

                if ($invoiceNumberFilter !== '') {
                    $nested->orWhere('invoice_number', 'like', '%' . $invoiceNumberFilter . '%');
                }
            });
        });
    });
}

$receivables = $query->get();
if ($receivables->isEmpty()) {
    echo "Tidak ada AR invoice-backed yang cocok dengan filter.\n";
    exit(0);
}

echo "=== FIX-AR-REIMB-003: REPAIR INVOICE-SCOPED COMPONENT PAID ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo 'Target AR: ' . $receivables->count() . "\n\n";

$processed = 0;
$changed = 0;
$unchanged = 0;

foreach ($receivables as $receivable) {
    ++$processed;

    $before = [];
    $after = [];
    $didChange = false;

    $runner = static function () use (
        $receivable,
        &$before,
        &$after,
        &$didChange,
        $snapshot,
        $resolveReimbursementSourceKey,
        $determineStatus,
        $approxEqual
    ): void {
        /** @var AccountReceivable $ar */
        $ar = AccountReceivable::query()
            ->with(['invoice.items', 'components', 'salesOrder'])
            ->findOrFail($receivable->id);

        $invoice = $ar->invoice;
        if (!$invoice) {
            $before = $snapshot($ar);
            $after = $before;
            return;
        }

        $before = $snapshot($ar);

        $items = $invoice->items ?? collect();
        $mainItems = $items->filter(function ($item) {
            $type = strtolower((string) ($item->item_type ?? 'billable'));
            return $type === 'billable' || $item->item_type === null;
        });

        $reimbursementItems = $items
            ->filter(fn ($item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
            ->groupBy($resolveReimbursementSourceKey)
            ->map(function ($group) {
                return $group->sortByDesc(function ($item) {
                    return (float) ($item->amount ?? 0);
                })->first();
            })
            ->values();

        $mainAmount = (float) $mainItems->sum('amount');
        $mainPaid = (float) $mainItems->sum(function ($item) {
            $lineTotal = (float) ($item->amount ?? 0);
            return min($lineTotal, max(0, (float) ($item->paid_amount ?? 0)));
        });
        $mainOutstanding = max(0, $mainAmount - $mainPaid);

        $debitAmount = (float) $reimbursementItems->sum('amount');
        $debitPaid = (float) $reimbursementItems->sum(function ($item) {
            $lineTotal = (float) ($item->amount ?? 0);
            return min($lineTotal, max(0, (float) ($item->paid_amount ?? 0)));
        });
        $debitOutstanding = max(0, $debitAmount - $debitPaid);

        $vatAmount = (float) ($invoice->vat_amount ?? 0);
        $vatPaid = 0.0;

        $dueDate = $ar->due_date ? Carbon::parse($ar->due_date) : null;

        $payloads = [];
        if ($mainAmount > 0) {
            $payloads['main'] = [
                'description' => 'Invoice Main',
                'amount' => $mainAmount,
                'paid_amount' => $mainPaid,
                'outstanding_amount' => $mainOutstanding,
            ];
        }
        if ($debitAmount > 0) {
            $payloads['debit_note'] = [
                'description' => 'Debit Note / Reimbursement',
                'amount' => $debitAmount,
                'paid_amount' => $debitPaid,
                'outstanding_amount' => $debitOutstanding,
            ];
        }
        if ($vatAmount > 0) {
            $payloads['vat'] = [
                'description' => 'VAT',
                'amount' => $vatAmount,
                'paid_amount' => $vatPaid,
                'outstanding_amount' => max(0, $vatAmount - $vatPaid),
            ];
        }
        if (empty($payloads) && (float) $invoice->total > 0) {
            $payloads['main'] = [
                'description' => 'Invoice Main',
                'amount' => (float) $invoice->total,
                'paid_amount' => 0,
                'outstanding_amount' => (float) $invoice->total,
            ];
        }

        $existing = $ar->components->keyBy('component_type');
        $processedTypes = [];

        foreach ($payloads as $type => $payload) {
            $processedTypes[] = $type;

            /** @var AccountReceivableComponent $component */
            $component = $existing->get($type) ?? new AccountReceivableComponent([
                'account_receivable_id' => $ar->id,
                'component_type' => $type,
            ]);

            $component->account_receivable_id = $ar->id;
            $component->component_type = $type;
            $component->description = $payload['description'];
            $component->amount = $payload['amount'];
            $component->paid_amount = min((float) $payload['amount'], max(0, (float) $payload['paid_amount']));
            $component->outstanding_amount = $payload['outstanding_amount'];
            $component->status = $determineStatus(
                (float) $component->amount,
                (float) $component->paid_amount,
                $dueDate
            );
            $component->due_date = $ar->due_date;
            $component->save();
        }

        if (!empty($processedTypes)) {
            $ar->components()->whereNotIn('component_type', $processedTypes)->delete();
        }

        $ar->recalculateTotals(true);
        $ar->refresh();
        $ar->load(['invoice.items', 'components', 'salesOrder']);
        $after = $snapshot($ar);

        $didChange =
            !$approxEqual((float) $before['invoice_amount'], (float) $after['invoice_amount']) ||
            !$approxEqual((float) $before['paid_amount'], (float) $after['paid_amount']) ||
            !$approxEqual((float) $before['outstanding_amount'], (float) $after['outstanding_amount']) ||
            $before['status'] !== $after['status'] ||
            json_encode($before['components']) !== json_encode($after['components']);
    };

    if ($apply) {
        DB::transaction($runner);
    } else {
        DB::beginTransaction();
        try {
            $runner();
            DB::rollBack();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw $e;
        }
    }

    if ($didChange) {
        ++$changed;
        echo sprintf("[CHANGED] AR#%d | SO %s | Invoice %s\n", $before['ar_id'], $before['so'], $before['invoice']);
        $printSnapshot('Sebelum', $before);
        $printSnapshot('Sesudah', $after);
    } else {
        ++$unchanged;
        echo sprintf("[UNCHANGED] AR#%d | SO %s | Invoice %s\n", $before['ar_id'], $before['so'], $before['invoice']);
    }
    echo "\n";
}

echo sprintf(
    "Selesai. Diproses: %d | Berubah: %d | Tidak berubah: %d\n",
    $processed,
    $changed,
    $unchanged
);

if (!$apply) {
    echo "Mode DRY-RUN: tidak ada perubahan yang disimpan.\n";
}
