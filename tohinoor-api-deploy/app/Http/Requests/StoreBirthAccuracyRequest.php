<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBirthAccuracyRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'code' => ['required', 'string', 'max:5', 'unique:birth_accuracies,code'],
            'name' => ['required', 'string', 'max:100'],
            'name_eng' => ['required', 'string', 'max:100', 'unique:birth_accuracies,name_eng'],
            'description' => ['nullable', 'string'],
        ];
    }
}
