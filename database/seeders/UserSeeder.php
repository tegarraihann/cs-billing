<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Master Admin
        User::updateOrCreate(
            ['email' => 'masteradmin@example.com'],
            [
                'name' => 'Master Administrator',
                'email' => 'masteradmin@example.com',
                'phone' => '+62812-3456-7890',
                'password' => Hash::make('password'),
                'role' => 'masteradmin',
                'status' => 'active',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Create Admin CS
        User::updateOrCreate(
            ['email' => 'admincs@example.com'],
            [
                'name' => 'Admin CS',
                'email' => 'cs@example.com',
                'phone' => '+62812-3456-7891',
                'password' => Hash::make('password'),
                'role' => 'admin_cs',
                'status' => 'active',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );

        // Create Admin Keuangan
        User::updateOrCreate(
            ['email' => 'adminkeuangan@example.com'],
            [
                'name' => 'Finance Dept',
                'email' => 'keuangan@example.com',
                'phone' => '+62812-3456-7892',
                'password' => Hash::make('password'),
                'role' => 'admin_keuangan',
                'status' => 'active',
                'is_active' => true,
                'email_verified_at' => now(),
            ]
        );
    }
}
