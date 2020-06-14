<?php

use App\Models\Twit;
use App\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UserSeeder::class);
        factory(User::class, 20)->create();
        factory(Twit::class, 300)->create();

        $users = User::all();
        User::all()->each(function ($user) use ($users) {
            $user->followers()->attach(
                $users->random(rand(1, 20))->pluck('id')->toArray()
            );
        });
    }
}
