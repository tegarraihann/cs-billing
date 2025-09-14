<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminDomainOnly
{
    public function handle(Request $request, Closure $next)
    {
        $adminDomain = 'admineshaka.akmalicode.site';
        $currentDomain = $request->getHost();

        // Jika bukan admin domain, block akses ke admin routes
        if ($currentDomain !== $adminDomain) {
            abort(404, 'Not Found');
        }

        return $next($request);
    }
}