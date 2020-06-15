<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "username" => $this->username,
            "phone" => $this->phone,
            "email" => $this->email,
            "description" => $this->description,
            "image" => ($this->image) ? "/storage/users/avatars/" . $this->image : '',
            "cover_image" => ($this->cover_image) ? "/storage/users/cover_images/" . $this->cover_image : '',
            "join_at" => Carbon::parse($this->created_at)->translatedFormat('j F Y'),
            "relationships" => [
                "followers" => $this->when(
                    $this->relationLoaded('followers'),
                    function () {
                        return $this->followers()->get()->pluck('id')->toArray();
                    }
                ),
                "following" => $this->when(
                    $this->relationLoaded('following'),
                    function () {
                        return $this->following()->get()->pluck('id')->toArray();
                    }
                ),
                "twits" => $this->when(
                    $this->relationLoaded('twits'),
                    function () {
                        return TwitResource::collection($this->twits()->with(['comments', 'comments.user', 'user'])->get());
                    }
                )
            ]
        ];
    }
}
