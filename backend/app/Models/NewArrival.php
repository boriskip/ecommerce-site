<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewArrival extends Model
{
         protected $fillable = ['title', 'subtitle', 'image'];

    protected $appends = ['image_url'];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('storage/' . $this->image) : null;
    }
}
