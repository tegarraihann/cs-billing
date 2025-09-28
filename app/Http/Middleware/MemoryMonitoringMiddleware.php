<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class MemoryMonitoringMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Memory usage sebelum request
        $memoryBefore = memory_get_usage(true);
        $memoryPeakBefore = memory_get_peak_usage(true);

        $response = $next($request);

        // Memory usage setelah request
        $memoryAfter = memory_get_usage(true);
        $memoryPeakAfter = memory_get_peak_usage(true);

        // Hitung selisih
        $memoryUsed = $memoryAfter - $memoryBefore;
        $memoryPeakUsed = $memoryPeakAfter - $memoryPeakBefore;

        // Log memory usage untuk monitoring
        Log::channel('memory')->info('Memory Usage', [
            'route' => $request->route()?->getName() ?? $request->path(),
            'method' => $request->method(),
            'memory_before' => $this->formatBytes($memoryBefore),
            'memory_after' => $this->formatBytes($memoryAfter),
            'memory_used' => $this->formatBytes($memoryUsed),
            'memory_peak' => $this->formatBytes($memoryPeakAfter),
            'execution_time' => microtime(true) - LARAVEL_START
        ]);

        // Tambahkan header untuk debugging (hanya di development)
        if (config('app.debug')) {
            $response->headers->set('X-Memory-Usage', $this->formatBytes($memoryAfter));
            $response->headers->set('X-Memory-Peak', $this->formatBytes($memoryPeakAfter));
        }

        return $response;
    }

    private function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $power = $bytes > 0 ? floor(log($bytes, 1024)) : 0;
        return number_format($bytes / pow(1024, $power), 2) . ' ' . $units[$power];
    }
}