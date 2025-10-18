<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('master_package_units', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('name', 50);
            $table->string('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        // Insert default data
        DB::table('master_package_units')->insert([
            ['code' => 'BAG', 'name' => 'Bag', 'description' => 'Standard bag packaging', 'is_active' => true, 'sort_order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'CTN', 'name' => 'Carton', 'description' => 'Carton box packaging', 'is_active' => true, 'sort_order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'PLT', 'name' => 'Pallet', 'description' => 'Pallet packaging', 'is_active' => true, 'sort_order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'BOX', 'name' => 'Box', 'description' => 'Box packaging', 'is_active' => true, 'sort_order' => 4, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'DRM', 'name' => 'Drum', 'description' => 'Drum packaging', 'is_active' => true, 'sort_order' => 5, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'PCK', 'name' => 'Package', 'description' => 'General package', 'is_active' => true, 'sort_order' => 6, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'PCS', 'name' => 'Pieces', 'description' => 'Individual pieces', 'is_active' => true, 'sort_order' => 7, 'created_at' => now(), 'updated_at' => now()],
            ['code' => 'SET', 'name' => 'Set', 'description' => 'Set of items', 'is_active' => true, 'sort_order' => 8, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('master_package_units');
    }
};