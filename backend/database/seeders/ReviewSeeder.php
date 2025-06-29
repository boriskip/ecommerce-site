<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Product;
use App\Models\Review;

class ReviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $products = Product::all();


        foreach ($products as $product) {
            foreach ($users->random(2) as $user) { // 2 случайных отзыва на продукт
                Review::create([
                    'user_id' => $user->id,
                    'product_id' => $product->id,
                    'rating' => rand(3, 5),
                    'comment' => 'Пример отзыва от ' . $user->name,
                ]);
            }
        }
    }
}
