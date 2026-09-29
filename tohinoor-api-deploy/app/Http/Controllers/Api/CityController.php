<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCityRequest;
use App\Http\Requests\UpdateCityRequest;
use App\Http\Resources\CityResource;
use App\Models\City;

class CityController extends Controller
{
    public function index()
    {
        $cities = City::ordered()->get();

        return CityResource::collection($cities);
    }

    public function store(StoreCityRequest $request)
    {
        $city = City::create($request->validated());

        return new CityResource($city);
    }

    public function show(City $city)
    {
        return new CityResource($city);
    }

    public function update(UpdateCityRequest $request, City $city)
    {
        $city->update($request->validated());

        return new CityResource($city->fresh());
    }

    public function destroy(City $city)
    {
        $city->delete();

        return response()->json([
            'message' => 'City deleted successfully.',
        ]);
    }
}
