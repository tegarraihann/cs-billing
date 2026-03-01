<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\AccountReceivableComponent;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\ReimbursementItem;
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
 *   php scripts/fix-ar-reimb-002-repair-invoice-gross-double-deduction.php --invoice-id=127
 *   php scripts/fix-ar-reimb-002-repair-invoice-gross-double-deduction.php --invoice-id=127 --apply
 *   php scripts/fix-ar-reimb-002-repair-invoice-gross-double-deduction.php --invoice-number=EWL2601002002
 *   php scripts/fix-ar-reimb-002-repair-invoice-gross-double-deduction.php --so=EWILOG2601002002
 *
 * Default = DRY-RUN (tidak menyimpan perubahan).
 *
 * Scope:
 * - Pulihkan reimbursement source yang terpotong jadi nilai sisa (net) ke gross amount
 * - Sesuaikan invoice item reimbursement yang linked ke source tersebut
 * - Hitung ulang total invoice customer-facing
 * - Sinkronkan ulang AR invoice-backed agar tidak double deduct
 *
 * Catatan:
 * - Script ini hanya menyasar reimbursement item yang sudah jelas terindikasi rusak:
 *   customer_paid_amount > 0 DAN customer_outstanding_amount == nilai item saat ini.
 * - Bank transaction tidak disentuh.
 */

$argvValues = $argv ?? ($_SERVER['argv'] ?? []);
$apply = in_array('--apply', $argvValues, true);
$invoiceIdFilter = null;
$invoiceNumberFilter = null;
$soFilter = null;

foreach ($argvValues as $arg) {
    if (str_starts_with($arg, '--invoice-id=')) {
        $invoiceIdFilter = trim((string) substr($arg, strlen('--invoice-id=')));
        continue;
    }

    if (str_starts_with($arg, '--invoice-number=')) {
        $invoiceNumberFilter = trim((string) substr($arg, strlen('--invoice-number=')));
        continue;
    }

    if (str_starts_with($arg, '--so=')) {
        $soFilter = trim((string) substr($arg, strlen('--so=')));
    }
}

if ($invoiceIdFilter === null && $invoiceNumberFilter === null && $soFilter === null) {
    fwrite(STDERR, "Wajib beri salah satu filter: --invoice-id=..., --invoice-number=..., atau --so=...\n");
    exit(1);
}

$formatAmount = static function (float $amount): string {
    return number_format($amount, 2, '.', ',');
};

$approxEqual = static function (float $left, float $right, float $tolerance = 0.01): bool {
    return abs($left - $right) <= $tolerance;
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

$parseReimbursementIdFromItemRef = static function (?string $itemRef): ?int {
    $value = strtolower(trim((string) $itemRef));
    if ($value === '') {
        return null;
    }

    if (preg_match('/reimb(?:ursement)?[_-]?(\d+)/', $value, $matches)) {
        return (int) $matches[1];
    }

    return null;
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

$snapshotInvoice = static function (Invoice $invoice): array {
    $invoice->loadMissing(['items', 'accountReceivable.components', 'salesOrder']);

    $items = $invoice->items ?? collect();
    $mainAmount = (float) $items->filter(function (InvoiceItem $item) {
        $type = strtolower((string) ($item->item_type ?? 'billable'));
        return $type === 'billable' || $item->item_type === null;
    })->sum('amount');
    $reimbAmount = (float) $items->filter(function (InvoiceItem $item) {
        return strtolower((string) ($item->item_type ?? '')) === 'reimbursement';
    })->sum('amount');

    $receivable = $invoice->accountReceivable;
    $mainComponent = $receivable?->components?->firstWhere('component_type', 'main');
    $debitComponent = $receivable?->components?->firstWhere('component_type', 'debit_note');

    return [
        'invoice_id' => (int) $invoice->id,
        'invoice_number' => (string) $invoice->invoice_number,
        'so_number' => (string) ($invoice->salesOrder?->order_number ?? '-'),
        'invoice_subtotal' => (float) ($invoice->subtotal ?? 0),
        'invoice_vat' => (float) ($invoice->vat_amount ?? 0),
        'invoice_total' => (float) ($invoice->total ?? 0),
        'main_amount' => $mainAmount,
        'reimb_amount' => $reimbAmount,
        'ar_id' => (int) ($receivable?->id ?? 0),
        'ar_total' => (float) ($receivable?->invoice_amount ?? 0),
        'ar_paid' => (float) ($receivable?->paid_amount ?? 0),
        'ar_outstanding' => (float) ($receivable?->outstanding_amount ?? 0),
        'ar_status' => (string) ($receivable?->status ?? '-'),
        'ar_main' => (float) ($mainComponent?->amount ?? 0),
        'ar_main_paid' => (float) ($mainComponent?->paid_amount ?? 0),
        'ar_main_outstanding' => (float) ($mainComponent?->outstanding_amount ?? 0),
        'ar_debit' => (float) ($debitComponent?->amount ?? 0),
        'ar_debit_paid' => (float) ($debitComponent?->paid_amount ?? 0),
        'ar_debit_outstanding' => (float) ($debitComponent?->outstanding_amount ?? 0),
    ];
};

$printInvoiceSnapshot = static function (string $label, array $snapshot) use ($formatAmount): void {
    echo sprintf(
        "  %s: Invoice %s (#%d) | SO %s | subtotal=%s | vat=%s | total=%s\n",
        $label,
        $snapshot['invoice_number'],
        $snapshot['invoice_id'],
        $snapshot['so_number'],
        $formatAmount((float) $snapshot['invoice_subtotal']),
        $formatAmount((float) $snapshot['invoice_vat']),
        $formatAmount((float) $snapshot['invoice_total'])
    );
    echo sprintf(
        "    Main=%s | Reimbursement=%s\n",
        $formatAmount((float) $snapshot['main_amount']),
        $formatAmount((float) $snapshot['reimb_amount'])
    );

    if (!empty($snapshot['ar_id'])) {
        echo sprintf(
            "    AR#%d | total=%s | paid=%s | outstanding=%s | status=%s\n",
            $snapshot['ar_id'],
            $formatAmount((float) $snapshot['ar_total']),
            $formatAmount((float) $snapshot['ar_paid']),
            $formatAmount((float) $snapshot['ar_outstanding']),
            $snapshot['ar_status']
        );
        echo sprintf(
            "      main=%s (paid %s, outstanding %s) | reimb=%s (paid %s, outstanding %s)\n",
            $formatAmount((float) $snapshot['ar_main']),
            $formatAmount((float) $snapshot['ar_main_paid']),
            $formatAmount((float) $snapshot['ar_main_outstanding']),
            $formatAmount((float) $snapshot['ar_debit']),
            $formatAmount((float) $snapshot['ar_debit_paid']),
            $formatAmount((float) $snapshot['ar_debit_outstanding'])
        );
    } else {
        echo "    Tidak ada AR yang linked ke invoice ini.\n";
    }
};

$query = Invoice::query()->orderBy('id');

if ($invoiceIdFilter !== null && $invoiceIdFilter !== '') {
    if (!ctype_digit($invoiceIdFilter)) {
        fwrite(STDERR, "--invoice-id harus numerik.\n");
        exit(1);
    }

    $query->where('id', (int) $invoiceIdFilter);
}

if ($invoiceNumberFilter !== null && $invoiceNumberFilter !== '') {
    $candidates = $normalizeInvoiceCandidates($invoiceNumberFilter);
    $query->where(function (Builder $builder) use ($candidates, $invoiceNumberFilter) {
        foreach ($candidates as $candidate) {
            $builder->orWhere('invoice_number', $candidate);
        }

        if (!empty($invoiceNumberFilter)) {
            $builder->orWhere('invoice_number', 'like', '%' . $invoiceNumberFilter . '%');
        }
    });
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

                if (!empty($soFilter)) {
                    $nested->orWhere('order_number', 'like', '%' . $soFilter . '%');
                }
            });
        });
    });
}

$invoiceIds = $query->pluck('id')->all();

if (empty($invoiceIds)) {
    echo "Tidak ada invoice yang cocok dengan filter.\n";
    exit(0);
}

echo "=== FIX-AR-REIMB-002: REPAIR INVOICE GROSS + AR DOUBLE DEDUCTION ===\n";
echo 'Mode: ' . ($apply ? 'APPLY' : 'DRY-RUN') . "\n";
echo 'Target Invoice: ' . count($invoiceIds) . "\n\n";

$processed = 0;
$changed = 0;
$unchanged = 0;

foreach ($invoiceIds as $invoiceId) {
    ++$processed;

    $beforeSnapshot = [];
    $afterSnapshot = [];
    $repairDetails = [];
    $didChange = false;

    $runner = static function () use (
        $invoiceId,
        &$beforeSnapshot,
        &$afterSnapshot,
        &$repairDetails,
        &$didChange,
        $snapshotInvoice,
        $parseReimbursementIdFromItemRef,
        $approxEqual,
        $determineStatus
    ): void {
        /** @var Invoice $invoice */
        $invoice = Invoice::query()
            ->with(['items', 'accountReceivable.components', 'salesOrder', 'customer'])
            ->findOrFail($invoiceId);

        $beforeSnapshot = $snapshotInvoice($invoice);

        $invoiceItems = $invoice->items
            ->filter(fn (InvoiceItem $item) => strtolower((string) ($item->item_type ?? '')) === 'reimbursement')
            ->values();

        $repairedReimbursementIds = [];

        foreach ($invoiceItems as $invoiceItem) {
            $reimbursementId = $parseReimbursementIdFromItemRef($invoiceItem->item_ref);
            if (!$reimbursementId) {
                continue;
            }

            /** @var ReimbursementItem|null $reimbursement */
            $reimbursement = ReimbursementItem::query()->find($reimbursementId);
            if (!$reimbursement) {
                continue;
            }

            $qty = is_numeric($reimbursement->quantity) && (float) $reimbursement->quantity > 0
                ? (float) $reimbursement->quantity
                : (is_numeric($invoiceItem->quantity) && (float) $invoiceItem->quantity > 0 ? (float) $invoiceItem->quantity : 1.0);

            $currentRate = (float) ($reimbursement->amount ?? 0);
            $currentLineTotal = $currentRate * $qty;
            $customerPaid = max(0, (float) ($reimbursement->customer_paid_amount ?? 0));
            $storedOutstanding = $reimbursement->customer_outstanding_amount !== null
                ? max(0, (float) $reimbursement->customer_outstanding_amount)
                : max(0, $currentLineTotal - min($currentLineTotal, $customerPaid));

            $isCorruptedNet = $customerPaid > 0.01
                && $approxEqual($storedOutstanding, $currentLineTotal)
                && $approxEqual((float) $invoiceItem->amount, $currentLineTotal);

            if (!$isCorruptedNet) {
                continue;
            }

            $correctedGrossLineTotal = $currentLineTotal + $customerPaid;
            $correctedRate = $qty > 0 ? round($correctedGrossLineTotal / $qty, 2) : round($correctedGrossLineTotal, 2);
            $correctedOutstanding = max(0, $correctedGrossLineTotal - min($correctedGrossLineTotal, $customerPaid));
            $correctedCustomerStatus = $determineStatus($correctedGrossLineTotal, $customerPaid);

            $repairDetails[] = [
                'reimbursement_id' => (int) $reimbursement->id,
                'description' => (string) $reimbursement->description,
                'qty' => $qty,
                'before_rate' => $currentRate,
                'before_line_total' => $currentLineTotal,
                'customer_paid' => $customerPaid,
                'before_outstanding' => $storedOutstanding,
                'after_rate' => $correctedRate,
                'after_line_total' => $correctedGrossLineTotal,
                'after_outstanding' => $correctedOutstanding,
            ];

            $reimbursement->amount = $correctedRate;
            $reimbursement->quantity = $qty;
            $reimbursement->customer_outstanding_amount = $correctedOutstanding;
            $reimbursement->customer_payment_status = $correctedCustomerStatus;
            $reimbursement->save();

            $linkedInvoiceItems = $invoice->items->filter(
                fn (InvoiceItem $item) => $parseReimbursementIdFromItemRef($item->item_ref) === (int) $reimbursement->id
            );

            foreach ($linkedInvoiceItems as $linkedInvoiceItem) {
                $linkedInvoiceItem->quantity = $qty;
                $linkedInvoiceItem->rate = $correctedRate;
                $linkedInvoiceItem->amount = $correctedGrossLineTotal;

                $itemPaid = min($correctedGrossLineTotal, max(0, (float) ($linkedInvoiceItem->paid_amount ?? 0)));
                $itemOutstanding = max(0, $correctedGrossLineTotal - $itemPaid);
                $linkedInvoiceItem->paid_amount = $itemPaid;
                $linkedInvoiceItem->outstanding_amount = $itemOutstanding;
                $linkedInvoiceItem->payment_status = $determineStatus($correctedGrossLineTotal, $itemPaid);
                $linkedInvoiceItem->save();
            }

            $repairedReimbursementIds[] = (int) $reimbursement->id;
            $didChange = true;
        }

        if (!$didChange) {
            $afterSnapshot = $beforeSnapshot;
            return;
        }

        $invoice->refresh();
        $invoice->load('items');
        $invoice->calculateTotals();
        $invoice->refresh();
        $invoice->load(['items', 'accountReceivable.components', 'salesOrder', 'customer']);

        $receivable = $invoice->accountReceivable;
        if ($receivable) {
            $receivable->load('components');

            $dueDate = null;
            if ($invoice->term_days) {
                $dueDate = Carbon::parse($invoice->invoice_date)->addDays((int) $invoice->term_days);
            } elseif ($receivable->due_date) {
                $dueDate = Carbon::parse($receivable->due_date);
            }

            $mainAmount = (float) $invoice->items->filter(function (InvoiceItem $item) {
                $type = strtolower((string) ($item->item_type ?? 'billable'));
                return $type === 'billable' || $item->item_type === null;
            })->sum('amount');

            $debitAmount = (float) $invoice->items->filter(function (InvoiceItem $item) {
                return strtolower((string) ($item->item_type ?? '')) === 'reimbursement';
            })->sum('amount');

            $vatAmount = (float) ($invoice->vat_amount ?? 0);

            $componentPayloads = [];
            if ($mainAmount > 0) {
                $componentPayloads['main'] = [
                    'description' => 'Invoice Main',
                    'amount' => $mainAmount,
                ];
            }
            if ($debitAmount > 0) {
                $componentPayloads['debit_note'] = [
                    'description' => 'Debit Note / Reimbursement',
                    'amount' => $debitAmount,
                ];
            }
            if ($vatAmount > 0) {
                $componentPayloads['vat'] = [
                    'description' => 'VAT',
                    'amount' => $vatAmount,
                ];
            }
            if (empty($componentPayloads) && (float) $invoice->total > 0) {
                $componentPayloads['main'] = [
                    'description' => 'Invoice Main',
                    'amount' => (float) $invoice->total,
                ];
            }

            $existingComponents = $receivable->components->keyBy('component_type');
            $processedTypes = [];

            foreach ($componentPayloads as $type => $payload) {
                $processedTypes[] = $type;

                /** @var AccountReceivableComponent $component */
                $component = $existingComponents->get($type) ?? new AccountReceivableComponent([
                    'account_receivable_id' => $receivable->id,
                    'component_type' => $type,
                ]);

                $componentAmount = (float) $payload['amount'];
                $componentPaid = min($componentAmount, max(0, (float) ($component->paid_amount ?? 0)));
                $componentOutstanding = max(0, $componentAmount - $componentPaid);

                $component->account_receivable_id = $receivable->id;
                $component->component_type = $type;
                $component->description = $payload['description'];
                $component->amount = $componentAmount;
                $component->paid_amount = $componentPaid;
                $component->outstanding_amount = $componentOutstanding;
                $component->status = $determineStatus($componentAmount, $componentPaid, $dueDate);
                $component->due_date = $dueDate;
                $component->save();
            }

            if (!empty($processedTypes)) {
                $receivable->components()->whereNotIn('component_type', $processedTypes)->delete();
            }

            $receivable->customer_id = $invoice->customer_id;
            $receivable->customer_name = $invoice->customer?->company_name
                ?? $receivable->customer_name
                ?? $invoice->salesOrder?->customer_name
                ?? 'Unknown Customer';
            $receivable->sales_order_id = $invoice->sales_order_id;
            $receivable->invoice_id = $invoice->id;
            $receivable->invoice_number = $invoice->invoice_number;
            $receivable->invoice_date = $invoice->invoice_date;
            $receivable->due_date = $dueDate;
            $receivable->payment_terms_days = $invoice->term_days;
            $receivable->save();
            $receivable->recalculateTotals(true);
        }

        $invoice->refresh();
        $invoice->load(['items', 'accountReceivable.components', 'salesOrder']);
        $afterSnapshot = $snapshotInvoice($invoice);
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
        echo sprintf(
            "[CHANGED] Invoice %s (#%d) | SO %s\n",
            $beforeSnapshot['invoice_number'],
            $beforeSnapshot['invoice_id'],
            $beforeSnapshot['so_number']
        );
        $printInvoiceSnapshot('Sebelum', $beforeSnapshot);
        foreach ($repairDetails as $detail) {
            echo sprintf(
                "    Reimb#%d %s | gross line %s -> %s | paid %s | outstanding %s -> %s\n",
                $detail['reimbursement_id'],
                $detail['description'],
                $formatAmount((float) $detail['before_line_total']),
                $formatAmount((float) $detail['after_line_total']),
                $formatAmount((float) $detail['customer_paid']),
                $formatAmount((float) $detail['before_outstanding']),
                $formatAmount((float) $detail['after_outstanding'])
            );
        }
        $printInvoiceSnapshot('Sesudah', $afterSnapshot);
    } else {
        ++$unchanged;
        echo sprintf(
            "[UNCHANGED] Invoice %s (#%d) | SO %s | tidak ada reimbursement net yang memenuhi kriteria repair.\n",
            $beforeSnapshot['invoice_number'],
            $beforeSnapshot['invoice_id'],
            $beforeSnapshot['so_number']
        );
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
