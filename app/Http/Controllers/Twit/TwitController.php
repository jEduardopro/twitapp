<?php

namespace App\Http\Controllers\Twit;

use App\Http\Controllers\Controller;
use App\Models\Twit;
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
        return Twit::latest()->get();
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
        return $twit;
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
