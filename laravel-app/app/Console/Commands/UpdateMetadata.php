<?php

namespace App\Console\Commands;

use App\Events\MdFileUpdated;
use Illuminate\Console\Command;

class UpdateMetadata extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-metadata';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update metadata registry for .md files';

    /**
     * Execute the console command.
     */
   
    public function handle(): void
    {
        MdFileUpdated::dispatch();
    }
}
