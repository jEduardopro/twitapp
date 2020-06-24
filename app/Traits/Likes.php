<?php

namespace App\Traits;

use App\Models\Like;
use Illuminate\Support\Str;
use App\Events\ModelIsLiked;
use App\Events\ModelIsUnLiked;

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

        event(new ModelIsLiked($this));
    }

    public function name_event()
    {
        return Str::lower(Str::plural(class_basename($this))) . "-" . $this->id . "-likes";
    }

    public function unlike()
    {
        $this->likes()->where('user_id', auth()->id())->delete();
        event(new ModelIsUnLiked($this));
    }

    public function liked()
    {
        return $this->likes()->where('user_id', auth()->id())->exists();
    }

    public function likes_count()
    {
        return $this->likes->count();
    }

    public function users_to_like()
    {
        return $this->likes()->with('user')->get()->pluck('user');
    }
}
