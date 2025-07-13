<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\FooterSetting;

class FooterSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        FooterSetting::create([
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
            'qr_code_image' => '/storage/footer/QrCode.png',
            'google_play_image' => '/storage/footer/google-app.png',
            'app_store_image' => '/storage/footer/download-appstore.png',
            
            'social_links' => [
                ['platform' => 'Facebook', 'url' => '#', 'icon' => 'FaFacebook'],
                ['platform' => 'Twitter', 'url' => '#', 'icon' => 'FaTwitter'],
                ['platform' => 'Instagram', 'url' => '#', 'icon' => 'FaInstagram'],
                ['platform' => 'LinkedIn', 'url' => '#', 'icon' => 'FaLinkedin'],
            ],
            
            'copyright_text' => '© Copyright Rimel 2022. All right reserved',
        ]);
    }
}
