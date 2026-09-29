<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBirthAccuracyRequest;
use App\Http\Requests\UpdateBirthAccuracyRequest;
use App\Http\Resources\BirthAccuracyResource;
use App\Models\BirthAccuracy;

class BirthAccuracyController extends Controller
{
    public function index()
    {
        $birthAccuracies = BirthAccuracy::ordered()->get();

        return BirthAccuracyResource::collection($birthAccuracies);
    }

    public function store(StoreBirthAccuracyRequest $request)
    {
        $birthAccuracy = BirthAccuracy::create($request->validated());

        return new BirthAccuracyResource($birthAccuracy);
    }

    public function show(BirthAccuracy $birthAccuracy)
    {
        return new BirthAccuracyResource($birthAccuracy);
    }

    public function update(
        UpdateBirthAccuracyRequest $request,
        BirthAccuracy $birthAccuracy
    ) {
        $birthAccuracy->update($request->validated());

        return new BirthAccuracyResource($birthAccuracy->fresh());
    }

    public function destroy(BirthAccuracy $birthAccuracy)
    {
        $birthAccuracy->delete();

        return response()->json([
            'message' => 'Birth accuracy deleted successfully.',
        ]);
    }
}
