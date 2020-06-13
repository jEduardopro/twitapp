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
            "created_at" => $this->created_at->diffForHumans(),
            "relationships" => $this->when(
                $this->relationLoaded('user'),
                function () {
                    return [
                        "user" => [
                            "id" => $this->user->id,
                            "name" => $this->user->name,
                            "image" => "/storage/users/avatars/" . $this->user->image
                        ]
                    ];
                }
            )
        ];
    }
}
