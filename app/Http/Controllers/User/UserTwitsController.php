<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Resources\TwitResource;
use App\User;
use Illuminate\Http\Request;

class UserTwitsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(User $user)
    {
        return TwitResource::collection($user->twits()->with(['user'])->latest()->get());
    }
}
