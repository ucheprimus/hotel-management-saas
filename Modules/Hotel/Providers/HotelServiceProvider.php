<?php

namespace Modules\Hotel\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class HotelServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../Database/Migrations');
        $this->loadRoutes();
        $this->registerEvents();
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

    protected function registerEvents()
    {
        $this->app['events']->listen(
            \Modules\Hotel\Events\HotelCreated::class,
            \Modules\Hotel\Listeners\LogHotelActivity::class
        );
        
        $this->app['events']->listen(
            \Modules\Hotel\Events\HotelUpdated::class,
            \Modules\Hotel\Listeners\LogHotelActivity::class
        );
        
        $this->app['events']->listen(
            \Modules\Hotel\Events\HotelDeleted::class,
            \Modules\Hotel\Listeners\LogHotelActivity::class
        );
    }
}