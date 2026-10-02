<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\ElementController;
use App\Http\Controllers\Api\NatureController;
use App\Http\Controllers\Api\GunaController;
use App\Http\Controllers\Api\QualityController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\PlanetController;
use App\Http\Controllers\Api\ZodiacSignController;
use App\Http\Controllers\Api\ChartTypeController;
use App\Http\Controllers\Api\CountryController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\BirthAccuracyController;
use App\Http\Controllers\Api\GenderController;
use App\Http\Controllers\Api\PersonController;
use App\Http\Controllers\Api\ChartController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BookController;
use App\Http\Controllers\Api\BookPeopleController;
use App\Http\Controllers\Api\MovieController;
use App\Http\Controllers\Api\MoviePeopleController;
use App\Http\Controllers\Api\SampleAnalysisController;


/*
|--------------------------------------------------------------------------
| AUTHENTICATION
|--------------------------------------------------------------------------
*/

// برای پاسخ JSON در درخواست‌های احراز هویت‌نشده
Route::get('login', function () {
    return response()->json([
        'message' => 'Unauthenticated.',
    ], 401);
})->name('login');

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::post('logout', [AuthController::class, 'logout']);
});


/*
|--------------------------------------------------------------------------
| ADMIN ONLY
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {

    // USERS
    Route::apiResource('users', UserController::class);

    // ROLES
    Route::apiResource('roles', RoleController::class)
        ->except(['destroy']);
});


/*
|--------------------------------------------------------------------------
| ASTROLOGY
|--------------------------------------------------------------------------
*/

Route::apiResource('elements', ElementController::class);
Route::apiResource('natures', NatureController::class);
Route::apiResource('gunas', GunaController::class);
Route::apiResource('qualities', QualityController::class);
Route::apiResource('planets', PlanetController::class);

Route::apiResource('zodiac-signs', ZodiacSignController::class)
    ->parameters([
        'zodiac-signs' => 'zodiacSign',
    ]);

Route::apiResource('chart-types', ChartTypeController::class)
    ->parameters([
        'chart-types' => 'chartType',
    ]);


/*
|--------------------------------------------------------------------------
| PEOPLE AND LOCATION
|--------------------------------------------------------------------------
*/

Route::apiResource('countries', CountryController::class);

Route::apiResource('cities', CityController::class);

Route::apiResource('birth-accuracies', BirthAccuracyController::class)
    ->parameters([
        'birth-accuracies' => 'birthAccuracy',
    ]);

Route::apiResource('genders', GenderController::class);

Route::apiResource('people', PersonController::class);

Route::apiResource('charts', ChartController::class);


/*
|--------------------------------------------------------------------------
| BOOKS
|--------------------------------------------------------------------------
*/

Route::apiResource('books', BookController::class);

Route::put(
    'books/{book}/people',
    [BookPeopleController::class, 'sync']
);


/*
|--------------------------------------------------------------------------
| MOVIES
|--------------------------------------------------------------------------
*/

Route::apiResource('movies', MovieController::class);

Route::put(
    'movies/{movie}/people',
    [MoviePeopleController::class, 'sync']
);


/*
|--------------------------------------------------------------------------
| SAMPLE ANALYSES
|--------------------------------------------------------------------------
*/

Route::apiResource('sample-analyses', SampleAnalysisController::class)
    ->parameters([
        'sample-analyses' => 'sampleAnalysis',
    ]);
