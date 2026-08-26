<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreChartTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'name_eng' => ['required', 'string', 'max:20', 'unique:chart_types,name_eng'],
            'description' => ['nullable', 'string'],
        ];
    }
}
