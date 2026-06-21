<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        // Module seeders
        $this->call(\Modules\Auth\Database\Seeders\AuthDatabaseSeeder::class);
        $this->call(\Modules\Hotel\Database\Seeders\HotelDatabaseSeeder::class);
        $this->call(\Modules\Booking\Database\Seeders\BookingDatabaseSeeder::class);
        $this->call(\Modules\Tenancy\Database\Seeders\TenancyDatabaseSeeder::class);
        
        // Feature seeders
        $this->call(\Database\Seeders\FeatureSeeder::class);
        $this->call(\Database\Seeders\PermissionSeeder::class);
    }
}