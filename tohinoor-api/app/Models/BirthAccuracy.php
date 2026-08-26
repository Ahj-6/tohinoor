<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BirthAccuracy extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'code',
        'name',
        'name_eng',
        'description',
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

    // بعد از ساخت Person فعال می‌کنیم:
    // public function people()
    // {
    //     return $this->hasMany(Person::class);
    // }
}
