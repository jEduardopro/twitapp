<?php

namespace App\Http\Controllers\Twit;

use App\Http\Controllers\Controller;
use App\Models\Twit;
use Illuminate\Http\Request;

class TwitLikesController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Twit $twit)
    {
        $twit->like();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Twit  $twit
     * @return \Illuminate\Http\Response
     */
    public function destroy(Twit $twit)
    {
        $twit->unlike();
    }
}
