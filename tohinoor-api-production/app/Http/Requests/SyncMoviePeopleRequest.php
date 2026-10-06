<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SyncMoviePeopleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'person_ids' => ['required', 'array'],
            'person_ids.*' => [
                'integer',
                'distinct',
                Rule::exists('people', 'id')->whereNull('deleted_at'),
            ],
        ];
    }
}
