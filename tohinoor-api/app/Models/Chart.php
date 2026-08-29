<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Chart extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'person_id',
        'chart_type_id',
        'image',
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

    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }

    public function chartType(): BelongsTo
    {
        return $this->belongsTo(ChartType::class);
    }
}
