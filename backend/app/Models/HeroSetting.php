<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeroSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'categories',
        'banners',
        'background_color',
        'text_color',
        'accent_color',
        'hover_color',
        'mobile_menu_enabled',
        'mobile_menu_text',
        'mobile_menu_hide_text',
    ];

    protected $casts = [
        'categories' => 'array',
        'banners' => 'array',
        'mobile_menu_enabled' => 'boolean',
    ];
}
