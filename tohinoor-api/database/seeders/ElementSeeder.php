<?php

namespace Database\Seeders;

use App\Models\Element;
use Illuminate\Database\Seeder;

class ElementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $elements = [
            [
                'name' => 'آتش',
                'name_eng' => 'fire',
                'description' => 'عنصر آتش',
            ],
            [
                'name' => 'خاک',
                'name_eng' => 'earth',
                'description' => 'عنصر خاک',
            ],
            [
                'name' => 'هوا',
                'name_eng' => 'air',
                'description' => 'عنصر هوا',
            ],
            [
                'name' => 'آب',
                'name_eng' => 'water',
                'description' => 'عنصر آب',
            ],
            [
                'name' => 'اتر',
                'name_eng' => 'ether',
                'description' => 'عنصر اتر',
            ],
        ];

        foreach ($elements as $element) {
            Element::create($element);
        }
    }
}
