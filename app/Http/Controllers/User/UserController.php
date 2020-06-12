<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateUserFormRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateUserFormRequest $request, User $user)
    {
        $filename_cover_image = null;
        $filename_image = null;
        if ($request->has('cover_image')) {
            if ($user->cover_image) {
                Storage::disk('covers')->delete($user->cover_image);
            }
            $filename_cover_image = time().rand(1,999).'.'.$request->file('cover_image')->getClientOriginalExtension();
            Storage::disk('covers')->put(
                $filename_cover_image,
                File::get($request->cover_image)
            );
        }
        if ($request->has('image')) {
            if ($user->image) {
                Storage::disk('avatars')->delete($user->image);
            }
            $filename_image = time().rand(1,999).'.'.$request->file('cover_image')->getClientOriginalExtension();
            Storage::disk('avatars')->put(
                $filename_image,
                File::get($request->image)
            );
        }
        $data = $request->all();
        $data['cover_image'] = $filename_cover_image;
        $data['image'] = $filename_image;
        $user->update($data);
        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
