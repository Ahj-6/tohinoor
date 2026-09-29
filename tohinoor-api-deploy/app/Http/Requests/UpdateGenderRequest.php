<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateGenderRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $gender = $this->route('gender');

        return [
            'name' => ['required', 'string', 'max:20'],
            'name_eng' => [
                'required',
                'string',
                'max:20',
                Rule::unique('genders', 'name_eng')->ignore($gender?->id),
            ],
        ];
    }
}
