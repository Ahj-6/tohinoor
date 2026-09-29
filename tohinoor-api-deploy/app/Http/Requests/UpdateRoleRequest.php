<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $role = $this->route('role');

        return [
            'name' => ['required', 'string', 'max:50'],
            'name_eng' => [
                'required',
                'string',
                'max:50',
                Rule::unique('roles', 'name_eng')->ignore($role?->id),
            ],
            'description' => ['nullable', 'string'],
        ];
    }
}
