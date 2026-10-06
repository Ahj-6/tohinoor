<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMovieRequest;
use App\Http\Requests\UpdateMovieRequest;
use App\Http\Resources\MovieResource;
use App\Models\Movie;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Movie::ordered()->get();

        return MovieResource::collection($movies);
    }

    public function store(StoreMovieRequest $request)
    {
        $movie = Movie::create($request->validated());

        return new MovieResource($movie);
    }

    public function show(Movie $movie)
    {
        return new MovieResource($movie);
    }

    public function update(UpdateMovieRequest $request, Movie $movie)
    {
        $movie->update($request->validated());

        return new MovieResource($movie->fresh());
    }

    public function destroy(Movie $movie)
    {
        $movie->delete();

        return response()->json([
            'message' => 'Movie deleted successfully.',
        ]);
    }
}
