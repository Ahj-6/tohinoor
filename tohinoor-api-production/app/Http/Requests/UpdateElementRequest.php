<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateElementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $element = $this->route('element');

        return [
            'name' => ['required', 'string', 'max:50'],
            'name_eng' => [
                'required',
                'string',
                'max:50',
                Rule::unique('elements', 'name_eng')->ignore($element?->id),
            ],
            'description' => ['nullable', 'string'],
        ];
    }
}
