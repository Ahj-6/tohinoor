<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\DashboardController;
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
use App\Http\Controllers\Api\SitePageViewController;


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
| DASHBOARD
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->group(function () {

    Route::get(
        'dashboard/stats',
        [DashboardController::class, 'stats']
    )->name('dashboard.stats');
});

/*
|--------------------------------------------------------------------------
| ADMIN ONLY
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin',
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | USERS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('users', UserController::class);

    /*
    |--------------------------------------------------------------------------
    | ROLES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('roles', RoleController::class)
        ->except(['destroy']);
});


/*
|--------------------------------------------------------------------------
| PUBLIC REFERENCE READ
|--------------------------------------------------------------------------
|
| داده‌های مرجع برای نمایش در سایت و فرم‌های مدیریتی قابل خواندن هستند.
|
*/

Route::apiResource('elements', ElementController::class)
    ->only(['index', 'show']);

Route::apiResource('natures', NatureController::class)
    ->only(['index', 'show']);

Route::apiResource('gunas', GunaController::class)
    ->only(['index', 'show']);

Route::apiResource('qualities', QualityController::class)
    ->only(['index', 'show']);

Route::apiResource('planets', PlanetController::class)
    ->only(['index', 'show']);

Route::apiResource('zodiac-signs', ZodiacSignController::class)
    ->parameters([
        'zodiac-signs' => 'zodiacSign',
    ])
    ->only(['index', 'show']);

Route::apiResource('chart-types', ChartTypeController::class)
    ->parameters([
        'chart-types' => 'chartType',
    ])
    ->only(['index', 'show']);

Route::apiResource('countries', CountryController::class)
    ->only(['index', 'show']);

Route::apiResource('cities', CityController::class)
    ->only(['index', 'show']);

Route::apiResource('birth-accuracies', BirthAccuracyController::class)
    ->parameters([
        'birth-accuracies' => 'birthAccuracy',
    ])
    ->only(['index', 'show']);

Route::apiResource('genders', GenderController::class)
    ->only(['index', 'show']);


/*
|--------------------------------------------------------------------------
| REFERENCE WRITE - ADMIN + OPERATOR
|--------------------------------------------------------------------------
|
| Admin:
|   Create / Update / Delete
|
| Operator:
|   Create / Update
|   بدون Delete
|
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | ELEMENTS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('elements', ElementController::class)
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | NATURES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('natures', NatureController::class)
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | GUNAS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('gunas', GunaController::class)
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | QUALITIES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('qualities', QualityController::class)
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | PLANETS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('planets', PlanetController::class)
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | ZODIAC SIGNS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('zodiac-signs', ZodiacSignController::class)
        ->parameters([
            'zodiac-signs' => 'zodiacSign',
        ])
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | CHART TYPES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('chart-types', ChartTypeController::class)
        ->parameters([
            'chart-types' => 'chartType',
        ])
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | COUNTRIES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('countries', CountryController::class)
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | CITIES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('cities', CityController::class)
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | BIRTH ACCURACIES
    |--------------------------------------------------------------------------
    */

    Route::apiResource('birth-accuracies', BirthAccuracyController::class)
        ->parameters([
            'birth-accuracies' => 'birthAccuracy',
        ])
        ->only(['store', 'update']);

    /*
    |--------------------------------------------------------------------------
    | GENDERS
    |--------------------------------------------------------------------------
    */

    Route::apiResource('genders', GenderController::class)
        ->only(['store', 'update']);
});


/*
|--------------------------------------------------------------------------
| REFERENCE DELETE - ADMIN ONLY
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin',
])->group(function () {

    Route::delete(
        'elements/{element}',
        [ElementController::class, 'destroy']
    );

    Route::delete(
        'natures/{nature}',
        [NatureController::class, 'destroy']
    );

    Route::delete(
        'gunas/{guna}',
        [GunaController::class, 'destroy']
    );

    Route::delete(
        'qualities/{quality}',
        [QualityController::class, 'destroy']
    );

    Route::delete(
        'planets/{planet}',
        [PlanetController::class, 'destroy']
    );

    Route::delete(
        'zodiac-signs/{zodiacSign}',
        [ZodiacSignController::class, 'destroy']
    );

    Route::delete(
        'chart-types/{chartType}',
        [ChartTypeController::class, 'destroy']
    );

    Route::delete(
        'countries/{country}',
        [CountryController::class, 'destroy']
    );

    Route::delete(
        'cities/{city}',
        [CityController::class, 'destroy']
    );

    Route::delete(
        'birth-accuracies/{birthAccuracy}',
        [BirthAccuracyController::class, 'destroy']
    );

    Route::delete(
        'genders/{gender}',
        [GenderController::class, 'destroy']
    );
});


/*
|--------------------------------------------------------------------------
| PUBLIC PEOPLE
|--------------------------------------------------------------------------
*/

Route::get(
    'people',
    [PersonController::class, 'publicIndex']
);

Route::get(
    'people/{identifier}',
    [PersonController::class, 'publicShow']
);


/*
|--------------------------------------------------------------------------
| PUBLIC PAGE VIEWS
|--------------------------------------------------------------------------
*/

// ثبت بازدید سایت عمومی با محدودیت تعداد درخواست
Route::post(
    'page-views',
    [SitePageViewController::class, 'store']
)->middleware('throttle:60,1');


/*
|--------------------------------------------------------------------------
| SITE ANALYTICS - ADMIN + OPERATOR
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->get(
    'admin/site-page-views/stats',
    [SitePageViewController::class, 'stats']
);

/*
|--------------------------------------------------------------------------
| ADMIN PEOPLE
|--------------------------------------------------------------------------
|
| Admin + Operator:
|   GET / POST / PUT / PATCH
|
| Admin only:
|   DELETE
|
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->prefix('admin')->group(function () {

    Route::apiResource('people', PersonController::class)
        ->only(['index', 'show', 'store', 'update']);
});

Route::middleware([
    'auth:sanctum',
    'role:admin',
])->prefix('admin')->group(function () {

    Route::delete(
        'people/{person}',
        [PersonController::class, 'destroy']
    );
});


/*
|--------------------------------------------------------------------------
| CHARTS
|--------------------------------------------------------------------------
*/

// خواندن چارت‌ها فعلاً عمومی است
Route::apiResource('charts', ChartController::class)
    ->only(['index', 'show']);


/*
|--------------------------------------------------------------------------
| CHART WRITE - ADMIN + OPERATOR
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->group(function () {

    Route::apiResource('charts', ChartController::class)
        ->only(['store', 'update']);
});


/*
|--------------------------------------------------------------------------
| CHART DELETE - ADMIN + OPERATOR
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->group(function () {

    Route::delete(
        'charts/{chart}',
        [ChartController::class, 'destroy']
    );
});


/*
|--------------------------------------------------------------------------
| BOOKS
|--------------------------------------------------------------------------
*/

// خواندن عمومی
Route::apiResource('books', BookController::class)
    ->only(['index', 'show']);


/*
|--------------------------------------------------------------------------
| BOOK WRITE - ADMIN + OPERATOR
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->group(function () {

    Route::apiResource('books', BookController::class)
        ->only(['store', 'update']);

    Route::put(
        'books/{book}/people',
        [BookPeopleController::class, 'sync']
    );
});


/*
|--------------------------------------------------------------------------
| BOOK DELETE - ADMIN ONLY
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin',
])->group(function () {

    Route::delete(
        'books/{book}',
        [BookController::class, 'destroy']
    );
});


/*
|--------------------------------------------------------------------------
| MOVIES
|--------------------------------------------------------------------------
*/

// خواندن عمومی
Route::apiResource('movies', MovieController::class)
    ->only(['index', 'show']);


/*
|--------------------------------------------------------------------------
| MOVIE WRITE - ADMIN + OPERATOR
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->group(function () {

    Route::apiResource('movies', MovieController::class)
        ->only(['store', 'update']);

    Route::put(
        'movies/{movie}/people',
        [MoviePeopleController::class, 'sync']
    );
});


/*
|--------------------------------------------------------------------------
| MOVIE DELETE - ADMIN ONLY
|--------------------------------------------------------------------------
*/

Route::middleware([
    'auth:sanctum',
    'role:admin',
])->group(function () {

    Route::delete(
        'movies/{movie}',
        [MovieController::class, 'destroy']
    );
});


/*
|--------------------------------------------------------------------------
| SAMPLE ANALYSES
|--------------------------------------------------------------------------
|
| این بخش در آینده مخصوص اعضای سایت خواهد بود.
|
| Admin + Operator:
|   Read / Create / Update
|
| Student:
|   Read only
|
| Public:
|   بدون دسترسی
|
*/

// READ: Admin + Operator + Student
Route::middleware([
    'auth:sanctum',
    'role:admin,operator,student',
])->group(function () {

    Route::apiResource('sample-analyses', SampleAnalysisController::class)
        ->parameters([
            'sample-analyses' => 'sampleAnalysis',
        ])
        ->only(['index', 'show']);
});


// CREATE / UPDATE: Admin + Operator
Route::middleware([
    'auth:sanctum',
    'role:admin,operator',
])->group(function () {

    Route::apiResource('sample-analyses', SampleAnalysisController::class)
        ->parameters([
            'sample-analyses' => 'sampleAnalysis',
        ])
        ->only(['store', 'update']);
});


// DELETE: Admin only
Route::middleware([
    'auth:sanctum',
    'role:admin',
])->group(function () {

    Route::delete(
        'sample-analyses/{sampleAnalysis}',
        [SampleAnalysisController::class, 'destroy']
    );
});
