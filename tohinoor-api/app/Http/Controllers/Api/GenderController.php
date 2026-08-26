<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGenderRequest;
use App\Http\Requests\UpdateGenderRequest;
use App\Http\Resources\GenderResource;
use App\Models\Gender;

class GenderController extends Controller
{
    public function index()
    {
        $genders = Gender::ordered()->get();

        return GenderResource::collection($genders);
    }

    public function store(StoreGenderRequest $request)
    {
        $gender = Gender::create($request->validated());

        return new GenderResource($gender);
    }

    public function show(Gender $gender)
    {
        return new GenderResource($gender);
    }

    public function update(UpdateGenderRequest $request, Gender $gender)
    {
        $gender->update($request->validated());

        return new GenderResource($gender->fresh());
    }

    public function destroy(Gender $gender)
    {
        $gender->delete();

        return response()->json([
            'message' => 'Gender deleted successfully.',
        ]);
    }
}
