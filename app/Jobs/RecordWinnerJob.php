<?php

namespace App\Jobs;

use App\Models\User;
use App\Models\Winner;
use Illuminate\Support\Facades\Log;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecordWinnerJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        Log::info('hello');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $users = User::all();
        Log::info($users);
        if(!empty($users)){
            $maxValue = $users[0]["points"];
            $userId = $users[0]["id"];
            $countMax = 0;
            foreach($users as $user){
                if($user["points"] > $maxValue){
                    $maxValue = $user["points"];
                    $userId = $user["id"];
                    $countMax = 1;
                }else if($user["points"] === $maxValue){
                    $countMax++;
                }
            }
            Log::info($maxValue);
            Log::info($countMax);
            if($countMax === 1){
                Winner::create(["user_id" => $userId, "winning_score" => $maxValue]);
            }
        }
    }
}
