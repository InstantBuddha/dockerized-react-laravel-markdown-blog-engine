<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;
use Illuminate\Http\Request;

class BlogPostRegistryController extends Controller
{
    public function getBlogPostRegistry(Request $request): JsonResponse
    {
        // Simulate network delay, uncomment for testing
        //sleep(0.499);
    
        $filePath = storage_path('blog/registry.json');

        if (!File::exists($filePath)) {
            return response()->json(['message' => 'Blog post registry not found'], 404);
        }

        $contents = File::get($filePath);
        $blogPostRegistry = json_decode($contents, true);

        // Get pagination parameters
        $perPage = $request->input('per_page', 10); // Default posts per page
        $page = $request->input('page', 1); // Default to the first page

        // Ensure perPage and page are positive integers
        $perPage = max(1, intval($perPage));
        $page = max(1, intval($page));

        // Slice the array to get posts for the current page
        $offset = ($page - 1) * $perPage;
        $postsForPage = array_slice($blogPostRegistry, $offset, $perPage);

        // Calculate total number of pages
        $totalPosts = count($blogPostRegistry);
        $totalPages = ceil($totalPosts / $perPage);

        // Prepare response with pagination metadata
        return response()->json([
            'data' => $postsForPage,
            'current_page' => $page,
            'per_page' => $perPage,
            'total_pages' => $totalPages,
            'total_posts' => $totalPosts,
        ]);
    }
}
