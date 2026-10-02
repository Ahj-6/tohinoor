<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Throwable;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::with([
            'zodiacSign',
            'birthAccuracy',
        ])
            ->ordered()
            ->get();

        return PersonResource::collection($people);
    }

    public function store(StorePersonRequest $request)
    {
        $validated = $request->validated();

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store(
                'people',
                'public'
            );
        }

        try {
            $person = Person::create([
                ...$validated,
                'slug' => Person::generateUniqueSlug($validated['name_eng']),
                'image' => $imagePath,
            ]);
        } catch (Throwable $exception) {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }

            throw $exception;
        }

        return new PersonResource($person);
    }

    public function show(string $identifier)
    {
        $person = ctype_digit($identifier)
            ? Person::findOrFail((int) $identifier)
            : Person::where('slug', $identifier)->firstOrFail();

        $person->load([
            'gender',
            'country',
            'city',
            'zodiacSign',
            'birthAccuracy',
            'charts.chartType',
        ]);

        return new PersonResource($person);
    }

    public function update(
        UpdatePersonRequest $request,
        Person $person
    ) {
        $validated = $request->validated();

        $oldImagePath = $person->image;
        $newImagePath = null;

        try {
            if ($request->hasFile('image')) {
                $newImagePath = $request->file('image')->store(
                    'people',
                    'public'
                );

                $validated['image'] = $newImagePath;
            } else {
                unset($validated['image']);
            }

            $person->update($validated);

            if ($newImagePath && $oldImagePath) {
                Storage::disk('public')->delete($oldImagePath);
            }
        } catch (Throwable $exception) {
            if ($newImagePath) {
                Storage::disk('public')->delete($newImagePath);
            }

            throw $exception;
        }

        return new PersonResource($person->fresh());
    }

    public function destroy(Person $person)
    {
        $personImagePath = $person->image;

        // --------------------------------
        // فایل‌های وابسته را قبل از حذف DB ثبت می‌کنیم
        // --------------------------------

        $charts = $person->charts()
            ->get(['id', 'image']);

        $sampleAnalyses = $person->sampleAnalyses()
            ->withTrashed()
            ->get(['id', 'pdf']);

        try {
            DB::transaction(function () use (
                $person,
                $charts,
                $sampleAnalyses
            ) {
                // --------------------------------
                // حذف واقعی Chartها
                // --------------------------------

                foreach ($charts as $chart) {
                    $chart->delete();
                }

                // --------------------------------
                // حذف واقعی Sample Analysisها
                // حتی اگر قبلاً Soft Deleted باشند
                // --------------------------------

                foreach ($sampleAnalyses as $analysis) {
                    $analysis->forceDelete();
                }

                // --------------------------------
                // حذف روابط Pivot
                // --------------------------------

                $person->books()->detach();
                $person->movies()->detach();

                // --------------------------------
                // حذف واقعی Person
                // --------------------------------

                $person->delete();
            });
        } catch (Throwable $exception) {
            report($exception);

            return response()->json([
                'message' => 'حذف فرد با خطا مواجه شد.',
            ], 500);
        }

        // --------------------------------
        // حذف فایل‌های Chart
        // --------------------------------

        foreach ($charts as $chart) {
            if ($chart->image) {
                Storage::disk('public')->delete($chart->image);
            }
        }

        // --------------------------------
        // حذف PDFهای Sample Analysis
        // --------------------------------

        foreach ($sampleAnalyses as $analysis) {
            if ($analysis->pdf) {
                Storage::disk('public')->delete($analysis->pdf);
            }
        }

        // --------------------------------
        // حذف تصویر خود Person
        // --------------------------------

        if ($personImagePath) {
            Storage::disk('public')->delete($personImagePath);
        }

        return response()->json([
            'message' => 'Person deleted successfully.',
        ]);
    }
}
