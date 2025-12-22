FROM php:8.2-cli

RUN apt-get update && apt-get install -y git unzip libzip-dev \
    && docker-php-ext-install zip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy everything including .env
COPY . .

RUN composer install --no-dev --optimize-autoloader \
    && php artisan key:generate

EXPOSE ${PORT:-10000}

CMD bash -lc "php artisan migrate:status || true; php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"
