<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlanetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'name_eng' => $this->name_eng,
            'name_arabic' => $this->name_arabic,
            'name_sanskrit' => $this->name_sanskrit,
            'image' => $this->image,
            'icon' => $this->icon,
            'symbol' => $this->symbol,

            'nature_id' => $this->nature_id,
            'guna_1_id' => $this->guna_1_id,
            'guna_2_id' => $this->guna_2_id,
            'element_1_id' => $this->element_1_id,
            'element_2_id' => $this->element_2_id,
        ];
    }
}