<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\File;

class ModuleSeederProvider extends ServiceProvider
{
    public function register()
    {
        // Register all module seeders
        $modulePath = base_path('Modules');
        
        if (is_dir($modulePath)) {
            $modules = array_diff(scandir($modulePath), ['.', '..']);
            
            foreach ($modules as $module) {
                $seederPath = "Modules/{$module}/database/seeders";
                if (is_dir(base_path($seederPath))) {
                    $this->loadSeedersFrom($seederPath);
                }
            }
        }
    }

    protected function loadSeedersFrom($path)
    {
        // This will be called when running `php artisan db:seed --class=ModuleSeeder`
    }
}