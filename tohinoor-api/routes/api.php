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


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('elements', ElementController::class);
Route::apiResource('natures', NatureController::class);
Route::apiResource('gunas', GunaController::class);
Route::apiResource('qualities', QualityController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('planets', PlanetController::class);
Route::apiResource('zodiac-signs', ZodiacSignController::class)->parameters(['zodiac-signs' => 'zodiacSign',]);

