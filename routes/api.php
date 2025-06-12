<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Create 5 initial users for app
Route::post('/initialUsers', [UserController::class, 'initialUsers']);


// Returns the users info grouped by score and include the average age of the users
Route::get('/usersByPoints', [UserController::class, 'getUsersByPoints']);
