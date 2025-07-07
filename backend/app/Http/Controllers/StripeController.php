<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use App\Models\CartItem;

class StripeController extends Controller
{
public function createCheckoutSession(Request $request)
{
    $user = $request->user();

    $cartItems = CartItem::with('product')->where('user_id', $user->id)->get();

    if ($cartItems->isEmpty()) {
        return response()->json(['message' => 'Cart is empty'], 400);
    }

    $lineItems = [];

    foreach ($cartItems as $item) {
        $lineItems[] = [
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => $item->product->title,
                ],
                'unit_amount' => intval($item->product->price * 100), // cents
            ],
            'quantity' => $item->quantity,
        ];
    }

    Stripe::setApiKey(env('STRIPE_SECRET'));

    $session = Session::create([
        'payment_method_types' => ['card'],
        'line_items' => $lineItems,
        'mode' => 'payment',
        // 'currency' => 'usd',
        'success_url' => 'http://localhost:8080/success',
        'cancel_url' => 'http://localhost:8080/cancel',
        'locale' => 'en', // 👈 явно установить язык
    ]);

    return response()->json(['url' => $session->url]);
}

}
