<?php

use Carbon\Carbon;
use App\Jobs\RecordWinnerJob;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(RecordWinnerJob::dispatch(Carbon::now()->toDateTimeString()))->everyFiveMinutes();