<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashSale extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'image',
        'price',
        'old_price',
        'discount',
        'rating',
        'reviews',
        'starts_at',
        'ends_at',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
} 