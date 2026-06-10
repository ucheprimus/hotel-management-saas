<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Tenant;
use App\Services\TenantCreationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class RegisteredUserController extends Controller
{
    public function create()
    {
        return view('auth.register');
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:8'],
            'hotel_name' => ['required', 'string', 'max:255'],
        ]);
        
        // Create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        
        // Assign default role
        $user->assignRole('Hotel Owner');
        
        // Create tenant (hotel)
        $tenantId = strtolower(str_replace(' ', '-', $request->hotel_name)) . '-' . uniqid();
        
        $tenant = Tenant::create([
            'id' => $tenantId,
            'data' => [
                'name' => $request->hotel_name,
                'owner_email' => $request->email,
                'created_at' => now(),
            ],
        ]);
        
        // Create domain for the tenant
        $tenant->domains()->create([
            'domain' => $tenantId . '.localhost'
        ]);
        
        // Attach user to tenant as owner
        $user->tenants()->attach($tenant->id, [
            'role_in_tenant' => 'owner',
            'is_current' => true,
        ]);
        
        // Initialize tenancy
        tenancy()->initialize($tenant);
        
        Auth::login($user);
        
        return redirect()->route('dashboard');
    }
}