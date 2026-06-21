<?php

namespace Modules\Auth\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected function respondWithToken($token, $user, $message = 'Login successful')
    {
        return response()->json([
            'message' => $message,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
                'permissions' => $user->getAllPermissions()->pluck('name'),
                'created_at' => $user->created_at,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => config('sanctum.expiration', 525600) * 60,
        ]);
    }
}