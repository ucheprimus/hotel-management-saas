<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Route;

class ModuleHelper
{
    public static function registerRoutes()
    {
        $modules = ['Tenancy', 'Auth', 'Hotel', 'Booking'];
        
        foreach ($modules as $module) {
            $routesPath = base_path("Modules/{$module}/src/routes.php");
            if (file_exists($routesPath)) {
                Route::middleware('web')
                    ->group($routesPath);
            }
        }
    }
}