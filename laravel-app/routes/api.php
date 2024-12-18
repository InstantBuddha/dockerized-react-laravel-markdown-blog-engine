<?php

use App\Http\Controllers\BlogPostController;
use App\Http\Controllers\BlogPostRegistryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/blog-posts-registry', [BlogPostRegistryController::class, 'getBlogPostRegistry']);

Route::get('/blog-post/{slug}', [BlogPostController::class, 'getBlogPost']);

Route::get('/ping', static fn() => 'pong');
