<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Admin\MasterAdmin\WebsiteSettingsController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// ========== SUBDOMAIN CONFIGURATION (COMMENTED OUT) ==========
// Uncomment this section if you want to use subdomain separation for admin login
/*
// ADMIN SUBDOMAIN - HANYA LOGIN & DASHBOARD
Route::domain('admineshaka.akmalicode.site')->group(function () {
    // Root redirect ke login
    Route::get('/', function () {
        return redirect()->route('login');
    });

    // Authentication routes (login, logout, dll)
    require __DIR__ . '/auth.php';

    // Dashboard redirect setelah login
    Route::middleware('auth')->get('/dashboard', function () {
        $user = auth()->user();
        switch ($user->role) {
            case 'masteradmin':
                return redirect()->route('masteradmin.dashboard');
            case 'admin_cs':
                return redirect()->route('admin-cs.dashboard');
            case 'admin_keuangan':
                return redirect()->route('admin-keuangan.dashboard');
            default:
                return redirect('https://demo.akmalicode.site');
        }
    })->name('dashboard');

    // Block semua route lain - redirect ke login
    Route::fallback(function () {
        return redirect()->route('login');
    });
});

// LANDING PAGE SUBDOMAIN - CUSTOMER FACING
Route::domain('demo.akmalicode.site')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::get('/about', [HomeController::class, 'about'])->name('about');
    Route::get('/services', [HomeController::class, 'services'])->name('services');
    Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
    Route::post('/contact', [HomeController::class, 'submitContact'])->name('contact.submit');

    // Show halaman login tidak tersedia
    Route::get('/login', function () {
        return view('errors.login-not-available');
    });
});
*/

// ========== STANDARD ROUTING (ACTIVE) ==========
// PUBLIC ROUTES (Frontend dinamis)
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/services', [HomeController::class, 'services'])->name('services');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::post('/contact', [HomeController::class, 'submitContact'])->name('contact.submit');

// AUTHENTICATION ROUTES
require __DIR__ . '/auth.php';

// REDIRECT AFTER LOGIN
Route::middleware('auth')->get('/dashboard', function () {
    $user = auth()->user();

    switch ($user->role) {
        case 'masteradmin':
            return redirect()->route('masteradmin.dashboard');
        case 'admin_cs':
            return redirect()->route('admin-cs.dashboard');
        case 'admin_keuangan':
            return redirect()->route('admin-keuangan.dashboard');
        default:
            return redirect()->route('home');
    }
})->name('dashboard');

// MASTER ADMIN ROUTES
Route::middleware(['auth', 'role:masteradmin'])->prefix('master-admin')->name('masteradmin.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Statistik untuk Master Admin
        $totalUsers = \App\Models\User::count();
        $totalServices = \App\Models\Service::count();
        $totalTeamMembers = \App\Models\TeamMember::count();
        $activeServices = \App\Models\Service::where('is_active', true)->count();

        return Inertia::render('Admin/MasterAdmin/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
            'stats' => [
                'totalUsers' => $totalUsers,
                'totalServices' => $totalServices,
                'totalTeamMembers' => $totalTeamMembers,
                'activeServices' => $activeServices,
            ]
        ]);
    })->name('dashboard');

    // User Management Routes
    Route::prefix('users')->name('users.')->controller(\App\Http\Controllers\Admin\MasterAdmin\UserController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/search', 'search')->name('search');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{user}', 'show')->name('show');
        Route::get('/{user}/edit', 'edit')->name('edit');
        Route::put('/{user}', 'update')->name('update');
        Route::delete('/{user}', 'destroy')->name('destroy');
        Route::post('/{user}/toggle-status', 'toggleStatus')->name('toggle-status');
    });

    // Employee Management Routes
    Route::prefix('employees')->name('employees.')->controller(\App\Http\Controllers\Admin\MasterAdmin\EmployeeController::class)->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/search', 'search')->name('search');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{employee}', 'show')->name('show');
        Route::get('/{employee}/edit', 'edit')->name('edit');
        Route::put('/{employee}', 'update')->name('update');
        Route::delete('/{employee}', 'destroy')->name('destroy');
        Route::post('/{employee}/toggle-status', 'toggleStatus')->name('toggle-status');
    });

    // Website Settings Routes - UPDATED STRUCTURE
    Route::prefix('website-settings')->name('website-settings.')->group(function () {

        // Pengaturan Umum Routes
        Route::prefix('pengaturan-umum')->name('pengaturan-umum.')->group(function () {
            Route::get('/', function () {
                $settings = \App\Models\WebsiteSettings::first();
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/PengaturanUmum/Index', [
                    'settings' => $settings
                ]);
            })->name('index');

            Route::put('/', [WebsiteSettingsController::class, 'updateSettings'])->name('update');
        });

        // Main Services Routes
        Route::prefix('services')->name('services.')->group(function () {
            Route::get('/', function () {
                $services = \App\Models\Service::orderBy('order_index')->get();
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Service/Index', [
                    'services' => $services
                ]);
            })->name('index');

            Route::get('/create', function () {
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Service/create');
            })->name('create');

            Route::post('/', [WebsiteSettingsController::class, 'createService'])->name('store');

            Route::get('/{service}/edit', function (\App\Models\Service $service) {
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Service/edit', [
                    'service' => $service
                ]);
            })->name('edit');

            Route::put('/{service}', [WebsiteSettingsController::class, 'updateService'])->name('update');
            Route::patch('/{service}/toggle-status', [WebsiteSettingsController::class, 'toggleServiceStatus'])->name('toggle-status');
            Route::delete('/{service}', [WebsiteSettingsController::class, 'deleteService'])->name('destroy');
        });

        // Support Services Routes
        Route::prefix('support-services')->name('support-services.')->group(function () {
            Route::get('/', [WebsiteSettingsController::class, 'supportServiceIndex'])->name('index');
            Route::get('/create', [WebsiteSettingsController::class, 'supportServiceCreate'])->name('create');
            Route::post('/', [WebsiteSettingsController::class, 'createSupportService'])->name('store');
            Route::get('/{supportService}/edit', [WebsiteSettingsController::class, 'supportServiceEdit'])->name('edit');
            Route::put('/{supportService}', [WebsiteSettingsController::class, 'updateSupportService'])->name('update');
            Route::patch('/{supportService}/toggle-status', [WebsiteSettingsController::class, 'toggleSupportServiceStatus'])->name('toggle-status');
            Route::delete('/{supportService}', [WebsiteSettingsController::class, 'deleteSupportService'])->name('destroy');
        });

        // Team Routes
        Route::prefix('team')->name('team.')->group(function () {
            Route::get('/', function () {
                $teamMembers = \App\Models\TeamMember::orderBy('order_index')->get();
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Team/Index', [
                    'teamMembers' => $teamMembers
                ]);
            })->name('index');

            Route::get('/create', function () {
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Team/Create');
            })->name('create');

            Route::post('/', [WebsiteSettingsController::class, 'createTeamMember'])->name('store');

            Route::get('/{teamMember}/edit', function (\App\Models\TeamMember $teamMember) {
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Team/Edit', [
                    'member' => $teamMember
                ]);
            })->name('edit');

            Route::put('/{teamMember}', [WebsiteSettingsController::class, 'updateTeamMember'])->name('update');
            Route::patch('/{teamMember}/toggle-status', [WebsiteSettingsController::class, 'toggleTeamMemberStatus'])->name('toggle-status');
            Route::delete('/{teamMember}', [WebsiteSettingsController::class, 'deleteTeamMember'])->name('destroy');
        });


    });
});

// ADMIN CS ROUTES
Route::middleware(['auth', 'role:admin_cs'])->prefix('admin-cs')->name('admin-cs.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Get current date for calculations
        $now = now();
        $startOfMonth = $now->copy()->startOfMonth();
        $startOfDay = $now->copy()->startOfDay();

        // Sales Order Statistics
        $totalSalesOrdersThisMonth = \App\Models\SalesOrder::where('created_at', '>=', $startOfMonth)->count();
        $salesOrdersToday = \App\Models\SalesOrder::where('created_at', '>=', $startOfDay)->count();
        $pendingSalesOrders = \App\Models\SalesOrder::whereNull('approved_at')->whereNull('rejected_at')->count();

        // Revenue calculation - using total_selling from this month
        $revenueThisMonth = \App\Models\SalesOrder::where('created_at', '>=', $startOfMonth)
            ->whereNotNull('total_selling')
            ->sum('total_selling');

        // Recent Sales Orders (latest 5)
        $recentSalesOrders = \App\Models\SalesOrder::with(['creator'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // Status breakdown for pie chart
        $statusStats = [
            'pending' => \App\Models\SalesOrder::whereNull('approved_at')->whereNull('rejected_at')->count(),
            'approved' => \App\Models\SalesOrder::whereNotNull('approved_at')->count(),
            'rejected' => \App\Models\SalesOrder::whereNotNull('rejected_at')->count(),
        ];

        return Inertia::render('Admin/AdminCS/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
            'stats' => [
                'totalSalesOrdersThisMonth' => $totalSalesOrdersThisMonth,
                'salesOrdersToday' => $salesOrdersToday,
                'pendingSalesOrders' => $pendingSalesOrders,
                'revenueThisMonth' => $revenueThisMonth,
            ],
            'recentSalesOrders' => $recentSalesOrders,
            'statusStats' => $statusStats,
        ]);
    })->name('dashboard');



    // Sales Order Management Routes
    Route::controller(\App\Http\Controllers\SalesOrderController::class)->prefix('sales-orders')->name('sales-orders.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{salesOrder}', 'show')->name('show');
        Route::get('/{salesOrder}/edit', 'edit')->name('edit');
        Route::put('/{salesOrder}', 'update')->name('update');
        Route::delete('/{salesOrder}', 'destroy')->name('destroy');
        Route::post('/{salesOrder}/release', 'release')->name('release');
        Route::get('/{salesOrder}/print', 'print')->name('print');
        Route::get('/customer/{customer}/data', 'getCustomerData')->name('customer.data');
    });

});

// ADMIN KEUANGAN ROUTES
Route::middleware(['auth', 'role:admin_keuangan'])->prefix('admin-keuangan')->name('admin-keuangan.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Statistik khusus untuk Admin Keuangan
        $totalRevenue = \App\Models\Invoice::where('status', 'paid')->sum('total');
        $pendingPayments = \App\Models\Invoice::where('status', '!=', 'paid')->sum('total');
        $paidThisMonth = \App\Models\Invoice::where('status', 'paid')
            ->whereMonth('payment_confirmed_at', now()->month)
            ->whereYear('payment_confirmed_at', now()->year)
            ->sum('total');
        $overdueInvoices = \App\Models\Invoice::where('status', '!=', 'paid')
            ->where('due_date', '<', now()->toDateString())
            ->count();
        $totalInvoices = \App\Models\Invoice::count();
        $paidInvoices = \App\Models\Invoice::where('status', 'paid')->count();

        return Inertia::render('Admin/AdminKeuangan/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'pendingPayments' => $pendingPayments,
                'paidThisMonth' => $paidThisMonth,
                'overdueInvoices' => $overdueInvoices,
                'totalInvoices' => $totalInvoices,
                'paidInvoices' => $paidInvoices,
            ]
        ]);
    })->name('dashboard');

    // Customer Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\CustomerController::class)->prefix('customers')->name('customers.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/export/pdf', 'exportAllPdf')->name('export.pdf');
        Route::post('/', 'store')->name('store');
        Route::get('/{customer}', 'show')->name('show');
        Route::get('/{customer}/edit', 'edit')->name('edit');
        Route::put('/{customer}', 'update')->name('update');
        Route::delete('/{customer}', 'destroy')->name('destroy');
        Route::get('/{customer}/pdf', 'generatePdf')->name('pdf');
    });

    // Customer Documents Routes for Admin Keuangan
    Route::delete('/customers/documents/{document}', [\App\Http\Controllers\AdminKeuangan\CustomerController::class, 'deleteDocument'])->name('customers.documents.delete');

    // Vendor Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\VendorController::class)->prefix('vendors')->name('vendors.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/export/pdf', 'exportAllPdf')->name('export.pdf');
        Route::post('/', 'store')->name('store');
        Route::get('/{vendor}', 'show')->name('show');
        Route::get('/{vendor}/edit', 'edit')->name('edit');
        Route::put('/{vendor}', 'update')->name('update');
        Route::delete('/{vendor}', 'destroy')->name('destroy');
        Route::get('/{vendor}/pdf', 'generatePdf')->name('pdf');
    });

    // Sales Order Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\SalesOrderController::class)->prefix('sales-orders')->name('sales-orders.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{salesOrder}', 'show')->name('show');
        Route::get('/{salesOrder}/edit', 'edit')->name('edit');
        Route::put('/{salesOrder}', 'update')->name('update');
        Route::delete('/{salesOrder}', 'destroy')->name('destroy');
        Route::post('/{salesOrder}/approve', 'approve')->name('approve');
        Route::post('/{salesOrder}/reject', 'reject')->name('reject');
        Route::post('/{salesOrder}/vouchers/{voucher}/approve', 'approveVoucher')->name('vouchers.approve');
        Route::post('/{salesOrder}/vouchers/{voucher}/reject', 'rejectVoucher')->name('vouchers.reject');
        Route::get('/{salesOrder}/print', 'print')->name('print');
        Route::get('/{salesOrder}/vouchers/{voucher}/print', 'printVoucher')->name('vouchers.print');
        Route::get('/{salesOrder}/vouchers/{voucher}/preview', 'previewVoucher')->name('vouchers.preview');
        Route::post('/{salesOrder}/force-refresh', 'forceRefresh')->name('force-refresh');
    });

    // Invoice Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\InvoiceController::class)->prefix('invoices')->name('invoices.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::get('/payment-history', 'paymentHistory')->name('payment-history');
        Route::get('/overdue-report', 'overdueReport')->name('overdue-report');
        Route::post('/', 'store')->name('store');
        Route::get('/{invoice}', 'show')->name('show');
        Route::get('/{invoice}/edit', 'edit')->name('edit');
        Route::put('/{invoice}', 'update')->name('update');
        Route::delete('/{invoice}', 'destroy')->name('destroy');
        Route::get('/{invoice}/pdf', 'generatePdf')->name('pdf');
        Route::get('/{invoice}/export-pdf', 'generatePdf')->name('export-pdf');
        Route::get('/{invoice}/export-pdf-reimbursement', 'generateReimbursementPdf')->name('export-pdf-reimbursement');
        Route::get('/{invoice}/print', 'printView')->name('print');
        Route::get('/{invoice}/preview', 'preview')->name('preview');
        Route::post('/{invoice}/confirm-payment', 'confirmPayment')->name('confirm-payment');
        Route::post('/{invoice}/mark-sent', 'markSent')->name('mark-sent');
    });

    // Account Receivables Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\AccountReceivableController::class)->prefix('account-receivables')->name('account-receivables.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{accountReceivable}', 'show')->name('show');
        Route::post('/{accountReceivable}/record-payment', 'recordPayment')->name('record-payment');
        Route::get('/customers/{customer}/generate-soa', 'generateSOA')->name('generate-soa');
        Route::get('/customers/{customer}/receivables', 'getByCustomer')->name('get-by-customer');
        Route::post('/bulk-update-overdue', 'updateOverdueStatus')->name('bulk-update-overdue');
        Route::get('/export', 'export')->name('export');
    });

    // Account Payables Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\AccountPayableController::class)->prefix('account-payables')->name('account-payables.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/{accountPayable}', 'show')->name('show');
        Route::post('/{accountPayable}/mark-as-paid', 'markAsPaid')->name('mark-as-paid');
        Route::post('/{accountPayable}/update-due-date', 'updateDueDate')->name('update-due-date');
        Route::post('/{accountPayable}/update-vendor-invoice', 'updateVendorInvoice')->name('update-vendor-invoice');
        Route::get('/vendors/{vendor}/payables', 'getByVendor')->name('get-by-vendor');
        Route::post('/bulk-update-overdue', 'updateOverdueStatus')->name('bulk-update-overdue');
        Route::get('/export', 'export')->name('export');
        Route::get('/summary', 'summary')->name('summary');
    });

    // Profit Reports Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\ProfitReportController::class)->prefix('profit-reports')->name('profit-reports.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/export-pdf', 'exportPdf')->name('export-pdf');
        Route::get('/sales-order/{salesOrder}/detail', 'salesOrderDetail')->name('sales-order-detail');
        Route::get('/dashboard', 'dashboard')->name('dashboard');
    });

    // Petty Cash Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\PettyCashController::class)->prefix('petty-cash')->name('petty-cash.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/dashboard', 'dashboard')->name('dashboard');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{pettyCash}', 'show')->name('show');
        Route::get('/{pettyCash}/edit', 'edit')->name('edit');
        Route::put('/{pettyCash}', 'update')->name('update');
        Route::delete('/{pettyCash}', 'destroy')->name('destroy');
        Route::get('/export', 'export')->name('export');
    });

    // Profit Loss Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\ProfitLossController::class)->prefix('profit-loss')->name('profit-loss.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{profitLoss}', 'show')->name('show');
        Route::get('/{profitLoss}/edit', 'edit')->name('edit');
        Route::get('/{profitLoss}/export-pdf', 'exportPdf')->name('export-pdf');
        Route::put('/{profitLoss}', 'update')->name('update');
        Route::delete('/{profitLoss}', 'destroy')->name('destroy');
        Route::post('/{profitLoss}/finalize', 'finalize')->name('finalize');
        Route::post('/{profitLoss}/regenerate', 'regenerateEntries')->name('regenerate');
        Route::post('/{profitLoss}/entries', 'addEntry')->name('entries.store');
        Route::put('/entries/{entry}', 'updateEntry')->name('entries.update');
        Route::delete('/entries/{entry}', 'deleteEntry')->name('entries.destroy');
    });

    // Employee Salary Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\EmployeeSalaryController::class)->prefix('employee-salary')->name('employee-salary.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/bulk-create', 'bulkCreate')->name('bulk-create');
        Route::post('/bulk-store', 'bulkStore')->name('bulk-store');
        Route::get('/monthly-report', 'monthlyReport')->name('monthly-report');
        Route::get('/{employeeSalary}', 'show')->name('show');
        Route::get('/{employeeSalary}/edit', 'edit')->name('edit');
        Route::put('/{employeeSalary}', 'update')->name('update');
        Route::delete('/{employeeSalary}', 'destroy')->name('destroy');
        Route::post('/{employeeSalary}/approve', 'approve')->name('approve');
        Route::post('/{employeeSalary}/cancel', 'cancel')->name('cancel');
    });

    // Shipment Type Management Routes for Admin Keuangan
    Route::controller(\App\Http\Controllers\AdminKeuangan\ShipmentTypeController::class)->prefix('shipment-types')->name('shipment-types.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{shipmentType}/edit', 'edit')->name('edit');
        Route::put('/{shipmentType}', 'update')->name('update');
        Route::delete('/{shipmentType}', 'destroy')->name('destroy');
    });
});

// SHARED ROUTES (All authenticated users)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::put('/password', [ProfileController::class, 'updatePassword'])->name('password.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Additional profile routes for data retrieval
    Route::get('/profile/data', [ProfileController::class, 'getProfileData'])->name('profile.data');
    Route::post('/profile/verify-password', [ProfileController::class, 'verifyPassword'])->name('profile.verify-password');
});

