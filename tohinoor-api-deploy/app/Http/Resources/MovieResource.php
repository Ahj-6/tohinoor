<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MovieResource extends JsonResource
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
            'director' => $this->director,
            'release_year' => $this->release_year,
            'image' => $this->image,
            'description' => $this->description,
            'display_order' => $this->display_order,
            'status' => $this->status,
        ];
    }
}
