<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Jobs\QrCodeAddressJob;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function updatePoints(User $user, Request $request){
        $request->validate([
            'body.points' => 'required'
        ]);
        $content = $request->all();
        $user->update(['points' => $content['body']['points']]);
        return response()->json(["user" => $user], 200);
    }

    public function addUser(Request $request){
        $request->validate([
            'formData.name' => 'required',
            'formData.age' => ['required', 'min:0'],
            'formData.address' => 'required'
        ]);

        $data = $request->all();
        User::create(['name' => $data['formData']['name'], 'age' => $data['formData']['age'], 'address' => $data['formData']['address'], 'points' => 0]);
        QrCodeAddressJob::dispatch($data['formData']['address']);
        return response("User created", 200);
    }

    public function deleteUser(User $user){
        $user->delete();
        return response("User deleted",200);
    }

    public function showUserInfoScreen(User $user){
        return Inertia::render('userInfo', ['user' => $user]);
    }

    public function initialUsers(){
        $users = User::factory()->count(5)->create();
        return response()->json(["users" => User::all()], 200);
    }

    public function getUsersByPoints() {
        $users = User::all();
        $pointsArray = [];
        foreach($users as $user){
            if(isset($pointsArray[$user->points])){
                $pointsArray[$user->points]["names"][] = $user->name;
                $pointsArray[$user->points]["ageTotal"] += $user->age;
            }else{
                $pointsArray[$user->points] = array("names"=> array($user->name), "ageTotal" => $user->age);
            }
        }
        foreach($pointsArray as $key => $value){
            $pointsArray[$key]["average_age"] = $value["ageTotal"] / sizeof($value["names"]);
            unset($pointsArray[$key]["ageTotal"]);
        }
        return response()->json($pointsArray, 200);
    }
}
