<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePersonRequest;
use App\Http\Requests\UpdatePersonRequest;
use App\Http\Resources\PersonResource;
use App\Models\Person;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::ordered()->get();

        return PersonResource::collection($people);
    }

    public function store(StorePersonRequest $request)
    {
        $person = Person::create($request->validated());

        return new PersonResource($person);
    }

    public function show(Person $person)
    {
        return new PersonResource($person);
    }

    public function update(UpdatePersonRequest $request, Person $person)
    {
        $person->update($request->validated());

        return new PersonResource($person->fresh());
    }

    public function destroy(Person $person)
    {
        $person->delete();

        return response()->json([
            'message' => 'Person deleted successfully.',
        ]);
    }
}
