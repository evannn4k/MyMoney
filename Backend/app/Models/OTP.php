<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Attributes\Guarded;
use Illuminate\Database\Eloquent\Model;

#[Guarded([])]

class OTP extends Model
{
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
