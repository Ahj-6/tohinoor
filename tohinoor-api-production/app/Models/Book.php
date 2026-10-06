<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'name_eng',
        'author',
        'translator',
        'image',
        'description',
        'display_order',
        'status',
    ];

    protected $casts = [
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
        return $this->belongsToMany(Person::class, 'book_people');
    }
}
