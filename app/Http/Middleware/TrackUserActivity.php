<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class TrackUserActivity
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Update user's last activity if authenticated
        if (Auth::check()) {
            $user = Auth::user();

            // Only update if last activity was more than 5 minutes ago
            // to avoid too many database updates
            if (!$user->last_activity_at || $user->last_activity_at->diffInMinutes(now()) >= 5) {
                $user->updateLastActivity();
            }
        }

        return $next($request);
    }
}
