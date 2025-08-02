<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\MasterAdmin\UserController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('HomePage', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Role-based Dashboard Redirects
Route::get('dashboard', function () {
    $user = auth()->user();

    return match ($user->role) {
        'masteradmin' => redirect()->route('masteradmin.dashboard'),
        'admin_cs' => redirect()->route('admin-cs.dashboard'),
        'admin_keuangan' => redirect()->route('admin-keuangan.dashboard'),
        default => abort(403, 'Role tidak dikenal')
    };
})->middleware(['auth', 'verified'])->name('dashboard');

// MASTER ADMIN ROUTES
Route::middleware(['auth', 'role:masteradmin'])->prefix('master-admin')->name('masteradmin.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Ambil data statistik users
        $totalUsers = User::count();
        $activeUsers = User::where('status', 'active')->count();
        $inactiveUsers = User::where('status', 'inactive')->count();

        // Users terbaru
        $recentUsers = User::latest()
            ->take(5)
            ->get(['id', 'name', 'email', 'role', 'status', 'created_at']);

        // Statistik per role
        $roleStats = [
            'masteradmin' => User::where('role', 'masteradmin')->count(),
            'admin_cs' => User::where('role', 'admin_cs')->count(),
            'admin_keuangan' => User::where('role', 'admin_keuangan')->count(),
        ];

        return Inertia::render('Admin/MasterAdmin/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
            'stats' => [
                'totalUsers' => $totalUsers,
                'activeUsers' => $activeUsers,
                'inactiveUsers' => $inactiveUsers,
                'roleStats' => $roleStats,
            ],
            'recentUsers' => $recentUsers,
        ]);
    })->name('dashboard');

    // User Management Routes
    Route::controller(UserController::class)->prefix('users')->name('users.')->group(function () {
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
});

// ADMIN CS ROUTES
Route::middleware(['auth', 'role:admin_cs'])->prefix('admin-cs')->name('admin-cs.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Statistik khusus untuk Admin CS (contoh)
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
});

// ADMIN KEUANGAN ROUTES
Route::middleware(['auth', 'role:admin_keuangan'])->prefix('admin-keuangan')->name('admin-keuangan.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();

        // Statistik khusus untuk Admin Keuangan (contoh)
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

require __DIR__ . '/auth.php';
