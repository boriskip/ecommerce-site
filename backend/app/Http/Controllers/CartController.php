<?php
// app/Http/Controllers/CartController.php
namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index(Request $request)
    {
    $user = $request->user();

    $items = CartItem::with('product') // загрузить связанные продукты
                ->where('user_id', $request->user()->id)
                ->get();

        return response()->json($items);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity'   => 'required|integer|min:1',
        ]);

        $item = CartItem::updateOrCreate(
            ['user_id' => Auth::id(), 'product_id' => $request->product_id],
            ['quantity' => $request->quantity]
        );

        return response()->json(['message' => 'Item added to cart', 'item' => $item]);
    }

    public function destroy($id)
    {
        CartItem::where('id', $id)->where('user_id', Auth::id())->delete();

        return response()->json(['message' => 'Item removed from cart']);
    }

    public function update(Request $request, $id)
{
    $cartItem = CartItem::where('id', $id)
        ->where('user_id', auth()->id())
        ->first();

    if (!$cartItem) {
        return response()->json(['message' => 'Not found'], 404);
    }

    $cartItem->quantity = $request->input('quantity', 1);
    $cartItem->save();

    return response()->json(['message' => 'Quantity updated']);
}
public function clear()
{
      $user = auth()->user();
    CartItem::where('user_id', $user->id)->delete();
    return response()->json(['message' => 'Cart cleared']);
}
}
