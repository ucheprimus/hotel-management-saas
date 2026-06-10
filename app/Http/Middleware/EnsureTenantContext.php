<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureTenantContext
{
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        
        if (!$user) {
            return redirect()->route('login');
        }
        
        // If user has no tenants, redirect to onboarding
        if ($user->tenants->count() === 0) {
            return redirect()->route('onboarding');
        }
        
        // If no current tenant is set, set the first one
        if (!$user->currentTenant()) {
            $firstTenant = $user->tenants->first();
            $user->switchTenant($firstTenant);
        }
        
        return $next($request);
    }
}