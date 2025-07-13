<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HeroSetting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HeroController extends Controller
{
    /**
     * Получить настройки hero секции
     */
    public function index(): JsonResponse
    {
        $hero = HeroSetting::first();
        
        if (!$hero) {
            return response()->json(['message' => 'Hero settings not found'], 404);
        }
        
        return response()->json($hero);
    }

    /**
     * Обновить настройки hero секции
     */
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'categories' => 'required|array',
            'categories.*.name' => 'required|string|max:255',
            'categories.*.enabled' => 'required|boolean',
            'categories.*.has_arrow' => 'required|boolean',
            'banners' => 'required|array',
            'banners.*.title' => 'required|string|max:255',
            'banners.*.subtitle' => 'required|string|max:255',
            'banners.*.image' => 'required|string|max:255',
            'banners.*.enabled' => 'required|boolean',
            'banners.*.order' => 'required|integer|min:1',
            'background_color' => 'required|string|max:255',
            'text_color' => 'required|string|max:255',
            'accent_color' => 'required|string|max:255',
            'hover_color' => 'required|string|max:255',
            'mobile_menu_enabled' => 'required|boolean',
            'mobile_menu_text' => 'required|string|max:255',
            'mobile_menu_hide_text' => 'required|string|max:255',
        ]);

        $hero = HeroSetting::first();
        
        if (!$hero) {
            $hero = new HeroSetting();
        }

        $hero->fill($request->all());
        $hero->save();

        return response()->json([
            'message' => 'Hero settings updated successfully',
            'hero' => $hero
        ]);
    }
}
