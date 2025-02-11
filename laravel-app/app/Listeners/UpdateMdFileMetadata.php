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

            $content = File::get($file->getPathname());
            $filename = $file->getFilename();

            try {
                $metadata = $this->extractMetadata($content, $existingSlugs, $index, $filename);
                $metadataArray[] = $metadata;
                $existingSlugs[] = $metadata['slug'];
            } catch (\Exception $e) {
                error_log("Error processing file $index: " . $e->getMessage());
                continue;
            }
        }

        // Sort metadataArray by creation_date in descending order
        usort($metadataArray, function ($a, $b) {
            return strtotime($b['creation_date']) - strtotime($a['creation_date']);
        });

        File::put($this->registryFile, json_encode($metadataArray));
    }

    private function extractMetadata(string $content, array $existingSlugs, $index, $filename)
    {
        // Extract JSON front matter correctly 
        $start = strpos($content, '{');
        $end = strpos($content, '}') + 1;
        $jsonFrontMatter = substr($content, $start, $end - $start);
        $metadata = json_decode($jsonFrontMatter, true);

        // Check if json_decode was successful 
        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new \Exception("\033[31mError decoding JSON:  \033[33m" . json_last_error_msg() . "\033[0m");
        }

        // Extract the content after JSON front matter and match any non-whitespace character
        $remainingContent = substr($content, $end);
        if (!preg_match('/\S/', $remainingContent)) {
            throw new \Exception("\033[31mError: Markdown file contains no content beyond the front matter.\033[0m");
        }

        // Check and fill in missing metadata
        $requiredFields = ['title', 'creation_date'];
        foreach ($requiredFields as $field) {
            if (empty($metadata[$field])) {
                throw new \Exception("\033[31mMissing required field: \033[33m" . $field . "\033[0m");
            }
        }

        // Validate creation_date format using DateTime
        $date = \DateTime::createFromFormat('Y-m-d\TH:i:s', $metadata['creation_date']);
        if (!$date || $date->format('Y-m-d\TH:i:s') !== $metadata['creation_date']) {
            throw new \Exception("\033[31mInvalid creation_date format: \033[33m" . $metadata['creation_date'] . "\033[0m");
        }

        $metadata['id'] = $index;
        $metadata['postFileName'] = $filename;

        // add a slug from the title
        $metadata['slug'] = strtolower(str_replace(' ', '-', $metadata['title']));

        // if slug has a duplicate, add id        
        if (in_array($metadata['slug'], $existingSlugs)) {
            $metadata['slug'] .= '-' . $metadata['id'];
        }

        return $metadata;
    }

}
