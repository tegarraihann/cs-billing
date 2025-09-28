<?php

namespace App\Http\Controllers\Examples;

use App\Http\Controllers\Controller;
use App\Utils\PerformanceMonitor;
use Illuminate\Http\Request;

class PerformanceExampleController extends Controller
{
    public function generatePdfExample()
    {
        // Contoh monitoring PDF generation
        PerformanceMonitor::start('pdf_generation');

        // Simulasi operasi PDF yang memory-intensive
        $result = PerformanceMonitor::measureOperation(function () {
            // Contoh: Generate PDF yang berat
            $data = [];
            for ($i = 0; $i < 10000; $i++) {
                $data[] = "Item {$i}";
            }

            // Simulasi PDF processing
            sleep(1);

            return count($data);
        }, 'pdf_processing');

        PerformanceMonitor::logPerformance('pdf_generation', 'Complete PDF Generation');

        // Get current memory status
        $memoryStatus = PerformanceMonitor::getCurrentMemoryStatus();

        return response()->json([
            'success' => true,
            'items_processed' => $result,
            'memory_status' => $memoryStatus
        ]);
    }

    public function invoiceListExample()
    {
        // Monitor memory untuk operasi database heavy
        return PerformanceMonitor::measureOperation(function () {

            // Simulasi query berat
            $invoices = collect(range(1, 1000))->map(function ($i) {
                return [
                    'id' => $i,
                    'invoice_number' => "INV-{$i}",
                    'amount' => rand(100000, 5000000)
                ];
            });

            // Check memory di tengah operasi
            \Log::info('Memory check during operation', [
                'current' => memory_get_usage(true),
                'peak' => memory_get_peak_usage(true)
            ]);

            return $invoices->toArray();

        }, 'invoice_list_generation');
    }

    public function memoryStatus()
    {
        return response()->json([
            'memory_status' => PerformanceMonitor::getCurrentMemoryStatus(),
            'server_info' => [
                'php_memory_limit' => ini_get('memory_limit'),
                'max_execution_time' => ini_get('max_execution_time'),
                'upload_max_filesize' => ini_get('upload_max_filesize')
            ]
        ]);
    }
}