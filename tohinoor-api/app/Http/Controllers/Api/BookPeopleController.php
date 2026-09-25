<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SyncBookPeopleRequest;
use App\Models\Book;
use Illuminate\Http\JsonResponse;

class BookPeopleController extends Controller
{
    public function sync(
        SyncBookPeopleRequest $request,
        Book $book
    ): JsonResponse {
        $book->people()->sync($request->validated('person_ids'));

        return response()->json([
            'message' => 'Book people synchronized successfully.',
            'book_id' => $book->id,
            'person_ids' => $book->people()
                ->orderBy('people.id')
                ->pluck('people.id')
                ->values(),
        ]);
    }
}
