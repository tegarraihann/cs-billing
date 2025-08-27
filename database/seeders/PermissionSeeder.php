<?php

/**
 * FILE 2: database/seeders/PermissionSeeder.php
 * Spatie Permission roles and permissions
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create Permissions
        $permissions = [
            'manage users',
            'manage customers',
            'manage vendors',
            'manage sales orders',
            'manage invoices',
            'manage petty cash',
            'view financial reports',
            'manage website settings',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate([
                'name' => $permission,
                'guard_name' => 'web'
            ]);
        }

        // Create Roles
        $masterAdmin = Role::firstOrCreate([
            'name' => 'master_admin',
            'guard_name' => 'web'
        ]);

        $adminCS = Role::firstOrCreate([
            'name' => 'admin_cs',
            'guard_name' => 'web'
        ]);

        $adminKeuangan = Role::firstOrCreate([
            'name' => 'admin_keuangan',
            'guard_name' => 'web'
        ]);

        // Assign Permissions to Roles
        $masterAdmin->givePermissionTo(Permission::all());
        $adminCS->givePermissionTo(['manage customers', 'manage vendors', 'manage sales orders']);
        $adminKeuangan->givePermissionTo(['manage invoices', 'manage petty cash', 'view financial reports']);
    }
}
