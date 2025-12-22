FROM php:8.2-cli

# System dependencies including SSL
RUN apt-get update && apt-get install -y \
    git unzip libzip-dev libssl-dev \
    && docker-php-ext-install zip \
    && pecl install mongodb \
    && docker-php-ext-enable mongodb

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copy source code
COPY . .

# Install PHP dependencies
RUN cp .env.example .env \
    && composer install --no-dev --optimize-autoloader \
    && php artisan key:generate

EXPOSE ${PORT:-10000}

# Start Laravel
CMD bash -lc "php artisan storage:link && php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"
