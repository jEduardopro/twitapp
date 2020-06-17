<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;


Route::get('@{username}/{a?}/{b?}', 'HomeController@index');
Route::get('/home', 'HomeController@index')->name('home');
Route::redirect('/', '/home');

Auth::routes();
// Users routes
Route::resource('users', 'User\UserController');
Route::get('auth/me', 'User\UserController@me');
Route::resource('users.follows', 'User\UserFollowsController')->only(['store', 'destroy']);
Route::resource('users.following', 'User\UserFollowingController')->only(['index']);
Route::resource('users.followers', 'User\UserFollowersController')->only(['index']);
// Twits routes
Route::resource('twits', 'Twit\TwitController');
Route::resource('twits.comments', 'Twit\TwitCommentsController')->only(['store', 'destroy']);
