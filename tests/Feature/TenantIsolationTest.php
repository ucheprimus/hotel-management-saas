<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Tenant;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TenantIsolationTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_user_cannot_access_other_tenant_data()
    {
        // Create two tenants
        $tenantA = Tenant::create(['id' => 'hotel-a', 'data' => ['name' => 'Hotel A']]);
        $tenantB = Tenant::create(['id' => 'hotel-b', 'data' => ['name' => 'Hotel B']]);
        
        // Create user for tenant A
        $userA = User::create([
            'name' => 'User A',
            'email' => 'usera@example.com',
            'password' => bcrypt('password')
        ]);
        $userA->tenants()->attach($tenantA->id, ['role_in_tenant' => 'owner', 'is_current' => true]);
        
        // Create user for tenant B
        $userB = User::create([
            'name' => 'User B',
            'email' => 'userb@example.com',
            'password' => bcrypt('password')
        ]);
        $userB->tenants()->attach($tenantB->id, ['role_in_tenant' => 'owner', 'is_current' => true]);
        
        // Verify users belong to correct tenants
        $this->assertTrue($userA->belongsToTenant($tenantA));
        $this->assertFalse($userA->belongsToTenant($tenantB));
        $this->assertTrue($userB->belongsToTenant($tenantB));
        $this->assertFalse($userB->belongsToTenant($tenantA));
        
        // Verify tenant isolation
        $userA->switchTenant($tenantA);
        $this->assertEquals('hotel-a', tenancy()->tenant->id);
        
        $userB->switchTenant($tenantB);
        $this->assertEquals('hotel-b', tenancy()->tenant->id);
    }
}