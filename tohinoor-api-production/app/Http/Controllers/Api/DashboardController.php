<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Book;
use App\Models\Movie;
use App\Models\Person;
use App\Models\SampleAnalysis;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
    {
        return response()->json([
            'data' => [
                'astrology_tables' => 11,
                'people' => Person::count(),
                'books' => Book::count(),
                'movies' => Movie::count(),
                'sample_analyses' => SampleAnalysis::count(),
            ],
        ]);
    }
}
