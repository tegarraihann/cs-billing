<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Schedule prepaid rent amortization daily (idempotent)
Schedule::command('prepaid-rent:amortize')->dailyAt('01:00');

// Schedule equipment depreciation posting daily (idempotent)
Schedule::command('equipment:post-depreciation')->dailyAt('01:30');

// Rollover opening balance bank setiap awal bulan (ambil closing bulan sebelumnya)
Schedule::command('bank:rollover-opening')->monthlyOn(1, '00:10');
