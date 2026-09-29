<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreZodiacSignRequest;
use App\Http\Requests\UpdateZodiacSignRequest;
use App\Http\Resources\ZodiacSignResource;
use App\Models\ZodiacSign;

class ZodiacSignController extends Controller
{
    public function index()
    {
        $zodiacSigns = ZodiacSign::ordered()->get();

        return ZodiacSignResource::collection($zodiacSigns);
    }

    public function store(StoreZodiacSignRequest $request)
    {
        $zodiacSign = ZodiacSign::create($request->validated());

        return new ZodiacSignResource($zodiacSign);
    }

    public function show(ZodiacSign $zodiacSign)
    {
        return new ZodiacSignResource($zodiacSign);
    }

    public function update(
        UpdateZodiacSignRequest $request,
        ZodiacSign $zodiacSign
    ) {
        $zodiacSign->update($request->validated());

        return new ZodiacSignResource($zodiacSign->fresh());
    }

    public function destroy(ZodiacSign $zodiacSign)
    {
        $zodiacSign->delete();

        return response()->json([
            'message' => 'Zodiac sign deleted successfully.',
        ]);
    }
}
