<?php

namespace App\Console\Commands;

use App\Services\ProfitLossPeriodService;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class EnsureMonthlyProfitLossPeriod extends Command
{
    protected $signature = 'profit-loss:ensure-monthly
                            {--month= : Bulan target (1-12)}
                            {--year= : Tahun target (YYYY)}
                            {--user-id=1 : User ID untuk created_by}
                            {--dry-run : Simulasi tanpa menyimpan perubahan}';

    protected $description = 'Buat otomatis periode bulanan Income Statement jika belum ada.';

    public function handle(ProfitLossPeriodService $service): int
    {
        $now = now();
        $year = (int) ($this->option('year') ?: $now->year);
        $month = (int) ($this->option('month') ?: $now->month);
        $userId = (int) ($this->option('user-id') ?: 1);
        $dryRun = (bool) $this->option('dry-run');

        if ($month < 1 || $month > 12) {
            $this->error('Nilai --month harus antara 1 sampai 12.');
            return self::FAILURE;
        }

        if ($year < 2000 || $year > 2100) {
            $this->error('Nilai --year tidak valid.');
            return self::FAILURE;
        }

        $targetMonth = Carbon::create($year, $month, 1)->startOfMonth();

        $this->info(sprintf(
            'Memproses periode bulanan %s (%s)...',
            $targetMonth->locale('id')->translatedFormat('F Y'),
            $dryRun ? 'DRY-RUN' : 'APPLY'
        ));

        try {
            if ($dryRun) {
                $result = $service->ensureMonthlyPeriod($targetMonth, $userId, false);
            } else {
                $result = DB::transaction(function () use ($service, $targetMonth, $userId) {
                    return $service->ensureMonthlyPeriod($targetMonth, $userId, true);
                });
            }
        } catch (\Throwable $e) {
            $this->error('Gagal memproses periode: ' . $e->getMessage());
            return self::FAILURE;
        }

        $period = $result['period'];
        $created = (bool) ($result['created'] ?? false);
        $summary = $result['summary'] ?? null;

        $this->line('Period Code : ' . $period->period_code);
        $this->line('Period Name : ' . $period->period_name);
        $this->line('Start Date  : ' . $period->start_date);
        $this->line('End Date    : ' . $period->end_date);

        if (!$created) {
            $this->warn($result['message'] ?? 'Periode sudah ada, tidak ada perubahan.');
            return self::SUCCESS;
        }

        $this->info($result['message'] ?? 'Periode berhasil dibuat.');

        if ($summary !== null) {
            $this->line('Entry Summary:');
            foreach ($summary as $key => $value) {
                $this->line(sprintf('  - %s: %s', $key, $value));
            }
        }

        if ($dryRun) {
            $this->warn('DRY-RUN: tidak ada perubahan yang disimpan.');
        }

        return self::SUCCESS;
    }
}
