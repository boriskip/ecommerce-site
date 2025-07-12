<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
public function index(Request $request)
{
    return $request->user()->paymentMethods;
}

public function store(Request $request)
{
    $data = $request->validate([
        'card_last4' => 'required|string|max:4',
        'card_brand' => 'required|string',
        'expires' => 'required|string',
        'is_default' => 'sometimes|boolean',
    ]);

    // Создаём и автоматически проставляем user_id
    $paymentMethod = $request->user()->paymentMethods()->create($data);

    return response()->json($paymentMethod, 201);
}

public function destroy($id)
{
    $method = PaymentMethod::findOrFail($id);

    if ($method->user_id !== auth()->id()) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    $method->delete();

    return response()->json(['message' => 'Deleted']);
}

}
