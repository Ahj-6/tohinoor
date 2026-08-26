<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateCityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $city = $this->route('city');

        return [
            'country_id' => ['required', 'exists:countries,id'],
            'name' => ['required', 'string', 'max:100'],
            'name_eng' => [
                'required',
                'string',
                'max:100',
                Rule::unique('cities', 'name_eng')
                    ->where(fn ($query) => $query->where('country_id', $this->country_id))
                    ->ignore($city?->id),
            ],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
        ];
    }
}
