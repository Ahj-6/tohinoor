<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChartRequest;
use App\Http\Requests\UpdateChartRequest;
use App\Http\Resources\ChartResource;
use App\Models\Chart;
use Illuminate\Support\Facades\Storage;
use Throwable;

class ChartController extends Controller
{
    public function index()
    {
        $charts = Chart::ordered()->get();

        return ChartResource::collection($charts);
    }

    public function store(StoreChartRequest $request)
    {
        $validated = $request->validated();

        $imagePath = $request->file('image')->store('charts', 'public');

        try {
            $chart = Chart::create([
                'person_id' => $validated['person_id'],
                'chart_type_id' => $validated['chart_type_id'],
                'image' => $imagePath,
            ]);
        } catch (Throwable $exception) {
            Storage::disk('public')->delete($imagePath);

            throw $exception;
        }

        return new ChartResource($chart);
    }

    public function show(Chart $chart)
    {
        return new ChartResource($chart);
    }

    public function update(UpdateChartRequest $request, Chart $chart)
    {
        $validated = $request->validated();

        $oldImagePath = $chart->image;
        $newImagePath = null;

        try {
            if ($request->hasFile('image')) {
                $newImagePath = $request->file('image')->store('charts', 'public');
                $validated['image'] = $newImagePath;
            } else {
                unset($validated['image']);
            }

            $chart->update($validated);

            if ($newImagePath && $oldImagePath) {
                Storage::disk('public')->delete($oldImagePath);
            }
        } catch (Throwable $exception) {
            if ($newImagePath) {
                Storage::disk('public')->delete($newImagePath);
            }

            throw $exception;
        }

        return new ChartResource($chart->fresh());
    }

    public function destroy(Chart $chart)
    {
        $imagePath = $chart->image;

        $chart->delete();

        if ($imagePath) {
            Storage::disk('public')->delete($imagePath);
        }

        return response()->json([
            'message' => 'Chart deleted successfully.',
        ]);
    }
}
