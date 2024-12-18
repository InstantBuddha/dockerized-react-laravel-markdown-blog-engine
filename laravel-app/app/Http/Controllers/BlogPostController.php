<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class BlogPostController extends Controller
{
    public function getBlogPost($slug): JsonResponse
    {
        $registryPath = storage_path('blog/registry.json');

        if (!File::exists($registryPath)) {
            return response()->json(['message' => 'Registry file not found'], 404);
        }

        $registryContent = File::get($registryPath);
        $registry = json_decode($registryContent, true);

        $index = array_search($slug, array_column($registry, 'slug'));
        if ($index === false) {
            return response()->json(['message' => 'Blog post slug not found'], 404);
        }

        $entry = $registry[$index];
        $filePath = storage_path('blog/' . $entry['postFileName']);

        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Blog post file missing'], 404);
        }

        $content = File::get($filePath);

        return response()->json(['content' => $content]);

    }
}
