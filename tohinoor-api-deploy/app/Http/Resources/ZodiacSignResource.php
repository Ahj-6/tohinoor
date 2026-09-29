<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ZodiacSignResource extends JsonResource
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

            'planet_id' => $this->planet_id,
            'element_id' => $this->element_id,
            'quality_id' => $this->quality_id,
        ];
    }
}
