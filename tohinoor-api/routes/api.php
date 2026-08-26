<?php

use App\Http\Controllers\Api\ElementController;
use App\Http\Controllers\Api\NatureController;
use App\Http\Controllers\Api\GunaController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
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


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ASTROLOGY
Route::apiResource('elements', ElementController::class);
Route::apiResource('natures', NatureController::class);
Route::apiResource('gunas', GunaController::class);
Route::apiResource('qualities', QualityController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('planets', PlanetController::class);
Route::apiResource('zodiac-signs', ZodiacSignController::class)->parameters(['zodiac-signs' => 'zodiacSign',]);
Route::apiResource('chart-types', ChartTypeController::class)->parameters(['chart-types' => 'chartType',]);

// PEOPLE AND LOCATION
Route::apiResource('countries', CountryController::class);
Route::apiResource('cities', CityController::class);
Route::apiResource('birth-accuracies', BirthAccuracyController::class)->parameters(['birth-accuracies' => 'birthAccuracy',]);
Route::apiResource('genders', GenderController::class);
Route::apiResource('people', PersonController::class);
