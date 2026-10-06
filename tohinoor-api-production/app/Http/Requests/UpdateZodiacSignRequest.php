<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateZodiacSignRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $zodiacSign = $this->route('zodiacSign');

        return [
            'name' => ['required', 'string', 'max:20'],
            'name_eng' => [
                'required',
                'string',
                'max:20',
                Rule::unique('zodiac_signs', 'name_eng')->ignore($zodiacSign?->id),
            ],
            'name_arabic' => ['nullable', 'string', 'max:20'],
            'name_sanskrit' => ['nullable', 'string', 'max:20'],

            'image' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'symbol' => ['required', 'string', 'max:255'],

            'planet_id' => ['required', 'exists:planets,id'],
            'element_id' => ['required', 'exists:elements,id'],
            'quality_id' => ['required', 'exists:qualities,id'],
        ];
    }
}
