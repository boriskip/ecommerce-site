<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log; // необязательно, но можно

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        logger('Fetching products');

        $products = Product::all()->map(function ($product) {
            $product->image_url = $product->image 
                ? asset('storage/' . $product->image) 
                : null;
            return $product;
        });

        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'old_price' => 'nullable|numeric',
            'image' => 'required|file|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $product = new Product($validated);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
            $product->image = $imagePath;
        }

        $product->save();

        logger('VALIDATED IMAGE', $validated);

        return response()->json($product, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'old_price' => 'nullable|numeric',
            'image' => 'nullable|file|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $validated['image'] = $path;
        }

        $product->update($validated);

        return response()->json($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Продукт удалён']);
    }

    /**
     * Публичный список продуктов.
     */
    public function publicIndex()
    {
        $products = Product::latest()
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->take(10)
            ->get();

        return response()->json($products);
    }
}
