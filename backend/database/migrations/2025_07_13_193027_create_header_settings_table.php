<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('header_settings', function (Blueprint $table) {
            $table->id();
            
            // Logo section
            $table->string('logo_image')->default('/logo/logo1.svg');
            $table->string('logo_alt')->default('Logo');
            
            // Search section
            $table->string('search_placeholder')->default('Search products...');
            
            // Navigation links
            $table->json('navigation_links')->nullable(); // Array of navigation links
            
            // Icons section
            $table->json('header_icons')->nullable(); // Array of header icons (wishlist, cart, user)
            
            // Mobile menu
            $table->boolean('mobile_menu_enabled')->default(true);
            
            // Styling
            $table->string('background_color')->default('bg-white');
            $table->string('text_color')->default('text-gray-600');
            $table->string('hover_color')->default('hover:text-red-500');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('header_settings');
    }
};
