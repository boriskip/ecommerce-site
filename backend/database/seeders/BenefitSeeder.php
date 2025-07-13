<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BenefitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('benefits')->insert([
    [
        'icon' => 'Truck',
        'title' => 'FREE AND FAST DELIVERY',
        'subtitle' => 'Free delivery for all orders over $140',
    ],
    [
        'icon' => 'Headphones',
        'title' => '24/7 CUSTOMER SERVICE',
        'subtitle' => 'Friendly 24/7 customer support',
    ],
    [
        'icon' => 'RotateCcw',
        'title' => 'MONEY BACK GUARANTEE',
        'subtitle' => 'We return money within 30 days',
    ],
]);

    }
}
