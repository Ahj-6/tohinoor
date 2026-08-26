<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PersonResource extends JsonResource
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
            'image' => $this->image,

            'gender_id' => $this->gender_id,

            'birth_date' => $this->birth_date,
            'birth_time' => $this->birth_time,

            'country_id' => $this->country_id,
            'city_id' => $this->city_id,
            'time_zone' => $this->time_zone,

            'zodiac_sign_id' => $this->zodiac_sign_id,
            'birth_accuracy_id' => $this->birth_accuracy_id,

            'biography' => $this->biography,
            'wikipedia_url' => $this->wikipedia_url,

            'status' => $this->status,
        ];
    }
}
