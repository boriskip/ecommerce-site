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
                'unit_amount' => intval($item->price * 100), // ← БЕРЁТСЯ ЦЕНА ИЗ КОРЗИНЫ!
            ],
            'quantity' => $item->quantity,
        ];
    }

    Stripe::setApiKey(env('STRIPE_SECRET'));

$session = Session::create([
    'payment_method_types' => ['card'],
    'line_items' => $lineItems,
    'mode' => 'payment',
    'success_url' => 'http://localhost:8080/success?session_id={CHECKOUT_SESSION_ID}', // ❗ Обязательно
    'cancel_url' => 'http://localhost:8080/cancel',
    'locale' => 'en',
    'metadata' => [
        'source' => 'cart', // ✅ Это важно
    ],
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
        $metadata = $session->metadata ?? [];

        // Если заказ уже создан
        if (isset($metadata['order_id'])) {
            $order = Order::findOrFail($metadata['order_id']);
            $order->update(['status' => 'paid']);
            return response()->json(['message' => 'Order marked as paid']);
        }

          if (($metadata['source'] ?? null) === 'cart') {
            // ✅ Оплата из корзины — создаём заказ
            $user = $request->user();
            $cartItems = $user->cartItems()->with('product')->get();

            if ($cartItems->isEmpty()) {
                return response()->json(['message' => 'Cart is empty'], 400);
            }

             $total = $cartItems->sum(fn($item) => $item->product->price * $item->quantity);

        // Если нет order_id — отправить в OrderController
        return app(OrderController::class)->completeAfterStripe($request);

            $order = $user->orders()->create([
                'address_id' => $user->addresses()->latest()->first()->id ?? null,
                'payment_method' => 'card',
                'total_price' => $total,
                'status' => 'paid',
            ]);

   foreach ($cartItems as $item) {
                $order->orderItems()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);
            }

            $user->cartItems()->delete();

            return response()->json(['message' => 'Order created and paid']);
        }

        return response()->json(['message' => 'Missing or invalid metadata'], 400);

    } catch (\Exception $e) {
        return response()->json(['message' => 'Payment failed', 'error' => $e->getMessage()], 500);
    }
}
}
