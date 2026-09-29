<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Http\Resources\PersonResource;
use App\Models\Person;
use Illuminate\Support\Facades\Storage;
use Throwable;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::ordered()->get();

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

    public function show(Person $person)
    {
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
        $imagePath = $person->image;

        $person->delete();

        if ($imagePath) {
            Storage::disk('public')->delete($imagePath);
        }

        return response()->json([
            'message' => 'Person deleted successfully.',
        ]);
    }
}
