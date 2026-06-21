<?php

use Illuminate\Support\Facades\Route;
use Modules\Hotel\Http\Controllers\HotelController;
use Modules\Hotel\Http\Controllers\PropertyController;

Route::prefix('v1')->middleware(['auth:sanctum', 'tenant.context'])->group(function () {
    
    // Hotel routes
    Route::prefix('hotels')->group(function () {
        Route::get('/', [HotelController::class, 'index']);
        Route::post('/', [HotelController::class, 'store']);
        Route::get('/{id}', [HotelController::class, 'show']);
        Route::put('/{id}', [HotelController::class, 'update']);
        Route::delete('/{id}', [HotelController::class, 'destroy']);
        Route::get('/{id}/settings', [HotelController::class, 'settings']);
        Route::put('/{id}/settings', [HotelController::class, 'updateSettings']);
    });
    
    // Property routes
    Route::prefix('properties')->group(function () {
        Route::get('/', [PropertyController::class, 'index']);
        Route::post('/', [PropertyController::class, 'store']);
        Route::get('/{id}', [PropertyController::class, 'show']);
        Route::put('/{id}', [PropertyController::class, 'update']);
        Route::delete('/{id}', [PropertyController::class, 'destroy']);
        Route::get('/{id}/settings', [PropertyController::class, 'settings']);
        Route::put('/{id}/settings', [PropertyController::class, 'updateSettings']);
    });
});