<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreQualityRequest;
use App\Http\Requests\UpdateQualityRequest;
use App\Http\Resources\QualityResource;
use App\Models\Quality;

class QualityController extends Controller
{
    public function index()
    {
        $qualities = Quality::ordered()->get();

        return QualityResource::collection($qualities);
    }

    public function store(StoreQualityRequest $request)
    {
        $quality = Quality::create($request->validated());

        return new QualityResource($quality);
    }

    public function show(Quality $quality)
    {
        return new QualityResource($quality);
    }

    public function update(UpdateQualityRequest $request, Quality $quality)
    {
        $quality->update($request->validated());

        return new QualityResource($quality->fresh());
    }

    public function destroy(Quality $quality)
    {
        $quality->delete();

        return response()->json([
            'message' => 'Quality deleted successfully.',
        ]);
    }
}
