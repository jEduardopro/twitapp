<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('home/{x?}/{y?}', 'HomeController@index')->name('home');

Route::redirect('/', '/home');


// Users routes
Route::resource('users', 'User\UserController');
Route::get('me', 'User\UserController@me');
Route::resource('users.follows', 'User\UserFollowsController')->only(['store', 'destroy']);
Route::resource('users.following', 'User\UserFollowingController')->only(['index']);
// Twits routes
Route::resource('twits', 'Twit\TwitController');
