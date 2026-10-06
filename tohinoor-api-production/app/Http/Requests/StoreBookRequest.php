<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBookRequest extends FormRequest
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
            'author' => ['nullable', 'string', 'max:150'],
            'translator' => ['nullable', 'string', 'max:150'],
            'image' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'display_order' => ['sometimes', 'integer'],
            'status' => ['sometimes', 'boolean'],
        ];
    }
}
