<?php

namespace App\Utils;

use Illuminate\Support\Facades\Log;

class PerformanceMonitor
{
    private static array $checkpoints = [];

    /**
     * Start monitoring dari titik tertentu
     */
    public static function start(string $name = 'default'): void
    {
        self::$checkpoints[$name] = [
            'start_time' => microtime(true),
            'start_memory' => memory_get_usage(true),
            'start_peak_memory' => memory_get_peak_usage(true)
        ];
    }

    /**
     * Stop monitoring dan return hasil
     */
    public static function stop(string $name = 'default'): array
    {
        if (!isset(self::$checkpoints[$name])) {
            return [];
        }

        $checkpoint = self::$checkpoints[$name];
        $endTime = microtime(true);
        $endMemory = memory_get_usage(true);
        $endPeakMemory = memory_get_peak_usage(true);

        $result = [
            'execution_time' => $endTime - $checkpoint['start_time'],
            'memory_used' => $endMemory - $checkpoint['start_memory'],
            'peak_memory' => $endPeakMemory,
            'memory_current' => $endMemory,
            'formatted' => [
                'execution_time' => number_format(($endTime - $checkpoint['start_time']) * 1000, 2) . ' ms',
                'memory_used' => self::formatBytes($endMemory - $checkpoint['start_memory']),
                'peak_memory' => self::formatBytes($endPeakMemory),
                'memory_current' => self::formatBytes($endMemory)
            ]
        ];

        unset(self::$checkpoints[$name]);
        return $result;
    }

    /**
     * Log performance metrics
     */
    public static function logPerformance(string $name, string $operation): void
    {
        $metrics = self::stop($name);

        Log::channel('performance')->info("Performance: {$operation}", $metrics);
    }

    /**
     * Monitor memory untuk operasi specific
     */
    public static function measureOperation(callable $operation, string $name = 'operation'): mixed
    {
        self::start($name);

        try {
            $result = $operation();
            $metrics = self::stop($name);

            Log::info("Operation: {$name}", $metrics['formatted']);

            return $result;
        } catch (\Exception $e) {
            self::stop($name);
            throw $e;
        }
    }

    /**
     * Get current memory status
     */
    public static function getCurrentMemoryStatus(): array
    {
        return [
            'current_usage' => memory_get_usage(true),
            'peak_usage' => memory_get_peak_usage(true),
            'current_usage_formatted' => self::formatBytes(memory_get_usage(true)),
            'peak_usage_formatted' => self::formatBytes(memory_get_peak_usage(true)),
            'memory_limit' => ini_get('memory_limit')
        ];
    }

    private static function formatBytes(int $bytes): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];
        $power = $bytes > 0 ? floor(log($bytes, 1024)) : 0;
        return number_format($bytes / pow(1024, $power), 2) . ' ' . $units[$power];
    }
}