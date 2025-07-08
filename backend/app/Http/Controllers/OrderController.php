<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'address_id' => 'required|exists:addresses,id',
            'payment_method' => 'required|string',
            'items' => 'required|array',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
        ]);

        $user = $request->user();

        $total = 0;
        foreach ($data['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $total += $product->price * $item['quantity'];
        }

        $order = $user->orders()->create([
            'address_id' => $data['address_id'],
            'payment_method' => $data['payment_method'],
            'total_price' => $total,
        ]);
$message = "Order #{$order->id} has been paid successfully.";

$alreadyExists = $user->notifications()
    ->where('type', 'order')
    ->where('message', $message)
    ->exists();

if (!$alreadyExists) {
    $user->notifications()->create([
        'type' => 'order',
        'message' => $message,
    ]);
}


        foreach ($data['items'] as $item) {
            $product = Product::findOrFail($item['product_id']);
            $order->items()->create([
                'product_id' => $product->id,
                'quantity' => $item['quantity'],
                'price' => $product->price,
            ]);
        }

        return response()->json(['order' => $order->load('items')], 201);
    }

    public function completeAfterStripe(Request $request)
    {
        $user = Auth::user();

        $cartItems = $user->cartItems()->with('product')->get();

        $total = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        $order = $user->orders()->create([
            'address_id' => $user->addresses()->latest()->first()->id ?? null,
            'payment_method' => 'card',
            'total_price' => $total,
            'status' => 'paid',
        ]);

$message = "Order #{$order->id} has been paid successfully.";

$user->notifications()->firstOrCreate([
    'message' => $message,
], [
    'type' => 'order',
]);
        foreach ($cartItems as $item) {
            $order->orderItems()->create([
                'product_id' => $item->product_id,
                'quantity' => $item->quantity,
                'price' => $item->product->price,
            ]);
        }

        $user->cartItems()->delete();

        return response()->json(['message' => 'Order completed']);
    }
}
