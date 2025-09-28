<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Session\TokenMismatchException;
use Illuminate\Auth\AuthenticationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function render($request, Throwable $exception)
    {
        // Handle CSRF token mismatch (419 Page Expired)
        if ($exception instanceof TokenMismatchException) {
            // Clear session data
            $request->session()->flush();
            $request->session()->regenerate();

            // Log the session timeout
            \Log::info('Session Expired - Auto Logout', [
                'user_id' => auth()->id(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'url' => $request->fullUrl(),
                'timestamp' => now(),
            ]);

            // Silent redirect to login with friendly message
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Sesi Anda telah berakhir. Silakan login kembali.',
                    'redirect' => route('login')
                ], 401);
            }

            return redirect()->route('login')
                ->with('info', 'Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.');
        }

        // Handle 419 HTTP Exception (Page Expired)
        if ($exception instanceof HttpException && $exception->getStatusCode() === 419) {
            // Clear session data
            $request->session()->flush();
            $request->session()->regenerate();

            // Log the session timeout
            \Log::info('HTTP 419 Page Expired - Auto Logout', [
                'user_id' => auth()->id(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'url' => $request->fullUrl(),
                'timestamp' => now(),
            ]);

            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Sesi Anda telah berakhir. Silakan login kembali.',
                    'redirect' => route('login')
                ], 419);
            }

            return redirect()->route('login')
                ->with('info', 'Sesi Anda telah berakhir. Silakan login kembali untuk melanjutkan.');
        }

        // Handle Authentication Exception
        if ($exception instanceof AuthenticationException) {
            if ($request->expectsJson()) {
                return response()->json([
                    'message' => 'Anda perlu login untuk mengakses halaman ini.',
                    'redirect' => route('login')
                ], 401);
            }

            return redirect()->route('login')
                ->with('info', 'Silakan login untuk mengakses halaman ini.');
        }

        return parent::render($request, $exception);
    }

    /**
     * Convert an authentication exception into a response.
     */
    protected function unauthenticated($request, AuthenticationException $exception)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Anda perlu login untuk mengakses halaman ini.',
                'redirect' => route('login')
            ], 401);
        }

        return redirect()->route('login')
            ->with('info', 'Silakan login untuk mengakses halaman ini.');
    }
}