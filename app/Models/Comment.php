<?php

namespace App\Models;

use App\Traits\Likes;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use Likes;

    protected $fillable = ['user_id', 'twit_id', 'content'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function twit()
    {
        return $this->belongsTo(Twit::class);
    }
}
