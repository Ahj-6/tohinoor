<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGunaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $guna = $this->route('guna');

        return [
            'name' => ['required', 'string', 'max:20'],
            'name_eng' => [
                'required',
                'string',
                'max:20',
                Rule::unique('gunas', 'name_eng')->ignore($guna?->id),
            ],
        ];
    }
}
