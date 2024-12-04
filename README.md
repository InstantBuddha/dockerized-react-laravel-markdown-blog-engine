# dockerized-react-laravel-markdown-blog-engine
A Dockerized blog engine that displays .md files as blog posts using React as frontend and Laravel as backend

- [dockerized-react-laravel-markdown-blog-engine](#dockerized-react-laravel-markdown-blog-engine)
  - [First start](#first-start)
  - [Creating the Laravel project files from scratch](#creating-the-laravel-project-files-from-scratch)
    - [Adding api.php](#adding-apiphp)

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

Laravel cannot be reached, there is no api in routes and the chown needs to be run again

### Adding api.php

New versions of Laravel don't add the api feature by standard anymore [see link](https://laracasts.com/discuss/channels/laravel/recurring-issue-with-missing-apiphp-and-service-providers-in-fresh-laravel-installations) so to add it:

```bash
#sh in
docker exec -it laravel-backend sh
#and install this:
php artisan install:api
```
