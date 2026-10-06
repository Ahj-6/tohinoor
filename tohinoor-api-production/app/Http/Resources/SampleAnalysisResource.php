<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SampleAnalysisResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'person_id' => $this->person_id,
            'user_id' => $this->user_id,
            'pdf' => $this->pdf,
            'description' => $this->description,
            'display_order' => $this->display_order,
            'status' => $this->status,
        ];
    }
}

