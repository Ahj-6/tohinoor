<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdatePlanetRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $planet = $this->route('planet');

        return [
            'name' => ['required', 'string', 'max:20'],
            'name_eng' => [
                'required',
                'string',
                'max:20',
                Rule::unique('planets', 'name_eng')->ignore($planet?->id),
            ],
            'name_arabic' => ['nullable', 'string', 'max:20'],
            'name_sanskrit' => ['nullable', 'string', 'max:20'],

            'image' => ['nullable', 'string', 'max:255'],
            'icon' => ['nullable', 'string', 'max:255'],
            'symbol' => ['required', 'string', 'max:255'],

            'nature_id' => ['nullable', 'exists:natures,id'],
            'guna_1_id' => ['nullable', 'exists:gunas,id'],
            'guna_2_id' => ['nullable', 'exists:gunas,id'],
            'element_1_id' => ['nullable', 'exists:elements,id'],
            'element_2_id' => ['nullable', 'exists:elements,id'],
        ];
    }
}
