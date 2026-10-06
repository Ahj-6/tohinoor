<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreGunaRequest;
use App\Http\Requests\UpdateGunaRequest;
use App\Http\Resources\GunaResource;
use App\Models\Guna;

class GunaController extends Controller
{
    public function index()
    {
        $gunas = Guna::ordered()->get();

        return GunaResource::collection($gunas);
    }

    public function store(StoreGunaRequest $request)
    {
        $guna = Guna::create($request->validated());

        return new GunaResource($guna);
    }

    public function show(Guna $guna)
    {
        return new GunaResource($guna);
    }

    public function update(UpdateGunaRequest $request, Guna $guna)
    {
        $guna->update($request->validated());

        return new GunaResource($guna->fresh());
    }

    public function destroy(Guna $guna)
    {
        $guna->delete();

        return response()->json([
            'message' => 'Guna deleted successfully.',
        ]);
    }
}
