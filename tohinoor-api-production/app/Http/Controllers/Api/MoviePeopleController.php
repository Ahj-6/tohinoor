<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SyncMoviePeopleRequest;
use App\Models\Movie;
use Illuminate\Http\JsonResponse;

class MoviePeopleController extends Controller
{
    public function sync(
        SyncMoviePeopleRequest $request,
        Movie $movie
    ): JsonResponse {
        $movie->people()->sync($request->validated('person_ids'));

        return response()->json([
            'message' => 'Movie people synchronized successfully.',
            'movie_id' => $movie->id,
            'person_ids' => $movie->people()
                ->orderBy('people.id')
                ->pluck('people.id')
                ->values(),
        ]);
    }
}
