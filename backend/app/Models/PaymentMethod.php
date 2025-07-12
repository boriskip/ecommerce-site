<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentMethod extends Model
{
       protected $fillable = [
        'card_last4',
        'card_brand', 
        'expires',
         'is_default'];

    public function user()
    {
        return $this->belongsTo(User::class);
    
}
}