<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class SampleAnalysis extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'person_id',
        'user_id',
        'pdf',
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

    public function person(): BelongsTo
    {
        return $this->belongsTo(Person::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
