<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Super Admin
        User::factory()->create([
            'name' => 'Master Admin',
            'email' => 'masteradmin@example.com',
            'password' => Hash::make('password'),
            'role' => 'masteradmin',
            'status' => 'active',
        ]);

        // Create Admin CS
        User::factory()->create([
            'name' => 'Admin CS',
            'email' => 'CS@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin_cs',
            'status' => 'active',
        ]);

        // Create Admin Keuangan
        User::factory()->create([
            'name' => 'Admin Keuangan',
            'email' => 'keuangan@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin_keuangan',
            'status' => 'active',
        ]);
    }
}
