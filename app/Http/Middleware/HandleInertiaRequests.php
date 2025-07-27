<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'status' => $user->status,
                    'created_at' => $user->created_at,
                ] : null,
            ],
            'permissions' => $user ? [
                'canManageUsers' => $user->role === 'masteradmin',
                'canViewReports' => in_array($user->role, ['masteradmin', 'admin_cs', 'admin_keuangan']),
                'canEditSettings' => $user->role === 'masteradmin',
                'canDeleteUsers' => $user->role === 'masteradmin',
                'canViewAnalytics' => in_array($user->role, ['masteradmin', 'admin_cs']),
                'canManageFinance' => in_array($user->role, ['masteradmin', 'admin_keuangan']),
                'canManageCustomerService' => in_array($user->role, ['masteradmin', 'admin_cs']),
                'canViewAllData' => $user->role === 'masteradmin',
            ] : [],
            'userRole' => $user?->role,
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'warning' => $request->session()->get('warning'),
                'info' => $request->session()->get('info'),
            ],
            'ziggy' => fn() => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
        ];
    }
}
