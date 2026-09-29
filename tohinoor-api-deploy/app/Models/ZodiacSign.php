<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ZodiacSign extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'name_eng',
        'name_arabic',
        'name_sanskrit',
        'image',
        'icon',
        'symbol',
        'planet_id',
        'element_id',
        'quality_id',
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

    public function planet(): BelongsTo
    {
        return $this->belongsTo(Planet::class);
    }

    public function element(): BelongsTo
    {
        return $this->belongsTo(Element::class);
    }

    public function quality(): BelongsTo
    {
        return $this->belongsTo(Quality::class);
    }
}
