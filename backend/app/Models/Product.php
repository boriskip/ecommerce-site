<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;
    
     protected $fillable = ['title', 'price', 'old_price', 'image'];

     public function reviews()
{
    return $this->hasMany(Review::class);
}

}
