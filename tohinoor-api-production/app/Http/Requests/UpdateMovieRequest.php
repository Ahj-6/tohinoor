<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMovieRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'name_eng' => ['nullable', 'string', 'max:255'],
            'director' => ['nullable', 'string', 'max:150'],
            'release_year' => ['nullable', 'integer', 'min:1888', 'max:2100'],
            'image' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'display_order' => ['sometimes', 'integer'],
            'status' => ['sometimes', 'boolean'],
        ];
    }
}
