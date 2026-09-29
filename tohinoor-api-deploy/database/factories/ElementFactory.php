<?php

namespace Database\Factories;

use App\Models\Element;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Element>
 */
class ElementFactory extends Factory
{
    protected $model = Element::class;

    public function definition(): array
    {
        return [
            'name' => fake()->word(),
            'name_eng' => fake()->unique()->word(),
            'description' => fake()->optional()->sentence(),
        ];
    }
}
