<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FooterSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'exclusive_title',
        'exclusive_subscribe_text',
        'exclusive_offer_text',
        'support_title',
        'support_address',
        'support_email',
        'support_phone',
        'account_title',
        'account_links',
        'quick_link_title',
        'quick_links',
        'download_app_title',
        'download_app_subtitle',
        'qr_code_image',
        'google_play_image',
        'app_store_image',
        'social_links',
        'copyright_text',
    ];

    protected $casts = [
        'account_links' => 'array',
        'quick_links' => 'array',
        'social_links' => 'array',
    ];
}
