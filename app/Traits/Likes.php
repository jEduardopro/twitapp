<?php

namespace App\Traits;

use App\Models\Like;

trait Likes
{
    public function likes()
    {
        return $this->morphMany(Like::class, 'likeable');
    }

    public function like()
    {
        $this->likes()->firstOrCreate([
            "user_id" => auth()->id()
        ]);
    }

    public function unlike()
    {
        $this->likes()->where('user_id', auth()->id())->delete();
    }

    public function liked()
    {
        return $this->likes()->where('user_id',auth()->id())->exists();
    }

    public function likes_count()
    {
        return $this->likes->count();
    }
}
