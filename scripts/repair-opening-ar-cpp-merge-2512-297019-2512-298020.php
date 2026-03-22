<?php

declare(strict_types=1);

use App\Models\AccountReceivable;
use App\Models\AccountReceivableComponent;
use Illuminate\Support\Facades\DB;

require __DIR__ . '/../vendor/autoload.php';

$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$apply = in_array('--apply', $argv, true);

$cases = [
    [
        'so' => '2512-297019',
        'invoice' => 'EWL2512297019',
        'keeper_id' => 197,
        'stale_ids' => [170, 171],
        'expected_total' => 27771877.00,
        'note' => '[AR CLEANUP] Consolidated stale split opening AR #170 + #171 into final AR #197 based on client receivable list.',
    ],
    [
        'so' => '2512-298020',
        'invoice' => 'EWL2512298020',
        'keeper_id' => 198,
        'stale_ids' => [173, 174],
        'expected_total' => 15693000.00,
        'note' => '[AR CLEANUP] Consolidated stale split opening AR #173 + #174 into final AR #198 based on client receivable list.',
    ],
];

$format = static fn (float $amount): string => number_format($amount, 2, '.', ',');

$assert = static function (bool $condition, string $message): void {
    if (!$condition) {
        throw new RuntimeException($message);
    }
};

$ensureMainComponent = static function (AccountReceivable $receivable, float $expectedTotal): AccountReceivableComponent {
    /** @var AccountReceivableComponent|null $component */
    $component = $receivable->components()->where('component_type', 'main')->first();

    if (!$component) {
        $component = new AccountReceivableComponent([
            'account_receivable_id' => $receivable->id,
            'component_type' => 'main',
        ]);
    }

    $component->description = 'Opening Receivable Main';
    $component->amount = $expectedTotal;
    $component->paid_amount = 0;
    $component->outstanding_amount = $expectedTotal;
    $component->status = 'outstanding';
    $component->due_date = $receivable->due_date;
    $component->save();

    return $component;
};

echo $apply
    ? "Running APPLY for opening AR cleanup.\n\n"
    : "Running DRY-RUN for opening AR cleanup.\n\n";

foreach ($cases as $case) {
    echo "=== SO {$case['so']} / {$case['invoice']} ===\n";

    $keeper = AccountReceivable::with('components')->find($case['keeper_id']);
    $assert($keeper !== null, "Keeper AR #{$case['keeper_id']} not found.");
    $assert((string) $keeper->source_so_number === $case['so'], "Keeper SO mismatch for AR #{$keeper->id}.");
    $assert((string) $keeper->invoice_number === $case['invoice'], "Keeper invoice mismatch for AR #{$keeper->id}.");
    $assert((bool) $keeper->is_opening === true, "Keeper AR #{$keeper->id} is not opening.");
    $assert((float) $keeper->paid_amount === 0.0, "Keeper AR #{$keeper->id} already has paid amount.");
    $assert(abs((float) $keeper->outstanding_amount - $case['expected_total']) < 0.01, "Keeper outstanding mismatch for AR #{$keeper->id}.");

    $staleRecords = AccountReceivable::with('components')
        ->whereIn('id', $case['stale_ids'])
        ->orderBy('id')
        ->get();

    $assert($staleRecords->count() === count($case['stale_ids']), "Not all stale AR records found for SO {$case['so']}.");

    foreach ($staleRecords as $stale) {
        $assert((string) $stale->source_so_number === $case['so'], "Stale SO mismatch for AR #{$stale->id}.");
        $assert((string) $stale->invoice_number === $case['invoice'], "Stale invoice mismatch for AR #{$stale->id}.");
        $assert((bool) $stale->is_opening === true, "Stale AR #{$stale->id} is not opening.");
        $assert((float) $stale->paid_amount === 0.0, "Stale AR #{$stale->id} already has paid amount.");
        $assert(in_array($stale->status, ['outstanding', 'overdue'], true), "Unexpected stale status for AR #{$stale->id}.");
    }

    $staleTotal = (float) $staleRecords->sum('outstanding_amount');
    $assert(abs($staleTotal - $case['expected_total']) < 0.01, "Stale total mismatch for SO {$case['so']}.");

    echo 'keeper: AR#' . $keeper->id . ' out=' . $format((float) $keeper->outstanding_amount) . "\n";
    echo 'stale: ' . $staleRecords->map(fn ($row) => 'AR#' . $row->id . ' out=' . $format((float) $row->outstanding_amount))->implode(', ') . "\n";
    echo 'stale_total: ' . $format($staleTotal) . "\n";

    if (!$apply) {
        echo "action: create/update keeper main component, append cleanup note, delete stale AR records\n\n";
        continue;
    }

    DB::transaction(function () use ($keeper, $staleRecords, $case, $ensureMainComponent): void {
        $keeper = AccountReceivable::with('components')->lockForUpdate()->findOrFail($keeper->id);

        $ensureMainComponent($keeper, (float) $case['expected_total']);

        $keeper->invoice_amount = (float) $case['expected_total'];
        $keeper->paid_amount = 0;
        $keeper->outstanding_amount = (float) $case['expected_total'];
        $keeper->status = 'outstanding';
        $keeper->notes = trim(($keeper->notes ? $keeper->notes . "\n" : '') . $case['note']);
        $keeper->save();

        $keeper->recalculateTotals(true);

        foreach ($staleRecords as $stale) {
            AccountReceivable::query()->findOrFail($stale->id)->delete();
        }
    });

    echo "applied.\n\n";
}

echo "Done.\n";
