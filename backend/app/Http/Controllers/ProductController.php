<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function publicIndex()
    {
        $products = Product::latest()
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
            ->take(10)
            ->get()
             ->map(function ($product) {
            $product->image_url = $product->image 
                ? asset('storage/' . $product->image)
                : null;
            return $product;
        });

        return response()->json($products);
    }

    public function index()
    {
        return Product::withAvg('reviews', 'rating')
                      ->withCount('reviews')
                      ->paginate(20); // если нужен полный список
    }

    public function show($id)
    {
        $product = Product::withAvg('reviews', 'rating')
                          ->withCount('reviews')
                          ->with('reviews.user')
                          ->findOrFail($id);

        return response()->json($product);
    }
}

