<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCountryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $country = $this->route('country');

        return [
            'name' => ['required', 'string', 'max:100'],
            'name_eng' => [
                'required',
                'string',
                'max:100',
                Rule::unique('countries', 'name_eng')->ignore($country?->id),
            ],
        ];
    }
}
