<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; 
use App\Models\CartItem;
use App\Models\Order;

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
public function payOrderWithStripe(Request $request)
{
    $user = $request->user();
    $orderId = $request->input('order_id');

    $order = $user->orders()->with('orderItems.product')->findOrFail($orderId);

    if ($order->status !== 'pending') {
        return response()->json(['message' => 'Order already paid or cancelled'], 400);
    }

    Stripe::setApiKey(env('STRIPE_SECRET'));

    $lineItems = $order->orderItems->map(function ($item) {
        return [
            'price_data' => [
                'currency' => 'eur',
                'product_data' => [
                    'name' => $item->product->title,
                ],
                'unit_amount' => intval($item->price * 100),
            ],
            'quantity' => $item->quantity,
        ];
    })->toArray();

    $session = Session::create([
        'payment_method_types' => ['card'],
        'line_items' => $lineItems,
        'mode' => 'payment',
        'success_url' => 'http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => 'http://localhost:8080/cancel',
        'locale' => 'en',
        'metadata' => [
        'order_id' => $order->id ?? null,
        ],
    ]);

    return response()->json(['url' => $session->url]);
}
public function completeCheckout(Request $request)
{
    $sessionId = $request->input('session_id');

    if (!$sessionId) {
        return response()->json(['message' => 'Missing session_id'], 400);
    }

    Stripe::setApiKey(env('STRIPE_SECRET'));

    try {
        $session = Session::retrieve($sessionId);
        $orderId = $session->metadata['order_id'] ?? null;

        if (!$orderId) {
            return response()->json(['message' => 'Missing order_id'], 400);
        }

        $order = Order::findOrFail($orderId);
        $order->status = 'paid';
        $order->save();

        return response()->json(['message' => 'Order marked as paid']);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error completing payment', 'error' => $e->getMessage()], 500);
    }
}
}
