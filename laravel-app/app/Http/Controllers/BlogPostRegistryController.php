<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class BlogPostRegistryController extends Controller
{
    public function getBlogPostRegistry(): JsonResponse
    {
        $filePath = storage_path('blog/registry.json');

        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Blog post registry not found'], 422);
        }

        $contents = File::get($filePath);
        $blogPostRegistry = json_decode($contents, true);

        return response()->json($blogPostRegistry);
    }
}
