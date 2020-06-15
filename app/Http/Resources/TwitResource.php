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
            "content" => $this->content,
            "comments_count" => count($this->comments),
            "created_at" => $this->created_at->diffForHumans(),
            "relationships" => [
                "user" => $this->when(
                    $this->relationLoaded('user'),
                    function () {
                        return [
                            "id" => $this->user->id,
                            "name" => $this->user->name,
                            "username" => $this->user->username,
                            "image" => ($this->user->image) ? "/storage/users/avatars/" . $this->user->image : ''
                        ];
                    }
                ),
                "comments" => $this->when(
                    $this->relationLoaded('comments'),
                    function () {
                        return CommentResource::collection($this->comments);
                    }
                )
            ]
        ];
    }
}
