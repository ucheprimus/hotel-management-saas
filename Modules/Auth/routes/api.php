<?php

use Illuminate\Support\Facades\Route;
use Modules\Auth\Http\Controllers\LoginController;
use Modules\Auth\Http\Controllers\RegisterController;
use Modules\Auth\Http\Controllers\ForgotPasswordController;
use Modules\Auth\Http\Controllers\ResetPasswordController;
use Modules\Auth\Http\Controllers\EmailVerificationController;
use Modules\Auth\Http\Controllers\UserController;

Route::prefix('v1/auth')->group(function () {

    // Public routes
    Route::post('/register', [RegisterController::class, 'register']);
    Route::post('/login', [LoginController::class, 'login']);
    Route::post('/forgot-password', [ForgotPasswordController::class, 'sendResetLinkEmail']);
    Route::post('/reset-password', [ResetPasswordController::class, 'reset']);

    // Email verification (public but signed)
    Route::get('/email/verify/{id}/{hash}', [EmailVerificationController::class, 'verify'])
        ->name('verification.verify');

    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'logout']);
        Route::post('/email/verification-notification', [EmailVerificationController::class, 'sendVerificationEmail']);
        Route::get('/user', [UserController::class, 'currentUser']);
    });
});