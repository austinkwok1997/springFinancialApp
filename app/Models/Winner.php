<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Winner extends Model
{
    protected $fillable = [
        'user_id',
        'winning_score',
        'winning_time'
    ];
}
