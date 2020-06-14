<?php

namespace App\Http\Controllers\Twit;

use App\Http\Controllers\Controller;
use App\Http\Resources\TwitResource;
use App\Models\Twit;
use App\User;
use Illuminate\Http\Request;

class TwitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::whereId(auth()->id())->first();
        $twits_followers = $user->followers()->with(['twits', 'twits.user'])->get()->pluck('twits')->collapse();
        $twits = $twits_followers->merge($user->twits()->with(['user'])->get());
        return TwitResource::collection($twits);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $twit = Twit::create([
            'user_id' => auth()->id(),
            'content' => $request->twit
        ]);
        return TwitResource::make($twit);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Twit  $twit
     * @return \Illuminate\Http\Response
     */
    public function show(Twit $twit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Twit  $twit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Twit $twit)
    {
        //
    }
}
