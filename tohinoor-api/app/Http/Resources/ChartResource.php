<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ChartResource extends JsonResource
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
            'person_id' => $this->person_id,

            'chart_type_id' => $this->chart_type_id,

            'image' => $this->image,
            'image_url' => $imageUrl,

            'chart_type' => $this->whenLoaded(
                'chartType',
                fn () => [
                    'id' => $this->chartType->id,
                    'name' => $this->chartType->name,
                    'name_eng' => $this->chartType->name_eng,
                    'description' => $this->chartType->description,
                ]
            ),
        ];
    }
}
