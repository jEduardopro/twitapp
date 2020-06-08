<?php
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Auth::routes();

Route::get('home/{x?}', 'HomeController@index')->name('home');

Route::redirect('/', '/home');
