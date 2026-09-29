<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:150'],

            'username' => [
                'required',
                'string',
                'max:50',
                'unique:users,username',
            ],

            'email' => [
                'nullable',
                'email',
                'max:255',
                'unique:users,email',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
            ],

            'role_id' => [
                'required',
                Rule::exists('roles', 'id')->whereNull('deleted_at'),
            ],

            'status' => ['sometimes', 'boolean'],

            'last_login_at' => ['nullable', 'date'],
        ];
    }
}
