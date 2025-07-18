<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function publicIndex(Request $request)
    {
        $query = Product::query();

        // Фильтрация по поисковому запросу
        if ($search = $request->input('search')) {
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Подгружаем отзывы и рейтинг (images убираем!)
        $products = $query
            ->withAvg('reviews', 'rating')
            ->withCount('reviews')
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

