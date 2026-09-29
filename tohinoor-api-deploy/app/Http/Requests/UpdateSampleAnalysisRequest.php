<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSampleAnalysisRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],

            'person_id' => [
                'required',
                Rule::exists('people', 'id')->whereNull('deleted_at'),
            ],

            'user_id' => [
                'required',
                Rule::exists('users', 'id')->whereNull('deleted_at'),
            ],

            'pdf' => ['required', 'string', 'max:255'],

            'description' => ['nullable', 'string'],

            'display_order' => ['sometimes', 'integer'],

            'status' => ['sometimes', 'boolean'],
        ];
    }
}
