<?php

namespace App\Jobs;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;

class QrCodeAddressJob implements ShouldQueue
{
    use Queueable;

    protected $address;

    /**
     * Create a new job instance.
     */
    public function __construct($address)
    {
        $this->address = $address;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $this->address = preg_replace('/\s+/', '+', $this->address);
        $url = "https://api.qrserver.com/v1/create-qr-code/?data=" . $this->address . "&size=100x100";
        $qrImage = file_get_contents($url);
        $this->address = str_replace(".", "", $this->address);
        $filename = $this->address . ".png";
        Storage::disk('local')->put($filename,$qrImage);
    }
}
