<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TwitResource extends JsonResource
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
            "user_id" => $this->user_id,
            "event_name" => $this->name_event(),
            "content" => $this->content,
            "comments_count" => count($this->comments),
            "created_at" => $this->created_at->diffForHumans(),
            "relationships" => [
                "likes" => [
                    "liked" => $this->liked(),
                    "likes_count" => $this->likes_count()
                ],
                "user" => $this->when(
                    $this->relationLoaded("user"),
                    function () {
                        return [
                            "id" => $this->user->id,
                            "name" => $this->user->name,
                            "username" => $this->user->username,
                            "image" => ($this->user->image) ? $this->user->url_image("avatars", $this->user->image) : ""
                        ];
                    }
                ),
                "comments" => $this->when(
                    $this->relationLoaded("comments"),
                    function () {
                        return CommentResource::collection($this->comments);
                    }
                )
            ]
        ];
    }
}
