<?php

namespace App\Services;

use App\Models\Feature;
use App\Models\FeatureAssignment;
use App\Models\Tenant;

class FeatureService
{
    public function isEnabled(string $featureKey, ?Tenant $tenant = null): bool
    {
        // If no tenant, check global feature status
        if (!$tenant && !tenancy()->initialized) {
            $feature = Feature::where('key', $featureKey)->first();
            return $feature && $feature->is_active;
        }
        
        // Get tenant from context if not provided
        if (!$tenant && tenancy()->initialized) {
            $tenant = tenancy()->tenant;
        }
        
        if (!$tenant) {
            return false;
        }
        
        $feature = Feature::where('key', $featureKey)->first();
        if (!$feature || !$feature->is_active) {
            return false;
        }
        
        $assignment = FeatureAssignment::where('tenant_id', $tenant->id)
            ->where('feature_id', $feature->id)
            ->first();
        
        if (!$assignment) {
            return false;
        }
        
        // Check if expired
        if ($assignment->expires_at && $assignment->expires_at->isPast()) {
            return false;
        }
        
        return $assignment->is_enabled;
    }
    
    public function enableForTenant(string $featureKey, Tenant $tenant, ?int $daysUntilExpiry = null): void
    {
        $feature = Feature::where('key', $featureKey)->firstOrFail();
        
        $assignment = FeatureAssignment::updateOrCreate(
            [
                'tenant_id' => $tenant->id,
                'feature_id' => $feature->id,
            ],
            [
                'is_enabled' => true,
                'expires_at' => $daysUntilExpiry ? now()->addDays($daysUntilExpiry) : null,
            ]
        );
    }
    
    public function disableForTenant(string $featureKey, Tenant $tenant): void
    {
        $feature = Feature::where('key', $featureKey)->firstOrFail();
        
        FeatureAssignment::updateOrCreate(
            [
                'tenant_id' => $tenant->id,
                'feature_id' => $feature->id,
            ],
            ['is_enabled' => false]
        );
    }
}