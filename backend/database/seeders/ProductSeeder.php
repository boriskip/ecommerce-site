<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            ['title' => 'Car Gadget',      'price' => 199, 'old_price' => 249, 'image' => '/images/products/car.png'],
            ['title' => 'Gamepad Pro',     'price' => 89,  'old_price' => 109, 'image' => '/images/products/gamepad.png'],
            ['title' => 'Warm Jacke',      'price' => 299, 'old_price' => 359, 'image' => '/images/products/jacke.png'],
            ['title' => 'Notebook Pro 15', 'price' => 899, 'old_price' => 999, 'image' => '/images/products/notebook.png'],
            ['title' => 'Retro Camera',    'price' => 199, 'old_price' => 249, 'image' => '/images/products/retrophoto.png'],
            ['title' => 'Sports Shoes',    'price' => 129, 'old_price' => 159, 'image' => '/images/products/sportshos.png'],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
