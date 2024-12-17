# dockerized-react-laravel-markdown-blog-engine
A Dockerized blog engine that displays .md files as blog posts using React as frontend and Laravel as backend

- [dockerized-react-laravel-markdown-blog-engine](#dockerized-react-laravel-markdown-blog-engine)
  - [First start](#first-start)
  - [Creating the Laravel project files from scratch](#creating-the-laravel-project-files-from-scratch)
    - [Adding api.php](#adding-apiphp)
  - [Add .md blog files](#add-md-blog-files)
  - [Add event listener and the registry for .md blog file data](#add-event-listener-and-the-registry-for-md-blog-file-data)

## First start
1. .env needs to be created with the .env.example

2. Presently the api routes can be accessible like:
```
http://localhost/api/ping
```
And the React frontend is accessible like:
```
http://localhost/
```

## Creating the Laravel project files from scratch

The following Docker command could be used to create the necessary files for a blank new Laravel project:

```bash
docker run --rm -v $(pwd):/app -w /app laravelsail/php82-composer:latest composer create-project --prefer-dist laravel/laravel laravel-app
```
Then, the ownership should be changed so files can be moved easily:

```bash
# Change ownership and permissions
sudo chown -R yourusername:yourusername ./laravel-app
chmod -R 755 ./laravel-app
```

### Adding api.php

New versions of Laravel don't add the api feature by standard anymore [see link](https://laracasts.com/discuss/channels/laravel/recurring-issue-with-missing-apiphp-and-service-providers-in-fresh-laravel-installations) so to add it:

```bash
#sh in
docker exec -it laravel-backend sh
#and install this:
php artisan install:api
```
## Add .md blog files

1. Create a /blog/ folder inside the /storage/ folder for the initial posts and copy them.
2. sh in and install
```bash
docker exec -it laravel-backend sh
composer require league/commonmark
```

## Add event listener and the registry for .md blog file data

1. **Create an Event**:
   
Sh into the container and
```sh
php artisan make:event MdFileUpdated
```

And in the app folder:
```bash
sudo chown -R yourusername:yourusername ./Events
```

2. **Create a Listener**:
   
Sh into the container and
```sh
php artisan make:listener UpdateMdFileMetadata
```

And in the app folder:
```bash
sudo chown -R yourusername:yourusername ./Listeners
```

3. Laravel 11 automatically scans the app\Listeners directory and associates events with their listeners, so you **don't need to manually register them** in EventServiceProvider. [problem on stackoverflow](https://stackoverflow.com/questions/78230554/event-and-event-listener-laravel-11)

4. **Create a Command to Trigger the Event**:

Sh into the container and
```sh
php artisan make:command UpdateMetadata
```

And in the app folder:
```bash
sudo chown -R yourusername:yourusername ./Console/Commands
```

5. The command can be executed manually (inside the container)
```sh
php artisan app:update-metadata
```

6. Create a controller for the api
  
Sh into the container and
```sh
php artisan make:controller BlogPostRegistryController
```
And in the app folder:
```bash
sudo chown -R yourusername:yourusername ./Http/Controllers
```

7. Add the route
8. The ready route can be checked at:
```
http://localhost/api/blog-posts-registry
```
