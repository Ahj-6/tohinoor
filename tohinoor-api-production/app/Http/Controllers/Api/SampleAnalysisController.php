<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSampleAnalysisRequest;
use App\Http\Requests\UpdateSampleAnalysisRequest;
use App\Http\Resources\SampleAnalysisResource;
use App\Models\SampleAnalysis;

class SampleAnalysisController extends Controller
{
    public function index()
    {
        $sampleAnalyses = SampleAnalysis::ordered()->get();

        return SampleAnalysisResource::collection($sampleAnalyses);
    }

    public function store(StoreSampleAnalysisRequest $request)
    {
        $sampleAnalysis = SampleAnalysis::create($request->validated());

        return new SampleAnalysisResource($sampleAnalysis);
    }

    public function show(SampleAnalysis $sampleAnalysis)
    {
        return new SampleAnalysisResource($sampleAnalysis);
    }

    public function update(
        UpdateSampleAnalysisRequest $request,
        SampleAnalysis $sampleAnalysis
    ) {
        $sampleAnalysis->update($request->validated());

        return new SampleAnalysisResource($sampleAnalysis->fresh());
    }

    public function destroy(SampleAnalysis $sampleAnalysis)
    {
        $sampleAnalysis->delete();

        return response()->json([
            'message' => 'Sample analysis deleted successfully.',
        ]);
    }
}
