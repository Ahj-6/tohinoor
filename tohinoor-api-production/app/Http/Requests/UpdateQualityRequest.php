<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateQualityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $quality = $this->route('quality');

        return [
            'name' => ['required', 'string', 'max:20'],
            'name_eng' => [
                'required',
                'string',
                'max:20',
                Rule::unique('qualities', 'name_eng')->ignore($quality?->id),
            ],
        ];
    }
}
