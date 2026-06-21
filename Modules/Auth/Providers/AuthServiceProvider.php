<?php

namespace Modules\Auth\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AuthServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../Database/Migrations');
        $this->loadRoutes();
    }

    protected function loadRoutes()
    {
        $routesPath = __DIR__ . '/../../Routes/api.php';
        if (file_exists($routesPath)) {
            Route::prefix('api')
                ->middleware('api')
                ->group($routesPath);
        }
    }
}