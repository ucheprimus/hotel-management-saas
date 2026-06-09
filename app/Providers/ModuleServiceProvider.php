<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class ModuleServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        $this->loadModuleRoutes();
        $this->loadModuleMigrations();
    }

    protected function loadModuleRoutes(): void
    {
        $modules = ['Tenancy', 'Auth', 'Hotel', 'Booking'];
        
        foreach ($modules as $module) {
            $routesPath = base_path("app/Modules/{$module}/Routes/web.php");
            if (file_exists($routesPath)) {
                Route::middleware('web')
                    ->namespace("App\\Modules\\{$module}\\Http\\Controllers")
                    ->group($routesPath);
            }
            
            $apiRoutesPath = base_path("app/Modules/{$module}/Routes/api.php");
            if (file_exists($apiRoutesPath)) {
                Route::prefix('api/v1')
                    ->middleware('api')
                    ->namespace("App\\Modules\\{$module}\\Http\\Controllers")
                    ->group($apiRoutesPath);
            }
        }
    }

    protected function loadModuleMigrations(): void
    {
        $modules = ['Tenancy', 'Auth', 'Hotel', 'Booking'];
        
        foreach ($modules as $module) {
            $migrationPath = base_path("app/Modules/{$module}/Database/Migrations");
            if (is_dir($migrationPath)) {
                $this->loadMigrationsFrom($migrationPath);
            }
        }
    }
}