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
        Schema::create('hero_settings', function (Blueprint $table) {
            $table->id();
            
            // Categories section
            $table->json('categories')->nullable(); // Array of categories
            
            // Banner section
            $table->json('banners')->nullable(); // Array of banner slides
            
            // Styling
            $table->string('background_color')->default('bg-white');
            $table->string('text_color')->default('text-gray-900');
            $table->string('accent_color')->default('text-indigo-600');
            $table->string('hover_color')->default('hover:text-indigo-800');
            
            // Mobile menu settings
            $table->boolean('mobile_menu_enabled')->default(true);
            $table->string('mobile_menu_text')->default('Show Categories');
            $table->string('mobile_menu_hide_text')->default('Hide Categories');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_settings');
    }
};
