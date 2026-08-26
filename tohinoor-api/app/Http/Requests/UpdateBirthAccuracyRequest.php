<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBirthAccuracyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $birthAccuracy = $this->route('birthAccuracy');

        return [
            'code' => [
                'required',
                'string',
                'max:5',
                Rule::unique('birth_accuracies', 'code')->ignore($birthAccuracy?->id),
            ],
            'name' => ['required', 'string', 'max:100'],
            'name_eng' => [
                'required',
                'string',
                'max:100',
                Rule::unique('birth_accuracies', 'name_eng')->ignore($birthAccuracy?->id),
            ],
            'description' => ['nullable', 'string'],
        ];
    }
}
