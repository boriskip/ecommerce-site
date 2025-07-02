<?php
// app/Http/Controllers/CartController.php
namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function index()
    {
        $items = CartItem::with('product')
            ->where('user_id', Auth::id())
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
}
