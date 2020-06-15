<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CommentResource extends JsonResource
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
            "twit_id" => $this->twit_id,
            "content" => $this->content,
            "created_at" => $this->created_at->diffForHumans(),
            "relationships" => [
                "user" => $this->whenLoaded('user', UserResource::make($this->user))
            ]
        ];
    }
}
