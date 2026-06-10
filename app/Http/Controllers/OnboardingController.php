<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function index()
    {
        return view('onboarding.index');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'hotel_name' => ['required', 'string', 'max:255'],
        ]);
        
        $user = $request->user();
        
        // Create tenant
        $tenantId = strtolower(str_replace(' ', '-', $request->hotel_name)) . '-' . uniqid();
        
        $tenant = Tenant::create([
            'id' => $tenantId,
            'data' => [
                'name' => $request->hotel_name,
                'owner_email' => $user->email,
            ],
        ]);
        
        // Create domain
        $tenant->domains()->create([
            'domain' => $tenantId . '.localhost'
        ]);
        
        // Attach user as owner
        $user->tenants()->attach($tenant->id, [
            'role_in_tenant' => 'owner',
            'is_current' => true,
        ]);
        
        tenancy()->initialize($tenant);
        
        return redirect()->route('dashboard')->with('success', 'Hotel created successfully!');
    }
}