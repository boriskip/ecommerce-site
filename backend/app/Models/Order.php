<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['user_id', 'address_id', 'total_price', 'payment_method', 'status'];
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function address() {
        return $this->balongsTo(Address::class);
    }

    public function items() {
        return $this->hasMany(OrderItem::class);
    }
}
