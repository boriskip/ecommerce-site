<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        return Product::all();
    }

    public function store(Request $request)
    {
    $validated = $request->validate([
        'title' => 'required|string|max:255',
        'price' => 'required|numeric',
        'old_price' => 'nullable|numeric',
        'image' => 'required|file|image|mimes:jpeg,png,jpg,gif|max:2048', 
    ]);
    
    // Сохраняем файл в storage/app/public/products
    if ($request->hasFile('image')) {
        $path = $request->file('image')->store('products', 'public');
        $validated['image'] = $path; // путь до файла в базе
    }

    $product = Product::create($validated);

    return response()->json($product, 201);
    }
        public function update(Request $request, $id)
        {
            $product = Product::findOrFail($id);

             $product->update($request->validate([
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'old_price' => 'nullable|numeric',
            'image' => 'required|string',
        ]));

          return response()->json($product);

        }
        public function destroy($id)
        {
                    $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Продукт удалён']);
        }
}
