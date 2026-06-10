<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;  // Add this for Blade directive
use App\Services\FeatureService;        // Add this for FeatureService


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */


public function boot(): void
{
    // Load module routes
    $modules = ['Tenancy', 'Auth', 'Hotel', 'Booking'];
    
    foreach ($modules as $module) {
        $routesPath = base_path("Modules/{$module}/routes/web.php");
        if (file_exists($routesPath)) {
            $this->loadRoutesFrom($routesPath);
        }
    }

        Blade::if('feature', function ($featureKey) {
        return app(FeatureService::class)->isEnabled($featureKey);
    });
}
}
