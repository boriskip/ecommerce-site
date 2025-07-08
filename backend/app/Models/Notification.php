<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    protected $fillable = ['type', 'message', 'read', 'read_at'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
