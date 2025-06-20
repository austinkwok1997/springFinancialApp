<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Renders home page
Route::get('/', function () {
    $users = User::all();
    return Inertia::render('home', ["users" => $users]);
});

// Changes user's points
Route::put('/points/{user}', [UserController::class, 'updatePoints']);

// Adds user
Route::post('/addUser', [UserController::class, 'addUser']);

// Deletes user
Route::delete('/deleteUser/{user}', [UserController::class, 'deleteUser']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
