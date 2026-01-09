<?php

use App\Console\Commands\CheckLowStock;
use App\Console\Commands\SendDailySalesReport;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(CheckLowStock::class)->hourly();
Schedule::command(SendDailySalesReport::class)->dailyAt('19:00');
