<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNatureRequest;
use App\Http\Requests\UpdateNatureRequest;
use App\Http\Resources\NatureResource;
use App\Models\Nature;

class NatureController extends Controller
{
    public function index()
    {
        $natures = Nature::ordered()->get();

        return NatureResource::collection($natures);
    }

    public function store(StoreNatureRequest $request)
    {
        $nature = Nature::create($request->validated());

        return new NatureResource($nature);
    }

    public function show(Nature $nature)
    {
        return new NatureResource($nature);
    }

    public function update(UpdateNatureRequest $request, Nature $nature)
    {
        $nature->update($request->validated());

        return new NatureResource($nature->fresh());
    }

    public function destroy(Nature $nature)
    {
        $nature->delete();

        return response()->json([
            'message' => 'Nature deleted successfully.',
        ]);
    }
}
