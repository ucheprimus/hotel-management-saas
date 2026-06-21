<?php

namespace Modules\Tenancy\Database\Seeders;

use Illuminate\Database\Seeder;

class TenancyDatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->command->info('Tenancy module seeded successfully!');
    }
}