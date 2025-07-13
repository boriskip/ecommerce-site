<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HeaderSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo_image',
        'logo_alt',
        'search_placeholder',
        'navigation_links',
        'header_icons',
        'mobile_menu_enabled',
        'background_color',
        'text_color',
        'hover_color',
    ];

    protected $casts = [
        'navigation_links' => 'array',
        'header_icons' => 'array',
        'mobile_menu_enabled' => 'boolean',
    ];
}
