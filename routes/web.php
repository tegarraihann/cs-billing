<?php

use App\Http\Controllers\ProfileController;
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

    // Redirect berdasarkan role ke dashboard masing-masing
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
        return Inertia::render('Admin/MasterAdmin/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
        ]);
    })->name('dashboard');

    // User Management
    Route::get('/users', function () {
        return Inertia::render('Admin/MasterAdmin/Users/Index');
    })->name('users.index');

    Route::get('/users/create', function () {
        return Inertia::render('Admin/MasterAdmin/Users/Create');
    })->name('users.create');
});

// ADMIN CS ROUTES
Route::middleware(['auth', 'role:admin_cs'])->prefix('admin-cs')->name('admin-cs.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        return Inertia::render('Admin/AdminCS/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
        ]);
    })->name('dashboard');
});

// ADMIN KEUANGAN ROUTES
Route::middleware(['auth', 'role:admin_keuangan'])->prefix('admin-keuangan')->name('admin-keuangan.')->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        return Inertia::render('Admin/AdminKeuangan/Dashboard', [
            'user' => $user,
            'userRole' => $user->role,
        ]);
    })->name('dashboard');
});

// SHARED ROUTES (All authenticated users)
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
