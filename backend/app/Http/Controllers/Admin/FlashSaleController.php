<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FlashSale;
use App\Models\Product;
use Illuminate\Http\Request;

class FlashSaleController extends Controller
{
    // Получить все flash sales
    public function index()
    {
        $flashSales = FlashSale::with('product')->orderByDesc('starts_at')->get();
        return response()->json($flashSales);
    }

    // Создать новую flash sale
    public function store(Request $request)
    {
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'price' => 'required|numeric',
            'old_price' => 'required|numeric', // теперь обязательное
            'discount' => 'required|integer|min:0|max:100',
            'rating' => 'required|numeric|min:0|max:5',
            'reviews' => 'required|integer|min:0',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date|after:starts_at',
            // 'image' => 'nullable', // если не нужен баннер, можно убрать
        ]);

        if ($data['price'] != round($data['old_price'] - ($data['old_price'] * $data['discount'] / 100), 2)) {
            return response()->json(['message' => 'Цена не соответствует скидке'], 422);
        }

        $flashSale = FlashSale::create($data);
        return response()->json($flashSale->load('product'), 201);
    }

    // Получить одну flash sale
    public function show($id)
    {
        $flashSale = FlashSale::with('product')->findOrFail($id);
        return response()->json($flashSale);
    }

    // Обновить flash sale
    public function update(Request $request, $id)
    {
        $flashSale = FlashSale::findOrFail($id);
        $data = $request->validate([
            'product_id' => 'required|exists:products,id',
            'price' => 'required|numeric',
            'old_price' => 'nullable|numeric',
            'discount' => 'required|integer',
            'rating' => 'required|numeric|min:0|max:5',
            'reviews' => 'required|integer|min:0',
            'starts_at' => 'required|date',
            'ends_at' => 'required|date|after:starts_at',
        ]);
        $flashSale->update($data);
        return response()->json($flashSale->load('product'));
    }

    // Удалить flash sale
    public function destroy($id)
    {
        $flashSale = FlashSale::findOrFail($id);
        $flashSale->delete();
        return response()->json(['message' => 'Flash sale deleted']);
    }
} 