<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('flash_sales', function (Blueprint $table) {
            $table->string('image')->nullable()->after('product_id');
        });
    }

    public function down()
    {
        Schema::table('flash_sales', function (Blueprint $table) {
            $table->dropColumn('image');
        });
    }
};
