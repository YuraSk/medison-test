<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400"></a></p>

## Project Setup

This is a guide on setting up and running the project using Docker and Laravel Artisan commands.

## Prerequisites

Make sure you have the following software installed on your machine:

- Docker
- Docker Compose

## Getting Started

1. Clone the project repository.
   ```bash
   git clone https://github.com/YuraSk/medison-test

2. Change into the project directory.
   ```bash
   cd medison-test

3. Start the Docker containers using Docker Compose.
   ```bash
   docker-compose up -d
   
4. Install PHP dependencies using Composer.
    ```bash
    docker-compose exec medison-app composer install

5. Run the database migrations.
    ```bash
    docker-compose exec medison-app php artisan migrate

6. Seed the database with initial data (e.g., user seeder).
    ```bash
    docker-compose exec medison-app php artisan db:seed

8. Install NPM dependencies.
    ```bash
    docker-compose exec medison-npm npm install

9. Run NPM.
    ```bash
    docker-compose exec medison-npm npm run dev

10. Access the application in your web browser.
    - http://localhost

## Additional Commands
    - To stop the Docker containers, use `docker-compose down`.
    - To access the shell of the app container, use `docker-compose exec medison-app bash`.
    - To run other Laravel Artisan commands, use `docker-compose exec medison-app php artisan <command>`.
    - To run other NPM commands, use `docker-compose exec medison-npm <command>`.
