<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Ensure DomPDF service is registered properly
        if (!$this->app->bound('dompdf.wrapper')) {
            $this->app->singleton('dompdf.wrapper', function ($app) {
                return new \Barryvdh\DomPDF\PDF($app['dompdf'], $app['config'], $app['files'], $app['view']);
            });
        }
        
        if (!$this->app->bound('dompdf')) {
            $this->app->singleton('dompdf', function ($app) {
                $dompdf = new \Dompdf\Dompdf();
                $dompdf->setOptions($app['config']->get('dompdf.options', []));
                return $dompdf;
            });
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
