<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Movie extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'name_eng',
        'director',
        'release_year',
        'image',
        'description',
        'display_order',
        'status',
    ];

    protected $casts = [
        'release_year' => 'integer',
        'display_order' => 'integer',
        'status' => 'boolean',
    ];

    /**
     * Scope a query to order records by display order.
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query
            ->orderBy('display_order')
            ->orderBy('id');
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    public function people(): BelongsToMany
    {
        return $this->belongsToMany(Person::class, 'movie_people');
    }
}
