<?php

namespace App\Http\Controllers;

use App\Models\FooterSetting;
use Illuminate\Http\JsonResponse;

class FooterController extends Controller
{
    /**
     * Получить настройки футера для публичного доступа
     */
    public function index(): JsonResponse
    {
        $footer = FooterSetting::first();
        
        if (!$footer) {
            return response()->json([
                'exclusive_title' => 'Exclusive',
                'exclusive_subscribe_text' => 'Subscribe',
                'exclusive_offer_text' => 'Get 10% off your first order',
                'support_title' => 'Support',
                'support_address' => '111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.',
                'support_email' => 'exclusive@gmail.com',
                'support_phone' => '+88015-88888-9999',
                'account_title' => 'Account',
                'account_links' => [
                    ['text' => 'Manage My Account', 'url' => '/account/profile'],
                    ['text' => 'Login / Register', 'url' => '/login'],
                    ['text' => 'Cart', 'url' => '/cart'],
                    ['text' => 'Wishlist', 'url' => '/wishlist'],
                    ['text' => 'Shop', 'url' => '/'],
                ],
                'quick_link_title' => 'Quick Link',
                'quick_links' => [
                    ['text' => 'Privacy Policy', 'url' => '#'],
                    ['text' => 'Terms Of Use', 'url' => '#'],
                    ['text' => 'FAQ', 'url' => '#'],
                    ['text' => 'Contact', 'url' => '/contact'],
                ],
                'download_app_title' => 'Download App',
                'download_app_subtitle' => 'Save $3 with App New User Only',
                'qr_code_image' => '/footer/Qr Code.png',
                'google_play_image' => '/footer/google-app.png',
                'app_store_image' => '/footer/appstore.png',
                'social_links' => [
                    ['platform' => 'Facebook', 'url' => '#', 'icon' => 'FaFacebook'],
                    ['platform' => 'Twitter', 'url' => '#', 'icon' => 'FaTwitter'],
                    ['platform' => 'Instagram', 'url' => '#', 'icon' => 'FaInstagram'],
                    ['platform' => 'LinkedIn', 'url' => '#', 'icon' => 'FaLinkedin'],
                ],
                'copyright_text' => '© Copyright Rimel 2022. All right reserved',
            ]);
        }
        
        return response()->json($footer);
    }
}
