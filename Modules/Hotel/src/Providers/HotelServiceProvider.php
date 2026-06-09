<?php

namespace Modules\Hotel\Providers;

use Illuminate\Support\ServiceProvider;

class HotelServiceProvider extends ServiceProvider
{
    public function register()
    {
        //
    }

    public function boot()
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../database/migrations');
    }
}