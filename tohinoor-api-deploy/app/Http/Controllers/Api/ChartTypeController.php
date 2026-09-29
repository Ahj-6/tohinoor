<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChartTypeRequest;
use App\Http\Requests\UpdateChartTypeRequest;
use App\Http\Resources\ChartTypeResource;
use App\Models\ChartType;

class ChartTypeController extends Controller
{
    public function index()
    {
        $chartTypes = ChartType::ordered()->get();

        return ChartTypeResource::collection($chartTypes);
    }

    public function store(StoreChartTypeRequest $request)
    {
        $chartType = ChartType::create($request->validated());

        return new ChartTypeResource($chartType);
    }

    public function show(ChartType $chartType)
    {
        return new ChartTypeResource($chartType);
    }

    public function update(
        UpdateChartTypeRequest $request,
        ChartType $chartType
    ) {
        $chartType->update($request->validated());

        return new ChartTypeResource($chartType->fresh());
    }

    public function destroy(ChartType $chartType)
    {
        $chartType->delete();

        return response()->json([
            'message' => 'Chart type deleted successfully.',
        ]);
    }
}
