<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeroSetting;

class HeroSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeroSetting::create([
            'categories' => [
                ['name' => "Woman's Fashion", 'enabled' => true, 'has_arrow' => true],
                ['name' => "Men's Fashion", 'enabled' => true, 'has_arrow' => true],
                ['name' => 'Electronics', 'enabled' => true, 'has_arrow' => false],
                ['name' => 'Home & Lifestyle', 'enabled' => true, 'has_arrow' => false],
                ['name' => 'Medicine', 'enabled' => true, 'has_arrow' => false],
                ['name' => 'Sports & Outdoor', 'enabled' => true, 'has_arrow' => false],
                ['name' => "Baby's & Toys", 'enabled' => true, 'has_arrow' => false],
                ['name' => 'Groceries & Pets', 'enabled' => true, 'has_arrow' => false],
                ['name' => 'Health & Beauty', 'enabled' => true, 'has_arrow' => false],
            ],
            
            'banners' => [
                [
                    'title' => 'Latest trending',
                    'subtitle' => 'Electronic items',
                    'image' => '/storage/hero/presentation.png',
                    'enabled' => true,
                    'order' => 1
                ],
                [
                    'title' => 'Latest trending',
                    'subtitle' => 'Electronic items',
                    'image' => '/storage/hero/iphone1.png',
                    'enabled' => true,
                    'order' => 2
                ],
                [
                    'title' => 'Latest trending',
                    'subtitle' => 'Electronic items',
                    'image' => '/storage/hero/invest.png',
                    'enabled' => true,
                    'order' => 3
                ],
            ],
            
            'background_color' => 'bg-white',
            'text_color' => 'text-gray-900',
            'accent_color' => 'text-indigo-600',
            'hover_color' => 'hover:text-indigo-800',
            'mobile_menu_enabled' => true,
            'mobile_menu_text' => 'Show Categories',
            'mobile_menu_hide_text' => 'Hide Categories',
        ]);
    }
}
