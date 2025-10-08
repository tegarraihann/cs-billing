@echo off
echo ========================================
echo DEPLOYING EXPENSE TEMPLATES SYSTEM
echo ========================================
echo.

echo Step 1: Running migrations...
php artisan migrate --path=database/migrations/2025_01_07_100000_create_expense_templates_table.php
php artisan migrate --path=database/migrations/2025_01_07_100001_create_simple_category_rules_table.php
php artisan migrate --path=database/migrations/2025_01_07_100002_add_template_fields_to_petty_cash_transactions.php

echo.
echo Step 2: Running seeders...
php artisan db:seed --class=ExpenseTemplateSeeder
php artisan db:seed --class=SimpleCategoryRuleSeeder

echo.
echo Step 3: Clearing cache...
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo.
echo ========================================
echo DEPLOYMENT COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo You can now use the enhanced expense categorization system:
echo - Template-based categorization
echo - Keyword matching
echo - Auto-generation from invoice operational costs
echo.
echo API Endpoints available:
echo - GET /admin-keuangan/api/expense-templates/by-category
echo - POST /admin-keuangan/api/expense-templates/check-keywords
echo - GET /admin-keuangan/api/expense-templates/popular
echo.
pause