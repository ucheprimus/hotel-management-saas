<?php

namespace Modules\Hotel\Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tenant;
use App\Models\User;
use Faker\Factory as Faker;

class HotelDatabaseSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Get the first tenant (or create one)
        $tenant = Tenant::first();
        
        if (!$tenant) {
            $tenant = Tenant::create([
                'id' => 'demo-hotel',
                'data' => [
                    'name' => 'Demo Hotel',
                    'address' => $faker->address,
                    'phone' => $faker->phoneNumber,
                    'email' => $faker->email,
                    'currency' => 'USD',
                ],
            ]);
        }

        // Create a hotel owner for this tenant
        $owner = User::firstOrCreate(
            ['email' => 'owner@example.com'],
            [
                'name' => 'Hotel Owner',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $owner->assignRole('Hotel Owner');
        
        // Attach to tenant
        if (!$owner->tenants()->where('tenant_id', $tenant->id)->exists()) {
            $owner->tenants()->attach($tenant->id, [
                'role_in_tenant' => 'owner',
                'is_current' => true,
            ]);
        }

        $this->command->info('Hotel module seeded successfully!');
    }
}