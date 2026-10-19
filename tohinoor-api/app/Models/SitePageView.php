<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SitePageView extends Model
{
    protected $fillable = [
        'path',
        'visitor_hash',
    ];
}
