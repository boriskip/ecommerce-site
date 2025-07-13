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
        Schema::create('footer_settings', function (Blueprint $table) {
            $table->id();
            
            // Exclusive section
            $table->string('exclusive_title')->default('Exclusive');
            $table->string('exclusive_subscribe_text')->default('Subscribe');
            $table->string('exclusive_offer_text')->default('Get 10% off your first order');
            
            // Support section
            $table->string('support_title')->default('Support');
            $table->text('support_address');
            $table->string('support_email')->default('exclusive@gmail.com');
            $table->string('support_phone')->default('+88015-88888-9999');
            
            // Account section
            $table->string('account_title')->default('Account');
            $table->json('account_links')->nullable(); // Array of account links
            
            // Quick Link section
            $table->string('quick_link_title')->default('Quick Link');
            $table->json('quick_links')->nullable(); // Array of quick links
            
            // Download App section
            $table->string('download_app_title')->default('Download App');
            $table->string('download_app_subtitle')->default('Save $3 with App New User Only');
            $table->string('qr_code_image')->default('/footer/Qr Code.png');
            $table->string('google_play_image')->default('/footer/google-app.png');
            $table->string('app_store_image')->default('/footer/appstore.png');
            
            // Social Media
            $table->json('social_links')->nullable(); // Array of social media links
            
            // Copyright
            $table->string('copyright_text')->default('© Copyright Rimel 2022. All right reserved');
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('footer_settings');
    }
};
