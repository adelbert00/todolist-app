<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\TrimStrings as Middleware;

class TrimStrings extends Middleware
{
    /**
     * The attributes that should not be trimmed.
     *
     * @var array<int, string>
     */
    protected $except = [
        //
    ];
}