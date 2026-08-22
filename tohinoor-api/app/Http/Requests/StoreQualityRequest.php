<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQualityRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:20'],
            'name_eng' => ['required', 'string', 'max:20', 'unique:qualities,name_eng'],
        ];
    }
}
