<?php

namespace App\Http\Controllers;

use App\Models\HeaderSetting;
use Illuminate\Http\JsonResponse;

class HeaderController extends Controller
{
    /**
     * Получить настройки хедера для публичного доступа
     */
    public function index(): JsonResponse
    {
        $header = HeaderSetting::first();
        
        if (!$header) {
            return response()->json([
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
        
        return response()->json($header);
    }
}
