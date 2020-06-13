<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('home/{x?}/{y?}', 'HomeController@index')->name('home');

Route::redirect('/', '/home');


// Users routes
Route::resource('users', 'User\UserController');
// Twits routes
Route::resource('twits', 'Twit\TwitController');
