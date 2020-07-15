<?php

namespace App\Http\Controllers\Twit;

use App\Events\TwitHasNewComment;
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
        event(new TwitHasNewComment($twit));
        return CommentResource::make(Comment::with('user')->where('id', $comment->id)->first());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Twit  $twit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Twit $twit, $comment_id)
    {
        $twit->comments()->where('id', $comment_id)->delete();
    }
}
