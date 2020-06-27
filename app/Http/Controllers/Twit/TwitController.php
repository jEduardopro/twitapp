<?php

namespace App\Http\Controllers\Twit;

use App\Http\Controllers\Controller;
use App\Http\Resources\TwitResource;
use App\Models\Twit;
use App\Notifications\NewTwit;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class TwitController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = User::where('id', auth()->id())->first();
        $users_ids = $user->following()->pluck('followers.followed_id')->toArray();
        array_push($users_ids, $user->id);
        $twits = Twit::whereIn('user_id', $users_ids)->with(['user', 'likes', 'comments', 'comments.user'])->latest()->paginate();
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
        $twit_fresh = Twit::whereId($twit->id)->with('user')->first();
        Notification::send(auth()->user()->followers, new NewTwit(TwitResource::make($twit_fresh)));
        return TwitResource::make($twit_fresh);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Twit  $twit
     * @return \Illuminate\Http\Response
     */
    public function show(Twit $twit)
    {
        return TwitResource::make(Twit::with([
            'user',
            'comments' => function ($query) {
                $query->latest();
            },
            'comments.user'
        ])->where('id', $twit->id)->first());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Twit  $twit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Twit $twit)
    {
        $twit->delete();
    }
}
