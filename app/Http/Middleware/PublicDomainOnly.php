<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class PublicDomainOnly
{
    public function handle(Request $request, Closure $next)
    {
        $publicDomain = 'demo.akmalicode.site';
        $currentDomain = $request->getHost();

        // Jika bukan public domain, block akses ke public routes
        if ($currentDomain !== $publicDomain) {
            abort(404, 'Not Found');
        }

        return $next($request);
    }
}