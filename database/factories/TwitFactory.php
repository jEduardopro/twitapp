<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Twit;
use Faker\Generator as Faker;

$factory->define(Twit::class, function (Faker $faker) {
    return [
        'content' => $faker->paragraphs(3, true),
        'user_id' => App\User::all()->random()->id,
    ];
});
