<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Planet extends Model
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
        'nature_id',
        'guna_1_id',
        'guna_2_id',
        'element_1_id',
        'element_2_id',
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

    public function nature(): BelongsTo
    {
        return $this->belongsTo(Nature::class);
    }

    public function guna1(): BelongsTo
    {
        return $this->belongsTo(Guna::class, 'guna_1_id');
    }

    public function guna2(): BelongsTo
    {
        return $this->belongsTo(Guna::class, 'guna_2_id');
    }

    public function element1(): BelongsTo
    {
        return $this->belongsTo(Element::class, 'element_1_id');
    }

    public function element2(): BelongsTo
    {
        return $this->belongsTo(Element::class, 'element_2_id');
    }
}
