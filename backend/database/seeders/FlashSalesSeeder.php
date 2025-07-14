<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FlashSale;
use App\Models\Product;
use Carbon\Carbon;

class FlashSalesSeeder extends Seeder
{
    public function run()
    {
        $data = [
            [
                'product_id' => 2,
                'price' => 79.00,
                'old_price' => 89.00,
                'discount' => 11,
                'rating' => 4.5,
                'reviews' => 88,
            ],
            [
                'product_id' => 3,
                'price' => 1.00,
                'old_price' => 2.00,
                'discount' => 50,
                'rating' => 4.2,
                'reviews' => 12,
            ],
            [
                'product_id' => 4,
                'price' => 99.99,
                'old_price' => 111.99,
                'discount' => 11,
                'rating' => 4.7,
                'reviews' => 33,
            ],
            [
                'product_id' => 5,
                'price' => 149.99,
                'old_price' => 199.99,
                'discount' => 25,
                'rating' => 4.8,
                'reviews' => 21,
            ],
            // ... добавьте остальные товары по аналогии
        ];

        foreach ($data as $item) {
            $product = \App\Models\Product::find($item['product_id']);
            if ($product) {
                \App\Models\FlashSale::create([
                    'product_id' => $item['product_id'],
                    'price' => $item['price'],
                    'old_price' => $item['old_price'],
                    'discount' => $item['discount'],
                    'rating' => $item['rating'],
                    'reviews' => $item['reviews'],
                    'starts_at' => \Carbon\Carbon::now()->subHour(),
                    'ends_at' => \Carbon\Carbon::now()->addHours(10),
                ]);
                echo "Добавлен Flash Sale для продукта: {$product->title}\n";
            } else {
                echo "Не найден продукт с ID {$item['product_id']}\n";
            }
        }
    }
}
