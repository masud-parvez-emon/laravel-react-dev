<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Container extends Model
{
    use HasFactory;

    public function category()
    {
        return $this->belongsTo(ContainerCategory::class);
    }

    public function trackings()
    {
        return $this->hasMany(ContainerTracking::class);
    }
}
