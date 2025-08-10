<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();

            // Basic Company Info
            $table->string('company_name')->default('PT ESHAKA WIJAYA LOGISTICS');
            $table->text('company_description')->nullable();

            // Images
            $table->string('hero_background_image')->nullable();
            // $table->string('company_logo')->nullable();

            // Hero Section Content
            $table->string('trust_badge_text')->default('Trusted for over 20 Years');

            // Contact Information
            $table->string('contact_phone')->nullable();
            $table->string('contact_email')->nullable();
            $table->string('whatsapp_number')->nullable();

            // SEO Meta Tags
            $table->text('meta_description')->nullable();
            $table->string('meta_keywords')->nullable();

            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('website_settings');
    }
};
