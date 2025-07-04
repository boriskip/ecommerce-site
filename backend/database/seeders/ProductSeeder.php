<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['title' => 'Car Gadget',      'price' => 199, 'old_price' => 249, 'image' => 'products/car.png'],
            ['title' => 'Gamepad Pro',     'price' => 89,  'old_price' => 109, 'image' => 'products/gamepad.png'],
            ['title' => 'Warm Jacke',      'price' => 299, 'old_price' => 359, 'image' => 'products/jacke.png'],
            ['title' => 'Notebook Pro 15', 'price' => 899, 'old_price' => 999, 'image' => 'products/notebook.png'],
            ['title' => 'Retro Camera',    'price' => 199, 'old_price' => 249, 'image' => 'products/retrophoto.png'],
            ['title' => 'Sports Shoes',    'price' => 129, 'old_price' => 159, 'image' => 'products/sportshos.png'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
