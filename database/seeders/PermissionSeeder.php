<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // ========== PERMISSIONS ==========
        
        // Booking permissions
        $permissions = [
            // Bookings
            'view_bookings',
            'create_bookings',
            'edit_bookings',
            'delete_bookings',
            'check_in',
            'check_out',
            
            // Rooms
            'view_rooms',
            'create_rooms',
            'edit_rooms',
            'delete_rooms',
            
            // Guests
            'view_guests',
            'create_guests',
            'edit_guests',
            'delete_guests',
            
            // Staff
            'view_staff',
            'create_staff',
            'edit_staff',
            'delete_staff',
            
            // Housekeeping
            'view_housekeeping',
            'assign_housekeeping',
            'complete_housekeeping',
            
            // Maintenance
            'view_maintenance',
            'create_maintenance',
            'assign_maintenance',
            'resolve_maintenance',
            
            // Reports
            'view_reports',
            'export_reports',
            
            // Hotel Settings
            'manage_hotel_settings',
            'manage_properties',
            'manage_room_types',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission, 'guard_name' => 'web']);
        }

        // ========== ROLES ==========
        
        // Platform Admin (Super Admin)
        $platformAdmin = Role::firstOrCreate(['name' => 'Platform Admin', 'guard_name' => 'web']);
        $platformAdmin->givePermissionTo(Permission::all());
        
        // Hotel Owner
        $hotelOwner = Role::firstOrCreate(['name' => 'Hotel Owner', 'guard_name' => 'web']);
        $hotelOwner->givePermissionTo([
            'view_bookings', 'create_bookings', 'edit_bookings', 'check_in', 'check_out',
            'view_rooms', 'create_rooms', 'edit_rooms', 'delete_rooms',
            'view_guests', 'create_guests', 'edit_guests',
            'view_staff', 'create_staff', 'edit_staff', 'delete_staff',
            'view_housekeeping', 'assign_housekeeping',
            'view_maintenance', 'create_maintenance',
            'view_reports', 'export_reports',
            'manage_hotel_settings', 'manage_properties', 'manage_room_types',
        ]);
        
        // Hotel Manager
        $hotelManager = Role::firstOrCreate(['name' => 'Hotel Manager', 'guard_name' => 'web']);
        $hotelManager->givePermissionTo([
            'view_bookings', 'create_bookings', 'edit_bookings', 'check_in', 'check_out',
            'view_rooms', 'create_rooms', 'edit_rooms',
            'view_guests', 'create_guests', 'edit_guests',
            'view_staff', 'create_staff', 'edit_staff',
            'view_housekeeping', 'assign_housekeeping',
            'view_maintenance', 'create_maintenance',
            'view_reports',
            'manage_hotel_settings',
        ]);
        
        // Receptionist
        $receptionist = Role::firstOrCreate(['name' => 'Receptionist', 'guard_name' => 'web']);
        $receptionist->givePermissionTo([
            'view_bookings', 'create_bookings', 'check_in', 'check_out',
            'view_rooms',
            'view_guests', 'create_guests', 'edit_guests',
            'view_housekeeping',
            'view_maintenance', 'create_maintenance',
        ]);
        
        // Housekeeping
        $housekeeping = Role::firstOrCreate(['name' => 'Housekeeping', 'guard_name' => 'web']);
        $housekeeping->givePermissionTo([
            'view_housekeeping',
            'complete_housekeeping',
        ]);
        
        // ========== CREATE PLATFORM ADMIN USER ==========
        
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        $adminUser->assignRole('Platform Admin');
        
        $this->command->info('Roles and permissions seeded successfully!');
        $this->command->info('Admin user: admin@example.com / password');
    }
}