<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateChartRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $chart = $this->route('chart');

        return [
            'person_id' => [
                'required',
                Rule::exists('people', 'id')->whereNull('deleted_at'),
                Rule::unique('charts', 'person_id')
                    ->where(fn ($query) => $query->where('chart_type_id', $this->chart_type_id))
                    ->ignore($chart?->id),
            ],

            'chart_type_id' => [
                'required',
                Rule::exists('chart_types', 'id')->whereNull('deleted_at'),
            ],

            'image' => ['required', 'string', 'max:255'],
        ];
    }
}
