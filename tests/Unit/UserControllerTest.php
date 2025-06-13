<?php

namespace App\Http\Controllers;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Queue;
use App\Jobs\QrCodeAddressJob;


class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_update_points_successfully_updates_user_points()
    {
        $user = User::factory()->create(['points' => 10]);
        $payload = ['body' => ['points' => 50]];

        $response = $this->put('/points/' . $user->id, $payload);

        $response->assertStatus(200)
            ->assertJsonFragment(['points' => 50]);
        $this->assertEquals(50, $user->fresh()->points);
    }

    public function test_update_points_requires_points()
    {
        $user = User::factory()->create();
        $payload = [];

        $response = $this->putJson('/points/' . $user->id, $payload);

        $response->assertStatus(422);
    }

    public function test_add_user_creates_user()
    {
        $payload = [
            'formData' => [
                'name' => 'John Doe',
                'age' => 30,
                'address' => '123 Main St'
            ]
        ];

        $response = $this->postJson('/addUser', $payload);

        $response->assertStatus(200)
            ->assertSee('User created');
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'age' => 30,
            'address' => '123 Main St',
            'points' => 0
        ]);
    }

    public function test_add_user_requires_fields()
    {
        $payload = ['formData' => []];
        $response = $this->postJson('/addUser', $payload);
        $response->assertStatus(422);
    }

    public function test_delete_user_deletes_user()
    {
        $user = User::factory()->create();
        $response = $this->deleteJson('/deleteUser/' . $user->id, []);
        $response->assertStatus(200)
            ->assertSee('User deleted');
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_initial_users_creates_and_returns_users()
    {
        $response = $this->postJson('/api/initialUsers',[]);
        $response->assertStatus(200)
            ->assertJsonStructure(['users']);
        $this->assertCount(5, User::all());
    }

    public function test_get_users_by_points_returns_grouped_data()
    {
        User::factory()->create(['name' => 'A', 'points' => 10, 'age' => 20]);
        User::factory()->create(['name' => 'B', 'points' => 10, 'age' => 30]);
        User::factory()->create(['name' => 'C', 'points' => 20, 'age' => 40]);

        $response = $this->getJson('/api/usersByPoints');

        $response->assertStatus(200)
            ->assertJsonFragment([
                'names' => ['A', 'B'],
                'average_age' => 25.0
            ])
            ->assertJsonFragment([
                'names' => ['C'],
                'average_age' => 40.0
            ]);
    }
}