<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
// use App\Models\OrderItem;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Order;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
    
    public function reviews()
{
    return $this->hasMany(Review::class);
}
public function wishlistItems()
{
    return $this->hasMany(Wishlist::class);
}
public function addresses()
{
    return $this->hasMany(Address::class);
}
public function paymentMethods()
{
    return $this->hasMany(PaymentMethod::class);
}
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
    public function cartItems()
{
    return $this->hasMany(CartItem::class);
}
public function notifications() 
{
return $this->hasMany(Notification::class);
}

}
