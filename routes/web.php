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

        // Service Routes
        Route::prefix('service')->name('service.')->group(function () {
            Route::get('/', function () {
                $services = \App\Models\Service::orderBy('order_index')->get();
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Service/Index', [
                    'services' => $services
                ]);
            })->name('index');

            Route::get('/create', function () {
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Service/Create');
            })->name('create');

            Route::post('/', [WebsiteSettingsController::class, 'createService'])->name('store');

            Route::get('/{service}/edit', function (\App\Models\Service $service) {
                return Inertia::render('Admin/MasterAdmin/WebsiteSettings/Service/Edit', [
                    'service' => $service
                ]);
            })->name('edit');

            Route::put('/{service}', [WebsiteSettingsController::class, 'updateService'])->name('update');
            Route::delete('/{service}', [WebsiteSettingsController::class, 'deleteService'])->name('destroy');
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
            Route::delete('/{teamMember}', [WebsiteSettingsController::class, 'deleteTeamMember'])->name('destroy');
        });

        // Backward compatibility routes (optional - dapat dihapus jika tidak dibutuhkan)
        Route::get('/', [WebsiteSettingsController::class, 'index'])->name('index');
        Route::put('/settings', [WebsiteSettingsController::class, 'updateSettings'])->name('update-settings');
        Route::post('/services', [WebsiteSettingsController::class, 'createService'])->name('services.create');
        Route::put('/services/{service}', [WebsiteSettingsController::class, 'updateService'])->name('services.update');
        Route::delete('/services/{service}', [WebsiteSettingsController::class, 'deleteService'])->name('services.delete');
        Route::post('/team-members', [WebsiteSettingsController::class, 'createTeamMember'])->name('team-members.create');
        Route::put('/team-members/{teamMember}', [WebsiteSettingsController::class, 'updateTeamMember'])->name('team-members.update');
        Route::delete('/team-members/{teamMember}', [WebsiteSettingsController::class, 'deleteTeamMember'])->name('team-members.delete');
    });
});

// ADMIN CS ROUTES
Route::middleware(['auth', 'role:admin_cs'])->prefix('admin-cs')->name('admin-cs.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Statistik khusus untuk Admin CS
        $pendingTickets = 0; // Ganti dengan query sesuai kebutuhan
        $resolvedTickets = 0;

        return Inertia::render('Admin/AdminCS/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
            'stats' => [
                'pendingTickets' => $pendingTickets,
                'resolvedTickets' => $resolvedTickets,
            ]
        ]);
    })->name('dashboard');

    // Customer Management Routes
    Route::controller(\App\Http\Controllers\CustomerController::class)->prefix('customers')->name('customers.')->group(function () {
        Route::get('/', 'index')->name('index');
        Route::get('/create', 'create')->name('create');
        Route::post('/', 'store')->name('store');
        Route::get('/{customer}', 'show')->name('show');
        Route::get('/{customer}/edit', 'edit')->name('edit');
        Route::put('/{customer}', 'update')->name('update');
        Route::delete('/{customer}', 'destroy')->name('destroy');
    });
});

// ADMIN KEUANGAN ROUTES
Route::middleware(['auth', 'role:admin_keuangan'])->prefix('admin-keuangan')->name('admin-keuangan.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Statistik khusus untuk Admin Keuangan
        $totalRevenue = 0; // Ganti dengan query sesuai kebutuhan
        $pendingPayments = 0;

        return Inertia::render('Admin/AdminKeuangan/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
            'stats' => [
                'totalRevenue' => $totalRevenue,
                'pendingPayments' => $pendingPayments,
            ]
        ]);
    })->name('dashboard');
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

// DEBUG ROUTES (Remove in production)
Route::get('/debug-website-settings', function () {
    try {
        // Test 1: Cek database table
        $tableExists = Schema::hasTable('website_settings');
        echo "Table exists: " . ($tableExists ? 'YES' : 'NO') . "<br>";

        if (!$tableExists) {
            echo "ERROR: Table website_settings tidak ada!<br>";
            return "Jalankan: php artisan migrate";
        }

        // Test 2: Cek columns
        $columns = Schema::getColumnListing('website_settings');
        echo "Columns: " . implode(', ', $columns) . "<br>";

        // Test 3: Count existing records
        $count = \App\Models\WebsiteSettings::count();
        echo "Existing records: $count<br>";

        // Test 4: Test manual create
        $testData = [
            'company_name' => 'Test Company ' . now(),
            'company_description' => 'Test Description',
        ];

        $created = \App\Models\WebsiteSettings::create($testData);
        echo "Test record created with ID: " . $created->id . "<br>";

        // Test 5: Verify fillable
        $model = new \App\Models\WebsiteSettings();
        echo "Fillable: " . implode(', ', $model->getFillable()) . "<br>";

        return "Debug complete!";
    } catch (\Exception $e) {
        return "ERROR: " . $e->getMessage() . "<br>Trace: " . $e->getTraceAsString();
    }
});

Route::put('/test-put-method', function (Request $request) {
    Log::info('Test PUT method received:', $request->all());
    return response()->json(['success' => true, 'message' => 'PUT method works!']);
});
