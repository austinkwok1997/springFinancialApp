<?php

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    $users = User::all();
    return Inertia::render('home', ["users" => $users]);
});

Route::get('/addUser', function() {
    return Inertia::render('addUserPage');
});

Route::post('/addUser', [UserController::class, 'addUser']);
Route::delete('/deleteUser/{user}', [UserController::class, 'deleteUser']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
