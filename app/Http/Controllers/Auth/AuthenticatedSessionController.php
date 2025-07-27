<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
            'roles' => [
                ['value' => 'masteradmin', 'label' => 'Master Administrator'],
                ['value' => 'admin_cs', 'label' => 'Admin Customer Service'],
                ['value' => 'admin_keuangan', 'label' => 'Admin Keuangan']
            ],
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();

        $user = Auth::user();

        // Redirect based on user role to specific dashboard
        return $this->redirectBasedOnRole($user->role);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    /**
     * Redirect user based on their role to specific dashboard.
     */
    private function redirectBasedOnRole(string $role): RedirectResponse
    {
        return match ($role) {
            'masteradmin' => redirect()->intended(route('masteradmin.dashboard')),
            'admin_cs' => redirect()->intended(route('admin-cs.dashboard')),
            'admin_keuangan' => redirect()->intended(route('admin-keuangan.dashboard')),
            default => redirect()->intended('/')->with('error', 'Role tidak dikenal, silakan hubungi administrator.'),
        };
    }
}
