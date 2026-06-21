<?php

namespace Modules\Auth\Http\Controllers;

use Modules\Auth\Services\AuthService;
use Illuminate\Http\Request;

class RegisterController extends AuthController
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', 'min:8'],
            'hotel_name' => 'required|string|max:255',
        ]);

        $user = $this->authService->register($request->all());

        $token = $user->createToken('auth_token')->plainTextToken;

        return $this->respondWithToken($token, $user, 'Registration successful');
    }
}