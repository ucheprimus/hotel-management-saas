<?php

namespace Modules\Auth\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends AuthController
{
    public function currentUser(Request $request)
    {
        $user = $request->user();
        
        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'current_tenant' => $user->currentTenant(),
                'tenants' => $user->tenants,
            ],
        ]);
    }
}