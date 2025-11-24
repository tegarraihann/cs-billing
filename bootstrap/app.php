<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Keep the XSRF-TOKEN cookie unencrypted so the SPA (Inertia) can read it for CSRF headers
        $middleware->encryptCookies(except: ['XSRF-TOKEN']);

        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
            \App\Http\Middleware\TrackUserActivity::class,
            \App\Http\Middleware\MemoryMonitoringMiddleware::class,
        ]);

        // Register custom middleware aliases
        $middleware->alias([
            'role' => \App\Http\Middleware\RoleMiddleware::class,
            'admin.domain' => \App\Http\Middleware\AdminDomainOnly::class,
            'public.domain' => \App\Http\Middleware\PublicDomainOnly::class,
            'session.timeout' => \App\Http\Middleware\SessionTimeoutMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
