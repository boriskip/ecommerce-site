<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\OrderItem;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
      'user_id',
      'address_id',
      'total_price', 
      'payment_method', 
      'status',
      'status_history'
    ];

        protected $casts = [
        'status_history' => 'array', // ✅ Очень важно для JSON-поля
    ];
    
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function address() {
        return $this->belongsTo(Address::class);
    }

    public function orderItems(): HasMany
     {
        return $this->hasMany(OrderItem::class);
    }
    public function items()
{
    return $this->hasMany(\App\Models\OrderItem::class);
}
}
