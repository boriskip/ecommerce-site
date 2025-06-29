<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
        $product = Product::create($request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'old_price' => 'nullable|numeric',
            'image' => 'required|string', // путь к изображению или base64
        ]));

        return response()->json($product, 201);
    }
}
