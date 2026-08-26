<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePersonRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150'],
            'name_eng' => ['required', 'string', 'max:150'],

            'image' => ['nullable', 'string', 'max:255'],

            'gender_id' => ['nullable', Rule::exists('genders', 'id')->whereNull('deleted_at'),],

            'birth_date' => ['nullable', 'date'],
            'birth_time' => ['nullable', 'date_format:H:i:s'],

            'country_id' => ['nullable', Rule::exists('countries', 'id')->whereNull('deleted_at'),],
            'city_id' => ['nullable', Rule::exists('cities', 'id')->whereNull('deleted_at'),],

            'time_zone' => ['nullable', 'string', 'max:255'],

            'zodiac_sign_id' => ['nullable', Rule::exists('zodiac_signs', 'id')->whereNull('deleted_at'),],
            'birth_accuracy_id' => ['nullable', Rule::exists('birth_accuracies', 'id')->whereNull('deleted_at'),],

            'biography' => ['nullable', 'string'],
            'wikipedia_url' => ['nullable', 'url', 'max:255'],

            'status' => ['sometimes', 'boolean'],
        ];
    }
}
