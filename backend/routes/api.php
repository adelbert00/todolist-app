<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TimerController;
use App\Http\Controllers\API\CalendarEventController;
use App\Http\Controllers\API\AuthController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('tasks', TaskController::class);

    Route::apiResource('categories', CategoryController::class);

    Route::apiResource('timers', TimerController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::apiResource('calendar-events', CalendarEventController::class);
});
