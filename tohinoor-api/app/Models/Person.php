<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Person extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'name_eng',
        'image',
        'gender_id',
        'birth_date',
        'birth_time',
        'country_id',
        'city_id',
        'time_zone',
        'zodiac_sign_id',
        'birth_accuracy_id',
        'biography',
        'wikipedia_url',
        'status',
    ];

    protected $casts = [
        'birth_date' => 'date',
        'status' => 'boolean',
    ];

    /**
     * Scope a query to order records by id.
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('id');
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function gender(): BelongsTo
    {
        return $this->belongsTo(Gender::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function city(): BelongsTo
    {
        return $this->belongsTo(City::class);
    }

    public function zodiacSign(): BelongsTo
    {
        return $this->belongsTo(ZodiacSign::class);
    }

    public function birthAccuracy(): BelongsTo
    {
        return $this->belongsTo(BirthAccuracy::class);
    }

    public function charts(): HasMany
    {
        return $this->hasMany(Chart::class);
    }
}
