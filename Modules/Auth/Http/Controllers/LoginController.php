<?php

namespace Modules\Auth\Http\Controllers;

use Modules\Auth\Services\AuthService;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class LoginController extends AuthController
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        $user = $this->authService->login($request->only('email', 'password'));

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => ['Invalid credentials provided.'],
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->respondWithToken($token, $user);
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());

        return response()->json([
            'message' => 'Logged out successfully',
        ]);
    }
}