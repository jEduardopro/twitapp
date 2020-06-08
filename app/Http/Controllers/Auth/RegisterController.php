<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Auth\RegistersUsers;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
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
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        if(filter_var($data['login'], FILTER_VALIDATE_EMAIL)){
            $field_name = 'email';
            $rules = ['required', 'string', 'email', 'max:255', 'unique:users'];
        } else {
            $field_name = 'phone';
            $rules = ['required', 'numeric', 'digits_between:10,10', 'unique:users'];
        };
        $data[$field_name] = $data['login'];

        return Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            $field_name => $rules,
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ], [
            'phone.digits_between' => 'Introduce un numero de telefono valido'
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \App\User
     */
    protected function create(array $data)
    {
        $field_name = filter_var($data['login'], FILTER_VALIDATE_EMAIL) ? 'email' : 'phone';
        return User::create([
            'name' => $data['name'],
            'username' => Str::slug($data['name'].time()),
            $field_name => $data['login'],
            'password' => Hash::make($data['password']),
        ]);
    }
}
