<?php

namespace App\Listeners;

use App\Events\MdFileUpdated;
use Illuminate\Support\Facades\File;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class UpdateMdFileMetadata
{
    protected $postsPath = 'storage/blog';
    protected $registryFile = 'storage/blog/registry.json';
    // add logics that handle if the file does not exist

    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(MdFileUpdated $event): void
    {
        $files = array_filter(File::files($this->postsPath), fn($file) => pathinfo($file->getFilename(), PATHINFO_EXTENSION) === 'md');
        $metadataArray = [];
        $existingSlugs = [];

        foreach ($files as $index => $file) {
            error_log("handle: Processing file $index: " . $file->getPathname());
            // Sanitize the filename
            $filePath = str_replace(' ', '_', $file->getPathname());

            $content = File::get($filePath);

            $metadata = $this->extractMetadata($content, $existingSlugs, $index);

            $metadataArray[] = $metadata;
            $existingSlugs[] = $metadata['slug'];
        }

        File::put($this->registryFile, json_encode($metadataArray));
    }

    private function extractMetadata(string $content, array $existingSlugs, $index)
    {
        // Extract JSON front matter correctly 
        $start = strpos($content, '{');
        $end = strpos($content, '}') + 1;
        $jsonFrontMatter = substr($content, $start, $end - $start);
        $metadata = json_decode($jsonFrontMatter, true);

        // Check if json_decode was successful 
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception('Error decoding JSON: ' . json_last_error_msg());
        }

        $metadata['id'] = $index;
        // add a slug from the title
        $metadata['slug'] = strtolower(str_replace(' ', '-', $metadata['title']));

        // if slug has a duplicate, add id        
        if (in_array($metadata['slug'], $existingSlugs)) {
            $metadata['slug'] .= '-' . $metadata['id'];
        }

        return $metadata;
    }

}
