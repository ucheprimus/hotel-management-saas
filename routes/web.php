<?php

use Illuminate\Support\Facades\Route;

// All routes go to React SPA
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');