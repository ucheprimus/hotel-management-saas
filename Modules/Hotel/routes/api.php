<?php

use Illuminate\Support\Facades\Route;
use Modules\Hotel\Http\Controllers\HotelController;

Route::prefix('v1')->middleware(['auth:sanctum', 'tenant.context'])->group(function () {
    
    Route::prefix('hotels')->group(function () {
        Route::get('/', [HotelController::class, 'index']);
        Route::post('/', [HotelController::class, 'store']);
        Route::get('/{id}', [HotelController::class, 'show']);
        Route::put('/{id}', [HotelController::class, 'update']);
        Route::delete('/{id}', [HotelController::class, 'destroy']);
        Route::get('/{id}/settings', [HotelController::class, 'settings']);
        Route::put('/{id}/settings', [HotelController::class, 'updateSettings']);
    });
});