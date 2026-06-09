<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

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
}
}
