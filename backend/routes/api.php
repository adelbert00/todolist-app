<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\TaskController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\TimerController;
use App\Http\Controllers\API\CalendarEventController;
use App\Http\Controllers\API\AuthController;

// Trasy Autentykacji
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Zabezpieczone trasy API
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Zadania
    Route::apiResource('tasks', TaskController::class);

    // Kategorie
    Route::apiResource('categories', CategoryController::class);

    // Timery
    Route::apiResource('timers', TimerController::class)->only(['index', 'store', 'update', 'destroy']);

    // Wydarzenia Kalendarza
    Route::apiResource('calendar-events', CalendarEventController::class);
});
