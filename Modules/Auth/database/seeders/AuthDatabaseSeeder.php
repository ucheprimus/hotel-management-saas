<?php

namespace Modules\Auth\Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AuthDatabaseSeeder extends Seeder
{
    public function run()
    {
        // Create roles if they don't exist
        $roles = ['Platform Admin', 'Hotel Owner', 'Hotel Manager', 'Receptionist', 'Housekeeping'];
        
        foreach ($roles as $roleName) {
            Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
        }

        // Create a platform admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Platform Admin',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('Platform Admin');

        $this->command->info('Auth module seeded successfully!');
    }
}