<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class resetScores extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:reset-scores';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Resets all points to 0';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        User::query()->update(["points" => 0]);
        $this->info("Scores have been reset");
    }
}
