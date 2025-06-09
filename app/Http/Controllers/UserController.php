<?php

namespace App\Http\Controllers;

use App\Models\User;
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
        $name = $request->all()['formData']['name'];
        User::create(['name' => $name, 'points' => 0]);
        $users = User::all();
        return redirect('/');
    }

    public function deleteUser(User $user){
        $user->delete();
        return response("User deleted",200);
    }
}
