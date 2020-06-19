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
Route::get('users/{user:username}/twits', 'User\UserTwitsController@index');
Route::post('users/{user}/follows', 'User\UserFollowsController@store');
Route::delete('users/{user}/follows', 'User\UserFollowsController@destroy');
Route::resource('users.following', 'User\UserFollowingController')->only(['index']);
Route::resource('users.followers', 'User\UserFollowersController')->only(['index']);
// Twits routes
Route::resource('twits', 'Twit\TwitController');
Route::post('twits/{twit}/likes', 'Twit\TwitLikesController@store');
Route::delete('twits/{twit}/likes', 'Twit\TwitLikesController@destroy');

Route::resource('twits.comments', 'Twit\TwitCommentsController')->only(['store', 'destroy']);

Route::post('comments/{comment}/likes', 'Comment\CommentLikesController@store');
Route::delete('comments/{comment}/likes', 'Comment\CommentLikesController@destroy');
