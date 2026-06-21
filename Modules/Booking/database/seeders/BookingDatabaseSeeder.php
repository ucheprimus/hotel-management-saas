<?php

namespace Modules\Booking\Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tenant;
use Faker\Factory as Faker;

class BookingDatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        
        // Future booking seeding logic will go here
        // when we build the booking module

        $this->command->info('Booking module seeded successfully!');
    }
}