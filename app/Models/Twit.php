<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Twit extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'content',
        'user_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
    ];


    public function likes()
    {
        return $this->hasMany(\App\Models\Like::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
