<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;

// API v1 routes
Route::prefix('v1')->group(function () {
    
    // Auth routes (following blueprint: /api/v1/auth/*)
    Route::prefix('auth')->group(function () {
        
        // Public auth routes
        Route::post('/register', function (Request $request) {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);
            
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
            
            // Assign default role
            $user->assignRole('Hotel Owner');
            
            // Create token with abilities
            $token = $user->createToken('auth_token', ['*'])->plainTextToken;
            
            return response()->json([
                'message' => 'User registered successfully',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->getRoleNames(),
                ],
                'token' => $token,
            ], 201);
        });
        
        Route::post('/login', function (Request $request) {
            $credentials = $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);
            
            if (!Auth::attempt($credentials)) {
                return response()->json([
                    'message' => 'Invalid credentials'
                ], 401);
            }
            
            $user = Auth::user();
            
            // Token abilities based on role
            $abilities = ['*'];
            if ($user->hasRole('Receptionist')) {
                $abilities = ['bookings:create', 'bookings:view', 'guests:view'];
            } elseif ($user->hasRole('Housekeeping')) {
                $abilities = ['housekeeping:view', 'housekeeping:update'];
            }
            
            $token = $user->createToken('auth_token', $abilities)->plainTextToken;
            
            return response()->json([
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'roles' => $user->getRoleNames(),
                    'permissions' => $user->getAllPermissions()->pluck('name'),
                ],
                'token' => $token,
                'token_abilities' => $abilities,
            ]);
        });
        
        Route::post('/logout', function (Request $request) {
            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'Logged out successfully']);
        })->middleware('auth:sanctum');
        
        Route::post('/forgot-password', function (Request $request) {
            $request->validate(['email' => 'required|email']);
            
            $status = Password::sendResetLink($request->only('email'));
            
            return $status === Password::RESET_LINK_SENT
                ? response()->json(['message' => 'Reset link sent to your email'], 200)
                : response()->json(['message' => 'Unable to send reset link'], 400);
        });
        
        Route::post('/reset-password', function (Request $request) {
            $request->validate([
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|min:8|confirmed',
            ]);
            
            $status = Password::reset(
                $request->only('email', 'password', 'password_confirmation', 'token'),
                function ($user, $password) {
                    $user->forceFill([
                        'password' => Hash::make($password)
                    ])->setRememberToken(Str::random(60));
                    $user->save();
                    event(new PasswordReset($user));
                }
            );
            
            return $status === Password::PASSWORD_RESET
                ? response()->json(['message' => 'Password reset successfully'], 200)
                : response()->json(['message' => 'Invalid token or email'], 400);
        });
        
        Route::post('/email/verification-notification', function (Request $request) {
            $request->user()->sendEmailVerificationNotification();
            return response()->json(['message' => 'Verification email sent']);
        })->middleware('auth:sanctum');
        
        Route::get('/email/verify/{id}/{hash}', function ($id, $hash) {
            $user = User::findOrFail($id);
            
            if (!hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
                return response()->json(['message' => 'Invalid verification link'], 400);
            }
            
            if ($user->hasVerifiedEmail()) {
                return response()->json(['message' => 'Email already verified'], 200);
            }
            
            $user->markEmailAsVerified();
            
            return response()->json(['message' => 'Email verified successfully'], 200);
        })->name('verification.verify');
    });
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', function (Request $request) {
            return response()->json([
                'user' => $request->user(),
                'roles' => $request->user()->getRoleNames(),
                'permissions' => $request->user()->getAllPermissions()->pluck('name'),
            ]);
        });

        Route::get('/test-feature/{feature}', function ($feature) {
    $isEnabled = app(\App\Services\FeatureService::class)->isEnabled($feature);
    return response()->json([
        'feature' => $feature,
        'enabled' => $isEnabled,
    ]);
});
    });
});