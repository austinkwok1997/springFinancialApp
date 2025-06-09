<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function updatePoints(User $user, Request $request){
        $content = $request->all();
        $user->update(['points' => $content['body']['points']]);
        return response()->json(["user" => $user], 200);
    }

    public function addUser(Request $request){
        $data = $request->all();
        User::create(['name' => $data['formData']['name'], 'age' => $data['formData']['age'], 'address' => $data['formData']['address'], 'points' => 0]);
        //$users = User::all();
        return response()->json(["form" => $data], 200);
    }

    public function deleteUser(User $user){
        $user->delete();
        return response("User deleted",200);
    }

    public function showUserInfoScreen(User $user){
        return Inertia::render('userInfo', ['user' => $user]);
    }
}
