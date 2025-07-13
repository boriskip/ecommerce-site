<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\HeaderSetting;

class HeaderSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HeaderSetting::create([
            'logo_image' => '/storage/header/logo1.svg',
            'logo_alt' => 'Logo',
            
            'search_placeholder' => 'Search products...',
            
            'navigation_links' => [
                ['text' => 'Home', 'url' => '/', 'enabled' => true],
                ['text' => 'Contact', 'url' => '/contact', 'enabled' => true],
                ['text' => 'About', 'url' => '/about', 'enabled' => true],
                ['text' => 'Sign Up', 'url' => '/signup', 'enabled' => true],
            ],
            
            'header_icons' => [
                [
                    'type' => 'wishlist',
                    'icon' => 'Heart',
                    'url' => '/wishlist',
                    'enabled' => true,
                    'show_badge' => true,
                    'badge_count' => 2
                ],
                [
                    'type' => 'cart',
                    'icon' => 'ShoppingCart',
                    'url' => '/cart',
                    'enabled' => true,
                    'show_badge' => true,
                    'badge_count' => 0
                ],
                [
                    'type' => 'user',
                    'icon' => 'User',
                    'url' => '#',
                    'enabled' => true,
                    'show_badge' => true,
                    'badge_count' => 0
                ]
            ],
            
            'mobile_menu_enabled' => true,
            'background_color' => 'bg-white',
            'text_color' => 'text-gray-600',
            'hover_color' => 'hover:text-red-500',
        ]);
    }
}
