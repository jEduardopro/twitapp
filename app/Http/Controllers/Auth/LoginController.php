<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{

    use AuthenticatesUsers;

    protected function authenticated(Request $request, $user)
    {
        return response()->json($user);
    }

    public function username()
    {
        $input = request()->input('login');
        if(filter_var($input, FILTER_VALIDATE_EMAIL)){
            $field_name = 'email';
        } else if(filter_var($input, FILTER_VALIDATE_INT)){
            $field_name = 'phone';
        } else {
            $field_name = 'username';
        }
        request()->merge([$field_name => $input]);
        return $field_name;
    }

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }
}
