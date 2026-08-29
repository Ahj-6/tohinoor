<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChartRequest;
use App\Http\Requests\UpdateChartRequest;
use App\Http\Resources\ChartResource;
use App\Models\Chart;

class ChartController extends Controller
{
    public function index()
    {
        $charts = Chart::ordered()->get();

        return ChartResource::collection($charts);
    }

    public function store(StoreChartRequest $request)
    {
        $chart = Chart::create($request->validated());

        return new ChartResource($chart);
    }

    public function show(Chart $chart)
    {
        return new ChartResource($chart);
    }

    public function update(UpdateChartRequest $request, Chart $chart)
    {
        $chart->update($request->validated());

        return new ChartResource($chart->fresh());
    }

    public function destroy(Chart $chart)
    {
        $chart->delete();

        return response()->json([
            'message' => 'Chart deleted successfully.',
        ]);
    }
}
