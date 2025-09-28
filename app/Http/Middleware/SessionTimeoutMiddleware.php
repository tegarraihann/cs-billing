<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class SessionTimeoutMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Skip untuk guest users atau route login
        if (!Auth::check() || $request->routeIs('login', 'logout')) {
            return $next($request);
        }

        // Get session lifetime in minutes
        $sessionLifetime = config('session.lifetime');

        // Check if last activity time exists
        if (Session::has('last_activity')) {
            $lastActivity = Session::get('last_activity');
            $now = Carbon::now();
            $sessionExpiry = Carbon::parse($lastActivity)->addMinutes($sessionLifetime);

            // If session has expired
            if ($now->greaterThan($sessionExpiry)) {
                // Log the auto-logout
                \Log::info('Session Timeout - Auto Logout via Middleware', [
                    'user_id' => Auth::id(),
                    'user_email' => Auth::user()->email,
                    'last_activity' => $lastActivity,
                    'session_expired_at' => $sessionExpiry,
                    'current_time' => $now,
                    'ip' => $request->ip(),
                    'user_agent' => $request->userAgent(),
                    'url' => $request->fullUrl(),
                ]);

                // Logout user
                Auth::logout();

                // Clear session
                $request->session()->invalidate();
                $request->session()->regenerateToken();

                // Return appropriate response
                if ($request->expectsJson() || $request->wantsJson()) {
                    return response()->json([
                        'message' => 'Sesi Anda telah berakhir karena tidak ada aktivitas. Silakan login kembali.',
                        'redirect' => route('login'),
                        'logout' => true
                    ], 401);
                }

                return redirect()->route('login')
                    ->with('info', 'Sesi Anda telah berakhir karena tidak ada aktivitas. Silakan login kembali.');
            }
        }

        // Update last activity time
        Session::put('last_activity', Carbon::now());

        // Also update login time if not exists (for new sessions)
        if (!Session::has('login_time')) {
            Session::put('login_time', Carbon::now());
        }

        return $next($request);
    }
}
