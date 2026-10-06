<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRoleRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $role = $this->route('role');

        $nameEngRules = [
            'required',
            'string',
            'max:50',
        ];

        /*
         * نقش‌های سیستمی:
         * admin / operator / student
         *
         * name_eng آن‌ها نباید تغییر کند،
         * چون RoleMiddleware برای کنترل دسترسی
         * به همین مقدار وابسته است.
         */
        if (
            $role &&
            in_array(
                $role->name_eng,
                ['admin', 'operator', 'student'],
                true
            )
        ) {
            $nameEngRules[] = Rule::in([
                $role->name_eng,
            ]);
        } else {
            $nameEngRules[] = Rule::unique(
                'roles',
                'name_eng'
            )->ignore($role?->id);
        }

        return [
            'name' => [
                'required',
                'string',
                'max:50',
            ],

            'name_eng' => $nameEngRules,

            'description' => [
                'nullable',
                'string',
            ],
        ];
    }
}
