<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNatureRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $nature = $this->route('nature');

        return [
            'name' => ['required', 'string', 'max:20'],
            'name_eng' => [
                'required',
                'string',
                'max:20',
                Rule::unique('natures', 'name_eng')->ignore($nature?->id),
            ],
        ];
    }
}
