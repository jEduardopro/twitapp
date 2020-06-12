<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:50',
            'username' => 'required|alpha_dash|max:50|unique:users,username,'.$this->user()->id,
            'email' => 'email|unique:users,email,'.$this->user()->id,
            'phone' => 'numeric|digits_between:10,10',
            'description' => 'max:160'
        ];
    }

    public function messages()
    {
        return [
            'username.alpha_dash' => 'El username solo puede contener numeros, letras y guiones',
            'username.unique' => 'El username esta en uso',
            'email.unique' => 'El correo ya esta en uso'
        ];
    }
}
