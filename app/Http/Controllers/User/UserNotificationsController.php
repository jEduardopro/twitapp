<?php

namespace App\Http\Controllers\User;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserNotificationsController extends Controller
{
    public function index(User $user)
    {
        return $user->notifications()->latest()->paginate();
    }

    public function update(User $user)
    {
        $user->unreadNotifications->markAsRead();
        return $user->notifications;
    }
}
