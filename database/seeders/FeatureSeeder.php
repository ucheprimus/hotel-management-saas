<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Feature;
use App\Models\FeatureAssignment;
use App\Models\Tenant;

class FeatureSeeder extends Seeder
{
    public function run(): void
    {
        // Default features
        $features = [
            ['name' => 'Housekeeping', 'key' => 'housekeeping', 'description' => 'Housekeeping module access'],
            ['name' => 'Maintenance', 'key' => 'maintenance', 'description' => 'Maintenance request module'],
            ['name' => 'Advanced Reports', 'key' => 'advanced_reports', 'description' => 'Advanced analytics and reporting'],
            ['name' => 'Multi Property', 'key' => 'multi_property', 'description' => 'Support for multiple properties'],
            ['name' => 'Public Booking Engine', 'key' => 'public_booking_engine', 'description' => 'Public facing booking widget'],
        ];
        
        foreach ($features as $feature) {
            Feature::updateOrCreate(
                ['key' => $feature['key']],
                $feature
            );
        }
        
        // Assign features to existing tenants (for demo)
        $tenants = Tenant::all();
        foreach ($tenants as $tenant) {
            // Starter plan: basic features only
            FeatureAssignment::updateOrCreate(
                [
                    'tenant_id' => $tenant->id,
                    'feature_id' => Feature::where('key', 'housekeeping')->first()->id,
                ],
                ['is_enabled' => true]
            );
            
            FeatureAssignment::updateOrCreate(
                [
                    'tenant_id' => $tenant->id,
                    'feature_id' => Feature::where('key', 'maintenance')->first()->id,
                ],
                ['is_enabled' => true]
            );
            
            // Growth plan features (disabled for now)
            FeatureAssignment::updateOrCreate(
                [
                    'tenant_id' => $tenant->id,
                    'feature_id' => Feature::where('key', 'advanced_reports')->first()->id,
                ],
                ['is_enabled' => false]
            );
            
            FeatureAssignment::updateOrCreate(
                [
                    'tenant_id' => $tenant->id,
                    'feature_id' => Feature::where('key', 'multi_property')->first()->id,
                ],
                ['is_enabled' => false]
            );
        }
        
        $this->command->info('Features seeded successfully!');
    }
}