<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateChartTypeRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $chartType = $this->route('chartType');

        return [
            'name' => ['required', 'string', 'max:50'],
            'name_eng' => [
                'required',
                'string',
                'max:20',
                Rule::unique('chart_types', 'name_eng')->ignore($chartType?->id),
            ],
            'description' => ['nullable', 'string'],
        ];
    }
}
