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
        $baseUrl = rtrim(
            $request->getSchemeAndHttpHost() . $request->getBasePath(),
            '/'
        );

        $imageUrl = $this->image
            ? $baseUrl . '/storage/' . ltrim($this->image, '/')
            : null;

        return [
            'id' => $this->id,

            'name' => $this->name,
            'name_eng' => $this->name_eng,
            'slug' => $this->slug,

            'image' => $this->image,
            'image_url' => $imageUrl,

            'gender_id' => $this->gender_id,
            'birth_date' => $this->birth_date?->format('Y-m-d'),
            'birth_time' => $this->birth_time,

            'country_id' => $this->country_id,
            'city_id' => $this->city_id,
            'time_zone' => $this->time_zone,

            'zodiac_sign_id' => $this->zodiac_sign_id,
            'birth_accuracy_id' => $this->birth_accuracy_id,

            'biography' => $this->biography,
            'wikipedia_url' => $this->wikipedia_url,
            'status' => $this->status,

            /*
            |--------------------------------------------------------------------------
            | Relationships
            |--------------------------------------------------------------------------
            */

            'gender' => $this->whenLoaded(
                'gender',
                fn () => [
                    'id' => $this->gender->id,
                    'name' => $this->gender->name,
                    'name_eng' => $this->gender->name_eng ?? null,
                ]
            ),

            'country' => $this->whenLoaded(
                'country',
                fn () => [
                    'id' => $this->country->id,
                    'name' => $this->country->name,
                    'name_eng' => $this->country->name_eng ?? null,
                ]
            ),

            'city' => $this->whenLoaded(
                'city',
                fn () => [
                    'id' => $this->city->id,
                    'country_id' => $this->city->country_id,
                    'name' => $this->city->name,
                    'name_eng' => $this->city->name_eng ?? null,
                    'latitude' => $this->city->latitude,
                    'longitude' => $this->city->longitude,
                ]
            ),

            'zodiac' => $this->whenLoaded(
                'zodiacSign',
                fn () => [
                    'id' => $this->zodiacSign->id,
                    'name' => $this->zodiacSign->name,
                    'name_eng' => $this->zodiacSign->name_eng ?? null,
                    'slug' => $this->zodiacSign->slug ?? null,
                ]
            ),

            'birth_accuracy' => $this->whenLoaded(
                'birthAccuracy',
                fn () => [
                    'id' => $this->birthAccuracy->id,
                    'code' => $this->birthAccuracy->code,
                    'name' => $this->birthAccuracy->name,
                    'name_eng' => $this->birthAccuracy->name_eng ?? null,
                ]
            ),

            'charts' => $this->whenLoaded(
                'charts',
                fn () => ChartResource::collection($this->charts)
            ),
        ];
    }
}
