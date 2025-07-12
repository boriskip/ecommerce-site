<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Notification;

class OrderController extends Controller
{
    public function index(Request $request)
{
    $user = $request->user();

    $orders = $user->orders()
        ->with(['orderItems.product', 'address']) // Загрузка связанных моделей
        ->orderBy('created_at', 'desc')
        ->get();

    return response()->json(['orders' => $orders]);
}
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
            'status' => 'pending',
        ]);
$message = "Order #{$order->id} placed. Awaiting cash payment.";

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

        $user->cartItems()->delete();

        return response()->json(['order' => $order->load('items')], 201);
    }

public function completeAfterStripe(Request $request)
{
    $user = Auth::user();

    // ✅ Проверка: есть ли уже свежий заказ со статусом paid
    $existingOrder = $user->orders()
        ->where('status', 'paid')
        ->where('created_at', '>=', now()->subMinutes(2))
        ->latest()
        ->first();

    if ($existingOrder) {
        return response()->json([
            'message' => 'Order already completed recently',
            'order_id' => $existingOrder->id
        ], 200);
    }

    // 🛒 Получение товаров из корзины
    $cartItems = $user->cartItems()->with('product')->get();

    if ($cartItems->isEmpty()) {
        return response()->json(['message' => 'Cart is empty'], 400);
    }

    // 💵 Подсчёт суммы
    $total = $cartItems->sum(function ($item) {
        return $item->product->price * $item->quantity;
    });

    // 📦 Создание заказа
    $order = $user->orders()->create([
        'address_id' => $user->addresses()->latest()->first()->id ?? null,
        'payment_method' => 'card',
        'total_price' => $total,
        'status' => 'paid',
    ]);

    // 🔔 Уведомление
    $message = "Order #{$order->id} has been paid successfully.";

    $user->notifications()->firstOrCreate([
        'message' => $message,
    ], [
        'type' => 'order',
    ]);

    // 🧾 Создание позиций заказа
    foreach ($cartItems as $item) {
        $order->orderItems()->create([
            'product_id' => $item->product_id,
            'quantity' => $item->quantity,
            'price' => $item->product->price,
        ]);
    }

    // 🧹 Очистка корзины
    $user->cartItems()->delete();

    return response()->json(['message' => 'Order completed']);
}
public function payWithCard(Request $request, Order $order)
{
    $user = $request->user();

    // Авторизация
    if ($order->user_id !== $user->id) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    // Можно оплатить только pending заказ с cash
    if ($order->status !== 'pending' || $order->payment_method !== 'cash') {
        return response()->json(['error' => 'Order cannot be paid'], 400);
    }

    // 💳 Инициализация Stripe (или заглушка)
    try {
        // Тут может быть Stripe Checkout Session или просто обновление статуса
        $order->update([
            'status' => 'paid',
            'payment_method' => 'card',
        ]);

        $message = "Order #{$order->id} has been paid successfully.";

        $user->notifications()->firstOrCreate([
            'message' => $message,
        ], [
            'type' => 'order',
        ]);

        return response()->json(['message' => 'Order paid successfully']);
    } catch (\Throwable $e) {
        Log::error('Failed to pay order', ['error' => $e->getMessage()]);
        return response()->json(['error' => 'Payment failed'], 500);
    }
}
public function cancel(Request $request, $id)
{
    try {
        $order = Order::where('id', $id)->where('user_id', auth()->id())->firstOrFail();

        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Only pending orders can be cancelled'], 400);
        }

        $order->update(['status' => 'cancelled']);

        $order->status_history = array_merge($order->status_history ?? [], [
            ['status' => 'cancelled', 'timestamp' => now()],
        ]);
        $order->save();

        Notification::create([
            'user_id' => auth()->id(),
            'message' => "❌ Order #{$order->id} has been cancelled.",
        ]);

        return response()->json(['message' => 'Order cancelled']);
    } catch (\Throwable $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}
