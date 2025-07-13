<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\FooterSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FooterController extends Controller
{
    /**
     * Получить настройки футера
     */
    public function index(): JsonResponse
    {
        $footer = FooterSetting::first();
        
        if (!$footer) {
            return response()->json(['message' => 'Footer settings not found'], 404);
        }
        
        return response()->json($footer);
    }

    /**
     * Обновить настройки футера
     */
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'exclusive_title' => 'required|string|max:255',
            'exclusive_subscribe_text' => 'required|string|max:255',
            'exclusive_offer_text' => 'required|string|max:255',
            'support_title' => 'required|string|max:255',
            'support_address' => 'required|string',
            'support_email' => 'required|email',
            'support_phone' => 'required|string|max:255',
            'account_title' => 'required|string|max:255',
            'account_links' => 'required|array',
            'account_links.*.text' => 'required|string|max:255',
            'account_links.*.url' => 'required|string|max:255',
            'quick_link_title' => 'required|string|max:255',
            'quick_links' => 'required|array',
            'quick_links.*.text' => 'required|string|max:255',
            'quick_links.*.url' => 'required|string|max:255',
            'download_app_title' => 'required|string|max:255',
            'download_app_subtitle' => 'required|string|max:255',
            'qr_code_image' => 'required|string|max:255',
            'google_play_image' => 'required|string|max:255',
            'app_store_image' => 'required|string|max:255',
            'social_links' => 'required|array',
            'social_links.*.platform' => 'required|string|max:255',
            'social_links.*.url' => 'required|string|max:255',
            'social_links.*.icon' => 'required|string|max:255',
            'copyright_text' => 'required|string|max:255',
        ]);

        $footer = FooterSetting::first();
        
        if (!$footer) {
            $footer = new FooterSetting();
        }

        $footer->fill($request->all());
        $footer->save();

        return response()->json([
            'message' => 'Footer settings updated successfully',
            'footer' => $footer
        ]);
    }
}
