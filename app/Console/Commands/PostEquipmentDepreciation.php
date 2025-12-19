<?php

namespace App\Console\Commands;

use App\Models\EquipmentDepreciationSchedule;
use App\Models\EquipmentTransaction;
use App\Models\ProfitLossEntry;
use App\Models\ProfitLossPeriod;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class PostEquipmentDepreciation extends Command
{
    protected $signature = 'equipment:post-depreciation';

    protected $description = 'Auto-post equipment depreciation based on schedule';

    public function handle(): int
    {
        $today = Carbon::today();

        $schedules = EquipmentDepreciationSchedule::with('equipmentTransaction')
            ->whereNull('posted_at')
            ->whereDate('schedule_date', '<=', $today->toDateString())
            ->orderBy('schedule_date')
            ->get();

        if ($schedules->isEmpty()) {
            $this->info('No equipment depreciation schedules due.');
            return self::SUCCESS;
        }

        foreach ($schedules as $schedule) {
            $purchase = $schedule->equipmentTransaction;
            if (!$purchase || $purchase->transaction_type !== 'purchase') {
                $this->warn("Schedule {$schedule->id} missing purchase, skipped.");
                continue;
            }

            DB::transaction(function () use ($schedule, $purchase) {
                $depr = EquipmentTransaction::create([
                    'transaction_date' => $schedule->schedule_date,
                    'transaction_type' => 'depreciation',
                    'asset_name' => $purchase->asset_name,
                    'category' => $purchase->category,
                    'amount' => $schedule->amount,
                    'description' => $purchase->description,
                    'source_type' => 'other',
                    'notes' => 'Auto depreciation',
                    'created_by' => 1,
                ]);

                $date = Carbon::parse($schedule->schedule_date)->toDateString();
                $periods = ProfitLossPeriod::where('status', '!=', 'closed')
                    ->where('start_date', '<=', $date)
                    ->where('end_date', '>=', $date)
                    ->get();

                if ($periods->isEmpty()) {
                    $monthStart = Carbon::parse($date)->startOfMonth()->toDateString();
                    $monthEnd = Carbon::parse($date)->endOfMonth()->toDateString();
                    $periods = ProfitLossPeriod::where('status', '!=', 'closed')
                        ->where('start_date', '<=', $monthStart)
                        ->where('end_date', '>=', $monthEnd)
                        ->get();
                }

                foreach ($periods as $period) {
                    $entry = ProfitLossEntry::createFromEquipmentDepreciation($depr, $period->id, 1);
                    if ($entry) {
                        $period->calculateTotals();
                    }
                }

                $schedule->update([
                    'posted_at' => now(),
                    'posted_transaction_id' => $depr->id,
                ]);
            });
        }

        $this->info("Posted {$schedules->count()} equipment depreciation schedule(s).");

        return self::SUCCESS;
    }
}
