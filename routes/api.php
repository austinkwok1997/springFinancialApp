<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::put('/points/{user}', [UserController::class, 'updatePoints']);

Route::get('/initialUsers', [UserController::class, 'initialUsers']);

Route::get('/usersByPoints', [UserController::class, 'getUsersByPoints']);
