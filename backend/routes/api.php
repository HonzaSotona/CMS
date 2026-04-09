<?php

use App\Http\Controllers\Api\Admin\PageController;
use App\Http\Controllers\Api\Public\PublicPageController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->middleware(['auth:sanctum'])->group(function (): void {
    Route::apiResource('pages', PageController::class);
});

Route::get('pages/{slug}', [PublicPageController::class, 'show']);
