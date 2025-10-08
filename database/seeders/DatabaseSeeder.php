<?php

/**
 * FINAL FILE: database/seeders/DatabaseSeeder.php
 * Complete DatabaseSeeder with proper order and reporting
 */

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->command->info('🚀 Starting CS Logistics Database Seeding...');
        $this->command->newLine();

        // STEP 1: Core system data (Users & Permissions)
        $this->command->info('📋 STEP 1: Setting up core system data...');
        $this->call([
            UserSeeder::class,
            PermissionSeeder::class,
        ]);
        $this->command->info('✅ Core system data completed');
        $this->command->newLine();

        // STEP 2: Master data (Customers & Vendors)
        $this->command->info('📋 STEP 2: Creating master data...');
        $this->call([
            CustomerSeeder::class, // Use the updated CustomerSeeder from previous
            VendorSeeder::class,
        ]);
        $this->command->info('✅ Master data completed');
        $this->command->newLine();

        // STEP 3: Business transaction data
        $this->command->info('📋 STEP 3: Generating business transactions...');
        $this->call([
            SalesOrderSeeder::class,
            InvoiceSeeder::class,
            InvoiceItemSeeder::class,
            VoucherSeeder::class,
        ]);
        $this->command->info('✅ Business transaction data completed');
        $this->command->newLine();

        // STEP 4: Financial system data
        $this->command->info('📋 STEP 4: Setting up financial system...');
        $this->call([
            ChartOfAccountSeeder::class,
            ProfitLossPeriodSeeder::class,
            ProfitLossEntrySeeder::class,
        ]);
        $this->command->info('✅ Financial system data completed');
        $this->command->newLine();

        // STEP 5: Petty cash system
        $this->command->info('📋 STEP 5: Initializing petty cash system...');
        $this->call([
            PettyCashCategorySeeder::class,
            ExpenseTemplateSeeder::class,
            SimpleCategoryRuleSeeder::class,
            PettyCashTransactionSeeder::class,
            PettyCashBalanceSeeder::class,
        ]);
        $this->command->info('✅ Petty cash system completed');
        $this->command->newLine();

        // STEP 6: HR system
        $this->command->info('📋 STEP 6: Setting up HR system...');
        $this->call([
            EmployeeSalarySeeder::class,
        ]);
    }
}
