<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCountryRequest;
use App\Http\Requests\UpdateCountryRequest;
use App\Http\Resources\CountryResource;
use App\Models\Country;

class CountryController extends Controller
{
    public function index()
    {
        $countries = Country::ordered()->get();

        return CountryResource::collection($countries);
    }

    public function store(StoreCountryRequest $request)
    {
        $country = Country::create($request->validated());

        return new CountryResource($country);
    }

    public function show(Country $country)
    {
        return new CountryResource($country);
    }

    public function update(UpdateCountryRequest $request, Country $country)
    {
        $country->update($request->validated());

        return new CountryResource($country->fresh());
    }

    public function destroy(Country $country)
    {
        $country->delete();

        return response()->json([
            'message' => 'Country deleted successfully.',
        ]);
    }
}
