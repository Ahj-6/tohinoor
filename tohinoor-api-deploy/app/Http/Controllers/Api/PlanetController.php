<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePlanetRequest;
use App\Http\Requests\UpdatePlanetRequest;
use App\Http\Resources\PlanetResource;
use App\Models\Planet;

class PlanetController extends Controller
{
    public function index()
    {
        $planets = Planet::ordered()->get();

        return PlanetResource::collection($planets);
    }

    public function store(StorePlanetRequest $request)
    {
        $planet = Planet::create($request->validated());

        return new PlanetResource($planet);
    }

    public function show(Planet $planet)
    {
        return new PlanetResource($planet);
    }

    public function update(UpdatePlanetRequest $request, Planet $planet)
    {
        $planet->update($request->validated());

        return new PlanetResource($planet->fresh());
    }

    public function destroy(Planet $planet)
    {
        $planet->delete();

        return response()->json([
            'message' => 'Planet deleted successfully.',
        ]);
    }
}
