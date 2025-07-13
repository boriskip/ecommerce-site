<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeaderSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HeaderController extends Controller
{
    /**
     * Получить настройки хедера
     */
    public function index(): JsonResponse
    {
        $header = HeaderSetting::first();
        
        if (!$header) {
            return response()->json(['message' => 'Header settings not found'], 404);
        }
        
        return response()->json($header);
    }

    /**
     * Обновить настройки хедера
     */
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'logo_image' => 'required|string|max:255',
            'logo_alt' => 'required|string|max:255',
            'search_placeholder' => 'required|string|max:255',
            'navigation_links' => 'required|array',
            'navigation_links.*.text' => 'required|string|max:255',
            'navigation_links.*.url' => 'required|string|max:255',
            'navigation_links.*.enabled' => 'required|boolean',
            'header_icons' => 'required|array',
            'header_icons.*.type' => 'required|string|max:255',
            'header_icons.*.icon' => 'required|string|max:255',
            'header_icons.*.url' => 'required|string|max:255',
            'header_icons.*.enabled' => 'required|boolean',
            'header_icons.*.show_badge' => 'required|boolean',
            'header_icons.*.badge_count' => 'required|integer|min:0',
            'mobile_menu_enabled' => 'required|boolean',
            'background_color' => 'required|string|max:255',
            'text_color' => 'required|string|max:255',
            'hover_color' => 'required|string|max:255',
        ]);

        $header = HeaderSetting::first();
        
        if (!$header) {
            $header = new HeaderSetting();
        }

        $header->fill($request->all());
        $header->save();

        return response()->json([
            'message' => 'Header settings updated successfully',
            'header' => $header
        ]);
    }
}
