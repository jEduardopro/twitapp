<?php

namespace App\Http\Controllers\Twit;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Twit;
use Illuminate\Http\Request;

class TwitCommentsController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Twit $twit, Request $request)
    {
        $comment = $twit->comments()->create([
            "user_id" => auth()->id(),
            "content" => $request->comment
        ]);
        return CommentResource::make(Comment::with('user')->where('id', $comment->id)->first());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Twit  $twit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Twit $twit)
    {
        $twit->comments()->where('user_id', auth()->id())->delete();
    }
}
